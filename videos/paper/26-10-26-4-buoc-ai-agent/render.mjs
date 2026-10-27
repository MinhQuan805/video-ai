import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { renderStill, renderMedia, selectComposition } from '@remotion/renderer';

const episode = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(episode, '../../..');
const output = path.join(episode, 'output');
const bundleDir = path.join(root, '.cache', 'paper-2026-10-26-ai-agent-4-buoc');
const tempDir = path.join(root, '.cache', 'temp');

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });
process.env.TEMP = tempDir;
process.env.TMP = tempDir;

const mode = process.argv[2] ?? 'review';
if (!['review', 'final', 'all'].includes(mode)) {
  throw new Error('Use review, final or all');
}

console.log('Bundling Paper 2026-10-26 AI Agent...');
await bundle({ entryPoint: path.join(root, 'src/index.ts'), outDir: bundleDir });

const composition = await selectComposition({
  serveUrl: bundleDir,
  id: 'paper-2026-10-26-ai-agent-4-buoc',
  port: 3046,
});

if (mode !== 'final') {
  const frames = [60, 145, 220, 360, 465, 530, 620, 715, 790, 880, 930, 1020, 1140, 1220, 1310, 1430, 1530];
  const frameDir = path.join(output, 'review-frames');
  fs.mkdirSync(frameDir, { recursive: true });

  for (const frame of frames) {
    console.log(`Rendering review frame ${frame}...`);
    await renderStill({
      composition,
      serveUrl: bundleDir,
      output: path.join(frameDir, `${frame}.png`),
      frame,
      port: 3046,
      timeoutInMilliseconds: 60000,
    });
  }

  const result = spawnSync('python', [path.join(episode, 'review_grid.py')], {
    cwd: root,
    encoding: 'utf8',
  });
  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (mode !== 'review') {
  console.log('Rendering final.mp4 — 1541 frames / 1080x1920 / 30 fps...');
  let last = -1;
  await renderMedia({
    composition,
    serveUrl: bundleDir,
    codec: 'h264',
    crf: 18,
    outputLocation: path.join(output, 'final.mp4'),
    port: 3046,
    concurrency: 2,
    onProgress: ({ progress }) => {
      const step = Math.floor(progress * 10);
      if (step !== last) {
        last = step;
        console.log(`Render ${step * 10}%`);
      }
    },
  });
  console.log(`Complete: ${path.join(output, 'final.mp4')}`);
}
