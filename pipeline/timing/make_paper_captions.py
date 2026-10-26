import json
import math

with open("videos/paper/sample/words.json", "r", encoding="utf-8") as f:
    words = json.load(f)

# Phrases aligned to sentences
sentences_text = [
    ("Đây là cách để bạn tự tạo một AI Agent làm việc thay bạn chỉ với bốn bước đơn giản", 0, 102),
    ("Bước đầu tiên là cài AI Agent, bạn có thể cài Claude Code và Codex đều được", 102, 190),
    ("Chỉ cần lên Google tìm Claude hoặc ChatGPT Desktop App", 190, 262),
    ("Tải về rồi đăng nhập", 262, 283),
    ("Khác với chat bình thường, nó có thể tự mở file và làm việc ngay trên máy của bạn", 283, 373),
    ("Tiếp theo, hãy kết nối nó với các công cụ nó cần để làm việc thay cho bạn", 373, 472),
    ("Ví dụ như app của mình, hiện có nhiều người dùng nên email hỗ trợ cũng nhiều lên", 472, 564),
    ("Và mình muốn tạo một AI Agent đọc toàn bộ email, xác định và phân loại", 564, 649),
    ("các vấn đề người dùng cần hỗ trợ", 649, 688),
    ("Rồi soạn câu trả lời để mình chỉ cần duyệt và gửi", 688, 751),
    ("Bạn chỉ cần vào phần Connectors, tìm Gmail rồi bấm kết nối", 751, 824),
    ("để AI đọc được email thật của bạn", 824, 864),
    ("Bước 3 sẽ là giao việc, bạn nên mô tả cho AI Agent thật kỹ về nhiệm vụ", 864, 948),
    ("Ví dụ muốn AI đọc toàn bộ email hỗ trợ, phân loại theo từng vấn đề", 948, 1028),
    ("Rồi soạn câu trả lời để mình duyệt, bạn có thể yêu cầu cho đến khi đúng ý mình", 1028, 1123),
    ("Bước cuối cùng là tạo skill, khi thấy AI Agent đã làm ổn rồi", 1123, 1198),
    ("Bạn chỉ cần bảo hãy đóng gói toàn bộ quy trình vừa rồi thành một skill và tự động chạy mỗi sáng", 1198, 1311),
    ("Vậy là xong, những lần sau bạn muốn sử dụng chỉ cần nhập lệnh slash rồi tên skill của bạn", 1311, 1405),
    ("Nếu bạn muốn xem hướng dẫn chi tiết cách mình tạo AI Agent để xử lý công việc cho mình", 1405, 1500),
    ("thì hãy follow và comment xuống nhé", 1500, 1541),
]

fps = 30
phrases = []

# Map words to phrases by time
word_idx = 0
total_words = len(words)

for sent_text, s_frame, e_frame in sentences_text:
    sent_words = sent_text.split()
    n = len(sent_words)
    phrase_words = []
    
    # Calculate approximate or whisper-based word frames
    dur = max(1, e_frame - s_frame)
    step = dur / n
    for i, w in enumerate(sent_words):
        w_start = math.floor(s_frame + i * step)
        w_end = math.floor(s_frame + (i + 1) * step)
        phrase_words.append({
            "text": w,
            "start_frame": w_start,
            "end_frame": w_end
        })
    
    phrases.append({
        "text": sent_text,
        "start_frame": s_frame,
        "end_frame": e_frame,
        "words": phrase_words
    })

data = {
    "total_frames": 1541,
    "fps": 30,
    "phrases": phrases
}

with open("src/videos/paper/10-26-26/captions.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("src/videos/paper/2026-10-26-ai-agent-4-buoc/captions.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Captions generated successfully!")
