import {clamp, pose, springAt, type Pose, type SpringConfig, type Vec2} from './core.ts';

/** Same response family as the previous paper project, independent of its episode source. */
export const PAPER_SPRINGS: Record<'slide' | 'light' | 'heavy' | 'recoil', SpringConfig> = {
  slide: {mass: 0.6, damping: 12, stiffness: 180}, light: {mass: 0.5, damping: 10, stiffness: 200},
  heavy: {mass: 1.5, damping: 16, stiffness: 220}, recoil: {mass: 0.4, damping: 8, stiffness: 240},
};
export type Entrance = {startMs: number; origin: Vec2; offset: Vec2; tilt?: number; spring?: SpringConfig};
export const paperEntranceAt = (timeMs: number, spec: Entrance): Pose => {
  const p = springAt(timeMs - spec.startMs, spec.spring ?? PAPER_SPRINGS.slide);
  return {...pose(spec.origin.x + spec.offset.x * (1 - p), spec.origin.y + spec.offset.y * (1 - p)),
    rotation: (spec.tilt ?? 0) * (1 - p), opacity: timeMs < spec.startMs ? 0 : clamp(p)};
};
export const foldAt = (timeMs: number, startMs: number, initialAngle = -60) => {
  const p = springAt(timeMs - startMs, PAPER_SPRINGS.slide);
  return {angleDeg: (1 - p) * initialAngle, opacity: timeMs < startMs ? 0 : clamp(p)};
};
export const recoilAt = (timeMs: number, eventMs: number, amplitude: number, decay = 12, frequency = 18) => {
  if (timeMs < eventMs) return 0;
  const t = (timeMs - eventMs) / 1000;
  return amplitude * Math.exp(-decay * t) * Math.sin(frequency * t);
};
