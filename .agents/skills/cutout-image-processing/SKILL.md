---
name: cutout-image-processing
description: >-
  Procedures and image processing algorithms for sourcing licensed media, background removal,
  halftone screen printing simulation, chromatic aberration, and torn paper edge generation
  for collage video animations.
---

# Pipeline Stage: Cutout Image Processing

This skill governs the acquisition, licensing verification, and algorithmic transformation of photographic assets into tactile, paper-cutout graphics.

## Choose processing by the scene

Apply cutout/halftone/torn edges only when the chosen material calls for them. Preserve clean product evidence,
brand marks and readable details when distortion would reduce clarity. A self-designed rigged actor belongs to
[character-and-object-design](../character-and-object-design/SKILL.md), not necessarily a downloaded photo.
Follow [autonomous-skill-and-asset-evolution](../autonomous-skill-and-asset-evolution/SKILL.md) for sourcing,
cost and permissions, and [ai-video-pipeline](../ai-video-pipeline/SKILL.md) for render approval. Source asset
inspection is distinct from a rendered composition preview; do not create preview video as part of asset QA.

---

## 1. Asset Sourcing & License Verification

1. **Permitted Licenses**:
   - For autonomously downloaded stock, prefer **Public Domain (PD)**, **CC0**, or **CC-BY**. Other licenses require compatible verified terms; do not silently accept obligations the intended delivery cannot satisfy.
   - Strictly prohibit non-commercial (CC-NC), no-derivatives (CC-ND), or unverified copyright assets.
   - User-supplied/owned/expressly licensed artwork follows its authorized use and provenance; it need not be public-domain stock. Do not infer rights from availability alone. Research captures follow the existing sourcing policy.
2. **Automated Wikimedia Commons Verification**:
   - Query the Wikimedia Commons Action API for `extmetadata`:
     ```text
     https://commons.wikimedia.org/w/api.php?action=query&titles=File:<Filename>&prop=imageinfo&iiprop=url|extmetadata&format=json
     ```
   - Validate `LicenseShortName` and record:
     * Filename
     * Source page URL
     * Author / Creator
     * License type
     * Intended scene / sentence usage
   - Store all records in `videos/<video-name>/image-sources.md`.

---

## 2. Processing Command 1: Portraits (`nguoi`)

Transforms modern or archival photographic portraits into vintage newspaper halftone prints.

1. **Background Removal**:
   - Model: `u2net_human_seg` via `rembg`.
   - Edge refinement: Erode mask by $1\text{px}$ to eliminate soft halos; remove isolated debris islands smaller than $100\text{px}^2$.
2. **Newspaper Halftone Screening**:
   - Convert RGB image to grayscale $L(x, y) \in [0, 1]$.
   - Grid orientation: Rotate coordinate space by $45^\circ$.
   - Cell size: $S = 7\text{px}$.
   - Dot radius $R$ in each cell is proportional to local darkness:
     $$R = \sqrt{1 - L_{\text{mean}}} \times \left(\frac{S}{\sqrt{2}}\right)$$
   - Color mapping: Replace pure white with cream paper tone (`#F3EEE2` $[243, 238, 226]$) and blacks with deep carbon ink (`#1B1815` $[27, 24, 21]$).
   - Blend: $60\%$ halftone screen pattern $+ 40\%$ original continuous grayscale to preserve facial clarity and expressions.
3. **Chromatic Registration Error (Mực Lệch Bản)**:
   - Simulate vintage high-speed rotary press misalignment:
     * Red color plate shifted: $+1\text{px}$ to $+2\text{px}$ along $X$, $+1\text{px}$ along $Y$.
     * Blue/Cyan color plate shifted: $-1\text{px}$ to $-2\text{px}$ along $X$, $-1\text{px}$ along $Y$.
4. **Scissor-Cut Paper Border**:
   - Expand the alpha silhouette outward by $\approx 10\text{px}$.
   - Polygon approximation: Convert curved silhouette contour into straight, uneven scissor facet cuts.
   - Cut the bottom edge completely horizontal to create a stable resting base on the floor.
   - Target resolution: Longest dimension scaled to $1100\text{px}$ in transparent PNG.

---

## 3. Processing Command 2: Objects & Artifacts (`vat`)

Used for mechanical equipment, scientific instruments, ships, fossils, and monuments while preserving original coloration.

1. **Background Separation**:
   - Model: `isnet-general-use` via `rembg` for complex subjects.
   - **Solid Background Fallback (`--solid-bg`)**:
     * When objects have intricate rigging, wires, or antennas on a flat white/black studio background, sample the 4 image corners:
       $$\text{Color}_{\text{bg}} = \text{median}(\text{Corner Samples})$$
     * Threshold using Euclidean RGB distance: Keep pixel if $\|\mathbf{C}(x, y) - \text{Color}_{\text{bg}}\| > 30$.
     * Fills fine holes and retains delicate rigging lines without AI model blur.
2. **Texturing & Margins**:
   - Preserve original RGB color palette while applying a subtle $10\%$ halftone dot overlay.
   - Apply chromatic plate shift and straight-scissor paper border.

---

## 4. Processing Command 3: Full-Frame Paintings & Scenery (`xe`)

Used when an entire painting, map, or historical document serves as a tactile paper piece without subject extraction.

1. **Torn Paper Perimeter**:
   - Retain full image dimensions with a $20\text{px}$ white inner margin.
   - Perturb the outer perimeter using a random walk / Perlin noise displace filter to simulate hand-torn fibers.
   - Add feathered paper pulp micro-fibers along the outer rim.
2. **Output Formatting**:
   - Save directly as a transparent PNG with the torn perimeter intact.

---

## 5. Batch Automation & Verification Sheet (`cutouts.png`)

1. Read `image-sources.md` and execute the designated processing command for every raw file in `assets/source/`:
   ```bash
   python pipeline/assets/cutout.py nguoi assets/source/person.jpg assets/person.png
   python pipeline/assets/cutout.py vat assets/source/item.png assets/item.png --solid-bg
   python pipeline/assets/cutout.py xe assets/source/scene.jpg assets/scene.png
   ```
2. **Contact Sheet Verification**:
   - Composite all processed PNG assets onto a single neutral gray/colored inspection sheet: `videos/<video-name>/output/cutouts.png`.
   - Inspect visually for:
     * Artifact halos or green-screen spill.
     * Erroneously truncated appendages, antennas, or hair.
     * Natural paper border consistency.
