import json
import math
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

WORDS_PATH = "videos/ranking/10-23-26/words.json"
SENTENCES_PATH = "videos/ranking/10-23-26/sentences.json"
SCENES_PATH = "videos/ranking/10-23-26/scenes.json"
TIMING_PATH = "videos/ranking/10-23-26/timing.txt"
FPS = 30

with open(WORDS_PATH, "r", encoding="utf-8") as f:
    words = json.load(f)

with open(SENTENCES_PATH, "r", encoding="utf-8") as f:
    sentences = json.load(f)

print(f"Total words: {len(words)}")

# Find key anchor words for each scene
# 1. Meta Ads (Hạng C)
# 2. Cold Outreach (Hạng A)
# 3. Spam DM (Hạng F)
# 4. Referral (Hạng S)
# 5. Content Marketing (Hạng B)
# 6. Còn bạn...

def find_word_time(target_keywords, start_after_sec=0.0):
    for idx, w in enumerate(words):
        if w["s"] < start_after_sec:
            continue
        cleaned = w["w"].lower().strip(",.?! ")
        for kw in target_keywords:
            if kw.lower() in cleaned:
                return idx, w
    return -1, None

# Let's inspect words around "hạng"
for i, w in enumerate(words):
    if "hạn" in w["w"].lower() or "c" == w["w"].lower() or "a" == w["w"].lower() or "s" == w["w"].lower() or "b" == w["w"].lower() or "f" == w["w"].lower():
        print(f"[{w['s']:.2f}s - {w['e']:.2f}s] {w['w']}")

# Construct natural phrase timing.txt
# Group words into 2-4 word natural phrases
phrases = []
curr_phrase = []
curr_start = 0

for i, w in enumerate(words):
    if not curr_phrase:
        curr_start = w["s"]
    curr_phrase.append(w["w"])
    # Split on punctuation or length 3
    has_punct = any(p in w["w"] for p in [",", ".", "?", "!", ":", ";", "–"])
    if len(curr_phrase) >= 3 or has_punct or (i == len(words) - 1):
        phrase_text = " ".join(curr_phrase).strip()
        phrases.append({
            "start_sec": curr_start,
            "start_frame": round(curr_start * FPS),
            "text": phrase_text
        })
        curr_phrase = []

total_frames = math.ceil(sentences[-1]["end"] * FPS)
timing_lines = [str(total_frames)]
for p in phrases:
    timing_lines.append(f"{p['start_frame']} {p['text']}")

with open(TIMING_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(timing_lines) + "\n")

print(f"Saved timing.txt with {len(phrases)} phrases, total frames: {total_frames}")
