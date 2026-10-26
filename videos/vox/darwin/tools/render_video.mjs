import path from "path";
import fs from "fs";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../../..");
const dCacheDir = path.join(rootDir, ".cache", "temp");
fs.mkdirSync(dCacheDir, { recursive: true });
process.env.TEMP = dCacheDir;
process.env.TMP = dCacheDir;

async function renderFinalVideo() {
  console.log("🎬 Bundling project for final render...");
  const webpackDir = path.join(rootDir, ".cache", "webpack");
  fs.mkdirSync(webpackDir, { recursive: true });

  const bundleLocation = await bundle({
    entryPoint: path.join(rootDir, "src", "index.ts"),
    outDir: webpackDir,
    webpackOverride: (config) => config,
  });

  console.log("🔍 Selecting composition 'Video'...");
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "Video",
    port: 3030,
  });

  const outPath = path.join(rootDir, "videos", "darwin", "output", "final.mp4");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  console.log(`🎥 Rendering video to ${outPath} (1080x1920, 30fps, H.264, audio)...`);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outPath,
    port: 3030,
    onProgress: ({ progress }) => {
      process.stdout.write(`\r⏳ Tiến độ: ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.log(`\n🎉 Đã xuất video thành công: ${outPath}`);
}

renderFinalVideo().catch((err) => {
  console.error("Render failed:", err);
  process.exit(1);
});
