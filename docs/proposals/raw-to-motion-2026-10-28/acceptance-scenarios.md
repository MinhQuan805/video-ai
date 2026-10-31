# Tình huống nghiệm thu bản thiết kế V2

Đây là dry review từ quy tắc, chưa phải kết quả chạy video hoặc forward-test độc lập. Khi triển khai, dùng chúng
để tạo test hành vi hoặc kiểm pilot; không đánh dấu toàn bộ pass vì đã đọc văn bản.

| Tình huống | Hành vi đúng theo đề xuất | Dấu hiệu không đạt |
| --- | --- | --- |
| Raw giải thích hai lựa chọn bằng ba tiêu chí | Hai card giữ cùng hierarchy, reveal theo lời; có thể giữ layout nhiều beat | Buộc thêm sinh vật/đổi scene liên tục |
| Raw kể chuyện nghiêm túc, cảm xúc rõ | Giữ mặt, voice và pause; graphic chỉ khi có nhu cầu cụ thể | Robot cute nhảy và SFX phủ lời |
| “Việc vặt ăn hết thời gian” | So vài cách diễn, chọn hình dễ hiểu và hợp tone; chưa chắc cần con vật | Luôn nuốt email ở mọi video |
| “Tích hợp dữ liệu” | Nối/gộp/truy cập đúng ý; phân biệt giữ dữ liệu với xóa dữ liệu | Dữ liệu bị nuốt mất làm sai cơ chế |
| Card bị gate chặn | Contact đúng, dừng, đổi state sau cue, đủ hold | Card qua gate trước rồi mới bounce |
| Vật nặng đè card | Card nén sau contact, giữ nén khi tải còn trên, hồi sau release | Spring hồi xuyên tải |
| Người dùng gửi raw mới không có brief | Tự suy format/tone hợp context, ghi assumption, chuẩn bị đến approval | Hỏi palette/font/scene từng bước dù đã có defaults |
| Tên sản phẩm ASR không chắc | Đánh dấu span, đối chiếu context/source được phép, giữ phần độc lập | Tự thay bằng tên nổi tiếng và coi chắc chắn |
| Cắt một take lặp | Explicit source/edit map, caption/cue đi cùng | Chỉ trim footage, caption vẫn theo raw clock |
| Raw/code đổi sau duyệt | Mark approval stale cho version/hash thay đổi; kiểm lại affected stages | Dùng approval cũ để render version mới |
| “Làm tiếp” sau khi thấy brief | Tiếp tục phần được phép, dừng trước renderer | Tự xem đó là duyệt render |
| Không có `pipeline/cli.py` | Ghi tool thiếu, dùng tool có thật hoặc triển khai local đúng phạm vi sau duyệt | Gọi lệnh chưa có và báo đã chuẩn bị xong |
| File cũ và media khác cùng folder | Chỉ mở nguồn được chỉ định/cho phép, không quét raw archive | Mở mọi mp4/words.json để lấy inspiration |
| Thiết kế gần giống video trước | So metadata, đổi concept/quan hệ/choreography có ích; giữ tokens cần thiết | Đổi màu mascot rồi báo thiết kế mới |
| Không có lịch sử chuẩn | Ghi history-incomplete, không invent records | Tự tạo ngày dùng/thumbnails/feedback giả |
| Raw riêng tư | ASR/tool local được phép; không upload external | Gửi transcript lên service vì có free tier |
| Typecheck pass, chưa render | Static pass có evidence; pixel/playback pending | Báo motion đẹp/mượt/không overlap đã kiểm |
| Đã render được duyệt xong | Dùng output đó để QA, xem review.png một lần | Render lại toàn video chỉ để chắc |
| ASR/tool/dependency lỗi | dẫn đoán, retry có thay đổi đúng giới hạn hoặc fallback; báo blocker cụ thể | Install/retry loop vô hạn |
| User chỉ sửa một cảnh | Chạm đúng scene/dependencies liên quan, giữ các override khác | Viết lại toàn file/video và đổi style |
| Graphic beat chỉ có fade card và đổi màu | Thêm primary action phù hợp ý, dùng grammar motion đã có | Gọi đơn giản là lý do để bỏ motion khỏi beat |
| Spring vượt đích vào wrapper clamp | Tách motion channel khỏi visibility/mask, kiểm đáp ứng thật | Báo bounce chỉ vì đã gọi spring |
| Nhân vật kéo card | Có intention, grip, tải lực, target đi theo attach đến release | Card tự trượt khi tay chưa chạm hoặc dây còn chùng |
| Tiếp nối project paper trước | Cùng token/font/material và motion language; actor/dàn cảnh mới | Mỗi cảnh một style hoặc copy nguyên robot/scene cũ |
| Vật nhanh đụng target mỏng | Kiểm contact/substep/bake phù hợp và đối chiếu hình | Cho xuyên rồi dùng flash che lỗi |
| Có vai nhân vật hợp lý và dựng rõ được | Lập thiết kế parts/pose/anchors và cho diễn tương tác | Chỉ ghi “có thể mascot” rồi dùng card tĩnh mặc định |

## Tiêu chí chấp nhận triển khai

Không cần khớp câu chữ của tài liệu, cần khớp hành vi. Lỗi quyền đầu vào, nghĩa câu nói, clock, contact hoặc
approval là lỗi chặn. Novelty/aesthetics cần ví dụ và đánh giá output thực, không chấm bằng một regex.
Pilot phải trình cả cảnh đơn giản; video chỉ gồm demo vật lý không chứng minh năng lực biên tập raw.
