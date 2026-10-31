import {contains, finitePose, worldBounds, type Bounds, type Vec2} from './core.ts';
import {assertInteraction, interactionAt, type Interaction} from '../interactions/poses.ts';

export type MotionPlan = {schemaVersion: 1; durationMs: number; safeBounds: Bounds; interactions: Interaction[]};
export type MotionFinding = {interactionId: string; timeMs?: number; code: string; message: string};
export const validateMotionPlan = (plan: MotionPlan): MotionFinding[] => {
  const findings: MotionFinding[] = [];
  if (plan.schemaVersion !== 1 || !Number.isFinite(plan.durationMs) || plan.durationMs <= 0
    || !plan.safeBounds || ![plan.safeBounds.x, plan.safeBounds.y, plan.safeBounds.width, plan.safeBounds.height].every(Number.isFinite)
    || plan.safeBounds.width <= 0 || plan.safeBounds.height <= 0 || !Array.isArray(plan.interactions)) {
    return [{interactionId: '', code: 'SCHEMA', message: 'Invalid motion plan envelope'}];
  }
  const ids = new Set<string>();
  for (const interaction of plan.interactions) {
    try {
      assertInteraction(interaction);
      if (ids.has(interaction.id)) throw new Error('Duplicate interaction id');
      ids.add(interaction.id);
      const times = new Set<number>([0, plan.durationMs]);
      for (const [key, value] of Object.entries(interaction.spec)) {
        if (key.endsWith('Ms') && typeof value === 'number') {
          if (value < 0 || value > plan.durationMs) throw new Error(`Event ${key} outside duration`);
          for (const delta of [-0.01, 0, 0.01]) times.add(Math.max(0, Math.min(plan.durationMs, value + delta)));
        }
      }
      // Sample 120Hz plus exact event boundaries. Numeric QA cannot replace pixel/temporal review.
      for (let t = 0; t < plan.durationMs; t += 1000 / 120) times.add(t);
      for (const timeMs of [...times].sort((a, b) => a - b)) {
        const sample = interactionAt(timeMs, interaction);
        const repeat = interactionAt(timeMs, interaction);
        if (JSON.stringify(sample) !== JSON.stringify(repeat)) throw new Error('Pose is not repeatable');
        for (const [name, actor] of Object.entries(sample.actors)) {
          if (!finitePose(actor.pose)) findings.push({interactionId: interaction.id, timeMs, code: 'POSE', message: `Invalid ${name} pose`});
          const hiddenByMouth = interaction.kind === 'swallow' && name === 'target' && sample.targetVisible === false;
          if (!hiddenByMouth && !contains(plan.safeBounds, worldBounds(actor.pose, actor.rig), 0.1)) {
            findings.push({interactionId: interaction.id, timeMs, code: 'BOUNDS', message: `${name} outside safe bounds`});
          }
        }
        for (const c of sample.contacts) {
          if (Math.hypot(c.a.x - c.b.x, c.a.y - c.b.y) > 0.1) findings.push({interactionId: interaction.id, timeMs, code: 'CONTACT', message: 'Contact gap > 0.1px'});
        }
      }
    } catch (error) {
      findings.push({interactionId: interaction?.id ?? '', code: 'SPEC', message: String(error)});
    }
  }
  return findings.filter((f, i, all) => all.findIndex(x => x.interactionId === f.interactionId && x.code === f.code && x.message === f.message) === i);
};

export type CursorClickCheck = {
  interactionId?: string;
  clickFrameOrMs: number;
  cursorPos: Vec2;
  targetBounds: Bounds;
  tolerancePx?: number;
};

export type CursorFinding = {
  code: 'CURSOR_HIT' | 'CURSOR_MISS';
  gapPx: number;
  message: string;
};

/** Verify simulated cursor click coordinates hit the authored target element bounds. */
export const checkCursorClickTarget = (click: CursorClickCheck): CursorFinding => {
  const { x, y } = click.cursorPos;
  const { x: bx, y: by, width: bw, height: bh } = click.targetBounds;
  const inside = x >= bx && x <= bx + bw && y >= by && y <= by + bh;
  if (inside) {
    return { code: 'CURSOR_HIT', gapPx: 0, message: `Cursor click hit target bounds cleanly at (${x}, ${y})` };
  }
  const dx = Math.max(bx - x, 0, x - (bx + bw));
  const dy = Math.max(by - y, 0, y - (by + bh));
  const gapPx = Math.hypot(dx, dy);
  const tol = click.tolerancePx ?? 0;
  if (gapPx <= tol) {
    return { code: 'CURSOR_HIT', gapPx, message: `Cursor click within ${tol}px tolerance of target bounds` };
  }
  return {
    code: 'CURSOR_MISS',
    gapPx,
    message: `Cursor click at (${x.toFixed(1)}, ${y.toFixed(1)}) missed target bounds [x:${bx}, y:${by}, w:${bw}, h:${bh}] by ${gapPx.toFixed(1)}px`,
  };
};
