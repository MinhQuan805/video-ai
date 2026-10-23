import argparse
import sys
from pathlib import Path
import soundfile as sf
from vieneu import Vieneu


def generate_voice(text: str, voice: str = "Hải Đăng", output_path: str = "output.wav") -> str:
    """Đọc một câu tiếng Việt bằng Vieneu().infer(câu, voice=tên giọng) và lưu ra file wav."""
    tts = Vieneu()
    wav = tts.infer(text, voice=voice)
    
    out_file = Path(output_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)

    if hasattr(tts, "save") and callable(getattr(tts, "save")):
        tts.save(wav, str(out_file))
    else:
        sample_rate = getattr(tts, "sample_rate", 48000)
        sf.write(str(out_file), wav, sample_rate)

    return str(out_file)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="VieNeu-TTS text-to-speech")
    parser.add_argument("text", nargs="?", default="Xin chào, đây là giọng đọc thử.", help="Văn bản cần đọc")
    parser.add_argument("--voice", "-v", default="Hải Đăng", help="Tên giọng đọc (mặc định: Hải Đăng)")
    parser.add_argument("--output", "-o", default="output.wav", help="Đường dẫn file wav lưu ra")
    args = parser.parse_args()

    result = generate_voice(args.text, voice=args.voice, output_path=args.output)
    print(f"File wav: {result}")
