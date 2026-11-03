import json

with open('src/videos/paper/03-11-26/captions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

lines = []
for item in data:
    sf = item.get('start_frame', 0)
    ef = item.get('end_frame', 0)
    text = item.get('text', '')
    lines.append(f"{sf:4d} - {ef:4d}: {text}")

with open('videos/paper/2026/11/03/timing.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines) + '\n')

print("timing.txt synchronized with corrected captions!")
