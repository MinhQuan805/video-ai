---
name: visual-vox-collage
description: >-
  Specifications and implementation recipes for Vox-style cutout collage video animations in Remotion.
  Use this skill when creating or editing videos featuring ripped paper, vintage halftone portraits,
  falling physics, sliding cutouts, 3D pop-up foldings, page flips, torn reveals, red tear transitions,
  animated map routes, or drafting ruler timelines.
---

# Visual System: Vox Cutout Collage

This skill outlines the aesthetic principles, color tokens, physics calculations, and component patterns for the **Vox Cutout Collage** visual system.

---

## 1. Palette & Material Tokens

All colors must derive from a single shared configuration so that changing the accent color changes the identity of the entire video.

```typescript
// Shared palette declaration
export const ACCENT_COLOR = "#E0401C"; // Crimson red / Burnt orange

export const theme = {
  colors: {
    background: "#FBFAF7",  // Vintage warm paper base
    paper: "#F3EEE2",       // Cutout paper piece
    floor: "#E4DFD3",       // Studio floor horizon (y ≈ 1340)
    ink: "#1B1815",         // Deep printing ink
    yellow: "#FFD23F",      // Highlighter marker & washi tape
    accent: ACCENT_COLOR,   // Single accent color
  },
  fonts: {
    anton: "Anton",         // Giant numbers and uppercase headline stamps
    fraunces: "Fraunces",   // Newspaper clippings & editorial subtitles
    beVietnamPro: "Be Vietnam Pro", // Body text & caption readability
  },
};
```

### SVG Paper Grain & Fibers
Every paper piece must be layered with an SVG `feTurbulence` grain filter to simulate tactile pulp:
```tsx
<svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.35 }}>
  <filter id="paper-texture">
    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.95" numOctaves={3} result="noise" />
    <feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.08   0 0 0 0 0.05   0 0 0 0.15 0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#paper-texture)" />
</svg>
```

### Dual-Drop Shadow Formula
A paper piece elevated at height $n$ (in pixels) uses a dual-drop shadow comprising a sharp contact shadow and a diffuse directional distant shadow:
$$\text{Contact Shadow} = 0\text{px } 1\text{px } 2\text{px } \text{rgba}(27, 24, 21, 0.3)$$
$$\text{Distant Shadow} = (0.75n)\text{px } (1.15n)\text{px } (1.4n + 4)\text{px } \text{rgba}(27, 24, 21, \min(0.38, 0.12 + 0.007n))$$

### 12fps Paper Jitter vs 30fps Camera/Captions
Cutout elements should update their transform jitter at 12 fps to evoke traditional stop-motion, while captions and camera sweeps remain at a smooth 30 fps:
```typescript
export const useCollageFrame = (targetFps: number = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // 30
  const step = fps / targetFps;     // 2.5
  return Math.floor(frame / step) * step;
};
```

---

## 2. Animation & Component Archetypes

### Archetype 1: Big Number Slam (`con số lớn`)
* **Visual**: Giant Anton font number ($\approx 400\text{px}$), uppercase, with distant shadow and torn label tag beneath.
* **Physics**:
  * Frames 0–2: Scale is $2.0\times$ (doubled) and tilted by $5^\circ$ with diffuse distant shadow.
  * Frames 2–7: Coils down to scale $1.0\times$ and $0^\circ$ rotation via damped spring (`damping: 12`, `stiffness: 140`).
  * Contact frame: Shadow snaps sharp against the paper.

### Archetype 2: Sliding Cutout (`hình cắt trượt`)
* **Visual**: Halftone figure/object resting on the floor ($y \approx 1340$) with a paper tape footer anchoring the base.
* **Accent Silhouette**: An SVG color-fill duplicate placed behind the cutout offset by $+20\text{px}$ horizontally and $+8\text{px}$ vertically:
  ```tsx
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <filter id="accent-silhouette-filter">
      <feColorMatrix type="matrix" values="0 0 0 0 0.878   0 0 0 0 0.251   0 0 0 0 0.110   0 0 0 1 0" />
    </filter>
  </svg>
  ```
* **Physics**:
  * Slide-in over 11 frames from screen edge: figure tilts backward by $-8^\circ$ to $-12^\circ$ due to acceleration drag.
  * Target contact at frame 11: Figure halts abruptly, tilting forward $+6^\circ$ from inertia.
  * Frames 11–25 (14 frames): Damped oscillation settling back to $0^\circ$:
    $$\theta(t) = A e^{-\lambda t} \cos(\omega t)$$

### Archetype 3: Falling Newspaper Snippet (`mẩu báo rơi`)
* **Visual**: Aged paper snippet with masthead, date line, bold serif headline, and simulated gray body text rules.
* **Physics**:
  * Drop phase (9 frames): Falls from $y = -800\text{px}$ to resting position, rotating $15^\circ - 20^\circ$ in flight.
  * Impact & bounce (14 frames): Sinks into the surface and rebounds with decaying amplitude:
    $$y_{\text{bounce}}(p) = 18 e^{-3.2p} \sin(2.5\pi p), \quad p \in [0, 1]$$
  * Finishing embellishments:
    * Frame $f_{\text{tape}}$: Semi-transparent yellow washi tape stamps across the top edge.
    * Frame $f_{\text{marker}}$: Highlighter sweep (`#FFD23F` at 40% opacity) wipes across key text.
    * Frame $f_{\text{photo}}$: Torn photo scrap pins over the bottom right corner.

### Archetype 4: 3D Pop-Up Character Fold (`nhân vật nổi 3D`)
* **Mechanism**: The cutout figure is split horizontally at $56\%$ height (right below the chin for portraits).
* **Fold Execution**:
  * Both halves initially lie flat folded back.
  * Bottom half pivots upward along a bottom edge hinge.
  * Top half begins unfolding with a **5-frame delay** relative to the bottom half.
  * Dynamic tilt shading: Any half tilted away from the light source receives an overlay brightness dim of $15\% - 30\%$.
  * Settles over 18 frames of unfolding and 20 frames of damped spring oscillation, leaving a subtle crease line.

### Archetype 5: Page Flip & Torn Reveal
* **3D Page Flip**: Card rotates around its vertical spine edge (`transformOrigin: "left center"`) in 3D perspective (`perspective: 1200px`), rotating from $-90^\circ$ to $0^\circ$ in 10 frames with a 16-frame overshoot settle.
* **Downward Torn Reveal**: A serrated paper tear path animates downward from top to bottom in 12 frames, uncovering the underlying illustration.

### Archetype 6: Full-Screen Paper Tear Wipe Transition
* A full-width sheet of accent-colored paper with a rough, torn edge slides horizontally across the entire screen over 16 frames.
* At frame 8, the screen is completely covered, allowing seamless background scene swaps.
* The outgoing scene exits, and the incoming scene starts delayed by 8 frames as the wipe clears.

### Archetype 7: Equirectangular Map Route
* **Projection Mapping**: Uses an Equirectangular satellite map cropped to bounds $[\text{west}, \text{north}, \text{east}, \text{south}]$.
* Coordinates $(\text{lon}, \text{lat})$ map linearly to pixel coordinates $(x, y)$ on canvas $(W, H)$:
  $$x = \frac{\text{lon} - \text{west}}{\text{east} - \text{west}} \times W$$
  $$y = \frac{\text{north} - \text{lat}}{\text{north} - \text{south}} \times H$$
* **Route Animation**: SVG `<path>` with `strokeDasharray` and `strokeDashoffset` dynamically drawn between waypoint coordinates.
* **Waypoint Pin Drop**: As the route hits each coordinate, an accent circular pin bounces down with scale overshoot and an accompanying location label tag.

### Archetype 8: Drafting Ruler Horizontal Timeline
* A horizontal drafting ruler strip ($\approx 940\text{px} \times 84\text{px}$) drops in 15 frames with mm/cm tick marks.
* An accent line draws across the central groove from left to right.
* As the line crosses each milestone coordinate, a circular pin dot pops out and a torn paper milestone card (Anton year, subtitle $< 20$ chars) slams down, alternating strictly above and below the ruler axis.

---

## 3. Subtitles & Typography Layering
* Subtitles reside in the lower third ($y \approx 1420$), on a white/cream rounded paper patch with deep ink border.
* Display the full current phrase (2–4 words) at once to maintain reading context.
* Highlight the active spoken word in real time with the accent color (`#E0401C` or `#C6532A`) while other words remain deep ink (`#1B1815`).
