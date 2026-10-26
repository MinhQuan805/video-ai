import os
import sys
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8')
ROOT_DIR = Path(__file__).resolve().parents[4]

def make_review_grid():
    # 6 representative frames in timeline (907 frames):
    # Frame 110: Zalo (Khách VIP trôi dạt, badge 99+)
    # Frame 265: Google Sheet (Gõ ô thủ công + đồng hồ đo giờ)
    # Frame 425: HubSpot (Bậc thang nâng cấp + ổ khóa vàng + $500/tháng)
    # Frame 560: Notion (Các khối pastel căn chỉnh vào trang)
    # Frame 780: Odoo (Xung ánh sáng chạy qua 4 trạm + 100% đồng bộ)
    # Frame 860: Outro (Hộp bình luận + 5 logo)
    frames = [110, 265, 425, 560, 818, 860]
    scene_labels = [
        ("Zalo · F (f.110)", "Tin nhắn trôi & Bỏ sót 99+"),
        ("Google Sheet · C (f.265)", "Gõ ô thủ công & +3h/ngày ⏱️"),
        ("HubSpot · A (f.425)", "Nấc thang & Khóa $500/tháng 🔒"),
        ("Notion · B (f.560)", "Tự lắp khối Lego quy trình 🛠️"),
        ("Odoo · S (f.818)", "Hợp nhất 4 trạm thành Logo Odoo ✨"),
        ("Outro (f.860)", "Hộp bình luận Hạng S 👇"),
    ]
    
    print(f"🎬 Đang render 6 khung hình đại diện: {frames}...")
    frames_arg = ",".join(str(f) for f in frames)
    out_dummy = "videos/ranking/10-25-26/output/review_raw.png"
    
    cmd = ["node", "pipeline/qa/render_filmstrip.mjs", "ranking-10-25-26", frames_arg, out_dummy]
    res = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        cwd=str(ROOT_DIR),
    )
    
    if res.returncode != 0:
        print("Lỗi render:", res.stderr)
        print("Stdout:", res.stdout)
        sys.exit(1)
        
    json_line = [line for line in res.stdout.splitlines() if line.startswith("JSON_FRAMES:")][0]
    frame_files = json.loads(json_line.replace("JSON_FRAMES:", ""))
    
    panel_w = 400
    panel_h = int(panel_w * (1920 / 1080))  # 711 px
    margin = 16
    header_h = 80
    footer_h = 60
    
    total_w = len(frame_files) * panel_w + (len(frame_files) + 1) * margin
    total_h = header_h + panel_h + footer_h
    
    canvas = Image.new("RGBA", (total_w, total_h), (249, 248, 246, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Title
    draw.text(
        (margin + 10, 24),
        "REVIEW GRID 10-25-26 (EDITORIAL MULTI-COMPONENT UI STORYTELLING)",
        fill=(15, 23, 42, 255),
    )
    
    for i, item in enumerate(frame_files):
        x = margin + i * (panel_w + margin)
        y = header_h
        
        img = Image.open(item["path"]).convert("RGBA")
        resized = img.resize((panel_w, panel_h), Image.Resampling.LANCZOS)
        canvas.paste(resized, (x, y))
        
        # Border
        draw.rectangle([(x, y), (x + panel_w, y + panel_h)], outline=(203, 213, 225, 255), width=2)
        
        # Badge
        badge_y = y + panel_h + 8
        draw.rectangle([(x, badge_y), (x + panel_w, badge_y + 40)], fill=(255, 255, 255, 255))
        
        lbl_scene, lbl_desc = scene_labels[i]
        draw.text((x + 10, badge_y + 8), f"{lbl_scene} - {lbl_desc}", fill=(15, 23, 42, 255))
        
    out_p = Path("videos/ranking/10-25-26/output/review.png")
    out_p.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(str(out_p), format="PNG")
    
    # Save to output/review.png per project rules
    review_rule_p = Path("output/review.png")
    review_rule_p.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(str(review_rule_p), format="PNG")
    
    print(f"🎉 Đã hoàn tất tạo ảnh kiểm duyệt: {out_p} ({total_w}x{total_h})")

if __name__ == "__main__":
    make_review_grid()
