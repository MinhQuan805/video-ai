import json
from pathlib import Path

FPS = 30
WORDS_PATH = "videos/ranking/10-23-26/words.json"
TIMING_PATH = "videos/ranking/10-23-26/timing.txt"
OUTPUT_PATH = "src/videos/ranking/captions.json"

with open(WORDS_PATH, "r", encoding="utf-8") as f:
    words = json.load(f)

with open(TIMING_PATH, "r", encoding="utf-8") as f:
    timing_lines = [line.strip() for line in f if line.strip()]

total_frames = int(timing_lines[0])

# Parse timing lines: <start_frame> <phrase text>
phrases = []
for idx, line in enumerate(timing_lines[1:]):
    parts = line.split(" ", 1)
    if len(parts) == 2:
        start_frame = int(parts[0])
        phrase_text = parts[1]
        next_frame = total_frames
        if idx + 2 < len(timing_lines):
            next_parts = timing_lines[idx + 2].split(" ", 1)
            next_frame = int(next_parts[0])
        
        # Split phrase into words
        word_list = phrase_text.split()
        word_count = len(word_list)
        phrase_duration = max(8, next_frame - start_frame)
        word_duration = phrase_duration / max(1, word_count)
        
        words_detail = []
        for w_i, w_text in enumerate(word_list):
            w_start = round(start_frame + w_i * word_duration)
            w_end = round(start_frame + (w_i + 1) * word_duration)
            words_detail.append({
                "text": w_text,
                "start_frame": w_start,
                "end_frame": w_end
            })
            
        phrases.append({
            "start_frame": start_frame,
            "end_frame": next_frame,
            "text": phrase_text,
            "words": words_detail
        })

output_data = {
    "total_frames": total_frames,
    "phrases": phrases
}

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"Generated {OUTPUT_PATH} with {len(phrases)} phrases and word-level karaoke timing.")
