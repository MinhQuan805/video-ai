export const COLORS = {
  bg: '#F4EFE6',
  card: '#FFFFFF',
  cardMuted: '#ECE5D8',
  ink: '#1A1816',
  accent: '#C6532A',
  accentLight: 'rgba(198, 83, 42, 0.12)',
  subtle: 'rgba(26, 24, 22, 0.45)',
  line: 'rgba(26, 24, 22, 0.12)',
  glow: 'rgba(198, 83, 42, 0.22)',
  gold: '#D97706',
  blue: '#2563EB',
  green: '#16A34A',
  border: 'rgba(26, 24, 22, 0.12)',
  shadow: 'rgba(26, 24, 22, 0.15)',
};

export const FONTS = {
  title: 'Fraunces, serif',
  body: 'Inter, sans-serif',
  mono: 'JetBrains Mono, monospace',
};

export const SPRINGS = {
  stately: { mass: 1.2, damping: 15, stiffness: 90 },
  snappy: { mass: 0.6, damping: 11, stiffness: 180 },
  heavy: { mass: 1.5, damping: 16, stiffness: 220 },
  recoil: { mass: 0.4, damping: 8, stiffness: 240 },
  elastic: { mass: 0.8, damping: 9, stiffness: 140 },
  bouncy: { mass: 0.5, damping: 7, stiffness: 200 },
  smooth: { mass: 1.0, damping: 20, stiffness: 120 },
  pendulum: { mass: 2.0, damping: 10, stiffness: 60 },
};

/**
 * Natural physics damped oscillation for recoil, mechanical impacts, and tremors
 */
export const dampedOscillation = (
  frame: number,
  trigger: number,
  duration = 20,
  amplitude = 12,
  frequency = 0.6,
  decay = 0.18
): number => {
  const rel = frame - trigger;
  if (rel < 0 || rel > duration) return 0;
  return Math.sin(rel * frequency) * Math.exp(-rel * decay) * amplitude;
};

/**
 * Continuous organic idle float/breathing
 */
export const continuousFloat = (
  frame: number,
  speed = 0.06,
  amplitude = 5
): number => {
  return Math.sin(frame * speed) * amplitude;
};
