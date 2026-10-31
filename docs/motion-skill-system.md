# Bộ skill video — motion paper và tương tác vật lý

Đã tích hợp ngày 28/10/2026 từ đề xuất V2 và rà đồng bộ toàn bộ 13 skill trong repo.
Đây là hướng dẫn vận hành và thiết kế đã kích hoạt. Runtime mới chỉ được gọi khi tool/component thực sự tồn tại;
chưa có video pilot trong lần cập nhật skill này để xác nhận mức tự động hóa 90–100%.

## Khi gửi một raw

Chỉ định hoặc đính kèm raw cần dựng và yêu cầu xử lý. AI dùng
[ai-video-pipeline](../.agents/skills/ai-video-pipeline/SKILL.md) để tự tiếp nhận trong quyền được phép,
giữ voice và ý nghĩa, tạo transcript/timeline, thiết kế/code motion, static/audio QA rồi gửi hồ sơ duyệt.
Không cần chọn font, màu hoặc mô tả từng cảnh nếu context đã đủ. Raw riêng tư được xử lý local theo quyền đã cho.

Điểm dừng mặc định là `READY_FOR_APPROVAL`. Chỉ sau khi bạn duyệt render rõ project/version trong chat,
AI mới render và kiểm output. Duyệt bộ skill không thay thế duyệt video.

## Quy tắc thiết kế chính

- Graphic beat có motion chính diễn đạt quan hệ/biến đổi theo lời nói; hold là pha để đọc kết quả.
- Tiếp nối paper trước: nền `#FAF8F5`, ink `#1A1816`, cam đất `#C6532A`, Fraunces/Inter,
  chất liệu/bóng/nét và grammar motion nhất quán. Brief khác theo lựa chọn của bạn có thể đổi profile.
- Card có hành động hợp lý: nhường chỗ, xếp hàng, bị chặn, mở/gập, kéo, gộp, phân loại hoặc chuyển state.
- Chủ động thiết kế nhân vật có vai diễn hữu ích và có thể dựng rõ; có parts/pivots/anchors để tương tác thật.
- Tiếp xúc trước phản ứng; giữ tải/điểm nắm khi constraint còn; release trước hồi. Chất liệu quyết định biến dạng.
- Dùng lại reveal/slide/flip/radial/stamp/conduit/cursor và cơ chế đã kiểm, phát triển actor/tình huống/dàn cảnh mới.
- Giữ hình dễ đọc; không bịa số, ép mascot hoặc thêm glow/shake/float/SFX lên mọi vật.

## Bản đồ skill

| Công việc | Skill chính | Khi đọc thêm |
| --- | --- | --- |
| Nhận raw, điều phối, timeline, QA, approval | [ai-video-pipeline](../.agents/skills/ai-video-pipeline/SKILL.md) | [Raw-first](../.agents/skills/ai-video-pipeline/references/raw-first-workflow.md), [QA](../.agents/skills/ai-video-pipeline/references/quality-and-acceptance.md) |
| Voice thật, ASR uncertainty, source/edit clocks | [audio-speech-alignment](../.agents/skills/audio-speech-alignment/SKILL.md) | TTS chỉ khi cần và được yêu cầu |
| Chọn visual, art direction, nhịp kể | [creative-video-direction](../.agents/skills/creative-video-direction/SKILL.md) | [Chọn visual](../.agents/skills/creative-video-direction/references/editorial-selection.md), [Design memory](../.agents/skills/creative-video-direction/references/design-memory.md) |
| Thiết kế motion, dùng cơ chế từ video trước | [motion-graphic-design](../.agents/skills/motion-graphic-design/SKILL.md) | [Paper continuity](../.agents/skills/motion-graphic-design/references/paper-motion-continuity.md) |
| Biên đạo tương tác card/vật/nhân vật | [physical-interaction-direction](../.agents/skills/physical-interaction-direction/SKILL.md) | [Recipes](../.agents/skills/physical-interaction-direction/references/interaction-recipes.md), [Physics](../.agents/skills/physical-interaction-direction/references/physical-dynamics.md), [Frame-driven](../.agents/skills/physical-interaction-direction/references/frame-driven-motion.md) |
| Tạo silhouette, parts và rig để diễn | [character-and-object-design](../.agents/skills/character-and-object-design/SKILL.md) | [Rig/material](../.agents/skills/character-and-object-design/references/rig-and-material.md), [Actor performance](../.agents/skills/character-and-object-design/references/actor-performance.md) |
| Art direction paper | [visual-paper-editorial](../.agents/skills/visual-paper-editorial/SKILL.md) | Khi dùng paper profile |
| Ranking/tier board | [tier-list-ranking-video](../.agents/skills/tier-list-ranking-video/SKILL.md) | Chỉ khi nội dung là ranking |
| Hệ collage | [visual-vox-collage](../.agents/skills/visual-vox-collage/SKILL.md) | Chỉ khi chọn collage; jitter là tùy chọn |
| Quay web/dẫn mắt trong demo | [screen-recording-motion](../.agents/skills/screen-recording-motion/SKILL.md) | Capture thật hoặc mockup có nhãn rõ |
| Fact/evidence/asset | [research-and-asset-sourcing](../.agents/skills/research-and-asset-sourcing/SKILL.md) | Nguồn ngoài chỉ khi giúp ý |
| Xử lý cutout/alpha/material | [cutout-image-processing](../.agents/skills/cutout-image-processing/SKILL.md) | Không áp halftone/viền rách lên mọi ảnh |
| Tự nghiên cứu, tải, dependency và học | [autonomous-skill-and-asset-evolution](../.agents/skills/autonomous-skill-and-asset-evolution/SKILL.md) | Low-risk tự làm; tôn trọng quyền, chi phí và cổng render |

Không nạp toàn bộ reference cho một sửa nhỏ. Đọc entrypoint và đúng reference theo nhu cầu cảnh.
Một file raw chỉ khởi động một project; metadata lịch sử có thể tra nhưng không mở media cũ bị hạn chế.

## Runtime và Catalog cơ chế đã kích hoạt

Runtime code dùng chung đã được triển khai, typecheck và kiểm thử độc lập:
- **`src/motion/`**: `core.ts` (analytic damped spring, pose math, bounds, world transform, anchors), `paper.ts` (paper springs, entrance, fold, recoil), `validate.ts` (numeric QA 120Hz + event boundaries).
- **`src/interactions/`**:
  - `pressAt`: tiếp cận -> va chạm -> đè lún (bulge + scale deformation) -> giữ tải -> nhấc tải -> hồi đàn hồi (spring).
  - `pullAt`: tay với tới -> chốt điểm bám (grip) -> kéo tải -> nhả tải -> ma sát trượt giảm tốc (friction slide) -> dừng ổn định.
  - `swallowAt`: mở miệng -> tiếp cận môi phải -> cắn/tiếp xúc -> nuốt vào bụng qua SVG clipPath mask -> ngậm miệng ổn định.
  - `cardAt`: `move`, `select` (recoil wobble), `block`, `approve`, `expand` (dãn ngang với counter-scale text để giữ typography rõ ràng).
  - `queueAt`: vật phía trước rời đi kích hoạt các card sau tiến bước đồng loạt theo authored slot spacing.
  - `gripAt`: cố định anchor của rig vào toạ độ bàn tay/người kéo mà không làm biến dạng phép quay/tỷ lệ.
  - Component Remotion: `PaperInteraction`, `PaperCard`, `PaperJawActor`, `MotionLayer`, `RawFootage`.
- **`pipeline/cli.py`**: CLI chuẩn bị và kiểm tra tự động trước duyệt (`capabilities`, `intake`, `prepare`, `qa`, `status`). Không có cờ render hoặc tự động duyệt ngầm.

## Quy trình khi gửi video raw mới (Raw-First)

Khi người dùng cung cấp một video raw:
1. **Intake**: Chạy `python pipeline/cli.py intake --raw <path> --slug <name> --allow-media`. Đăng ký raw bất biến, tính hash và khóa nguồn read-only.
2. **Prepare**: Chạy `python pipeline/cli.py prepare --project videos/<name>`. Lệnh tự động trích transcript (Faster-Whisper local), dựng timeline chuẩn (`edit/timeline.json`), giải quyết cues ngữ nghĩa, đo đạc audio spans, gắn source vào Remotion public directory và tạo scaffold `edit/scenes.json` cùng `edit/creative-brief.md`. Trạng thái chuyển sang `NEEDS_CREATIVE_WORK`.
3. **Authoring (Agent tự lập trình)**: Agent đọc `script.md`, `timing.txt`, `scenes.json`, dùng token hệ paper (`#FAF8F5`, `#1A1816`, `#C6532A`, Fraunces, Inter) và các cơ chế tương tác trong `src/interactions/` và `src/motion/` để viết scene components.
4. **Static & Motion QA**: Chạy `python pipeline/cli.py qa --project videos/<name> --typecheck`. Chạy typecheck và kiểm tra 120Hz numeric motion bounds/contacts, timing bounds, audio levels và design history.
5. **Approval Packet**: Khi vượt qua QA, hệ thống đóng gói hồ sơ `READY_FOR_APPROVAL`. Agent báo cáo cho người dùng bản tóm tắt và dừng lại chờ duyệt.
6. **Cổng Render duy nhất**: TUYỆT ĐỐI không render cho đến khi người dùng phê duyệt rõ ràng project và version cụ thể trong chat.

## Phần đã kiểm chứng và giới hạn còn lại

- **Đã kiểm chứng**: 14/14 test motion QA độc lập, 13/13 test pipeline Python, 0 lỗi TypeScript `tsc --noEmit`, Faster-Whisper local medium model, FFmpeg/FFprobe và Node v24.11.1 direct TS execution.
- **Giới hạn còn lại**:
  - QA trước duyệt là kiểm tra hình học số (numeric), timing, audio spans và typecheck; chất lượng hình ảnh cuối và cảm giác thị giác chỉ kiểm chứng được qua `review.png` sau khi có lệnh render được duyệt.
  - Scaffold sinh ra để hướng dẫn agent authoring, không phải video hoàn thiện; agent bắt buộc phải sáng tạo motion theo nội dung raw cụ thể.

Nguồn và hồ sơ tích hợp: [nghiên cứu V2](proposals/raw-to-motion-2026-10-28/research.md),
[báo cáo áp dụng](proposals/raw-to-motion-2026-10-28/application-report.md).
