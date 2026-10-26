import json

# Define the exact phrases and timings for the first 15.7 seconds
# Total duration: 472 frames (15.73s @ 30fps)
phrases = [
    {
        "text": "bạn tạo một AI",
        "start_frame": 12,
        "end_frame": 42,
        "words": [
            {"text": "bạn", "start_frame": 12, "end_frame": 18},
            {"text": "tạo", "start_frame": 18, "end_frame": 26},
            {"text": "một", "start_frame": 26, "end_frame": 32},
            {"text": "AI", "start_frame": 32, "end_frame": 42}
        ]
    },
    {
        "text": "Agent",
        "start_frame": 42,
        "end_frame": 66,
        "words": [
            {"text": "Agent", "start_frame": 42, "end_frame": 66}
        ]
    },
    {
        "text": "chỉ với bốn bước",
        "start_frame": 66,
        "end_frame": 102,
        "words": [
            {"text": "chỉ", "start_frame": 66, "end_frame": 74},
            {"text": "với", "start_frame": 74, "end_frame": 82},
            {"text": "bốn", "start_frame": 82, "end_frame": 90},
            {"text": "bước", "start_frame": 90, "end_frame": 102}
        ]
    },
    {
        "text": "Bước đầu tiên là",
        "start_frame": 102,
        "end_frame": 130,
        "words": [
            {"text": "Bước", "start_frame": 102, "end_frame": 110},
            {"text": "đầu", "start_frame": 110, "end_frame": 116},
            {"text": "tiên", "start_frame": 116, "end_frame": 122},
            {"text": "là", "start_frame": 122, "end_frame": 130}
        ]
    },
    {
        "text": "cài AI Agent",
        "start_frame": 130,
        "end_frame": 165,
        "words": [
            {"text": "cài", "start_frame": 130, "end_frame": 138},
            {"text": "AI", "start_frame": 138, "end_frame": 148},
            {"text": "Agent", "start_frame": 148, "end_frame": 165}
        ]
    },
    {
        "text": "Claude Code hoặc",
        "start_frame": 165,
        "end_frame": 200,
        "words": [
            {"text": "Claude", "start_frame": 165, "end_frame": 176},
            {"text": "Code", "start_frame": 176, "end_frame": 188},
            {"text": "hoặc", "start_frame": 188, "end_frame": 200}
        ]
    },
    {
        "text": "Chỉ cần lên Google",
        "start_frame": 200,
        "end_frame": 238,
        "words": [
            {"text": "Chỉ", "start_frame": 200, "end_frame": 208},
            {"text": "cần", "start_frame": 208, "end_frame": 216},
            {"text": "lên", "start_frame": 216, "end_frame": 224},
            {"text": "Google", "start_frame": 224, "end_frame": 238}
        ]
    },
    {
        "text": "hoặc ChatGPT",
        "start_frame": 238,
        "end_frame": 264,
        "words": [
            {"text": "hoặc", "start_frame": 238, "end_frame": 246},
            {"text": "ChatGPT", "start_frame": 246, "end_frame": 264}
        ]
    },
    {
        "text": "desktop app",
        "start_frame": 264,
        "end_frame": 288,
        "words": [
            {"text": "desktop", "start_frame": 264, "end_frame": 276},
            {"text": "app", "start_frame": 276, "end_frame": 288}
        ]
    },
    {
        "text": "Khác với chat",
        "start_frame": 288,
        "end_frame": 322,
        "words": [
            {"text": "Khác", "start_frame": 288, "end_frame": 298},
            {"text": "với", "start_frame": 298, "end_frame": 308},
            {"text": "chat", "start_frame": 308, "end_frame": 322}
        ]
    },
    {
        "text": "nó có thể tự",
        "start_frame": 322,
        "end_frame": 350,
        "words": [
            {"text": "nó", "start_frame": 322, "end_frame": 328},
            {"text": "có", "start_frame": 328, "end_frame": 334},
            {"text": "thể", "start_frame": 334, "end_frame": 340},
            {"text": "tự", "start_frame": 340, "end_frame": 350}
        ]
    },
    {
        "text": "và làm việc ngay",
        "start_frame": 350,
        "end_frame": 378,
        "words": [
            {"text": "và", "start_frame": 350, "end_frame": 356},
            {"text": "làm", "start_frame": 356, "end_frame": 364},
            {"text": "việc", "start_frame": 364, "end_frame": 370},
            {"text": "ngay", "start_frame": 370, "end_frame": 378}
        ]
    },
    {
        "text": "Tiếp theo",
        "start_frame": 378,
        "end_frame": 408,
        "words": [
            {"text": "Tiếp", "start_frame": 378, "end_frame": 392},
            {"text": "theo", "start_frame": 392, "end_frame": 408}
        ]
    },
    {
        "text": "nó với các",
        "start_frame": 408,
        "end_frame": 430,
        "words": [
            {"text": "nó", "start_frame": 408, "end_frame": 414},
            {"text": "với", "start_frame": 414, "end_frame": 422},
            {"text": "các", "start_frame": 422, "end_frame": 430}
        ]
    },
    {
        "text": "công cụ nó cần",
        "start_frame": 430,
        "end_frame": 454,
        "words": [
            {"text": "công", "start_frame": 430, "end_frame": 436},
            {"text": "cụ", "start_frame": 436, "end_frame": 442},
            {"text": "nó", "start_frame": 442, "end_frame": 448},
            {"text": "cần", "start_frame": 448, "end_frame": 454}
        ]
    },
    {
        "text": "thay cho bạn",
        "start_frame": 454,
        "end_frame": 472,
        "words": [
            {"text": "thay", "start_frame": 454, "end_frame": 460},
            {"text": "cho", "start_frame": 460, "end_frame": 466},
            {"text": "bạn", "start_frame": 466, "end_frame": 472}
        ]
    }
]

captions_data = {
    "total_frames": 472,
    "phrases": phrases
}

with open("src/videos/paper/10-26-26/captions.json", "w", encoding="utf-8") as f:
    json.dump(captions_data, f, ensure_ascii=False, indent=2)

with open("videos/paper/10-26-26/captions.json", "w", encoding="utf-8") as f:
    json.dump(captions_data, f, ensure_ascii=False, indent=2)

scenes = [
    {
        "id": "scene_01_hook",
        "title": "Tự tạo AI Agent chỉ với 4 bước",
        "from": 0,
        "to": 102
    },
    {
        "id": "scene_02_step1_badge",
        "title": "Bước 01: Cài Agent",
        "from": 102,
        "to": 165
    },
    {
        "id": "scene_03_search_desktop",
        "title": "Tìm Claude Desktop & ChatGPT App",
        "from": 165,
        "to": 288
    },
    {
        "id": "scene_04_local_agent",
        "title": "Không chỉ chat, làm trên máy",
        "from": 288,
        "to": 378
    },
    {
        "id": "scene_05_step2_connect",
        "title": "Bước 02: Nối với công cụ",
        "from": 378,
        "to": 472
    }
]

scenes_data = {
    "video_id": "paper-10-26-26",
    "total_frames": 472,
    "fps": 30,
    "scenes": scenes
}

with open("videos/paper/10-26-26/scenes.json", "w", encoding="utf-8") as f:
    json.dump(scenes_data, f, ensure_ascii=False, indent=2)

with open("src/videos/paper/10-26-26/scenes.json", "w", encoding="utf-8") as f:
    json.dump(scenes_data, f, ensure_ascii=False, indent=2)

with open("videos/paper/10-26-26/timing.txt", "w", encoding="utf-8") as f:
    for s in scenes:
        dur = s["to"] - s["from"]
        f.write(f"{s['from']} - {s['to']} ({dur}f): {s['title']}\n")

with open("videos/paper/10-26-26/script.md", "w", encoding="utf-8") as f:
    f.write("# Kịch bản Paper Editorial (15 giây đầu)\n\n")
    f.write("Đây là cách để bạn tự tạo một AI Agent làm việc thay bạn, chỉ với 4 bước đơn giản.\n\n")
    f.write("Bước đầu tiên là cài AI Agent, bạn có thể chọn Claude Code hoặc Codex đều được.\n\n")
    f.write("Chỉ cần lên Google tìm Claude hoặc ChatGPT Desktop App, tải về rồi đăng nhập.\n\n")
    f.write("Khác với chat bình thường, nó có thể tự mở file và làm việc ngay trên máy của bạn.\n\n")
    f.write("Tiếp theo, hãy kết nối nó với các công cụ nó cần để làm việc thay cho bạn.\n")

print("Successfully generated all paper data files.")
