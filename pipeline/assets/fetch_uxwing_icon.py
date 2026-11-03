#!/usr/bin/env python3
"""
pipeline/assets/fetch_uxwing_icon.py - UXWing SVG Icon Downloader

Searches https://uxwing.com/ and downloads clean SVG icons into public/icon/
or any specified destination.

Usage:
  python pipeline/assets/fetch_uxwing_icon.py "speedometer" --output public/icon/speedometer.svg
  python pipeline/assets/fetch_uxwing_icon.py "funnel" --output public/icon/funnel.svg
  python pipeline/assets/fetch_uxwing_icon.py "target" --output public/icon/target.svg
"""

import argparse
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")


def search_and_download_uxwing(query_or_slug: str, output_path: str = None) -> str:
    clean_query = query_or_slug.strip().lower()

    # Determine default destination if not specified
    if not output_path:
        slug = re.sub(r"[^a-z0-9\-]", "-", clean_query)
        output_path = f"public/icon/{slug}.svg"

    dest = Path(output_path)
    dest.parent.mkdir(parents=True, exist_ok=True)

    # 1. Check if user passed a direct uxwing URL
    if clean_query.startswith("http"):
        page_url = clean_query
    else:
        # Search uxwing
        encoded_q = urllib.parse.quote(clean_query)
        search_url = f"https://uxwing.com/?s={encoded_q}"
        print(f"🔍 Tìm kiếm icon '{clean_query}' trên UXWing ({search_url})...")
        req = urllib.request.Request(
            search_url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        )
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                search_html = resp.read().decode("utf-8", errors="ignore")
        except Exception as e:
            print(f"❌ Lỗi kết nối tới UXWing: {e}")
            return ""

        # Extract icon post links from search results (ignoring nav links)
        matches = re.findall(r'href="(https://uxwing\.com/[a-z0-9\-]+-icon/)"', search_html)
        # Filter out non-icon pages
        icon_links = [
            m for m in matches
            if not any(x in m for x in ["new-icon-request", "svg-icon-editor", "license", "privacy", "terms"])
        ]

        if not icon_links:
            # Fallback: direct category pattern
            direct_try = f"https://uxwing.com/{clean_query}-icon/"
            print(f"⚠️ Không thấy trong search kết quả, thử đường dẫn trực tiếp: {direct_try}")
            icon_links = [direct_try]

        page_url = icon_links[0]
        print(f"🎯 Đã chọn icon page: {page_url}")

    # 2. Fetch page and extract direct SVG download URL
    page_req = urllib.request.Request(
        page_url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )
    try:
        with urllib.request.urlopen(page_req, timeout=12) as resp:
            page_html = resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"❌ Lỗi tải trang chi tiết icon {page_url}: {e}")
        return ""

    svg_urls = re.findall(r'href="(https://uxwing\.com/wp-content/themes/uxwing/download/[^"]+\.svg)"', page_html)
    if not svg_urls:
        # Try finding svg download button
        svg_urls = re.findall(r'data-download="(https://uxwing\.com/[^"]+\.svg)"', page_html)

    if not svg_urls:
        print(f"❌ Không tìm thấy link SVG trên trang {page_url}")
        return ""

    svg_url = svg_urls[0]
    print(f"📥 Đang tải SVG từ {svg_url}...")

    # 3. Download the SVG file
    dl_req = urllib.request.Request(
        svg_url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )
    try:
        with urllib.request.urlopen(dl_req, timeout=12) as resp:
            svg_content = resp.read().decode("utf-8", errors="ignore")

        # Save to destination
        dest.write_text(svg_content, encoding="utf-8")
        print(f"✅ Đã lưu SVG thành công vào: {dest.resolve()}")
        return str(dest)
    except Exception as e:
        print(f"❌ Lỗi khi ghi file SVG: {e}")
        return ""


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch official icons from UXWing into public/icon/")
    parser.add_argument("query", help="Tên icon hoặc từ khóa tìm kiếm trên UXWing")
    parser.add_argument("--output", "-o", default=None, help="Đường dẫn file SVG đầu ra")
    args = parser.parse_args()

    search_and_download_uxwing(args.query, args.output)
