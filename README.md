# Video AI — Programmatic AI Video Production Framework

> Framework tự động hóa sản xuất video ngắn (Vertical/Horizontal Video) chất lượng cao bằng mã nguồn: kết hợp **Remotion (React/TypeScript)**, **Python AI Pipeline (TTS, Whisper, Rembg)** và các hệ thống hình ảnh động học đa phong cách (**Vox Cutout Collage**, **Minimal Paper Editorial**).

---

## 🌟 Tổng quan kiến trúc (Architecture Overview)

Dự án được xây dựng theo triết lý **Video-as-Code** (Mã hóa toàn bộ quy trình biên tập video), loại bỏ hoàn toàn thao tác kéo thả thủ công trên phần mềm dựng truyền thống. Mỗi video là một tập hợp dữ liệu độc lập gồm kịch bản, âm thanh, mốc thời gian từng chữ, cấu hình phân cảnh và các linh kiện React có thể tái sử dụng.

```text
video-ai/
├── src/
│   ├── Composition.tsx             # Bộ điều phối video toàn cục (Global composition runner)
│   ├── Root.tsx                    # Đăng ký các Composition cho Remotion Studio & Renderer
│   ├── context/                    # React Context dùng chung (VideoContext, CaptionsContext)
│   ├── shared/                     # Linh kiện dùng chung toàn hệ thống (PlaceholderScene...)
│   ├── types/                      # Định nghĩa kiểu dữ liệu chuẩn (Captions, Scenes, Config)
│   ├── visual-systems/             # Các hệ thống đồ họa & chuyển động dùng chung
│   │   ├── cutout-collage/         # Hệ hình 01: Cắt dán Vox (Báo chí tài liệu, cắt dán nổi)
│   │   └── paper/                  # Hệ hình 02: Báo chí tối giản (Editorial, thanh lịch)
│   └── videos/                     # Mã nguồn React riêng biệt cho từng video
│       ├── registry.ts             # Danh mục đăng ký các video trong hệ thống
│       └── <video-name>/           # Thư mục mã nguồn riêng của từng video
│           ├── scenes/             # Các phân cảnh Scene1...SceneN riêng của video
│           ├── captions.json       # Dữ liệu phụ đề gióng chữ riêng
│           └── index.tsx           # Entry point của video (tự động theo visual_system)
├── pipeline/                       # Công cụ dùng chung, nhóm theo chức năng
│   ├── assets/                     # Cutout, ảnh nguồn, Font Awesome
│   ├── audio/                      # TTS và xử lý audio
│   ├── qa/                         # Filmstrip renderer
│   ├── research/                   # Chụp web và quản lý skill
│   └── timing/                     # Zoom/cursor cue
├── videos/                         # Thư mục lưu trữ từng dự án video riêng biệt
│   └── <video-name>/               # Mỗi thư mục là một video độc lập
│       ├── script.md               # Lời đọc kịch bản kèm nguồn tư liệu
│       ├── voice.wav               # File âm thanh giọng đọc AI
│       ├── words.json              # Mốc thời gian chi tiết từng từ (start, end)
│       ├── timing.txt              # Mốc ngắt cụm từ tự nhiên theo khung hình
│       ├── scenes.json             # Bảng phân cảnh và lựa chọn visual_system
│       ├── image-sources.md        # Bảng quản lý bản quyền ảnh (CC0, CC-BY, PD)
│       ├── assets/                 # Tư liệu hình ảnh đã qua xử lý
│       ├── tools/                  # Helper chỉ dùng riêng cho video này
│       └── output/                 # Video thành phẩm, filmstrips và bảng kiểm duyệt
└── .agents/skills/                 # Hệ thống kỹ năng chuẩn hóa cho Agent & Nhà phát triển
```

---

## 🎨 Các hệ thống hình ảnh (Visual Systems)

Hệ thống hỗ trợ chuyển đổi phong cách đồ họa linh hoạt thông qua trường `"visual_system"` khai báo ở đầu file `videos/<video-name>/scenes.json`:

### 1. `cutout-collage` (Vox Cutout Style)
* **Ý tưởng**: Phong cách báo chí điều tra Vox, cắt dán tài liệu lịch sử, báo chí vintage.
* **Bảng màu**: Nền giấy `#FBFAF7`, mảnh giấy `#F3EEE2`, sàn gỗ `#E4DFD3`, mực in `#1B1815`, bút dạ vàng `#FFD23F`, màu nhấn `#E0401C`.
* **Vật liệu**: Lớp hạt mịn và sợi ngang SVG `feTurbulence`, bóng đổ kép (tiếp xúc & đổ xa) biến thiên theo độ nâng $n$, chế độ giật 12 fps mô phỏng stop-motion.
* **Linh kiện chuyển động**:
  * `BigNumber`: Chữ số khổng lồ (font Anton) đập xuống nảy 2 nhịp kèm nhãn xé màu nhấn.
  * `SlidingCutout`: Hình cắt trượt ngang 11 khung nghiêng về sau, khựng và lắc quán tính 14 khung; đổ bóng vệt màu nhấn lệch +20px X, +8px Y.
  * `NewspaperSnippet`: Mẩu báo ngả vàng rơi tự do nghiêng 15–20°, lún nảy, dán băng dính trong mờ và vệt dạ quang quét qua tít.
  * `PopUpCharacter`: Nhân vật 3D gập đôi ngang cằm (56%), nửa dưới dựng quanh bản lề chân, nửa trên bật trễ 5 khung, nếp gấp chân thực.
  * `PageFlip & TornReveal`: Lật trang album 3D góc nghiêng và xé dải giấy hé lộ chi tiết.
  * `TearTransition`: Chuyển cảnh xé giấy màu nhấn che kín màn hình.
  * `MapRoute`: Bản đồ hải trình chiếu phẳng (Equirectangular) tự vẽ đường véc-tơ qua tọa độ thực và cắm ghim bật nảy.
  * `TimelineRuler`: Thước kẻ kỹ thuật rơi từ trên xuống, vạch màu nhấn tự chạy và các thẻ mốc năm đập so le trên dưới.

### 2. `paper` (Minimal Editorial Paper Style)
* **Ý tưởng**: Báo chí tri thức hiện đại, thoáng đãng, sang trọng, mỗi cảnh truyền tải duy nhất một thông điệp với chuyển động có sức nặng.
* **Bảng màu**: Nền giấy trắng ngà sáng `#FAF8F5`, thẻ giấy `#FFFFFF`, chữ mực đen sâu `#1A1816`, đúng một màu nhấn cam đất `#C6532A`.
* **Typography**:
  * Tiêu đề: Font **Fraunces** có chân cổ điển, các từ khóa nhấn mạnh được in nghiêng với sắc cam đất (`*từ cần nhấn*`).
  * Nội dung & số liệu: Font **Inter** rõ nét, hiện đại, căn chỉnh khoảng cách chữ thoáng rộng.
* **Ba kiểu cảnh trụ cột**:
  * `BigNumberScene`: Con số lớn tỷ lệ vàng, thẻ định danh danh mục (eyebrow tag), giải thích ngắn gọn.
  * `StepListScene`: Danh sách các bước tuần tự (`01`, `02`, `03`...), các thẻ bài báo chí thoáng rộng với vạch nhấn thanh mảnh.
  * `ComparisonScene`: So sánh đối sánh 2 cột cân bằng (Kế hoạch vs Thực tế, Trước vs Sau), thẻ kết luận tổng kết phía dưới.
* **Chuyển động**: Sử dụng chuyển động lò xo có trọng lượng lớn (`mass: 1.5 - 1.8`, `damping: 16 - 18`) mang lại cảm giác đầm chắc, vật lý chân thực.

---

## ⚡ Quy trình sản xuất video 7 giai đoạn (7-Stage Pipeline)

Mỗi video được hoàn thiện tuần tự qua 7 giai đoạn nghiêm ngặt:

```
[1. Nghiên cứu & Kịch bản] 
        ↓
[2. Thu âm AI & Whisper Forced Alignment] 
        ↓
[3. Phân cảnh & Nhịp điệu scenes.json] 
        ↓
[4. Sưu tầm & Xử lý hình ảnh cắt dán] 
        ↓
[5. Lập trình chuyển động Remotion] 
        ↓
[6. Kiểm duyệt lưới 5 khung hình (review.png)] 
        ↓
[7. Xuất video hoàn thiện & Đồng bộ ffprobe]
```

1. **Giai đoạn 1: Nghiên cứu & Kịch bản (`script.md`)**:
   * Đối chiếu tối thiểu 2 nguồn tư liệu chính xác (mọi năm, số liệu, tên riêng phải có bằng chứng).
   * Độ dài tiêu chuẩn video 30 giây: khoảng 110 – 120 tiếng tiếng Việt. Câu đầu gây bất ngờ, câu cuối mở câu hỏi tương tác.
2. **Giai đoạn 2: Giọng đọc & Gióng chữ (`voice.wav`, `words.json`, `timing.txt`)**:
   * Tạo âm thanh giọng đọc tiếng Việt chuẩn, khoảng nghỉ giữa 2 câu tự nhiên (0,28s).
   * Dùng Faster-Whisper (model Medium) đối soát từng chữ với kịch bản gốc để lấy chính xác mốc bắt đầu (`s`) và kết thúc (`e`) tính bằng giây.
   * Gom cụm 2–4 chữ theo nhịp tự nhiên vào `timing.txt` tính theo đơn vị khung hình (30 fps).
3. **Giai đoạn 3: Phân cảnh (`scenes.json`)**:
   * Mỗi cảnh dài tối thiểu 2 giây, khớp nhịp với các câu nói chính.
   * Khai báo kiểu cảnh, văn bản nổi bật (bọc trong `*...*`), keyframes xuất hiện của từng phần tử.
4. **Giai đoạn 4: Xử lý hình ảnh (`cutout.py`)**:
   * Chỉ sử dụng tư liệu có giấy phép rõ ràng (Public Domain, CC0, CC-BY) từ các kho tư liệu mở.
   * Lệnh `nguoi`: Tách nền bằng rembg, phủ lưới halftone nghiêng 45°, hiệu ứng mực lệch bản, viền giấy xé.
   * Lệnh `vat`: Giữ màu nguyên bản, phủ lưới nhẹ, xử lý khe hở mảnh.
   * Lệnh `xe`: Biến toàn bộ ảnh thành mảnh tranh xé mép gồ ghề.
5. **Giai đoạn 5: Dựng chuyển động Remotion**:
   * Tuyệt đối không dùng CSS animation hay `setTimeout`; 100% chuyển động điều khiển qua `interpolate` và `spring` theo số khung hình `useCurrentFrame()`.
   * Caption đặt ở 1/3 phía dưới màn hình, hiển thị trọn vẹn cả cụm từ và đổi màu chữ đang đọc theo thời gian thực.
6. **Giai đoạn 6: Kiểm duyệt chất lượng (`output/review.png`)**:
   * Trích xuất các khung hình đại diện ở cuối mỗi cảnh, ghép thành lưới kiểm duyệt có gắn nhãn số cảnh.
   * Tự kiểm tra: tràn mép khung hình, đè chữ, khó đọc hoặc va chạm lớp với caption.
7. **Giai đoạn 7: Xuất video thành phẩm (`final.mp4`)**:
   * Render chuẩn H.264, độ phân giải 1080x1920 (9:16), 30 fps, kèm audio.
   * Kiểm tra bằng `ffprobe` để đảm bảo độ dài video khớp chính xác từng mili-giây với file giọng đọc gốc.

---

## 🛠️ Hướng dẫn cài đặt & Vận hành

### Yêu cầu hệ thống
* **Node.js**: Phiên bản 22.x trở lên.
* **Python**: 3.10 hoặc 3.11 (khuyên dùng môi trường ảo `.venv`).
* **FFmpeg & FFprobe**: Đã cài đặt trong biến môi trường PATH.

### 1. Cài đặt thư viện
```bash
# Cài đặt các gói npm cho Remotion
npm install

# Khởi tạo môi trường ảo Python & cài đặt các gói xử lý AI
python -m venv .venv
.\.venv\Scripts\activate
pip install pillow numpy scipy scikit-image rembg faster-whisper
```

### 2. Mở giao diện xem trước (Remotion Studio)
```bash
npm run dev
# Mở trình duyệt tại http://localhost:3000
```

### 3. Các lệnh công cụ biên tập tự động

* **Tách nền và xử lý ảnh cắt dán**:
  ```bash
  # Tách người chân dung sang phong cách in báo halftone
  python pipeline/assets/cutout.py nguoi path/to/input.jpg path/to/output.png --preview path/to/preview.png

  # Xử lý đồ vật giữ màu
  python pipeline/assets/cutout.py vat path/to/object.png path/to/output.png

  # Xé mép tranh ảnh
  python pipeline/assets/cutout.py xe path/to/scenery.jpg path/to/output.png
  ```

* **Tự động cắt khoảng lặng & từ đệm video yap (`pipeline/audio/trim_yap.py`)**:
  ```bash
  # Cắt nhanh dead-air và khoảng lặng (ngưỡng -32dB, độ dài tối thiểu 0.35s)
  python pipeline/audio/trim_yap.py --input raw_recording.mp4 --output trimmed.mp4 --silence-thresh -32 --min-silence 0.35

  # Tự động phát hiện & cắt bỏ từ đệm (ừm, à, ờ, um, uh) bằng Whisper và xuất phụ đề khớp mốc mới
  python pipeline/audio/trim_yap.py --input raw_yap.mp4 --output final_trimmed.mp4 --remove-fillers --lang vi
  ```

* **Tạo kịch bản zoom mô phỏng màn hình (`pipeline/timing/screen_zoom.py`)**:
  ```bash
  # Tự động tính toán mốc zoom và chuyển động con trỏ từ bảng tương tác
  python pipeline/timing/screen_zoom.py --cues cues.json --output videos/<video-name>/screen_zoom_config.json --fps 30
  ```

* **Gióng hàng thời gian âm thanh Whisper**:
  ```bash
  python videos/vox/darwin/tools/transcribe.py
  ```

* **Tạo dải phim kiểm duyệt chuyển động (Filmstrip)**:
  ```bash
  python videos/vox/darwin/tools/make_filmstrip.py "20,25,30,35,40" "videos/vox/darwin/output/filmstrip.png" "Video"
  ```

* **Xuất lưới kiểm duyệt tất cả các cảnh (Review Grid)**:
  ```bash
  python videos/vox/darwin/tools/make_review_grid.py
  ```

* **Xuất video hoàn thiện (chỉ sau khi người dùng duyệt đúng project/version)**:
  ```bash
  node videos/vox/darwin/tools/render_video.mjs
  # Hoặc dùng CLI Remotion trực tiếp:
  npx remotion render Video videos/<video-name>/output/final.mp4 --port=3030
  ```

* **Kiểm tra độ dài đồng bộ bằng ffprobe**:
  ```bash
  ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 videos/<video-name>/voice.wav
  ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 videos/<video-name>/output/final.mp4
  ```

---

## 📚 Hệ thống kỹ năng chuẩn hóa (.agents/skills)

Dự án cung cấp bộ kỹ năng chuyên biệt cho AI Agent và lập trình viên trong thư mục `.agents/skills/`:

| Tên kỹ năng (`SKILL.md`) | Phạm vi áp dụng | Mô tả chức năng |
| :--- | :--- | :--- |
| **`ai-video-pipeline`** | Toàn bộ dự án | Quy trình mẹ điều phối 7 giai đoạn làm video AI từ A–Z. |
| **`yap-video-trimmer`** | Tự động biên tập video yap | Cắt bỏ khoảng lặng (dead-air), từ đệm (ừm, à, ờ, uh, um), render jump-cut và dịch mốc caption tự động. |
| **`screen-recording-motion`** | Mô phỏng màn hình & Demo UI | Khung cửa sổ macOS, camera zoom in/out, pan mượt mà, ánh đèn spotlight, con trỏ chuột và xung click. |
| **`research-and-asset-sourcing`** | Nghiên cứu & Sưu tầm tư liệu | Xác minh sự thật, tìm ảnh tự do bản quyền và phân loại tư liệu cần người dùng cung cấp. |
| **`creative-video-direction`** | Sáng tạo & Chỉ đạo nghệ thuật | Tư duy ẩn dụ thị giác, nhịp điệu điện ảnh, phối màu tâm lý và chống hardcode. |
| **`visual-vox-collage`** | Hệ hình Vox | Đặc tả kỹ thuật dựng video phong cách cắt dán tài liệu Vox. |
| **`visual-paper-editorial`** | Hệ hình Paper | Đặc tả kỹ thuật dựng video phong cách báo chí tối giản, có sức nặng. |
| **`audio-speech-alignment`** | Giai đoạn âm thanh | Chuẩn hóa phát giọng đọc AI và gióng chữ cấp độ từ bằng Whisper. |
| **`cutout-image-processing`** | Giai đoạn đồ họa | Thuật toán xử lý ảnh halftone, tách nền rembg và xé viền giấy. |

---

## 📄 Bản quyền & Đóng góp
Dự án được thiết kế dưới dạng mã nguồn mở phục vụ nghiên cứu và sản xuất nội dung tự động hóa chất lượng cao. Mọi tư liệu hình ảnh và âm thanh trong từng video tuân thủ nghiêm ngặt chính sách phạm vi công cộng (Public Domain) và giấy phép Creative Commons.
