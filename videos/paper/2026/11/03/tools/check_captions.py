import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/videos/paper/03-11-26/captions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, phrase in enumerate(data):
    words = [w['text'] for w in phrase.get('words', [])]
    print(f"Phrase {i}: {phrase.get('text')} -> Words: {' '.join(words)}")
