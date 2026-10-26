import json
import math
import re
import sys
import unicodedata
from pathlib import Path
from faster_whisper import WhisperModel

sys.stdout.reconfigure(encoding='utf-8')

AUDIO_PATH = "videos/ranking/10-23-26/voice.wav"
SCRIPT_PATH = "videos/ranking/10-23-26/script.md"
SENTENCES_PATH = "videos/ranking/10-23-26/sentences.json"
WORDS_PATH = "videos/ranking/10-23-26/words.json"
TIMING_PATH = "videos/ranking/10-23-26/timing.txt"
SCENES_PATH = "videos/ranking/10-23-26/scenes.json"
FPS = 30


def run():
    print(f"Loading Whisper model...")
    model = WhisperModel("small", device="cpu", compute_type="int8")
    
    print(f"Transcribing {AUDIO_PATH}...")
    segments, info = model.transcribe(AUDIO_PATH, language="vi", word_timestamps=True)
    
    raw_segments = []
    all_words = []
    
    for seg in segments:
        seg_dict = {
            "start": round(seg.start, 3),
            "end": round(seg.end, 3),
            "text": seg.text.strip(),
            "words": []
        }
        for w in seg.words:
            w_dict = {
                "w": w.word.strip(),
                "s": round(w.start, 3),
                "e": round(w.end, 3)
            }
            seg_dict["words"].append(w_dict)
            all_words.append(w_dict)
        raw_segments.append(seg_dict)
        print(f"[{seg.start:.2f}s -> {seg.end:.2f}s] {seg.text}")

    # Save words.json
    with open(WORDS_PATH, "w", encoding="utf-8") as f:
        json.dump(all_words, f, ensure_ascii=False, indent=2)

    # Save sentences.json
    with open(SENTENCES_PATH, "w", encoding="utf-8") as f:
        json.dump(raw_segments, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(all_words)} words and {len(raw_segments)} segments.")


if __name__ == "__main__":
    run()
