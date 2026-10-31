import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {attachPose, finitePose, pose, rectangleRig, sampleTrack, springAt, worldAnchor, worldBounds} from '../../src/motion/core.ts';
import {paperEntranceAt} from '../../src/motion/paper.ts';
import {interactionAt, queueAt} from '../../src/interactions/poses.ts';
import {checkCursorClickTarget} from '../../src/motion/validate.ts';
import {checkMotion} from './validate_motion.mjs';

const plan = JSON.parse(readFileSync(new URL('./fixtures/motion.json', import.meta.url), 'utf8'));
const get = kind => plan.interactions.find(i => i.kind === kind);
const close = (a, b, epsilon = 1e-6) => assert.ok(Math.abs(a - b) < epsilon, `${a} != ${b}`);

test('all fixtures pass independent numeric geometry/contact QA', () => assert.equal(checkMotion(plan).status, 'pass'));
test('random seek, rewind and repeats produce identical poses', () => {
  for (const item of plan.interactions) {
    const expected = interactionAt(1350, item);
    for (const t of [3900, 0, 755, 1349, 20]) interactionAt(t, item);
    assert.deepEqual(interactionAt(1350, item), expected);
  }
});
test('spring handles under, critical and overdamping with physical guards', () => {
  for (const damping of [4, 20, 40]) {
    const spec = {mass: 1, stiffness: 100, damping};
    assert.equal(springAt(-5, spec), 0);
    close(springAt(10000, spec), 1, 1e-6);
  }
  assert.throws(() => springAt(100, {mass: 0, stiffness: 10, damping: 5}));
});
test('paper preserves transform overshoot but clamps visibility', () => {
  const values = Array.from({length: 100}, (_, i) => paperEntranceAt(i * 10, {startMs: 0, origin: {x: 300, y: 400}, offset: {x: -150, y: 0}}));
  assert.ok(values.some(p => p.position.x > 300));
  assert.ok(values.every(p => p.opacity >= 0 && p.opacity <= 1));
});
test('rotated/scaled/pivoted anchors attach in world space', () => {
  const rig = rectangleRig(200, 100);
  const p = {...pose(500, 300), rotation: 0.7, scale: {x: 1.4, y: 0.8}};
  const attached = attachPose(p, rig, 'right', {x: 720, y: 610});
  const anchor = worldAnchor(attached, rig, 'right');
  close(anchor.x, 720); close(anchor.y, 610);
  assert.throws(() => worldAnchor(p, rig, 'missing'));
});
test('press begins deforming only at contact and stays loaded until release', () => {
  const item = get('press'); const s = item.spec;
  assert.equal(interactionAt(s.contactMs - 1, item).actors.target.pose.scale.y, 1);
  const loaded = interactionAt(s.loadedMs, item);
  const held = interactionAt(s.releaseMs - 1, item);
  close(loaded.actors.target.pose.scale.y, 1 - s.compression);
  assert.deepEqual(loaded.actors.target.pose, held.actors.target.pose);
  for (let t = s.contactMs; t <= s.releaseMs; t += 10) {
    const sample = interactionAt(t, item);
    const targetTop = worldAnchor(sample.actors.target.pose, sample.actors.target.rig, 'top');
    const loadBottom = worldAnchor(sample.actors.load.pose, sample.actors.load.rig, 'bottom');
    close(targetTop.y, loadBottom.y);
    close(worldAnchor(sample.actors.target.pose, sample.actors.target.rig, 'bottom').y, s.groundY);
  }
});
test('release never lets recovering target pass through lifted load', () => {
  const item = get('press'); const s = item.spec;
  for (let t = s.releaseMs; t <= s.settledMs; t += 5) {
    const sample = interactionAt(t, item);
    const bottom = worldAnchor(sample.actors.load.pose, sample.actors.load.rig, 'bottom');
    const top = worldAnchor(sample.actors.target.pose, sample.actors.target.rig, 'top');
    assert.ok(bottom.y <= top.y + 1e-6);
  }
});
test('pull attaches before transport and keeps the grip until release', () => {
  const item = get('pull'); const s = item.spec;
  assert.deepEqual(interactionAt(s.gripMs - 1, item).actors.target.pose.position, s.targetStart);
  for (let t = s.gripMs; t <= s.releaseMs; t += 8) {
    const sample = interactionAt(t, item);
    const contact = worldAnchor(sample.actors.target.pose, sample.actors.target.rig, 'left');
    close(sample.grip.x, contact.x); close(sample.grip.y, contact.y);
  }
});
test('released card slows by friction and does not teleport at the boundary', () => {
  const item = get('pull'); const s = item.spec;
  const before = interactionAt(s.releaseMs - 0.001, item).actors.target.pose.position;
  const at = interactionAt(s.releaseMs, item).actors.target.pose.position;
  assert.ok(Math.hypot(before.x - at.x, before.y - at.y) < 0.01);
  const x = t => interactionAt(t, item).actors.target.pose.position.x;
  assert.ok(x(1700) - x(1650) > x(1900) - x(1850));
  close(x(3500), x(4000));
});
test('swallow keeps target opaque and visible until it travels through mouth', () => {
  const item = get('swallow'); const s = item.spec;
  const entry = interactionAt(s.entryMs, item);
  close(entry.actors.target.pose.position.x - s.targetWidth / 2, s.mouth.x + s.mouth.width);
  for (let t = s.entryMs; t < s.swallowedMs; t += 10) assert.equal(interactionAt(t, item).actors.target.pose.opacity, 1);
  const final = interactionAt(s.swallowedMs, item);
  assert.equal(final.targetVisible, false);
  close(final.actors.target.pose.position.x + s.targetWidth / 2, s.mouth.x);
  assert.equal(interactionAt(s.settledMs, item).jawOpen, 0);
});
test('invalid contact ordering and oversized swallow targets are rejected', () => {
  const press = structuredClone(get('press')); press.spec.releaseMs = press.spec.contactMs - 1;
  assert.throws(() => interactionAt(0, press));
  const swallow = structuredClone(get('swallow')); swallow.spec.targetHeight = 999;
  assert.throws(() => interactionAt(0, swallow));
});
test('queue followers move after release and keep authored slot spacing', () => {
  const args = [100, 900]; const origin = {x: 100, y: 200};
  assert.equal(queueAt(50, 1, args, origin, 180).position.x, 280);
  close(queueAt(400, 1, args, origin, 180).position.x, 100);
  close(queueAt(400, 2, args, origin, 180).position.x, 280);
  assert.throws(() => queueAt(200, 1, [100, 110], origin, 180));
});
test('track interpolation returns copies and rejects unsorted times', () => {
  const track = [{timeMs: 0, pose: pose(100, 100)}, {timeMs: 1000, pose: pose(300, 100)}];
  close(sampleTrack(track, 500).position.x, 200);
  const p = sampleTrack(track, 0); p.position.x = 999;
  assert.equal(track[0].pose.position.x, 100);
  assert.throws(() => sampleTrack([track[1], track[0]], 1));
});
test('bounds QA detects out-of-stage travel and malformed data', () => {
  const bad = structuredClone(plan); bad.interactions[0].spec.centerX = -100;
  assert.equal(checkMotion(bad).status, 'fail');
  assert.equal(checkMotion(null).status, 'fail');
  assert.ok(finitePose(pose()));
  assert.equal(worldBounds(pose(50, 50), rectangleRig(100, 100)).x, 0);
});
test('cursor hit-testing detects off-target clicks and passes valid target hits', () => {
  const targetBtn = {x: 750, y: 155, width: 120, height: 38};
  // Valid click inside button
  const hit = checkCursorClickTarget({clickFrameOrMs: 50, cursorPos: {x: 815, y: 173}, targetBounds: targetBtn});
  assert.equal(hit.code, 'CURSOR_HIT');
  assert.equal(hit.gapPx, 0);

  // Missed click (65px too low, like the bug reported)
  const miss = checkCursorClickTarget({clickFrameOrMs: 50, cursorPos: {x: 850, y: 238}, targetBounds: targetBtn});
  assert.equal(miss.code, 'CURSOR_MISS');
  assert.ok(miss.gapPx > 40);
  assert.match(miss.message, /missed target bounds/);
});
