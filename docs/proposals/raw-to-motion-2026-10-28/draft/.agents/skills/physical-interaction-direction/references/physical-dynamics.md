# Vật lý cho motion graphic — tiếp xúc, lực và chuyển động có trọng lượng

Đây là đặc tả thiết kế/triển khai đề xuất. Các công thức là mô hình giản lược để hướng dẫn code, không phải
một solver hoàn chỉnh hay thư viện đã chạy. Phải khớp vật liệu, nghĩa câu nói và motion profile của project.

## 1. Chọn ba mức xử lý

| Mức | Khi dùng | Cách dựng |
| --- | --- | --- |
| Biên đạo | Một vài card/actor, cần đúng cue voice | Key poses, path, contact constraints và spring/easing |
| Kết hợp | Hành động dẫn theo cue, phần phụ cần quán tính | Actor chính biên đạo; recoil/antenna/dây từ hệ phản ứng hoặc track tính trước |
| Mô phỏng | Nhiều vật xếp/đổ/va nhau là nội dung cần thấy | Fixed-step solver, contact events, bake track và kiểm bounds |

Mặc định bắt đầu từ biên đạo hoặc kết hợp để kiểm soát cách kể. Mô phỏng không tự tạo diễn xuất tốt.
Dùng nguyên tắc từ [Box2D Simulation](https://box2d.org/documentation/md_simulation.html) để hiểu contact,
ma sát và bước thời gian; đây không phải đề xuất cài Box2D vào repo.

## 2. Brief vật lý tối thiểu

Ghi actor, khối lượng tương đối, chất liệu, mặt đỡ, điểm tì/nắm, hướng lực, mức biến dạng, cue va chạm,
điều kiện release và pose cuối. Trọng lượng tương đối là lựa chọn dàn cảnh; không trình như số kg thật nếu không có nguồn.
Tách shape nhìn thấy, collider giản lược và shadow. Viền/mép/miệng nhìn thấy phải phù hợp collider tại điểm quan trọng.
Đơn vị: layout theo canvas px hoặc tọa độ chuẩn hóa; time theo giây/ms rõ ràng. Không coi px là mét mà không khai báo scale.

## 3. Nhịp của một interaction

`ready → anticipate → approach → contact → transfer/deform → release → settle → read`.
Đây là grammar để chọn pha, không bắt mọi hành động đủ tám pha. Cue mạnh đặt ở contact hoặc hệ quả cần thấy.
Đường đi, khoảng lấy đà, orientation và tốc độ phải dẫn mắt đến contact. Giữ hold để hiểu kết quả sau khi lực đã tắt.

Tham khảo [Adobe animation principles](https://www.adobe.com/creativecloud/animation/discover/principles-of-animation.html)
về anticipation, staging và follow-through. Việc chuyển các nguyên tắc sang card/actor paper là quyết định của project.
Motion phải có thay đổi vị trí/hình dạng/quan hệ đọc được; không chỉ fade hoặc tô màu rồi gọi là biên đạo vật lý.

## 4. Chuyển động tự do và va chạm

Với đoạn bay trước contact có gia tốc cố định, có thể dùng `p(t)=p0+v0*t+0.5*a*t²` và `v(t)=v0+a*t`.
Vật ném đi theo cung do trọng lực; vật bị dẫn bằng tay/UI không cần cung đạn đạo. Chọn một nguồn điều khiển rõ.
Không ease-out vật rơi đến gần sàn như đang tự phanh nếu ý là trọng lực; giảm tốc xảy ra tại contact/reaction.

Với contact đơn giản không xoay, normal `n` hướng từ A sang B, relative normal speed
`vn=(vB-vA)·n`. Chỉ giải impulse khi đang tiến vào nhau (`vn<0`). Mô hình 1D dùng
`j=-(1+e)*vn/(invMassA+invMassB)`; cập nhật A theo `-j*n*invMassA`, B theo `+j*n*invMassB`.
Giữ `e` trong khoảng hợp lý 0..1; static body có inverse mass 0. Hai vật static không giải bằng mẫu số 0.

Mô hình trên bỏ qua torque, friction và penetration correction: dùng để giải thích/tạo case đơn giản,
không chép làm collision engine tổng quát. Contact lệch tâm cần quán tính xoay, không chỉ translate.
Đọc [Matter.Body](https://brm.io/matter-js/docs/classes/Body.html) nếu sử dụng properties của engine đó;
không đồng nhất `mass` của Remotion spring với mass vật lý của rigid body.

## 5. Tiếp xúc có thời gian và sự truyền lực

- **Begin**: hình gặp nhau; bắt đầu phản lực hoặc deform sau điểm chạm hình học.
- **Loaded**: giữ ràng buộc chạm khi tải còn tác dụng. “Còn đè” là state, không phải một bounce thoáng qua.
- **End**: lực/nắm/tiếp xúc được thả; mới cho hồi hoặc bay tự do.

Broad-phase overlap chỉ cho biết ứng viên gần nhau; không coi AABB overlap hoặc engine collision event
luôn là đúng khoảnh khắc hai đường viền người xem thấy chạm. Với đồ họa biên đạo, lấy anchor/shape contact làm chuẩn.
Với track solver, đối chiếu contact event với hình tại frame/subframe trước khi neo SFX và deformation.

Reaction của bên bị tác động phụ thuộc hướng lực, mặt đỡ và vật liệu. Bên ngoài chuỗi tiếp xúc không rung theo.
Domino truyền qua từng contact; đừng dùng stagger tùy ý để thay nguyên nhân. Truyền lực không bắt buộc mọi
phần tử có biên độ bằng nhau; tạo rõ bên nặng/bên nhẹ và khoảng cách.

## 6. Ma sát, trượt và lăn

Phân biệt giữ tại chỗ, bắt đầu trượt và đã trượt. Trong model solver, giới hạn lực/impulse tiếp tuyến phụ thuộc
normal load; trong biên đạo, giữ target cho đến lúc đã có cue tải lực đủ rõ, rồi cho trượt với tốc độ phù hợp.
Không kéo card đi đều trong khi dây còn chùng. Dây căng trước, target đi sau; release làm dây hết căng.

Vật kéo nặng có anticipation dài hơn và quãng hãm khác vật nhẹ nếu cùng lực; không chỉ giảm playbackRate toàn cảnh.
Khi lăn không trượt, quãng đường và rotation cần tương ứng bán kính (`s=r*theta`); khi trượt, không ép điều kiện đó.
Với card trượt trên giấy, dùng friction/drag stylized và bóng cùng mặt đỡ, không làm card tự float lên sau chạm đất.

## 7. Spring, damping và settle

Hệ phản ứng giản lược: `m*x'' + c*x' + k*x = F(t)`; `omega0=sqrt(k/m)`,
`zeta=c/(2*sqrt(k*m))`. `zeta<1` có thể dao động, gần 1 hồi nhanh ít overshoot, lớn hơn 1 hồi chậm hơn.
Đây là cách nghĩ về response; đo đáp ứng thực của Remotion thay vì suy thông số từ tên preset.

Với cùng m/k, tăng damping giảm rung; tăng mass một mình cũng đổi tần số và damping ratio.
Để giữ cùng damping ratio khi đổi m/k, tính lại c hoặc tuning tương đương. Không thay cả ba ngẫu nhiên.
Đo thời gian settle, biên độ overshoot và độ đọc tại fps/aspect thực; config số chỉ là điểm xuất phát.

Overshoot thuộc kênh chuyển động cho phép (position/angle/elastic part). Opacity/mask progress thường cần clamp 0..1.
Nếu wrapper clamp mọi progress thì mất bounce; nếu bỏ clamp toàn bộ thì có thể làm opacity/scale/clip sai.
Tách `motionProgress` và `visibilityProgress`, giới hạn scale dương và preserve text.
Đọc [Remotion spring](https://www.remotion.dev/docs/spring) trước khi chọn delay/duration API theo bản đã cài.

## 8. Biến dạng và tải trọng

- Giấy/card: gập/uốn mép, nghiêng, cạnh nén nhẹ; chữ chính giữ đọc được và không phình như jelly.
- Cao su: nén theo normal, giãn bên có giới hạn; hồi sau release; kiểm silhouette và pivot trên mặt đỡ.
- Vật cứng: giữ hình, dịch/xoay; thể hiện lực bằng phản lực, quán tính và shadow.
- Vật mảnh: phần xa điểm nắm có thể chậm hơn; khoảng trễ theo material, không random mỗi frame.

Không animate height giảm trong khi mặt đáy cũng trôi: khóa ground/contact anchor rồi tính lại mặt trên.
Deformation có thể đổi local anchor nên cập nhật shape/pivot cùng thời điểm. Bóng ép gần và gọn khi chạm,
bóng tách/rộng hơn khi nâng là cue thị giác có thể dùng; giữ cùng hướng sáng với paper project.

## 9. Khớp, dây và điểm nắm

Hinge giữ pivot; jaw/lid xoay quanh khớp, không scale nguyên đầu. Grip/attach giữ khoảng cách hoặc transform
đã khai báo; chỉ detach ở release. Với chân chịu lực, khóa điểm chân xuống nền khi thân lấy đà.
[Matter.Constraint](https://brm.io/matter-js/docs/classes/Constraint.html) hỗ trợ ràng buộc khoảng cách và elasticity;
đó không tự cho IK chân, soft body hay biến dạng giấy. Những phần đó cần rig hoặc biên đạo riêng.

Dây kéo một chiều không có lực nén: khi hai đầu gần hơn độ dài nghỉ thì thể hiện chùng nếu brief cần thật.
Một connector UI có thể là đường Bezier minh họa, không cần giả dây vật lý; ghi rõ vai trò để tránh hành vi mâu thuẫn.

## 10. Ăn/nuốt với contact thật

Mouth aperture, jaw hinge, lip layers và target front có anchor. Chọn bite time sau khi target tới mouth entry.
Giữ target trên quỹ đạo vào vùng miệng; mask che dần phần đã qua lip, không fade toàn vật giữa không trung.
Nếu răng/hàm giữ target trước nuốt, attach target vào jaw/mouth frame tương ứng; thả khi đi vào throat zone.
Head lùi nhỏ hoặc thân dồn trọng lượng theo hành động; antenna/ear có follow-through nhỏ, không bounce mọi bộ phận.
Không làm số/label biến mất trước khi người xem kịp nhận diện. Ăn dùng cho quan hệ phù hợp, không minh họa mọi tác vụ AI.

## 11. Fixed-step, substeps và seek

Nếu solver cần bước nhỏ, chọn timestep cố định độc lập fps xuất. Ví dụ output 30fps có thể sample track
được tính 60/120Hz sau khi cân nhắc tốc độ/contact; đây là điểm thử, không thông số bắt buộc hay bảo đảm không xuyên.
Object mỏng/di chuyển nhanh cần kiểm tunneling, collision accuracy hoặc substeps/CCD phù hợp engine.
Không dùng frame count của output làm số substep động phụ thuộc worker. Bake track với hashes và version.

## 12. QA theo cơ chế

Trước duyệt: pose/state/contact math, không hồi trước release, grip distance, finite values, bounds, random seek.
Sau render được duyệt: kiểm trước/chạm/cực trị/nhả/ổn định và đoạn playback giữa các mốc; text, mask và shadow.
Một grid pose cuối không đủ xác nhận vật lý. SFX đúng engine event nhưng sai hình vẫn là lỗi cần chỉnh.
Mỗi lỗi ghi thành contact/constraint/motion-channel finding cụ thể, không ghi chung chung “chưa mượt”.
