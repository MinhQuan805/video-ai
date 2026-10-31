import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

const episode = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(episode, '../../..');
const output = path.join(episode, 'output');
const bundleDir = path.join(root, '.cache', 'paper-2026-10-29');
const tempDir = path.join(root, '.cache', 'temp');

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });
process.env.TEMP = tempDir;
process.env.TMP = tempDir;

console.log('Bundling Paper 2026-10-29 composition for final render...');
await bundle({ entryPoint: path.join(root, 'src/index.ts'), outDir: bundleDir });

const composition = await selectComposition({
  serveUrl: bundleDir,
  id: 'paper-2026-10-29',
  port: 3049,
});

const outputPath = path.join(output, 'final.mp4');
console.log(`Starting final video render to ${outputPath}...`);

await renderMedia({
  composition,
  serveUrl: bundleDir,
  codec: 'h264',
  outputLocation: outputPath,
  port: 3049,
  timeoutInMilliseconds: 300000,
  onProgress: ({ renderedFrames, encodedFrames, progress }) => {
    process.stdout.write(
      `Rendering: ${(progress * 100).toFixed(1)}% | Frames: ${renderedFrames}/${composition.durationInFrames} (encoded: ${encodedFrames})\r`
    );
  },
});

console.log(`\nFinal video rendered successfully: ${outputPath}`);
