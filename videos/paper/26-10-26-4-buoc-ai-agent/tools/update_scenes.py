import json

scenes = [
    {
        "id": "scene_01_hook",
        "title": "Tự tạo AI Agent chỉ với 4 bước",
        "from": 0,
        "to": 121
    },
    {
        "id": "scene_02_step1_badge",
        "title": "Bước 01: Cài Agent",
        "from": 121,
        "to": 170
    },
    {
        "id": "scene_03_search_desktop",
        "title": "Chatbot vs Claude Code / Codex",
        "from": 170,
        "to": 295
    },
    {
        "id": "scene_04_local_agent",
        "title": "Không chỉ chat, làm trên máy",
        "from": 295,
        "to": 440
    },
    {
        "id": "scene_05_step2_connect",
        "title": "Bước 02: Nối với công cụ",
        "from": 440,
        "to": 488
    },
    {
        "id": "scene_06_connector_catalog",
        "title": "Mục Connectors liên kết ứng dụng",
        "from": 488,
        "to": 565
    },
    {
        "id": "scene_07_gmail_auto_read",
        "title": "Gmail tự động đọc thư mới",
        "from": 565,
        "to": 688
    },
    {
        "id": "scene_08_problem_triage",
        "title": "Nhận diện & phân loại vấn đề",
        "from": 688,
        "to": 742
    },
    {
        "id": "scene_09_callout_cta",
        "title": "Bình luận AI Agent",
        "from": 742,
        "to": 850
    },
    {
        "id": "scene_10_step3_badge",
        "title": "Bước 03: Giao việc rõ ràng",
        "from": 850,
        "to": 905
    },
    {
        "id": "scene_11_prompt_instruction",
        "title": "Yêu cầu thật chính xác",
        "from": 905,
        "to": 955
    },
    {
        "id": "scene_12_draft_approval",
        "title": "Soạn nháp, chỉ cần duyệt & gửi",
        "from": 955,
        "to": 1080
    },
    {
        "id": "scene_13_iteration_loop",
        "title": "Tối ưu chỉ dẫn cho đến khi mượt",
        "from": 1080,
        "to": 1195
    },
    {
        "id": "scene_14_step4_badge",
        "title": "Bước 04: Đóng gói thành Skill",
        "from": 1195,
        "to": 1245
    },
    {
        "id": "scene_15_package_skill",
        "title": "Lưu Skill tái sử dụng mỗi ngày",
        "from": 1245,
        "to": 1374
    },
    {
        "id": "scene_16_slash_and_cron",
        "title": "Lệnh slash hoặc hẹn giờ mỗi sáng",
        "from": 1374,
        "to": 1500
    },
    {
        "id": "scene_17_outro_complete",
        "title": "Xong xuôi trước khi mở máy",
        "from": 1500,
        "to": 1565
    }
]

scenes_data = {
    "video_id": "paper-2026-10-26-ai-agent-4-buoc",
    "total_frames": 1565,
    "fps": 30,
    "scenes": scenes
}

paths = [
    "src/videos/paper/26-10-26-ai-agent-4-buoc/scenes.json",
    "videos/paper/26-10-26-4-buoc-ai-agent/scenes.json"
]

for p in paths:
    with open(p, "w", encoding="utf-8") as f:
        json.dump(scenes_data, f, ensure_ascii=False, indent=2)

with open("videos/paper/26-10-26-4-buoc-ai-agent/timing.txt", "w", encoding="utf-8") as f:
    for s in scenes:
        dur = s["to"] - s["from"]
        f.write(f"{s['from']} - {s['to']} ({dur}f): {s['title']}\n")

with open("videos/paper/26-10-26-4-buoc-ai-agent/script.md", "w", encoding="utf-8") as f:
    f.write("# Kịch bản Paper Editorial (Hoàn chỉnh 52 giây)\n\n")
    f.write("Đây là cách để bạn tạo một AI Agent làm việc thay mình chỉ với bốn bước đơn giản.\n\n")
    f.write("Bước 1: Cài đặt AI Agent. Thay vì dùng chatbot gõ prompt thông thường, hãy cài Claude Code hoặc Codex.\n\n")
    f.write("Điểm mạnh ở đây là AI Agent có thể truy cập file và thực thi tác vụ trực tiếp ngay trên máy tính của bạn.\n\n")
    f.write("Bước 2: Kết nối công cụ. Vào mục Connectors để liên kết các ứng dụng bạn dùng hàng ngày, ví dụ như Gmail. Bước này cấp quyền cho AI tự động đọc thư mới và nhận diện vấn đề cần xử lý.\n\n")
    f.write("Muốn xem video hướng dẫn cài đặt thực tế từng bước, hãy bình luận AI Agent nhé!\n\n")
    f.write("Bước 3: Giao việc rõ ràng. Đưa ra yêu cầu thật chính xác: đọc email hỗ trợ, phân nhóm vấn đề và soạn sẵn bản nháp câu trả lời để tôi duyệt. Kết quả chưa ưng ý thì bổ sung chỉ dẫn vài lần cho đến khi quy trình chạy mượt.\n\n")
    f.write("Bước 4: Đóng gói thành Skill. Yêu cầu AI lưu toàn bộ quy trình vừa tạo thành một Skill tái sử dụng từ ngày mai. Bạn chỉ cần gọi đúng một lệnh gạch chéo hoặc hẹn giờ mỗi sáng, AI sẽ tự động xử lý xong xuôi trước khi bạn kịp mở máy.\n")

print("scenes.json, timing.txt, and script.md updated successfully!")
