# Tương tác theo frame — hợp đồng triển khai

Đây là thiết kế cho code tương lai; các tên hàm trong tài liệu chưa phải API có trong repo.
Nguồn chuẩn về renderer: [Remotion Flickering](https://www.remotion.dev/docs/flickering).

## 1. Time và event

Canonical timeline dùng milliseconds, stable anchor IDs và source hashes. Gắn một event cho toàn hành động.
Các phase offset là thời gian tương đối với event; khi retime, các bên cùng dời. Dùng `fps` cấu hình.
Quy ước span là `[startMs, endMs)`; dùng cùng một hàm project thời gian cho caption và motion.

Ví dụ interaction record, không yêu cầu chép thành file timing riêng:

```json
{
  "id": "interaction-press-01",
  "kind": "press",
  "actorIds": ["load", "task-card"],
  "anchorId": "phrase-overload",
  "phaseOffsetsMs": {"prepare": -180, "contact": 0, "loaded": 180, "release": 900, "settled": 1200},
  "contacts": [{"actor": "load", "point": "bottom", "target": "task-card", "targetPoint": "top"}],
  "endState": "card-released",
  "material": {"load": "rigid", "task-card": "paper"},
  "verification": "candidate"
}
```

Phases có thứ tự và contact nằm trong span scene. Event trước đầu scene cần premount hoặc setup có chủ đích;
không để frame âm gây pose vô nghĩa. Với spring, explicit guard trước trigger và xác định thời gian ổn định.

## 2. Hàm pose thuần

Chọn kiến trúc `poseAt(timeMs, spec, tokens, seed) → pose`. Pose chứa transform, visibility, mask,
draw order và state cần thiết. Component đọc pose để vẽ, không tự tích lũy state qua `useEffect` mỗi frame.
Tách transform bố cục, transform hành động và local deformation thành wrapper để tránh ghi đè `transform`.

Một pha tiếp cận có thể dùng đường cong easing; phase contact/hold giữ vị trí ràng buộc; release dùng easing
hoặc spring theo vật liệu. Không ép spring cho chạy đều, opacity hay progress logic.
Chỉ dùng seeded variation cho chi tiết có ý đồ; cố định seed trong manifest, không sinh seed bằng thời gian máy.

## 3. Anchor và tiếp xúc

Mỗi actor có local bounds, pivot và anchors có tên. Với ma trận affine `M_actor`, điểm chạm thế giới là
`p_world = M_actor × p_local`. Trong phase contact, điều chỉnh pose để hai điểm thế giới trùng hoặc đạt
contact gap đã khai báo. Với target biến dạng, cập nhật anchor từ hình đang biến dạng.

Ví dụ vật trên đè card trên mặt đất `groundY`:

- Card có chiều cao hiện tại `h(t)` và bottom pivot cố định tại `groundY`.
- Mặt trên card là `groundY - h(t)`.
- Đáy vật đè trong phase loaded phải nằm tại mặt trên này.
- Khi card hồi, chỉ cho phép hồi nếu vật trên được nhấc hoặc cùng chuyển lên theo constraint.

Không dùng tọa độ tâm để đo contact. Bounds bao gồm rotation/shadow/travel; stroke/shadow là phần nhìn thấy,
nhưng contact geometry có thể giản lược riêng để không đo nhầm bóng là bề mặt cứng.

## 4. Deformation và độ đọc

Squash/stretch chỉ áp cho vật liệu cho phép. Nếu muốn gần giữ diện tích 2D, có thể dùng `scaleY = 1/scaleX`
với scale dương có giới hạn; đây là stylization, không mô phỏng bảo toàn thể tích 3D.
Giữ label trong layer riêng khi vỏ card biến dạng; cả hai vẫn theo cùng chuyển động bố cục.
Đánh giá text lúc biến dạng mạnh nhất, không chỉ pose cuối.

## 5. Motion track tính trước

Khi cần solver: tạo initial state cố định, fixed timestep, seed và phiên bản engine. Tính track một lần trong
stage chuẩn bị, ghi pose theo thời gian cùng hash config. Render chỉ sample track, không chạy runner theo wall clock.
Tăng tốc seek bằng sample/index, không cache mutable state dựa vào frame vừa được gọi.

Nếu dùng Matter.js, `Engine.update(engine, delta)` là bước cập nhật do ta điều khiển
([tài liệu](https://brm.io/matter-js/docs/classes/Engine.html)). Điều này không tự bảo đảm mọi môi trường cho
kết quả bit-identical. Bake track, pin version và kiểm output trên cấu hình dùng để render.
Không nhầm rigid-body collision với soft-body compression hoặc chuyển động hàm/khớp; đó là các hệ khác.

## 6. Mask và draw order

SVG ID phải duy nhất theo instance để mask không dùng nhầm giữa scene. Miệng/slot gồm back layer, target bị
clip, front lip; chọn thứ tự lớp rõ ràng. Không đổi visibility trước lúc target vào vùng che.
Camera transform áp cùng cho mask và actor; không dùng z-index random để sửa xuyên hình.
Nếu animation asset bên ngoài chạy bằng thời gian riêng, chỉ dùng adapter đã xác minh đồng bộ frame.

## 7. Kiểm tra trước duyệt không cần render

- Gọi hàm pose ở frame bất kỳ, seek ngược, lặp cùng frame; output phải giống nhau.
- Tính khoảng cách điểm contact tại pha ràng buộc với tolerance được khai báo theo canvas, không hard-code cho mọi ratio.
- Kiểm liên tục ở trước/sau ranh pha, scale dương, dữ liệu hữu hạn và đúng state cuối.
- Kiểm chuyển động luôn trong safe bounds, kể cả overshoot, rotation và camera.
- Đo text khi font đã load; nếu dùng `measureText`, chạy trong browser như
  [tài liệu](https://www.remotion.dev/docs/layout-utils/measure-text) quy định, không gọi trong Node thuần.

Kiểm số không chứng minh hình đẹp, mask đúng pixel hoặc playback mượt. Sau render được duyệt, xem các mốc
prepare/contact/deform/settle và đoạn chuyển động từ chính output đã render; không render lại chỉ để kiểm.
