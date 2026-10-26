import json
import os
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
        "desc": "Chân dung Charles Darwin thời trẻ (1830s - George Richmond)"
    },
    {
        "title": "File:Robert Fitzroy.jpg",
        "filename": "fitzroy.jpg",
        "sentence": "Câu 1",
        "desc": "Chân dung thuyền trưởng Robert FitzRoy (ngực trở lên, nền trơn)"
    },
    {
        "title": "File:HMS Beagle by Conrad Martens.jpg",
        "filename": "beagle-painting.jpg",
        "sentence": "Câu 1",
        "desc": "Tranh màu nước tàu HMS Beagle tại Tierra del Fuego của Conrad Martens (1834)"
    },
    {
        "title": "File:HMS Beagle in the seaways.jpg",
        "filename": "beagle.png",
        "sentence": "Câu 1 & 2",
        "desc": "Hình vẽ toàn thân con tàu HMS Beagle trên biển"
    },
    {
        "title": "File:British Museum Marine Chronometer.jpg",
        "filename": "chronometer.jpg",
        "sentence": "Câu 2",
        "desc": "Đồng hồ hàng hải Thomas Earnshaw số hiệu 509 của tàu Beagle (Bảo tàng Anh)"
    },
    {
        "title": "File:Darwin's finches by Gould.jpg",
        "filename": "finches.jpg",
        "sentence": "Câu 4",
        "desc": "Tranh vẽ các loài chim sẻ đảo Galapagos của John Gould (1845)"
    }
]


def fetch_exact_image(info, target_dir):
    title = info["title"]
    params = {
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": "1920",
        "format": "json"
    }
    url = f"{COMMONS_API}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values()))
    imageinfo = page.get("imageinfo", [{}])[0]
    meta = imageinfo.get("extmetadata", {})

    license_short = meta.get("UsageTerms", {}).get("value", "") or meta.get("LicenseShortName", {}).get("value", "") or "Public domain"
    author_raw = meta.get("Artist", {}).get("value", "") or meta.get("Author", {}).get("value", "Unknown")
    import re
    author = re.sub(r"<[^>]+>", "", author_raw).strip() or "Unknown"

    img_url = imageinfo.get("thumburl") or imageinfo.get("url")
    desc_url = imageinfo.get("descriptionurl")

    out_file = target_dir / info["filename"]
    print(f"📥 Tải {info['filename']} từ {img_url}...")
    req_img = urllib.request.Request(img_url, headers=HEADERS)
    with urllib.request.urlopen(req_img, timeout=30) as resp, open(out_file, "wb") as f_out:
        f_out.write(resp.read())

    print(f"✅ Đã lưu {out_file} ({os.path.getsize(out_file)} bytes)")

    return {
        "filename": info["filename"],
        "link": desc_url,
        "author": author[:50],
        "license": license_short,
        "sentence": info["sentence"],
        "desc": info["desc"]
    }


def main():
    target_dir = Path("videos/vox/darwin/assets/source")
    target_dir.mkdir(parents=True, exist_ok=True)
    table_rows = []

    for item in EXACT_FILES:
        res = fetch_exact_image(item, target_dir)
        table_rows.append(res)

    md_lines = ["# Nguồn ảnh Wikimedia Commons sử dụng trong video Darwin\n"]
    md_lines.append("| Tên file | Link trang Commons | Tác giả | Giấy phép | Dùng cho | Mô tả |")
    md_lines.append("| :--- | :--- | :--- | :--- | :--- | :--- |")
    for r in table_rows:
        md_lines.append(f"| `{r['filename']}` | [{r['filename']}]({r['link']}) | {r['author']} | {r['license']} | {r['sentence']} | {r['desc']} |")

    sources_path = Path("videos/vox/darwin/image-sources.md")
    with open(sources_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines) + "\n")

    print(f"\n📄 Đã ghi bảng nguồn ảnh hoàn chỉnh vào {sources_path}")


if __name__ == "__main__":
    main()
