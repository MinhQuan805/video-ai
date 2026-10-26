from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

episode = Path(__file__).resolve().parent
output = episode / 'output'
frames = [38, 100, 284, 451, 595, 763, 812, 872]
labels = ['01 / Tier intro', '02 / Zalo - feed drift', '03 / Sheet - manual typing',
          '04 / HubSpot - upgrade lock', '05 / Notion - build blocks',
          '06 / Odoo - moving pulse', '07 / Odoo - connected system', '08 / Comment poll']
panel_w, panel_h, gap, header = 360, 640, 20, 42
canvas = Image.new('RGB', (4 * (panel_w + gap) + gap, 2 * (panel_h + header + gap) + gap), '#E5E7E3')
draw = ImageDraw.Draw(canvas)
font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 17)
for i, (frame, label) in enumerate(zip(frames, labels)):
    x = gap + i % 4 * (panel_w + gap)
    y = gap + i // 4 * (panel_h + header + gap)
    draw.text((x + 4, y + 9), f'{label} / f{frame}', fill='#172333', font=font)
    with Image.open(output / 'review-frames' / f'{frame}.png') as still:
        canvas.paste(still.convert('RGB').resize((panel_w, panel_h), Image.Resampling.LANCZOS), (x, y + header))
canvas.save(output / 'review.png')
print(f'Review ready: {output / "review.png"}')
