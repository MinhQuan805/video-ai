import os
import subprocess
from PIL import Image

frames = [40, 80, 135, 210, 320, 420]
os.makedirs("output/temp_paper", exist_ok=True)
rendered_images = []

for f in frames:
    out_file = f"output/temp_paper/frame_{f}.png"
    cmd = [
        "npx", "remotion", "still",
        "paper-10-26-26",
        out_file,
        f"--frame={f}",
        "--scale=0.5"
    ]
    print(f"Rendering frame {f}...")
    subprocess.run(cmd, check=True, shell=True)
    rendered_images.append(Image.open(out_file))

# Stitch horizontally
width, height = rendered_images[0].size
grid = Image.new("RGB", (width * len(rendered_images), height))
for idx, img in enumerate(rendered_images):
    grid.paste(img, (idx * width, 0))

os.makedirs("output", exist_ok=True)
grid.save("output/review.png")
print("Saved output/review.png successfully!")
