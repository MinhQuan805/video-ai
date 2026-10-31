# Bài Học Sản Xuất Video 2026-10-29 (Prompt to Skill)

## 1. Tối Giản Chữ & Tăng Cường Cơ Cấu Vật Lý (Physical Machinery Over Text)
- **Vấn đề ban đầu**: Dùng quá nhiều card văn bản giải thích khiến video nặng nề, giống slide thuyết trình và lặp lại hình ảnh giữa các phân cảnh.
- **Giải pháp đã kiểm chứng**: Thay thế toàn bộ card chữ bằng các cơ cấu vật lý và biểu tượng động có sức sống:
  1. *Rương bảo vật & cuộn sớ bay parabol*: Thay cho card danh sách bookmark.
  2. *Trục bánh răng tuôn dải sớ dài ngoằng ⚙️ kèm thước đo cm*: Thay cho card danh sách checklist câu lệnh.
  3. *Cần cẩu cơ khí gắp thả note vào ô chat*: Thay cho card giải thích copy-paste.
  4. *Khối Rack 3 khe cắm module từ tính*: Thay cho các ngăn hồ sơ bằng chữ.
  5. *Khối lăng trụ rơi đập nảy bàn cân*: Thay cho các thẻ nguyên liệu văn bản.
  6. *Bi input lăn qua đường ray dốc vào lò phản ứng*: Thay cho quy trình 3 bước chữ.
  7. *Vô lăng la bàn kéo động cơ bánh răng*: Trực quan hóa phân định Prompt vs Skill.
  8. *Trạm đúc Skill (Skill Forge)*: Cần gạt cơ học gạt xuống kích hoạt buồng quay bánh răng, phóng thẻ bài vàng `YOUR_FIRST_SKILL.MD` kèm mộc dập nổi.

## 2. Phân Định Rõ Vai Trò Title vs Caption
- **Nguyên tắc**: Title tuyệt đối không được lặp lại câu từ trong lời đọc (caption/voiceover).
- Title phải giữ vai trò biên tập (Editorial Chapter Marker): ngắn gọn, định hướng ý niệm cho người xem, sử dụng `EyebrowHeader` với step number + category pill + tiêu đề lớn Fraunces 64-72px.
- Caption giữ vai trò đồng bộ khẩu ngữ: chữ nổi floating 54px bold Inter (không đóng khung hộp trắng), highlight từ đang phát âm màu cam đất `#C6532A`.

## 3. Bố Cục Tầng & Chuyển Động Screen Mặt
- Hero Motion Graphic hoạt động ở nửa trên (y: 0 - 940px).
- Nửa dưới dành cho `UserTalkingHead` (bottom: 0, scale: 0.60, center).
- Dynamic Caption Placement: Khi có mặt người nói, caption nổi ở `top: 960px`; khi cảnh chuyển sang toàn màn hình motion mechanics, caption hạ xuống `top: 1620px` an toàn vùng bấm mobile.
