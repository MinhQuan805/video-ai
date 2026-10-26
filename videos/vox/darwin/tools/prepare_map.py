import os
import sys
import urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')

# Tọa độ Wikipedia của 4 địa danh trên hải trình Nam Mỹ của Darwin
CITIES = [
    {"name": "Salvador", "lon": -38.5108, "lat": -12.9714},
    {"name": "Rio de Janeiro", "lon": -43.2075, "lat": -22.9028},
    {"name": "Montevideo", "lon": -56.1819, "lat": -34.8836},
    {"name": "Punta Alta", "lon": -62.0750, "lat": -38.8790},
]

# Vùng cắt: tây -85, bắc 5, đông -30, nam -56
LON_MIN, LON_MAX = -85.0, -30.0
LAT_MAX, LAT_MIN = 5.0, -56.0

def lon_lat_to_pixel(lon, lat, width, height):
    x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * width
    y = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * height
    return x, y

def prepare_map():
    assets_dir = Path("videos/vox/darwin/assets")
    source_dir = assets_dir / "source"
    source_dir.mkdir(parents=True, exist_ok=True)
    
    world_map_path = source_dir / "world_equirectangular.jpg"
    
    # 1. Tải bản đồ Equirectangular công cộng nếu chưa có
    if not world_map_path.exists():
        print("🌍 Đang tải bản đồ thế giới Equirectangular từ Wikimedia Commons...")
        url = "https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
        req = urllib.request.Request(url, headers={"User-Agent": "DarwinMap/1.0"})
        with urllib.request.urlopen(req) as resp, open(world_map_path, "wb") as f:
            f.write(resp.read())
        print("Tải xong bản đồ thế giới.")

    img = Image.open(world_map_path).convert("RGB")
    W, H = img.size

    # 2. Cắt theo vùng [tây -85, bắc 5, đông -30, nam -56]
    # Phép chiếu equirectangular toàn cầu chuẩn: lon [-180, 180], lat [90, -90]
    x0 = int((LON_MIN - (-180.0)) / 360.0 * W)
    x1 = int((LON_MAX - (-180.0)) / 360.0 * W)
    y0 = int((90.0 - LAT_MAX) / 180.0 * H)
    y1 = int((90.0 - LAT_MIN) / 180.0 * H)

    cropped = img.crop((x0, y0, x1, y1))

    # Resize chuẩn cho video dọc (rộng 880px, cao 976px)
    map_w = 880
    map_h = int(map_w * (LAT_MAX - LAT_MIN) / (LON_MAX - LON_MIN)) # 976 px
    resized = cropped.resize((map_w, map_h), Image.Resampling.LANCZOS)

    # 3. Làm nhạt màu cho hợp nền giấy:
    # Chuyển xám, nhuộm tông giấy kem #F3EEE2 và sàn #E4DFD3
    gray = resized.convert("L")
    gray_arr = np.array(gray, dtype=np.float32) / 255.0
    
    # Đại dương tối hơn một chút, lục địa sáng hơn
    paper_light = np.array([243, 238, 226], dtype=np.float32) # đất liền
    ocean_dark = np.array([215, 210, 198], dtype=np.float32)  # biển
    
    # Nội suy màu theo độ sáng địa hình
    t = gray_arr[:, :, np.newaxis]
    tinted = t * paper_light + (1.0 - t) * ocean_dark
    tinted_img = Image.fromarray(np.clip(tinted, 0, 255).astype(np.uint8))

    # Tăng tương phản nhẹ để đường bờ biển rõ nét
    enhancer = ImageEnhance.Contrast(tinted_img)
    tinted_img = enhancer.enhance(1.25)

    # Lưu bản đồ nền sạch
    out_map = assets_dir / "south_america_map.png"
    tinted_img.save(str(out_map), format="PNG")
    
    # Đồng bộ sang public/
    public_map = Path("public/videos/vox/darwin/assets/south_america_map.png")
    public_map.parent.mkdir(parents=True, exist_ok=True)
    tinted_img.save(str(public_map), format="PNG")
    print(f"🗺️ Đã tạo bản đồ Nam Mỹ: {out_map} ({map_w}x{map_h})")

    # 4. Xuất ảnh kiểm tra có lưới kinh vĩ tuyến 10 độ và ghim thành phố
    verif_img = tinted_img.copy()
    draw = ImageDraw.Draw(verif_img)

    # Vẽ lưới kinh tuyến mỗi 10 độ: -80, -70, -60, -50, -40
    for lon in range(-80, -30, 10):
        x, _ = lon_lat_to_pixel(lon, 0, map_w, map_h)
        draw.line([(x, 0), (x, map_h)], fill=(160, 150, 135), width=1)
        draw.text((x + 4, 10), f"{lon}°", fill=(100, 90, 80))

    # Vẽ lưới vĩ tuyến mỗi 10 độ: 0, -10, -20, -30, -40, -50
    for lat in range(0, -60, -10):
        _, y = lon_lat_to_pixel(-50, lat, map_w, map_h)
        draw.line([(0, y), (map_w, y)], fill=(160, 150, 135), width=1)
        draw.text((10, y - 16), f"{lat}°", fill=(100, 90, 80))

    # Vẽ đường nối màu nhấn #E0401C qua 4 điểm
    route_points = [lon_lat_to_pixel(c["lon"], c["lat"], map_w, map_h) for c in CITIES]
    for i in range(len(route_points) - 1):
        draw.line([route_points[i], route_points[i+1]], fill=(224, 64, 28), width=5)

    # Vẽ điểm chấm và nhãn tên cho từng thành phố
    for c in CITIES:
        x, y = lon_lat_to_pixel(c["lon"], c["lat"], map_w, map_h)
        # Chấm tròn
        r = 8
        draw.ellipse([(x - r, y - r), (x + r, y + r)], fill=(224, 64, 28), outline=(27, 24, 21), width=2)
        # Nhãn tên
        draw.rectangle([(x + 12, y - 12), (x + 12 + len(c["name"]) * 11 + 10, y + 14)], fill=(27, 24, 21))
        draw.text((x + 16, y - 8), c["name"], fill=(255, 210, 63))

    verif_out = Path("videos/vox/darwin/output/map_verification.png")
    verif_out.parent.mkdir(parents=True, exist_ok=True)
    verif_img.save(str(verif_out), format="PNG")
    print(f"📍 Đã xuất ảnh kiểm tra ghim và lưới kinh vĩ tuyến: {verif_out}")

if __name__ == "__main__":
    prepare_map()
