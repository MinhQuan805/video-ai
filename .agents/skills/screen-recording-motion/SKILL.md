---
name: screen-recording-motion
description: >-
  Procedures, animation standards, and Remotion recipes for editing screen recordings, software demos, and UI mockups.
  Covers macOS window chrome framing, dynamic camera pan & zoom, focus spotlights, cursor simulation, and click ripples.
---

# Screen Recording Motion & Dynamic Pan-and-Zoom

Screen recordings of software, websites, or code demos look flat and hard to follow on mobile screens without intentional framing and dynamic zoom. This skill provides the standards and recipes for turning raw captures into high-production Screen Studio-style presentations.

## Integration with the video direction

Use real capture when the audience needs to see real behavior; label illustrative mockups so they are not
mistaken for evidence. For the requested paper continuation, match its palette, framing, type and motion grammar
via [paper-motion-continuity.md](../motion-graphic-design/references/paper-motion-continuity.md). Keep focus/zoom,
cursor and UI response on shared semantic cues from [ai-video-pipeline](../ai-video-pipeline/SKILL.md).
Follow [autonomous-skill-and-asset-evolution](../autonomous-skill-and-asset-evolution/SKILL.md) for public capture,
permissions and dependencies. Source web capture is not permission to render a composition: the project's
render approval gate still applies. Do not record local private apps or upload raw without appropriate authorization.

---

## 0. Autonomous Screen Video Recording (Zero-Touch Recording)

Khi kịch bản video yêu cầu đoạn demo màn hình tương tác, cuộn trang web hoặc duyệt tài liệu/sản phẩm mà **người dùng không cần phải quay bằng tay**:

### Lệnh tự động ghi hình màn hình web sang MP4 chuẩn 30fps:
```powershell
.\.venv\Scripts\python.exe pipeline/research/web_capture.py record --url "https://example.com" --output "videos/<video-name>/assets/screen_demo.mp4" --duration 6 --scroll --scroll-speed 350 --fps 30
```

Check local prerequisites first; add `--allow-install` only when the project-local dependency policy allows
installation into the active `.venv`. Existing captures should be reused, not rerecorded to check completion.

* **Cơ chế hoạt động**:
  1. Tự động khởi tạo Chromium headless; lần đầu chỉ cài bản Playwright đã ghim trong `.venv` khi có `--allow-install`.
  2. Mở URL, ẩn cookie popups, mô phỏng cuộn trang mượt mà hoặc thực hiện chuỗi hành động click / gõ phím theo kịch bản.
  3. Dùng `ffmpeg` nếu có để chuyển mã H.264/yuv420p với fps cấu hình; kiểm compatibility và metadata thực tế, không khẳng định luôn tương thích.
  4. Chạy local không cần dịch vụ capture trả phí; không tự dùng tài khoản/quota bên ngoài hoặc bỏ qua nguồn lực local.
  5. Đăng ký output vào asset manifest và nạp đúng public path/props của `ScreenMockup` hiện có; component không tự nhận file chỉ vì file vừa được tạo.

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
   - Move focus decisively to the region being explained, then hold long enough to read. Do not pan continuously for decoration.
   - 14–18 frames at 30fps is a starting example; use configured fps and actual reading/cue needs.
   - Use frame-driven easing or spring for camera travel. Constant speed is valid for steady scrolling; synchronize cursor/action with the source capture and avoid invented click results.
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
1. **Dynamic Follow-Pan**: Choose zoom by actual text size, capture resolution and safe bounds; $1.8\times - 2.4\times$ is a starting example, not a mandatory scale that may crop the target.
2. **Auto Horizontal Tracking**: Shift `originX` to follow the active region (left sidebar $\rightarrow$ center workspace $\rightarrow$ right inspector).
3. **Vertical Centering**: Keep the active interaction point within the vertical range `0.30` to `0.65` of the screen to stay clear of TikTok/Reels UI overlay buttons (captions, like button, profile icons).

---

## 5. Quy Tắc Bắt Buộc: Kiểm Tra Hit-Testing Con Chuột (Cursor Click Accuracy QA)

Khi mô phỏng con chuột di chuyển và nhấp chuột (`SimulatedCursor`, `ClickRipple`, hover, drag):
1. **Không ước lượng tọa độ**: Tọa độ đích `(x, y)` tại frame nhấp chuột BẮT BUỘC phải được tính toán chính xác từ bounding box của phần tử đích:
   - `targetX = containerLeft + elementRelativeLeft + elementWidth / 2`
   - `targetY = containerTop + elementRelativeTop + elementHeight / 2`
2. **Đồng bộ Ripple và Mũi tên**: `ClickRipple` phải dùng chính xác tọa độ `(x, y)` của `SimulatedCursor` tại frame click. Mũi tên chuột trỏ vào đâu, vòng sóng tỏa ra từ đúng điểm đó.
3. **Hit-Testing QA Check (`src/motion/validate.ts`)**: Sử dụng hàm `checkCursorClickTarget`:
   - Kiểm tra `cursorPos` tại frame click phải nằm trọn trong `targetBounds`.
   - Nếu lệch khỏi phần tử đích (`CURSOR_MISS`), pipeline QA sẽ báo lỗi tọa độ kèm số pixel bị trượt (`gapPx`).
4. **Kiểm tra trực quan trên Review Frame**: Khi xuất khung hình review, luôn chọn frame tại thời điểm click (`isClicking == true` hoặc frame bắt đầu sóng tỏa) để xác minh trực tiếp con chuột đã đáp đúng tâm button/link.
