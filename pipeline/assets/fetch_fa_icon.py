#!/usr/bin/env python3
"""
pipeline/assets/fetch_fa_icon.py - Font Awesome Icon Downloader / Exporter

Fetches official Font Awesome Free SVG icons from official GitHub raw repository
and saves them as .svg or converts them to .png with custom fill colors and sizes.

Usage:
  python pipeline/assets/fetch_fa_icon.py ship --output videos/vox/darwin/assets/ship_icon.svg
  python pipeline/assets/fetch_fa_icon.py compass --style solid --color "#C6532A" --output compass.svg
  python pipeline/assets/fetch_fa_icon.py github --style brands --output github.svg
"""

import argparse
import os
import re
import sys
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

BASE_URL = "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs"


def fetch_fa_svg(icon_name: str, style: str = "solid") -> str:
    """
    Downloads official Font Awesome SVG text from GitHub.
    style: 'solid', 'regular', or 'brands'
    """
    clean_name = icon_name.lower().strip().replace("fa-", "")
    url = f"{BASE_URL}/{style}/{clean_name}.svg"

    print(f"📥 Đang tải icon '{clean_name}' (style: {style}) từ Font Awesome: {url}...")
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read().decode("utf-8")
    except Exception as e:
        # If solid failed, attempt brands or regular
        if style == "solid":
            for fallback_style in ["brands", "regular"]:
                fallback_url = f"{BASE_URL}/{fallback_style}/{clean_name}.svg"
                try:
                    fallback_req = urllib.request.Request(
                        fallback_url,
                        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
                    )
                    with urllib.request.urlopen(fallback_req, timeout=10) as resp:
                        print(f"✅ Tìm thấy icon trong nhóm '{fallback_style}'!")
                        return resp.read().decode("utf-8")
                except Exception:
                    continue
        raise RuntimeError(f"Không thể tải icon '{clean_name}'. Lỗi: {e}")


def apply_color(svg_text: str, color: str) -> str:
    """Replaces or injects fill color into the root SVG element or path."""
    if not color:
        return svg_text
    
    # Check if fill attribute already exists
    if 'fill="' in svg_text:
        return re.sub(r'fill="[^"]+"', f'fill="{color}"', svg_text)
    else:
        # Inject fill attribute into <svg ...>
        return re.sub(r'(<svg\b[^>]*)>', rf'\1 fill="{color}">', svg_text, count=1)


def save_icon(icon_name: str, output_path: str, style: str = "solid", color: str = None):
    svg_data = fetch_fa_svg(icon_name, style=style)
    if color:
        svg_data = apply_color(svg_data, color)

    out_p = Path(output_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)

    with open(out_p, "w", encoding="utf-8") as f:
        f.write(svg_data)

    print(f"🎉 Đã lưu icon Font Awesome vào: {out_p}")


def main():
    parser = argparse.ArgumentParser(description="Download Font Awesome Free SVG icons")
    parser.add_argument("icon", help="Icon name (e.g. ship, compass, user, check, github)")
    parser.add_argument("--output", "-o", required=True, help="Output file path (e.g. path/to/icon.svg)")
    parser.add_argument("--style", default="solid", choices=["solid", "regular", "brands"], help="Font Awesome style")
    parser.add_argument("--color", "-c", help="Custom fill color (e.g. #C6532A, #1A1816, #FFFFFF)")

    args = parser.parse_args()
    save_icon(args.icon, args.output, style=args.style, color=args.color)


if __name__ == "__main__":
    main()
