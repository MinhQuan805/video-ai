---
name: motion-graphic-design
description: >-
  Core visual design principles, motion graphics grammar, layout aesthetics, and Remotion implementation
  recipes for floating editorial motion scenes. Covers clean containerless design, instant 1-second visual
  metaphors, modular motion primitives, speech-synced physics, and font-awesome icon management.
---

# Universal Motion Graphic Design System & Grammar

This skill defines the universal design principles, motion grammar, and reusable **Visual Metaphor Primitives** for programmatic, high-retention short-form videos in Remotion. It is completely genre-agnostic, built to represent abstract concepts, software mechanics, business dynamics, and data storytelling without being tied to any single video topic.

---

## 1. Core Visual Foundations

### A. The "1-Second Clarity" Principle (Tối Giản – 1 Giây Là Hiểu Ngay)
Short-form viewers do not read lengthy paragraphs while watching motion. Every scene must pass the **1-Second Comprehension Test**:
1. **One Dominant Hero Metaphor**: Exactly one visual action taking place (e.g., an item sinking, a lock snapping shut, a light pulse travelling a wire).
2. **One Punchy Headline ($\le 4$ words)**: Pure bold takeaway (e.g. `Trôi tin nhắn`, `Chi phí tăng nhanh`, `Tự động 100%`).
3. **One Crisp Supporting Metric or Badge**: A concrete quantitative anchor (e.g. `+3h / ngày`, `$500+ / tháng`, `99+`).
4. **Zero Reading Clutter**: Never put explanatory sentences or descriptive paragraphs inside the motion graphic stage. Explanations belong strictly in the spoken voiceover and synchronized subtitles.

### B. Containerless Floating Stage (No Clunky Cards)
- **Anti-Pattern**: Wrapping every graphic inside a white rounded rectangular card with borders and heavy outer shadows. This creates visual claustrophobia and feels like static slide presentations.
- **The Modern Standard**: Remove bounding boxes, cards, and enclosing background rectangles. Allow icons, badges, SVG paths, counters, and kinetic typography to float directly on the stage background (`#F9F8F6` or dark canvas).
- **Breathing Room**: Keep elements spacious, light, and elevated with subtle contact shadows or soft drop-shadow filters on vector glyphs.

### C. Balanced Color Harmonization
Every motion piece must use a restrained 3-to-4 color palette:
- **Canvas Base**: `#FAF8F5` (Editorial warm paper canvas).
- **Ink / Typography**: `#1A1816` (Deep carbon ink) for headlines; `rgba(26, 24, 22, 0.55)` for secondary labels.
- **Single Focal Accent**: `#C6532A` (Warm terracotta cam đất) for focal highlights, active states, and active badges.
- **Semantic Signals**:
  - Danger / Cost / Obstacle: `#DC2626` (Crimson red).
  - Profit / Success / Automation: `#059669` / `#10B981` (Emerald green).
  - Attention / Pending: `#D97706` (Amber gold).
  - Neutral Guides / Dividers: `rgba(26, 24, 22, 0.12)`.

### D. Icon Strategy: Official Brand Vectors & Font Awesome
- **Official Brand Logos**: Always check `public/icon/` first for official SVGs (Claude, ChatGPT, Notion, Gmail, Google, GitHub, Apple, etc.). Never draw clumsy approximations when real brand marks exist.
- **Standard UI Icons**: Always default to Font Awesome vector icons rendered via `<FaIcon icon="..." />` or fetched via `pipeline/assets/fetch_fa_icon.py`.
- Wrap icons in circular badge pills or let them stand alone with clean SVG transforms (`scale`, `rotate`, `translate`).

---

## 2. Universal Visual Metaphor Primitives

Use these 12 modular primitives as building blocks to visualize any abstract concept, software workflow, business problem, or human behavior:

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
Never animate with linear time or arbitrary ease strings. Use standard Remotion spring configs:
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
Static graphics look dead. After entering, elements must breathe subtly using phase-offset sine waves:
```typescript
const floatY = Math.sin(frame * 0.08 + phaseOffset) * 6; // ±6px gentle drift
const floatRotate = Math.cos(frame * 0.05 + phaseOffset) * 1.5; // ±1.5deg tilt
```

### C. Standard 8-Frame Exit Transition
Never vanish abruptly on scene boundary. Always fade and scale out gracefully:
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

When presented with any new video script line, follow this deterministic selection process:

1. **Find the Core Tension**: What is the speaker's real point?
   - Is it *friction/slowness*? ➔ Use **Primitive 2 (Manual Labor)** or **Primitive 11 (Gauge Limit)**.
   - Is it *waste/omission*? ➔ Use **Primitive 1 (Feed Drift)**.
   - Is it *cost/gating*? ➔ Use **Primitive 3 (Escalation Ladder & Lock)**.
   - Is it *assembly overhead*? ➔ Use **Primitive 4 (Modular Blocks)**.
   - Is it *cohesion/harmony*? ➔ Use **Primitive 5 (Connected Pipeline)**.
   - Is it *contrast/trade-off*? ➔ Use **Primitive 6 (Comparative Split)**.
   - Is it *organic scale/reputation*? ➔ Use **Primitive 9 (Network Blossoming)**.
2. **Draft the 3-Layer Scene**:
   - Layer 1: The visual metaphor animation (center stage, floating without cards).
   - Layer 2: Main headline title ($\le 4$ words, Anton or bold sans-serif).
   - Layer 3: Supporting key metric badge or tag.
3. **Harmonize Colors**: Pick primary ink + 1 semantic accent matching the emotional tone.
