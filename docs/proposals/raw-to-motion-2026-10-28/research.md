# Nghiên cứu nguồn và giới hạn kết luận

Ngày kiểm tra: 28/10/2026. Ưu tiên tài liệu tác giả/nhà phát triển. Không tải hay kích hoạt skill bên thứ ba.
Các recipe thiết kế trong bộ này do ta tổng hợp cho workflow này; chúng chưa được chứng minh trên video pilot.

| Nguồn chính thức | Điều nguồn xác nhận | Quyết định đề xuất của ta |
| --- | --- | --- |
| [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills) | Có skill về markup, timing, media, captions và công việc video bằng agent | Giữ bộ kỹ thuật chính thức; thêm lớp chỉ đạo riêng cho repo |
| [Remotion Flickering](https://www.remotion.dev/docs/flickering) | Renderer có thể xử lý frame không theo thứ tự, nhiều tab không chung state | Pose phải xác định từ frame/config hoặc track đã tính trước |
| [Remotion spring](https://www.remotion.dev/docs/spring) | Spring là primitive vật lý có tham số | Dùng cho phần chuyển động phù hợp; contact và choreography vẫn cần thiết kế |
| [Remotion measureText](https://www.remotion.dev/docs/layout-utils/measure-text) | Đo kích thước text trong browser | Kiểm geometry khi font đã load; không gọi API này như phép đo Node thuần |
| [Remotion TransitionSeries](https://www.remotion.dev/docs/transitions/transitionseries) | Transition làm hai cảnh overlap và rút tổng thời lượng; overlay không rút | Kiểm timeline math, source time map và audio sync |
| [Matter.Engine](https://brm.io/matter-js/docs/classes/Engine.html) | Có bước mô phỏng delta và sự kiện collision | Adapter tính trước fixed-step chỉ khi cảnh nhiều va chạm cần nó |
| [Rive Features](https://rive.app/features) | Có bones, meshes, constraints, clipping và draw order | Tham khảo cách tổ chức rig; SVG phân lớp đủ cho nhiều cảnh đơn giản |
| [Remotion Lottie](https://www.remotion.dev/docs/lottie/lottie) | Có thể phát Lottie trong composition | Dùng asset hợp phong cách và quyền dùng, không ép thay toàn bộ pipeline |
| [Apple Motion](https://developer.apple.com/design/human-interface-guidelines/motion) | Khuyến khích motion có mục đích, feedback hợp kỳ vọng và tránh gây phân tâm | Vận dụng sang video như heuristic, không sao chép thông số UI làm luật video |
| [Faster-Whisper source](https://github.com/SYSTRAN/faster-whisper/blob/master/faster_whisper/transcribe.py) | Có word timestamps và VAD với các tùy chọn | Timestamp ASR là ước lượng; lưu confidence và xử lý điểm chưa chắc |
| [HyperFrames create](https://www.hyperframes.dev/create) | Hướng dẫn skill/khởi tạo video qua agent; trang open trực tiếp bị redirect không đọc được trong lần kiểm | Chỉ xem như phương án thay engine; không khẳng định tính năng nâng cao chưa xác minh |

Material 3 trả trang cần JavaScript, và một URL Rive constraints không đọc được; không dùng chúng làm bằng chứng chi tiết.
Không đánh giá chất lượng theo demo Reddit, star GitHub hay lời quảng cáo. Không có benchmark của repo chứng minh
bộ skill nào tự tạo mọi video đẹp hoặc bảo đảm retention/90–100% tự động.

## Rà repo

- Có Remotion, React, Font Awesome, Lottie, motion blur và transitions trong `package.json`.
- Có script audio, asset, web capture và QA, nhưng một số helper hard-code episode.
- `pipeline/cli.py` được mô tả trong tài liệu mục tiêu nhưng chưa có trong inventory đã rà.
- Chưa thấy một thư viện runtime dùng chung chuyên cho eat/press/contact hoặc registry thiết kế được chuẩn hóa.
- Skill cũ có những chỉ dẫn cần sửa: cấm card, mọi phần phải float, đổi archetype mỗi cảnh, fade 8 frame bắt buộc,
  hook/cliffhanger áp cho mọi raw, dùng helper episode cũ, và paper runbook render grid trước approval.
- Hai skill creative/paper và nhiều scene đang có thay đổi dang dở từ trước; proposal lấy baseline working tree,
  không reset hoặc sửa chúng.

## Kết luận được phép rút ra

Nền kỹ thuật đã đủ để bắt đầu dựng motion bằng code. Khoảng trống lớn là quyết định thiết kế, mô hình tương tác,
provenance thời gian, QA và học có bằng chứng. Ưu tiên lấp khoảng trống này; cài thêm engine không tự giải quyết nó.
Đây là đánh giá kỹ thuật dựa trên inventory và tài liệu, chưa phải chứng nhận năng lực end-to-end đã chạy.

## Bổ sung V2: nghiên cứu vật lý và animation

| Nguồn chính thức | Điều đã đối chiếu | Ứng dụng đề xuất |
| --- | --- | --- |
| [Box2D Simulation](https://box2d.org/documentation/md_simulation.html) | Fixed timestep, contact, friction/restitution và khác biệt contact ứng viên với shape chạm | Dùng để chọn kiểm contact/substep, không đồng nhất AABB overlap với contact nhìn thấy |
| [Matter.Body](https://brm.io/matter-js/docs/classes/Body.html) | Properties về mass/inertia, friction và restitution | Phân biệt vật liệu, tải và rigid body; không coi spring UI là solver |
| [Matter.Constraint](https://brm.io/matter-js/docs/classes/Constraint.html) | Ràng buộc khoảng cách, stiffness, damping và cách tạo pin constraint | Thiết kế attach/grip/hinge; không suy rigid constraint tự tạo soft-body hoặc IK |
| [Adobe animation principles](https://www.adobe.com/creativecloud/animation/discover/principles-of-animation.html) | Anticipation, squash/stretch, staging, follow-through và timing | Biên đạo intention/action/recovery, giữ readability cho card/actor paper |

Các mô hình toán và ứng dụng vào scene là tổng hợp kỹ thuật của đề xuất, không phải benchmark hoặc code solver
được chép từ các nguồn. Không cài package hay đọc media để kiểm nghiên cứu này.

## Rà project tham chiếu V2

Đã xác định cùng một video có input metadata tại `videos/paper/26-10-26-4-buoc-ai-agent/` và code tại
`src/videos/paper/26-10-26-ai-agent-4-buoc/`. Đã đọc script.md, timing.txt và scenes.json theo AGENTS.md.

- `src/visual-systems/paper/theme.ts`: palette paper/ink/terracotta, Fraunces + Inter, Vietnamese subsets.
- `scenes/common.tsx`: MaskReveal, Flip3DIn, RadialLaunch, SplitSlideIn, StampDropIn, cursor/ripple/conduit và RobotHero.
- `Scene4LocalAgent.tsx`: cursor waypoints và clickFrame dẫn file hop bằng dao động tắt dần.
- `Scene15PackageSkill.tsx`: agentTravelX và consume điều khiển card translate/scale/opacity.
- Một số wrapper clamp progress 0..1 nên không truyền nguyên overshoot spring vào transform; cần tách channel khi muốn bounce.
- RobotHero source được rà có mắt và antenna; không có jaw/mouth mask cho cơ chế nuốt. Hành động thu card hiện tại
  chưa được gọi là tương tác ăn có contact đã kiểm chứng.

Không mở words.json, sentences.json, WAV, MP4, node_modules hoặc review.png. Không kết luận hình cũ đẹp/mượt
hay có lỗi playback chỉ từ code. Rà source giúp xác định đúng thứ có thể dùng lại và chỗ cần phát triển.
