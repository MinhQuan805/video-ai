---
name: screen-recording-motion
description: >-
  Procedures, animation standards, and Remotion recipes for editing screen recordings, software demos, and UI mockups.
  Covers macOS window chrome framing, dynamic camera pan & zoom, focus spotlights, cursor simulation, and click ripples.
---

# Screen Recording Motion & Dynamic Pan-and-Zoom

Screen recordings of software, websites, or code demos look flat and hard to follow on mobile screens without intentional framing and dynamic zoom. This skill provides the standards and recipes for turning raw captures into high-production Screen Studio-style presentations.

---

## 0. Autonomous Screen Video Recording (Zero-Touch Recording)

Khi kịch bản video yêu cầu đoạn demo màn hình tương tác, cuộn trang web hoặc duyệt tài liệu/sản phẩm mà **người dùng không cần phải quay bằng tay**:

### Lệnh tự động ghi hình màn hình web sang MP4 chuẩn 30fps:
```bash
.\.venv\Scripts\python.exe pipeline/research/web_capture.py record \
  --url "https://example.com" \
  --output videos/<video-name>/assets/screen_demo.mp4 \
  --duration 6.0 \
  --scroll \
  --scroll-speed 350 \
  --fps 30 \
  --allow-install
```

* **Cơ chế hoạt động**:
  1. Tự động khởi tạo Chromium headless; lần đầu chỉ cài bản Playwright đã ghim trong `.venv` khi có `--allow-install`.
  2. Mở URL, ẩn cookie popups, mô phỏng cuộn trang mượt mà hoặc thực hiện chuỗi hành động click / gõ phím theo kịch bản.
  3. Tự động dùng `ffmpeg` chuyển mã sang định dạng `H.264 / yuv420p / 30fps` tương thích 100% với Remotion Video Player.
  4. Chi phí: **$0 hoàn toàn** (không dùng dịch vụ quay màn hình đám mây trả phí).
  5. File MP4 xuất ra lập tức được nạp vào component `<ScreenMockup videoSrc="assets/screen_demo.mp4" />`.

---

## 1. Design & Layout Principles

1. **Window Mockup Framing**:
   - Never show raw desktop clutters (taskbars, battery icons, messy tabs).
   - Wrap the recording inside a sleek window frame (`<ScreenMockup />`):
     - macOS traffic light controls (red `#FF5F56`, yellow `#FFBD2E`, green `#27C93F`).
     - Centered pill with subtle lock icon and domain/title.
     - Multi-layer elevation shadow (`0 30px 90px -20px rgba(0,0,0,0.85)`).
     - Rounded corners (`border-radius: 20px`).
2. **The Zoom Hierarchy**:
   - **Overview ($1.0\times$)**: Establishing context, page layout, or transition between sections.
   - **Mid-Range Focus ($1.5\times - 1.8\times$)**: Interacting with a form, reading a paragraph, or navigating a sidebar.
   - **Macro Detail ($2.0\times - 2.8\times$)**: Clicking a small toggle, reading code snippets, or typing in a narrow input.
3. **Camera Dynamics (Snappy Ease-Out)**:
   - Camera motion must be snappy and decisive, not sluggish.
   - Ideal transition duration: **14 to 18 frames** (0.45s - 0.6s at 30fps).
   - Easing curve: `Easing.bezier(0.22, 1, 0.36, 1)` or Remotion `spring({ damping: 200, stiffness: 120 })`. Avoid linear interpolation.
4. **Attention Guidance**:
   - When zoomed into a specific UI element, enable `spotlight` mode to subtly darken peripheral areas.
   - Add click ripple animations on interactive moments to visually confirm user input.

---

## 2. Using the `<ScreenMockup />` Component

Import from `src/shared/ScreenMockup.tsx`:

```tsx
import { ScreenMockup, ZoomEvent, CursorEvent } from '../../shared/ScreenMockup';

const zoomEvents: ZoomEvent[] = [
  // 1. Initial full overview
  { frame: 0, scale: 1.0, originX: 0.5, originY: 0.5, transitionFrames: 1 },
  // 2. Zoom into top-right user menu
  { frame: 30, scale: 2.2, originX: 0.85, originY: 0.12, transitionFrames: 16, label: 'Settings' },
  // 3. Pan to center modal
  { frame: 90, scale: 1.8, originX: 0.50, originY: 0.45, transitionFrames: 18, label: 'API Key' },
  // 4. Return to overview
  { frame: 150, scale: 1.0, originX: 0.5, originY: 0.5, transitionFrames: 20, label: 'Overview' },
];

const cursorEvents: CursorEvent[] = [
  { frame: 15, x: 0.5, y: 0.5 },
  { frame: 45, x: 0.85, y: 0.12, isClick: true },
  { frame: 105, x: 0.50, y: 0.45, isClick: true },
];

export const MyScreenScene: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: '#0D0E12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ScreenMockup
        videoSrc="screen_recording.mp4"
        windowTitle="dashboard.myapp.io"
        theme="dark"
        width="90%"
        aspectRatio="16/9"
        zoomEvents={zoomEvents}
        cursorEvents={cursorEvents}
        spotlight={true}
        tilt3D={false}
      />
    </div>
  );
};
```

---

## 3. Automated Zoom & Cursor Timeline Generator (`pipeline/timing/screen_zoom.py`)

Instead of writing dozens of frame numbers manually, define high-level action cues in JSON:

### Example `cues.json`:
```json
[
  { "time_sec": 1.0, "action": "focus", "x": 0.85, "y": 0.12, "scale": 2.2, "hold_sec": 2.0, "label": "Profile Menu" },
  { "time_sec": 3.8, "action": "click", "x": 0.50, "y": 0.40, "scale": 1.9, "hold_sec": 2.5, "label": "Save Changes" }
]
```

### Run Generator:
```bash
.\.venv\Scripts\python.exe pipeline/timing/screen_zoom.py --cues cues.json --output videos/my_topic/screen_zoom_config.json --fps 30
```

The script automatically generates:
- Interpolated cursor movement paths starting before the action.
- Click ripple triggers.
- Smooth camera zoom-in and return-to-overview keyframes.

---

## 4. Vertical (9:16) Mobile Format Adaptation

When fitting desktop recordings (16:9) into vertical short-form videos (1080x1920):
1. **Dynamic Follow-Pan**: Zoom scale should default to **$1.8\times - 2.4\times$** so desktop UI text is large enough to read on smartphones.
2. **Auto Horizontal Tracking**: Shift `originX` to follow the active region (left sidebar $\rightarrow$ center workspace $\rightarrow$ right inspector).
3. **Vertical Centering**: Keep the active interaction point within the vertical range `0.30` to `0.65` of the screen to stay clear of TikTok/Reels UI overlay buttons (captions, like button, profile icons).
