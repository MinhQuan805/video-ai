import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface SteeringHelmProps {
  rotation?: number;
  size?: number;
  label?: string;
  accentColor?: string;
  icon?: string;
  scale?: number;
  opacity?: number;
  yOffset?: number;
  style?: React.CSSProperties;
}

/**
 * Editorial Brass Steering Helm (Bánh Lái Định Hướng):
 * Features an 8-spoke wheel, central navigation compass, and brass rim.
 */
export const SteeringHelm: React.FC<SteeringHelmProps> = ({
  rotation = 0,
  size = 270,
  label = 'PROMPT',
  accentColor = COLORS.accent,
  icon = 'compass',
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
      {/* Tactile Brass Steering Helm */}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Outer Rim */}
        <div
          style={{
            position: 'absolute',
            width: size * 0.78,
            height: size * 0.78,
            borderRadius: '50%',
            border: `12px solid ${accentColor}`,
            boxShadow: '0 12px 28px rgba(198, 83, 42, 0.2)',
            boxSizing: 'border-box',
          }}
        />

        {/* Inner Ring with Compass */}
        <div
          style={{
            position: 'absolute',
            width: size * 0.41,
            height: size * 0.41,
            borderRadius: '50%',
            border: `7px solid ${accentColor}`,
            backgroundColor: '#FAF7F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <FaIcon icon={icon} size={Math.round(size * 0.15)} color={accentColor} />
        </div>

        {/* 8 Spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            style={{
              position: 'absolute',
              width: 7,
              height: size * 0.92,
              backgroundColor: accentColor,
              borderRadius: 3.5,
              transform: `rotate(${deg}deg)`,
              zIndex: -1,
            }}
          />
        ))}
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
