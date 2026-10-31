import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FaIcon } from '../shared/FaIcon';

/**
 * Text Behind Head Component
 * Placed at zIndex: 2 (behind speaker cutout at zIndex: 4)
 */
export const TextBehindHead: React.FC<{
  text: string;
  startFrame?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  yOffset?: number;
}> = ({
  text,
  startFrame = 0,
  color = '#C6532A',
  fontSize = 110,
  fontFamily = 'Montserrat, sans-serif',
  yOffset = 420,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = Math.max(0, frame - startFrame);
  const enterSpring = spring({ frame: rel, fps, config: { mass: 0.8, damping: 14, stiffness: 150 } });
  const y = interpolate(enterSpring, [0, 1], [60, 0]);
  const opacity = interpolate(enterSpring, [0, 0.4, 1], [0, 0.9, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        top: yOffset + y,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize,
          fontWeight: 900,
          color,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textShadow: '0 12px 30px rgba(0,0,0,0.12)',
        }}
      >
        {text}
      </span>
    </div>
  );
};

/**
 * Frosted Glass Metric Widget
 * Placed at zIndex: 5 (in front of speaker, sits under chin or beside shoulders)
 */
export const GlassWidget: React.FC<{
  title: string;
  value: string;
  icon?: string;
  startFrame?: number;
  width?: number;
}> = ({ title, value, icon, startFrame = 0, width = 340 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = Math.max(0, frame - startFrame);
  const pop = spring({ frame: rel, fps, config: { mass: 0.7, damping: 13, stiffness: 170 } });
  const y = interpolate(pop, [0, 1], [40, 0]);
  const scale = interpolate(pop, [0, 1], [0.85, 1]);
  const opacity = interpolate(pop, [0, 0.3, 1], [0, 0.95, 1]);

  return (
    <div
      style={{
        width,
        padding: '16px 22px',
        backgroundColor: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 20,
        border: '1.5px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 16px 36px rgba(26, 24, 22, 0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        zIndex: 5,
      }}
    >
      {icon && (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            backgroundColor: 'rgba(198, 83, 42, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaIcon icon={icon} size={22} color="#C6532A" />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            fontWeight: 700,
            color: '#666',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 24,
            fontWeight: 800,
            color: '#1A1816',
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

/**
 * Freeze Frame Sticker Outline
 * Wraps speaker cutout during freeze-frame moments
 */
export const FreezeFrameSticker: React.FC<{
  children: React.ReactNode;
  active: boolean;
  strokeWidth?: number;
  strokeColor?: string;
}> = ({ children, active, strokeWidth = 5, strokeColor = '#FFFFFF' }) => {
  if (!active) return <>{children}</>;

  return (
    <div
      style={{
        position: 'relative',
        filter: `drop-shadow(0 0 ${strokeWidth}px ${strokeColor}) drop-shadow(0 0 ${strokeWidth * 2}px rgba(0,0,0,0.3))`,
      }}
    >
      {children}
    </div>
  );
};
