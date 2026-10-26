import argparse
import os
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage
from skimage.measure import approximate_polygon, find_contours

sys.stdout.reconfigure(encoding='utf-8')
os.environ.setdefault("U2NET_HOME", str(Path(__file__).resolve().parent.parent / ".cache" / "u2net"))

PAPER_COLOR = np.array([243, 238, 226], dtype=np.float32)  # #F3EEE2
INK_COLOR = np.array([27, 24, 21], dtype=np.float32)       # #1B1815



def crop_percent(img: Image.Image, top=0, bottom=0, left=0, right=0) -> Image.Image:
    """Cắt bớt từng cạnh theo phần trăm (0 - 100)."""
    w, h = img.size
    box = (
        int(w * (left / 100.0)),
        int(h * (top / 100.0)),
        int(w * (1.0 - right / 100.0)),
        int(h * (1.0 - bottom / 100.0)),
    )
    return img.crop(box)


def remove_background(img: Image.Image, model_name: str = "u2net_human_seg") -> Image.Image:
    """Tách nền bằng rembg."""
    from rembg import new_session, remove
    session = new_session(model_name)
    return remove(img, session=session)


def remove_solid_background(img: Image.Image, threshold: float = 30.0) -> Image.Image:
    """Tách nền trơn bằng cách lấy mẫu 4 góc."""
    img_rgb = img.convert("RGB")
    arr = np.array(img_rgb, dtype=np.float32)
    h, w, _ = arr.shape
    corner_samples = np.array([
        arr[0:15, 0:15].mean(axis=(0, 1)),
        arr[0:15, -15:].mean(axis=(0, 1)),
        arr[-15:, 0:15].mean(axis=(0, 1)),
        arr[-15:, -15:].mean(axis=(0, 1)),
    ])
    bg_color = np.median(corner_samples, axis=0)

    # Tính khoảng cách màu Euclidean
    diff = np.sqrt(np.sum((arr - bg_color) ** 2, axis=2))
    alpha = np.where(diff > threshold, 255, 0).astype(np.uint8)

    # Khử nhiễu nhẹ
    alpha = ndimage.binary_fill_holes(alpha > 0).astype(np.uint8) * 255
    out = img.convert("RGBA")
    out.putalpha(Image.fromarray(alpha))
    return out


def clean_mask(alpha_arr: np.ndarray, erode_px: int = 1, min_size: int = 200) -> np.ndarray:
    """Làm gọn mép: bỏ quầng mờ, co vào erode_px, bỏ mảnh vụn."""
    binary = alpha_arr > 100

    labeled, num_features = ndimage.label(binary)
    if num_features > 0:
        sizes = ndimage.sum(binary, labeled, range(num_features + 1))
        keep = sizes >= min_size
        keep[0] = False
        binary = keep[labeled]

    binary = ndimage.binary_fill_holes(binary)

    if erode_px > 0:
        binary = ndimage.binary_erosion(binary, iterations=erode_px)

    return (binary.astype(np.uint8) * 255)


def apply_halftone(gray_arr: np.ndarray, cell_size: int = 7) -> np.ndarray:
    """Lưới chấm halftone 45 độ."""
    h, w = gray_arr.shape
    y, x = np.indices((h, w))
    sqrt2 = np.sqrt(2.0)
    u = (x + y) / sqrt2
    v = (y - x) / sqrt2

    u_center = np.round(u / cell_size) * cell_size
    v_center = np.round(v / cell_size) * cell_size

    dist = np.sqrt((u - u_center) ** 2 + (v - v_center) ** 2)
    max_r = cell_size / sqrt2

    darkness = 1.0 - (gray_arr.astype(np.float32) / 255.0)
    dot_r = max_r * np.sqrt(np.clip(darkness, 0.0, 1.0))

    dots = np.clip((dot_r - dist) + 0.6, 0.0, 1.0)
    return (1.0 - dots) * 255.0


def make_scissor_border(mask_bin: np.ndarray, border_px: int = 10, cut_bottom: bool = True, add_torn_edge: bool = True) -> np.ndarray:
    """Tạo viền giấy nhát kéo thẳng không đều, có một đoạn xé xơ và cạnh đáy thẳng."""
    dilated = ndimage.binary_dilation(mask_bin, iterations=border_px)
    h, w = dilated.shape

    contours = find_contours(dilated.astype(float), 0.5)
    border_mask = np.zeros((h, w), dtype=bool)

    if contours:
        img_poly = Image.new("L", (w, h), 0)
        draw = ImageDraw.Draw(img_poly)
        sorted_cnts = sorted([c for c in contours if len(c) >= 10], key=lambda c: len(c), reverse=True)

        for idx, cnt in enumerate(sorted_cnts):
            poly = approximate_polygon(cnt, tolerance=5.0)

            # Thêm đoạn xé xơ cho contour lớn nhất nếu add_torn_edge=True
            if add_torn_edge and idx == 0 and len(poly) > 8:
                n_pts = len(poly)
                start_i = int(n_pts * 0.15)
                end_i = int(n_pts * 0.35)
                new_poly = []
                rng = np.random.RandomState(42)
                for i in range(len(poly)):
                    p1 = poly[i]
                    new_poly.append(p1)
                    if start_i <= i < end_i:
                        p2 = poly[(i + 1) % len(poly)]
                        seg_vec = p2 - p1
                        seg_len = np.linalg.norm(seg_vec)
                        if seg_len > 8:
                            n_steps = max(2, int(seg_len // 4))
                            norm_perp = np.array([-seg_vec[1], seg_vec[0]]) / (seg_len + 1e-6)
                            for s in range(1, n_steps):
                                t = s / n_steps
                                mid = p1 + seg_vec * t
                                jitter = rng.uniform(-3.5, 3.5) * norm_perp
                                new_poly.append(mid + jitter)
                poly = np.array(new_poly)

            points = [(pt[1], pt[0]) for pt in poly]
            if len(points) >= 3:
                draw.polygon(points, fill=255)

        border_mask = np.array(img_poly) > 0

    # Cạnh đáy cắt thẳng làm chân
    if cut_bottom and np.any(mask_bin):
        y_indices = np.where(mask_bin)[0]
        y_cut = max(y_indices.min(), y_indices.max() - 6)
        border_mask[y_cut:, :] = 0

    return border_mask


def apply_color_misregistration(img_arr: np.ndarray, shift_r=(-2, -1), shift_b=(1, 2)) -> np.ndarray:
    """Tạo hiệu ứng mực lệch bản (đỏ lệch, xanh lệch 1-3px)."""
    h, w, c = img_arr.shape
    out = img_arr.copy()

    # Dịch kênh Đỏ
    out[:, :, 0] = ndimage.shift(img_arr[:, :, 0], shift_r, mode="nearest")
    # Dịch kênh Xanh
    if c >= 3:
        out[:, :, 2] = ndimage.shift(img_arr[:, :, 2], shift_b, mode="nearest")

    return out


def process_nguoi(
    input_path: str,
    output_path: str,
    crop=(0, 0, 0, 0),
    target_size: int = 1100,
    model_name: str = "u2net_human_seg"
):
    print(f"✂️ Đang xử lý người: {input_path} -> {output_path}")
    orig = Image.open(input_path).convert("RGBA")

    # 1. Cắt bớt cạnh theo % nếu có
    if any(crop):
        orig = crop_percent(orig, top=crop[0], bottom=crop[1], left=crop[2], right=crop[3])

    # 2. Tách nền bằng rembg
    no_bg = remove_background(orig, model_name=model_name)
    alpha = np.array(no_bg.split()[-1])
    clean_a = clean_mask(alpha, erode_px=1)

    # Cắt phẳng đáy làm chân
    if np.any(clean_a > 0):
        y_indices = np.where(clean_a > 0)[0]
        y_cut = max(y_indices.min(), y_indices.max() - 6)
        clean_a[y_cut:, :] = 0

    # 3. Tạo viền giấy cắt kéo ~10px quanh người
    paper_border_bin = make_scissor_border(clean_a > 0, border_px=10, cut_bottom=True, add_torn_edge=True)

    # 4. Chuyển người sang đen trắng & halftone 45 độ, ô 7px
    gray = np.array(orig.convert("L"), dtype=np.float32)
    halftone = apply_halftone(gray, cell_size=7)

    # Trộn 6 phần chấm với 4 phần xám để mặt vẫn rõ
    blended_gray = np.clip(0.6 * halftone + 0.4 * gray, 0, 255)

    # 5. Màu trắng của ảnh thành màu giấy kem, tối thành màu mực
    t = blended_gray / 255.0
    t_3d = np.repeat(t[:, :, np.newaxis], 3, axis=2)
    colored_person = t_3d * PAPER_COLOR + (1.0 - t_3d) * INK_COLOR

    # 6. Mực lệch bản 1 đến 3 px
    misregistered = apply_color_misregistration(colored_person, shift_r=(-2, -1), shift_b=(2, 1))

    # 7. Ghép viền giấy kem quanh người
    h, w, _ = misregistered.shape
    final_rgb = np.zeros((h, w, 3), dtype=np.uint8)
    final_alpha = np.zeros((h, w), dtype=np.uint8)

    # Vùng viền giấy kem
    border_only = paper_border_bin & ~(clean_a > 0)
    final_rgb[border_only] = PAPER_COLOR.astype(np.uint8)
    final_alpha[border_only] = 255

    # Vùng người
    person_mask = clean_a > 0
    final_rgb[person_mask] = np.clip(misregistered[person_mask], 0, 255).astype(np.uint8)
    final_alpha[person_mask] = 255

    res_img = Image.fromarray(np.dstack([final_rgb, final_alpha]), "RGBA")

    # Crop khít viền
    bbox = res_img.getbbox()
    if bbox:
        res_img = res_img.crop(bbox)

    # Resize cạnh dài 1100 px
    w_curr, h_curr = res_img.size
    if w_curr > h_curr:
        new_w = target_size
        new_h = int(h_curr * (target_size / w_curr))
    else:
        new_h = target_size
        new_w = int(w_curr * (target_size / h_curr))

    res_img = res_img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    out_p = Path(output_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    res_img.save(str(out_p), format="PNG")
    print(f"🎉 Đã lưu ảnh người cắt dán: {out_p} ({new_w}x{new_h})")
    return str(out_p)


def process_vat(
    input_path: str,
    output_path: str,
    crop=(0, 0, 0, 0),
    target_size: int = 1100,
    solid_bg: bool = False,
    min_size: int = 100,
    model_name: str = "isnet-general-use"
):
    print(f"🚢 Đang xử lý đồ vật: {input_path} -> {output_path}")
    orig = Image.open(input_path).convert("RGBA")

    # Cắt bớt cạnh theo % nếu có
    if any(crop):
        orig = crop_percent(orig, top=crop[0], bottom=crop[1], left=crop[2], right=crop[3])

    # Tách nền
    if solid_bg:
        no_bg = remove_solid_background(orig, threshold=30.0)
    else:
        no_bg = remove_background(orig, model_name=model_name)

    alpha = np.array(no_bg.split()[-1])
    clean_a = clean_mask(alpha, erode_px=1, min_size=min_size)
    paper_border = make_scissor_border(clean_a > 0, border_px=10, cut_bottom=False, add_torn_edge=False)

    # Giữ màu, phủ lưới chấm rất nhẹ
    rgb_arr = np.array(orig.convert("RGB"), dtype=np.float32)
    gray = np.array(orig.convert("L"), dtype=np.float32)
    halftone = apply_halftone(gray, cell_size=6)
    dot_tint = (halftone / 255.0)[:, :, np.newaxis]

    # Phủ chấm rất nhẹ (trộn 88% màu gốc + 12% chấm)
    subtle_dots = np.clip(0.88 * rgb_arr + 0.12 * (rgb_arr * dot_tint), 0, 255)

    # Mực lệch bản 1-2px
    misregistered = apply_color_misregistration(subtle_dots, shift_r=(-1, -1), shift_b=(1, 1))

    h, w, _ = misregistered.shape
    final_rgb = np.zeros((h, w, 3), dtype=np.uint8)
    final_alpha = np.zeros((h, w), dtype=np.uint8)

    # Viền giấy
    border_only = paper_border & ~(clean_a > 0)
    final_rgb[border_only] = PAPER_COLOR.astype(np.uint8)
    final_alpha[border_only] = 255

    # Vùng vật
    obj_mask = clean_a > 0
    final_rgb[obj_mask] = np.clip(misregistered[obj_mask], 0, 255).astype(np.uint8)
    final_alpha[obj_mask] = 255

    res_img = Image.fromarray(np.dstack([final_rgb, final_alpha]), "RGBA")

    # Crop khít viền
    bbox = res_img.getbbox()
    if bbox:
        res_img = res_img.crop(bbox)

    # Resize cạnh dài target_size
    w_curr, h_curr = res_img.size
    scale = target_size / max(w_curr, h_curr)
    new_w, new_h = int(w_curr * scale), int(h_curr * scale)
    res_img = res_img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    out_p = Path(output_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    res_img.save(str(out_p), format="PNG")
    print(f"🎉 Đã lưu ảnh vật: {out_p} ({new_w}x{new_h})")
    return str(out_p)


def process_xe(
    input_path: str,
    output_path: str,
    margin_px: int = 35,
    target_size: int = 1100
):
    """Lệnh xe: không tách nền, cả tấm ảnh thành mảnh giấy có lề trắng và mép xé gồ ghề."""
    print(f"📜 Đang xử lý xé mép: {input_path} -> {output_path}")
    orig = Image.open(input_path).convert("RGBA")
    w, h = orig.size

    card_w = w + margin_px * 2
    card_h = h + margin_px * 2

    card = Image.new("RGBA", (card_w, card_h), (int(PAPER_COLOR[0]), int(PAPER_COLOR[1]), int(PAPER_COLOR[2]), 255))
    card.paste(orig, (margin_px, margin_px))

    points = []
    step = 14
    rng = np.random.RandomState(42)

    # Top edge
    for x in range(0, card_w, step):
        points.append((x, rng.randint(0, 12)))
    # Right edge
    for y in range(0, card_h, step):
        points.append((card_w - rng.randint(0, 12), y))
    # Bottom edge
    for x in range(card_w, 0, -step):
        points.append((x, card_h - rng.randint(0, 12)))
    # Left edge
    for y in range(card_h, 0, -step):
        points.append((rng.randint(0, 12), y))

    mask = Image.new("L", (card_w, card_h), 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon(points, fill=255)

    card.putalpha(mask)

    scale = target_size / max(card_w, card_h)
    new_w, new_h = int(card_w * scale), int(card_h * scale)
    card = card.resize((new_w, new_h), Image.Resampling.LANCZOS)

    out_p = Path(output_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    card.save(str(out_p), format="PNG")
    print(f"🎉 Đã lưu mảnh tranh xé mép: {out_p} ({new_w}x{new_h})")
    return str(out_p)


def preview_on_colored_bg(img_path: str, out_preview_path: str, bg_color=(200, 195, 180)):
    """Đặt ảnh PNG trong suốt lên nền màu để kiểm tra mép cắt."""
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size
    pad = 60
    bg = Image.new("RGBA", (w + pad * 2, h + pad * 2), (*bg_color, 255))
    bg.paste(img, (pad, pad), img)
    out_p = Path(out_preview_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    bg.save(str(out_p), format="PNG")
    print(f"🖼️ Đã tạo ảnh xem trước mép cắt: {out_p}")
    return str(out_p)


def create_composite_cutouts(assets_info: list, output_composite: str, bg_color=(228, 223, 211)):
    """
    Tạo ảnh xem nhanh cutouts.png ghép mọi hình đã cắt lên nền màu
    kèm nhãn thông tin lệnh và tên file để tự soát mép.
    """
    print(f"🖼️ Đang ghép bảng ảnh xem nhanh cutouts: {output_composite}")
    cols = 3
    rows = (len(assets_info) + cols - 1) // cols

    cell_w = 760
    cell_h = 760
    margin = 50
    header_h = 100

    total_w = cols * cell_w + (cols + 1) * margin
    total_h = rows * cell_h + (rows + 1) * margin + header_h

    canvas = Image.new("RGBA", (total_w, total_h), (*bg_color, 255))
    draw = ImageDraw.Draw(canvas)

    # Tiêu đề bảng
    draw.rectangle([(margin, margin // 2), (total_w - margin, margin // 2 + 60)], fill=(27, 24, 21, 255))
    draw.text((margin + 20, margin // 2 + 16), "VOX CUTOUT COLLAGE - BANG TONG HOP KIEM TRA MEP CAT", fill=(251, 250, 247, 255))

    for idx, item in enumerate(assets_info):
        r = idx // cols
        c = idx % cols
        x = margin + c * (cell_w + margin)
        y = header_h + margin + r * (cell_h + margin)

        # Khung viền ô kiểm tra
        draw.rectangle([(x, y), (x + cell_w, y + cell_h)], fill=(243, 238, 226, 180), outline=(180, 175, 165, 255), width=2)

        # Đọc ảnh đã cắt
        img_p = Path(item["cutout_path"])
        if img_p.exists():
            img = Image.open(str(img_p)).convert("RGBA")
            iw, ih = img.size
            max_inner = cell_h - 100
            scale = min(max_inner / iw, max_inner / ih)
            sw, sh = int(iw * scale), int(ih * scale)
            resized = img.resize((sw, sh), Image.Resampling.LANCZOS)

            # Canh giữa trong ô
            ix = x + (cell_w - sw) // 2
            iy = y + 40 + (max_inner - sh) // 2
            canvas.paste(resized, (ix, iy), resized)

        # Nhãn thông tin
        label_bar = [(x + 10, y + cell_h - 45), (x + cell_w - 10, y + cell_h - 10)]
        draw.rectangle(label_bar, fill=(27, 24, 21, 255))
        label_text = f"{item['filename']} | Lenh: {item['cmd']} | {item['title']}"
        draw.text((x + 20, y + cell_h - 38), label_text, fill=(255, 210, 63, 255))

    out_p = Path(output_composite)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(str(out_p), format="PNG")
    print(f"🎉 Đã lưu ảnh tổng hợp: {out_p} ({total_w}x{total_h})")
    return str(out_p)


def run_batch_darwin():
    """
    CÂU LỆNH 22:
    Đọc image-sources.md, chạy lệnh phù hợp cho toàn bộ thư mục assets/source,
    lưu kết quả vào assets/, cập nhật image-sources.md và tạo cutouts.png.
    """
    tasks = [
        {
            "filename": "young-darwin.png",
            "source": "videos/vox/darwin/assets/source/young-darwin.jpg",
            "cutout_path": "videos/vox/darwin/assets/young-darwin.png",
            "cmd": "nguoi",
            "crop": (0, 0, 0, 0),
            "title": "Charles Darwin (1840)"
        },
        {
            "filename": "fitzroy.png",
            "source": "videos/vox/darwin/assets/source/fitzroy.jpg",
            "cutout_path": "videos/vox/darwin/assets/fitzroy.png",
            "cmd": "nguoi",
            "crop": (0, 0, 0, 0),
            "title": "Robert FitzRoy"
        },
        {
            "filename": "beagle.png",
            "source": "videos/vox/darwin/assets/source/beagle.png",
            "cutout_path": "videos/vox/darwin/assets/beagle.png",
            "cmd": "vat",
            "crop": (0, 0, 0, 0),
            "solid_bg": False,
            "min_size": 100,
            "title": "HMS Beagle (Khac go)"
        },
        {
            "filename": "beagle-painting.png",
            "source": "videos/vox/darwin/assets/source/beagle-painting.jpg",
            "cutout_path": "videos/vox/darwin/assets/beagle-painting.png",
            "cmd": "xe",
            "title": "HMS Beagle (Tranh Martens)"
        },
        {
            "filename": "chronometer.png",
            "source": "videos/vox/darwin/assets/source/chronometer.jpg",
            "cutout_path": "videos/vox/darwin/assets/chronometer.png",
            "cmd": "vat",
            "crop": (0, 0, 0, 0),
            "solid_bg": False,
            "min_size": 100,
            "title": "Marine Chronometer #509"
        },
        {
            "filename": "finches.png",
            "source": "videos/vox/darwin/assets/source/finches.jpg",
            "cutout_path": "videos/vox/darwin/assets/finches.png",
            "cmd": "vat",
            "crop": (0, 9.0, 0, 0),  # Crop bớt 9% chữ Latin dưới đáy để 4 chim sẻ sạch hoàn toàn
            "solid_bg": False,
            "min_size": 1500,        # Giữ 4 đầu chim sẻ, bỏ số và vụn nhỏ
            "title": "Darwin Finches (Gould)"
        },
    ]

    for t in tasks:
        print(f"\n🚀 Đang chạy: {t['filename']} bằng lệnh [{t['cmd']}]...")
        if t["cmd"] == "nguoi":
            process_nguoi(t["source"], t["cutout_path"], crop=t.get("crop", (0, 0, 0, 0)))
        elif t["cmd"] == "vat":
            process_vat(
                t["source"],
                t["cutout_path"],
                crop=t.get("crop", (0, 0, 0, 0)),
                solid_bg=t.get("solid_bg", False),
                min_size=t.get("min_size", 100)
            )
        elif t["cmd"] == "xe":
            process_xe(t["source"], t["cutout_path"])

    # Tạo thêm bản sao ship.png và ship-painting.png cho khớp với câu 21
    import shutil
    shutil.copy2("videos/vox/darwin/assets/beagle.png", "videos/vox/darwin/assets/ship.png")
    shutil.copy2("videos/vox/darwin/assets/beagle-painting.png", "videos/vox/darwin/assets/ship-painting.png")

    # Tạo ảnh composite cutouts.png
    create_composite_cutouts(tasks, "videos/vox/darwin/output/cutouts.png")
    print("\n✅ Hoàn tất toàn bộ cắt ảnh thư mục darwin!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Vox Cutout Collage Tool")
    subparsers = parser.add_subparsers(dest="command")

    # Lệnh nguoi
    p_nguoi = subparsers.add_parser("nguoi")
    p_nguoi.add_argument("input", help="Đường dẫn ảnh vào")
    p_nguoi.add_argument("output", help="Đường dẫn ảnh ra")
    p_nguoi.add_argument("--crop-top", type=float, default=0)
    p_nguoi.add_argument("--crop-bottom", type=float, default=0)
    p_nguoi.add_argument("--crop-left", type=float, default=0)
    p_nguoi.add_argument("--crop-right", type=float, default=0)
    p_nguoi.add_argument("--preview", help="Tạo ảnh xem trước trên nền màu")

    # Lệnh vat
    p_vat = subparsers.add_parser("vat")
    p_vat.add_argument("input", help="Đường dẫn ảnh vào")
    p_vat.add_argument("output", help="Đường dẫn ảnh ra")
    p_vat.add_argument("--crop-top", type=float, default=0)
    p_vat.add_argument("--crop-bottom", type=float, default=0)
    p_vat.add_argument("--crop-left", type=float, default=0)
    p_vat.add_argument("--crop-right", type=float, default=0)
    p_vat.add_argument("--min-size", type=int, default=100)
    p_vat.add_argument("--solid-bg", action="store_true", help="Chế độ nền trơn 4 góc")
    p_vat.add_argument("--preview", help="Tạo ảnh xem trước trên nền màu")

    # Lệnh xe
    p_xe = subparsers.add_parser("xe")
    p_xe.add_argument("input", help="Đường dẫn ảnh vào")
    p_xe.add_argument("output", help="Đường dẫn ảnh ra")
    p_xe.add_argument("--preview", help="Tạo ảnh xem trước trên nền màu")

    # Lệnh batch
    p_batch = subparsers.add_parser("batch")

    args = parser.parse_args()

    if args.command == "nguoi":
        crop = (args.crop_top, args.crop_bottom, args.crop_left, args.crop_right)
        out = process_nguoi(args.input, args.output, crop=crop)
        if args.preview:
            preview_on_colored_bg(out, args.preview)
    elif args.command == "vat":
        crop = (args.crop_top, args.crop_bottom, args.crop_left, args.crop_right)
        out = process_vat(args.input, args.output, crop=crop, solid_bg=args.solid_bg, min_size=args.min_size)
        if args.preview:
            preview_on_colored_bg(out, args.preview)
    elif args.command == "xe":
        out = process_xe(args.input, args.output)
        if args.preview:
            preview_on_colored_bg(out, args.preview)
    elif args.command == "batch":
        run_batch_darwin()


