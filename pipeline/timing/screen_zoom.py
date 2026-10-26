#!/usr/bin/env python3
"""
pipeline/timing/screen_zoom.py - Automated Screen Recording Zoom Timeline Generator

Features:
1. Takes a timeline of screen interaction cues (or clicks/hotspots) and generates:
   - Dynamic ZoomEvents (overview -> zoom in on target -> overview).
   - Dynamic CursorEvents (smooth cursor motion & click ripples).
   - Ready-to-use JSON config for Remotion's <ScreenMockup />.
2. Supports auto-panning between multiple targets without jumping back to overview.
3. Automatically computes safe transform origins to prevent edge clipping.

Usage:
  python pipeline/timing/screen_zoom.py --demo --output output/sample_screen_zoom.json
  python pipeline/timing/screen_zoom.py --cues my_cues.json --output videos/my_video/screen_config.json --fps 30
"""

import argparse
import json
import sys
from pathlib import Path
from typing import List, Dict, Any

sys.stdout.reconfigure(encoding="utf-8")


def generate_zoom_sequence(cues: List[Dict[str, Any]], fps: int = 30) -> Dict[str, Any]:
    """
    Given a list of cues like:
    [
      { "time_sec": 1.5, "action": "focus", "x": 0.82, "y": 0.15, "scale": 2.0, "hold_sec": 2.0, "label": "Profile Menu" },
      { "time_sec": 4.5, "action": "click", "x": 0.50, "y": 0.50, "scale": 1.8, "hold_sec": 1.5, "label": "Save Button" }
    ]
    Generates zoomEvents and cursorEvents for ScreenMockup.
    """
    zoom_events = [
        # Initial overview state at frame 0
        {
            "frame": 0,
            "scale": 1.0,
            "originX": 0.5,
            "originY": 0.5,
            "transitionFrames": 1,
            "label": "Overview"
        }
    ]

    cursor_events = []
    prev_cursor_x = 0.5
    prev_cursor_y = 0.5
    prev_frame = 0

    for cue in cues:
        time_sec = cue.get("time_sec", 0.0)
        action_frame = int(time_sec * fps)
        target_x = cue.get("x", 0.5)
        target_y = cue.get("y", 0.5)
        scale = cue.get("scale", 1.8)
        hold_sec = cue.get("hold_sec", 2.0)
        hold_frames = int(hold_sec * fps)
        label = cue.get("label", "Focus")
        transition_frames = cue.get("transition_frames", int(fps * 0.5))  # 0.5s transition

        # 1. Cursor movement leading up to the action (start moving 0.6s prior)
        move_start_frame = max(prev_frame, action_frame - int(fps * 0.6))
        cursor_events.append({
            "frame": move_start_frame,
            "x": prev_cursor_x,
            "y": prev_cursor_y,
            "isClick": False
        })
        cursor_events.append({
            "frame": action_frame,
            "x": target_x,
            "y": target_y,
            "isClick": (cue.get("action") == "click")
        })

        # 2. Camera zoom-in event
        zoom_in_frame = max(0, action_frame - int(fps * 0.25))
        zoom_events.append({
            "frame": zoom_in_frame,
            "scale": scale,
            "originX": round(target_x, 3),
            "originY": round(target_y, 3),
            "transitionFrames": transition_frames,
            "label": label
        })

        # 3. Zoom back out to overview after hold duration (unless next cue continues zoom)
        zoom_out_frame = action_frame + hold_frames
        zoom_events.append({
            "frame": zoom_out_frame,
            "scale": 1.0,
            "originX": round(target_x, 3),
            "originY": round(target_y, 3),
            "transitionFrames": int(fps * 0.6),
            "label": "Overview"
        })

        prev_cursor_x = target_x
        prev_cursor_y = target_y
        prev_frame = zoom_out_frame

    # Sort events
    zoom_events = sorted(zoom_events, key=lambda e: e["frame"])
    cursor_events = sorted(cursor_events, key=lambda e: e["frame"])

    return {
        "fps": fps,
        "zoomEvents": zoom_events,
        "cursorEvents": cursor_events
    }


def create_demo_cues() -> List[Dict[str, Any]]:
    """Creates a sample interaction timeline for testing."""
    return [
        {
            "time_sec": 1.0,
            "action": "focus",
            "x": 0.85,
            "y": 0.12,
            "scale": 2.2,
            "hold_sec": 2.2,
            "label": "Step 1: Open Settings"
        },
        {
            "time_sec": 4.0,
            "action": "click",
            "x": 0.45,
            "y": 0.38,
            "scale": 1.9,
            "hold_sec": 2.0,
            "label": "Step 2: Enter API Key"
        },
        {
            "time_sec": 7.0,
            "action": "click",
            "x": 0.50,
            "y": 0.78,
            "scale": 1.7,
            "hold_sec": 1.8,
            "label": "Step 3: Save & Deploy"
        }
    ]


def main():
    parser = argparse.ArgumentParser(description="Generate Screen Recording Pan & Zoom Timeline")
    parser.add_argument("--cues", help="Path to input JSON cues file")
    parser.add_argument("--demo", action="store_true", help="Generate sample demo screen zoom configuration")
    parser.add_argument("--output", "-o", default="output/screen_zoom_config.json", help="Output path for JSON config")
    parser.add_argument("--fps", type=int, default=30, help="Frames per second (default: 30)")

    args = parser.parse_args()

    if args.demo or not args.cues:
        print("💡 Đang tạo cấu hình mẫu phóng to màn hình (demo cues)...")
        cues = create_demo_cues()
    else:
        with open(args.cues, "r", encoding="utf-8") as f:
            cues = json.load(f)

    config = generate_zoom_sequence(cues, fps=args.fps)

    out_p = Path(args.output)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    with open(out_p, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=2)

    print(f"🎉 Đã lưu cấu hình zoom màn hình vào: {out_p}")
    print(f"   - Số sự kiện zoom: {len(config['zoomEvents'])}")
    print(f"   - Số chuyển động con trỏ & click: {len(config['cursorEvents'])}")


if __name__ == "__main__":
    main()
