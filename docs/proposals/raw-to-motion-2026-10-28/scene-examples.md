# Ví dụ scene plan — dữ liệu giả định để duyệt thiết kế

Các câu và thời gian dưới đây là ví dụ tự tạo, không được suy là transcript/timing của một video thật.
Chưa tạo frame hoặc video minh họa. Mục đích là cho thấy cùng một bộ skill có thể chọn rất ít đồ họa hoặc
một tương tác phức tạp khi nội dung xứng đáng.

V2: các graphic beat cần motion chính có ý nghĩa và đồng bộ với project paper trước. Scene người nói có thể giữ
để nghe/cảm xúc. Các ví dụ card cũng có reveal có cấu trúc, di chuyển, contact hoặc layout change rồi mới hold.

## A. Card-only: “Soạn xong vẫn phải kiểm rồi mới gửi”

**Takeaway:** tự động soạn không đồng nghĩa tự động gửi. **Visual:** một draft card, checkpoint và trạng thái.
**Art direction:** paper gọn, ink đậm, accent dành cho trạng thái đang xử lý; label luôn nằm trên card.
**Lý do:** có thứ tự và gate rõ; không cần nhân vật.

| Mốc tương đối giả định | Diễn biến | Ý nghĩa / constraint |
| --- | --- | --- |
| 0–600ms | Draft card nằm yên, status “Bản nháp” | Cho nhận diện, không cần entrance bounce |
| 600–1100ms | Card tiến đến checkpoint | Hướng đi rõ, gate đã có để mắt dự đoán |
| 1100ms = cue “kiểm” | Card dừng ngay trước gate | Điểm chạm từ shell, không lấy tâm card |
| 1100–2000ms | Focus một vùng nội dung, state “Đang kiểm” | Không hiện green check sớm, không bóp text |
| 2000ms = cue “mới gửi” | State chuyển; gate mở, card đi qua | Một event mở gate và cho phép card tiếp tục |
| 2500–3200ms | Hold kết quả, text “Đã duyệt” nếu đúng lời nói | Không tự hiển thị “Đã gửi” nếu raw chưa nói gửi thật |

Contact/shadow/state cùng event. SFX có thể chỉ một click/check rất nhẹ, hoặc không có nếu voice đã đủ nhấn.
Card rời sang cảnh tiếp theo bằng carry-over hoặc cut; không ép fade thêm tám frame.

**QA trước duyệt:** state không ready trước cue, card không qua gate đóng, safe bounds, text fit, duration math.
**QA sau render:** đọc label trong lúc đi, contact nhìn đúng, highlight không lấn caption, voice/cue khớp.

## B. So sánh đơn giản: “Cách A dễ bắt đầu, cách B đỡ sửa về sau”

**Visual:** hai card cùng diện tích và cùng ba dòng tiêu chí nếu raw có đủ tiêu chí. Không tự thêm biểu đồ điểm.
Lời nói đến A thì focus A; B giữ yên đủ thấy đối chiếu. Đến B thì focus chuyển bằng accent hoặc mở thêm một dòng.
Reveal hàng theo cùng trục, mở vùng kết quả hoặc cho divider/label dịch đến chênh lệch đang nói; đó là primary
motion có cấu trúc. Không chỉ tô màu A/B trên một slide đứng suốt beat rồi coi đã đáp ứng motion.
Các card không cần đánh nhau hay nảy dù đang “cạnh tranh”. Giữ cùng hàng giúp người xem so sánh.

Nếu raw không cung cấp số, dùng label định tính đúng wording, không bịa “nhanh hơn 80%”.
Nếu đoạn nói chỉ hai ý, hai label là đủ; không buộc đủ ba hàng vì template.

## C. Đè: “Việc mới cứ chồng lên việc đang làm”

**Visual:** task card đang ở stage; task mới tới và làm stack cao hơn. Chỉ dùng block nặng đè khi raw thật sự nhấn gánh nặng.
**Lý do:** chồng card có quan hệ trực tiếp với backlog; hình khối nặng là phương án cường điệu tùy tone.

Task mới tiếp xúc ở cạnh trên stack rồi card dưới lùi nhẹ hoặc thay layout; label cũ vẫn thấy nếu cần biết việc gì bị dồn.
Với bản “vật nặng”: bottom card gắn floor, compression sau contact, tải ở trên cho đến release, vỏ biến dạng ít,
text được giữ nguyên trong layer riêng. Hệ quả có thể giữ trạng thái overloaded thay vì hồi ngay để hợp ý “cứ chồng”.
Chỉ rung/nhúc nhích stack bị chạm; headline và camera giữ yên. Không mặc định shockwave.

## D. Sinh vật giấy chỉ khi hợp: “Mấy việc nhỏ nuốt hết buổi sáng”

So hai phương án trước:

1. Task card lần lượt chiếm phần của một vòng thời gian, khoảng dành việc chính bị hẹp lại.
2. Một sinh vật giấy ăn các khối thời gian nhỏ; con vật là ẩn dụ cho việc lặt vặt, không mặc định là AI.

Nếu giọng kể vui và silhouette/action đọc được nhanh, có thể chọn phương án 2. Nếu tone nghiêm túc hoặc thiếu
thời gian setup, phương án 1 rõ hơn. Không vẽ phần bánh thời gian theo tỷ lệ thật nếu raw không có số liệu;
dùng nhãn “buổi sáng” và biểu diễn định tính để tránh giả độ chính xác.

Rig phương án 2: body + jaw hinge + mắt chỉ hướng + mouth back/front. Không bắt buộc chân/tay, răng phức tạp hoặc mesh.
Target là khối thời gian có label đơn giản, không phải câu caption. Chỉ một chu kỳ ăn quan trọng nếu beat ngắn.
Target tới miệng → jaw đóng → target đi qua mouth mask → body phản ứng nhỏ → hold phần thời gian còn lại.
Không dùng fade để target biến mất trước miệng, không cho khối “bị nuốt” quay lại ở frame sau.

Fingerprint cần lưu: quan hệ tiêu thụ thời gian, silhouette, kiểu hàm, vật liệu, target, bố cục và choreography.
Video sau tránh dùng lại cùng hình/nuốt nếu chỉ khác logo; cơ chế jaw/mask có thể reuse với thiết kế thích hợp khác.

## E. Không cần đồ họa mới

“Lúc đó tôi mới nhận ra mình hiểu sai vấn đề.” Giữ mặt, khoảng ngừng và caption có thể đã là lựa chọn mạnh nhất.
Một cut hoặc crop nhẹ theo delivery đủ tạo chuyển nhịp. Không thêm bóng đèn, robot hay headline “BÀI HỌC” mặc định.

## F. Phép thử khả năng thích ứng

Cùng một brief, nếu mọi câu đều thành card pop hoặc mọi động từ đều thành động vật, bộ chọn đang lỗi.
Nếu mọi scene đổi style chỉ để khác nhau, hệ mỹ thuật đang lỗi. Nếu một cảnh đơn giản rõ ý, giữ nó dù thư viện
có nhiều primitive phức tạp. Khả năng bỏ bớt là một phần của chất lượng thiết kế.

## G. Diễn xuất vật lý: nhân vật paper kéo một task card

**Vai:** một nhân vật mới biểu diễn người/agent nhận việc; hình đơn giản cùng paper palette. Có body, đầu hướng
target, một tay/móc có grip, điểm chân/base và part phụ để follow-through. Không copy robot source làm mặc định.
**Hành động:** nhìn → với → nắm → dồn lực → kéo → nhả → card trượt/hãm → pose kết quả.

| Pha | Ràng buộc | Motion chính và phản ứng |
| --- | --- | --- |
| Nhìn/với | Chân/base giữ, card chưa đi | Đầu dẫn hướng, tay đi theo cung ngắn đến grip |
| Nắm | Grip tay trùng anchor card | Đóng tay/móc hoặc snap rõ; không fade card |
| Tải lực | Grip giữ, dây nếu có đã căng | Thân nghiêng về sau, lực đọc được từ posture |
| Kéo | Card theo grip hoặc constraint đã khai báo | Card trượt theo mặt đỡ; mép/label rung rất nhỏ nếu vật liệu hợp |
| Nhả | Attach kết thúc ở event release | Tay rời, card tiếp tục ngắn rồi hãm theo friction stylized |
| Settle/read | Card/actor có pose cuối ổn định | Part phụ tắt dần, giữ đủ đọc kết quả |

Nhân vật tạo lực, card nhận lực; đừng làm tất cả cùng một spring. Bóng bám mặt đỡ, text không bóp méo,
root travel không ghi đè pose tay. Nếu không đủ thời gian cho chuỗi đầy đủ, rút gọn reach/load nhưng giữ contact
và kết quả rõ; không tăng tốc cả chuỗi đến mức nhìn như vật teleport.
