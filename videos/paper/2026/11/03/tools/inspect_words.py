import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/videos/paper/03-11-26/captions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, p in enumerate(data):
    words_detail = [(w['text'], w['start_frame'], w['end_frame']) for w in p['words']]
    print(f"[{i:02d}] '{p['text']}' -> {words_detail}")
