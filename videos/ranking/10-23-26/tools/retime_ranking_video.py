import os
import sys
import json
import subprocess
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

# Root directory
ROOT_DIR = Path(__file__).resolve().parents[4]

# Input original video
INPUT_VIDEO = ROOT_DIR / "public" / "videos" / "ranking" / "10-23-26" / "assets" / "10-23-26.mp4"
OUTPUT_VIDEO = ROOT_DIR / "public" / "videos" / "ranking" / "10-23-26" / "assets" / "10-23-26_speed.mp4"

FPS = 30

# Original segments: [start_frame, end_frame, speed]
# Ranking parts are 1.0x, explanation parts are 1.2x
SEGMENTS = [
    # 0. Meta Ads Ranking
    [0, 64, 1.0],
    # 1. Meta Ads Explanation
    [64, 221, 1.2],
    # 2. Cold Outreach Ranking
    [221, 272, 1.0],
    # 3. Cold Outreach Explanation
    [272, 421, 1.2],
    # 4. Spam DM Ranking
    [421, 500, 1.0],
    # 5. Spam DM Explanation
    [500, 660, 1.2],
    # 6. Referral Ranking
    [660, 716, 1.0],
    # 7. Referral Explanation
    [716, 848, 1.2],
    # 8. Content Marketing Ranking
    [848, 940, 1.0],
    # 9. Content Marketing Explanation
    [940, 1101, 1.2],
    # 10. Outro
    [1101, 1208, 1.0],
]

def compute_segment_mappings():
    mappings = []
    current_new_frame = 0
    
    for s_start, s_end, speed in SEGMENTS:
        orig_dur = s_end - s_start
        new_dur = int(round(orig_dur / speed))
        new_start = current_new_frame
        new_end = new_start + new_dur
        mappings.append({
            'orig_start': s_start,
            'orig_end': s_end,
            'speed': speed,
            'new_start': new_start,
            'new_end': new_end,
        })
        current_new_frame = new_end
        
    return mappings, current_new_frame

mappings, total_new_frames = compute_segment_mappings()

def map_frame(f):
    if f is None or f == 0:
        return 0
    for m in mappings:
        if m['orig_start'] <= f <= m['orig_end']:
            offset = f - m['orig_start']
            res = m['new_start'] + int(round(offset / m['speed']))
            return min(res, m['new_end'])
    # If beyond last segment
    last = mappings[-1]
    if f > last['orig_end']:
        return last['new_end']
    return 0

def render_speed_video():
    print(f"🎬 Đang render video tốc độ mới: {OUTPUT_VIDEO.name}...")
    
    filter_parts = []
    concat_inputs = []
    
    for i, m in enumerate(mappings):
        t_start = m['orig_start'] / FPS
        t_end = m['orig_end'] / FPS
        speed = m['speed']
        
        # Video filter with constant 30fps guarantee
        if speed == 1.0:
            filter_parts.append(f"[0:v]trim=start={t_start:.4f}:end={t_end:.4f},setpts=PTS-STARTPTS,fps=30[v{i}]")
            filter_parts.append(f"[0:a]atrim=start={t_start:.4f}:end={t_end:.4f},asetpts=PTS-STARTPTS[a{i}]")
        else:
            filter_parts.append(f"[0:v]trim=start={t_start:.4f}:end={t_end:.4f},setpts=(PTS-STARTPTS)/{speed},fps=30[v{i}]")
            filter_parts.append(f"[0:a]atrim=start={t_start:.4f}:end={t_end:.4f},asetpts=PTS-STARTPTS,atempo={speed}[a{i}]")
            
        concat_inputs.append(f"[v{i}][a{i}]")
        
    filter_complex = ";".join(filter_parts) + f";{''.join(concat_inputs)}concat=n={len(mappings)}:v=1:a=1[outv][outa]"
    
    cmd = [
        "ffmpeg", "-y",
        "-i", str(INPUT_VIDEO),
        "-filter_complex", filter_complex,
        "-map", "[outv]",
        "-map", "[outa]",
        "-r", "30",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "17",
        "-g", "1",
        "-keyint_min", "1",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        str(OUTPUT_VIDEO)
    ]
    
    print(f"Lệnh ffmpeg: {' '.join(cmd[:6])} ...")
    res = subprocess.run(cmd, capture_output=True, text=True, errors='replace')
    if res.returncode != 0:
        print("Lỗi ffmpeg:", res.stderr)
        sys.exit(1)
        
    print(f"✅ Render video hoàn tất: {OUTPUT_VIDEO}")

def update_captions():
    timing_file = ROOT_DIR / "videos" / "ranking" / "10-23-26" / "timing.txt"
    captions_file = ROOT_DIR / "src" / "videos" / "ranking" / "captions.json"
    
    with open(timing_file, "r", encoding="utf-8") as f:
        timing_lines = [line.strip() for line in f if line.strip()]
        
    orig_total_frames = int(timing_lines[0])
    phrases = []
    
    for idx, line in enumerate(timing_lines[1:]):
        parts = line.split(" ", 1)
        if len(parts) == 2:
            start_f = int(parts[0])
            phrase_text = parts[1]
            next_f = orig_total_frames
            if idx + 2 < len(timing_lines):
                next_parts = timing_lines[idx + 2].split(" ", 1)
                next_f = int(next_parts[0])
                
            word_list = phrase_text.split()
            word_count = len(word_list)
            phrase_dur = max(8, next_f - start_f)
            word_dur = phrase_dur / max(1, word_count)
            
            words_detail = []
            for w_i, w_text in enumerate(word_list):
                w_start = round(start_f + w_i * word_dur)
                w_end = round(start_f + (w_i + 1) * word_dur)
                mapped_w_start = map_frame(w_start)
                mapped_w_end = max(mapped_w_start + 1, map_frame(w_end))
                words_detail.append({
                    "text": w_text,
                    "start_frame": mapped_w_start,
                    "end_frame": mapped_w_end
                })
                
            mapped_start = map_frame(start_f)
            mapped_end = max(mapped_start + 1, map_frame(next_f))
            phrases.append({
                "start_frame": mapped_start,
                "end_frame": mapped_end,
                "text": phrase_text,
                "words": words_detail
            })
            
    output_data = {
        "total_frames": total_new_frames,
        "phrases": phrases
    }
    
    with open(captions_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    episode_captions_file = ROOT_DIR / "src" / "videos" / "ranking" / "10-23-26" / "captions.json"
    with open(episode_captions_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
        
    print(f"✅ Cập nhật captions.json từ timing gốc ({total_new_frames} frames, {len(phrases)} phrases)")

def update_scenes():
    orig_scenes_file = ROOT_DIR / "videos" / "ranking" / "10-23-26" / "scenes.json"
    dest_scenes_file = ROOT_DIR / "src" / "videos" / "ranking" / "scenes.json"
    episode_scenes_file = ROOT_DIR / "src" / "videos" / "ranking" / "10-23-26" / "scenes.json"
    
    with open(orig_scenes_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    data["total_frames"] = total_new_frames
    
    for s in data["scenes"]:
        s["start_frame"] = map_frame(s["start_frame"])
        s["end_frame"] = map_frame(s["end_frame"])
        if s.get("fly_frame"):
            s["fly_frame"] = map_frame(s["fly_frame"])
        if s.get("land_frame"):
            s["land_frame"] = map_frame(s["land_frame"])
        if s.get("card_start_frame"):
            s["card_start_frame"] = map_frame(s["card_start_frame"])
        if s.get("card_end_frame"):
            s["card_end_frame"] = map_frame(s["card_end_frame"])
            
    with open(dest_scenes_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    with open(episode_scenes_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    print(f"✅ Cập nhật scenes.json từ scenes gốc ({total_new_frames} frames)")

if __name__ == "__main__":
    print(f"📊 Tổng frame cũ: 1208 -> Tổng frame mới: {total_new_frames}")
    for idx, m in enumerate(mappings):
        speed_label = f"{m['speed']}x"
        print(f"  Phần {idx}: [{m['orig_start']} -> {m['orig_end']}] @ {speed_label} => [{m['new_start']} -> {m['new_end']}] (dur: {m['new_end'] - m['new_start']})")
        
    if "--skip-video" not in sys.argv:
        render_speed_video()
    update_captions()
    update_scenes()
