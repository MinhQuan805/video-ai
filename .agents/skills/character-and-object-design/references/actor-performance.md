# Thiết kế và diễn xuất nhân vật paper

## 1. Chủ động đề xuất nhân vật khi có hành động để diễn

Khi beat có tác nhân làm việc, mang/vác, kéo/đẩy, chặn, nuốt, chia hoặc lắp, hãy cân nhắc một nhân vật mới
trong concept candidates thay vì bỏ qua vì rig phức tạp. Nếu có thể dựng silhouette rõ và hành động giúp hiểu ý,
thiết kế nhân vật rồi đưa vào scene plan. Card/UI vẫn có thể là target và đạo cụ chính.
Không dùng nhân vật chỉ như sticker đứng cạnh card. Không buộc mọi beat phải có actor hoặc chọn con vật vì một từ khóa.

Đối với hướng đang tiếp nối paper, dùng palette/font/stroke/shadow và grammar motion trong
[paper-motion-continuity.md](../../motion-graphic-design/references/paper-motion-continuity.md).
Giữ cùng nhân vật xuyên các scene trong một video nếu nó đang đảm nhiệm cùng vai; video sau thiết kế mới khi cần.

## 2. Gói thiết kế đủ để review và lập trình

Mỗi actor cần: vai trò ngữ nghĩa; silhouette mô tả bằng các khối chính; 2–3 dấu hiệu nhận dạng;
bảng parts/pivots/anchors; pose nghỉ, lấy đà, contact và hồi; đặc điểm trọng lượng và phản ứng;
mask/occlusion nếu cần; giới hạn và phương án giản lược. Các pose này là mô tả/source asset trước duyệt,
không tự render video hoặc frame composition để minh chứng.

Nếu chủ động dựng vector, ghép khối/path có chủ đích và parts đủ hành động. Thử khả năng biểu đạt bằng
shape đơn giản trước; không phụ thuộc model tạo ảnh để có từng pose hoặc nhờ người dùng vẽ hộ.
Icon tiện ích vẫn theo Font Awesome. Một nhân vật tự thiết kế có rig là artwork, không phải lý do để tự vẽ lại icon hệ thống.

## 3. Diễn xuất dẫn mắt

- **Intention**: mặt/đầu/axis hướng về target trước khi tay/hàm tác động nếu cần để người xem đoán hành động.
- **Weight shift**: thân dồn về chân/điểm tựa; chân chịu tải giữ trên nền, không skate theo root motion.
- **Reach/grip**: tay hoặc móc đến đúng anchor, nắm trước khi target chuyển động; giữ grip khi mang/kéo.
- **Effort**: vật nặng có posture, độ căng và tải lực rõ; không thể hiện nặng chỉ bằng mọi animation chậm đi.
- **Contact**: pose mạnh nhất đọc được silhouette, target không che toàn hành động và contact không dưới caption.
- **Follow-through**: antenna/tai/mép giấy trễ nhẹ sau root; amplitude nhỏ và tắt dần.
- **Recovery**: thả/nuốt xong mới hồi; expression hoặc pose cuối cho thấy kết quả, rồi có reading hold.

Không bắt mắt chớp theo chu kỳ trên mọi scene; blink/expression theo hành động và không che cue quan trọng.
Không animate mọi khớp với cùng phase sine vì nhân vật sẽ giống đồ chơi đang rung, thiếu mục đích.

## 4. Ba nhóm actor có thể tự dựng bằng code

| Vai diễn | Cấu trúc có thể bắt đầu | Hành động hợp lý |
| --- | --- | --- |
| Người chuyển/giao việc | Body, đầu, một tay có grip, base/feet | Nhận card, trao, kéo, phân loại |
| Sinh vật tiêu thụ | Body, upper/lower jaw, eyes, mouth layers | Nhìn target, cắn, giữ, nuốt |
| Nhân vật gánh tải/lắp ghép | Body đơn giản, hai điểm tì/nắm, part chịu lực | Nâng, đỡ, đè, ráp hoặc bật khỏi constraint |

Đây là rig families, không phải thiết kế ngoại hình để dùng lại mặc định. Không bê robot đầu vuông của video cũ
vào mọi script mới. Phải chọn silhouette/parts/proportions cho nội dung rồi đối chiếu lịch sử.

## 5. Phối actor với card

Card có text cần được nhìn trước thao tác; actor không che label. Một cú kéo/đỡ có thể làm card nghiêng trong khi
text vẫn đọc được, sau đó settle ngay ngắn. Actor nhìn/nắm đúng vị trí contact, không nắm cách card một khoảng vô lý.
Nếu actor quá lớn, giảm hoặc đổi staging thay vì thu caption nhỏ. Nếu actor không giúp quan hệ rõ hơn, đổi vai diễn
hoặc dùng chính card làm actor; vẫn cần primary motion hợp ý.

## 6. Đánh giá

Đọc được intention/action/result từ pose và chuỗi thời gian? Identity/parts có ổn qua scale/rotation?
Grip/foot/jaw contact có giữ? Hình có cùng thế giới paper với card và chữ? Secondary motion có dừng?
Thiết kế có khác actor cũ bằng silhouette và diễn xuất, trong khi motion/material vẫn thống nhất?
Trước duyệt ghi pending pixel/playback; sau output được duyệt mới xác nhận diễn xuất hoạt động như dự tính.
