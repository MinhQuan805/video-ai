import os
import sys
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')


def make_filmstrip(comp_id="Video", frames=[22, 25, 28, 31, 34], out_path="videos/darwin/output/scene1_filmstrip.png", title="SCENE 1: SLIDING CUTOUT & BIG NUMBER (FRAMES 22-34)"):
    print(f"🎞️ Đang tạo dải phim 5 khung hình: {frames}...")
    frames_arg = ",".join(str(f) for f in frames)
    
    # 1. Chạy render bằng node
    cmd = ["node", "tools/render_filmstrip.mjs", comp_id, frames_arg, out_path]
    res = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        cwd=str(Path(__file__).resolve().parent.parent),
    )
    
    if res.returncode != 0:
        print("Lỗi render:", res.stderr)
        sys.exit(1)
        
    # 2. Tìm danh sách file đã xuất
    json_line = [line for line in res.stdout.splitlines() if line.startswith("JSON_FRAMES:")][0]
    frame_files = json.loads(json_line.replace("JSON_FRAMES:", ""))
    
    # 3. Ghép dải ngang bằng Pillow
    panel_w = 480
    panel_h = int(panel_w * (1920 / 1080))  # 853 px
    header_h = 70
    footer_h = 50
    margin = 16
    total_w = len(frame_files) * panel_w + (len(frame_files) + 1) * margin
    total_h = panel_h + header_h + footer_h
    
    canvas = Image.new("RGBA", (total_w, total_h), (27, 24, 21, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Header title
    draw.text((margin + 10, 20), title, fill=(255, 210, 63, 255))
    
    for i, item in enumerate(frame_files):
        x = margin + i * (panel_w + margin)
        y = header_h
        
        # Mở ảnh và resize
        img = Image.open(item["path"]).convert("RGBA")
        resized = img.resize((panel_w, panel_h), Image.Resampling.LANCZOS)
        canvas.paste(resized, (x, y))
        
        # Viền panel
        draw.rectangle([(x, y), (x + panel_w, y + panel_h)], outline=(224, 64, 28, 255), width=3)
        
        # Nhãn frame
        badge_y = y + panel_h + 10
        badge_text = f"FRAME {item['frame']}"
        draw.rectangle([(x, badge_y), (x + 160, badge_y + 30)], fill=(243, 238, 226, 255))
        draw.text((x + 14, badge_y + 6), badge_text, fill=(27, 24, 21, 255))
        
    out_p = Path(out_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(str(out_p), format="PNG")
    
    # Copy sang output/review.png theo rule của project
    review_p = Path("output/review.png")
    review_p.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(str(review_p), format="PNG")
    
    print(f"🎉 Đã lưu dải phim: {out_p} ({total_w}x{total_h})")
    return str(out_p)

if __name__ == "__main__":
    frames = [22, 25, 28, 31, 34]
    if len(sys.argv) > 1:
        frames = [int(f) for f in sys.argv[1].split(",")]
    out = sys.argv[2] if len(sys.argv) > 2 else "videos/darwin/output/scene1_filmstrip.png"
    comp = sys.argv[3] if len(sys.argv) > 3 else "Video"
    title = sys.argv[4] if len(sys.argv) > 4 else f"{comp}: FRAMES {frames}"
    make_filmstrip(comp_id=comp, frames=frames, out_path=out, title=title)
