from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

episode = Path(__file__).resolve().parent
output = episode / 'output'
frames = [40, 115, 152, 210, 290, 430, 480, 560, 640, 740, 805, 910, 1070, 1240]
labels = [
    '01 / Hộp mở & Tem bay vào',
    '02 / Rương phồng to dần',
    '03 / Hộp đóng & Cài chốt khóa',
    '04 / Bánh răng tuôn sớ',
    '05 / Chuyên gia 20 năm',
    '06 / Cẩu cơ khí gắp note',
    '07 / Thả ô chat & Sửa',
    '08 / Cụm Module Skill',
    '09 / 3 Khe cắm tri thức',
    '10 / 3 Thẻ Card To & Rõ',
    '11 / Sáp nhập thành Skill',
    '12 / Xưởng sản xuất bài viết',
    '13 / Vô lăng vs Động cơ',
    '14 / Trạm Đúc Skill (CTA)'
]

panel_w, panel_h, gap, header = 216, 384, 12, 38
columns = 7
rows = (len(frames) + columns - 1) // columns
canvas = Image.new('RGB', (columns * (panel_w + gap) + gap, rows * (panel_h + header + gap) + gap), '#FAF8F5')
draw = ImageDraw.Draw(canvas)

try:
    font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 14)
except Exception:
    font = ImageFont.load_default()

for i, (frame, label) in enumerate(zip(frames, labels)):
    x = gap + (i % columns) * (panel_w + gap)
    y = gap + (i // columns) * (panel_h + header + gap)
    draw.text((x + 4, y + 8), f'{label} (f{frame})', fill='#1A1816', font=font)
    frame_path = output / 'review-frames' / f'{frame}.png'
    if frame_path.exists():
        with Image.open(frame_path) as still:
            canvas.paste(still.convert('RGB').resize((panel_w, panel_h), Image.Resampling.LANCZOS), (x, y + header))

review_path = output / 'review.png'
canvas.save(review_path)
print(f'Review grid generated: {review_path}')
