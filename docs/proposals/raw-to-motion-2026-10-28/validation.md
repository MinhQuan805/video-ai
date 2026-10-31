# Kết quả kiểm tra hồ sơ đề xuất V2

Ngày 28/10/2026. Phạm vi: tài liệu và draft skill, không có input raw/video được xử lý.

| Hạng mục | Kết quả | Bằng chứng/phạm vi |
| --- | --- | --- |
| Skill frontmatter và cấu trúc | PASS | `skill-creator/scripts/quick_validate.py`: 8/8 skill hợp lệ |
| Markdown code fence | PASS | Các file Markdown tại lúc chạy kiểm tra không có fence chưa đóng |
| Liên kết nội bộ | PASS | 79 liên kết trong draft/proposal được kiểm; tính theo vị trí đích khi cần |
| Baseline gốc | PASS | SHA-256 của 6 skill đang dùng và production document khớp baseline trước tạo draft |
| Manifest draft | PASS | 19 file đích: 8 skill entrypoint, 10 reference và 1 production document |
| Patch áp dụng thử | PASS | `git apply --check --whitespace=error` kết thúc exit 0; không áp patch |
| Quy tắc mâu thuẫn đã nhận diện | Đã sửa trong draft | Card hợp lệ, hold/cut hợp lệ, không quota mascot, bỏ render-grid trước duyệt và helper episode cố định |
| Nguồn nghiên cứu | Đã ghi | Link chính thức và giới hạn đọc nguồn tại research.md |
| Decision scenarios | Đã đặc tả | 26 tình huống trong acceptance-scenarios.md; đây chưa phải chạy forward-test độc lập |
| Runtime mới | CHƯA TRIỂN KHAI | Chỉ có kiến trúc/interfaces và điều kiện nghiệm thu trong runtime-plan.md |
| Hình/animation/audio thực | CHƯA KIỂM | Không đọc media, không render; chưa có pilot được duyệt |
| 90–100% tự động, retention | CHƯA ĐO | Không có baseline hoặc analytics để khẳng định |

Validator ban đầu gặp lỗi đọc UTF-8 bằng encoding mặc định Windows. Đã chạy lại bằng `python -X utf8`,
không sửa validator và không cài dependency. Kết quả bảng trên lấy từ lần chạy thành công.

## Khi áp dụng sau duyệt

Kiểm tra lại baseline trong `baseline.json`. Nếu file đang dùng đổi kể từ lúc tạo proposal, rebase từng hunk;
không chép đè bản nháp lên thay đổi mới. Chỉ áp các file đích trong `manifest.json` sau khi user duyệt proposal V2.
Các scene và package đang sửa dở không nằm trong patch. Không commit/push, cài dependency hay render như tác dụng phụ.

Các kiểm tra văn bản không chứng minh quyết định mỹ thuật luôn đúng. Trước khi công bố năng lực tự động hóa,
thực hiện pilot lần lượt theo runtime plan, rồi kiểm visual/temporal trên output được duyệt.

## Bổ sung V2

Đã rà source và script/timing/scenes của đúng project paper tham chiếu. Đã thêm reference về vật lý,
đồng bộ motion và diễn xuất nhân vật; không sửa code episode. Graphic beat cần primary action,
reuse motion có sẵn và giữ paper profile. Các cơ chế/rig mới vẫn là đặc tả chưa triển khai.
