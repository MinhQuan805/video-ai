---
name: character-and-object-design
description: >-
  Design readable, consistent code-drawn objects and characters with layered parts, pivots, and
  interaction anchors for video metaphors. Use only when a scene benefits from a custom object or
  creature; simple cards, typography, diagrams, and speaker footage remain valid alternatives.
---

# Thiết kế vật thể có thể diễn hoạt

Mục đích là tạo một hình dễ nhận và làm được hành động phục vụ câu nói. Không tạo mascot mặc định cho chủ đề AI.
Trước khi dùng, thực hiện lựa chọn visual trong
[creative-video-direction](../creative-video-direction/SKILL.md).

## Quyết định trước khi vẽ

- Viết vai trò trong một dòng: vật này thể hiện điều gì và làm hành động nào?
- Nếu card, chữ, biểu đồ, ảnh thật hoặc mặt người giải thích tốt hơn, chọn chúng.
- Với hình tự dựng: chọn silhouette và một vài dấu hiệu nhận dạng quan trọng; bỏ chi tiết chỉ để trang trí.
- Dùng cùng art direction: nét, palette, texture, bóng, góc nhìn, mức chi tiết và phong cách chuyển động.
- Đối chiếu lịch sử thiết kế qua reference design-memory của creative-video-direction. Đổi màu không đủ tạo mới.
- Nếu hình chưa dễ nhận, đơn giản hóa silhouette hoặc đổi cách minh họa; không chữa bằng một nhãn dài.

## Hợp đồng vật thể

Chỉ dựng các phần cần chuyển động: nhóm body/head/jaw/limb hoặc base/lid/handle; không rig thừa.
Định nghĩa local coordinate system, bounds, pivot, anchor tiếp xúc, lớp trước/sau và deformation cho phép.
Giữ một thiết kế suốt video. Thay expression/pose theo ý; không vẽ lại đầu/mắt/nét viền khác nhau ở từng cảnh.
Với card, hợp đồng tương đương là shell/content/label/socket, layout và state.

Đọc [rig-and-material.md](references/rig-and-material.md) khi dựng SVG/layer, jaw, contact, giấy hoặc cao su.
Đọc [actor-performance.md](references/actor-performance.md) để chủ động đề xuất nhân vật mới, lập key poses,
thiết kế intention/weight-shift/grip và nối nhân vật với card bằng contact thực. Khi có vai diễn hợp ý và có thể
dựng rõ, thiết kế nhân vật để diễn thay vì chỉ ghi “có thể dùng mascot” trong brief. Giữ paper profile đã chọn
cho hướng tiếp nối và phát triển silhouette mới; không tự dùng lại robot cũ làm mặc định.
Dùng [physical-interaction-direction](../physical-interaction-direction/SKILL.md) để biên đạo hành động.

## Công cụ và phạm vi

Ưu tiên React/SVG/Canvas và dependency đã có. Font Awesome là mặc định cho icon tiện ích, không bắt buộc
dùng icon làm toàn bộ nhân vật có khớp. Logo thương hiệu dùng nguồn vector chính thức đã có.
Chỉ dùng ảnh/cutout, Lottie hoặc Rive khi nguồn hợp lệ, đồng bộ frame và hợp art direction.
Không tự gọi dịch vụ tạo ảnh trả phí hoặc gửi raw đi để tìm hình. Giữ tool chung trong pipeline, code cảnh riêng
trong project theo convention repo đã xác nhận.

## QA và tái dùng

Đánh giá silhouette ở kích thước hiển thị nhỏ, pose cực trị, khoảng trống giữa bộ phận, mặt hướng target,
stroke/shadow và text. Ghi static geometry đã kiểm; pixel QA còn pending trước duyệt render.
Lưu thiết kế mới làm `candidate` kèm project/scene và hạn chế. Chỉ promote cơ chế đã kiểm sang thư viện chung;
không biến tạo hình của một video thành nhân vật mặc định ở mọi video sau.
