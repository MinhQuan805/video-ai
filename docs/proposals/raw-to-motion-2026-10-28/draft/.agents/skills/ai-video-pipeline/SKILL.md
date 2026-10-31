---
name: ai-video-pipeline
description: >-
  End-to-end master workflow for producing programmatic AI short-form videos (vertical/horizontal)
  using Remotion and Python. Use this skill when planning, creating, or editing any automated video
  across all pipeline stages: research & scripting, TTS synthesis, Whisper forced alignment,
  scene timing, asset preparation, visual system selection, QA review grid, and final rendering.
---

# Master AI Video Production Pipeline

This skill serves as the foundational runbook for producing high-quality, programmatic videos from uploaded raw footage, voice/audio, or both. Every video project lives in an isolated folder under `videos/<video-name>/`. The user prioritizes creative direction: choose sourcing, existing systems, or new custom motion graphics according to the story. Prepare automatically through a reviewable approval packet; never render a final video until the user explicitly approves that project/version in chat.

For the complete intake, timeline, QA, snapshot, packaging, and folder contract, follow [the auto production system](../../../docs/auto-production-system.md).

## Routing: raw footage first

When the user supplies raw footage, follow [raw-first-workflow.md](references/raw-first-workflow.md) before the
legacy TTS steps below. Preserve the recorded voice, meaning, and useful pauses. TTS is a separate opt-in path.
Check real tool availability; a documented directory/CLI is not proof of an implemented pipeline.
For new projects, canonical `edit/timeline.json` in milliseconds owns time; legacy files below are compatibility outputs.

Use [creative-video-direction](../creative-video-direction/SKILL.md) for selection, art direction and design memory.
Cards, clean typography, evidence, speaker footage, diagrams and custom objects are equally valid by context.
Use [physical-interaction-direction](../physical-interaction-direction/SKILL.md) when relationships need motion;
use [character-and-object-design](../character-and-object-design/SKILL.md) only when a custom object/creature helps.
There is no required card/mascot/effect quota. Apply [quality-and-acceptance.md](references/quality-and-acceptance.md)
for static/audio checks, honest pending statuses, render approval and temporal QA.

For the current motion-led paper continuation, each graphic beat records a primary action, cue, affected actors,
material/constraint response and readable end state. Reuse the previous project's motion grammar via
[paper-motion-continuity.md](../motion-graphic-design/references/paper-motion-continuity.md). A planned video
of static cards with only fades is insufficient. Design characters proactively when their actions serve the idea;
keep reading/speaker holds as deliberate phases of the overall rhythm.

---

## Architecture & Directory Conventions

For any video project `<video-name>`, all state, metadata, and artifacts must reside in:

```text
videos/<video-name>/
├── script.md            # Raw voiceover script, verified source links, word count
├── voice.wav            # Generated audio file
├── sentences.json       # Sentence-level timestamps (start, end)
├── words.json           # Word-level timestamps from Whisper forced alignment
├── timing.txt           # Natural phrase clusters (2-4 words) mapped to frame numbers
├── scenes.json          # Scene configuration, visual_system selector, keyframe events
├── image-sources.md     # Attribution for downloaded standalone assets; excludes research screenshots/frames
├── assets/              # Processed cutouts and illustration assets
└── output/              # Filmstrips, review.png grid, and final.mp4
```

---

## 7-Stage Production Runbook

### Stage 1: Preserve Raw or Draft an Authorized Script
1. **Source Verification**:
   - Verify factual claims that need evidence using primary/authoritative sources; cross-check disputed or consequential claims.
   - Do not demand sources for the creator's personal experience or invent evidence for uncertain claims.
   - Record all source URLs at the very top of `videos/<video-name>/script.md` prefixed with `#`.
2. **Script Formatting & Timing Budget**:
   - Write one sentence per line.
   - Use timing budgets only for a newly requested script; raw delivery determines timing for creator footage.
   - For a newly authored 30-second Vietnamese voiceover, 110–120 syllables is a rough planning estimate, not a raw-edit constraint.
   - **Opening**: Use a truthful point of interest already in the content; preserve meaning and useful context.
   - **Ending**: Deliver the promised takeaway. Add a question or CTA only when appropriate to the brief.
3. **Tone Validation**: Read aloud or verify conversationally—strip out stiff written phrasing in favor of natural storytelling.

---

### Stage 2: Raw Voice Analysis, or Opt-In Voice Synthesis
For raw, use the permitted source, ASR uncertainty and source/edit mapping in the raw-first reference.
The following synthesis steps apply only to authorized TTS work. ASR timestamps plus text reconciliation are
not a guarantee of exact forced alignment; record approximations and use a verified aligner if needed and available.
1. **TTS Audio Generation**:
   - Synthesize speech per line with a consistent pause (e.g., 0.28s) between sentences to maintain natural cadence.
   - Save output as `videos/<video-name>/voice.wav` and record sentence boundary timestamps in `sentences.json`.
2. **Forced Alignment with Faster-Whisper**:
   - Transcribe `voice.wav` using Faster-Whisper (`medium` model on CPU/GPU) in Vietnamese.
   - Reconcile Whisper's recognized tokens with the ground-truth text from `script.md`.
   - Never replace the script's exact wording; use Whisper solely to anchor starting second (`s`) and ending second (`e`) for each word.
   - For words with recognition discrepancies (e.g., foreign proper nouns or numerals), interpolate evenly between the closest anchored timestamps.
   - Enforce sentence boundaries using `sentences.json` so words never cross sentence boundaries.
   - Save output to `videos/<video-name>/words.json`.
3. **Natural Phrase Chunking**:
   - Cluster words into 2 to 4 words per group following natural linguistic pause points.
   - Calculate starting frame at 30 fps: $\text{frame} = \lfloor s \times 30 \rfloor$.
   - Output to `videos/<video-name>/timing.txt`: Line 1 = total video frames; subsequent lines = `<start_frame> <phrase text>`.

---

### Stage 3: Scene Decomposition & Timing Architecture
1. **Define `scenes.json`**:
   - Divide the video by idea and delivery, leaving enough time to read setup and payoff. Do not impose a minimum scene duration on every beat.
   - Prefer meaningful phrase/idea boundaries; gestures and evidence can motivate other cuts without cutting words or changing meaning.
   - For creator-led/raw footage, optionally set each scene's `coverage` to `speaker-full`, `split`, `graphic-center`, or a story-specific mode, and note the transition anchor (speech, gesture, sound, shape, or color). Select modes by meaning; do not force all modes into every video.
   - Declare the visual system at the root level:
     ```json
     {
       "visual_system": "cutout-collage" // or "paper", "kinetic-type", etc.
       "scenes": [ ... ]
     }
     ```
2. **Keyframe Mapping**:
   - Use semantic anchors and milliseconds in the canonical timeline; derive `from` and `to` frames for existing consumers at configured fps.
   - Mark words intended for typographic accenting between asterisks (`*từ nhấn*`).
   - List keyframe events matching exact speech milestones.

---

### Stage 4: Visual System Selection & Asset Processing
Choose a visual direction for each video from its story, source material, pacing, and intended audience; there is no mandatory default system:
* **`paper` (Paper Minimal Editorial)**:
  - Full-canvas motion graphics with tactile paper materiality (`#FAF8F5`, `#1A1816`, `#C6532A`) when it fits the story.
  - Spring-driven physical motion, reactive recoil micro-interactions, 3D card unfolds, and dynamic bezier conduits.
  - Official brand vector logos from `public/icon/` and Font Awesome vectors.
  - Refer to the master skill: [`visual-paper-editorial`](../visual-paper-editorial/SKILL.md).
* **`ranking` (Tier List & Commentary Style)**:
  - S/A/B/C/F tier boards with floating rank cards, talking-head webcam framing, and contextual hero motion graphics. Refer to [`tier-list-ranking-video`](../tier-list-ranking-video/SKILL.md).
* **`cutout-collage` (Vox Cutout Style - Secondary / Historical)**:
  - Investigative, documentary, historical collage with halftone screen printing and torn edges. Refer to [`visual-vox-collage`](../visual-vox-collage/SKILL.md).

For creator-led/raw-footage shorts, plan a flexible shot grammar where it fits: full-frame speaker, split composition
with relevant evidence, and centered graphic beats. Time changes to speech, gesture, and idea; do not force every
mode into every video or add motion to a strong direct-to-camera moment. Follow [`creative-video-direction`](../creative-video-direction/SKILL.md).

For assets & Autonomous Tooling:
- **Autonomous Asset Sourcing & Zero-Touch Sourcing**:
  - Tự động tải ảnh làm asset độc lập và ghi license: `python pipeline/assets/fetch_media.py commons|search|direct`.
  - Tự động trích xuất vector Font Awesome: `python pipeline/assets/fetch_fa_icon.py <name>`.
  - Tự động chụp web screenshot (High-DPI Retina 2x): `python pipeline/research/web_capture.py screenshot --url "..."`.
  - Screenshot/frame nghiên cứu không cần kiểm tra license hay ghi vào bảng nguồn; ưu tiên liên quan trực tiếp tới người xem.
  - Tự động quay video màn hình (30fps MP4 zero-touch): `python pipeline/research/web_capture.py record --url "..."`.
  - Tham khảo chi tiết tại [`autonomous-skill-and-asset-evolution`](../autonomous-skill-and-asset-evolution/SKILL.md).
- **Brand & Tech Logos**: Luôn kiểm tra `public/icon/` trước cho các official SVG (Claude, ChatGPT, Notion, Gmail, Google, GitHub...).
- **System Icons**: Mặc định dùng Font Awesome (`<FaIcon icon="..." />`).
- **Cutout Images**: Cắt tỉa ảnh người/vật qua `pipeline/assets/cutout.py`. Tham khảo [`cutout-image-processing`](../cutout-image-processing/SKILL.md).
- **Shared Skills & Dependencies**: AI tự động cài package cần thiết 1 lần và tự động cập nhật cải tiến vào `.agents/skills/` dùng chung cho toàn bộ dự án.
- Copy asset hoàn thiện vào `public/videos/<video-name>/assets/` để Remotion nạp qua `staticFile()`.

---

### Stage 5: Programmatic Remotion Animation
1. **Motion Rules**:
   - **No CSS animations and no `setTimeout`**. Every transformation must derive mathematically from `useCurrentFrame()`.
   - Use `interpolate` with `{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }`.
   - Use `spring({ frame, fps, config })` where material/intent calls for it, with fps from project config. Easing, steady motion, holds and cuts are valid.
   - Share interaction events, contact anchors and end states across actors; do not assign unrelated delays for the same contact.
2. **Caption Placement**:
   - Position captions in the lower third ($y \approx 1400 - 1500$ on 1080x1920 canvas).
   - Display full phrases with real-time active spoken word color changes.
   - Keep captions on the highest z-index layer (`z-index: 9999`) with safety margins ($> 40\text{px}$ from horizontal edges).

---

### Stage 6: Quality Assurance & Review Grid
1. **Before render approval**:
   - Run structural, timeline, asset, caption-geometry, and audio-signal checks without rendering a video.
   - Record pixel-level visual checks as pending until an approved render exists.
2. **After an approved render, Multi-Frame Filmstrips**:
   - When developing a complex component, extract 5 representative frames (spaced 3–5 frames apart around entrance) and stitch horizontally into a filmstrip PNG.
   - Inspect physical motion: check initial scale, lean angle, overshoot, and settling.
3. **After an approved render, Full Review Grid (`output/review.png`)**:
   - Extract one still near the end of every scene (where all text and graphic elements are in their final resting positions).
   - Composite into a unified horizontal review grid labeled with scene numbers.
   - **Self-Inspection Checklist**:
     - [ ] Are any text lines overflowing the canvas borders?
     - [ ] Do any background graphics or paper cards collide with or obscure the lower third captions?
     - [ ] Is contrast sharp and compliant with the color palette?
     - [ ] Are Vietnamese diacritics rendered without glyph corruption?

---

### Stage 7: Approval-Gated Rendering & Sync Verification
1. **Approval packet**:
   - Summarize creative direction, scenes/timing, licenses for downloaded standalone assets, static and audio QA, unresolved items, and expected render settings. Research screenshots/frames need no license report or attribution log.
   - Stop at `READY_FOR_APPROVAL`. A user must explicitly approve rendering for this project/version in chat.
   - Do not interpret “continue”, “show me”, or approval of script/concept as render approval.
2. **After approval, Command Execution**:
   - Ensure cache directories point to high-capacity storage (`process.env.TEMP`).
   - Run the Remotion media renderer (H.264, 1080x1920, 30fps, audio enabled).
   - Use an isolated port (e.g., `port: 3030`) if Remotion Studio is active on 3000.
3. **Audio-Video Sync Check via `ffprobe`**:
   ```bash
   ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 videos/<video-name>/voice.wav
   ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 videos/<video-name>/output/final.mp4
   ```
   - Ensure the final video duration matches the audio file within $\pm 0.05$ seconds.
4. **Delivery**: perform pixel-level QA, inspect `output/review.png` once, then package only the approved version.
