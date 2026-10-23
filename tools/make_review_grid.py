import os
import sys
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

def make_review_grid():
    # 5 khung hình ở gần cuối mỗi cảnh
    # Cảnh 1 (0-253): 215
    # Cảnh 2 (253-376): 350
    # Cảnh 3 (376-520): 490
    # Cảnh 4 (520-706): 670
    # Cảnh 5 (706-855): 830
    frames = [220, 350, 500, 665, 840]
    scene_labels = [
        ("CẢNH 1 (f.220)", "Con số lớn: 22 Tuổi Darwin"),
        ("CẢNH 2 (f.350)", "So sánh: Dự kiến 2 năm vs Thực tế ~5 năm"),
        ("CẢNH 3 (f.500)", "Con số lớn: 3.3 Năm trên đất liền"),
        ("CẢNH 4 (f.665)", "Danh sách các bước: Bước ngoặt Galapagos"),
        ("CẢNH 5 (f.840)", "So sánh: Nếu từ chối con tàu này?"),
    ]
    
    print(f"🎬 Đang render 5 khung hình đại diện cho 5 cảnh: {frames}...")
    frames_arg = ",".join(str(f) for f in frames)
    out_dummy = "videos/darwin/output/review_raw.png"
    
    cmd = ["node", "tools/render_filmstrip.mjs", "Video", frames_arg, out_dummy]
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
        
    json_line = [line for line in res.stdout.splitlines() if line.startswith("JSON_FRAMES:")][0]
    frame_files = json.loads(json_line.replace("JSON_FRAMES:", ""))
    
    # Kích thước mỗi ô ảnh (panel)
    panel_w = 480
    panel_h = int(panel_w * (1920 / 1080))  # 853 px
    margin = 20
    header_h = 90
    footer_h = 75
    
    total_w = len(frame_files) * panel_w + (len(frame_files) + 1) * margin
    total_h = header_h + panel_h + footer_h
    
    canvas = Image.new("RGBA", (total_w, total_h), (27, 24, 21, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Tiêu đề bảng kiểm duyệt
    draw.text(
        (margin + 10, 26),
        "BẢNG KIỂM DUYỆT 5 CẢNH (HỆ HÌNH PAPER) · DỰ ÁN DARWIN BEAGLE",
        fill=(255, 210, 63, 255),
    )
    
    for i, item in enumerate(frame_files):
        x = margin + i * (panel_w + margin)
        y = header_h
        
        # Đọc ảnh frame đã render
        img = Image.open(item["path"]).convert("RGBA")
        resized = img.resize((panel_w, panel_h), Image.Resampling.LANCZOS)
        canvas.paste(resized, (x, y))
        
        # Viền đỏ nhấn quanh khung
        draw.rectangle([(x, y), (x + panel_w, y + panel_h)], outline=(224, 64, 28, 255), width=3)
        
        # Nhãn ghi số cảnh dưới mỗi ô
        badge_y = y + panel_h + 12
        draw.rectangle([(x, badge_y), (x + panel_w, badge_y + 48)], fill=(243, 238, 226, 255))
        
        lbl_scene, lbl_desc = scene_labels[i]
        draw.text((x + 14, badge_y + 8), f"{lbl_scene} - {lbl_desc}", fill=(27, 24, 21, 255))
        
    out_p = Path("videos/darwin/output/review.png")
    out_p.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(str(out_p), format="PNG")
    
    # Đồng thời lưu vào output/review.png theo Project Rules
    review_rule_p = Path("output/review.png")
    review_rule_p.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(str(review_rule_p), format="PNG")
    
    print(f"🎉 Đã hoàn tất tạo ảnh kiểm duyệt: {out_p} ({total_w}x{total_h})")

if __name__ == "__main__":
    make_review_grid()
