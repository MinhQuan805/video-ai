import json
import re
import sys
import unicodedata
from pathlib import Path
from faster_whisper import WhisperModel

sys.stdout.reconfigure(encoding='utf-8')


def clean_word(w: str) -> str:
    """Loại bỏ dấu câu và chuyển về chữ thường để so sánh."""
    w = unicodedata.normalize("NFC", w.lower())
    return re.sub(r"[^\w\s]", "", w).strip()


def align_sentence_words(script_words, whisper_words, sentence_start, sentence_end):
    """
    Gióng danh sách từ trong script với kết quả whisper trong phạm vi [sentence_start, sentence_end].
    Các từ không khớp sẽ được chia đều thời gian giữa 2 mốc gần nhất.
    """
    n = len(script_words)
    if n == 0:
        return []

    # Lọc các từ whisper nằm trong khoảng thời gian của câu
    w_candidates = []
    for ww in whisper_words:
        if ww["start"] >= sentence_start - 0.25 and ww["end"] <= sentence_end + 0.35:
            w_candidates.append(ww)

    matched = [None] * n
    w_idx = 0

    for i, sw in enumerate(script_words):
        sw_clean = clean_word(sw)
        if not sw_clean:
            continue
        best_match_idx = -1
        for j in range(w_idx, min(w_idx + 8, len(w_candidates))):
            cand_clean = clean_word(w_candidates[j]["word"])
            if cand_clean == sw_clean or cand_clean in sw_clean or sw_clean in cand_clean:
                best_match_idx = j
                break
        
        if best_match_idx != -1:
            cw = w_candidates[best_match_idx]
            s = max(sentence_start, cw["start"])
            e = min(sentence_end, cw["end"])
            if e > s:
                matched[i] = (s, e)
                w_idx = best_match_idx + 1

    anchors = []
    anchors.append((-1, sentence_start, sentence_start))
    for i in range(n):
        if matched[i] is not None:
            prev_e = anchors[-1][2]
            s, e = matched[i]
            if s >= prev_e and e > s:
                anchors.append((i, s, e))
    anchors.append((n, sentence_end, sentence_end))

    final_timings = [None] * n
    for k in range(len(anchors) - 1):
        idx_prev, _, end_prev = anchors[k]
        idx_next, start_next, _ = anchors[k + 1]

        unmatched_count = (idx_next - 1) - (idx_prev + 1) + 1
        if unmatched_count > 0:
            total_duration = max(0.01 * unmatched_count, start_next - end_prev)
            dt = total_duration / unmatched_count
            for step, i in enumerate(range(idx_prev + 1, idx_next)):
                w_s = end_prev + step * dt
                w_e = w_s + dt
                final_timings[i] = (round(w_s, 3), round(w_e, 3))
        
        if idx_next < n:
            final_timings[idx_next] = (round(start_next, 3), round(anchors[k+1][2], 3))

    result = []
    for i in range(n):
        s, e = final_timings[i]
        if e <= s:
            e = round(s + 0.05, 3)
        result.append({
            "w": script_words[i],
            "s": s,
            "e": e
        })

    return result


def transcribe_and_align(
    audio_path: str = "videos/darwin/voice.wav",
    script_path: str = "videos/darwin/script.md",
    sentences_path: str = "videos/darwin/sentences.json",
    output_words_path: str = "videos/darwin/words.json",
    model_size: str = "small"
):
    print(f"⏳ Đang tải mô hình Whisper {model_size} trên CPU...")
    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    print(f"✅ Đã tải thành công Whisper {model_size} trên CPU.")

    print(f"🎙️ Đang nghe {audio_path} bằng tiếng Việt để lấy mốc từng chữ...")
    segments, _ = model.transcribe(audio_path, language="vi", word_timestamps=True)

    whisper_words = []
    for segment in segments:
        for w in segment.words:
            whisper_words.append({
                "word": w.word.strip(),
                "start": round(w.start, 3),
                "end": round(w.end, 3)
            })

    print(f"✅ Whisper nhận diện được {len(whisper_words)} từ.")

    with open(sentences_path, "r", encoding="utf-8") as f:
        sentences = json.load(f)

    with open(script_path, "r", encoding="utf-8") as f:
        script_lines = [l.strip() for l in f if l.strip() and not l.startswith("#")]

    all_words = []
    for s_idx, sentence_info in enumerate(sentences):
        sentence_text = script_lines[s_idx]
        words_in_sentence = sentence_text.split()
        s_start = sentence_info["start"]
        s_end = sentence_info["end"]

        aligned = align_sentence_words(words_in_sentence, whisper_words, s_start, s_end)
        all_words.extend(aligned)

    out_p = Path(output_words_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    with open(out_p, "w", encoding="utf-8") as f:
        json.dump(all_words, f, ensure_ascii=False, indent=2)

    print(f"🎉 Đã lưu {len(all_words)} chữ vào {output_words_path}.")
    return all_words


if __name__ == "__main__":
    transcribe_and_align()
