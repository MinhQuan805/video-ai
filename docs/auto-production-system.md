# Video pipeline — mục tiêu giảm thao tác 90%, cần kiểm chứng

Bộ skill đang dùng và bản đồ chọn reference: [motion-skill-system.md](motion-skill-system.md).

## Mục tiêu

Người dùng đặt một file raw vào video project. Pipeline tự nhận dạng đầu vào là footage có hình/tiếng,
voiceover/audio, hoặc cả hai; phân tích, thiết kế một hướng hình ảnh riêng cho nội dung, chuẩn bị timeline,
asset, motion, QA và bộ hồ sơ đầu ra. Pipeline dừng ở bản **ready-for-approval**. Chỉ render khi người dùng
duyệt rõ ràng trong chat.

“90%” là mục tiêu giảm thao tác, không phải cam kết rằng mọi raw đều có thể hoàn thành không cần đầu vào.
Nếu thiếu quyền sử dụng, nội dung nguồn riêng tư, có chi phí, không nghe/đọc được hoặc có lựa chọn sáng tạo
ảnh hưởng lớn mà không thể suy ra, tạo một blocker ngắn và tiếp tục mọi phần độc lập.

## Thư mục đích

```text
video-ai/
├── pipeline/                         # Runtime dùng chung; chỉ chứa workflow/tool tái sử dụng
│   ├── intake/                       # Nhận file, nhận dạng loại raw, probe media
│   ├── audio/                        # Transcript, alignment, loudness, silence, clipping
│   ├── timing/                       # Canonical timeline, captions, scene/cue derivation
│   ├── creative/                     # Creative brief, visual selection, motion planning
│   ├── assets/                       # Tìm/tải/cache/attribution nguồn mở
│   ├── qa/                            # Static checks, image/audio/video QA
│   ├── packaging/                    # Manifest, subtitles, thumbnail, delivery bundle
│   └── cli.py                        # CLI tiền kỳ: capabilities, intake, prepare, qa, status
├── src/                               # Component và motion system dùng chung, đã được tuyển chọn
├── videos/
│   ├── _inbox/                        # File raw mới; mỗi lần chỉ nhận một project đang chạy
│   └── <video-name>/
│       ├── input/                     # raw.* bất biến, optional brief.md / reference files
│       ├── analysis/                  # probe.json, transcript draft, shot map, audio report
│       ├── research/                  # fact sheet, source log, creative brief
│       ├── assets/
│       │   ├── source/                # Nguồn raw tải về + thông tin attribution
│       │   ├── generated/             # Hình/code-generated chỉ cho project này
│       │   └── processed/             # Cutout, crop, proxy, cache project-local
│       ├── edit/
│       │   ├── timeline.json          # Nguồn chuẩn của mọi thời gian và cue
│       │   ├── captions.json          # Xuất từ timeline; không chỉnh tay độc lập
│       │   ├── scenes.json            # Visual plan và component props theo scene
│       │   ├── transitions.json       # Chuyển cảnh do creative plan quyết định
│       │   └── creative-brief.md      # Concept, nhịp, palette, visual rationale
│       ├── src/                       # Chỉ component/scene riêng của video này
│       ├── tools/                     # Helper chỉ dùng cho video này; không đưa tool dùng chung vào đây
│       ├── qa/                        # Reports, contact sheets sau khi render được duyệt, fix log
│       ├── snapshots/<run-id>/        # Manifest/config/source hashes, không nhân bản raw media
│       ├── learning.md                # Điều đã xác minh, component tái dùng, đề xuất skill
│       ├── image-sources.md           # Nguồn và license của asset tải về độc lập
│       ├── delivery/                  # Sau khi duyệt/render: video, captions, thumbnail, manifest
│       └── output/                    # Preview/review theo convention hiện tại của project
└── archive/                           # Tool cũ chưa rõ chủ: chỉ đưa vào sau khi kiểm tra tham chiếu
```

`pipeline/` giữ một nguồn thực thi chung. `videos/<name>/tools/` chỉ dành cho code thực sự phụ thuộc project.
Không tạo bản sao mỗi tool chung cho mỗi video. Raw input được bảo toàn; output dựng lại được đặt theo run ID.

## Luồng thực thi

### A. Intake — tự động

1. Nhận tối đa một project từ `_inbox`; tạo slug và project scaffold.
2. Xác định file là video có footage, audio/voice, hay cả hai bằng metadata và stream inspection.
3. Kiểm tra codec, duration, frame size/rate, audio streams, rotation, file integrity, duplicate hash.
4. Chép/đăng ký raw vào `input/`, tính hash và khóa nguồn read-only theo quy ước; không đổi tên/mã hóa đè file gốc.
5. Tạo `analysis/probe.json`, run ID và snapshot manifest.

### B. Audio và timing — tự động

- Trích audio/proxy vào cache project-local; không sửa raw.
- Có script: dùng script làm ground truth; voice khác nội dung script thì tạo discrepancy report.
- Không có script: transcript bằng ASR, đánh dấu từ/đoạn độ tin cậy thấp để review; không tự bịa phần không nghe rõ.
- Forced alignment tạo word timestamps; silence, loudness và clipping là tín hiệu để đề xuất chỉnh âm.
- Nếu có footage, tìm shot boundary, khoảng lặng, câu/ý chính và đoạn có chuyển động hữu ích.
- `edit/timeline.json` là nguồn chuẩn: duration, transcript spans, sentence/word cues, scene in/out,
  animation events, transition windows, caption ranges và soundtrack ducking. `timing.txt`, `captions.json`,
  `sentences.json` và các scene timings được sinh từ timeline, không làm nguồn thời gian song song.
- Dùng milliseconds làm canonical clock; frames chỉ là projection theo `fps` trong project config. Mỗi event có
  `id`, `startMs`, `endMs` hoặc `anchorId` (sentence/phrase/word), `sourceHash` và `confidence` khi timing đến từ ASR.
  Motion/transitions ưu tiên neo vào anchor ngữ nghĩa; frame tuyệt đối dành cho keyframe nội bộ của hiệu ứng.
- Thay script/voice sẽ đánh dấu dependency theo hash. Tái tạo đúng các span bị ảnh hưởng; không ghi đè creative
  override không liên quan. Khi voice mới đổi duration, dời scene/caption/cue theo anchor transcript rồi kiểm tra
  transition và tổng thời lượng.

Ví dụ shape rút gọn:

```json
{
  "schemaVersion": 1,
  "fps": 30,
  "durationMs": 18420,
  "sources": { "rawSha256": "...", "transcriptSha256": "...", "voiceSha256": "..." },
  "words": [{ "id": "w-001", "text": "Ví dụ", "startMs": 120, "endMs": 480, "confidence": 0.97 }],
  "scenes": [{ "id": "scene-01", "startMs": 0, "endMs": 4200, "anchorStart": "sentence-01", "anchorEnd": "sentence-02" }],
  "cues": [{ "id": "cue-01", "anchorId": "phrase-04", "kind": "entrance", "motion": "custom-component" }],
  "transitions": [{ "id": "transition-01", "anchorId": "scene-02", "durationMs": 360 }]
}
```

### C. Creative direction — chọn theo ngữ cảnh

Mỗi project tạo creative brief ngắn: premise, cảm xúc, nhịp, visual metaphor, palette, medium, typography,
audio approach và 2–3 motif chuyển động. Chọn từng scene theo ý nghĩa và nhịp kể chuyện.

- Chọn component/style đã có khi nó giúp ý tưởng rõ và đẹp hơn.
- Tải ảnh/video/icon làm asset độc lập khi tư liệu xác thực/đặc thù tăng giá trị kể chuyện; kiểm tra license của các asset tải về.
- Tự do tìm/chụp screenshot hoặc frame công khai phục vụ nghiên cứu/minh họa, không bắt buộc kiểm tra license hay ghi nguồn vào `image-sources.md`.
- Tạo motion graphic/component mới khi biểu đồ, hình khối, chữ, map, collage hoặc UI tự dựng diễn đạt tốt hơn.
- Có thể phối nhiều chất liệu trong một video nếu phục vụ nhịp và narrative; không áp một visual system mặc định.
- Không tải asset cho đủ số lượng. Ưu tiên một visual có chủ đích, cache/reuse và art direction nhất quán.
- Asset tải về độc lập phải có source, tác giả, license, ngày truy cập và cảnh dùng trong `image-sources.md`; screenshot/frame nghiên cứu được miễn bảng ghi nguồn.

Output là `creative-brief.md`, `scenes.json`, `transitions.json`, project-local `src/` và asset plan.

### D. Dựng và QA trước duyệt — tự động, không render video

- Kiểm tra cấu trúc JSON, duration math, timestamp order, caption/source mapping, file/asset paths,
  dependency availability, component props, TypeScript/lint và phạm vi scene.
- Kiểm tra hình tĩnh từ source/asset: resolution, aspect ratio, alpha, blur/near-black/duplicate và crop safety.
- Phân tích audio waveform: silence bất thường, peak/clipping, loudness range và nhạc/voice overlap.
- Chỉ normalize theo profile đầu ra đã chọn; đo integrated loudness/true peak, kiểm clipping và voice/music balance.
  Silence được đánh dấu so với khoảng nghỉ ngôn ngữ, không tự cắt pause có ý đồ. Sửa gain/limiter trên derived audio,
  giữ raw nguyên vẹn và lưu thông số xử lý trong manifest.
- Kiểm tra caption geometry dựa trên font metrics, canvas/safe-zone profiles 9:16, 16:9 và 1:1.
- QA liên quan tới pixel thực tế (caption collision, frame đen, visual emptiness sau animation) chỉ kết luận sau
  khi có frame render. Trước duyệt chỉ ghi là “chưa xác minh bằng render”, không tự tạo video ngầm.
- Tối đa hai vòng sửa tự động cho lỗi có thể suy ra chắc chắn; giữ fix log và tránh thay concept ngoài phạm vi.

### E. Approval gate và render

Trước duyệt, đóng gói `approval packet`: creative brief, scene/timing summary, report license cho asset tải về độc lập, audio QA,
static QA, unresolved items, dự kiến tỷ lệ/kích thước/thời gian render. Trạng thái là `READY_FOR_APPROVAL`.

Chỉ thực hiện Remotion render sau khi người dùng nói rõ trong chat rằng họ duyệt render cho project/version cụ thể.
Tin nhắn “xem thử”, “làm tiếp”, duyệt script hoặc duyệt concept không phải duyệt render. Ghi version được duyệt
trong manifest trước khi render; không render lại vô cớ. Sau render, chạy QA pixel/audio/video, xem `review.png`
đúng một lần, sửa tối đa hai vòng rồi trình kết quả. Nếu cần render lại, xin duyệt phiên bản thay đổi nếu khác
đáng kể nội dung hoặc chi phí.

### F. Đóng gói đầu ra

Sau khi render được duyệt, tạo thư mục delivery có cấu trúc:

```text
delivery/<version>/
├── master.mp4
├── captions.srt
├── captions.vtt
├── thumbnail.png
├── image-sources.md
├── manifest.json
├── qa-report.md
└── checksums.txt
```

Manifest gồm project/version, raw hash, timeline hash, thời lượng/kích thước/fps/audio format, subtitle language,
dependency versions, source/attribution refs, QA status và approval timestamp. Tạo thêm 9:16/16:9/1:1 hoặc
social metadata khi brief/yêu cầu nền tảng nói cần; mặc định không xuất nhiều bản không dùng đến. Không upload,
publish hoặc gửi sang dịch vụ ngoài.

## Học hỏi sau project

Sau mỗi video, cập nhật `learning.md` với lỗi, root cause, cách sửa, kết quả kiểm chứng, component/recipe tái dùng.
Đề xuất thay đổi `.agents/skills/` chỉ khi kiến thức tái diễn hoặc có nguồn/test chứng minh; giữ diff nhỏ và nêu
phạm vi áp dụng. Không học từ suy đoán, một lần thất bại chưa giải thích được, hoặc nội dung untrusted từ web.

## Snapshot và rollback

Mỗi run lưu manifest bất biến: hashes của input/config/timeline/source, tool versions, timestamps, stage status,
asset list, chosen creative direction, QA findings và output refs. Không snapshot lại file raw/media nặng nếu hash
đủ nhận dạng. Giữ snapshot trước thay đổi lớn; rollback bằng cách chọn manifest/version trước đó và tái tạo
derived outputs, không ghi đè input hoặc xóa lịch sử. `delivery/<version>` được coi là bản tốt đã duyệt.

## Tổ chức tool trong repo

Tool dùng chung được nhóm theo chức năng trong `pipeline/<stage>/`; tool phụ thuộc nội dung/composition của một video
nằm trong `videos/<slug>/tools/`. Bảng dưới ghi lại nơi đặt các script đã được rà và chuyển:

| Nhóm script | Vị trí hiện tại | Ghi chú |
| --- | --- | --- |
| `cutout.py`, `fetch_media.py`, `fetch_fa_icon.py` | `pipeline/assets/` | Các lệnh dùng chung; `cutout.py` vẫn có batch Darwin cũ cần tách riêng về sau. |
| `web_capture.py`, `import_online_skill.py` | `pipeline/research/` | Browser capture và skill staging dùng chung. |
| `voice.py`, `trim_yap.py` | `pipeline/audio/` | Công cụ audio dùng chung, chạy trên input do người dùng chỉ định. |
| `screen_zoom.py` | `pipeline/timing/` | Sinh cue zoom/cursor cho video bất kỳ. |
| `render_filmstrip.mjs` | `pipeline/qa/` | Renderer khung tĩnh dùng bởi QA helper riêng; không xuất video hoàn chỉnh. |
| `download_sources.py`, `fetch_commons_images.py`, `generate_timing.py`, `make_filmstrip.py`, `make_review_grid.py`, `prepare_map.py`, `read_script.py`, `transcribe.py`, `render_video.mjs` | `videos/vox/darwin/tools/` | Các script hiện có default hoặc đường dẫn cụ thể Darwin; renderer cũng đang ghi output Darwin. |
| `align_ranking_video.py`, `build_ranking_scenes.py`, `generate_karaoke_captions.py`, `generate_ranking_scenes.py`, `make_ranking_review_grid.py`, `retime_ranking_video.py` | `videos/ranking/10-23-26/tools/` | Input/output và composition hard-code cho episode 10-23. |
| `make_1025_review_grid.py` | `videos/ranking/10-25-26/tools/` | Review grid gọi composition và output episode 10-25. |
| `prepare_paper_data.py` | `videos/paper/10-26-26/tools/` | Ghi trực tiếp dữ liệu của episode paper cụ thể. |
| `build_captions_json.py` | Đã xóa | Không có caller; sinh schema `captions` cũ trong khi consumer hiện tại đọc `phrases` từ file theo episode. |

Các file chuyển vẫn giữ nội dung và thay đổi đang có. Script `build_captions_json.py` được xóa vì không có caller
trong repo và sinh schema captions cũ mà component hiện tại không đọc.

- Tool mới dùng chung → `pipeline/<stage>/`; helper video mới → đúng `videos/<slug>/tools/`.
- Trước khi xóa script cũ, tìm caller trong code/tài liệu và xác nhận không chứa danh sách nguồn hoặc cấu hình
  độc nhất. Xóa theo từng thay đổi nhỏ có thể review.

Không để lại bản wrapper cũ chỉ để giữ đường dẫn legacy trừ khi còn consumer ngoài repo đã xác nhận.



## Quy trình skill đã tích hợp: raw-first và thiết kế motion có chủ đích

Các skill và reference dưới đây đã được tích hợp và đồng bộ với runtime:
- pipeline/cli.py đã triển khai và kiểm thử các lệnh capabilities, intake, prepare, qa, status.
- src/motion/ và src/interactions/ đã triển khai bộ tính toán lò xo phân tích, hình học actor bounds, va chạm tiếp xúc và các cơ chế tương tác (press, pull, swallow, card queue/recoil).
- Pipeline dừng tự động ở READY_FOR_APPROVAL. Cổng render được khóa chặt cho đến khi người dùng duyệt rõ ràng trong chat.

- Workflow raw, source/edit clock, permission và resume:
  [raw-first-workflow](../.agents/skills/ai-video-pipeline/references/raw-first-workflow.md).
- Chọn người nói/card/evidence/chart/ẩn dụ, art direction và anti-slop:
  [editorial-selection](../.agents/skills/creative-video-direction/references/editorial-selection.md).
- Tương tác card, lực, ăn/đè và state:
  [physical-interaction-direction](../.agents/skills/physical-interaction-direction/SKILL.md).
- Vật thể phân lớp có thể diễn khi phù hợp:
  [character-and-object-design](../.agents/skills/character-and-object-design/SKILL.md).
- Novelty, history và promotion cơ chế:
  [design-memory](../.agents/skills/creative-video-direction/references/design-memory.md).
- QA trước/sau duyệt và đo phần việc thủ công:
  [quality-and-acceptance](../.agents/skills/ai-video-pipeline/references/quality-and-acceptance.md).

### Mức tự động hóa thực tế

Đếm intervention, thời gian tham gia, lỗi nghĩa/timing và rework trên project thật. Chưa có baseline thì chưa
báo đã đạt 90–100%. Skill không thay cho runtime hay bằng chứng chất lượng. Quy trình tự động dừng ở
READY_FOR_APPROVAL trước render, giữ riêng cổng duyệt và quyền media trong AGENTS.md.

Mặc định giữ giọng raw và lập luận; TTS, đổi script/hook/ending không tự chạy vì đã có template. Một video
được phép chỉ dùng card hoặc người nói khi đó là lựa chọn rõ nhất. Mỗi đồ vật, con vật, headline, chuyển động
và SFX đều cần vai trò trong câu chuyện. Không có quota visual system hay hiệu ứng.

### Motion-led continuation của hướng paper hiện tại

Theo yêu cầu đang có, mỗi graphic beat cần một primary motion diễn đạt ý và quan hệ, không chỉ fade một
slide tĩnh. Hold là pha để đọc sau/giữa hành động; các đoạn người nói/evidence vẫn có thể ổn định.
Dùng [paper-motion-continuity](../.agents/skills/motion-graphic-design/references/paper-motion-continuity.md)
để kế thừa token/font/material và các motion có trong code dự án trước, đồng thời tạo actor/dàn cảnh mới.
Nghiên cứu [physical-dynamics](../.agents/skills/physical-interaction-direction/references/physical-dynamics.md)
trước các cảnh contact/force/hinge/ma sát phức tạp. Chủ động thiết kế nhân vật có thể diễn khi có vai hành động
phù hợp theo [actor-performance](../.agents/skills/character-and-object-design/references/actor-performance.md).
