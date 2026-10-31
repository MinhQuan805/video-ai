# Áp dụng và hoàn thiện bộ skill V2

Ngày: 28/10/2026. Người dùng đã yêu cầu “cập nhật và hoàn thiện toàn bộ skill”. Đây là quyền áp dụng skill;
không phải duyệt render một video.

## Đã thực hiện

- Kiểm hash toàn bộ 19 file đích/draft của proposal V2: không có conflict với baseline.
- `git apply --check --whitespace=error` đạt, sau đó áp patch thành công.
- Kích hoạt hai skill mới physical-interaction-direction và character-and-object-design với các reference chi tiết.
- Tích hợp sáu skill hiện có và production document; rà tiếp năm skill còn lại để đồng bộ toàn bộ 13 entrypoint.
- Hoàn thiện các điểm chưa nhất quán: linear/eased/spring motion tùy cơ chế, configurable fps, source/edit duration,
  ASR uncertainty, card hợp lệ, style paper continuation, không render grid trước duyệt, sourcing không hỏi quá sớm.
- Screen demo theo public capture/actual props, asset processing theo chất liệu, collage jitter tùy chọn,
  ranking dùng cùng contact/timing/approval contract.
- Tạo [bản đồ vận hành](../../motion-skill-system.md) và giữ draft/patch V2 làm snapshot lịch sử.

## Kiểm tra

Kết quả cuối ghi trong `application-manifest.json`: validator từng skill, liên kết nội bộ, Markdown fences,
và hash các file đã tích hợp. Validator chỉ xác nhận cấu trúc; không chứng minh chất lượng pixel hoặc tự động hóa.
Các file scene/package đang sửa dở từ trước được so hash trước/sau để bảo toàn.

## Giới hạn thực tế

Lần cập nhật chỉ sửa skill/tài liệu, không cài dependency, mở media hạn chế hoặc render video.
Các tên API/CLI/registry tương lai trong reference vẫn được ghi rõ chưa phải runtime có sẵn.
Chưa có pilot để đo 90–100% công việc thủ công hoặc xem chất lượng motion thực. Khi có raw tiếp theo,
AI phải kiểm capability, làm motion cần thiết và QA theo đúng quyền/approval của project.

## Tiếp tục sử dụng

Skill entrypoint nằm trong `.agents/skills/`; master pipeline route tới các skill mới nên có thể dùng ngay
khi làm việc trong repo. Nguồn chuẩn đang dùng là live skill và production document, không phải chép lại draft.
Không áp lại `integration.patch`: baseline cũ đã thay đổi sau lần áp dụng và các cải tiến bổ sung.
