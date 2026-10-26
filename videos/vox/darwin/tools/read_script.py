import json
import os
import sys
from pathlib import Path
import numpy as np
import soundfile as sf
from vieneu import Vieneu

sys.stdout.reconfigure(encoding='utf-8')


def read_script(script_path: str, voice_name: str = "Thanh Bình", output_wav: str = "videos/vox/darwin/voice.wav", sentences_json: str = "videos/vox/darwin/sentences.json"):
    script_file = Path(script_path)
    if not script_file.exists():
        raise FileNotFoundError(f"Không tìm thấy file: {script_path}")

    lines = []
    with open(script_file, "r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if stripped and not stripped.startswith("#"):
                lines.append(stripped)

    print(f"Đọc {len(lines)} câu từ {script_path} với giọng [{voice_name}]...")

    tts = Vieneu()
    sr = getattr(tts, "sample_rate", 48000)
    silence_duration = 0.28
    silence_samples = int(silence_duration * sr)
    silence_wav = np.zeros(silence_samples, dtype=np.float32)

    combined_wav = []
    sentences_meta = []
    current_time = 0.0

    for idx, sentence in enumerate(lines, 1):
        print(f"Đang đọc câu {idx}/{len(lines)}: {sentence}")
        wav = tts.infer(sentence, voice=voice_name)
        duration = len(wav) / sr

        sentences_meta.append({
            "index": idx,
            "text": sentence,
            "start": round(current_time, 3),
            "end": round(current_time + duration, 3),
            "duration": round(duration, 3)
        })

        combined_wav.append(wav)
        current_time += duration

        # Thêm khoảng nghỉ giữa các câu (trừ câu cuối)
        if idx < len(lines):
            combined_wav.append(silence_wav)
            current_time += silence_duration

    final_audio = np.concatenate(combined_wav)
    
    out_wav_path = Path(output_wav)
    out_wav_path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(out_wav_path), final_audio, sr)
    print(f"Đã lưu file âm thanh: {out_wav_path} (tổng thời lượng: {round(current_time, 2)}s)")

    out_json_path = Path(sentences_json)
    out_json_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_json_path, "w", encoding="utf-8") as f:
        json.dump(sentences_meta, f, ensure_ascii=False, indent=2)
    print(f"Đã lưu mốc câu: {out_json_path}")

    return str(out_wav_path), str(out_json_path)


if __name__ == "__main__":
    read_script("videos/vox/darwin/script.md", voice_name="Thanh Bình")
