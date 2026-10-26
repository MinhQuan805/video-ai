# Project Rules

- Mỗi lần chỉ làm một video trong thư mục `videos/<video-name>`.
- Đọc `script.md`, `timing.txt`, `scenes.json`, không mở `words.json`, `sentences.json`, file `.wav`, `.mp4` hay `node_modules` khi người dùng chưa bảo.
- Mỗi lần dựng xem `output/review.png` một lần.
- Sửa nhỏ thì sửa đúng cảnh đó, không viết lại cả file.
- Lệnh chạy lâu như cài đặt, xuất video thì chạy một lần và chờ, xong rồi không chạy lại để kiểm.
- Khi cần dùng hoặc tự lấy icon, mặc định luôn dùng Font Awesome (qua linh kiện `<FaIcon icon="..." />` hoặc `pipeline/assets/fetch_fa_icon.py`).
- Khi tạo video, ưu tiên concept và motion graphic sáng tạo theo nội dung; chỉ dùng asset ngoài hoặc visual system có sẵn khi thực sự phù hợp. Dùng `.agents/skills/ai-video-pipeline/SKILL.md` và `docs/auto-production-system.md`.
- Tuyệt đối không render video cho đến khi người dùng duyệt rõ project/version cụ thể trong chat. Trước đó chỉ làm analysis, timeline, component, static/audio QA và approval packet.
- Tool dùng chung đặt trong `pipeline/<stage>/`; helper riêng của video đặt trong `videos/<video-name>/tools/`. Không xóa/di chuyển tool cũ trước khi rà reference và giữ thay đổi dang dở.
- Trả lời ngắn.
