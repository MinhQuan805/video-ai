---
name: motion-graphic-design
description: >-
  Core visual design principles, motion graphics grammar, layout aesthetics, and Remotion implementation
  recipes for content-led editorial motion scenes. Covers readable cards and open compositions, visual
  metaphors, modular motion primitives, speech-synced physics, and font-awesome icon management.
---

# Universal Motion Graphic Design System & Grammar

This skill defines the universal design principles, motion grammar, and reusable **Visual Metaphor Primitives** for programmatic, high-retention short-form videos in Remotion. It is completely genre-agnostic, built to represent abstract concepts, software mechanics, business dynamics, and data storytelling without being tied to any single video topic.

## Motion-led direction and project continuity

For the current requested continuation, read [paper-motion-continuity.md](references/paper-motion-continuity.md).
Use the previous paper project's tokens and existing mask/slide/flip/radial/stamp/conduit/cursor grammar as
the starting point. Every graphic beat needs a meaningful primary action tied to the narration; a sequence
of faded-in static cards does not satisfy this brief. Holds serve reading after or within that action.
Develop causal contact and material response through
[physical-dynamics.md](../physical-interaction-direction/references/physical-dynamics.md).
Actively consider custom characters when a useful action can be designed, using
[character-and-object-design](../character-and-object-design/SKILL.md). Maintain one coherent visual world;
novelty comes from the idea, silhouette and choreography, while proven motion mechanisms may recur.

---

## 1. Core Visual Foundations

### A. The "Creativity-First" Directive (Ưu Tiên Sáng Tạo & Độc Bản – Chống Rập Khuôn)
**Sáng tạo nội dung là linh hồn của motion graphics.** Tránh tuyệt đối "AI slop" và bẫy công thức hoá (biến mọi câu thành một card chữ nhật kèm icon rồi fade-in đơn điệu):
1. **Bespoke Visual Metaphors**: Mỗi beat đồ họa phải xuất phát từ ý nghĩa thực của lời nói để sáng tạo một ẩn dụ thị giác độc đáo, bất ngờ và kích thích thị giác (ví dụ: dòng thác thông tin bị tắc nghẽn, bàn tay cơ khí gắp dữ liệu, chiếc dấu kiểm duyệt dập mạnh xuống, origami mở bung đa chiều, nam châm hút quy trình, cán cân đối trọng bập bênh).
2. **Dynamic Motion Grammar**: Không để các phần tử đứng yên vô vị sau khi vào khung hình. Sử dụng chuyển động có kịch tính, tiếp xúc nhân quả, ma sát trượt, biến dạng đàn hồi, va chạm truyền lực, nhường chỗ và biến đổi hình thái (morphing/transform).
3. **Staging & Compositional Variety**: Đa dạng hoá nhịp điệu sân khấu qua từng cảnh — luân phiên giữa bố cục mở (open canvas), không gian 2.5D, sơ đồ liên kết (kinetic conduits), góc nhìn cận cảnh tập trung (spotlight) và toàn cảnh quan hệ (network overview). Tránh lặp lại một khuôn mẫu tỷ lệ hay vị trí qua nhiều scene liên tiếp.
4. **Expressive Code-Drawn Actors & Props**: Khi cảnh có vai diễn hoặc hành động rõ ràng, chủ động thiết kế nhân vật hoặc vật thể phân lớp bằng code (có khớp, mắt, điểm neo lực) để diễn xuất sống động thay vì nhồi nhét icon phẳng vô tri.
5. **Rhythm: Dynamic Beat ➔ Reading Settle**: Sáng tạo bùng nổ ở pha hành động chính (primary action beat) ăn khớp với từ khóa thoại, sau đó giữ khoảng lắng tự nhiên (settle hold) để người xem kịp đọc và cảm nhận, tránh chuyển động liên tục gây mỏi mắt.

### B. The "1-Second Clarity" Principle (Tối Giản – 1 Giây Là Hiểu Ngay)
Viewers need a clear entry point. Treat quick comprehension as a design test rather than a fixed time guarantee:
1. **Clear Focus & Visual Scale**: Đồ họa chính phải đủ lớn và nổi bật (chiếm 75%–85% chiều ngang active stage, width 780–880px trên khung 1080px). Tuyệt đối không vẽ đồ họa quá nhỏ làm lọt thỏm giữa màn hình trống, cũng không để đồ họa sát viền (chừa lề an toàn tối thiểu 80px hai bên, 140px lề phải tránh nút TikTok).
2. **Tuyệt Đối Không Nhồi Nhét Chữ (Zero Text Clutter)**: Motion graphic KHÔNG PHẢI slide thuyết trình. Khán giả đã nghe voiceover và đọc caption phụ đề. Tuyệt đối không đưa cả câu văn, checklist dài hay hướng dẫn vào trong graphic. Nhãn trong đồ họa chỉ được phép chứa **tối đa 1–3 từ khóa định danh** (ví dụ: `QUY TRÌNH`, `BÀI MẪU`, `TÀI LIỆU`, `CHỦ ĐỀ`, `Ý THÔ`). Mọi văn bản dài phải được trừu tượng hóa thành các thanh guide rules / vạch mực hoặc icon trực quan.
3. **Tối Giản Tinh Tế (Stripped-Down Silhouette)**: Loại bỏ toàn bộ các tem nhãn rác, con dấu phụ giả tạo, hoặc card lồng card dày đặc gây ngột ngạt. Giữ lại duy nhất vật thể cốt lõi tham gia vào câu chuyện và tương tác vật lý.
4. **Zero-Repetition Directive (Cấm Lặp Lại Component)**: Không lặp lại cùng một định dạng thẻ card hay kiểu animation quá 1-2 lần trong một video. Mỗi scene phải là một cơ chế vật thể vật lý riêng biệt (rương báu, trục in giấy, kéo thả chat box + bút tracking, khe cắm cartridge, bàn mixer fader/dial/switch, phễu nén khí, bánh lái bánh răng, cầu dao công nghiệp).
5. **Cố Định Layout Phân Cảnh (Scene-Level Stability)**: Cố định tuyệt đối vị trí motion graphic trong suốt thời lượng của scene, không dùng hiệu ứng trượt giữa chừng (`centerShift`). Khi có speaker: speaker hiện diện 100% thời lượng và graphic nằm cố định nửa trên. Khi không có speaker: graphic nằm cố định ngay trung tâm dọc (`justifyContent: 'center'`).
6. **Tương Tác Vật Lý Sống Động (Mandatory Physics)**: Mọi element luôn có nhịp thở (`continuousFloat`), va chạm có thụt lún (`dropRecoil`), nảy lò xo (`dampedOscillation`), ngòi bút chì bám đầu nét mực theo thời gian thực (`WritingPencil`), và bánh răng ăn khớp quay ngược chiều.

### C. Cards or Open Compositions by Meaning
- Use cards for discrete choices, tasks, documents, evidence, states or comparisons. Use open space for relationships that do not need a container.
- Give a card a purpose and appropriate action: select, queue, compare, block, expand, merge or hand off. It may hold still for reading.
- Avoid nested boxes and excessive shadows; keep hierarchy and breathing room in either approach.
- Apply [physical-interaction-direction](../physical-interaction-direction/SKILL.md) for shared contact/state events, including card interactions.
- Use [creative-video-direction](../creative-video-direction/SKILL.md) for visual choice, design memory, art direction and anti-slop review.

### D. Balanced Color Harmonization
Choose a restrained palette for the project and keep semantic roles consistent. The following is an optional paper example:
- **Canvas Base**: `#FAF8F5` (Editorial warm paper canvas).
- **Ink / Typography**: `#1A1816` (Deep carbon ink) for headlines; `rgba(26, 24, 22, 0.55)` for secondary labels.
- **Single Focal Accent**: `#C6532A` (Warm terracotta cam đất) for focal highlights, active states, and active badges.
- **Semantic Signals**:
  - Danger / Cost / Obstacle: `#DC2626` (Crimson red).
  - Profit / Success / Automation: `#059669` / `#10B981` (Emerald green).
  - Attention / Pending: `#D97706` (Amber gold).
  - Neutral Guides / Dividers: `rgba(26, 24, 22, 0.12)`.

### E. Icon Strategy: Official Brand Vectors & Font Awesome
- **Official Brand Logos**: Always check `public/icon/` first for official SVGs (Claude, ChatGPT, Notion, Gmail, Google, GitHub, Apple, etc.). Never draw clumsy approximations when real brand marks exist.
- **Standard UI Icons**: Always default to Font Awesome vector icons rendered via `<FaIcon icon="..." />` or fetched via `pipeline/assets/fetch_fa_icon.py`.
- Wrap icons in circular badge pills or let them stand alone with clean SVG transforms (`scale`, `rotate`, `translate`).

---

## 2. Universal Visual Metaphor Primitives

These primitives are examples to adapt when appropriate, not an exhaustive grammar or a lookup table for every sentence:

---

### Primitive 1: Feed Drift & Sinking Stream
**Concept**: Lost information, communication overload, ignored backlog, slipping out of reach.
```text
┌───────────────────────────────────────────────┐
│ [💬 Urgent Message]  (🔴 1 ➔ 9 ➔ 99+)         │ y: 0   (Entrance)
│        ↓ (Drifting downward)                  │
│ [💬 Deprecated Item]                          │ y: +120px (Opacity: 0.7)
│        ↓ (Disappearing off-stage)             │
│ [      ... Sinking into abyss ...      ]      │ y: +260px (Opacity: 0.0)
└───────────────────────────────────────────────┘
```
- **Choreography**:
  - Item spawns with a lively spring bounce. A red badge counter accelerates numbers: `1 ➔ 9 ➔ 99+` (`Math.floor(interpolate(...))`).
  - As the voiceover speaks the pain point (e.g. "bỏ sót", "trôi việc"), the item sinks rapidly downward ($y: 0 \rightarrow +220\text{px}$) and fades out (`opacity: 1 \rightarrow 0`).
  - Secondary items stack tightly, showing an unmanageable queue.

---

### Primitive 2: Manual Labor vs Speed (Cursor & Chronometer)
**Concept**: Slow manual input, tedious repetitive work, wasted billable hours, human bottleneck.
```text
┌───────────────────────────────────────────────┐
│  [Cell A1] Khách hàng A... █ (Typing cursor)  │
│                                               │
│  ⏱️ Clock Loop: ↻ (Spinning fast)             │
│  Badge: "+3 giờ / ngày" (Popping in red)       │
└───────────────────────────────────────────────┘
```
- **Choreography**:
  - Left element: A minimal spreadsheet or form field. A blinking vertical cursor (`opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0`) painstakingly types character by character (`text.slice(0, Math.floor(relFrame / 4))`).
  - Right element: A high-contrast stopwatch / clock icon spinning rapidly (`rotate(${frame * 12}deg)`), paired with an elastic badge popping in: `+3 giờ/ngày` or `Mất thời gian`.
  - **Cursor Click Accuracy**: Khi có hành vi nhấp chuột vào button/cell, bắt buộc kiểm tra hit-testing bằng `checkCursorClickTarget` (`src/motion/validate.ts`) để đảm bảo tâm chuột và `ClickRipple` trùng khớp 100% với bounding box của nút bấm, không lệch sang hàng/vật thể khác.

---

### Primitive 3: Escalation Ladder & Gated Paywall
**Concept**: Hidden costs, aggressive pricing tiers, locked features, out-of-reach upgrades.
```text
┌───────────────────────────────────────────────┐
│                  [🔒 Pro: $500+/mo] 💥 (Lock) │
│           [Starter]                           │
│   [Free]                                      │
│  ───────  ─────────  ───────────────────────  │
└───────────────────────────────────────────────┘
```
- **Choreography**:
  - 3 stepped tiers enter sequentially from left to right (`Tier 1 ➔ Tier 2 ➔ Tier 3`).
  - An indicator or cursor hops effortlessly over Tier 1 and Tier 2.
  - Upon touching Tier 3, an oversized security padlock (`<FaIcon icon="lock" />`) snaps shut with a metallic slam (`scale: 2.0 ➔ 1.0`, `damping: 12`).
  - An eye-catching price tag badge bounces in with a slight shake/vibration (`Math.sin(frame * 0.8) * 3px`).

---

### Primitive 4: Modular Block Assembly & Blank Canvas
**Concept**: Extreme customizability, DIY flexibility, lego building blocks, but requires building from scratch.
```text
┌───────────────────────────────────────────────┐
│  Page: /command_cursor                        │
│                                               │
│   [🗂️ Kanban] ──➔ 🧩 (Snapping together)     │
│   [📋 Table]  ──➔ 🧩 (Slight misalignment)   │
│   [🏷️ Filter] ──➔ 🧩                         │
└───────────────────────────────────────────────┘
```
- **Choreography**:
  - A clean, empty paper page displays a blinking command prompt (e.g. `/setup`).
  - 3 colored pastel blocks (representing components/databases) fly in from disparate screen edges via independent spring trajectories.
  - The blocks attempt to snap together into an assembled grid, but intentionally oscillate or settle with a subtle tilt ($-3^\circ$), visually communicating that you have full freedom, but must do the heavy lifting yourself.

---

### Primitive 5: Seamless Connected Pipeline & Conduit
**Concept**: All-in-One ecosystem, continuous data sync, automated handoff between departments.
```text
┌─────────────────────────────────────────────────────────┐
│  (Node 1) ───⚡───➔ (Node 2) ───⚡───➔ (Node 3) ───⚡───➔ (Node 4)│
│   CRM ✓           Sales ✓         Quotes ✓       Invoice✓│
└─────────────────────────────────────────────────────────┘
```
- **Choreography**:
  - An elegant horizontal SVG line connects 3 to 4 sequential station icons.
  - A glowing pulse of light / energy particle travels across the path from start to end, timed to the spoken words.
  - As the pulse reaches each station, that station's circle pops, color switches from neutral slate to vibrant emerald green, and a checkmark `<FaIcon icon="check" />` snaps into place.

---

### Primitive 6: Comparative 2-Column Split
**Concept**: Pain vs Solution, Old vs New, High Spend vs Low Output, Plan vs Reality.
```text
┌─────────────────────────┬─────────────────────────┐
│  Left: The Problem      │  Right: The Consequence │
│  🔥 Surging Overhead    │  📉 Collapsing Margin   │
│  - Red counter climbing │  - Muted icon shrinking │
└─────────────────────────┴─────────────────────────┘
```
- **Choreography**:
  - Two parallel vertical columns separated by a subtle dashed divider.
  - Left column: Flame or cost icon escalates with rising ember particles and a red counter speeding upward.
  - Right column: Result icon shrinks and sinks downward, reinforcing the sharp divergence between effort and reward.

---

### Primitive 7: Precision Target Lock & Orbit
**Concept**: Niche targeting, laser focus, prospective client acquisition, radar discovery.
- **Choreography**:
  - 4 to 6 candidate nodes float along an elliptical orbit with harmonic breathing (`Math.sin(frame * 0.08 + phase) * 7px`).
  - Dual concentric dashed reticle rings rotate in opposite directions at center.
  - At the trigger frame, the reticles snap down onto the target node, turning bold terracotta with a radiating sonar shockwave (`scale: 1 ➔ 2.4`, `opacity: 0.8 ➔ 0`).

---

### Primitive 8: Conversational Stream & Slam Stamp
**Concept**: Messaging exchanges, spam overload, feedback loops, administrative rejection/approval.
- **Choreography**:
  - 3 to 4 staggered chat bubbles appear in alternating sequence with natural spring pop-in.
  - Bubbles float gently with staggered vertical sine waves.
  - At the keyword pivot (e.g. "bị phạt", "vi phạm", "được duyệt"), an oversized official stamp (e.g. `REPORTED`, `SPAM`, `APPROVED`) slams down with heavy damping (`scale: 2.2 ➔ 1.0`, `rotation: -8deg`).

---

### Primitive 9: Network Blossoming & Trust Propagation
**Concept**: Word of mouth, referrals, viral reach, high satisfaction ratings.
- **Choreography**:
  - Central verified node radiates SVG lines outward to satellite user nodes.
  - As lines connect, satellite nodes transform into glowing gold stars (`<FaIcon icon="star" />`) with staggered elastic bounces.
  - A subtle radial golden ripple expands across the background stage.

---

### Primitive 10: Speech-Synced Trajectory & Inflection Curve
**Concept**: Hockey-stick growth, compound returns, patience before payoff, sudden collapse.
- **Choreography**:
  - SVG path draws in two distinct speech phases:
    - Phase 1 (Baseline / Plateau): Flat or slow crawling line during narration of early effort.
    - Phase 2 (Inflection Point): Dramatic upward or downward cubic bezier curve right at the punchline word.
  - A pulsing tip indicator and an oversized metric badge (e.g. `+300% 🚀`) erupts at the curve summit.

---

### Primitive 11: Gauges, Meters & Threshold Limits
**Concept**: System overload, bandwidth exhaustion, battery drain, burnout.
- **Choreography**:
  - Semi-circular radial gauge or segmented horizontal battery meter.
  - Fill bar animates from safe green ($20\%$) to amber ($70\%$) and spikes into critical red ($99\%$).
  - When hitting the red threshold, the entire gauge performs a high-frequency jitter (`Math.sin(frame * 1.5) * 4px`) with a flashing exclamation badge.

---

### Primitive 12: Interactive Call-To-Action & Input Poll
**Concept**: Inviting viewer comments, polling opinions, outro engagement, search queries.
- **Choreography**:
  - A clean, rounded input bar: `[ Nhập lựa chọn của bạn... █ ]` with a rhythmic blinking cursor.
  - Row of badge choices (e.g. `S`, `A`, `B`, `C`, `F` or option cards) laid out horizontally below.
  - A directional indicator (e.g. `👇 Comment bên dưới`) pulses subtly with a vertical bounce to drive viewer participation.

---

## 3. Remotion Motion Physics & Implementation Recipes

### A. Core Spring Configurations
Drive every animation from frame time. Choose constant speed for steady flow, easing for authored travel,
spring for elastic response, or a baked track for simulation. The following spring configs are starting points,
not mandatory physics; keep contact, visibility and deformation channels separate:
```typescript
import { spring } from 'remotion';

// 1. Snappy Standard Reveal (Clean, modern UI element entrance)
export const SPRING_SNAPPY = { damping: 14, mass: 0.7, stiffness: 140 };

// 2. Bouncy Punch / Badge Pop (Attention badges, icons, stars)
export const SPRING_BOUNCY = { damping: 10, mass: 0.5, stiffness: 220 };

// 3. Heavy Slam / Impact (Padlocks, warning stamps, sudden stops)
export const SPRING_HEAVY = { damping: 18, mass: 1.3, stiffness: 260 };

// 4. Stately Paper Weight (Minimal editorial, elegant cards)
export const SPRING_STATELY = { damping: 17, mass: 1.6, stiffness: 70 };
```

### B. Harmonic Floating (Living Motion)
Use subtle floating only when the material or scene calls for it; grounded cards and reading states should settle.
The following motion is optional and should pause while competing with a primary action:
```typescript
const floatY = Math.sin(frame * 0.08 + phaseOffset) * 6; // ±6px gentle drift
const floatRotate = Math.cos(frame * 0.05 + phaseOffset) * 1.5; // ±1.5deg tilt
```

### C. Optional Exit Transition
Choose a cut, carry-over, mask, or exit according to the idea. The 8-frame helper below is only an example;
do not add an exit on every boundary or shorten the reading hold to make room for it:
```typescript
export const getExitTransform = (frame: number, endFrame: number, duration: number = 8) => {
  if (frame < endFrame - duration) return { opacity: 1, scale: 1, translateY: 0 };
  const exitProgress = (frame - (endFrame - duration)) / duration;
  return {
    opacity: Math.max(0, 1 - exitProgress),
    scale: 1 - exitProgress * 0.04,
    translateY: -exitProgress * 15,
  };
};
```

---

## 4. The 3-Step Script-to-Metaphor Translation Workflow

Use the examples below as brainstorming prompts only. Select the simplest clear visual via creative-video-direction;
cards, people and direct evidence remain valid even when an example suggests a metaphor:

1. **Find the Core Tension**: What is the speaker's real point?
   - Is it *friction/slowness*? ➔ Use **Primitive 2 (Manual Labor)** or **Primitive 11 (Gauge Limit)**.
   - Is it *waste/omission*? ➔ Use **Primitive 1 (Feed Drift)**.
   - Is it *cost/gating*? ➔ Use **Primitive 3 (Escalation Ladder & Lock)**.
   - Is it *assembly overhead*? ➔ Use **Primitive 4 (Modular Blocks)**.
   - Is it *cohesion/harmony*? ➔ Use **Primitive 5 (Connected Pipeline)**.
   - Is it *contrast/trade-off*? ➔ Use **Primitive 6 (Comparative Split)**.
   - Is it *organic scale/reputation*? ➔ Use **Primitive 9 (Network Blossoming)**.
2. **Draft Only the Needed Layers**:
   - Main content: speaker, card relationship, evidence, chart or metaphor, grounded or floating as appropriate.
   - Add headline/label/context only if it helps; no required badge, metric or decorative layer.
   - Keep type and visual tokens consistent with the chosen project art direction.
3. **Harmonize Colors**: Pick primary ink + 1 semantic accent matching the emotional tone.
