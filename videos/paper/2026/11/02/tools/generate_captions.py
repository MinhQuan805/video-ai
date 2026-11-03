import json

def refine_captions():
    with open('videos/paper/02-11-26/segments_raw.json', 'r', encoding='utf-8') as f:
        segments = json.load(f)
        
    replacements = {
        "thập": "thật",
        "nên": "nền",
        "game,": "gradient,",
        "game": "gradient",
        "lạc": "loạt",
        "ôn": "ô",
        "bò": "bo",
        "góp,": "góc,",
        "góp": "góc",
        "tư": "thương",
        "trong": "cho",
        "nói": "nó",
        "trong": "trông",
        "ca": "cao",
        "mô": "mơ",
        "chơi": "cho",
        "Kawasaki": "Kowalski",
        "cách": "các",
        "như": "nhờ",
        "bóng": "bấm",
        "núp": "nút",
        "phải": "phản",
        "hồi": "hồi",
        "đa": "ra",
        "mưu": "mượt",
        "chuyện": "chuyển",
        "tiết": "thiết",
        "chính": "chỉnh",
        "tường": "từng",
        "mộ": "mỗi",
        "bạc": "bạn"
    }

    all_words = []
    for seg in segments:
        for w in seg['words']:
            txt = w['text']
            clean = txt
            for k, v in replacements.items():
                if clean.lower() == k.lower():
                    clean = v
                elif clean.lower() == k.lower() + ",":
                    clean = v + ","
            all_words.append({
                'text': clean,
                'start_frame': w['start_frame'],
                'end_frame': w['end_frame']
            })

    # Group into phrases of 3-4 words for mobile vertical captions
    phrases = []
    chunk = []
    for w in all_words:
        chunk.append(w)
        if len(chunk) >= 3:
            p_text = " ".join(item['text'] for item in chunk)
            phrases.append({
                'text': p_text,
                'start_frame': chunk[0]['start_frame'],
                'end_frame': chunk[-1]['end_frame'],
                'words': chunk
            })
            chunk = []
    if chunk:
        p_text = " ".join(item['text'] for item in chunk)
        phrases.append({
            'text': p_text,
            'start_frame': chunk[0]['start_frame'],
            'end_frame': chunk[-1]['end_frame'],
            'words': chunk
        })

    with open('videos/paper/02-11-26/captions.json', 'w', encoding='utf-8') as f:
        json.dump(phrases, f, ensure_ascii=False, indent=2)

    print(f"Refined captions saved! Total phrases: {len(phrases)}")

if __name__ == '__main__':
    refine_captions()
