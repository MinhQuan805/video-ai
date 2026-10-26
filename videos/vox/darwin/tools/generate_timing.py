import json
import math
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')


def generate_timing(
    words_path: str = "videos/vox/darwin/words.json",
    sentences_path: str = "videos/vox/darwin/sentences.json",
    output_timing_path: str = "videos/vox/darwin/timing.txt",
    fps: int = 30
):
    with open(words_path, "r", encoding="utf-8") as f:
        words = json.load(f)

    with open(sentences_path, "r", encoding="utf-8") as f:
        sentences = json.load(f)

    # Tổng thời lượng từ câu cuối cùng
    last_end = max(s["end"] for s in sentences)
    total_frames = math.ceil(last_end * fps)

    # Các cụm tự nhiên đã được phân tách từ 2 đến 4 chữ cho 5 câu
    phrase_templates = [
        # Câu 1 (26 chữ)
        ["Bạn có biết,", "chàng trai 22 tuổi", "Charles Darwin", "bước lên tàu Beagle", "năm 1831", "chỉ để làm bạn", "trò chuyện", "cho thuyền trưởng", "Robert FitzRoy?"],
        # Câu 2 (17 chữ)
        ["Chuyến đi tính trước", "chỉ 2 năm,", "nhưng thực tế", "kéo dài tới", "gần 5 năm trời."],
        # Câu 3 (20 chữ)
        ["Dù mang tiếng", "đi biển,", "ông say sóng", "triền miên", "và dành hẳn", "3 năm 3 tháng", "trên đất liền."],
        # Câu 4 (24 chữ)
        ["Chỉ 5 tuần", "ở quần đảo Galapagos,", "những mẫu chim sẻ", "và hóa thạch", "đã làm thay đổi", "hoàn toàn suy nghĩ", "của ông."],
        # Câu 5 (23 chữ)
        ["Nếu năm đó", "Darwin từ chối", "bước lên", "con tàu này,", "liệu thuyết tiến hóa", "có ra đời", "muộn hơn", "hàng thập kỷ?"]
    ]

    # Kiểm tra khớp từng cụm với words
    w_idx = 0
    timing_lines = [str(total_frames)]

    for sentence_phrases in phrase_templates:
        for phrase in sentence_phrases:
            phrase_words = phrase.split()
            count = len(phrase_words)
            if not (2 <= count <= 4):
                print(f"Cảnh báo: Cụm '{phrase}' có {count} từ (ngoài khoảng 2-4 từ)")
            
            # Lấy start time của từ đầu tiên trong cụm
            start_sec = words[w_idx]["s"]
            start_frame = round(start_sec * fps)
            timing_lines.append(f"{start_frame} {phrase}")
            w_idx += count

    print(f"Khớp tổng cộng {w_idx}/{len(words)} từ.")

    out_p = Path(output_timing_path)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    with open(out_p, "w", encoding="utf-8") as f:
        f.write("\n".join(timing_lines) + "\n")

    print(f"✅ Đã ghi file {output_timing_path} với {len(timing_lines)} dòng (Tổng {total_frames} frames).")
    return output_timing_path


if __name__ == "__main__":
    generate_timing()
