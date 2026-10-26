#!/usr/bin/env python3
"""
pipeline/research/web_capture.py - Autonomous Web Research, Screenshot & Screen Recording Tool

Provides zero-touch automated web asset generation:
1. High-DPI web screenshot capture (viewport or selector-based, clean mode).
2. Autonomous headless screen video recording (smooth scroll, typing, clicks) converted to 30fps MP4.
3. Auto-installs lightweight open-source dependencies (playwright + chromium) if absent.
4. $0 cost, safe sandboxed execution with strict timeouts.

Usage:
  # 1. Chụp ảnh màn hình website (Retina 2x, 1920x1080):
  python pipeline/research/web_capture.py screenshot --url "https://en.wikipedia.org/wiki/HMS_Beagle" --output videos/my_video/assets/beagle_wiki.png

  # 2. Chụp một phần tử cụ thể (selector):
  python pipeline/research/web_capture.py screenshot --url "https://github.com/facebook/react" --selector "article.markdown-body" --output videos/my_video/assets/react_readme.png

  # 3. Tự động quay video màn hình (cuộn trang tự động, 30fps MP4):
  python pipeline/research/web_capture.py record --url "https://remotion.dev" --output videos/my_video/assets/remotion_demo.mp4 --duration 6 --scroll
"""

import argparse
import ipaddress
import json
import os
import shutil
import socket
import subprocess
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")


def validate_public_url(url: str) -> str:
    from urllib.parse import urlparse

    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.username or parsed.password or not parsed.hostname:
        raise ValueError("Chỉ cho phép URL HTTPS công khai, không chứa credential.")
    host = parsed.hostname.lower()
    if host == "localhost" or host.endswith(".local"):
        raise ValueError("Không cho phép capture địa chỉ local/private.")
    for address in socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM):
        ip = ipaddress.ip_address(address[4][0])
        if not ip.is_global:
            raise ValueError(f"Host phân giải tới địa chỉ không công khai: {ip}")
    return url


def resolve_output_path(value: str | Path) -> Path:
    videos_root = Path("videos").resolve()
    output = Path(value).resolve()
    if videos_root not in output.parents:
        raise ValueError("Output capture phải nằm trong videos/<video-name>/.")
    return output


def ensure_playwright(allow_install: bool = False):
    """Use Playwright from the project venv; install only when explicitly enabled."""
    marker = Path(sys.prefix) / ".video-ai-playwright-chromium-ready"
    try:
        import playwright
    except ImportError:
        if not allow_install:
            raise RuntimeError(
                "Thiếu Playwright. Chạy lại một lần bằng .venv với --allow-install."
            )
        if sys.prefix == sys.base_prefix:
            raise RuntimeError("Từ chối cài Playwright ngoài virtual environment của project.")
        print("📦 Đang cài Playwright vào virtual environment của project...")
        subprocess.run([sys.executable, "-m", "ensurepip", "--upgrade"], check=True)
        subprocess.run(
            [sys.executable, "-m", "pip", "install", "playwright==1.64.1",
            "--disable-pip-version-check"], check=True
        )

    if allow_install and not marker.exists():
        if sys.prefix == sys.base_prefix:
            raise RuntimeError("Từ chối cài Chromium ngoài virtual environment của project.")
        print("🌐 Đang cài Chromium headless lần đầu...")
        subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=True)
        marker.write_text("playwright=1.64.1\n", encoding="utf-8")
        print("✅ Cài đặt Chromium headless thành công!")


def capture_screenshot(url: str, output_path: Path, width: int = 1920, height: int = 1080,
                       scale: int = 2, selector: str = None, full_page: bool = False,
                       dark_mode: bool = False, delay_ms: int = 1500,
                       allow_install: bool = False):
    """Captures a clean, high-resolution screenshot of a webpage or element."""
    url = validate_public_url(url)
    ensure_playwright(allow_install)
    from playwright.sync_api import sync_playwright

    output_path = resolve_output_path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"📸 Đang mở {url} và chụp màn hình...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": width, "height": height},
            device_scale_factor=scale,
            color_scheme="dark" if dark_mode else "light",
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            accept_downloads=False,
            service_workers="block",
        )
        page = context.new_page()
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
        except Exception:
            # Fallback if networkidle takes too long
            page.goto(url, wait_until="domcontentloaded", timeout=20000)

        page.wait_for_timeout(delay_ms)

        # Attempt to dismiss standard cookie banners or overlays
        try:
            page.evaluate("""() => {
                const selectors = ['#onetrust-accept-btn-handler', '.cookie-consent-accept', 'button[aria-label="Accept all"]', 'button:has-text("Accept")'];
                for (const s of selectors) {
                    const btn = document.querySelector(s);
                    if (btn) btn.click();
                }
            }""")
        except Exception:
            pass

        if selector:
            element = page.locator(selector).first
            element.wait_for(timeout=5000)
            element.screenshot(path=str(output_path))
            print(f"✅ Đã chụp phần tử '{selector}' lưu tại: {output_path}")
        else:
            page.screenshot(path=str(output_path), full_page=full_page)
            print(f"✅ Đã chụp toàn bộ giao diện lưu tại: {output_path}")

        browser.close()


def record_screen_video(url: str, output_path: Path, width: int = 1920, height: int = 1080,
                        duration_sec: float = 6.0, scroll: bool = True,
                        scroll_speed: int = 350, actions_file: str = None,
                        fps: int = 30, allow_install: bool = False):
    """
    Autonomously navigates a webpage, performs smooth scroll or cues, records webm,
    and encodes to a standardized 30fps MP4 using ffmpeg.
    """
    url = validate_public_url(url)
    if not 1 <= duration_sec <= 30:
        raise ValueError("Duration phải nằm trong 1-30 giây để kiểm soát chi phí và dung lượng.")
    if fps not in {24, 25, 30}:
        raise ValueError("FPS được phép: 24, 25 hoặc 30.")
    if not shutil.which("ffmpeg"):
        raise RuntimeError("Không tìm thấy FFmpeg trong PATH; không tự tải binary ngoài.")
    ensure_playwright(allow_install)
    from playwright.sync_api import sync_playwright

    output_path = resolve_output_path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    temp_dir = output_path.parent / ".temp_capture"
    temp_dir.mkdir(parents=True, exist_ok=True)

    print(f"🎥 Đang bắt đầu ghi hình tự động cho: {url} (thời lượng: {duration_sec}s)...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": width, "height": height},
            record_video_dir=str(temp_dir),
            record_video_size={"width": width, "height": height},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            accept_downloads=False,
            service_workers="block",
        )
        page = context.new_page()
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
        except Exception:
            page.goto(url, wait_until="domcontentloaded", timeout=20000)

        page.wait_for_timeout(1000)

        # Execute custom actions if provided, otherwise default smooth scroll
        if actions_file and os.path.exists(actions_file):
            with open(actions_file, "r", encoding="utf-8") as f:
                actions = json.load(f)
            for act in actions:
                a_type = act.get("type", "wait")
                if a_type == "scroll":
                    page.mouse.wheel(0, act.get("distance", 300))
                elif a_type == "click":
                    page.click(act["selector"])
                elif a_type == "type":
                    page.type(act["selector"], act["text"], delay=act.get("delay", 80))
                elif a_type == "wait":
                    page.wait_for_timeout(int(act.get("duration", 1.0) * 1000))
        elif scroll:
            # Smooth scrolling simulation
            steps = int(duration_sec * 10)
            step_pixels = int(scroll_speed / 10)
            for _ in range(steps):
                page.mouse.wheel(0, step_pixels)
                page.wait_for_timeout(100)
        else:
            page.wait_for_timeout(int(duration_sec * 1000))

        # Close page to ensure video is flushed
        page.close()
        context.close()
        browser.close()

    # Find the recorded video file (.webm)
    recorded_files = list(temp_dir.glob("*.webm"))
    if not recorded_files:
        raise RuntimeError("Không tìm thấy file video ghi hình từ Playwright.")

    raw_video = recorded_files[0]

    # Convert to standard MP4 30fps using ffmpeg
    print(f"⚙️ Đang tối ưu và chuyển mã sang MP4 chuẩn 30fps qua FFmpeg...")
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-i", str(raw_video),
        "-t", str(duration_sec),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-r", str(fps),
        "-movflags", "+faststart",
        str(output_path)
    ]
    subprocess.run(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True)

    # Clean up temp files
    try:
        shutil.rmtree(temp_dir)
    except Exception:
        pass

    print(f"✅ Hoàn tất xuất video màn hình tại: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Autonomous Web Capture & Recording Tool")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Screenshot subcommand
    sc_parser = subparsers.add_parser("screenshot", help="Capture a webpage screenshot")
    sc_parser.add_argument("--url", required=True, help="Webpage URL to capture")
    sc_parser.add_argument("--output", required=True, help="Output image file path (.png)")
    sc_parser.add_argument("--width", type=int, default=1920, help="Viewport width")
    sc_parser.add_argument("--height", type=int, default=1080, help="Viewport height")
    sc_parser.add_argument("--scale", type=int, default=2, help="Device scale factor (1 or 2)")
    sc_parser.add_argument("--selector", help="CSS selector to capture specific element")
    sc_parser.add_argument("--full-page", action="store_true", help="Capture entire scrollable page")
    sc_parser.add_argument("--dark", action="store_true", help="Enable dark mode")
    sc_parser.add_argument("--allow-install", action="store_true", help="Install pinned Playwright into the active project venv if missing")

    # Record subcommand
    rec_parser = subparsers.add_parser("record", help="Record a webpage screen video")
    rec_parser.add_argument("--url", required=True, help="Webpage URL to navigate")
    rec_parser.add_argument("--output", required=True, help="Output MP4 file path")
    rec_parser.add_argument("--width", type=int, default=1920, help="Viewport width")
    rec_parser.add_argument("--height", type=int, default=1080, help="Viewport height")
    rec_parser.add_argument("--duration", type=float, default=5.0, help="Duration in seconds")
    rec_parser.add_argument("--scroll", action="store_true", default=True, help="Perform smooth auto-scroll")
    rec_parser.add_argument("--scroll-speed", type=int, default=300, help="Pixels per second to scroll")
    rec_parser.add_argument("--actions", help="JSON file with step-by-step actions (clicks, typing, scroll)")
    rec_parser.add_argument("--fps", type=int, default=30, help="Target framerate (default: 30)")
    rec_parser.add_argument("--allow-install", action="store_true", help="Install pinned Playwright into the active project venv if missing")

    args = parser.parse_args()

    if args.command == "screenshot":
        capture_screenshot(
            url=args.url,
            output_path=Path(args.output),
            width=args.width,
            height=args.height,
            scale=args.scale,
            selector=args.selector,
            full_page=args.full_page,
            dark_mode=args.dark,
            allow_install=args.allow_install,
        )
    elif args.command == "record":
        record_screen_video(
            url=args.url,
            output_path=Path(args.output),
            width=args.width,
            height=args.height,
            duration_sec=args.duration,
            scroll=args.scroll,
            scroll_speed=args.scroll_speed,
            actions_file=args.actions,
            fps=args.fps,
            allow_install=args.allow_install,
        )


if __name__ == "__main__":
    main()
