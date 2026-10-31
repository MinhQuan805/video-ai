# Motion Graphic Library (`src/motion-library`)

Thư viện các component Motion Graphic & Vật thể vật lý (Editorial Paper System) có thể tái sử dụng cho toàn bộ dự án video.

---

## Cấu trúc thư mục

```
src/motion-library/
├── core/
│   └── tokens.ts              # Bảng màu COLORS, thông số SPRINGS, font FONTS & hàm vật lý dampedOscillation, continuousFloat
├── paper/
│   ├── PaperBackground.tsx    # Nền giấy hạt grain kèm 4 góc thước định vị (Drafting Brackets)
│   ├── PaperCard.tsx          # Thẻ giấy tactile viền sắc nét, bóng mờ tự nhiên
│   ├── BinderClip.tsx         # Kẹp bướm kim loại (Binder Clip)
│   └── WaxSealBadge.tsx       # Con dấu sáp / Huy hiệu niêm phong (Wax Seal Badge)
├── inputs/
│   ├── MouseCursor.tsx        # Con trỏ chuột vector OS chuẩn xác với hiệu ứng click/grab
│   ├── WritingPencil.tsx      # Cây bút chì vẽ dòng ngòi chì tracking sub-pixel
│   ├── ClaudeChatBox.tsx      # Khung chat Claude AI chuẩn xác (thẻ file, switch chat/cowork, nút gửi)
│   └── DraftingPaperSheet.tsx # Tờ giấy bản thảo với tiêu đề file, kẹp bướm và các dòng kẻ tiến độ
├── mechanics/
│   ├── PromptVaultChest.tsx   # Rương báu đóng/mở nắp, ổ khóa nảy, vòng xung lực & phình to
│   ├── ReceiptPrinterRoller.tsx # Trục lăn máy in bánh răng xoay ngược chiều
│   ├── DraftingRulerGauge.tsx # Thước đo kỹ thuật số với vạch khắc và kim trượt theo tiến độ
│   ├── ModularDockingChassis.tsx # Khung gắn module với thanh ray thủy lực kẹp khóa 3 cartridge
│   ├── StudioMixerConsole.tsx # Bàn mixer studio: núm vặn xoay, cần gạt fader, công tắc gạt
│   ├── PneumaticHopper.tsx    # Phễu nén khí 2 đầu vào (token) -> dập tạo kết quả đầu ra
│   ├── SteeringHelm.tsx       # Bánh lái tàu 8 nan hoa bằng đồng với la bàn chỉ hướng
│   ├── ClockworkGears.tsx     # Cặp bánh răng ăn khớp quay đồng bộ ngược chiều
│   └── IndustrialPowerSwitch.tsx # Cầu dao công nghiệp gạt tay đỏ với đèn LED báo trạng thái
└── index.ts                   # Export tập trung toàn bộ thư viện
```

---

## Cách sử dụng

```tsx
import {
  PromptVaultChest,
  ClaudeChatBox,
  WritingPencil,
  DraftingPaperSheet,
  StudioMixerConsole,
  IndustrialPowerSwitch,
  MouseCursor,
  COLORS,
  FONTS,
  SPRINGS,
} from '../../../../motion-library';
```
