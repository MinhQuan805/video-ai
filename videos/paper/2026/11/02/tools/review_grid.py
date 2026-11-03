import os
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

def main():
    output = Path("videos/paper/02-11-26/output").resolve()
    frames_dir = output / 'review-frames'
    frames_dir.mkdir(parents=True, exist_ok=True)

    frames = [
        40, 95, 220, 340, 440, 500, 580,
        690, 800, 890, 980, 1060, 1120, 1240, 1500
    ]
    labels = [
        '01 / Blueprint Ban đầu',
        '02 / Dập Mộc AI-Slop',
        '03 / Tiêu Đề To & Bo Góc',
        '04 / Đổi Tên Công Ty Bừa',
        '05 / Bánh Xe Đổi Màu',
        '06 / Hiệu Ứng Bắn Bừa',
        '07 / Bàn Cân Mơ Hồ ?',
        '08 / Cắm Module Skill',
        '09 / Emil Kowalski Repo',
        '10 / Dick Wu Apple HIG',
        '11 / Nhấn Nút Không Trễ',
        '12 / Kéo Rubber-Band',
        '13 / Liquid Glass Mờ Sâu',
        '14 / Đóng Dấu Brand Brief',
        '15 / Thước Kẹp Chuẩn Pixel'
    ]

    print(f"Extracting {len(frames)} review frames using Remotion still renderer...")
    for f_num in frames:
        dest = frames_dir / f'{f_num}.png'
        cmd = [
            'npx', 'remotion', 'still', 'src/index.ts', 'paper-2026-11-02',
            f'--frame={f_num}',
            f'--output={str(dest)}',
            '--gl=angle'
        ]
        subprocess.run(cmd, check=True, shell=True)

    panel_w, panel_h, gap, header = 216, 384, 12, 38
    columns = 5
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
        frame_path = frames_dir / f'{frame}.png'
        if frame_path.exists():
            with Image.open(frame_path) as still:
                canvas.paste(still.convert('RGB').resize((panel_w, panel_h), Image.Resampling.LANCZOS), (x, y + header))

    review_path = output / 'review.png'
    canvas.save(review_path)
    print(f'Review grid generated: {review_path}')

if __name__ == '__main__':
    main()
