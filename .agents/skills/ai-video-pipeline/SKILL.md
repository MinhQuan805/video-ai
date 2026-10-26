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

### Stage 1: Fact Research & Script Drafting
1. **Source Verification**:
   - Cross-examine at least two authoritative, peer-reviewed, or primary historical/scientific sources.
   - Every number, year, person, or technical entity mentioned must be backed by citations.
   - Record all source URLs at the very top of `videos/<video-name>/script.md` prefixed with `#`.
2. **Script Formatting & Timing Budget**:
   - Write one sentence per line.
   - Target pacing for Vietnamese narration is **3.8 to 4.2 syllables per second**.
   - For a standard **30-second video**, the script must total **110 – 120 words/syllables** (excluding comment lines `#`).
   - **Narrative Hook**: The opening sentence must state an unexpected paradox or surprising fact.
   - **Call-to-Action / Cliffhanger**: The final sentence must pose a thought-provoking open question to the viewer.
3. **Tone Validation**: Read aloud or verify conversationally—strip out stiff written phrasing in favor of natural storytelling.

---

### Stage 2: Voice Synthesis & Word-Level Alignment
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
   - Divide the video into sequential scenes (minimum 2.0 seconds per scene, i.e., $\ge 60$ frames).
   - Ensure scene transitions strictly align with sentence boundaries.
   - For creator-led/raw footage, optionally set each scene's `coverage` to `speaker-full`, `split`, `graphic-center`, or a story-specific mode, and note the transition anchor (speech, gesture, sound, shape, or color). Select modes by meaning; do not force all modes into every video.
   - Declare the visual system at the root level:
     ```json
     {
       "visual_system": "cutout-collage" // or "paper", "kinetic-type", etc.
       "scenes": [ ... ]
     }
     ```
2. **Keyframe Mapping**:
   - Specify `from` and `to` frames.
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
   - Use `spring({ frame, fps: 30, config })` for natural physical bounce, overshoot, and decay.
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
