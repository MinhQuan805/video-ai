#!/usr/bin/env python3
"""
pipeline/audio/trim_yap.py - Automated Silence & Filler Trimmer for Yap / Talking-Head Videos

Features:
1. Detects dead air and silent pauses using FFmpeg `silencedetect`.
2. (Optional) Detects hesitation filler words ('ừm', 'ờ', 'à', 'uh', 'um', etc.) via Faster-Whisper.
3. Computes clean speech intervals with customizable safety padding (preventing clipped speech).
4. Generates seamless jump-cut trimmed video/audio using FFmpeg.
5. Recalculates aligned word timestamps for Remotion captions.
6. Exports an Edit Decision List (EDL) and cut metrics report JSON.

Usage:
  python pipeline/audio/trim_yap.py --input input.mp4 --output output_trimmed.mp4
  python pipeline/audio/trim_yap.py --input voice.wav --output voice_trimmed.wav --silence-thresh -32 --min-silence 0.35
  python pipeline/audio/trim_yap.py --input raw.mp4 --output final.mp4 --remove-fillers --lang vi
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import List, Tuple, Dict, Any

sys.stdout.reconfigure(encoding="utf-8")

# Common hesitation / filler words by language
FILLER_WORDS = {
    "vi": {
        "ừm", "ờ", "à", "ơ", "hả", "ê", "uh", "um", "nhỉ", "nhé", "thì_là", "kiểu",
        "kiểu_như", "nói_chung_là", "đấy", "thế_này"
    },
    "en": {
        "um", "uh", "er", "ah", "like", "you_know", "so", "actually", "basically",
        "literally", "i_mean", "sort_of", "kind_of"
    }
}


def get_media_duration(file_path: str) -> float:
    """Retrieves file duration in seconds via ffprobe."""
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        file_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(res.stdout.strip())


def detect_silence(file_path: str, noise_threshold_db: float = -32.0, min_duration_sec: float = 0.35) -> List[Tuple[float, float]]:
    """
    Detects silence intervals (start, end) using FFmpeg's silencedetect filter.
    Returns a list of (silence_start, silence_end).
    """
    cmd = [
        "ffmpeg", "-hide_banner", "-nostats",
        "-i", file_path,
        "-af", f"silencedetect=noise={noise_threshold_db}dB:d={min_duration_sec}",
        "-f", "null", "-"
    ]
    
    proc = subprocess.run(cmd, capture_output=True, text=True)
    output = proc.stderr

    silence_starts = []
    silence_intervals = []

    for line in output.splitlines():
        if "silence_start:" in line:
            m = re.search(r"silence_start:\s*([0-9\.]+)", line)
            if m:
                silence_starts.append(float(m.group(1)))
        elif "silence_end:" in line:
            m = re.search(r"silence_end:\s*([0-9\.]+)", line)
            if m and silence_starts:
                start = silence_starts.pop(0)
                end = float(m.group(1))
                if end > start:
                    silence_intervals.append((start, end))

    return silence_intervals


def detect_fillers_with_whisper(file_path: str, lang: str = "vi", model_size: str = "small") -> Tuple[List[Tuple[float, float, str]], List[Dict[str, Any]]]:
    """
    Runs Faster-Whisper to find word-level timestamps and detect hesitation tokens.
    Returns:
      filler_intervals: List of (start, end, word)
      all_words: List of all detected words with timestamps
    """
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("⚠️ faster_whisper not found in environment. Skipping filler detection.")
        return [], []

    print(f"🎙️ Đang phân tích âm thanh bằng Whisper ({model_size}, ngôn ngữ: {lang}) để tìm từ đệm (fillers)...")
    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    segments, _ = model.transcribe(file_path, language=lang, word_timestamps=True)

    fillers_set = FILLER_WORDS.get(lang, FILLER_WORDS["vi"])
    filler_intervals = []
    all_words = []

    for seg in segments:
        for w in seg.words:
            raw_w = w.word.strip()
            clean_w = re.sub(r"[^\w\s]", "", raw_w.lower()).strip()
            word_obj = {
                "word": raw_w,
                "clean": clean_w,
                "start": round(w.start, 3),
                "end": round(w.end, 3),
                "prob": round(w.probability, 3)
            }
            all_words.append(word_obj)

            if clean_w in fillers_set and (w.end - w.start) >= 0.15:
                filler_intervals.append((w.start, w.end, raw_w))

    print(f"🔍 Tìm thấy {len(filler_intervals)} từ đệm/ngập ngừng: {[f[2] for f in filler_intervals[:10]]}{'...' if len(filler_intervals) > 10 else ''}")
    return filler_intervals, all_words


def compute_keep_intervals(
    total_duration: float,
    cut_intervals: List[Tuple[float, float]],
    padding_start: float = 0.06,
    padding_end: float = 0.08,
    min_keep_duration: float = 0.15
) -> List[Tuple[float, float]]:
    """
    Inverts cut intervals into keep intervals, applying safety padding to preserve natural word attacks and decays.
    Merges overlapping or tightly adjacent intervals.
    """
    if not cut_intervals:
        return [(0.0, total_duration)]

    # Sort cuts
    cuts = sorted(cut_intervals, key=lambda x: x[0])
    
    # Invert to raw keeps
    raw_keeps = []
    curr = 0.0
    for c_start, c_end in cuts:
        if c_start > curr:
            raw_keeps.append((curr, c_start))
        curr = max(curr, c_end)
    if curr < total_duration:
        raw_keeps.append((curr, total_duration))

    # Apply padding to keeps
    padded_keeps = []
    for s, e in raw_keeps:
        pad_s = max(0.0, s - padding_start)
        pad_e = min(total_duration, e + padding_end)
        if pad_e - pad_s >= min_keep_duration:
            padded_keeps.append((pad_s, pad_e))

    # Merge overlapping or close intervals (< 0.15s gap)
    if not padded_keeps:
        return [(0.0, total_duration)]

    merged = [padded_keeps[0]]
    for next_s, next_e in padded_keeps[1:]:
        prev_s, prev_e = merged[-1]
        if next_s <= prev_e + 0.15:
            merged[-1] = (prev_s, max(prev_e, next_e))
        else:
            merged.append((next_s, next_e))

    # Clamp bounds
    final_keeps = [(round(max(0.0, s), 3), round(min(total_duration, e), 3)) for s, e in merged]
    return final_keeps


def render_trimmed_media(
    input_path: str,
    output_path: str,
    keep_intervals: List[Tuple[float, float]],
    is_video: bool = True
):
    """
    Uses FFmpeg select/aselect filter to output the jump-cut video or audio cleanly in one pass.
    """
    out_dir = Path(output_path).parent
    out_dir.mkdir(parents=True, exist_ok=True)

    # Build select expression: between(t, s0, e0) + between(t, s1, e1) + ...
    conds = [f"between(t,{s:.3f},{e:.3f})" for s, e in keep_intervals]
    expr = "+".join(conds)

    if is_video:
        # Filter for video and audio
        filter_complex = (
            f"[0:v]select='{expr}',setpts=N/FRAME_RATE/TB[v];"
            f"[0:a]aselect='{expr}',asetpts=N/SR/TB[a]"
        )
        cmd = [
            "ffmpeg", "-y", "-hide_banner",
            "-i", input_path,
            "-filter_complex", filter_complex,
            "-map", "[v]", "-map", "[a]",
            "-c:v", "libx264", "-crf", "18", "-preset", "fast",
            "-c:a", "aac", "-b:a", "192k",
            output_path
        ]
    else:
        # Audio only
        filter_complex = f"[0:a]aselect='{expr}',asetpts=N/SR/TB[a]"
        cmd = [
            "ffmpeg", "-y", "-hide_banner",
            "-i", input_path,
            "-filter_complex", filter_complex,
            "-map", "[a]",
            "-c:a", "pcm_s16le" if output_path.endswith(".wav") else "aac",
            output_path
        ]

    print(f"🎬 Đang xuất file cắt bằng FFmpeg: {output_path}...")
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        print(f"❌ Lỗi khi render media: {proc.stderr}")
        raise RuntimeError("FFmpeg trim failed.")
    print(f"✅ Đã tạo thành công: {output_path}")


def realign_words_to_trimmed_timeline(
    words: List[Dict[str, Any]],
    keep_intervals: List[Tuple[float, float]]
) -> List[Dict[str, Any]]:
    """
    Recalculates word timestamps from original timeline to trimmed jump-cut timeline.
    Drops words that were entirely cut out (e.g. fillers or words inside silent cuts).
    """
    realigned = []

    for w in words:
        w_start = w["start"]
        w_end = w["end"]
        mid = (w_start + w_end) / 2.0

        # Find which keep interval this word falls into
        target_interval_idx = -1
        for idx, (k_start, k_end) in enumerate(keep_intervals):
            if k_start <= mid <= k_end:
                target_interval_idx = idx
                break

        if target_interval_idx == -1:
            continue  # Word was cut out

        # Cumulative duration before this interval in the new timeline
        offset = sum((k_end - k_start) for k_start, k_end in keep_intervals[:target_interval_idx])
        curr_k_start = keep_intervals[target_interval_idx][0]

        new_start = offset + max(0.0, w_start - curr_k_start)
        new_end = offset + (w_end - curr_k_start)

        realigned.append({
            "w": w.get("w", w.get("word", "")),
            "s": round(new_start, 3),
            "e": round(new_end, 3)
        })

    return realigned


def trim_yap_pipeline(
    input_path: str,
    output_path: str,
    silence_thresh: float = -32.0,
    min_silence: float = 0.35,
    padding: float = 0.08,
    remove_fillers: bool = False,
    lang: str = "vi",
    model_size: str = "small",
    export_captions: bool = True
) -> Dict[str, Any]:
    """
    End-to-end execution of silence and filler trimming.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file not found: {input_path}")

    is_video = input_path.lower().endswith((".mp4", ".mov", ".mkv", ".webm"))
    total_duration = get_media_duration(input_path)
    print(f"⏱️ Tổng thời lượng gốc: {total_duration:.2f}s ({Path(input_path).name})")

    # 1. Detect silences
    print(f"🔇 Đang phát hiện khoảng lặng (ngưỡng: {silence_thresh}dB, độ dài tối thiểu: {min_silence}s)...")
    silence_cuts = detect_silence(input_path, noise_threshold_db=silence_thresh, min_duration_sec=min_silence)
    print(f"📊 Tìm thấy {len(silence_cuts)} đoạn im lặng/chết nhịp.")

    all_cuts = list(silence_cuts)
    all_words = []
    filler_info = []

    # 2. Filler word detection
    if remove_fillers:
        filler_cuts, all_words = detect_fillers_with_whisper(input_path, lang=lang, model_size=model_size)
        for f_s, f_e, f_word in filler_cuts:
            all_cuts.append((f_s, f_e))
            filler_info.append({"word": f_word, "start": f_s, "end": f_e})

    # 3. Compute keep segments
    keep_intervals = compute_keep_intervals(
        total_duration=total_duration,
        cut_intervals=all_cuts,
        padding_start=padding,
        padding_end=padding
    )

    new_duration = sum((e - s) for s, e in keep_intervals)
    saved_time = total_duration - new_duration
    pct_cut = (saved_time / total_duration) * 100.0 if total_duration > 0 else 0.0

    print(f"✂️ Kết quả: Thời lượng mới {new_duration:.2f}s (Đã cắt bỏ {saved_time:.2f}s - {pct_cut:.1f}% thời gian dư thừa)")

    # 4. Render media
    render_trimmed_media(input_path, output_path, keep_intervals, is_video=is_video)

    # 5. Export report & realigned captions
    out_dir = Path(output_path).parent
    base_name = Path(output_path).stem

    report_path = out_dir / f"{base_name}_cut_report.json"
    report_data = {
        "original_file": input_path,
        "trimmed_file": output_path,
        "original_duration_sec": round(total_duration, 3),
        "new_duration_sec": round(new_duration, 3),
        "time_saved_sec": round(saved_time, 3),
        "percent_trimmed": round(pct_cut, 2),
        "num_cuts": len(all_cuts),
        "keep_intervals": keep_intervals,
        "fillers_removed": filler_info
    }
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report_data, f, ensure_ascii=False, indent=2)
    print(f"📝 Đã lưu báo cáo cắt: {report_path}")

    if export_captions and all_words:
        realigned_words = realign_words_to_trimmed_timeline(all_words, keep_intervals)
        captions_path = out_dir / f"{base_name}_captions.json"
        with open(captions_path, "w", encoding="utf-8") as f:
            json.dump(realigned_words, f, ensure_ascii=False, indent=2)
        print(f"💬 Đã xuất phụ đề khớp mốc mới: {captions_path} ({len(realigned_words)} từ)")

    return report_data


def main():
    parser = argparse.ArgumentParser(description="Auto Silence & Filler Trimmer for Yap Videos")
    parser.add_argument("--input", "-i", required=True, help="Path to raw video or audio file")
    parser.add_argument("--output", "-o", required=True, help="Path to output trimmed file")
    parser.add_argument("--silence-thresh", type=float, default=-32.0, help="Silence threshold in dB (default: -32.0)")
    parser.add_argument("--min-silence", type=float, default=0.35, help="Minimum silence duration in seconds (default: 0.35)")
    parser.add_argument("--padding", type=float, default=0.08, help="Speech edge padding in seconds (default: 0.08)")
    parser.add_argument("--remove-fillers", action="store_true", help="Use Faster-Whisper to detect & remove filler hesitation words")
    parser.add_argument("--lang", default="vi", help="Audio language (vi/en)")
    parser.add_argument("--model-size", default="small", help="Whisper model size (tiny, base, small, medium)")
    parser.add_argument("--no-captions", action="store_true", help="Do not export realigned captions JSON")

    args = parser.parse_args()

    trim_yap_pipeline(
        input_path=args.input,
        output_path=args.output,
        silence_thresh=args.silence_thresh,
        min_silence=args.min_silence,
        padding=args.padding,
        remove_fillers=args.remove_fillers,
        lang=args.lang,
        model_size=args.model_size,
        export_captions=not args.no_captions
    )


if __name__ == "__main__":
    main()
