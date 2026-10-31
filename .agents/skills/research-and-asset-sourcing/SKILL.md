---
name: research-and-asset-sourcing
description: >-
  Procedures for deep content fact-checking, visual concept extraction, open-source asset gathering,
  and user asset request specification. Use this skill during Stage 1 and Stage 4 to research facts,
  verify historical/scientific accuracy, find licensed/public media, or resolve an essential missing asset
  after checking local material, official sources and a suitable code-drawn fallback.
---

# Pipeline Stage: Content Research & Visual Asset Sourcing

This skill governs the **investigative research** and **visual asset acquisition** phases. Producing high-impact programmatic videos requires verified factual precision and authentic visual evidence.

Follow [autonomous-skill-and-asset-evolution](../autonomous-skill-and-asset-evolution/SKILL.md) for downloads,
captures, dependencies and cost. Use [creative-video-direction](../creative-video-direction/SKILL.md) to choose
whether the scene needs an external asset at all; code-drawn actors and card interactions are valid primary visuals.
Preserve raw voice and render gates through [ai-video-pipeline](../ai-video-pipeline/SKILL.md).

---

## 1. Deep Factual Research & The "Hard Fact" Matrix

Research factual claims that need evidence, with effort proportional to uncertainty and consequence. Prefer
primary/official sources; cross-check disputed or changing claims. Personal experience does not need invented
citations, and an unrelated claim must not block independent motion/layout work. Stop when reliable evidence
answers the needed question; do not make exhaustive research a prerequisite for every line of code.

### A. Newsworthiness & Source Selection

When choosing which developments, examples, or frames deserve attention, assess them against these factors and
adapt their weight to the audience and story. **Relevance to the intended audience is essential**; do not force
every factor into every topic, and do not exaggerate a factor to manufacture a hook:

1. **Recency** — prioritize developments that just happened when the story is time-sensitive; label dates clearly.
2. **Relevance** — favor direct impact on the target audience, profession, interests, or needs.
3. **Celebrity / influence** — consider public figures, leaders, and recognized experts when their role matters to the story.
4. **Proximity** — consider geographic or cultural closeness to the intended audience.
5. **Conflict** — surface meaningful disagreement, competing interests, or tradeoffs fairly.
6. **Unusualness** — notice rare, surprising, or genuinely atypical details.
7. **Ongoing developments** — prefer current updates for stories that are still unfolding, and distinguish confirmed facts from developing claims.

Use these as editorial signals, not as a substitute for factual verification. Prefer primary sources for claims and
cross-check consequential or fast-changing details before scripting.

### B. The "Hard Fact" Extraction Checklist
Extract and document every unshakeable factual anchor in `videos/<video-name>/script.md`:
* [ ] **Chronological Anchors**: Exact years, dates, durations (e.g., $1831$, $1836$, $1859$, "5 năm", "5 tuần").
* [ ] **Numerical Data**: Quantities, measurements, ages, distances, coordinates (e.g., "22 tuổi", "3 năm 3 tháng", $-38.51^\circ$).
* [ ] **Entity Names**: Full legal/historical names of people, vessels, organizations, species (e.g., *HMS Beagle*, *Robert FitzRoy*, *Geospiza fortis*).
* [ ] **Direct Primary Quotations**: Verbatim quotes from letters, logbooks, or speeches with author and date citations.
* [ ] **Core Conflict / Paradox**: The surprising pivot or central counter-intuitive premise that anchors the video's hook.

### C. Era & Historical Disambiguation Rules
* **Subject Age & Era Verification**: Always cross-reference the portrait with the historical moment depicted. For example, if the script discusses Charles Darwin at age $22$, never use the iconic portrait of an elderly bearded Darwin from the 1870s; search specifically for the 1840 Richmond watercolor or early sketches.
* **Vessel / Machine Class Authenticity**: Ensure equipment blueprints, ship paintings, or aircraft models match the exact historical sub-class or refit era mentioned in the script.
* **Geographical Accuracy**: For maps, ascertain the historical borders and contemporary place names corresponding to the era.

---

## 2. Asset Classification: AI Autonomous Sourcing vs. User-Provided Media

Creative fit comes before asset collection. Do not source imagery just to fill a shot: first decide whether the
story needs authentic source material, a restrained typographic beat, or a bespoke chart/illustration/motion graphic.
Use an existing visual system only when it strengthens that scene; new project-local components are appropriate
when they express the idea more clearly or distinctively.

Clearly segregate media assets into two operational pipelines:

```text
Visual Assets
├── Category A: AI Autonomous Gathering (Open / Public Domain Archives)
└── Category B: User-Provided Media (Proprietary, Brand, or Licensed Assets)
```

---

### Category A: Assets the AI Can Autonomously Fetch & Verify

The AI is fully empowered to query, evaluate licenses, download, and crop media from authorized open archives without bothering the user:

#### 1. Permitted Public Repositories & Autonomous Tools
* **Wikimedia Commons**: High-resolution historical portraits, scientific plates, engraving scans, archival manuscripts.
  * Tự động tải & kiểm tra giấy phép: `python pipeline/assets/fetch_media.py commons --title "File:..." --video <video-name>`
  * Tự động tìm kiếm theo từ khóa: `python pipeline/assets/fetch_media.py search --query "..." --video <video-name> --limit 2`
* **Direct Web / Open Archives (NASA, Smithsonian, Unsplash Open)**:
  * Tự động tải từ link ảnh trực tiếp: `python pipeline/assets/fetch_media.py direct --url "..." --video <video-name> --filename name.jpg`
* **Internet Research & Autonomous High-DPI Web Screenshot / Frame Search**:
  * Khi kịch bản cần bằng chứng từ bài báo khoa học, GitHub repository, landing page sản phẩm, bài đăng X/Twitter, trang tin tức:
  * AI được tự do tìm kiếm và chụp screenshot/frame công khai để nghiên cứu, đối chiếu, hoặc làm tư liệu hình phù hợp; không cần kiểm tra license từng screenshot/frame, không cần ghi URL/ngày/tác giả vào `image-sources.md`.
  * Tự động dùng công cụ chụp màn hình headless Retina 2x:
    `.\.venv\Scripts\python.exe pipeline/research/web_capture.py screenshot --url "https://..." --output videos/<video-name>/assets/source/proof.png --scale 2 --allow-install`
  * Chụp phần tử bài viết hoặc tài liệu cụ thể:
    `.\.venv\Scripts\python.exe pipeline/research/web_capture.py screenshot --url "https://..." --selector "article" --output videos/<video-name>/assets/source/article.png --allow-install`
  * Chi phí = $0 (chạy Playwright Chromium cục bộ), an toàn (sandbox, timeout 30s, tự động loại bỏ banner).

#### 2. License Validation for Downloaded Assets
* Tự động kiểm tra bản quyền qua `pipeline/assets/fetch_media.py` hoặc Wikimedia Commons API:
* **Approved**: `Public domain`, `CC0`, `CC-BY-SA`, `CC-BY`.
* **Strictly Prohibited**: `CC-BY-NC`, `CC-BY-ND`, `Fair Use`, hoặc nguồn không rõ bản quyền.
* Quy trình này áp dụng cho ảnh/video/icon tải về như asset độc lập. Không áp dụng cho screenshot hoặc frame được AI tìm/chụp trong quá trình nghiên cứu.
* Ghi thông tin nguồn của asset tải về vào `videos/<video-name>/image-sources.md`; không tạo bảng attribution cho screenshot/frame nghiên cứu.

#### 3. Default Standard for Icons: Font Awesome
Khi phân cảnh hoặc giao diện mô phỏng cần sử dụng icon (biểu tượng trạng thái, điều hướng, mạng xã hội, thiết bị, huy hiệu...):
* **Mặc định luôn sử dụng Font Awesome** (Free Solid, Regular, Brands):
  * Trong mã nguồn React/Remotion: Dùng component `<FaIcon icon="tên_icon" size={...} color={...} />` từ `src/shared/FaIcon`.
  * Khi cần trích xuất file vector tĩnh (SVG/PNG) tự động:
    `python pipeline/assets/fetch_fa_icon.py <tên_icon> --color "#C6532A" --output videos/<video-name>/assets/icon.svg`
  * Tự động tải từ GitHub chính thức của Font Awesome, hoàn toàn miễn phí ($0) và đồng bộ visual.

---

### Category B: Essential Assets Requiring User Access or Rights

First check authorized local assets, `public/icon/`, official public sources and whether a code-drawn visual
can carry the idea faithfully. Ask only when a specific missing private/proprietary asset is essential and no
appropriate fallback exists; continue independent work. Do not ask for an entire brand kit by default.

#### Possible Essential Inputs, Only When the Scene Requires Them:
1. **Brand & Corporate Identity**:
   * Brand logos, corporate wordmarks, app iconography.
   * Brand color tokens (Hex codes) and typography guidelines.
   * *Requirement*: Vector SVG or transparent 32-bit PNG, minimum width $\ge 1200\text{px}$.
2. **Proprietary Products & UI Mockups**:
   * Hardware product photography, packaging renders.
   * Software application UI screenshots, Figma screen exports, dashboard captures.
   * *Requirement*: High-DPI ($2\times$ or $3\times$ Retina display capture), clean background, without compression artifacts.
3. **Private / Copyrighted Footage & B-Roll**:
   * Contemporary company office b-roll, event recordings, private podcast interviews.
   * Modern drone shots of proprietary facilities or private real estate.
   * *Requirement*: 1080p or 4K H.264/ProRes MP4, $30\text{fps}$ or $60\text{fps}$.
4. **Private Documents & Proprietary Data**:
   * Internal sales pitch decks, confidential financial spreadsheets, private legal contracts.
   * *Requirement*: High-resolution PDF or scanned PNG, clean orientation.
5. **Custom Voiceovers or Music**:
   * Custom studio voice actor WAV tracks, licensed background music stems.
   * *Requirement*: Lossless 24-bit/48kHz or 16-bit/44.1kHz WAV.

#### Standard Format for Requesting User Assets:
When prompting the user for required assets, generate a structured markdown request:

```markdown
### 📋 Danh sách tư liệu cần bạn cung cấp (User Asset Checklist)

Để đảm bảo chất lượng hiển thị và đúng bản quyền cho video, xin vui lòng cung cấp các file sau vào thư mục `videos/<video-name>/assets/source/`:

| Tên file đề xuất | Loại tư liệu | Mô tả chi tiết & Yêu cầu kỹ thuật | Dùng cho phân cảnh |
| :--- | :--- | :--- | :--- |
| `logo-brand.svg` | Logo vector | Logo chính thức nền trong suốt (hoặc PNG $\ge 1200\text{px}$) | Cảnh mở đầu & Cảnh kết |
| `app-dashboard.png` | Ảnh chụp màn hình | Ảnh chụp giao diện dashboard sắc nét (Retina 2x, không nén) | Cảnh 3: Minh họa tính năng |
| `broll-factory.mp4` | Video b-roll | Đoạn clip 5–10s quay dây chuyền sản xuất (1080p, 30fps) | Cảnh 4: Quy trình vận hành |
```

---

## 3. The Visual Idea-to-Asset Translation Matrix

Use these examples when authentic source material helps the claim. They do not require an external artifact
for every sentence; custom objects, card motion and clean diagrams may express the idea better:

| Sentence / Concept Type | Visual Anchor Goal | Candidate Sourcing Strategy | Processing Recipe |
| :--- | :--- | :--- | :--- |
| **Historical Protagonist** | Humanize character; establish era authenticity. | Search Commons for early portrait watercolor / lithograph. | `pipeline/assets/cutout.py nguoi` (halftone, offset silhouette, scissor border). |
| **Scientific Observation** | Provide visual proof of discovery (e.g. finches, fossils). | Search Commons for original publication plate or museum specimen. | `pipeline/assets/cutout.py vat` (retain color, paper padding). |
| **Large Passage of Time** | Physicalize duration and distance. | Equirectangular map crop; vintage marine chronometer. | `videos/vox/darwin/tools/prepare_map.py` & `TimelineRuler.tsx`. |
| **Key Archival Document** | Anchor the turning point with historical gravity. | Search Commons for title page, diary notebook scan, handwritten letter. | `pipeline/assets/cutout.py xe` (torn parchment edges, paper texture). |
| **Brand / Product Feature** | Explain the actual product behavior. | Local official mark or public official material first; user-only asset when essential. | Readable UI/card or code-drawn explanation with causal motion. |

---

## 4. Documentation: The `image-sources.md` Specification

When a video uses downloaded image/video assets, maintain `image-sources.md` for those assets and their processing lineage. Research-only screenshots and searched frames do not need entries:

```markdown
# Nguồn ảnh & Tư liệu cho video: <video-name>

| Tên file | Link nguồn (URL / User) | Tác giả / Bản quyền | Loại giấy phép | Dùng cho cảnh | Lệnh xử lý | Mô tả tư liệu |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `portrait.png` | [Commons Link](https://...) | John Doe (1840) | Public domain | Cảnh 1 | `nguoi` | Chân dung nhân vật thời trẻ |
| `logo.svg` | Do người dùng cung cấp | Công ty ABC | Bản quyền nội bộ | Cảnh 1 & 5 | `vector` | Logo nhận diện thương hiệu |
| `specimen.png` | [Smithsonian Open Access](https://...) | Naturalist Guild | CC0 | Cảnh 4 | `vat` | Bản vẽ mẫu vật hóa thạch |
```

---

## 5. Pre-Production Sourcing Checklist

Before advancing to Remotion animation coding:
1. [ ] Are claims that require evidence backed by suitable sources, with uncertainty and cross-checks where needed?
2. [ ] Are relevant dates/numbers/names verified without treating personal experience as an externally proven fact?
3. [ ] Have downloaded standalone image/video assets been screened for copyright compliance (PD, CC0, CC-BY)? Skip license checks for research screenshots and searched frames.
4. [ ] Have local/official/code-drawn fallbacks been tried before asking for a genuinely essential private asset?
5. [ ] Are downloaded standalone assets documented in `image-sources.md`? Screenshot/frame research does not need logging.
