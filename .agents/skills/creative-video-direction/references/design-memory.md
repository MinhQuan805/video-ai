# Bộ nhớ thiết kế và tái dùng có bằng chứng

## 1. Lịch sử phải có thật

Mỗi video ghi `learning.md` và design record có project/version, scene IDs, ý nghĩa, hình, hành động, token,
trạng thái kiểm chứng, source/code hashes và đường dẫn output đã duyệt nếu có. Không mở lại video/media cũ
đang bị AGENTS.md hạn chế chỉ để điền lịch sử. Dùng metadata được phép; thiếu lịch sử thì ghi `history-incomplete`.

Registry dùng chung dự kiến: `pipeline/creative/design-history.jsonl`; catalog cơ chế dự kiến:
`pipeline/creative/component-catalog.json`. Chúng là artifact cần triển khai, không phải file đã tồn tại.
Không tạo lịch sử giả. Một run mới thêm record bất biến; record sửa/lỗi liên kết record trước, không ghi đè đánh giá cũ.

## 2. Fingerprint có ý nghĩa

Ghi trường ngắn: concept/relationship, silhouette family, proportions, medium, layout, motion choreography,
palette/typography, role, last-used project và reuse constraints. Thumbnail chỉ tham chiếu ảnh đã được tạo hợp lệ.
Không bắt mọi scene phải có silhouette/character; card-only có fingerprint về hierarchy, layout và hành động.

Khi lập brief, xem metadata các video gần đây trong registry và những record cùng concept nếu có. Đây là
tra cứu dữ liệu, không phải dựng nhiều video cùng lúc. Không quét toàn kho media hoặc đọc words/sentences để tìm khác biệt.

## 3. Quyết định novelty

- Cùng tokens trong một video tạo consistency; không xem đó là lặp xấu.
- Cùng nhân vật trong cùng video phải giữ identity để nối chuyện.
- Các video mới cần tránh chép lại silhouette + quan hệ + choreography chỉ đổi màu/nhãn.
- Card so sánh là một cấu trúc hợp lệ có thể lặp; thay nội dung, hierarchy và dàn cảnh khi ý yêu cầu.
- Logo, icon hệ thống, caption, layout an toàn và cơ chế kỹ thuật có thể tái dùng.
- Ưu tiên thay ý tưởng quan hệ hoặc cách reveal có ý nghĩa; không thêm random chi tiết để đạt điểm mới.
- Không đặt cooldown cố định cho mọi vật. Nếu cùng ẩn dụ là cách giải thích rõ nhất, ghi rationale và tạo cách diễn riêng.

Novelty check là đánh giá định tính có record so sánh, không chỉ hash hình hoặc một ngưỡng cosine tùy tiện.

## 4. Tách cơ chế và tạo hình

| Loại | Có thể reuse | Điều kiện |
| --- | --- | --- |
| Kỹ thuật | timing projection, anchor/contact math, masks, geometry QA | Pure, có interface và kiểm chứng |
| Grammar | queue, block, select, press, swallow | Vật liệu, thời gian, actor và end state cấu hình được |
| Mỹ thuật | token system, text hierarchy, stroke/shadow rules | Phù hợp brief mới |
| Hình cụ thể | một sinh vật, chiếc máy hoặc bố cục đặc trưng | Không tự dùng lại; cần lý do nội dung và check lịch sử |
| Cảnh hoàn chỉnh | thành phẩm episode | Giữ làm reference; không chọn mặc định cho script mới |

## 5. Promotion

`candidate` → `verified-in-project` khi output được duyệt đã qua visual/temporal QA.
`verified-in-project` → `reusable` khi đã tách phần nội dung riêng, ghi interface/limitations và thử một cấu hình khác
về scale/text/actor/timing có ý nghĩa. Nếu chưa đủ evidence, giữ candidate; không buộc render test ngoài approval.
`deprecated` khi có lỗi hoặc recipe thay thế; giữ caller và lịch sử, không xóa trước rà reference.

Mỗi component catalog record cần path, version, inputs, materials, supported actions/ratios,
known limits, example project/scene và verification evidence. Không ghi thư viện “đầy đủ” chỉ vì có tên component.

## 6. Học sau video

Ghi lỗi → nguyên nhân → thay đổi → bằng chứng kết quả → phạm vi áp dụng. Lời khen/không phản hồi không đồng nghĩa
người dùng đã duyệt mọi lựa chọn thiết kế. Feedback chỉ của một scene không tự thành quy tắc toàn repo.
Nâng cấp skill nhỏ nhất giải quyết lỗi tái diễn; không nạp toàn bộ nhật ký video vào mọi phiên.
