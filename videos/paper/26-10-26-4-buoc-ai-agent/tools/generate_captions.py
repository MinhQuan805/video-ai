import json
import math

# Load whisper transcription
with open('videos/paper/26-10-26-4-buoc-ai-agent/whisper_transcription.json', 'r', encoding='utf-8') as f:
    raw_segments = json.load(f)

# Define exact clean Vietnamese phrases and timing
# Mapped accurately to the spoken audio
phrases_def = [
    # Hook
    ("Đây là cách để bạn tạo", 0, 48),
    ("một AI Agent", 48, 76),
    ("làm việc thay mình", 76, 96),
    ("chỉ với bốn bước đơn giản", 96, 121),
    # Bước 1
    ("Bước 01: Cài đặt AI Agent", 121, 170),
    # Thay vì chatbot -> Claude Code / Codex
    ("Thay vì dùng chatbot", 181, 215),
    ("gõ prompt thông thường", 215, 240),
    ("hãy cài Claude Code", 240, 270),
    ("hoặc Codex", 270, 295),
    # Local Agent
    ("Điểm mạnh ở đây là", 302, 334),
    ("AI Agent có thể truy cập file", 334, 380),
    ("và thực thi tác vụ", 380, 405),
    ("trực tiếp trên máy của bạn", 405, 440),
    # Bước 2
    ("Bước 02: Kết nối công cụ", 446, 490),
    ("Vào mục Connectors", 490, 520),
    ("để liên kết các ứng dụng", 520, 545),
    ("bạn dùng hàng ngày", 545, 565),
    # Gmail
    ("Ví dụ như Gmail", 577, 610),
    ("bước này cấp quyền cho AI", 610, 650),
    ("tự động đọc thư mới", 650, 688),
    # Phân loại vấn đề & CTA
    ("và nhận diện vấn đề cần xử lý", 688, 742),
    ("Muốn xem video hướng dẫn", 750, 785),
    ("cài đặt thực tế từng bước", 785, 810),
    ("bình luận AI Agent nhé!", 810, 850),
    # Bước 3
    ("Bước 03: Giao việc rõ ràng", 858, 905),
    ("Đưa ra yêu cầu thật chính xác", 905, 955),
    ("Đọc email hỗ trợ", 955, 990),
    ("phân nhóm vấn đề", 990, 1020),
    ("và soạn sẵn bản nháp câu trả lời", 1020, 1055),
    ("để tôi duyệt", 1055, 1080),
    # Iteration
    ("Kết quả chưa ưng ý", 1090, 1120),
    ("thì bổ sung chỉ dẫn vài lần", 1120, 1155),
    ("cho đến khi chạy mượt", 1155, 1195),
    # Bước 4
    ("Bước 04: Đóng gói thành Skill", 1195, 1245),
    ("Yêu cầu AI lưu toàn bộ quy trình", 1245, 1300),
    ("thành một Skill tái sử dụng", 1300, 1340),
    ("từ ngày mai", 1340, 1374),
    # Slash & Cron
    ("Bạn chỉ cần gọi đúng một lệnh", 1374, 1420),
    ("gạch chéo hoặc hẹn giờ mỗi sáng", 1420, 1465),
    ("AI sẽ tự động xử lý", 1465, 1500),
    ("xong xuôi trước khi bạn mở máy", 1500, 1565),
]

fps = 30
phrases = []

for text, start_f, end_f in phrases_def:
    words = text.split()
    n = len(words)
    dur = max(1, end_f - start_f)
    step = dur / n
    phrase_words = []
    for i, w in enumerate(words):
        w_start = math.floor(start_f + i * step)
        w_end = math.floor(start_f + (i + 1) * step)
        phrase_words.append({
            "text": w,
            "start_frame": w_start,
            "end_frame": w_end
        })
    phrases.append({
        "text": text,
        "start_frame": start_f,
        "end_frame": end_f,
        "words": phrase_words
    })

captions_data = {
    "total_frames": 1565,
    "fps": 30,
    "phrases": phrases
}

# Write captions to both source directory and public directory
paths = [
    "src/videos/paper/26-10-26-ai-agent-4-buoc/captions.json",
    "videos/paper/26-10-26-4-buoc-ai-agent/captions.json",
]

for p in paths:
    with open(p, "w", encoding="utf-8") as f:
        json.dump(captions_data, f, ensure_ascii=False, indent=2)

print(f"Generated {len(phrases)} caption phrases for 1565 frames.")
