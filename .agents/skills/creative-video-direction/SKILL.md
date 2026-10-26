---
name: creative-video-direction
description: >-
  Framework, heuristics, and mental models for AI-driven creative motion design, visual storytelling,
  art direction, and dynamic layout composition in Remotion. Use this skill when designing novel video
  scenes, inventing visual metaphors, establishing cinematic pacing, selecting color palettes,
  designing data visualizations, and avoiding rigid hardcoded patterns.
---

# Creative Video Direction: AI Art Direction & Motion Design Framework

This skill elevates the AI assistant from a mechanical code generator into an **Art Director and Creative Motion Designer**. Instead of blindly copy-pasting static templates or hardcoding rigid coordinates, use this framework to conceive, choreograph, and execute compelling, bespoke video scenes.

---

## 1. The Anti-Hardcoding Heuristics

Hardcoding exact pixel offsets, rigid arrays, and static delays produces repetitive, fragile videos that break whenever text lengths or aspect ratios change. Follow these dynamic design principles:

### A. Dynamic Font Scaling Based on String Length
Never assign a fixed font size to dynamic titles. Compute font scale adaptively:
```typescript
export const getAdaptiveFontSize = (
  text: string,
  baseSize: number = 60,
  minSize: number = 38,
  thresholdChars: number = 28
) => {
  const len = text.length;
  if (len <= thresholdChars) return baseSize;
  const scale = 1 - Math.min(0.45, (len - thresholdChars) / (thresholdChars * 1.8));
  return Math.max(minSize, Math.round(baseSize * scale));
};
```

### B. Viewport Safe Zone Grid (1080x1920 Canvas)
Divide the vertical frame into 4 dedicated spatial zones to prevent visual collisions:
* **Zone 1: Eyebrow & Category Ceiling ($y: 100 - 300\text{px}$)**: Reserved for tags, dates, case numbers, and headlines.
* **Zone 2: Visual Hero Stage ($y: 320 - 1340\text{px}$)**: The main theater for illustrations, diagrams, 3D pop-ups, numbers, and comparisons.
* **Zone 3: Lower-Third Caption Safe Zone ($y: 1380 - 1600\text{px}$)**: High-contrast subtitles. **Zero graphic clutter may enter this zone.**
* **Zone 4: Ground Horizon / Footer ($y: 1600 - 1920\text{px}$)**: Anchor floor, source citations, progress bars, or decorative margins.

---

## 2. Visual Metaphor Generation Engine

When reading any sentence from `script.md`, do not simply display the text in a box. Apply the **3-Step Metaphor Translation Heuristic**:

### Step 1: Identify the Conceptual Conflict / Tension
Analyze what dramatic dynamic is taking place:
* **Magnitude / Shock**: A small action with immense consequences.
* **Discrepancy / Deception**: Expected plan vs. harsh reality.
* **Duration / Endurance**: Long, agonizing passage of time.
* **Discovery / Synthesis**: Fragmented clues assembling into a breakthrough.
* **Counterfactual / Crossroads**: "What if this never happened?"

### Step 2: Select a Physical / Tactile Metaphor
Translate the conceptual tension into a tangible object, physical movement, or mechanical behavior:

| Narrative Concept | Physical / Motion Metaphor | Remotion Implementation |
| :--- | :--- | :--- |
| **Friction / Manual Effort** | Blinking typing cursor, fast-spinning chronometer, assembly conveyor belt. | Cursor typing char-by-char; clock rotation + accelerating counter badge. |
| **Loss / Omission / Overload** | Sinking feed, stack overflow, vanishing items, surging notification badge. | Element dropping downward ($y: 0 \rightarrow +220\text{px}$) with opacity fade; red badge $1 \rightarrow 99+$. |
| **Escalation / Paywall Gate** | Rising stair steps, security padlock slamming shut, vibrating price tag. | Stepped platforms $1 \rightarrow 2 \rightarrow 3$; padlock scale spring snap $2.0 \rightarrow 1.0$ with price badge. |
| **DIY / Modular Assembly** | Blank paper canvas, command prompt, flying lego blocks settling with tilt. | Empty sheet with `/setup` prompt; staggered pastel block springs with subtle angle offset. |
| **Integration / All-in-One** | Conduit wire, multi-station circuit, travelling pulse, sequential checkmarks. | SVG path line connecting nodes; travelling glow pulse triggering green checks. |
| **Crossroads / Rejection** | Rubber ink stamp, bold red X, paper torn in half, detour road sign. | Slam-down stamp with scale $2.2 \rightarrow 1.0$, $-8^\circ$ rotation, accent border. |
| **Discovery / Deep Analysis** | Magnifying loupe, pinned evidence board, unfolding cards, radar reticle. | Circular SVG mask with $1.3\times$ zoom; rotating dual reticles locking on target. |
| **Compound Growth / Traction** | Hockey-stick curve, ascending rocket, erupting metric badge. | Two-phase SVG bezier draw (flat baseline $\rightarrow$ sharp inflection upward). |
| **Trust / Word-of-Mouth** | Star burst shower, branching network nodes, expanding trust ripple. | Radial lines drawing from center node to satellites popping into 5 golden stars. |
| **Weight of Data / Volume** | Massive digital counter, scale tipping, giant headline block. | Anton display numeral $\ge 260\text{px}$, spring bounce with contact shadow. |

### Step 3: Establish Visual Hierarchy (Focal Point Rule)
Every frame must have exactly **one dominant focal point** (the Hero), **one secondary supporting element** (the Context), and **subtle ambient texture** (the Atmosphere).

---

## 3. Mixed Shot Grammar for Smooth Short-Form Editing

For creator-led shorts or raw footage with a visible speaker, plan a flexible mix of three visual states. Treat
them as editorial choices, not a fixed template: use only the states that help the story, and let a strong new
visual idea replace any of them.

1. **Full-frame speaker** — show the person centered or deliberately composed across the frame with little or no
   graphic overlay. Use for direct address, emotion, credibility, a pause, or a key line. Preserve natural facial
   expression and eye contact; do not animate just to keep the frame busy.
2. **Split composition** — keep the speaker on one side and place related footage, an example, comparison, or
   interface on the other. Use when the viewer benefits from seeing the person react while examining evidence.
   Keep both halves readable and give the speaker enough room; avoid shrinking the face into a token thumbnail.
3. **Centered graphic beat** — let a diagram, number, object, quote, map, or custom motion graphic take the center
   for the idea it explains. It can briefly replace the speaker or sit over softened footage; return to the face
   when the human reaction or next spoken point matters more.

### A. Transitions That Feel Continuous

- Change visual state on a meaningful phrase, breath, gesture, look, sound cue, or contrast in the argument. Do not
  cut merely because a preset duration elapsed.
- Create continuity through a shared anchor: match the direction of a hand/eye movement, carry a color or shape
  from the footage into the graphic, or let a divider/card grow from the next composition's edge.
- Use a clean cut when the speaker's delivery has energy; use a short dissolve, masked reveal, or graphic wipe
  when the idea itself transforms. Keep transition duration subordinate to the spoken rhythm.
- Let the graphic enter, communicate, then clear enough space for the next face/shot. Avoid stacking effects on
  every transition, repetitive split-screen alternation, and decorative motion that competes with speech.
- Vary shot holds according to thought and delivery. A still face can be the strongest visual beat; motion is not
  required in every scene. Do not force all three states or a fixed percentage of screen time into every video.

### B. Coverage Planning Example

```text
Direct claim / personal hook  → full-frame speaker, clean eye contact
Claim needs context           → split composition, speaker + specific evidence
Number / mechanism / contrast → centered graphic beat with one clear focal point
Reaction / conclusion         → return to full-frame speaker and let the line land
```

The transitions should preserve orientation, color, and timing so the sequence feels like one designed piece,
while each state earns its place through clarity, emotion, or novelty.

## 4. Cinematic Motion Choreography & Rhythm

### A. The Principle of Motion Contrast Across Scenes
Never repeat the identical motion archetype two scenes in a row. Maintain cinematic momentum through contrasting physics:

```text
Scene 1: Rapid Lateral Punch (Horizontal slide with backward lean & overshoot)
    ↓ (Transition: Torn paper wipe)
Scene 2: Gravitational Free-Fall (Vertical drop, contact impact, decaying bounce)
    ↓ (Direct cut)
Scene 3: 3D Unfolding Pop-Up (Hinged lower half, delayed top half, shadow tilt)
    ↓ (Direct cut)
Scene 4: Lateral Page Flip (3D perspective album opening around side spine)
    ↓ (Direct cut)
Scene 5: High-Mass Editorial Stance (Heavy spring settle, stamp slap, glowing question mark)
```

### B. Disney's Principles in Remotion Code
1. **Anticipation**: Pull back slightly before springing forward:
   ```typescript
   // Anticipation: dips by -12px in first 3 frames before shooting up to 0
   const y = rel < 3 
     ? interpolate(rel, [0, 3], [0, 12]) 
     : spring({ frame: rel - 3, fps: 30, config: { mass: 1.2, damping: 14 } });
   ```
2. **Follow-Through & Damped Oscillation**: Objects don't stop dead; they oscillate:
   $$y(t) = A \cdot e^{-\lambda t} \cdot \cos(\omega t)$$
3. **Reading Stillness (Linger Time)**: Give important text and visuals enough calm time to read while the voiceover finishes its thought. Choose the hold from the amount of information and delivery; do not impose the same percentage on every scene.

---

## 5. Semantic Color Psychology & Palette Construction

Choose a tailored 3-color system reflecting the genre of the video:

```typescript
export interface VisualPalette {
  background: string;   // Clean textured foundation
  ink: string;          // Primary text & borders
  accent: string;       // ONE high-saturation emotional trigger
  secondary?: string;   // Supporting marker or card tone
}
```

### Semantic Palette Presets:
1. **Historical / Documentary / Archaeological**:
   * Background: `#FBFAF7` (Warm Paper) | Ink: `#1B1815` (Carbon) | Accent: `#C6532A` (Terracotta) | Secondary: `#FFD23F` (Wax Ochre)
2. **Investigative / True Crime / Geopolitics**:
   * Background: `#F5F3EF` (Cold Parchment) | Ink: `#111827` (Midnight) | Accent: `#DC2626` (Crimson) | Secondary: `#0F172A` (Redacted Ink)
3. **Science / Deep Tech / Exploration**:
   * Background: `#F8FAFC` (Clean Laboratory) | Ink: `#0F172A` (Obsidian) | Accent: `#2563EB` (Cobalt Blue) | Secondary: `#38BDF8` (Atmospheric Cyan)
4. **Economics / Wealth / Industry**:
   * Background: `#FAF8F5` (Cream Ivory) | Ink: `#1A1A1A` (Bank Ink) | Accent: `#059669` (Banknote Emerald) | Secondary: `#D97706` (Bullion Gold)
5. **Philosophy / Literature / Human Narrative**:
   * Background: `#FAF8F5` (Book Paper) | Ink: `#1F1D1B` (Deep Sepia) | Accent: `#B45309` (Burnt Sienna) | Secondary: `#F3EDE2` (Vellum)

---

## 6. Procedural Invention: Assembling Novel Components

When a script requires an idea not covered by existing components, assemble atomic primitives to create a bespoke visual artifact:

### Recipe: Procedural Wax Seal / Stamp
```tsx
export const RubberStamp: React.FC<{ text: string; frame: number; hitFrame: number }> = ({
  text,
  frame,
  hitFrame,
}) => {
  const rel = frame - hitFrame;
  if (rel < 0) return null;

  const spr = spring({ frame: rel, fps: 30, config: { damping: 9, stiffness: 180 } });
  const scale = interpolate(spr, [0, 1], [2.4, 1.0]);
  const rot = interpolate(spr, [0, 1], [-25, -6]);

  return (
    <div
      style={{
        display: "inline-block",
        border: `5px solid #C6532A`,
        borderRadius: "6px",
        padding: "8px 24px",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        boxShadow: "0 4px 16px rgba(198, 83, 42, 0.35)",
        transform: `scale(${scale}) rotate(${rot}deg)`,
      }}
    >
      <span style={{ fontFamily: "Anton", fontSize: 48, color: "#C6532A", letterSpacing: 2 }}>
        {text}
      </span>
    </div>
  );
};
```

### Recipe: Procedural Magnifying Loupe
Combine an SVG circle mask with scale magnification ($1.3\times$) and a paper drop-shadow rim to spotlight a specific document detail.

---

## 7. Self-Critique & Creative Checklist Before Rendering

Before approving any scene, evaluate it against this creative scorecard:
- [ ] **Metaphor Check**: Does this scene show a meaningful visual metaphor, or is it just words floating in a box?
- [ ] **Weight & Physics**: Does the entrance feel grounded with physical mass, or floaty and robotic?
- [ ] **Spatial Breathing Room**: Are elements crowded? Is there ample padding around headings and illustrations?
- [ ] **Contrast Variety**: Does this scene feel visually distinct from the scene preceding it?
- [ ] **Shot Grammar**: If there is a speaker, do full-frame, split, and graphic beats appear only where they improve the story, with transitions linked by speech, gesture, shape, or color?
- [ ] **Emotional Alignment**: Does the typography and accent color match the gravity of the spoken narrative?
