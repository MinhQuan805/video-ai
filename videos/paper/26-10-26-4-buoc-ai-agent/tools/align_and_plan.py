import json
import math

with open('videos/paper/26-10-26-4-buoc-ai-agent/whisper_transcription.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

# The user's intended script based on the raw speech:
# 1. 0.0 - 4.04: "Đây là cách để bạn tạo một AI Agent làm việc thay mình chỉ với bốn bước đơn giản"
# 2. 4.04 - 5.64: "Bước 1: Cài đặt AI Agent"
# 3. 6.02 - 9.72: "Thay vì dùng chatbot gõ prompt thông thường, hãy cài Claude Code hoặc Codex"
# 4. 10.08 - 14.48: "Điểm mạnh ở đây là AI Agent có thể truy cập file và thực thi tác vụ trực tiếp ngay trên máy tính của bạn"
# 5. 14.86 - 16.26: "Bước 2: Kết nối công cụ"
# 6. 16.26 - 18.84: "vào mục Connector để liên kết các ứng dụng bạn dùng hàng ngày"
# 7. 19.24 - 22.92: "ví dụ như Gmail, bước này cấp quyền cho AI tự động đọc thư mới"
# 8. 22.92 - 24.74: "và nhận diện vấn đề cần xử lý"
# 9. 25.02 - 28.22: "Muốn xem video hướng dẫn cài đặt thực tế từng bước bình luận AI Agent nhé"
# 10. 28.64 - 31.52: "Bước 3: Giao việc rõ ràng, đưa ra yêu cầu thật chính xác"
# 11. 31.74 - 35.80: "đọc email hỗ trợ, phân nhóm vấn đề và soạn sẵn bản nháp câu trả lời để tôi duyệt"
# 12. 36.32 - 39.58: "Kết quả chưa ưng ý, thì bổ sung chỉ dẫn vài lần cho đến khi quy trình chạy mượt"
# 13. 39.84 - 41.36: "Bước 4: Đóng gói thành Skill"
# 14. 41.68 - 45.80: "yêu cầu AI lưu toàn bộ quy trình vừa tạo thành một Skill tái sử dụng từ ngày mai"
# 15. 45.80 - 50.32: "bạn chỉ cần gọi đúng một lệnh gạch chéo hoặc hẹn giờ mỗi sáng, AI sẽ tự động xử lý"
# 16. 50.32 - 52.00: "xong xuôi trước khi bạn kịp mở máy"

with open('videos/paper/26-10-26-4-buoc-ai-agent/segments_summary.txt', 'w', encoding='utf-8') as out:
    out.write(f"Total whisper segments: {len(segments)}\n")
    for i, s in enumerate(segments):
        sf = int(round(s['start'] * 30))
        ef = int(round(s['end'] * 30))
        out.write(f"Seg {i+1} [{s['start']:.2f}s - {s['end']:.2f}s | {sf}f - {ef}f]: {s['text']}\n")
print("Done writing segments_summary.txt")
