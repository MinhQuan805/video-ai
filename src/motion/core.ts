export type Vec2 = {x: number; y: number};
export type Bounds = {x: number; y: number; width: number; height: number};
export type Pose = {position: Vec2; rotation: number; scale: Vec2; opacity: number};
export type Rig = {bounds: Bounds; pivot: Vec2; anchors: Record<string, Vec2>};
export type SpringConfig = {mass: number; stiffness: number; damping: number};
export type KeyPose = {timeMs: number; pose: Pose};

export const clamp = (x: number, min = 0, max = 1) => Math.min(max, Math.max(min, x));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const mixPoint = (a: Vec2, b: Vec2, p: number): Vec2 => ({x: mix(a.x, b.x, p), y: mix(a.y, b.y, p)});
export const smooth = (p: number) => {const u = clamp(p); return u * u * (3 - 2 * u);};
export const progress = (timeMs: number, startMs: number, endMs: number) => {
  if (![timeMs, startMs, endMs].every(Number.isFinite) || endMs <= startMs) throw new Error('Invalid time range');
  return clamp((timeMs - startMs) / (endMs - startMs));
};
export const frameTime = (frame: number, fps: number) => {
  if (!Number.isFinite(frame) || !Number.isFinite(fps) || fps <= 0) throw new Error('Invalid frame/fps');
  return frame * 1000 / fps;
};
export const pose = (x = 0, y = 0): Pose => ({position: {x, y}, rotation: 0, scale: {x: 1, y: 1}, opacity: 1});
export const finitePose = (p: Pose) => [p.position.x, p.position.y, p.rotation, p.scale.x, p.scale.y, p.opacity].every(Number.isFinite)
  && p.scale.x > 0 && p.scale.y > 0 && p.opacity >= 0 && p.opacity <= 1;

/** Analytic step response; no mutable simulation, wall clock or frame-order dependency. */
export const springAt = (elapsedMs: number, config: SpringConfig): number => {
  const {mass: m, stiffness: k, damping: c} = config;
  if (![elapsedMs, m, k, c].every(Number.isFinite) || m <= 0 || k <= 0 || c < 0) throw new Error('Invalid spring');
  if (elapsedMs <= 0) return 0;
  const t = elapsedMs / 1000;
  const w = Math.sqrt(k / m);
  const z = c / (2 * Math.sqrt(k * m));
  if (Math.abs(z - 1) < 1e-5) return 1 - Math.exp(-w * t) * (1 + w * t);
  if (z < 1) {
    const wd = w * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + z * w / wd * Math.sin(wd * t));
  }
  const r1 = -w * (z - Math.sqrt(z * z - 1));
  const r2 = -w * (z + Math.sqrt(z * z - 1));
  return 1 + (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r1 - r2);
};

export const worldPoint = (p: Pose, rig: Rig, local: Vec2): Vec2 => {
  const x = (local.x - rig.pivot.x) * p.scale.x;
  const y = (local.y - rig.pivot.y) * p.scale.y;
  return {x: p.position.x + x * Math.cos(p.rotation) - y * Math.sin(p.rotation),
    y: p.position.y + x * Math.sin(p.rotation) + y * Math.cos(p.rotation)};
};
export const worldAnchor = (p: Pose, rig: Rig, name: string): Vec2 => {
  if (!rig.anchors[name]) throw new Error(`Unknown anchor: ${name}`);
  return worldPoint(p, rig, rig.anchors[name]);
};
export const attachPose = (p: Pose, rig: Rig, anchor: string, target: Vec2): Pose => {
  const current = worldAnchor(p, rig, anchor);
  return {...p, position: {x: p.position.x + target.x - current.x, y: p.position.y + target.y - current.y}};
};
export const worldBounds = (p: Pose, rig: Rig): Bounds => {
  const {x, y, width: w, height: h} = rig.bounds;
  const points = [{x, y}, {x: x + w, y}, {x, y: y + h}, {x: x + w, y: y + h}].map(v => worldPoint(p, rig, v));
  const xs = points.map(v => v.x); const ys = points.map(v => v.y);
  return {x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys)};
};
export const contains = (outer: Bounds, inner: Bounds, tolerance = 0) => inner.x >= outer.x - tolerance
  && inner.y >= outer.y - tolerance && inner.x + inner.width <= outer.x + outer.width + tolerance
  && inner.y + inner.height <= outer.y + outer.height + tolerance;

export const rectangleRig = (width: number, height: number): Rig => {
  if (![width, height].every(n => Number.isFinite(n) && n > 0)) throw new Error('Invalid rectangle dimensions');
  return {bounds: {x: 0, y: 0, width, height}, pivot: {x: width / 2, y: height / 2},
    anchors: {center: {x: width / 2, y: height / 2}, top: {x: width / 2, y: 0}, bottom: {x: width / 2, y: height},
      left: {x: 0, y: height / 2}, right: {x: width, y: height / 2}}};
};
export const sampleTrack = (track: KeyPose[], timeMs: number): Pose => {
  if (!track.length || !Number.isFinite(timeMs)) throw new Error('Empty/invalid motion track');
  for (let i = 0; i < track.length; i++) {
    if (!finitePose(track[i].pose) || !Number.isFinite(track[i].timeMs) || (i > 0 && track[i].timeMs <= track[i - 1].timeMs)) throw new Error('Invalid/unsorted motion track');
  }
  if (timeMs <= track[0].timeMs) return structuredClone(track[0].pose);
  if (timeMs >= track[track.length - 1].timeMs) return structuredClone(track[track.length - 1].pose);
  const i = track.findIndex(k => k.timeMs > timeMs);
  const a = track[i - 1]; const b = track[i]; const u = progress(timeMs, a.timeMs, b.timeMs);
  return {position: mixPoint(a.pose.position, b.pose.position, u), rotation: mix(a.pose.rotation, b.pose.rotation, u),
    scale: mixPoint(a.pose.scale, b.pose.scale, u), opacity: clamp(mix(a.pose.opacity, b.pose.opacity, u))};
};

export const cssTransform = (p: Pose, pivot: Vec2): string =>
  `translate(${p.position.x}px, ${p.position.y}px) rotate(${p.rotation}rad) scale(${p.scale.x}, ${p.scale.y}) translate(${-pivot.x}px, ${-pivot.y}px)`;
