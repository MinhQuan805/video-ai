---
name: precision-motion-curves
description: Practical rules, mathematical curves, and Remotion implementation recipes for silky-smooth motion graphics without spring jitter, sluggish settling tails, or floaty physics. Covers Apple-grade cubic-bezier easings, rigid-body mechanical impacts, damped oscillation formulas, and exact-duration timeline choreography.
---

# Precision Motion Curves & Butter-Smooth Animation

Thư viện nguyên lý chuyển động chuẩn xác cao, loại bỏ triệt để hiện tượng **lề mề (sluggish)**, **bồng bềnh (floaty)** và **đuôi dao động li ti (micro-jitter)** thường gặp khi lạm dụng `spring()` trong video đồ họa Remotion.

---

## 1. Bản chất: Vì sao Spring trong Video thường bị "không mượt"?

Trong Remotion và video render, `spring()` thường gây ra 3 vấn đề lớn khiến người xem cảm thấy khó chịu:

1. **Đuôi dao động dài dằng dặc (The Long Settling Tail):**
   Vật lý lò xo (`damped harmonic oscillator`) tiệm cận về 0 theo hàm mũ vô hạn. Ở 10–20 frame cuối cùng, vật thể vẫn di chuyển 0.05px – 0.001px. Mắt người nhạy cảm sẽ thấy vật thể như bị "rung giật nhẹ" hoặc lơ lửng chưa chịu đứng yên.
2. **Thời lượng không xác định (Undetermined Duration):**
   Spring tự tính thời gian dựa vào `mass`, `damping`, `stiffness`. Khi cần nhịp gõ chính xác vào frame 16 (khớp với tiếng click âm thanh hoặc voiceover), spring rất khó canh chuẩn.
3. **Mọi vật biến thành "kẹo dẻo":**
   Các vật thể công nghệ (thước kẹp cơ khí vi mô, thanh RAM cắm vào bo mạch, cánh cửa thép két sắt, công tắc bật) là **vật rắn (rigid body)**. Dùng spring nhún nhảy làm mất tính chính xác và sang trọng của cơ khí.

---

## 2. Bộ Đường Cong Vàng (The Golden Cubic-Bezier Curves)

Thay vì để lò xo tự do, hãy dùng các đường cong gia tốc có kiểm soát (Cubic-Bezier Easing) với thời lượng cố định (`durationInFrames`):

### 1. `appleEaseOut` — Chuẩn mực UI & Motion hiện đại
* **Curve:** `Easing.bezier(0.16, 1, 0.3, 1)` (Quintic / Expo Out).
* **Đặc tính:** Vọt đi cực nhanh ở 20% đầu, sau đó ghìm phanh đầm chắc và dừng dứt điểm 100% tại đích.
* **Ứng dụng:** Trượt card, mở modal, thanh thước kẹp di chuyển, panel xuất hiện.
* **Thời lượng lý tưởng:** 14 – 18 frames (ở 30fps).

### 2. `mechanicalSnap` — Chuyển động cơ khí dứt khoát
* **Curve:** `Easing.bezier(0.2, 0, 0, 1)`.
* **Đặc tính:** Gia tốc bùng nổ, vào khớp lập tức như nam châm hít hay ngàm sắt sập lại.
* **Ứng dụng:** Công tắc gạt (toggle switch), chốt khóa két sắt bật vào ngàm, thanh RAM sập khe cắm.
* **Thời lượng lý tưởng:** 6 – 10 frames.

### 3. `impactDrop` — Rơi tự do & Va đập trọng lực
* **Curve:** `Easing.bezier(0.7, 0, 0.84, 0)` (Gravity Accelerate).
* **Đặc tính:** Khởi đầu chậm, tăng tốc nhanh dần đều và đạt vận tốc cực đại đúng vào frame va chạm.
* **Ứng dụng:** Búa gõ đập xuống đe, vật nặng rơi tự do, dấu mộc nện xuống giấy.
* **Thời lượng lý tưởng:** 8 – 12 frames.

---

## 3. Công thức Toán học Phản lực Va đập (Damped Recoil) không bị trôi

Khi vật thể va chạm (như búa gõ hoặc RAM sập khe), ta không dùng spring để nảy, mà dùng công thức suy hao hàm mũ có giới hạn thời gian rõ ràng:

```typescript
// Chỉ rung lắc trong đúng 12 frame sau va chạm, sau đó triệt tiêu về 0 tuyệt đối:
const impactRel = Math.max(0, frame - strikeFrame);
const recoil = (impactRel > 0 && impactRel < 12)
  ? Math.sin(impactRel * 0.9) * Math.exp(-impactRel * 0.45) * amplitude
  : 0;
```

* **Hệ số suy hao (`Math.exp(-impactRel * 0.45)`):** Dập tắt năng lượng sau đúng 2–3 nhịp nảy cực nhỏ, tạo cảm giác đanh thép như kim loại gõ vào kim loại.
* **Cắt dứt điểm (`impactRel < 12`):** Tuyệt đối không để số lẻ sau 12 frame, hình ảnh đứng im hoàn hảo.

---

## 4. Helper Chuẩn `smoothStep` trong Remotion

Viết trực tiếp vào code component hoặc `tokens.ts`:

```typescript
import { interpolate, Easing } from "remotion";

export const EASING_PRESETS = {
  appleEaseOut: Easing.bezier(0.16, 1, 0.3, 1),
  mechanicalSnap: Easing.bezier(0.2, 0, 0, 1),
  snappyOvershoot: Easing.bezier(0.34, 1.35, 0.64, 1),
  gravityDrop: Easing.bezier(0.7, 0, 0.84, 0),
};

export const smoothStep = (
  frame: number,
  startFrame: number,
  durationFrames: number,
  fromVal: number,
  toVal: number,
  easing = EASING_PRESETS.appleEaseOut
): number => {
  return interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [fromVal, toVal],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing,
    }
  );
};
```

---

## 5. Quy tắc Kiểm tra Độ Mượt (Quality Assurance Checklist)

1. [ ] **Không có micro-jitter:** Sau khi vật thể dừng, tọa độ x/y/scale không được phép tiếp tục biến thiên ở các frame tiếp theo.
2. [ ] **Không floaty:** Trượt vào trong 14–18 frame; không để animation kéo dài quá 30 frame (~1 giây) trừ khi là hiệu ứng xoay nền lặp vô hạn (ambient).
3. [ ] **Stagger 3 tầng:** Khung hình (Primary) vào frame 0, icon (Secondary) vào frame 3–5, nhãn chữ (Tertiary) vào frame 6–8.
4. [ ] **Màu sắc & Bóng đổ:** Giữ nguyên tông nền giấy kem `#F7F5EE`, tương phản cam đất `#C85228` và bóng đổ đa lớp mềm mại.
