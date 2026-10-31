import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateMotionPlan} from '../../src/motion/validate.ts';

export const checkMotion = (plan) => {
  try {
    const findings = validateMotionPlan(plan);
    return {status: findings.length ? 'fail' : 'pass', method: 'numeric-120hz-and-event-boundaries', findings, pixel: 'pending', playback: 'pending'};
  } catch (error) {return {status: 'fail', findings: [{code: 'SCHEMA', message: String(error)}], pixel: 'pending', playback: 'pending'};}
};
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const input = process.argv[process.argv.indexOf('--input') + 1];
  const output = process.argv.includes('--output') ? process.argv[process.argv.indexOf('--output') + 1] : null;
  if (!process.argv.includes('--input') || !input) throw new Error('Usage: node pipeline/qa/validate_motion.mjs --input plan.json [--output report.json]');
  const report = checkMotion(JSON.parse(readFileSync(input, 'utf8')));
  if (output) writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  process.exitCode = report.status === 'pass' ? 0 : 1;
}
