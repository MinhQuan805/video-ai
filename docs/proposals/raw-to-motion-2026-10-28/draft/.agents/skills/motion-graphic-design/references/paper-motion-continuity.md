# Kế thừa motion từ project paper, phát triển tương tác mới

## 1. Profile đã được người dùng chọn làm nền

Nguồn tham chiếu: video `paper-2026-10-26-ai-agent-4-buoc`, input metadata tại
`videos/paper/26-10-26-4-buoc-ai-agent/`; code tại `src/videos/paper/26-10-26-ai-agent-4-buoc/`.
Đã đọc script.md, timing.txt, scenes.json, theme và các đoạn code motion. Chưa mở media/review hoặc xác minh
playback trong lần nghiên cứu này. Vì vậy các component dưới đây là **đã thấy trong source**, chưa gắn nhãn verified visual.

| Token | Giá trị từ code |
| --- | --- |
| Nền | `#FAF8F5` |
| Giấy/card | `#FFFFFF`, muted `#F4F0E8` |
| Ink | `#1A1816` |
| Accent | `#C6532A` |
| Font | Fraunces tiêu đề, Inter nội dung, có subset Vietnamese |
| Chất liệu | Paper sáng, viền nhẹ, bóng mềm, hình rõ, lớp trước/sau gọn |

Đối với hướng tiếp nối đang được yêu cầu, dùng profile này để đồng bộ trước. Đổi bối cảnh/actor/quan hệ/hành động
để tạo mới. Không tự đổi sang neon, 3D bóng loáng hay font khác cho từng scene. Profile tương lai có thể khác
khi người dùng chọn, nhưng không áp một style mới trong lần tiếp nối này để tạo vẻ sáng tạo.

## 2. Motion có thật trong source

| Cơ chế nguồn | Khả năng giữ lại | Phần phát triển tiếp |
| --- | --- | --- |
| `MaskReveal` | Reveal title/label theo direction | Giữ clipping text ổn; chuyển động chính cần thêm action sau reveal |
| `SplitSlideIn` | Slide với scale/tilt | Tách kênh overshoot nếu muốn spring thật; kiểm contact sau nhập cảnh |
| `Flip3DIn` | Mở card theo X/Y có perspective | Pivot khớp nếp gập khi dùng như giấy; chỉ flip nội dung khi đọc được |
| `RadialLaunch` | Phân bố app/object quanh một origin | Mỗi target có đường đi và quan hệ; tránh cùng radial burst mọi scene |
| `StampDropIn` | Drop/landing stylized | Ground/contact event và biến dạng phải cùng thời gian, không suy contact chỉ từ progress |
| Cursor, ripple, shockwave | Click và accent phụ | Dùng một event gây state/recoil; ring không thay cho motion của vật bị chạm |
| `BezierConduit` | Đường nối/flow | Socket bám actor đang chuyển động; flow sau khi kết nối |
| Scene4: click → file hop | Đã có ý tưởng nhân quả | Chuyển clickFrame sang semantic event chung và guard pose |
| Scene15: agent đi qua ba card | Có nhịp tuần tự và actor–target | Nếu gọi “ăn”, thêm jaw/mask/contact; nếu chỉ thu nhận thì giữ action trượt/gộp đúng nghĩa |

Nguồn code chính: `scenes/common.tsx`, `Scene4LocalAgent.tsx`, `Scene15PackageSkill.tsx` trong project trên;
token chuẩn tại `src/visual-systems/paper/theme.ts`.

## 3. Hai điểm kỹ thuật tìm thấy từ source

Một số wrapper dùng `clampP = clamp(progress,0,1)` cho transform; spring có overshoot đưa qua wrapper sẽ bị cắt
phần vượt 1. Không suy ra rằng truyền spring vào là hình đã bounce. Tách channel vị trí/rotation khỏi opacity/mask;
có thể giữ phiên bản clamp cho reveal gọn và tạo adapter elastic cho interaction cần vượt đích.

Scene15 có `consume` điều khiển `translateX`, `scale` và `opacity` trên card; `RobotHero` hiện có mắt/antenna,
không thấy jaw/mouth-mask trong rig này. Do đó chưa gọi nó là cơ chế nuốt có tiếp xúc đã kiểm chứng.
Giữ các thay đổi dang dở; phát triển rig mới trong project tương lai khi cảnh cần, không tự sửa scene cũ ở vòng đề xuất.

## 4. Contract motion cho graphic beat

Mỗi beat đồ họa cần một `motionIntent` và `primaryAction` rõ, cùng cue, actor, end state và settle/reading window.
Có thể là card nhường chỗ, UI mở/gập, đường nối truyền tín hiệu, vật nén, nhân vật nhấc/ăn/kéo, hoặc biểu đồ biến đổi.
Nếu kế hoạch chỉ có fade tiêu đề + card đứng suốt beat, xem lại hành động để đáp ứng yêu cầu motion của người dùng.
Hold sau hành động vẫn cần thiết. Đoạn người nói/evidence có thể giữ ổn định khi nội dung cần đọc/cảm xúc.

Không biến yêu cầu motion thành một vòng float liên tục. Motion chính thể hiện quan hệ hoặc biến đổi theo câu nói,
secondary motion tạo sức sống và trọng lượng, settle cho người xem hiểu kết quả. Giữ hierarchy giữa ba phần này.

## 5. Profile chuyển động có cấu hình

Đặt tên theo vai trò: paper-slide, paper-fold, light-response, weight-impact, attached-flow, character-act.
Lưu duration/response theo time và amplitude theo tỷ lệ stage/actor, tránh hard-code frame/pixel episode.
Source Scene4 có spring `{mass:0.6,damping:12,stiffness:180}` và recoil tắt dần theo click; đó là reference
source cho tuning, không preset đã được chứng nhận cho mọi scale/material.

Motion một vật có thể gồm root travel + local tilt + part lag + contact response. Hợp nhất transform qua wrappers;
đừng để entrance ghi đè action hoặc exit xóa kết quả trước khi đọc. Camera hỗ trợ rõ hướng, không lắc theo mọi va chạm.

## 6. Lộ trình tái dùng

1. Rà caller/theme/API của component nguồn, giữ code cũ và sửa dở nguyên trạng.
2. Xây adapter/phiên bản chung nhỏ chỉ khi cảnh mới cần; chưa relocate cả `common.tsx`.
3. Tách cue semantics khỏi frame riêng episode và text riêng.
4. Kiểm numeric continuity/contact trước duyệt; visual/temporal sau render được duyệt.
5. Ghi evidence và catalog; reuse cơ chế đã kiểm ở video sau với tạo hình/diễn xuất mới.
