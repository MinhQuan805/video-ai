import os
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

def main():
    base_dir = Path("videos/paper/2026/11/03").resolve()
    output = base_dir / 'output'
    frames_dir = output / 'review-frames'
    frames_dir.mkdir(parents=True, exist_ok=True)

    frames = [45, 145, 260, 395, 530, 650, 760, 885, 1010, 1130]
    labels = [
        '01 / Chuông Báo Điện Thoại',
        '02 / 3 Câu Hỏi Dồn Dập',
        '03 / Nghịch Lý Phần Mềm',
        '04 / Dữ Liệu Bị Phân Mảnh',
        '05 / Bẫy Nhớ Một Mình',
        '06 / 1 Hồ Sơ Khách Hàng',
        '07 / 3 Trường Dữ Liệu',
        '08 / Cập Nhật Đồng Bộ',
        '09 / Tự Chủ Tra Cứu',
        '10 / Thảnh Thơi Nghỉ Ngơi'
    ]

    print(f"Extracting {len(frames)} review frames using Remotion still renderer...")
    for f_num in frames:
        dest = frames_dir / f'{f_num}.png'
        cmd = [
            'npx', 'remotion', 'still', 'src/index.ts', 'paper-2026-11-03',
            f'--frame={f_num}',
            f'--output={str(dest)}',
            '--port=3055',
            '--gl=angle'
        ]
        print(f"Rendering frame {f_num}...")
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

    for i, (f_num, label) in enumerate(zip(frames, labels)):
        x = gap + (i % columns) * (panel_w + gap)
        y = gap + (i // columns) * (panel_h + header + gap)
        draw.text((x + 4, y + 8), f'{label} (f{f_num})', fill='#1A1816', font=font)
        frame_path = frames_dir / f'{f_num}.png'
        if frame_path.exists():
            with Image.open(frame_path) as still:
                canvas.paste(still.convert('RGB').resize((panel_w, panel_h), Image.Resampling.LANCZOS), (x, y + header))

    review_path = output / 'review.png'
    canvas.save(review_path)
    print(f'Review grid generated successfully: {review_path}')

if __name__ == '__main__':
    main()
