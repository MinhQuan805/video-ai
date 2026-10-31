import React from 'react';
import { COLORS, FONTS } from '../core/tokens';

export interface ClockworkGearsProps {
  primaryRotation?: number;
  secondaryRotation?: number;
  size?: number;
  label?: string;
  accentColor?: string;
  secondaryColor?: string;
  scale?: number;
  opacity?: number;
  yOffset?: number;
  style?: React.CSSProperties;
}

/**
 * Editorial Interlocking Clockwork Gear System:
 * Primary gear meshes with secondary gear running counter-rotation.
 */
export const ClockworkGears: React.FC<ClockworkGearsProps> = ({
  primaryRotation = 0,
  secondaryRotation = 0,
  size = 270,
  label = 'SKILL',
  accentColor = COLORS.accent,
  secondaryColor = '#1E1D1B',
  scale = 1,
  opacity = 1,
  yOffset = 0,
  style,
}) => {
  if (opacity <= 0.005) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translateY(${yOffset}px) scale(${scale})`,
        opacity,
        zIndex: 10,
        ...style,
      }}
    >
      {/* Interlocking Gears Stage */}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Primary Large Gear */}
        <div
          style={{
            position: 'absolute',
            top: size * 0.07,
            left: size * 0.05,
            width: size * 0.65,
            height: size * 0.65,
            borderRadius: '50%',
            border: `10px dashed ${accentColor}`,
            backgroundColor: 'rgba(198, 83, 42, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${primaryRotation}deg)`,
            boxShadow: '0 12px 24px rgba(198, 83, 42, 0.18)',
          }}
        >
          <div
            style={{
              width: size * 0.19,
              height: size * 0.19,
              borderRadius: '50%',
              backgroundColor: accentColor,
            }}
          />
        </div>

        {/* Secondary Interlocking Gear */}
        <div
          style={{
            position: 'absolute',
            bottom: size * 0.07,
            right: size * 0.05,
            width: size * 0.44,
            height: size * 0.44,
            borderRadius: '50%',
            border: `8px dashed ${secondaryColor}`,
            backgroundColor: 'rgba(30, 29, 27, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${secondaryRotation}deg)`,
          }}
        >
          <div
            style={{
              width: size * 0.13,
              height: size * 0.13,
              borderRadius: '50%',
              backgroundColor: secondaryColor,
            }}
          />
        </div>
      </div>

      {/* Description Badge */}
      {label && (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: '0.12em',
              color: accentColor,
              backgroundColor: 'rgba(198, 83, 42, 0.15)',
              padding: '8px 24px',
              borderRadius: 100,
            }}
          >
            {label}
          </div>
        </div>
      )}
    </div>
  );
};
