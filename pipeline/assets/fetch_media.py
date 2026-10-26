#!/usr/bin/env python3
"""
pipeline/assets/fetch_media.py - Autonomous Image & Media Sourcing Tool

Autonomously searches, validates licenses, downloads images, and updates `image-sources.md`.
Supports:
1. Direct URL download with auto-naming and metadata extraction.
2. Wikimedia Commons API query by filename or search keywords (strictly Public Domain / CC-BY / CC0).
3. Font Awesome icons via pipeline/assets/fetch_fa_icon.py.
4. Auto-appends attribution records into videos/<video-name>/image-sources.md.

Usage:
  # Download from direct URL:
  python pipeline/assets/fetch_media.py direct --url "https://upload.wikimedia.org/.../file.jpg" --video my_video --filename sample.jpg --author "Artist" --license "Public Domain"

  # Search or fetch exact Wikimedia Commons file:
  python pipeline/assets/fetch_media.py commons --title "File:Charles Darwin by G. Richmond.png" --video my_video --filename darwin.png

  # Search Wikimedia Commons by keyword:
  python pipeline/assets/fetch_media.py search --query "James Webb Space Telescope" --video my_video --limit 3
"""

import argparse
import datetime
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

COMMONS_API = "https://commons.wikimedia.org/w/api.php"
HEADERS = {"User-Agent": "AutonomousVideoAI/2.0 (OpenEducationalResearch; pipeline bot)"}
MAX_IMAGE_BYTES = 25 * 1024 * 1024
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}
BLOCKED_LICENSE_MARKERS = (
    "noncommercial", "no derivatives", "fair use", "all rights reserved",
    "cc-by-nc", "cc by-nc", "cc-by-nd", "cc by-nd",
)
ALLOWED_LICENSE_MARKERS = (
    "public domain", "cc0", "cc-by", "cc by", "creative commons attribution",
)


def clean_html(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text).strip()


def validate_license(license_type: str) -> str:
    normalized = clean_html(license_type).lower().replace("–", "-")
    if any(marker in normalized for marker in BLOCKED_LICENSE_MARKERS):
        raise ValueError(f"License không được phép tự động sử dụng: {license_type}")
    if not any(marker in normalized for marker in ALLOWED_LICENSE_MARKERS):
        raise ValueError(f"Không xác minh được license mở: {license_type}")
    return clean_html(license_type)


def validate_filename(filename: str) -> str:
    if Path(filename).name != filename or Path(filename).suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValueError("Filename phải là tên file ảnh an toàn, không chứa thư mục.")
    return filename


def resolve_video_dir(value: str | Path) -> Path:
    videos_root = Path("videos").resolve()
    raw = Path(value)
    candidate = raw.resolve() if raw.is_absolute() else (
        raw.resolve() if raw.parts and raw.parts[0].lower() == "videos" else (videos_root / raw).resolve()
    )
    if candidate != videos_root and videos_root not in candidate.parents:
        raise ValueError("Video phải nằm trong thư mục videos/.")
    return candidate


def download_image(url: str, out_path: Path) -> None:
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme != "https" or parsed.username or parsed.password:
        raise ValueError("Chỉ tải ảnh từ URL HTTPS công khai, không chứa credential.")
    request = urllib.request.Request(url, headers=HEADERS)
    temp_path = out_path.with_suffix(out_path.suffix + ".part")
    written = 0
    try:
        with urllib.request.urlopen(request, timeout=30) as response, open(temp_path, "wb") as output:
            content_type = response.headers.get_content_type()
            if not content_type.startswith("image/"):
                raise ValueError(f"URL không trả về ảnh: {content_type}")
            declared = response.headers.get("Content-Length")
            if declared and int(declared) > MAX_IMAGE_BYTES:
                raise ValueError("Ảnh vượt giới hạn 25 MB.")
            while True:
                chunk = response.read(64 * 1024)
                if not chunk:
                    break
                written += len(chunk)
                if written > MAX_IMAGE_BYTES:
                    raise ValueError("Ảnh vượt giới hạn 25 MB.")
                output.write(chunk)
        temp_path.replace(out_path)
    finally:
        if temp_path.exists():
            temp_path.unlink()


def append_to_sources_md(video_dir: Path, filename: str, source_url: str, author: str, license_type: str, note: str = ""):
    sources_file = video_dir / "image-sources.md"
    header_needed = not sources_file.exists()

    with open(sources_file, "a", encoding="utf-8") as f:
        if header_needed:
            f.write("# Bảng Nguồn & Bản Quyền Tư Liệu Hình Ảnh\n\n")
            f.write("| Tên file | Nguồn / URL | Tác giả / Bản quyền | Giấy phép | Ghi chú |\n")
            f.write("| :--- | :--- | :--- | :--- | :--- |\n")

        clean_author = clean_html(author)[:60] or "Không rõ / Lịch sử"
        clean_license = validate_license(license_type)
        link_md = f"[{filename}]({source_url})" if source_url else filename
        accessed = datetime.date.today().isoformat()
        full_note = f"{note}; truy cập {accessed}" if note else f"Truy cập {accessed}"
        f.write(f"| `{filename}` | {link_md} | {clean_author} | `{clean_license}` | {full_note} |\n")


def fetch_commons_title(title: str, video_dir: Path, target_filename: str = None, note: str = ""):
    video_dir = resolve_video_dir(video_dir)
    source_dir = video_dir / "assets" / "source"
    source_dir.mkdir(parents=True, exist_ok=True)

    if not title.startswith("File:"):
        title = f"File:{title}"

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
    if "missing" in page:
        raise ValueError(f"Không tìm thấy tư liệu Wikimedia cho tiêu đề: {title}")

    info = page.get("imageinfo", [{}])[0]
    meta = info.get("extmetadata", {})

    license_name = meta.get("LicenseShortName", {}).get("value") or meta.get("UsageTerms", {}).get("value") or "Public domain"
    license_name = validate_license(license_name)
    author_raw = meta.get("Artist", {}).get("value") or meta.get("Author", {}).get("value") or "Unknown"
    img_url = info.get("thumburl") or info.get("url")
    desc_url = info.get("descriptionurl") or img_url

    if not target_filename:
        # Determine from title
        ext = os.path.splitext(title)[1] or ".jpg"
        clean_base = re.sub(r"[^\w\-]", "_", title.replace("File:", "").split(".")[0])
        target_filename = f"{clean_base.lower()}{ext}"
    target_filename = validate_filename(target_filename)

    out_path = source_dir / target_filename
    print(f"📥 Đang tải {target_filename} từ {img_url}...")
    download_image(img_url, out_path)

    append_to_sources_md(
        video_dir=video_dir,
        filename=target_filename,
        source_url=desc_url,
        author=author_raw,
        license_type=license_name,
        note=note
    )
    print(f"✅ Đã lưu {out_path} và ghi nhận nguồn vào image-sources.md")


def search_commons(query: str, video_dir: Path, limit: int = 3):
    video_dir = resolve_video_dir(video_dir)
    limit = max(1, min(limit, 3))
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrlimit": str(limit),
        "prop": "imageinfo",
        "iiprop": "url|extmetadata",
        "iiurlwidth": "1920",
        "format": "json"
    }
    url = f"{COMMONS_API}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers=HEADERS)

    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    pages = data.get("query", {}).get("pages", {})
    if not pages:
        print(f"⚠️ Không tìm thấy ảnh nào với từ khóa: '{query}'")
        return

    print(f"🔍 Tìm thấy {len(pages)} tư liệu cho '{query}':")
    for idx, page in enumerate(pages.values(), 1):
        title = page.get("title", "")
        info = page.get("imageinfo", [{}])[0]
        meta = info.get("extmetadata", {})
        lic = meta.get("LicenseShortName", {}).get("value") or "Public domain"
        print(f"  {idx}. {title} (Bản quyền: {lic})")
        fetch_commons_title(title=title, video_dir=video_dir, note=f"Tìm kiếm: {query}")


def fetch_direct_url(url: str, video_dir: Path, filename: str, author: str,
                     license_type: str, note: str = "", source_page: str = None):
    video_dir = resolve_video_dir(video_dir)
    filename = validate_filename(filename)
    license_type = validate_license(license_type)
    source_dir = video_dir / "assets" / "source"
    source_dir.mkdir(parents=True, exist_ok=True)
    out_path = source_dir / filename

    print(f"📥 Đang tải ảnh trực tiếp từ {url}...")
    download_image(url, out_path)

    append_to_sources_md(
        video_dir=video_dir,
        filename=filename,
        source_url=source_page or url,
        author=author,
        license_type=license_type,
        note=note
    )
    print(f"✅ Đã tải thành công {out_path} ({os.path.getsize(out_path)} bytes)")


def main():
    parser = argparse.ArgumentParser(description="Autonomous Media & Image Fetcher")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Commons title command
    c_parser = subparsers.add_parser("commons", help="Fetch specific Wikimedia Commons file")
    c_parser.add_argument("--title", required=True, help="Wikimedia Commons file title (e.g. 'File:Sample.jpg')")
    c_parser.add_argument("--video", required=True, help="Video directory or name under videos/")
    c_parser.add_argument("--filename", help="Target filename in assets/source/")
    c_parser.add_argument("--note", default="", help="Note or scene assignment")

    # Search commons command
    s_parser = subparsers.add_parser("search", help="Search Wikimedia Commons")
    s_parser.add_argument("--query", required=True, help="Search query")
    s_parser.add_argument("--video", required=True, help="Video directory or name under videos/")
    s_parser.add_argument("--limit", type=int, default=3, help="Max results to download")

    # Direct URL command
    d_parser = subparsers.add_parser("direct", help="Fetch direct image URL")
    d_parser.add_argument("--url", required=True, help="Direct image URL")
    d_parser.add_argument("--video", required=True, help="Video directory or name under videos/")
    d_parser.add_argument("--filename", required=True, help="Target filename in assets/source/")
    d_parser.add_argument("--author", required=True, help="Verified author attribution")
    d_parser.add_argument("--license", required=True, help="Verified open license")
    d_parser.add_argument("--source-page", help="Public page documenting source and license")
    d_parser.add_argument("--note", default="", help="Note or scene assignment")

    args = parser.parse_args()
    video_dir = resolve_video_dir(args.video)

    if args.command == "commons":
        fetch_commons_title(args.title, video_dir, args.filename, args.note)
    elif args.command == "search":
        search_commons(args.query, video_dir, args.limit)
    elif args.command == "direct":
        fetch_direct_url(args.url, video_dir, args.filename, args.author, args.license,
                         args.note, args.source_page)


if __name__ == "__main__":
    main()
