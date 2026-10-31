---
name: visual-paper-editorial
description: >-
  Master system for high-end Paper Minimal Editorial motion graphic videos in Remotion.
  Covers end-to-end automated video production from raw video/audio inputs: Whisper forced alignment,
  creative visual metaphor ideation, spring-driven physics, reactive micro-interactions,
  Remotion TransitionSeries, camera motion blur, brand logo integration, and floating karaoke captions.
---

# Paper Minimal Editorial & Motion Graphics Master System

Use this visual system when paper editorial materiality fits the content or the user chooses it.
It is one available art direction in Remotion/TypeScript, not the default for every video or aspect ratio.

It synthesizes modern editorial graphic design (tactile paper texture, deep carbon ink, warm terracotta accents, Fraunces serif italic typography) with cinema-grade motion graphics (spring physics, reactive recoil micro-interactions, 3D card unfolds, dynamic bezier conduits, camera motion blur, and seamless scene transitions).

**Core Mandate**:
- Choose cards, clean type, evidence, speaker footage or custom metaphors by meaning; a static component can be the right choice.
- Analyze beats, keep one coherent art direction and choreograph actions that help the story. Do not invent a metaphor for every line.
- Use [creative-video-direction](../creative-video-direction/SKILL.md) for selection and design memory,
  [physical-interaction-direction](../physical-interaction-direction/SKILL.md) for card/object interactions, and
  [character-and-object-design](../character-and-object-design/SKILL.md) only when a custom object helps.

For the current user's continuation, preserve the previous paper project's tokens and motion grammar via
[paper-motion-continuity.md](../motion-graphic-design/references/paper-motion-continuity.md). Graphic beats
need a meaningful primary motion, including card interactions; holds follow actions for readability.
Actively design a new character when its physical role is useful and feasible. Build contact, material and
force response using [physical-dynamics.md](../physical-interaction-direction/references/physical-dynamics.md).

---

## 1. Aesthetic Philosophy & Visual Identity

### A. The "Thoáng Đãng, Trọng Lượng & Xúc Giác" Philosophy
1. **Breathing Room**: Keep clean canvas margins and avoid crowding the screen. On a 1080px-wide frame, aim for 80–110px side clearance around the main composition; never let visible artwork, shadows, or motion trails come within 64px of the frame edge.
2. **Scale to the Active Area**: Judge each scene after accounting for its headline, speaker footage, captions, and platform-safe zones. When the hero composition looks undersized and unused space remains, enlarge the related visual group (typically by 10–25%), then recenter it in the space available. Do not leave a small focal group stranded in a large empty stage.
3. **Fit the Group, Not Each Item**: Scale connected cards, icons, labels, and their gaps together so their hierarchy and spacing remain intentional. Preserve readable text and recognizable marks; do not enlarge one item until it crowds its neighbors.
4. **Check the Outer Bounds**: Measure the full animated footprint, including shadows, rotation, spring overshoot, connector lines, and flight paths. Keep the complete footprint inside the safe clearance throughout the motion, not only at rest.
5. **Tactile Weight**: Choose easing, steady movement, spring or stillness to match the material and action. Overshoot is optional; grounded reading states should settle.
6. **Causal Interactivity**: The affected element reacts at the shared contact/state event. Scale the response to the action and material; the central hero need not react to unrelated events.
7. **Editorial Sophistication**: Clean paper textures, carbon printing ink, warm terracotta accents, and elegant serif italic emphasis.

### B. Canvas Architecture & Spatial Safe Zones (1080 × 1920, 9:16 Vertical)
To ensure optimal readability across mobile platforms (TikTok, Instagram Reels, YouTube Shorts), divide the vertical stage into 4 dedicated zones:

```text
 0px ┌──────────────────────────────────────────────┐
     │ Zone 1: Top UI Buffer + Header / Headline    │ y: 220 - 420px
     │   - Uppercase category tag, case number,     │
     │   - Dynamic Fraunces headline                │
     ├──────────────────────────────────────────────┤
     │ Zone 2: Visual Hero Stage (Dynamic Theater)  │ y: 440 - 1360px
     │   - 100% full-canvas motion graphic          │
     │   - Tactile paper cards, 3D window frames    │
     │   - Animated conduits, brand logos, badges   │
     │   - Height: 920px of pure creative space     │
     ├──────────────────────────────────────────────┤
     │ Zone 3: Floating Karaoke Captions (Safe)     │ y: 1380 - 1600px
     │   - Floating paper capsule, 54px Inter       │
     │   - Real-time active spoken word highlight   │
     │   - ZERO scene graphics may intrude here     │
     ├──────────────────────────────────────────────┤
     │ Zone 4: Mobile Platform Safe Margin (Floor)  │ y: 1600 - 1920px
     │   - 320px clearance for platform UI / icons  │
1920px└─────────────────────────────────────────────┘
```

### Short-Platform Compatibility (9:16)
- Keep essential headlines, faces, widget labels, and interaction points outside platform overlays. On a 1080 × 1920 frame, use a conservative starting safe area of **x: 80–900px** and **y: 220–1600px**; reserve the lower 320px for captions, controls, and platform UI.
- Treat the right edge as the most obstructed side because Shorts, Reels, and TikTok place action controls there. Keep essential content at least 180px from the right edge; verify the target platform's current preview when available because overlay layouts can change.
- Calculate the usable stage after accounting for split-screen speaker footage, captions, and any scene-specific crop. Move the whole composition down when a top title approaches the top UI buffer, while keeping its last motion frame clear of the speaker panel and caption zone.
- Include animation travel, shadows, and spring overshoot when checking these bounds. Background texture may extend behind overlays; information the viewer must read may not.

### C. Design Tokens & Color Palette
```typescript
export const theme = {
  colors: {
    background: '#FAF8F5',       // Luminous, warm off-white paper canvas
    paper: '#FFFFFF',            // Crisp white paper card surface
    paperMuted: '#F4F0E8',       // Slightly aged parchment tone for subtle cards
    ink: '#1A1816',              // Deep carbon printing ink (near black, soft on eyes)
    inkMuted: 'rgba(26, 24, 22, 0.55)', // Secondary labels and annotations
    accent: '#C6532A',           // Signature Warm Terracotta (Cam đất)
    accentLight: 'rgba(198, 83, 42, 0.12)', // Subtle highlight pill background
    line: 'rgba(26, 24, 22, 0.10)', // Ultra-clean hairline divider rules
    cardShadow: '0 16px 36px rgba(26, 24, 22, 0.08), 0 4px 12px rgba(26, 24, 22, 0.04)',
    hoverShadow: '0 24px 48px rgba(198, 83, 42, 0.18)',
  },
  fonts: {
    title: 'Fraunces, serif',    // Editorial display serif with italic flair
    body: 'Inter, sans-serif',   // Ultra-crisp geometric sans-serif
    mono: 'JetBrains Mono, monospace', // Terminal code & technical tags
  },
};
```

---

## 2. Motion Physics & Remotion Animation Engine

### A. Spring Physics Standard Configurations
Derive animation from `useCurrentFrame()` with configured fps and shared events. Use easing/interpolation,
spring, holds or baked tracks as appropriate; do not use autonomous CSS transitions. These spring configs are examples:

```typescript
import { spring } from 'remotion';

// 1. Stately Paper Weight: Heavy cards, window frames, main containers
export const SPRING_STATELY = { mass: 1.2, damping: 15, stiffness: 90 };

// 2. Snappy Pop: Small badges, checkmarks, satellite icons, active pills
export const SPRING_SNAPPY = { mass: 0.6, damping: 11, stiffness: 180 };

// 3. Heavy Impact Stamp: Rubber stamps, downward drops, locks slamming
export const SPRING_HEAVY = { mass: 1.5, damping: 16, stiffness: 220 };

// 4. Elastic Wobble / Recoil: Secondary reaction upon impacts
export const SPRING_RECOIL = { mass: 0.4, damping: 8, stiffness: 240 };
```

### B. Cinema-Grade Motion Blur with `@remotion/motion-blur`
For fast-moving layers, consider `<CameraMotionBlur>` only when it helps and the installed API is compatible.
Keep text sharp, check render cost, and do not wrap the whole composition by default:

```tsx
import { CameraMotionBlur } from '@remotion/motion-blur';

<CameraMotionBlur
  shutterAngle={180}
  samples={5}
>
  <div style={{ transform: `translateX(${x}px) rotate(${rot}deg)` }}>
    {children}
  </div>
</CameraMotionBlur>
```

### C. Continuous Idle Breathing (Living Elements)
Idle motion is optional. Grounded objects and cards usually settle; use breathing only for a suitable character
or atmosphere, and stop it when it competes with reading or the main action:
```typescript
const floatY = Math.sin(frame * 0.07 + phaseOffset) * 6; // ±6px gentle drift
const floatRot = Math.cos(frame * 0.05 + phaseOffset) * 1.2; // ±1.2deg organic tilt
```

---

## 3. Reactive Physical Micro-Interactions (The Core Differentiation)

In premium motion graphics, elements **react physically** to events happening around them. 
When an event actually affects another element, choose a restrained reaction appropriate to the material.
The following are optional examples, not mandatory reactions to every click:

### 1. Central Hero Squash & Recoil
When an item lands or a wire plugs in at frame `triggerFrame`:
```typescript
const rel = frame - triggerFrame;
const recoil = rel >= 0 && rel < 18
  ? Math.sin(rel * 0.45) * Math.exp(-rel * 0.18) * 16 // decays from 16px to 0
  : 0;

const squash = rel >= 0 && rel < 15
  ? 1 + Math.sin(rel * 0.5) * 0.08 * Math.exp(-rel * 0.2)
  : 1;

// Apply to hero component:
<div style={{ transform: `translateY(${recoil}px) scaleX(${squash}) scaleY(${2 - squash})` }} />
```

### 2. Expanding Shockwave Ripple
At the point of impact $(x, y)$:
```tsx
export const ShockwaveRing: React.FC<{ frame: number; triggerFrame: number; x: number; y: number; color?: string }> = ({
  frame, triggerFrame, x, y, color = '#C6532A',
}) => {
  const rel = frame - triggerFrame;
  if (rel < 0 || rel > 22) return null;
  const progress = rel / 22;
  const scale = 0.3 + progress * 2.2;
  const opacity = (1 - progress) * 0.7;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - 60,
        top: y - 60,
        width: 120,
        height: 120,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};
```

### 3. Celebratory Jump / Hop
When a task finishes or all items connect:
```typescript
const hopProgress = spring({
  frame: Math.max(0, frame - completeFrame),
  fps: 30,
  config: SPRING_SNAPPY,
});
const jumpY = relComplete >= 0 && relComplete < 20
  ? -Math.sin(relComplete * (Math.PI / 18)) * 26
  : 0;
```

---

## 4. The 7 Modular Motion Primitives

Use these proven, versatile primitives as building blocks for any creative scene:

### Primitive 1: `MaskReveal` (Typography & Title Unfold)
Wipes text into view cleanly using an animated terracotta block or clip-path.
```tsx
export const MaskReveal: React.FC<{
  text: string;
  frame: number;
  delay?: number;
  style?: React.CSSProperties;
  accentColor?: string;
}> = ({ text, frame, delay = 0, style, accentColor = '#C6532A' }) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: { mass: 0.8, damping: 14, stiffness: 120 },
  });

  return (
    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', ...style }}>
      <div style={{ transform: `translateY(${(1 - progress) * 110}%)`, opacity: progress }}>
        {text}
      </div>
    </div>
  );
};
```

### Primitive 2: `Flip3DIn` (3D Paper Unfold & Card Reveal)
Card flips open along the 3D axis with realistic perspective depth and specular lighting:
```tsx
export const Flip3DIn: React.FC<{
  children: React.ReactNode;
  frame: number;
  delay?: number;
  direction?: 'horizontal' | 'vertical';
}> = ({ children, frame, delay = 0, direction = 'horizontal' }) => {
  const spr = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: { mass: 1.1, damping: 14, stiffness: 95 },
  });

  const rot = (1 - spr) * (direction === 'horizontal' ? 90 : -75);
  const scale = 0.85 + spr * 0.15;
  const opacity = spr;

  return (
    <div
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        display: 'inline-block',
      }}
    >
      <div
        style={{
          transform: `${direction === 'horizontal' ? `rotateY(${rot}deg)` : `rotateX(${rot}deg)`} scale(${scale})`,
          opacity,
          transformOrigin: direction === 'horizontal' ? 'left center' : 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
```

### Primitive 3: `SplitSlideIn` (Contrasting Concepts / Options)
Two items slide in from opposite sides with anticipation lean and elastic settling:
```tsx
export const SplitSlideIn: React.FC<{
  children: React.ReactNode;
  frame: number;
  delay?: number;
  from: 'left' | 'right';
}> = ({ children, frame, delay = 0, from }) => {
  const spr = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: { mass: 0.9, damping: 13, stiffness: 110 },
  });
  const offset = from === 'left' ? -180 : 180;
  const translateX = (1 - spr) * offset;
  const rot = (1 - spr) * (from === 'left' ? -6 : 6);

  return (
    <div style={{ transform: `translateX(${translateX}px) rotate(${rot}deg)`, opacity: spr }}>
      {children}
    </div>
  );
};
```

### Primitive 4: `StampDropIn` (Heavy Impact Falling Card)
Falls from overhead with slight angle tilt, slamming down and triggering impact rings:
```tsx
export const StampDropIn: React.FC<{
  children: React.ReactNode;
  frame: number;
  delay?: number;
}> = ({ children, frame, delay = 0 }) => {
  const spr = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: { mass: 1.4, damping: 16, stiffness: 180 },
  });
  const scale = 1.6 - spr * 0.6;
  const translateY = (1 - spr) * -220;
  const rot = (1 - spr) * -7;

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rot}deg)`,
        opacity: Math.min(1, spr * 2),
      }}
    >
      {children}
    </div>
  );
};
```

### Primitive 5: `RadialLaunch` (Orbiting Badges / App Satellites)
Elements erupt radially outward from the hero center to orbiting positions $(x_i, y_i)$:
```tsx
export const RadialLaunch: React.FC<{
  children: React.ReactNode;
  frame: number;
  delay?: number;
  angleDeg: number;
  distance: number;
}> = ({ children, frame, delay = 0, angleDeg, distance }) => {
  const spr = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: { mass: 0.8, damping: 12, stiffness: 140 },
  });
  const rad = (angleDeg * Math.PI) / 180;
  const currentDist = spr * distance;
  const x = Math.cos(rad) * currentDist;
  const y = Math.sin(rad) * currentDist;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px) scale(${spr})`,
        opacity: spr,
      }}
    >
      {children}
    </div>
  );
};
```

### Primitive 6: `BezierWireConnect` (Conduit & Flow Paths)
Draws a smooth cubic bezier cable connecting two cards, followed by travelling energy particles:
```tsx
export const BezierWire: React.FC<{
  x1: number; y1: number;
  x2: number; y2: number;
  frame: number;
  delay?: number;
  color?: string;
}> = ({ x1, y1, x2, y2, frame, delay = 0, color = '#C6532A' }) => {
  const spr = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: { mass: 0.9, damping: 15, stiffness: 90 },
  });

  const dx = (x2 - x1) * 0.5;
  const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: 1080, height: 1920, pointerEvents: 'none' }}>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={800}
        strokeDashoffset={(1 - spr) * 800}
        strokeLinecap="round"
      />
    </svg>
  );
};
```

### Primitive 7: `CursorInteractive` (OS Finder / Clickable UI Simulation)
Simulates an animated cursor gliding to an element, depressing on click, and triggering responsive UI states:
```tsx
export const AnimatedCursor: React.FC<{
  fromX: number; fromY: number;
  toX: number; toY: number;
  frame: number;
  moveStart: number;
  clickFrame: number;
}> = ({ fromX, fromY, toX, toY, frame, moveStart, clickFrame }) => {
  const moveSpr = spring({
    frame: Math.max(0, frame - moveStart),
    fps: 30,
    config: { mass: 0.9, damping: 15, stiffness: 100 },
  });
  const x = fromX + (toX - fromX) * moveSpr;
  const y = fromY + (toY - fromY) * moveSpr;

  const isClicking = frame >= clickFrame && frame < clickFrame + 8;
  const clickScale = isClicking ? 0.82 : 1.0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${clickScale})`,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#1A1816">
        <path d="M4 2l14 11-6.5 1.5 4 7-3 1.5-4-7L4 19V2z" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    </div>
  );
};
```

---

## 5. Creative Visual Metaphor Generation Engine

Choose meaningful cards, direct visuals or a metaphor by the actual idea. The following metaphor prompts
are examples for relevant beats, not a requirement to turn each line into a physical object:

### Step 1: Detect the Emotional Conflict / Conceptual Dynamic
Analyze what is actually happening in the voiceover:
- **Overload / Influx**: Hundreds of emails, surging users, message flood.
- **Automation / Liberation**: Robot taking over mundane tasks, working while you sleep.
- **Connection / Integration**: Linking disjointed apps via connectors, APIs, or plugs.
- **Verification / Quality Gate**: Human reviewing drafts, checking, approving before sending.
- **Repackaging / Standardization**: Turning an interactive conversation into a recurring command or skill.
- **Instant Execution**: One-word slash command executing a complex pipeline in seconds.

### Step 2: Select a Tactile Physical Object Metaphor

| Concept in Script | Tactile Paper / Editorial Metaphor | Visual Implementation Recipe |
| :--- | :--- | :--- |
| **User/Message Surge** | Mobile device mockup with orbiting avatar bubbles & incoming email stack. | Clean phone frame at center; avatars burst via `RadialLaunch`; envelope cards slide in sequentially. |
| **Task Delegation** | Friendly mascot/robot reading a list, sorting cards into "Done" and "Draft". | Mascot hero on left; cards glide horizontally into organized paper tray. |
| **Human Review / Approval** | Clean draft card with "Duyệt & Gửi" button, simulated click & green check. | Cursor glides to button, triggers squash & green ink stamp `ĐÃ DUYỆT`. |
| **App Connector / OAuth** | macOS/iOS Settings modal with toggle switch flipping ON and status pill changing. | Window card with brand logos; animated toggle switch sliding from gray to `#10B981`. |
| **Step / Milestone Badge** | 3D unfolding badge with step number, icon, and gold edge foil. | `Flip3DIn` badge card; Fraunces display number `01`, `02`, `03` with terracotta glow. |
| **Search / Discovery** | Expanding search pill with typing animation and autocomplete dropdown. | Pill grows width $160 \rightarrow 620\text{px}$; character-by-character typing cursor. |
| **Packaging into Skill** | Funnel or origami box folding components into a single compact jewel/badge. | 3 cards float inward, scale down, and transform into a glowing `Skill` badge. |
| **Slash Command Execution** | Dark editorial code terminal pill typing `/morning_agent` with instant burst. | Pill with mono font; enter press triggers celebratory particles and progress bar. |
| **Call to Action / Outro** | Pair of clean editorial cards: Follow button + Comment input box. | Staggered `StampDropIn`; pulsing finger indicator and question tag. |

### Step 3: Enforce Visual Contrast Between Consecutive Scenes
Vary physics only when it helps the new idea; held layouts and repeated mechanisms can preserve continuity.
The following alternation is an optional example:
- **Scene N**: Rapid lateral split or slide.
- **Scene N+1**: Heavy vertical stamp drop with shockwave.
- **Scene N+2**: 3D horizontal card flip or unfold.
- **Scene N+3**: Dynamic bezier wire draw with traveling light pulses.

---

## 6. Official Brand Logos & Icon Strategy

- **Mandatory**: Always use official brand vector logos from `public/icon/` (Claude, OpenAI, Notion, Gmail, Google, GitHub, Apple, Calendar, etc.) instead of self-drawn approximations.
- Render them using crisp containers:
  ```tsx
  export const BrandLogo: React.FC<{ name: string; size?: number }> = ({ name, size = 64 }) => {
    return (
      <img
        src={`/icon/${name}.svg`}
        alt={name}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  };
  ```
- For standard system icons (checkmarks, arrows, search, settings, stars), always use Font Awesome vectors (`<FaIcon icon="..." />` or `pipeline/assets/fetch_fa_icon.py`).

---

## 7. Floating Karaoke Subtitle System

Captions are styled to integrate seamlessly with the editorial paper aesthetic while maintaining 100% readability:

```tsx
<div
  style={{
    position: 'absolute',
    left: 80,
    right: 80,
    top: 1440,
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    padding: '24px 44px',
    boxShadow: '0 20px 48px rgba(26, 24, 22, 0.12)',
    border: '1.5px solid rgba(26, 24, 22, 0.08)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px 18px',
    zIndex: 9999,
  }}
>
  {phraseWords.map((w, idx) => {
    const isActive = frame >= w.startFrame && frame < w.endFrame;
    return (
      <span
        key={idx}
        style={{
          fontFamily: 'Inter',
          fontSize: 52,
          fontWeight: 800,
          color: isActive ? '#C6532A' : '#1A1816',
          transform: isActive ? 'scale(1.10)' : 'scale(1.0)',
          transition: 'all 0.08s ease-out',
        }}
      >
        {w.text}
      </span>
    );
  })}
</div>
```

---

## 8. Production Routing and Approval

Use [ai-video-pipeline](../ai-video-pipeline/SKILL.md) and its
[raw-first workflow](../ai-video-pipeline/references/raw-first-workflow.md) as the production authority.
Do not run an episode-specific helper on a new raw without checking its actual inputs and defaults.
Preserve the original recorded voice; use TTS only when authorized. Canonical timing is milliseconds with
semantic anchors and explicit source/edit mapping; legacy files are compatibility exports under file permissions.

Select paper only when suitable. Plan beat lengths from the spoken idea and reading needs, with no fixed 2.5–5s rule.
Each scene uses only the needed headline, card, evidence, object or speaker. Avoid a required mascot, recoil,
entrance or exit. Choose cut, carry-over or transition by meaning; account for overlap in total duration.

Before approval, prepare components, static/audio QA and the approval packet. Do not call a renderer to
create a review grid before the project/version is explicitly approved in chat. After an approved render,
extract from that output, inspect output/review.png once and check motion around meaningful interactions.
Do not rerender the full video just to verify output existence. Apply the project gate to any changed version.

## 9. Creative Review with Evidence

- Is the paper direction appropriate and consistent, including any speaker/evidence layers?
- Does each card, chart, object or character help the spoken idea without an unnecessary metaphor?
- Do interactions have shared cues, contact points and material-appropriate reactions?
- Do text and grounded objects settle for reading instead of continuous idle float?
- Is the focus clear, with sufficient safe margins over the whole moving footprint?
- Are official marks and Font Awesome utility icons used where appropriate, with valid sources for other assets?
- Has the design been compared with available history without inventing records or breaking file permissions?
- Are static checks backed by evidence, and pixel/temporal checks marked pending until an approved render?
- After approval, was the one review grid inspection recorded, along with contact/settle/playback findings?

See [quality-and-acceptance.md](../ai-video-pipeline/references/quality-and-acceptance.md).
