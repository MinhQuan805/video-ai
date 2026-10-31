# Kế hoạch runtime sau duyệt — chưa triển khai

V2 ưu tiên thiết kế và runtime motion trước các mở rộng sản xuất ít liên quan. Đọc
[physical-dynamics.md](draft/.agents/skills/physical-interaction-direction/references/physical-dynamics.md),
[paper-motion-continuity.md](draft/.agents/skills/motion-graphic-design/references/paper-motion-continuity.md) và
[actor-performance.md](draft/.agents/skills/character-and-object-design/references/actor-performance.md).

Skill là hướng dẫn quyết định. Để tự động hóa ổn định, cần tool và component có input/output, resume và QA rõ ràng.
Các đường dẫn, API và schema trong tài liệu này là **đích đề xuất**, không phải lệnh/thư viện đã tồn tại.

## 1. Kiến trúc tối thiểu

| Thành phần dự kiến | Trách nhiệm | Không gộp vào |
| --- | --- | --- |
| `pipeline/intake/register_raw.py` | Register path/hash/metadata và quyền nguồn | Không ASR, không sửa file raw |
| `pipeline/audio/transcribe_raw.py` | ASR local với model/version, uncertainty và cache | Không tự viết lại lời nói |
| `pipeline/timing/build_timeline.py` | Source/edit map và export consumer data | Không quyết định concept |
| `pipeline/creative/` | Brief, scene rationale, design history, component catalog | Không lưu tool riêng một episode |
| `pipeline/qa/validate_timeline.py` | Ranges, coverage, anchors, overlap và hashes | Không render |
| `pipeline/qa/validate_motion.py` | Pose/contact/safe bounds từ spec | Không tự chấm hình đẹp |
| `pipeline/packaging/` | Approval/delivery manifest, checksums, subtitles | Không publish hoặc tự kích render |
| `src/motion/` | Pose math, event projection, deterministic sampling | Không chứa script/palette riêng video |
| `src/interactions/` | Cơ chế tương tác đã kiểm chứng | Không hard-code mascot hoặc câu nói |
| `videos/<slug>/src/` | Scene/actor riêng theo folder contract | Không nhân bản toàn bộ tool chung |

Repo hiện còn consumer dưới `src/videos/...`; khi triển khai chọn convention thực dùng và nối rõ trong manifest.
Không di chuyển toàn bộ scene cũ để đạt sơ đồ mục tiêu. Helper cũ chỉ được tái dùng sau rà input/default/caller.

## 2. Trình điều phối

Đích `pipeline/cli.py` có thể điều phối prepare/resume/status/approve/render/package. Chưa gọi những lệnh này
trước khi file/API được thực thi và kiểm chứng. Mặc định prepare chỉ chạy đến READY_FOR_APPROVAL.
Render entrypoint kiểm approval thật gắn đúng project/version/hash; không chỉ tin `approved: true` được tạo bởi agent.
Ghi user message reference/text/time vào manifest trong chat có quyền; một config flag không thay thế lời duyệt.

Stage có input hashes, output refs, version, status, diagnostics và retry reason. Một stage chỉ có cache hit khi
hash/version/config tương thích. Lệnh dài đã chạy xong được dùng lại; không chạy lần hai để xem có “thật sự xong” không.
Không có CLI thì agent vẫn có thể làm từng stage được phép; phải báo đúng tool đã dùng, không giả vờ tự động hoàn chỉnh.

## 3. Schema project/timeline

Project config gồm schemaVersion, project/version/runId, raw path/hash, fps, canvas, language, source permissions,
art-direction ref, tool/model versions, edit policy và external-cost policy. Không đưa secret vào manifest.

Timeline gồm sources, source/edit spans, transcript anchors, scenes, cues, interactions, transitions và caption spans.
Một anchor sống xuyên retime bằng ID/semantic mapping; ID không còn sau sửa raw phải báo orphan, không dời bừa.
Caption/scene data theo legacy chỉ là exports. Không dùng filename episode cũ như tên schema chung.

## 4. API motion dự kiến

```typescript
type Vec2 = {x: number; y: number};
type Pose2D = {
  position: Vec2;
  rotationRad: number;
  scale: Vec2;
  opacity: number;
  state: string;
};
type MotionContext = {timeMs: number; fps: number; seed: string};
type Contact = {actorId: string; actorAnchor: string; targetId: string; targetAnchor: string};
// Interfaces đề xuất, chưa export từ repo:
// poseAt(context, interactionSpec, actorRig) -> Pose2D + named part poses
// worldAnchor(pose, rig, name) -> Vec2
// sampleTrack(track, timeMs) -> pose
// validateInteraction(spec, rig, timeline) -> findings
```

Chọn đơn vị/radian rõ; chuyển sang CSS/SVG ở render boundary. Cần mở rộng pose cho parts/mask/draw order khi có
nhu cầu thật, không xây một engine vạn năng trước pilot. Hàm thuần trả dữ liệu, component chỉ vẽ dữ liệu.

## 5. Thứ tự primitive nên làm

1. **Nền tảng**: shared event + anchor transform + guarded phase progress + easing/spring adapter + bounds.
2. **Card**: select/compare/queue/block/approve/expand. Giữ label, layout và trạng thái đúng.
3. **Force**: push/pull/contact/release/press. Deformation có cấu hình vật liệu và text policy.
4. **Creature nếu pilot cần**: jaw rig + mouth mask + bite/swallow + target constraints.
5. **Nâng cao khi có nhu cầu**: fixed-step physics, cloth/mesh, 3D hoặc adapter Rive/Lottie.

Trước bước 1, rà và dùng được các motion nguồn `MaskReveal`, `Flip3DIn`, `SplitSlideIn`, `RadialLaunch`,
`StampDropIn`, cursor và conduit của project paper; không rewrite một thư viện entrance mới tương đương.
Tách kênh progress để giữ overshoot khi cần, giữ clamp cho opacity/mask. Không di chuyển source đang sửa dở.
Bổ sung material profiles, contact begin/loaded/end, grip/hinge, friction/slide và motion-track adapter khi cảnh cần.
Thiết kế nhân vật không chờ “thư viện creature” hoàn chỉnh: build rig tối thiểu đủ diễn, theo actor-performance.

Mỗi primitive phải công bố: input props/events, state đầu/cuối, thời gian, vật liệu, bounds, limitations và evidence.
Không viết hết nếu video chưa cần; áp dụng thứ tự ưu tiên để có giá trị sớm và giảm code không được dùng.

## 6. State machine và biến đổi

Không dùng timer UI để chạy idle/approach/contact/release. State tại t được tính từ phase và event chung.
Actor bị attach theo parent anchor đến release; biến đổi root và local part không ghi đè nhau.
Nếu một card đổi nội dung khi được duyệt, state thay sau cue; giữ identity/position để người xem hiểu cùng card.

Không ép vật lý thật cho mọi thứ. Chuyển động tác giả thiết kế thường kiểm soát nhịp nói tốt hơn.
Nếu engine cần frame liên tiếp, bake thành motion track trước render. Track mang config/hash/tool version.

## 7. Validator và test cần thiết

Các test có giá trị hành vi: seek 70 → 10 → 70 cho cùng pose; contact khớp trong phase loaded;
card dưới không hồi trước release; caption/footage/cue vẫn khớp sau cắt; thay source hash làm approval stale;
render hook không chạy khi prepare/package. Test không chỉ so text trong SKILL.md.

Thêm hành vi physics: free-flight đến contact không tự phanh vô cớ; attached target theo anchor;
rope chỉ kéo khi đã căng; rotation/quãng đường khớp nếu nói lăn không trượt; channels elastic/opacity không
clamp chung; character grip/jaw/foot đúng frame và identity vẫn cùng paper world.

Các fixture phải là dữ liệu tổng hợp tự tạo, không đọc raw/words/sentences bị hạn chế. Test code thuần trước duyệt
không render. Font measurement cần browser/font thực, không kết luận fit bằng số ký tự.
Output thực sau duyệt mới dùng để đánh giá mask, stroke, sound sync và motion aesthetics.

## 8. Thử nghiệm trước công bố 90–100%

Pilot đầu chỉ một raw bạn chỉ định. Sau pilot, chọn thêm project khác lần lượt, không dựng đồng thời.
Nên có dữ liệu khác nhau: một đoạn chủ yếu card, một đoạn có tương tác, một đoạn chỉ cần người nói/evidence.
Ghi intervention, rework, missing capability và thời gian tham gia. Không ép mọi raw vào cùng length/style để đạt tỷ lệ đẹp.

Một thử nghiệm pass có nghĩa đúng phạm vi thử nghiệm, chưa chứng minh mọi raw tự động 100%.
Giai đoạn A kích hoạt skill không được ghi đã hoàn tất giai đoạn B–F.
