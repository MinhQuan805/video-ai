import os
import sys
import json
from faster_whisper import WhisperModel

out_wav = r'videos/paper/26-10-26-4-buoc-ai-agent/assets/user_voice.wav'
out_json = r'videos/paper/26-10-26-4-buoc-ai-agent/whisper_transcription.json'

print("Loading Whisper model...")
model = WhisperModel('base', device='cpu', compute_type='int8')
segments, info = model.transcribe(out_wav, language='vi', word_timestamps=True)

results = []
for segment in segments:
    seg_dict = {
        'start': segment.start,
        'end': segment.end,
        'text': segment.text,
        'words': [{'word': w.word, 'start': w.start, 'end': w.end} for w in (segment.words or [])]
    }
    results.append(seg_dict)

with open(out_json, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Transcription saved to {out_json}. Found {len(results)} segments.")
