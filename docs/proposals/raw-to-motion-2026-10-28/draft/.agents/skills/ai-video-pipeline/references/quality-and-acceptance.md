# QA có bằng chứng và điều kiện nghiệm thu

## 1. Ba mức kết luận

- `pass`: có kiểm tra thực tế, ghi method/input/version/output evidence.
- `fail`: quan sát được lỗi; ghi scene/span và cách sửa trong phạm vi.
- `pending` hoặc `blocked`: chưa được phép/chưa có tool/evidence; không chuyển thành pass.

Scorecard thiết kế là tự đánh giá, không chứng minh hình đẹp hay retention. Đánh giá nội dung với brief;
không dùng một số điểm tổng để bù lỗi đọc sai, mất âm hoặc render chưa duyệt.

## 2. Trước duyệt render

| Kiểm | Bằng chứng tối thiểu | Chặn ready khi |
| --- | --- | --- |
| Phạm vi input | path/permission và hash nguồn | File cần thiết chưa xác định/được phép |
| Transcript | uncertainty list, mapping về source | Claim/từ quan trọng đang bịa hoặc làm sai nghĩa |
| Timeline | range, coverage, cut map, duration math | Âm/dương sai, mất span, anchor mồ côi quan trọng |
| Transition | overlap tính vào edit clock | Footage/voice/caption lệch clock |
| Code | TypeScript/schema/lint phù hợp change | Component không build/props thiếu |
| Asset | path, font readiness, license asset độc lập | Thiếu file hoặc quyền dùng cần thiết |
| Geometry | safe bounds, text metrics và interaction envelopes | Text/contact/face chắc chắn bị che/cắt |
| Interaction | state/contact/constraint checks | Phản ứng sai trước contact hoặc xuyên hình từ số liệu |
| Audio signal | phép đo signal local được phép | Mất voice, clipping nghiêm trọng hoặc duration sai |
| Novelty/style | rationale + history check/thiếu history | Chép thiết kế cũ vô cớ hoặc mâu thuẫn brief |

Không tự đọc file bị AGENTS.md hạn chế để vượt gate. Nếu audio/media chưa được phép, ghi blocked hoặc chấp nhận
nguồn report hợp lệ đã có, nêu rõ phạm vi xác minh. Không ghi đã nghe chỉ vì đã đo waveform.
Không tạo still/video ngầm để đổi tên pixel QA thành static QA. Phép đo geometry dựa source khác frame render.

## 3. Chống slop và đánh giá clarity

Trả lời ngắn theo từng beat: takeaway là gì, điểm mắt nhìn ở đâu, chuyển động làm rõ quan hệ gì,
đoạn nào để đọc/nghe, phần nào bỏ đi vẫn hiểu? Nếu không giải thích được vai trò của phần tử, cân nhắc bỏ.
Không yêu cầu mỗi scene phải có ẩn dụ, số, headline, jump hoặc sự khác biệt với scene trước.
Card cùng style có thể giữ qua nhiều ý. Thay hình khi ý thay đổi, không chỉ để tạo “variety”.

Với brief motion-led của người dùng, graphic beat thiếu primary action có nghĩa là lỗi thiết kế cần sửa,
kể cả khi fade/title animation chạy được. Kiểm hành động, cue và end state; card có thể giữ sau action.
Khi có vai diễn hữu ích và khả thi, brief phải có thiết kế nhân vật cụ thể thay vì bỏ qua bằng mặc định card-only.
Đối chiếu paper tokens và motion grammar dự án trước; đổi scene/silhouette vẫn giữ thế giới hình ảnh chung.

Các lỗi cần sửa trước khi gọi thiết kế đạt: ẩn dụ đổi nghĩa, số giả, quá nhiều text trùng voice,
identity nhân vật đổi, glow/bounce đồng loạt, chi tiết nhỏ mất đọc trên điện thoại, SFX đè voice,
transitions làm mất punchline hoặc caption che contact.

## 4. Sau render được duyệt

Tái dùng chính output đã render. Xem `output/review.png` đúng một lần theo AGENTS.md, ghi các scene cần sửa.
Grid pose cuối không chứng minh temporal quality. Xem chuyển động quanh các event chính từ output hiện có
trong phạm vi media đã được cho phép; có thể dùng filmstrip extract từ cùng output khi policy cho phép.
Không gọi renderer lần nữa để tạo evidence QA hoặc tự mở media khi chưa có quyền.

Temporal checklist:

- Contact: ngay trước, đúng lúc chạm, biến dạng cực trị, release, settle.
- Không pop/teleport, frame đen, mask leak, draw-order lỗi hoặc twitch ở ranh pha.
- Đọc được chữ khi đang chuyển động; nghỉ đủ cho lượng thông tin.
- Vật giữ ràng buộc khi cầm/kéo/đè; hồi chỉ sau release; không drift vào safe zone.
- Normal/tangent response hợp lực; không ease-out vật rơi để giả impact, không trượt grip/foot, dây chùng không tự kéo.
- Elastic motion không bị wrapper clamp cắt overshoot cần có; visibility/mask vẫn giữ giới hạn hợp lệ.
- Voice/caption/cue/footage cùng edit clock; đo mux duration và kiểm đoạn nối, đầu/cuối.
- Màu, font, identity, texture và light nhất quán.
- Playback và contact có cảm giác phù hợp câu nói; không suy ra chất lượng này chỉ từ một frame.

Tối đa hai vòng sửa tự động theo policy repo. Ghi phiên bản thay đổi và áp gate duyệt render lại của project;
không lặp vô hạn hay âm thầm đổi concept. Không chạy lại lệnh dài chỉ vì muốn kiểm lần nữa.

## 5. Approval packet tối thiểu

Project/version + source/timeline/code hashes; raw/edit duration; creative direction; scene table;
edit decisions ảnh hưởng lời nói; assets và license phù hợp; static/audio QA; pixel/playback pending;
uncertainties; settings/cost basis; trạng thái `READY_FOR_APPROVAL` và bước render cần duyệt.
Nhận “làm tiếp”, duyệt concept hay skill không đủ làm render approval. Ghi lời duyệt cụ thể và timestamp trong manifest.

## 6. Đo tự động hóa

Ghi số lần user phải chỉ đạo, sửa transcript/cảnh, thời gian tham gia, blockers, rework và runtime failures.
Nếu có baseline tương đương, báo phần giảm công việc theo cách tính; tách render approval khỏi lỗi thiếu tự động hóa.
Chưa có dữ liệu thì nói chưa đo. Không dùng `9/10 stage` suy thành `90% công việc`.
Phản hồi viewer/retention chỉ có khi user cung cấp/ủy quyền dữ liệu; không tự truy tài khoản analytics.
