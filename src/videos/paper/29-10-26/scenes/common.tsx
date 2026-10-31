import React from 'react';
import { interpolate, spring } from 'remotion';
export { FaIcon } from '../../../../shared/FaIcon';

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
 * Natural physics oscillation for shocks, squishes, and mechanical recoil
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
 * Continuous organic breathing / idle float
 */
export const continuousFloat = (
  frame: number,
  speed = 0.06,
  amplitude = 5
): number => {
  return Math.sin(frame * speed) * amplitude;
};

/**
 * Paper background with subtle grain & corner drafting brackets
 */
export const PaperBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: COLORS.bg,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Ultra-fine SVG noise filter */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.035,
        }}
      >
        <filter id="paper-noise-29">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise-29)" />
      </svg>

      {/* Drafting brackets at 4 corners */}
      <div style={{ position: 'absolute', top: 56, left: 56, width: 28, height: 28, borderTop: `2px solid ${COLORS.line}`, borderLeft: `2px solid ${COLORS.line}` }} />
      <div style={{ position: 'absolute', top: 56, right: 56, width: 28, height: 28, borderTop: `2px solid ${COLORS.line}`, borderRight: `2px solid ${COLORS.line}` }} />
      <div style={{ position: 'absolute', bottom: 56, left: 56, width: 28, height: 28, borderBottom: `2px solid ${COLORS.line}`, borderLeft: `2px solid ${COLORS.line}` }} />
      <div style={{ position: 'absolute', bottom: 56, right: 56, width: 28, height: 28, borderBottom: `2px solid ${COLORS.line}`, borderRight: `2px solid ${COLORS.line}` }} />
    </div>
  );
};

/**
 * Standard Eyebrow Header with Hairline Divider (Strictly like 26-10)
 */
export const EyebrowHeader: React.FC<{
  icon?: React.ReactNode;
  tag: string;
  stepNum?: string;
}> = () => {
  // Removed per user request: redundant heading
  return null;
};

/**
 * MaskReveal Typography
 */
export const MaskReveal: React.FC<{
  progress: number;
  direction?: 'up' | 'down';
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ progress, direction = 'up', children, style }) => {
  const clampP = Math.max(0, Math.min(1, progress));
  const yShift = direction === 'up' ? (1 - clampP) * 100 : (clampP - 1) * 100;

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'inline-block',
        ...style,
      }}
    >
      <div
        style={{
          transform: `translateY(${yShift}%)`,
          opacity: clampP,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Tactile Paper Card
 */
export const TactileCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  elevation?: 'flat' | 'raised' | 'floating';
}> = ({ children, style, elevation = 'raised' }) => {
  const shadows = {
    flat: '0 2px 8px rgba(26, 24, 22, 0.04)',
    raised: '0 12px 28px rgba(26, 24, 22, 0.08), 0 4px 10px rgba(26, 24, 22, 0.03)',
    floating: '0 24px 48px rgba(26, 24, 22, 0.12), 0 8px 16px rgba(26, 24, 22, 0.06)',
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.card,
        borderRadius: 20,
        border: `1.5px solid ${COLORS.line}`,
        boxShadow: shadows[elevation],
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Rubber / Terracotta Archive Stamp
 */
export const ArchiveStamp: React.FC<{
  text: string;
  frame: number;
  stampFrame: number;
  color?: string;
  rotation?: number;
  style?: React.CSSProperties;
}> = ({ text, frame, stampFrame, color = COLORS.accent, rotation = -12, style }) => {
  const rel = frame - stampFrame;
  if (rel < 0) return null;

  const dropProgress = spring({
    frame: rel,
    fps: 30,
    config: SPRINGS.heavy,
  });

  const recoil = rel >= 0 && rel < 18 ? Math.sin(rel * 0.7) * Math.exp(-rel * 0.2) * 10 : 0;
  const scale = interpolate(dropProgress, [0, 1], [2.2, 1]);
  const opacity = interpolate(dropProgress, [0, 0.3, 1], [0, 0.8, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        transform: `scale(${scale}) rotate(${rotation}deg) translateY(${recoil}px)`,
        opacity,
        border: `4px solid ${color}`,
        borderRadius: 12,
        padding: '6px 16px',
        color,
        fontFamily: FONTS.title,
        fontWeight: 900,
        fontSize: 26,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        zIndex: 50,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(circle, black 70%, rgba(0,0,0,0.4) 100%)',
        boxShadow: `0 0 0 2px ${color}33`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/**
 * Simulated Vector Cursor with click state
 */
export const SimulatedCursor: React.FC<{
  x: number;
  y: number;
  isClicking?: boolean;
  visible?: boolean;
}> = ({ x, y, isClicking = false, visible = true }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 100,
        transform: `scale(${isClicking ? 0.85 : 1.0})`,
        transformOrigin: 'top left',
        transition: 'transform 0.08s ease',
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.32))',
      }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 3.5L11.5 20.5L14.2 13.8L20.8 11.2L4.5 3.5Z"
          fill="#1A1816"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

/**
 * Bezier Conduit: Curved connecting line
 */
export const BezierConduit: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  color?: string;
  curvature?: number;
}> = ({ startX, startY, endX, endY, progress, color = COLORS.accent, curvature = 0 }) => {
  const clampP = Math.max(0, Math.min(1, progress));
  const midX = (startX + endX) / 2 + curvature;
  const midY = (startY + endY) / 2;
  const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 4,
      }}
    >
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
        strokeDasharray={800}
        strokeDashoffset={(1 - clampP) * 800}
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Speaker visibility: Controls when the user speaker window is visible.
 * Rule: No mid-scene layout shifting. If a scene has the speaker, the speaker is present for the full scene.
 * Pure motion scenes (Scenes 3 & 7) have no speaker and stay centered vertically throughout.
 */
export const isSpeakerVisible = (frame: number): boolean => {
  return (
    (frame >= 0 && frame < 384) ||       // Scene 1 & Scene 2 (full duration)
    (frame >= 505 && frame < 996) ||     // Scene 4, Scene 5, Scene 6 (full duration)
    (frame >= 1188 && frame < 1319)      // Scene 8 Outro CTA (full duration)
  );
};
