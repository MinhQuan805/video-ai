# Thư Viện Chuyển Động Paper Reel (Paper Motion Engine)

Thư viện UI Components & Motion Graphics tiêu chuẩn cao dành cho video ngắn (9:16 Reels/TikTok/Shorts) phong cách **Editorial Paper & Minimalist Tech UI**, được dịch ngược và chuẩn hóa 100% từ 9 video mẫu trong thư mục `videos/paper/sample`.

---

## 1. Bản Chất Khoa Học: Tại Sao Video Mẫu Lại "Mượt Như Bơ" Còn AI Làm Bị "Đơ, Xấu & AI Slow"?

### ❌ 4 Sai Lầm Chí Mạng Khiến Video Của AI Bị "AI Slow & Đơ Cứng":
1. **Lạm dụng Spring lắc lư như thạch (`damping` quá thấp hoặc `mass` quá cao)**:
   - Khi AI dùng `mass: 1.0, damping: 10, stiffness: 100`, phần tử dao động qua lại tận 20-30 frame (~1 giây). Chuyển động bị dẻo như thạch rau câu, bồng bềnh và chậm chạp.
2. **Thiếu Khóa Độ Mờ Sớm (Early Opacity Saturation)**:
   - AI cho `opacity` tăng đều từ frame 0 đến 30. Kết quả là phần tử bị "mờ ảo ma", người xem không thấy rõ hình thù trong nửa đầu chuyển động.
   - **Chuẩn người thiết kế**: `opacity` phải đạt 1.0 ngay khi chuyển động mới đi được 60-65% (khoảng 6-8 frames). Nhờ đó vật thể hiện rõ sắc nét ngay từ đầu cú bật.
3. **Thiếu Diễn Hoạt Bậc Thang (Zero Staggering)**:
   - AI nhồi tất cả phần tử (Header, Tiêu đề, Thẻ, Icon, Nút) bung ra cùng một frame (`frame = 0`). Mắt người bị ngợp và cảm giác như một khối bê tông vô hồn.
   - **Chuẩn người thiết kế**: Mỗi phần tử cách nhau 2-4 frame (60-120ms) theo thứ tự ưu tiên nhận thức: `Eyebrow -> Tiêu đề dòng 1 -> Tiêu đề nghiêng -> Thẻ chính -> Các chi tiết bên trong`.
4. **Thiếu Phản Hồi Xúc Giác & Rung Chấn Vật Lý (Causal Interactions & Recoil)**:
   - Khi con dấu đóng xuống hay con trỏ chuột click vào, AI chỉ animate riêng con dấu/chuột.
   - Trong video mẫu: Khi con dấu "Duyệt" nện xuống, tờ giấy bên dưới bị **rung chấn giật lùi (Impact Recoil)** trong 8 frame; khi chuột click vào thư mục, thư mục hơi co lại (`scale: 0.94`) rồi bung nảy (`scale: 1.04 -> 1.0`).

---

## 2. Bộ Thông Số Lò Xo Chuẩn Vàng (Golden Spring Presets)

```ts
export const SPRING_PRESETS = {
  // Xuất hiện dứt khoát chuẩn Apple Editorial (Dành cho Card, Tiêu đề, Khung viền)
  // Critically Damped: Đạt 99% đích sau 10 frames (~0.33s), dừng chắc như đinh đóng cột!
  snappy: { mass: 0.7, damping: 22, stiffness: 220, overshootClamping: false },

  // Nảy đàn hồi xúc giác (Dành cho Badge, Icon, Pill, Button Click)
  // Bật nảy 4% rồi hít chặt vào vị trí trong 8-10 frames
  pop: { mass: 0.45, damping: 15, stiffness: 260, overshootClamping: false },

  // Nện dấu đóng cộp (Dành cho Con dấu Rubber Stamp, Sticker va đập mạnh)
  slam: { mass: 0.8, damping: 16, stiffness: 320, overshootClamping: false },

  // Trượt êm ái (Dành cho Chuột di chuyển, thanh trượt playhead)
  glide: { mass: 0.8, damping: 20, stiffness: 180, overshootClamping: false },

  // Con lắc dao động tắt dần (Dành cho Thẻ nhãn treo dây)
  pendulum: { mass: 1.0, damping: 8, stiffness: 65, overshootClamping: false },
};
```

---

## 3. Toàn Bộ 22 Components Đã Đóng Gói Chuẩn 100%

| Component | Mục Đích Sử Dụng | Video Mẫu Đối Ứng |
| :--- | :--- | :--- |
| `<PaperCanvas>` | Nền giấy mỹ thuật ấm (`#FAF8F5`) kèm họa tiết thớ giấy dệt | Toàn bộ Video 1 - 9 |
| `<PaperEyebrow>` | Tag danh mục / bước (`01 AI Agent`) + đường kẻ hairline | Video 5, 6, 7, 8, 9 |
| `<EditorialHeadline>` | Tiêu đề 2 dòng: Chữ đứng Serif than + Chữ nghiêng Terracotta | Video 1, 5, 6, 7, 9 |
| `<AppTile>` | Bo góc Squircle Apple + 17 thương hiệu (Claude, Google, Gmail, Notion...) + viền active + sticker | Video 2, 4, 5, 6, 7, 8, 9 |
| `<PhoneMockup>` | Khung iPhone siêu thực (Dynamic Island, Bezel mỏng, presets ChatGPT / CalTracker) | Video 3, 5, 8 |
| `<BrowserWindow>` | Cửa sổ trình duyệt Desktop + thanh URL `localhost:8081` chứa khung Phone / Web | Video 8 |
| `<HubAndSpoke>` | Mạng lưới trung tâm & vệ tinh: Hub Robot / OmniRoute + dây nối SVG tự vẽ + hạt năng lượng | Video 6, 7, 9 |
| `<ApprovalStamp>` | Con dấu cao su đỏ Terracotta nghiêng góc nện cộp xuống tài liệu kèm rung chấn Recoil | Video 6 |
| `<VideoEditorTimeline>` | Trình dựng NLE: Màn hình preview dọc + 3 track video/audio sóng vàng + Playhead lướt | Video 5, 4 |
| `<ClaudeChatBox>` | Hộp nhập lệnh Claude / ChatGPT: Chip link GitHub + con trỏ nhấp nháy + nút tròn cam | Video 5, 3 |
| `<VerticalPipeline>` | Lộ trình đường ray dọc (Plan -> Build -> Test -> Ship) + sóng ping tỏa tròn mục tiêu | Video 9, 7 |
| `<TaskObserverEye>` | Con mắt quan sát tác vụ ngầm chớp mắt/liếc + danh sách lệnh Terminal + thẻ `✓ gu của bạn` | Video 7 |
| `<TradingChartCard>` | Biểu đồ nến Nhật + điểm ngắm Target Reticle Entry + nhãn EXAMPLE + nút Buy | Video 1 |
| `<ManilaFolder>` | Bìa hồ sơ Kraft Manila vàng nâu + nhãn dán sticker "FILE: YOU" gạch chân đỏ | Video 3 |
| `<CodeEditorWindow>` | Cửa sổ code HyperFrames: Cây thư mục bên trái, số dòng code bên phải, nhãn "MY REEL" | Video 2 |
| `<MacFinder>` | Cửa sổ Finder macOS + thư mục xanh + tương tác con trỏ chuột click | Video 6 |
| `<MacTerminal>` | Terminal than tối (`~ claude`), gõ typewriter, checkmark xanh | Video 7, 8 |
| `<SearchBar>` | Thanh tìm kiếm bo tròn pill, cursor nhấp nháy, gõ phím mượt | Video 5 |
| `<SegmentedBar>` | Thanh vạch phân đoạn (ngang hoặc dọc như token stack) | Video 1, 5, 9 |
| `<BigMetric>` | Con số lớn (`~5,900`, `9,975`, `100%`) tự động nhảy số + nhãn xu hướng | Video 1, 7, 9 |
| `<PromptPillCard>` | Thẻ prompt viên thuốc bo tròn, badge số cam glow | Video 3 |
| `<KineticSubtitles>` | Phụ đề 3-4 chữ dưới màn hình, tự động highlight từ cam Terracotta theo lời thoại | Toàn bộ Video 1 - 9 |
| `<MouseCursor>` | Con trỏ chuột lướt theo đường cong Bézier tự nhiên + click squash + sóng ripple | Video 6, 8 |

---

## 4. Cách Sử Dụng Trong Dự Án Video Mới

```tsx
import React from "react";
import {
  PaperCanvas,
  PaperEyebrow,
  EditorialHeadline,
  AppTile,
  VideoEditorTimeline,
  HubAndSpoke,
  ApprovalStamp,
  KineticSubtitles,
} from "src/paper-engine";

export const MyScene: React.FC = () => {
  return (
    <PaperCanvas>
      <div style={{ display: "flex", flexDirection: "column", padding: "120px 60px", height: "100%" }}>
        {/* Bước 1: Header */}
        <PaperEyebrow stepNumber={1} label="AI Agent" delay={0} />

        {/* Bước 2: Tiêu đề báo chí */}
        <EditorialHeadline
          markdownText="Edit video *bằng AI*"
          fontSize={68}
          delay={2}
          style={{ marginBottom: 60 }}
        />

        {/* Bước 3: Component trung tâm */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <VideoEditorTimeline width={480} height={190} delay={4} />
        </div>

        {/* Bước 4: Phụ đề chạy theo giọng nói */}
        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "edit" },
              { text: "video" },
              { text: "bằng", isHighlighted: true },
              { text: "AI", isHighlighted: true },
            ]}
            delay={4}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};
```

---

## 5. Preview & Kiểm Tra Trực Quan
Để xem toàn bộ 10 cảnh trình diễn của thư viện, xem composition `paper-showcase`:
```bash
# Xem trực tiếp trên Remotion Studio
npx remotion preview

# Hoặc xuất ảnh review nhanh một khung hình (ví dụ frame 100)
npx remotion still paper-showcase output/review.png --frame 100
```
