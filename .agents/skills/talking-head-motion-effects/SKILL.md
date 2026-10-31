---
name: talking-head-motion-effects
description: Master system for professional talking-head and facecam video effects in Remotion and Python. Unifies Facecammaxxing and Claude Video Effects into a single 48-effect taxonomy for creator vertical videos (9:16 portrait). Covers person cutout matting, YuNet face tracking, typography behind head, 3D GLB props, floating glass widgets, and editorial proof cards without covering the speaker's face.
---

# Talking-Head Motion Effects (Unified System)

Hệ thống hiệu ứng chuyên nghiệp chuẩn đạo diễn dành riêng cho video **Talking-Head / Facecam / Selfie** định dạng dọc (1080x1920 @ 30fps). Hợp nhất toàn diện từ **Facecammaxxing** (Remotion + Three.js + 3D GLB Props) và **Claude Video Effects** (45 hiệu ứng sáng tạo).

---

## 1. Kiến trúc phân tầng 6 lớp (6-Layer Depth Stack)

Mọi hiệu ứng talking-head tuân thủ phân lớp chiều sâu frame-deterministic trong Remotion:

```
[Layer 6: HUD & Camera]        -> Lean-in, Locked-on face follow, REC timecode, LUT Grade
[Layer 5: Foreground & Props]  -> 3D GLB Props, Glass Widgets dưới cằm, Over-the-shoulder cards, Toggles
[Layer 4: Speaker (You)]       -> `person.webm` (video đã tách nền alpha qua matting)
[Layer 3: Sticker & Halo]      -> Viền sticker trắng, outline phát sáng, silhouette khi freeze-frame
[Layer 2: Behind Head]         -> Text-behind, Backdrop-word, Vòng xoay Orbit, Cột số Kallaway Skyline
[Layer 1: Room / Background]   -> Phông nền phòng, giấy kẻ caro, spotlight tối nền, mờ sâu (bokeh blur)
```

> [!IMPORTANT]
> **Nguyên tắc bất di bất dịch của Talking-Head**:
> 1. **Tuyệt đối không che mặt người nói**: Mọi vật thể, thẻ card, chữ đều nằm ở Layer 2 (sau đầu), Layer 5 (dưới cằm / hai bên vai) hoặc di chuyển tránh vùng mặt.
> 2. **Vùng an toàn UI TikTok/Reels**: Không đặt nội dung quan trọng ở Top 180px (thanh tìm kiếm/live) và Bottom 360px (caption, username, âm thanh).
> 3. **Nhịp điệu đạo diễn (Beat Pacing)**: Mỗi câu nói quan trọng chỉ mang **1 hiệu ứng duy nhất**. Hiệu ứng xuất hiện trước từ khóa trọng tâm khoảng **2 frames**. Thời lượng lý tưởng mỗi hiệu ứng từ **1.5s đến 3.5s**.

---

## 2. Bảng phân loại 48 hiệu ứng hợp nhất (Unified Taxonomy)

Các hiệu ứng trùng lặp giữa hai thư viện đã được gộp chung thành một quy chuẩn duy nhất:

### Nhóm A: Camera, Ánh sáng & Tiêu điểm (Camera, Light & Focus)
1. **`lean-in`**: Camera zoom nhanh dứt khoát vào mặt (1.35x - 1.5x) kèm motion blur nhẹ khi nhấn mạnh luận điểm.
2. **`slow-push`**: Camera đẩy từ từ, êm ái tiến gần khuôn mặt trong khi hậu cảnh mờ dần (bokeh depth of field).
3. **`locked-on`**: Khung ngắm tracking bám theo khuôn mặt khi người nói chuyển động, khóa góc nhìn.
4. **`spotlight`**: Toàn bộ hậu cảnh tối lại (dim lights), ánh đèn rọi tập trung vào người nói, có chữ dạ quang phát sáng sau đầu.
5. **`glitter-spotlight`**: Biến thể cao cấp của spotlight với tia sáng vàng kim tỏa ra sau đầu và hiệu ứng lấp lánh (sparkles).
6. **`freeze-frame` / `pause-point`**: Đóng băng khung hình, nền chuyển xám, viền sticker trắng nổi quanh người kèm nhãn ghi chú hoặc mũi tên vẽ tay.
7. **`rabbit-hole`**: Hiệu ứng đường hầm đệ quy xoay tròn hút thị giác khi nói về việc chìm sâu vào nghiên cứu.

### Nhóm B: Chữ & Tuyên bố sau đầu (Behind-the-Head Typography)
8. **`text-behind` / `backdrop-word`**: Chữ in đậm khổ lớn khổng lồ trồi lên từ phía sau đầu người nói, font đậm (Anton/Space Mono/Cinzel).
9. **`split-headline`**: Thẻ tiêu đề trượt xuống từ mép trên, đẩy video người nói xuống nửa dưới khung hình.
10. **`headline-wall`**: Hàng loạt dòng tít, bình luận hoặc bài đăng xếp chồng lớp lớp sau đầu, tổng kết con số ấn tượng ở phía trước.
11. **`led-sign`**: Bảng đèn LED ma trận nhấp nháy phát sáng gõ từng chữ phía sau lưng trong bóng tối.
12. **`red-collage`**: Chuyển người nói sang đen trắng (B&W), chữ đỏ rực cực lớn va đập phía sau kèm 3 vạch gạch ngang.
13. **`pastel-word`**: Phông nền màu phấn dịu mắt, chữ lớn sau đầu, thẻ profile bay vào với nút Follow.
14. **`cover-star`**: Biến người nói thành bìa tạp chí danh tiếng (Vogue/Forbes), tên tạp chí nằm sau đầu, tít bài hai bên vai.
15. **`kinetic-caption`**: Phụ đề động từng từ (karaoke highlight), các từ ở đỉnh đầu tự động luồn ra sau gáy.

### Nhóm C: Giao diện, Thẻ Widget & Bằng chứng (UI, Widgets & Proof)
16. **`glass-widgets`**: Bộ 3 thẻ kính mờ (frosted glass) phát sáng nhẹ bay lơ lửng quanh vai và cằm, hiển thị avatar, số liệu và status.
17. **`liquid-glass-graph` / `bento`**: Bảng kính mờ dưới cằm với đồ thị xanh lá leo dốc và bộ đếm số nhảy số liên tục.
18. **`apple-toggles`**: Thẻ cài đặt phong cách iOS đặt dưới cằm hoặc trên đầu, các cần gạt xanh tự động bật lần lượt kèm tiếng click.
19. **`checklist` / `todo`**: Danh sách việc cần làm (task list) nằm bên vai, các ô tròn xoay nhẹ rồi đánh dấu tick xanh lần lượt.
20. **`messages`**: Các bong bóng tin nhắn iMessage kính mờ nảy lên liên tiếp từ góc dưới và xếp chồng ngay ngắn.
21. **`comment-box`**: Thanh nhập bình luận Instagram hoặc YouTube tự động gõ chữ và bấm gửi.
22. **`the-bill` / `receipt`**: Giấy in hóa đơn / sớ chỉ thị dài tuôn ra như máy in nhiệt gắn trên tường sau đầu.
23. **`tap` / `follow-button`**: Nút bấm Follow tròn bật lên bên vai, trỏ chuột ấn vào và đổi trạng thái sang "Following".

### Nhóm D: Vòng xoay thẻ, Media & Mạng xã hội (Card Rings & Feeds)
24. **`orbit`**: Vòng tròn các video ngắn/ảnh xoay quanh đầu: bay phía trước ở dưới cằm và luồn ra sau ở đỉnh đầu (Three.js 3D depth).
25. **`carousel-spin`**: Băng chuyền 3D xoay tít các bài đăng vòng quanh người rồi từ từ hãm phanh tại bài viết tiêu biểu.
26. **`phone-fan`**: Bộ 3 hoặc 5 chiếc smartphone xòe ra như nan quạt dưới cằm hiển thị các sản phẩm/giao diện khác nhau.
27. **`profile-wall`**: Toàn bộ lưới 9 ô video trang cá nhân dàn thành bức tường phía sau, bộ đếm follower tăng vọt.
28. **`place-in-grid`**: Video người nói tự thu nhỏ vào ô trung tâm của lưới 3x3 trên nền kính mờ, 8 ô xung quanh nảy ra view count.
29. **`window-cards`**: Các cửa sổ ứng dụng phong cách retro desktop trôi nổi, con trỏ chuột bấm chọn từng cửa sổ.
30. **`lineup-fan`**: Các thẻ bài đánh số xòe vòng cung trên đỉnh đầu.
31. **`broll-split`**: Màn hình chia đôi: Nửa trên phát B-roll minh họa có gắn tem nhãn, nửa dưới là người nói.

### Nhóm E: Vật thể 3D & Tương tác vật lý (3D Props & Physical Assets)
32. **`prop-3d` (Trophy)**: Chiếc cúp vô địch mạ vàng 3D xoay chậm bên vai phản chiếu ánh sáng phòng.
33. **`prop-3d` (Clock)**: Chiếc đồng hồ cổ kim trôi lướt nhanh quanh các mốc giờ minh họa cho thời gian tiết kiệm được.
34. **`prop-3d` (Coin)**: Đồng xu vàng xoay lật 3D rơi xuống nảy bật đàn hồi.
35. **`prop-3d` (Phone)**: Điện thoại 3D nghiêng góc perspective chiếu màn hình ứng dụng thật.
36. **`prop-3d` (Check & X)**: Huy hiệu dấu tick xanh và dấu X đỏ nổi khối 3D đập mạnh vào vị trí khẳng định / phủ định.
37. **`reject-stamp`**: Con dấu mực đỏ khổng lồ giáng sập xuống màn hình đóng dấu `TỪ CHỐI` hoặc `DUYỆT`.
38. **`shortcut-rain`**: Các phím bấm bàn phím máy tính cơ học rơi lả tả như mưa phía sau lưng.

### Nhóm F: Bố cục biên tập & Màu sắc điện ảnh (Editorial & Color Grade)
39. **`kallaway-split`**: Video người nói thu vào một thẻ nằm trên nền giấy lưới kỹ thuật; cột số liệu tăng trưởng mọc vút lên cao sau đầu như đường chân trời thành phố.
40. **`over-the-shoulder`**: Camera lia góc chéo qua vai trái rồi vai phải, mở ra các thẻ chứng minh Trước (Before) và Sau (After).
41. **`color-grade-swipe`**: Thanh trượt so sánh quét ngang qua người nói: Nửa bên trái ảnh gốc nhạt màu (LOG/Flat), nửa bên phải lên màu điện ảnh rực rỡ.
42. **`timeline`**: Tone màu phòng dựng tối có đường timeline Premiere/CapCut chạy dưới đáy và đèn đỏ REC nhấp nháy.
43. **`moody`**: Phủ màu phim điện ảnh (Teal & Orange, B&W high-contrast, Warm Gold).
44. **`dot-reveal`**: Khung hình hình thành từ ma trận các điểm chấm LED phát sáng rồi ghép lại thành người thật.
45. **`tier-list`**: Bảng xếp hạng S-A-B-C-D trượt vào dưới cằm, một thẻ giải pháp bay thẳng vào bậc S-Tier.
46. **`match-cut`**: Cắt nhanh các bài báo trên cùng một từ khóa nằm trong khung đỏ sau đầu.
47. **`scribble`**: Các nét vẽ nguệch ngoạc bằng phấn/bút dạ tự vẽ sinh động xung quanh cử chỉ tay người nói.
48. **`bottom-fade`**: Phần chân của video người nói mờ dần vào nền đen hoặc nền giấy, tạo cảm giác lơ lửng liền mạch.

---

## 3. Kho tài nguyên tích hợp sẵn trong project

- **Mô hình 3D GLB**: Đặt tại [`public/models/talking-head/`](file:///d:/Work/Project%20Work/video-ai/public/models/talking-head/):
  - `trophy.glb`, `clock.glb`, `coin.glb`, `phone.glb`, `check.glb`, `x.glb`.
- **Linh kiện Remotion**: Đặt tại [`src/motion-library/talking-head/`](file:///d:/Work/Project%20Work/video-ai/src/motion-library/talking-head/):
  - `CardRing.tsx` (Vòng xoay bài viết Orbit/Carousel), `GlassWidgets.tsx` (Bảng kính mờ), `Prop3D.tsx` (Render GLB Three.js), `kallaway.tsx` (Biểu đồ skyline), `reels.tsx` (Lưới feed).
- **Công cụ Python AI Tracking**: Đặt tại [`pipeline/talking-head/`](file:///d:/Work/Project%20Work/video-ai/pipeline/talking-head/):
  - `track.py` (YuNet face tracking & alpha matting tách nền).
  - `fx.py` (Script dựng 45 hiệu ứng tự động qua OpenCV/PIL).
  - `models/yunet.onnx`, `models/selfie_segmenter.tflite`.

---

## 4. Hướng dẫn áp dụng vào video Remotion

Khi dựng video có nhân vật người nói (`UserTalkingHead`):
```tsx
import { CardRing, GlassWidgets, Prop3D } from '../../../../motion-library/talking-head';

// 1. Chữ sau đầu (Layer 2)
<div style={{ position: 'absolute', zIndex: 2 }}>
  <TextBehindHead text="AI SKILLS" frame={frame} />
</div>

// 2. Người nói (Layer 4)
<div style={{ position: 'absolute', zIndex: 4 }}>
  <OffthreadVideo src={staticFile('videos/paper/29-10-26/user_nobg.webm')} />
</div>

// 3. Đồ họa kính mờ hoặc 3D Prop phía trước (Layer 5)
<div style={{ position: 'absolute', zIndex: 5, bottom: 380 }}>
  <GlassWidgets data={metrics} frame={frame} />
</div>
```
