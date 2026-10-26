from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

episode = Path(__file__).resolve().parent
output = episode / 'output'
frames = [40, 180, 340, 500, 660, 820, 980, 1140, 1300, 1500]
labels = [
    '01 / Hook',
    '02 / Step 1',
    '03 / Search app',
    '04 / Work on device',
    '05 / Connect tools',
    '06 / Classify email',
    '07 / Gmail connector',
    '08 / Step 3',
    '09 / Create skill',
    '10 / CTA'
]

panel_w, panel_h, gap, header = 216, 384, 12, 38
columns = 5
rows = (len(frames) + columns - 1) // columns
canvas = Image.new('RGB', (columns * (panel_w + gap) + gap, rows * (panel_h + header + gap) + gap), '#FAF8F5')
draw = ImageDraw.Draw(canvas)

try:
    font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 16)
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
