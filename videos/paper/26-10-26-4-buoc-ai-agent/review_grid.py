from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

episode = Path(__file__).resolve().parent
output = episode / 'output'
frames = [60, 145, 220, 360, 465, 542, 620, 715, 790, 880, 930, 1020, 1140, 1220, 1310, 1430, 1530]
labels = [
    '01 / Hook',
    '02 / Step 1 Badge',
    '03 / Chatbot vs Code',
    '04 / Local Machine',
    '05 / Step 2 Badge',
    '06 / Connectors',
    '07 / Gmail Scanner',
    '08 / Problem Triage',
    '09 / CTA Comment',
    '10 / Step 3 Badge',
    '11 / Prompt Rules',
    '12 / Draft Approval',
    '13 / Iteration Loop',
    '14 / Step 4 Badge',
    '15 / Package Skill',
    '16 / Slash & Cron',
    '17 / Complete'
]

panel_w, panel_h, gap, header = 216, 384, 12, 38
columns = 6
rows = (len(frames) + columns - 1) // columns
canvas = Image.new('RGB', (columns * (panel_w + gap) + gap, rows * (panel_h + header + gap) + gap), '#FAF8F5')
draw = ImageDraw.Draw(canvas)

try:
    font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 15)
except Exception:
    font = ImageFont.load_default()

for i, (frame, label) in enumerate(zip(frames, labels)):
    x = gap + (i % columns) * (panel_w + gap)
    y = gap + (i // columns) * (panel_h + header + gap)
    draw.text((x + 4, y + 10), f'{label} (f{frame})', fill='#1A1816', font=font)
    frame_path = output / 'review-frames' / f'{frame}.png'
    if frame_path.exists():
        with Image.open(frame_path) as still:
            canvas.paste(still.convert('RGB').resize((panel_w, panel_h), Image.Resampling.LANCZOS), (x, y + header))

review_path = output / 'review.png'
canvas.save(review_path)
print(f'Review grid generated: {review_path}')
