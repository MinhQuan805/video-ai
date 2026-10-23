import path from "path";
import fs from "fs";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dCacheDir = path.join(rootDir, ".cache", "temp");
fs.mkdirSync(dCacheDir, { recursive: true });
process.env.TEMP = dCacheDir;
process.env.TMP = dCacheDir;

async function createFilmstrip(compositionId, frames, outputPath) {
  console.log(`🎬 Bundling composition "${compositionId}"...`);
  const webpackDir = path.join(rootDir, ".cache", "webpack");
  fs.mkdirSync(webpackDir, { recursive: true });

  const bundleLocation = await bundle({
    entryPoint: path.join(rootDir, "src", "index.ts"),
    outDir: webpackDir,
    webpackOverride: (config) => config,
  });

  console.log(`🔍 Selecting composition "${compositionId}"...`);
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    port: 3030,
  });

  const tempFiles = [];
  const tempDir = path.join(rootDir, "output", "temp_frames");
  fs.mkdirSync(tempDir, { recursive: true });

  for (const frame of frames) {
    const frameFile = path.join(tempDir, `frame_${frame}.png`);
    console.log(`📸 Rendering frame ${frame}...`);
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: frameFile,
      frame,
      port: 3030,
    });
    tempFiles.push({ frame, path: frameFile });
  }

  return tempFiles;
}

const args = process.argv.slice(2);
const compId = args[0] || "Video";
const frames = args[1] ? args[1].split(",").map(Number) : [22, 25, 28, 31, 34];
const outPath = args[2] || path.join(rootDir, "videos", "darwin", "output", "scene1_filmstrip.png");

createFilmstrip(compId, frames, outPath)
  .then((files) => {
    console.log("JSON_FRAMES:" + JSON.stringify(files));
  })
  .catch((err) => {
    console.error("Error creating filmstrip:", err);
    process.exit(1);
  });
