import json

def refine_captions():
    with open('videos/paper/29-10-26/segments_raw.json', 'r', encoding='utf-8') as f:
        segments = json.load(f)
        
    replacements = {
        "sang": "săn",
        "Chrome": "prompt",
        "Chrome,": "prompt,",
        "chen,": "trang,",
        "chen": "trang",
        "bằng,": "bằng:",
        "khung check": "khung chat",
        "hướng dẫn,": "hướng dẫn,",
        "hướng dẫn": "hướng dẫn",
        "dòng man": "tông văn",
        "dự sẵn": "giữ sẵn",
        "Chrome": "prompt"
    }

    all_words = []
    for seg in segments:
        for w in seg['words']:
            txt = w['text']
            clean = txt
            for k, v in replacements.items():
                if clean == k:
                    clean = v
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

    with open('videos/paper/29-10-26/captions.json', 'w', encoding='utf-8') as f:
        json.dump(phrases, f, ensure_ascii=False, indent=2)

    # Also copy to src/videos/paper/29-10-26/ when created
    print(f"Refined captions saved! Total phrases: {len(phrases)}")

if __name__ == '__main__':
    refine_captions()
