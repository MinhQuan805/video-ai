import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';

const episode = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(episode, '../../..');
const output = path.join(episode, 'output');
const bundleDir = path.join(root, '.cache', 'paper-2026-10-29');
const tempDir = path.join(root, '.cache', 'temp');

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });
process.env.TEMP = tempDir;
process.env.TMP = tempDir;

console.log('Bundling Paper 2026-10-29 composition...');
await bundle({ entryPoint: path.join(root, 'src/index.ts'), outDir: bundleDir });

const composition = await selectComposition({
  serveUrl: bundleDir,
  id: 'paper-2026-10-29',
  port: 3049,
});

const frames = [40, 115, 152, 210, 290, 430, 480, 560, 640, 740, 805, 910, 1070, 1240];
const frameDir = path.join(output, 'review-frames');
fs.mkdirSync(frameDir, { recursive: true });

for (const frame of frames) {
  console.log(`Rendering review frame ${frame}...`);
  await renderStill({
    composition,
    serveUrl: bundleDir,
    output: path.join(frameDir, `${frame}.png`),
    frame,
    port: 3049,
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
console.log('Review generation finished successfully.');
