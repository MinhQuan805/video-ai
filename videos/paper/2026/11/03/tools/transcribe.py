import os
import sys
import json
from pathlib import Path
from faster_whisper import WhisperModel

def main():
    base_dir = Path("videos/paper/2026/11/03")
    wav_path = base_dir / "assets/user_voice.wav"
    model_path = r'C:\Users\MINH QUAN\.cache\huggingface\hub\models--Systran--faster-whisper-small\snapshots\536b0662742c02347bc0e980a01041f333bce120'
    
    print(f"Loading Whisper model from {model_path}...")
    model = WhisperModel(model_path, device='cpu', compute_type='int8', cpu_threads=4)
    segments, info = model.transcribe(str(wav_path), language='vi', word_timestamps=True, vad_filter=True)
    
    raw_segments = []
    lines = []
    timing_rows = []
    all_phrases = []
    
    for seg_idx, segment in enumerate(segments):
        seg_dict = {
            'id': f"seg_{seg_idx:02d}",
            'start': segment.start,
            'end': segment.end,
            'start_frame': int(round(segment.start * 30)),
            'end_frame': int(round(segment.end * 30)),
            'text': segment.text.strip(),
            'words': []
        }
        lines.append(segment.text.strip())
        
        words = segment.words or []
        current_chunk = []
        for w in words:
            w_item = {
                'text': w.word.strip(),
                'start': w.start,
                'end': w.end,
                'start_frame': int(round(w.start * 30)),
                'end_frame': int(round(w.end * 30))
            }
            seg_dict['words'].append(w_item)
            current_chunk.append(w_item)
            if len(current_chunk) >= 3:
                phrase_text = " ".join(item['text'] for item in current_chunk)
                p_start = current_chunk[0]['start_frame']
                p_end = current_chunk[-1]['end_frame']
                all_phrases.append({
                    'text': phrase_text,
                    'start_frame': p_start,
                    'end_frame': p_end,
                    'words': current_chunk
                })
                timing_rows.append(f"{p_start:4d} - {p_end:4d}: {phrase_text}")
                current_chunk = []
        if current_chunk:
            phrase_text = " ".join(item['text'] for item in current_chunk)
            p_start = current_chunk[0]['start_frame']
            p_end = current_chunk[-1]['end_frame']
            all_phrases.append({
                'text': phrase_text,
                'start_frame': p_start,
                'end_frame': p_end,
                'words': current_chunk
            })
            timing_rows.append(f"{p_start:4d} - {p_end:4d}: {phrase_text}")
            
        raw_segments.append(seg_dict)
        
    os.makedirs(base_dir, exist_ok=True)
    
    # Write script.md
    with open(base_dir / 'script.md', 'w', encoding='utf-8') as f:
        f.write("# Kịch bản Raw 2026-11-03\n\n")
        for line in lines:
            f.write(f"{line}\n\n")
            
    # Write timing.txt
    with open(base_dir / 'timing.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(timing_rows) + "\n")
        
    # Write captions.json
    with open(base_dir / 'captions.json', 'w', encoding='utf-8') as f:
        json.dump(all_phrases, f, ensure_ascii=False, indent=2)
        
    # Save segments draft
    with open(base_dir / 'segments_raw.json', 'w', encoding='utf-8') as f:
        json.dump(raw_segments, f, ensure_ascii=False, indent=2)
        
    print(f"Done! Extracted {len(raw_segments)} segments, {len(all_phrases)} phrases.")

if __name__ == '__main__':
    main()
