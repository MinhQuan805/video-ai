import {attachPose, clamp, mix, mixPoint, pose, progress, rectangleRig, smooth, springAt, type Bounds, type Pose, type Rig, type Vec2} from '../motion/core.ts';
import {PAPER_SPRINGS, recoilAt} from '../motion/paper.ts';

export type PressSpec = {approachMs: number; contactMs: number; loadedMs: number; releaseMs: number; settledMs: number;
  centerX: number; groundY: number; targetWidth: number; targetHeight: number; loadWidth: number; loadHeight: number;
  dropDistance: number; liftDistance: number; compression: number; bulge?: number};
export type PullSpec = {reachMs: number; gripMs: number; pullMs: number; releaseMs: number; targetStart: Vec2;
  travel: Vec2; handStart: Vec2; width: number; height: number; friction: number};
export type JawDesign = {backWidth?: number; crownHeight?: number; eyeX?: number; paper?: string};
export type SwallowSpec = {openMs: number; entryMs: number; biteMs: number; swallowedMs: number; settledMs: number;
  mouth: Bounds; targetStart: Vec2; targetWidth: number; targetHeight: number; actorDesign?: JawDesign};
export type CardSpec = {kind: 'move' | 'select' | 'block' | 'approve' | 'expand'; startMs: number; endMs: number;
  from: Vec2; to: Vec2; width: number; height: number; expandedWidth?: number; stateBefore?: string; stateAfter?: string};
export type Interaction = {id: string} & (
  {kind: 'press'; spec: PressSpec} | {kind: 'pull'; spec: PullSpec} | {kind: 'swallow'; spec: SwallowSpec} | {kind: 'card'; spec: CardSpec}
);
export type ActorState = {pose: Pose; rig: Rig};
export type InteractionSample = {actors: Record<string, ActorState>; contacts: {a: Vec2; b: Vec2}[];
  state: string; grip?: Vec2; jawOpen?: number; mouth?: Bounds; targetVisible?: boolean};

const ordered = (...times: number[]) => times.every((t, i) => Number.isFinite(t) && (i === 0 || t > times[i - 1]));
const positive = (...values: number[]) => values.every(v => Number.isFinite(v) && v > 0);
const point = (v: Vec2) => v && Number.isFinite(v.x) && Number.isFinite(v.y);
export const assertInteraction = (interaction: Interaction): void => {
  if (!interaction.id) throw new Error('Interaction id is required');
  const s = interaction.spec;
  if (interaction.kind === 'press') {
    const p = s as PressSpec;
    if (!ordered(p.approachMs, p.contactMs, p.loadedMs, p.releaseMs, p.settledMs)
      || !positive(p.targetWidth, p.targetHeight, p.loadWidth, p.loadHeight, p.dropDistance, p.liftDistance)
      || ![p.centerX, p.groundY, p.compression, p.bulge ?? 0].every(Number.isFinite)
      || p.compression < 0 || p.compression > 0.6 || (p.bulge ?? 0) < 0) throw new Error('Invalid press specification');
  } else if (interaction.kind === 'pull') {
    const p = s as PullSpec;
    if (!ordered(p.reachMs, p.gripMs, p.pullMs, p.releaseMs) || !positive(p.width, p.height, p.friction)
      || !point(p.targetStart) || !point(p.travel) || !point(p.handStart)) throw new Error('Invalid pull specification');
  } else if (interaction.kind === 'swallow') {
    const p = s as SwallowSpec;
    if (!ordered(p.openMs, p.entryMs, p.biteMs, p.swallowedMs, p.settledMs) || !positive(p.targetWidth, p.targetHeight, p.mouth.width, p.mouth.height)
      || !point(p.targetStart) || !point(p.mouth) || p.targetHeight > p.mouth.height
      || p.targetStart.x - p.targetWidth / 2 < p.mouth.x + p.mouth.width) throw new Error('Target must approach from outside the right lip and fit the mouth');
    if (!positive(p.actorDesign?.backWidth ?? 220, p.actorDesign?.crownHeight ?? 135)
      || (p.actorDesign?.backWidth ?? 220) < 180 || (p.actorDesign?.crownHeight ?? 135) < 90
      || !Number.isFinite(p.actorDesign?.eyeX ?? -103)) throw new Error('Invalid jaw actor proportions');
  } else if (interaction.kind === 'card') {
    const p = s as CardSpec;
    if (!['move', 'select', 'block', 'approve', 'expand'].includes(p.kind) || !ordered(p.startMs, p.endMs)
      || !positive(p.width, p.height, p.expandedWidth ?? p.width) || !point(p.from) || !point(p.to)) throw new Error('Invalid card specification');
  } else throw new Error('Unknown interaction kind');
};

export const pressAt = (timeMs: number, s: PressSpec): InteractionSample => {
  const compress = smooth(progress(timeMs, s.contactMs, s.loadedMs));
  const release = progress(timeMs, s.releaseMs, s.settledMs);
  const recover = timeMs < s.releaseMs ? 0 : clamp(springAt(timeMs - s.releaseMs, PAPER_SPRINGS.slide), 0, 1.06);
  const amount = s.compression * compress * (1 - recover);
  const targetRig = rectangleRig(s.targetWidth, s.targetHeight);
  targetRig.pivot = targetRig.anchors.bottom;
  const targetPose = {...pose(s.centerX, s.groundY), scale: {x: 1 + amount * (s.bulge ?? 0.2), y: 1 - amount}};
  const surface = s.groundY - s.targetHeight * targetPose.scale.y;
  const loadRig = rectangleRig(s.loadWidth, s.loadHeight); loadRig.pivot = loadRig.anchors.bottom;
  const approach = progress(timeMs, s.approachMs, s.contactMs);
  const y = timeMs < s.contactMs ? surface - s.dropDistance * (1 - approach * approach)
    : surface - s.liftDistance * smooth(release);
  const loadPose = pose(s.centerX, y);
  return {actors: {target: {pose: targetPose, rig: targetRig}, load: {pose: loadPose, rig: loadRig}},
    contacts: timeMs >= s.contactMs && timeMs <= s.releaseMs ? [{a: {x: s.centerX, y}, b: {x: s.centerX, y: surface}}] : [],
    state: timeMs < s.contactMs ? 'approaching' : timeMs < s.releaseMs ? 'loaded' : timeMs < s.settledMs ? 'releasing' : 'settled'};
};

export const pullAt = (timeMs: number, s: PullSpec): InteractionSample => {
  const rig = rectangleRig(s.width, s.height);
  const u = progress(timeMs, s.pullMs, s.releaseMs);
  const destination = {x: s.targetStart.x + s.travel.x, y: s.targetStart.y + s.travel.y};
  const duration = (s.releaseMs - s.pullMs) / 1000;
  const speed = 2 * Math.hypot(s.travel.x, s.travel.y) / duration;
  const stopTime = speed / s.friction;
  const t = Math.min(Math.max(0, (timeMs - s.releaseMs) / 1000), stopTime);
  const distance = speed * t - 0.5 * s.friction * t * t;
  const length = Math.hypot(s.travel.x, s.travel.y);
  const direction = length ? {x: s.travel.x / length, y: s.travel.y / length} : {x: 0, y: 0};
  const position = timeMs < s.releaseMs ? mixPoint(s.targetStart, destination, u * u)
    : {x: destination.x + direction.x * distance, y: destination.y + direction.y * distance};
  const targetPose = pose(position.x, position.y);
  const grip = {x: position.x - s.width / 2, y: position.y};
  const hand = timeMs < s.gripMs ? mixPoint(s.handStart, {x: s.targetStart.x - s.width / 2, y: s.targetStart.y}, smooth(progress(timeMs, s.reachMs, s.gripMs)))
    : timeMs < s.releaseMs ? grip : {x: destination.x - s.width / 2, y: destination.y - 50 * smooth(clamp((timeMs - s.releaseMs) / 200))};
  return {actors: {target: {pose: targetPose, rig}}, grip: hand,
    contacts: timeMs >= s.gripMs && timeMs <= s.releaseMs ? [{a: hand, b: grip}] : [],
    state: timeMs < s.gripMs ? 'reaching' : timeMs < s.pullMs ? 'gripped' : timeMs < s.releaseMs ? 'pulling' : t < stopTime ? 'sliding' : 'settled'};
};

export const swallowAt = (timeMs: number, s: SwallowSpec): InteractionSample => {
  const lip = s.mouth.x + s.mouth.width;
  const entry = {x: lip + s.targetWidth / 2, y: s.mouth.y + s.mouth.height / 2};
  const end = {x: s.mouth.x - s.targetWidth / 2, y: entry.y};
  const position = timeMs < s.entryMs ? mixPoint(s.targetStart, entry, smooth(progress(timeMs, s.openMs, s.entryMs)))
    : timeMs < s.biteMs ? entry : mixPoint(entry, end, smooth(progress(timeMs, s.biteMs, s.swallowedMs)));
  const open = timeMs < s.entryMs ? smooth(progress(timeMs, s.openMs, s.entryMs))
    : timeMs < s.swallowedMs ? 1 : 1 - smooth(progress(timeMs, s.swallowedMs, s.settledMs));
  const back = s.actorDesign?.backWidth ?? 220; const crown = s.actorDesign?.crownHeight ?? 135;
  const creatureRig: Rig = {bounds: {x: -back, y: -crown, width: back + 40, height: crown + 145}, pivot: {x: 0, y: 0}, anchors: {lip: {x: 0, y: 0}}};
  const creaturePose = {...pose(lip, entry.y), scale: {x: s.mouth.width / 120, y: s.mouth.height / 110}};
  return {actors: {target: {pose: pose(position.x, position.y), rig: rectangleRig(s.targetWidth, s.targetHeight)}, creature: {pose: creaturePose, rig: creatureRig}},
    contacts: timeMs >= s.entryMs && timeMs <= s.biteMs ? [{a: {x: lip, y: entry.y}, b: {x: position.x - s.targetWidth / 2, y: position.y}}] : [],
    mouth: s.mouth, jawOpen: open, targetVisible: timeMs < s.swallowedMs,
    state: timeMs < s.entryMs ? 'approaching' : timeMs < s.biteMs ? 'biting' : timeMs < s.swallowedMs ? 'swallowing' : timeMs < s.settledMs ? 'recovering' : 'settled'};
};

export const cardAt = (timeMs: number, s: CardSpec): InteractionSample => {
  const u = smooth(progress(timeMs, s.startMs, s.endMs));
  const p = pose(); p.position = mixPoint(s.from, s.to, u);
  if (s.kind === 'select') p.rotation = recoilAt(timeMs, s.startMs, 0.035);
  if (s.kind === 'expand') p.scale.x = mix(1, (s.expandedWidth ?? s.width) / s.width, u);
  const state = timeMs < s.startMs ? (s.stateBefore ?? 'idle') : timeMs < s.endMs ? 'moving' : (s.stateAfter ?? s.kind);
  return {actors: {target: {pose: p, rig: rectangleRig(s.width, s.height)}}, contacts: [], state};
};

export const interactionAt = (timeMs: number, interaction: Interaction): InteractionSample => {
  assertInteraction(interaction);
  if (!Number.isFinite(timeMs)) throw new Error('Invalid interaction time');
  switch (interaction.kind) {
    case 'press': return pressAt(timeMs, interaction.spec);
    case 'pull': return pullAt(timeMs, interaction.spec);
    case 'swallow': return swallowAt(timeMs, interaction.spec);
    case 'card': return cardAt(timeMs, interaction.spec);
  }
};

/** Position an arbitrary rig's named attachment without changing its rotation/scale. */
export const gripAt = (p: Pose, rig: Rig, anchor: string, hand: Vec2) => attachPose(p, rig, anchor, hand);

/** Authored queue movement: one released item advances every following item by a slot. */
export const queueAt = (timeMs: number, index: number, releaseTimesMs: number[], origin: Vec2, spacing: number, advanceMs = 240): Pose => {
  if (!Number.isInteger(index) || index < 0 || !positive(spacing, advanceMs) || !point(origin)
    || releaseTimesMs.some((t, i) => !Number.isFinite(t) || (i > 0 && t - releaseTimesMs[i - 1] < advanceMs))) throw new Error('Queue releases must allow each advance to finish');
  const advances = releaseTimesMs.slice(0, index).reduce((sum, t) => sum + smooth(progress(timeMs, t, t + advanceMs)), 0);
  return pose(origin.x + (index - advances) * spacing, origin.y);
};
