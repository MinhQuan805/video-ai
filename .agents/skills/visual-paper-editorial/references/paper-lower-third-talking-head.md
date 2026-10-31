# Quy chuẩn thiết kế nửa dưới video Paper & Talking-Head Split (Kallaway Standard)

Tài liệu đúc kết kiến trúc phân bổ không gian và kỹ thuật hiển thị người nói (Talking-Head) ở nửa dưới video định dạng dọc (1080x1920, 9:16) trong phong cách **Paper Minimal Editorial**, đạt chuẩn thẩm mỹ cao cấp theo phong cách tham chiếu **Kallaway**.

---

## 1. Kiến trúc 3 Tầng Dọc (Three-Tier Vertical Canvas Architecture)

Để giải quyết bài toán: vừa có đồ họa sinh động, vừa có phụ đề dễ đọc, vừa có gương mặt người nói to rõ biểu cảm mà không bị đè lên nhau hay để lộ khoảng trống vô nghĩa:

```text
1080px Canvas Width
┌────────────────────────────────────────────────────────┐
│                                                        │
│   TẦNG 1: VÙNG MOTION GRAPHIC CHÍNH (y: 200 - 640px)    │
│   - Rương báu, thước cuộn, module, băng chuyền, v.v.    │
│   - Chiếm nửa trên màn hình, kết thúc trước y = 640px   │
│                                                        │
├────────────────────────────────────────────────────────┤
│   TẦNG 2: PHỤ ĐỀ KARAOKE NỔI (y: 760 - 840px)          │
│   - top: 780px (Split-Screen)                          │
│   - Nằm ngay dưới đồ họa và cách đỉnh tóc 85px         │
│   - Loại bỏ khoảng trống thừa 300px                    │
├────────────────────────────────────────────────────────┤
│   TẦNG 3: TALKING-HEAD & BỆ ĐỠ KALLAWAY                │
│                                                        │
│                 ╭───────────────╮                      │
│                 │  GƯƠNG MẶT    │ (Đỉnh tóc: y ~ 925px)│
│                 │   (TO RÕ)     │                      │
│          ╭──────┴───────────────┴──────╮               │
│          │  THẺ BỆ ĐỠ SLATE GRAY       │               │
│          │  (#989FA4 - Kallaway Tone)  │ (Mép thẻ:     │
│          │  Chiều ngang = 920px (85%)  │  y = 1400px,  │
│          │  Chiều cao = 520px          │  đỡ sau cằm)  │
│          │  Vai ôm khít viền thẻ       │               │
│          │  TUYỆT ĐỐI KHÔNG CHỮ        │               │
└──────────┴─────────────────────────────┴───────────────┘
```

---

## 2. Bảng thông số vàng (Golden Production Metrics)

| Thành phần | Thông số chuẩn | Ý nghĩa & Tác dụng |
|---|---|---|
| **Tỷ lệ scale người nói** | `SCALE = 0.85` | Gương mặt và thân người vừa vặn, không bị bè to tràn ra ngoài nền xám. |
| **Chiều ngang video gốc** | `VIDEO_WIDTH = 1080px` | Khung hình dọc 1080x1920. |
| **Chiều ngang thẻ bệ đỡ xám** | `CARD_WIDTH = 920px` (Khớp 100%: 1080 * 0.85 = 918px) | **Bắt buộc khớp chính xác với chiều ngang của video người nói sau scale**, ôm trọn bờ vai, không để vai tràn viền ngoài cũng không để thừa cánh xám. Căn giữa `left: 50%, transform: translateX(-50%)`. |
| **Chiều cao thẻ bệ đỡ** | `height: 520px` (từ đáy màn hình) | Giữ nguyên cố định, vươn cao đỡ trọn bờ vai, ngực và phần cổ người nói. |
| **Màu sắc thẻ bệ đỡ** | `backgroundColor: '#989FA4'` | Màu xám đá phiến (slate gray) theo chuẩn Kallaway, tương phản sắc nét với nền giấy kem (`#FAF8F5`). |
| **Hiệu ứng viền & bóng đổ** | `borderRadius: '44px 44px 0 0'`<br>`boxShadow: '0 24px 60px rgba(26,24,22,0.18), inset 0 1px 0 rgba(255,255,255,0.35)'`<br>`border: '1.5px solid rgba(26,24,22,0.12)'` | Viền thanh mảnh, ánh sáng viền trên mô phỏng kính/thẻ dập nổi, góc bo tròn mềm mại không gắt. |
| **Độ sâu người nói (Bottom Offset)** | `bottom: -300px` (`transformOrigin: 'center bottom'`) | Hạ thấp người nói xuống sâu: giải phóng khoảng đệm thông thoáng dưới Caption, đầu trồi nhẹ lên trên mép thẻ. |
| **Tọa độ phụ đề (Caption topPos)** | `top: 920px` (ở chính giữa video khi có người nói)<br>`top: 1480px` (cảnh thuần đồ họa) | Khi chia màn hình, phụ đề nằm ngay ở trục giữa video ($Y = 920 - 990\text{px}$), cân đối hoàn hảo giữa cụm đồ họa trên và người nói dưới. |

---

## 3. Quy tắc cốt lõi (Hard Rules)

### Quy tắc 1: Tối giản tuyệt đối trên thẻ xám (Zero Text on Pedestal)
- Tuyệt đối **KHÔNG đặt chữ, nhãn, icon hay badge nào** lên thẻ bệ đỡ xám (như `● SPEAKER`, `1080P • 30FPS` hay tên tác giả).
- Thẻ xám chỉ đóng vai trò là **vật liệu nền thị giác (visual pedestal)** giúp tách biệt cơ thể người nói (áo đen, tóc tối) với nền giấy kem một cách trang nhã và cao cấp.

### Quy tắc 2: Đồng bộ chiều ngang giữa Thẻ xám và Vai người nói (Snug Shoulder Fit)
- Không dùng `width: 100%` (1080px full width) vì sẽ tạo thành một vệt xám ngang cắt đôi màn hình thô kệch.
- Không để card quá rộng so với thân người (như card 960px trên người 650px) tạo ra hai "cánh xám" trống trải hai bên.
- Luôn căn chỉnh để bờ vai người nói chạm nhẹ hoặc ôm sát hai mép bo tròn của thẻ bệ đỡ (`CARD_WIDTH = 920px` tại `SCALE = 0.96`).

### Quy tắc 3: Hiệu ứng trồi đầu 2.5D (Breakout Pop-out Effect)
- Đầu và đỉnh tóc phải vươn cao, vượt hẳn lên trên mép thẻ xám ($Y_{\text{hair}} \approx 925\text{px}$, trong khi $Y_{\text{card\_top}} = 1400\text{px}$).
- Mép trên của thẻ nằm sau cằm/hàm dưới, tạo cảm giác người nói đang tựa vào bệ đỡ và hướng về phía người xem một cách tự nhiên.

### Quy tắc 4: Tách biệt vị trí phụ đề theo Scene (Dynamic Caption Staging)
- **Scene có người nói (`isSplit = true`)**: `topPos = 920px`, nằm ngay tâm trục giữa video ($Y = 920\text{px}$), cân đối giữa đồ họa trên (kết thúc ở $Y \approx 720\text{px}$) và đỉnh tóc người dưới ($Y \approx 1140\text{px}$).
- **Scene thuần đồ họa (`isSplit = false`)**: `topPos = 1480px`, nằm ở vùng an toàn TikTok dưới đáy màn hình.
- Chuyển đổi vị trí caption mượt mà bằng CSS transition `top 0.2s cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 4. Kỹ thuật Render Remotion: Tránh lỗi Compositor WebM

Khi làm việc với video WebM tách nền có kênh alpha (`user_nobg.webm`):
- **Cấm dùng `<OffthreadVideo>` nếu video WebM thiếu keyframe dày đặc**: Remotion Rust Compositor sẽ báo lỗi: `Compositor error: No frame found at position <ms>` khi seek khung hình trong lúc render song song.
- **Luôn dùng `<Video>`**: Thẻ `<Video>` chạy trực tiếp trong engine Chromium của Puppeteer, giải mã VP9 Alpha tự nhiên, không bị kẹt keyframe, render mượt mà 100% không crash.

---

## 5. Quy trình AI Tách nền & Đồng bộ khẩu hình chuẩn

1. **AI Video Matting bằng RobustVideoMatting (RVM)**:
   - Khi người dùng cung cấp video quay thực tế trong phòng (có đồ đạc, cửa gỗ, tường, bóng đổ), **không bao giờ dùng thuật toán lọc màu đen đơn giản (`arr <= 4`)**.
   - Phải sử dụng mô hình AI chuyên dụng **`pipeline/talking-head/models/rvm_mobilenetv3_fp32.onnx`** chạy qua `onnxruntime` theo cơ chế recurrent state từng frame để bóc tách người với kênh alpha mịn màng (`yuva420p` VP9 WebM).
2. **Đồng bộ âm thanh gốc 1:1**:
   - Luôn trích xuất luồng âm thanh WAV trực tiếp từ file video mới bằng `ffmpeg -vn -acodec pcm_s16le -ar 44100 -ac 1 user_voice.wav`.
   - Tránh tuyệt đối lỗi dùng file âm thanh cũ đã thu âm từ trước khiến khẩu hình miệng bị lệch/chậm hơn tiếng.
3. **Chạy Whisper Forced Alignment**:
   - Sử dụng `faster-whisper` định vị lại chính xác từng mili-giây xuất hiện của từng từ vựng, cập nhật `captions.json` và `timing.txt` tương ứng với video mới.

---

## 6. Code mẫu chuẩn (Production Implementation)

```tsx
import React from 'react';
import { staticFile, useCurrentFrame, Video } from 'remotion';
import { isSpeakerVisible } from './common';

const SCALE = 0.85;
const VIDEO_WIDTH = 1080;
const CARD_WIDTH = 920; // 85% canvas width, ôm khít bờ vai (1080 * 0.85 = 918px)

/**
 * Talking-Head Cutout over Kallaway-Style Slate-Gray Card
 * - Gương mặt và thân người thu nhỏ vừa vặn (scale: 0.85).
 * - Bờ vai ôm khít chiều ngang card (920px), không bị tràn ra ngoài viền xám.
 * - Nền xám giữ nguyên kích thước (width: 920px, height: 520px) và màu sắc (#989FA4).
 * - Hạ thấp vị trí người nói (bottom: -300), đầu trồi nhẹ lên trên mép thẻ.
 * - Dùng thẻ <Video> chuẩn Chromium chống lỗi kẹt keyframe của Remotion Compositor.
 * - Không chữ, không badge trên card.
 */
export const UserTalkingHead: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = isSpeakerVisible(frame);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1920,
        pointerEvents: 'none',
        zIndex: 25,
      }}
    >
      {/* 1. Thẻ bệ đỡ Slate-Gray chuẩn Kallaway (Giữ nguyên cố định) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: CARD_WIDTH,
          height: 520,
          transform: 'translateX(-50%)',
          backgroundColor: '#989FA4', // Tone xám đá phiến sang trọng
          borderRadius: '44px 44px 0 0',
          boxShadow: '0 24px 60px rgba(26, 24, 22, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          border: '1.5px solid rgba(26, 24, 22, 0.12)',
          borderBottom: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. Video người nói đã tách nền AI (Dùng thẻ <Video> thay vì <OffthreadVideo>) */}
      <div
        style={{
          position: 'absolute',
          bottom: -300,
          left: '50%',
          width: VIDEO_WIDTH,
          height: 1920,
          transform: `translateX(-50%) scale(${SCALE})`,
          transformOrigin: 'center bottom',
          zIndex: 2,
          filter: 'drop-shadow(0 16px 36px rgba(26, 24, 22, 0.18))',
        }}
      >
        <Video
          src={staticFile('videos/paper/29-10-26/user_nobg.webm')}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};
```
