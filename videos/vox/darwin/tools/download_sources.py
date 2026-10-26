import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

COMMONS_API = "https://commons.wikimedia.org/w/api.php"
HEADERS = {"User-Agent": "AntigravityBot/1.0 (DarwinVideoProject; educational research)"}

EXACT_FILES = [
    {
        "title": "File:Charles Darwin by G. Richmond.png",
        "filename": "young-darwin.jpg",
        "sentence": "Câu 1",
        "desc": "Chân dung Charles Darwin thời trẻ (George Richmond, 1830s)",
        "kind": "Người"
    },
    {
        "title": "File:Robert Fitzroy.jpg",
        "filename": "fitzroy.jpg",
        "sentence": "Câu 1",
        "desc": "Chân dung Thuyền trưởng Robert FitzRoy (ảnh từ ngực trở lên)",
        "kind": "Người"
    },
    {
        "title": "File:HMS Beagle (1854).jpg",
        "filename": "beagle.png",
        "sentence": "Câu 1 & 2",
        "desc": "Bản vẽ toàn thân con tàu HMS Beagle (1854)",
        "kind": "Vật"
    },
    {
        "title": "File:HMS Beagle by Conrad Martens.jpg",
        "filename": "beagle-painting.jpg",
        "sentence": "Câu 1",
        "desc": "Tranh màu nước tàu HMS Beagle ở Tierra del Fuego (Conrad Martens, 1834)",
        "kind": "Tranh / Vật"
    },
    {
        "title": "File:British Museum Marine Chronometer.jpg",
        "filename": "chronometer.jpg",
        "sentence": "Câu 2",
        "desc": "Đồng hồ hàng hải Thomas Earnshaw số 509 của tàu Beagle (Bảo tàng Anh)",
        "kind": "Vật"
    },
    {
        "title": "File:Darwin's finches by Gould.jpg",
        "filename": "finches.jpg",
        "sentence": "Câu 4",
        "desc": "Tranh vẽ 4 loài chim sẻ Galapagos (John Gould, 1845)",
        "kind": "Vật"
    }
]


def clean_html(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text).strip()


def main():
    target_dir = Path("videos/vox/darwin/assets/source")
    target_dir.mkdir(parents=True, exist_ok=True)
    table_rows = []

    for item in EXACT_FILES:
        title = item["title"]
        params = {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|size|extmetadata",
            "iiurlwidth": "1920",
            "format": "json"
        }
        u = f"{COMMONS_API}?{urllib.parse.urlencode(params)}"
        req = urllib.request.Request(u, headers=HEADERS)
        data = json.loads(urllib.request.urlopen(req, timeout=15).read())

        page = next(iter(data["query"]["pages"].values()))
        info = page.get("imageinfo", [{}])[0]
        meta = info.get("extmetadata", {})

        lic = meta.get("LicenseShortName", {}).get("value") or meta.get("UsageTerms", {}).get("value") or "Public domain"
        artist_raw = meta.get("Artist", {}).get("value") or meta.get("Author", {}).get("value") or "Unknown"
        artist = clean_html(artist_raw)[:50]
        if not artist or "unknown" in artist.lower():
            artist = "Không rõ / Lịch sử"

        img_url = info.get("thumburl") or info.get("url")
        desc_url = info.get("descriptionurl")

        out_path = target_dir / item["filename"]
        print(f"📥 Tải {item['filename']} từ {img_url}...")
        req_img = urllib.request.Request(img_url, headers=HEADERS)
        with urllib.request.urlopen(req_img, timeout=30) as resp, open(out_path, "wb") as f_out:
            f_out.write(resp.read())

        size_kb = round(os.path.getsize(out_path) / 1024, 1)
        print(f"✅ Đã lưu {out_path} ({size_kb} KB)")

        table_rows.append({
            "filename": item["filename"],
            "link": desc_url,
            "author": artist,
            "license": lic,
            "sentence": item["sentence"],
            "desc": item["desc"],
            "kind": item["kind"]
        })

    # Ghi file image-sources.md
    md = ["# Nguồn ảnh Wikimedia Commons sử dụng trong video Darwin\n"]
    md.append("| Tên file | Link trang Commons | Tác giả | Giấy phép | Dùng cho | Loại | Mô tả |")
    md.append("| :--- | :--- | :--- | :--- | :--- | :--- | :--- |")
    for r in table_rows:
        md.append(f"| `{r['filename']}` | [{r['filename']}]({r['link']}) | {r['author']} | {r['license']} | {r['sentence']} | {r['kind']} | {r['desc']} |")

    out_md = Path("videos/vox/darwin/image-sources.md")
    with open(out_md, "w", encoding="utf-8") as f:
        f.write("\n".join(md) + "\n")

    print(f"\n📄 Đã ghi bảng nguồn ảnh hoàn chỉnh vào {out_md}")


if __name__ == "__main__":
    main()
