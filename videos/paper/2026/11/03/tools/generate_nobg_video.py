import os
import sys
import time
import subprocess
from pathlib import Path
import numpy as np
import onnxruntime as ort
import shutil

def main():
    input_video = Path("videos/paper/2026/11/03/assets/03-11.mp4")
    model_path = Path("pipeline/talking-head/models/rvm_mobilenetv3_fp32.onnx")
    output_webm_public = Path("public/videos/paper/03-11-26/user_nobg.webm")
    output_webm_assets = Path("videos/paper/2026/11/03/assets/user_nobg.webm")
    output_webm_public.parent.mkdir(parents=True, exist_ok=True)
    output_webm_assets.parent.mkdir(parents=True, exist_ok=True)

    w, h = 1080, 1920
    frame_bytes = w * h * 3

    print(f"Loading RobustVideoMatting model from {model_path}...")
    opts = ort.SessionOptions()
    opts.intra_op_num_threads = 6
    session = ort.InferenceSession(str(model_path), sess_options=opts, providers=['CPUExecutionProvider'])

    # Recurrent states for RVM
    rec = [np.zeros([1, 1, 1, 1], dtype=np.float32) for _ in range(4)]
    downsample_ratio = np.array([0.25], dtype=np.float32)

    print("Starting AI video matting with RVM & VP9 yuva420p alpha output...")
    t0 = time.time()

    read_cmd = [
        "ffmpeg", "-i", str(input_video),
        "-f", "image2pipe", "-pix_fmt", "rgb24", "-vcodec", "rawvideo", "-"
    ]
    read_proc = subprocess.Popen(read_cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)

    write_cmd = [
        "ffmpeg", "-y", "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{w}x{h}", "-pix_fmt", "rgba", "-r", "30", "-i", "-",
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
        "-deadline", "realtime", "-cpu-used", "8",
        "-b:v", "3M", "-auto-alt-ref", "0",
        str(output_webm_public)
    ]
    write_proc = subprocess.Popen(write_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    frame_count = 0
    while True:
        raw = read_proc.stdout.read(frame_bytes)
        if not raw or len(raw) < frame_bytes:
            break

        arr = np.frombuffer(raw, dtype=np.uint8).reshape((h, w, 3))

        # Normalized input tensor: [1, 3, H, W]
        src = (arr.astype(np.float32) / 255.0).transpose(2, 0, 1)[None]

        # Run RVM
        outputs = session.run(
            None,
            {
                'src': src,
                'r1i': rec[0],
                'r2i': rec[1],
                'r3i': rec[2],
                'r4i': rec[3],
                'downsample_ratio': downsample_ratio,
            }
        )
        fgr = outputs[0]
        pha = outputs[1]
        rec = outputs[2:6]

        # Alpha matte: [H, W] in [0, 255]
        alpha = (pha[0, 0] * 255.0).clip(0, 255).astype(np.uint8)

        # Foreground RGB with despill for green screen
        fgr_rgb = (fgr[0].transpose(1, 2, 0) * 255.0).clip(0, 255).astype(np.float32)
        r, g, b = fgr_rgb[:, :, 0], fgr_rgb[:, :, 1], fgr_rgb[:, :, 2]
        max_rb = np.maximum(r, b)
        g_clean = np.where(g > max_rb, max_rb, g)
        fgr_clean = np.stack([r, g_clean, b], axis=-1).astype(np.uint8)

        # Pack RGBA
        rgba = np.dstack([fgr_clean, alpha])
        write_proc.stdin.write(rgba.tobytes())
        frame_count += 1

        if frame_count % 150 == 0:
            elapsed = time.time() - t0
            fps = frame_count / elapsed
            print(f"Processed {frame_count} frames ({fps:.1f} fps)...")

    read_proc.stdout.close()
    read_proc.wait()
    write_proc.stdin.close()
    write_proc.wait()

    shutil.copy2(output_webm_public, output_webm_assets)

    t1 = time.time()
    print(f"Done! Cut out {frame_count} frames in {t1 - t0:.1f}s ({frame_count / (t1 - t0):.1f} fps).")
    print(f"Output saved to {output_webm_public}")

if __name__ == "__main__":
    main()
