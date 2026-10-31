# Recipe tương tác — chọn theo động từ và ý nghĩa

Các chuỗi dưới đây là grammar thiết kế do project đề xuất. Không phải animation đã triển khai sẵn.
Không bắt buộc dùng mọi pha hoặc mọi hiệu ứng. Đơn vị thời gian là ms trong timeline; quy đổi theo fps cấu hình.

## 1. Card có hành động

| Quan hệ | Dàn cảnh | Hệ quả cần thấy | Dễ làm sai |
| --- | --- | --- | --- |
| Chọn | Các lựa chọn cùng mặt phẳng; focus đi đến lựa chọn | Selected state rõ, các lựa chọn khác vẫn giữ bối cảnh | Cho mọi card nhảy cùng lúc |
| So sánh | Cùng tiêu chí, cùng tỷ lệ; reveal hàng tương ứng | Sự khác biệt đọc được từ bố cục hoặc dữ liệu | Scale lớn hơn để giả vờ số liệu tốt hơn |
| Xếp hàng | Các card cùng đường đi và khoảng cách hợp lý | Card đầu qua checkpoint; card sau tiến bù | Nhảy vị trí, overlap text, đổi thứ tự không lý do |
| Phân loại | Card đến nút quyết định rồi vào đúng nhánh | Nhãn nhóm và state nhất quán | Bay random, màu nhóm đổi giữa chừng |
| Gộp | Card về cùng vùng, thông tin được tổng hợp | Một kết quả biểu diễn đúng những gì đã gộp | Bóp toàn bộ chữ thành một điểm sáng |
| Mở chi tiết | Giữ điểm neo, vùng mới mở ra từ card | Layout mới giữ nguồn gốc và hierarchy | Phóng toàn bộ text gây nhòe rồi thay scene |
| Bị chặn | Card tiếp cận gate, dừng đúng bề mặt | Dấu locked/waiting và vị trí dừng rõ | Target xuyên cổng rồi mới báo chặn |
| Duyệt | Draft đến gate; check/state đổi sau điều kiện | Cho đi tiếp khi được duyệt | Green check xuất hiện trước kiểm tra |
| Bị chen ngang | Notification chiếm một phần stage, task lùi/đợi | Người xem thấy chi phí gián đoạn | Làm notification và task float mãi |
| Sắp xếp | Di chuyển vào chỗ trống, các card nhường vị trí | Thứ tự cuối có quy tắc dễ đọc | Tráo nội dung text để giả chuyển động |

Nội dung card bám cùng card trong lúc di chuyển. Với squash nhẹ, có thể biến dạng vỏ và giữ text trong lớp riêng;
không cho chữ trôi khỏi card. Khi mục đích là UI, ưu tiên layout/state hơn là làm card như cao su.
Card đứng yên là đúng khi người xem cần đọc. Không thêm cursor nếu không có hành động UI cần giải thích.

## 2. Đẩy / kéo / kéo lê

- Setup: cho thấy hướng lực và quan hệ của hai vật; điểm nắm/tì là một anchor.
- Tiếp cận: bên tác động đến anchor; target giữ nguyên cho đến chạm.
- Tải lực: thân nghiêng hoặc dây căng trước khi target đi nếu cần thể hiện sức nặng.
- Vận chuyển: target theo điểm gắn; drag có thể chậm hơn, nhưng độ trễ phải biểu diễn bằng dây/co giãn hợp lý.
- Release: target đi tiếp theo quán tính hoặc dừng theo ma sát; bàn tay/dây trở về pose nghỉ.
- Chỉ thêm vệt hoặc âm ma sát nếu giúp đọc lực. Dây không được luồn qua vật khác sai lớp.

Ứng dụng card: một card quan trọng đẩy card ít ưu tiên ra để có diện tích; giữ label của cả hai đủ thời gian.

## 3. Đè / nén / quá tải

- Setup: vật dưới có mặt đỡ/floor và chiều cao rõ. Vật trên thể hiện tải trọng tương đối.
- Tiếp xúc: đáy vật trên gặp bề mặt target; lúc này mới bắt đầu compression/recoil.
- Nén: với target mềm, giảm chiều cao và có thể tăng bề ngang; pivot ở mặt tiếp xúc nền.
- Vật cứng: nghiêng, lún vào nền phù hợp hoặc đẩy target đi; không biến dạng như thạch nếu chất liệu không cho phép.
- Giữ tải: nếu vật nặng còn ở trên, target giữ trạng thái bị nén; không tự spring hồi xuyên vật trên.
- Nhấc tải: chỉ sau release mới hồi về; có thể còn vết gập hoặc biến dạng dư nếu narrative cần.

Chữ trên card: dùng wrapper vỏ bị nén, label đổi layout hoặc được di chuyển ra cạnh. Nếu không còn đọc được,
trình bày nhãn trước impact hoặc sau ổn định. Không biến thông tin chính thành gag khó đọc.

## 4. Ăn / cắn / nuốt

- Dùng khi ý nói về tiêu thụ, chiếm dụng, hấp thụ hoặc thất thoát và sắc thái phù hợp. Không dùng động vật
  để minh họa việc tích hợp dữ liệu nếu người xem có thể hiểu lầm dữ liệu bị mất.
- Setup: silhouette và hướng mặt đủ rõ; mắt/đầu nhìn target trước hàm khi cần.
- Tiếp cận: target đến cửa miệng, hoặc đầu di chuyển đến target; chọn một chuyển động dẫn.
- Cắn: hàm đóng quanh vùng tiếp xúc. Dừng/biến dạng target theo chất liệu; không để răng xuyên ngẫu nhiên.
- Che khuất: target đi vào mouth mask đúng lớp; không fade toàn target trước khi qua miệng.
- Nuốt: nếu cần, thân/họng có phản ứng nhỏ sau khi target vào; đừng thêm quá nhiều nhai gây chậm lời nói.
- Hệ quả: hiển thị điều còn lại hoặc lượng thay đổi có căn cứ; trạng thái kết thúc giải thích được câu nói.

Vật đã bị nuốt không xuất hiện lại ngoài miệng do z-index. Hạn chế răng, texture và biểu cảm gây rối.
Nếu thiết kế sinh vật quá phức tạp, dùng vùng chiếm dụng, chiếc phễu hoặc card chồng để diễn cùng ý.

## 5. Va chạm / domino / truyền lực

- Mỗi collision có contact riêng; không kích hoạt tất cả target từ một delay chung.
- Target gần phản ứng trước target xa; biên độ giảm theo lực hoặc vai trò, không rung toàn scene.
- Với hai vật cứng, không cho overlap sâu rồi bung. Với exaggeration, overshoot nằm trong envelope đã định.
- Chuyển động trước impact dễ dự đoán; sau impact đổi vận tốc có chủ đích và chậm dần.
- Chọn một cách nhấn: recoil, bóng hoặc sound. Không mặc định cộng shockwave + shake + flash + particles.

## 6. Ghép / gắn / tháo / chuyển trạng thái

- Hai phần đến đúng socket, căn chỉnh orientation trước snap; socket cố định trong parent coordinates.
- Snap làm đổi quan hệ cha/con hoặc follow anchor cho các frame sau; không chỉ dừng ở hai vị trí gần nhau.
- Dây/connector vẽ từ điểm nối đang di chuyển; flow xuất hiện sau kết nối nếu ý nói đã chạy.
- Tháo phải có release trước hai phần rời nhau; phần còn lại có trạng thái chưa kết nối rõ.
- UI trạng thái idle → processing → ready phải có cue; không bịa progress phần trăm cho quy trình không đo được.

## 7. Nhịp và mức cường điệu

Một thao tác phụ ngắn cần ít anticipation; một vật rất nặng cần cue tải trọng rõ hơn. Không lấy cùng duration
cho click, rơi, nuốt và đọc card. Giảm số hành động nếu câu nói không đủ thời gian để hiểu setup và payoff.
Chuyển scene có thể là cut, carry-over cùng vật hoặc masked reveal; không ép vật vừa impact vừa biến mất.

## 8. Hợp đồng cho một recipe tái dùng

Ghi input (actors, anchors, time/cue, material), output pose/state, điều kiện trước/sau, giới hạn,
safe bounds, hỗ trợ aspect ratio, phiên bản và evidence đã xem. Recipe chưa kiểm animation thực được đánh dấu
`candidate`, không ghi `verified` chỉ vì typecheck hoặc công thức toán có vẻ đúng.
