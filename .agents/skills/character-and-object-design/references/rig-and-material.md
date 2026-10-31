# Rig đơn giản, vật liệu thống nhất

## 1. Silhouette trước chi tiết

Xác định hướng nhìn, trục chính và khối lớn. Chỉ thêm đặc điểm giúp nhận dạng hoặc diễn hành động.
Thử hình ở scale dự kiến trên điện thoại, không chỉ zoom to trong editor. Nếu phải đọc một câu giải thích
mới biết vật là gì, cân nhắc hình khác. Không dùng nhiều gradient/glow/noise để che hình khó nhận.

Giữ tỉ lệ stylized có chủ đích; đủ khác giữa actor/target. Dùng tương phản kích thước khi narrative nói về
chênh lệch, không phóng vật để ngụy tạo tỷ lệ dữ liệu. Không sao chép tạo hình đặc trưng của nhân vật bản quyền.

## 2. Thành phần rig tối thiểu

| Thành phần | Khi cần | Metadata cần giữ |
| --- | --- | --- |
| Root | Mọi vật | local bounds, pivot, viewBox, base scale |
| Body/head | Chuyển hướng hoặc posture | parent, rest transform, rotation limits |
| Jaw/lid | Há miệng/mở hộp | hinge pivot, closed/open pose, lip/front layer |
| Hand/hook | Cầm/kéo | grip anchor, attach/release cue |
| Foot/base | Có floor | ground contact, tránh trượt khi chịu lực |
| Flexible part | Giấy/cao su | deformation range và phần không được méo |
| Mask | Nuốt/slot/che khuất | unique ID, clip shape, layer ownership |
| Shadow | Tạo tiếp đất | plane, height relation, opacity/blur tokens |

Không thêm tất cả thành phần cho mọi vật. Một chiếc hộp chỉ cần base và lid; một creature nuốt có thể chỉ
cần body, jaw và mắt. “Có thể diễn” nghĩa là cấu trúc đủ cho hành động cụ thể.

## 3. Bộ quy tắc mỹ thuật theo project

Lưu trong creative brief các giá trị thực đã chọn: nền/ink/accent, font đã kiểm dấu tiếng Việt, stroke width
theo scale, corner language, light direction, shadow softness, texture density, camera/projection và motion character.
Một accent có vai trò nhất quán; semantic colors có thể bổ sung khi thật sự cần phân loại trạng thái.

- Paper: lớp giấy, nếp gập, mép, bóng tiếp xúc nhỏ; chuyển động có hinge/fold hợp lý.
- Rigid: giữ khối, xoay/quán tính/va chạm; không bóp mềm chỉ để tạo bounce.
- Rubber: biến dạng và hồi có giới hạn; chất liệu này phải thấy nhất quán ở mọi interaction.
- UI: layout/state, focus, hierarchy; nội dung ổn định, phản ứng vừa đủ.
- Mixed media: dùng frame/tint/texture hoặc phối cảnh chung để ảnh và code nhìn cùng hệ; không ép ảnh bằng chứng
  thành cartoon nếu điều đó làm giảm tính xác thực.

Đây là lựa chọn, không phải bốn style phải thử trong một video. Không ép paper/terracotta cho mọi chủ đề.

## 4. Kiến trúc component

Tách layout wrapper, pose wrapper và bộ phận local. Props mô tả pose/state hoặc tham chiếu event, không để
component tự tạo global timeline. Anchor trả về trong cùng hệ tọa độ mà parent dùng; giữ transform order rõ ràng.
Một `theme` chung cấp token; override có lý do ở scene, tránh chép màu/font rải rác.

SVG `viewBox` và aspect ratio rõ; ID mask/gradient không trùng instance. Stroke không phình bất thường khi đổi scale.
Hạn chế path tự bịa quá phức tạp; ghép khối đơn giản có silhouette tốt thường dễ kiểm và diễn hoạt hơn.
Rive có [bones, meshes và constraints](https://rive.app/features), nhưng dùng Rive đòi asset/runtime phù hợp;
không coi việc cài thư viện là đã có nhân vật tốt.

## 5. Novelty và học

Tạo fingerprint theo: silhouette family, proportions, medium, action role, layout, choreography và palette.
Giữ tokens để thống nhất video; tạo mới fingerprint hình khi video sau cần ý mới. Không random màu/chi tiết
để giả tính sáng tạo. Nếu cùng vật xuất hiện lại trong cùng video, ưu tiên giữ identity.

Sau khi đã xem output được duyệt: ghi phần nào dễ đọc, lỗi contact/rig, giới hạn scale/ratio và cơ chế nên reuse.
Chỉ có source/TypeScript pass thì status vẫn là `candidate`. Không tạo thumbnail/video giả để làm evidence.
