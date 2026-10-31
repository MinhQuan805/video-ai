import React from 'react';
import { COLORS, FONTS } from '../core/tokens';

export interface IndustrialPowerSwitchProps {
  leverAngle?: number;
  isLeverDown?: boolean;
  readyText?: string;
  offText?: string;
  width?: number;
  height?: number;
  scale?: number;
  opacity?: number;
  yOffset?: number;
  style?: React.CSSProperties;
}

/**
 * Heavy Industrial / Vintage Knife Throw Power Switch:
 * Features a heavy metal base, status LED beacon, pivot fulcrum,
 * and throw lever with terracotta knob.
 */
export const IndustrialPowerSwitch: React.FC<IndustrialPowerSwitchProps> = ({
  leverAngle = 45,
  isLeverDown = false,
  readyText = 'READY',
  offText = 'OFF',
  width = 580,
  height = 240,
  scale = 1,
  opacity = 1,
  yOffset = 0,
  style,
}) => {
  if (opacity <= 0.005) return null;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: '#FAF7F0',
        borderRadius: 26,
        border: '2.5px solid #C8BCAB',
        boxShadow: '0 24px 50px rgba(60, 48, 36, 0.16)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${yOffset}px) scale(${scale})`,
        opacity,
        zIndex: 10,
        ...style,
      }}
    >
      {/* Status Indicator LED */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: '50%',
            backgroundColor: isLeverDown ? '#16A34A' : '#7C6E5E',
            boxShadow: isLeverDown ? '0 0 12px #16A34A' : 'none',
          }}
        />
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 14,
            fontWeight: 800,
            color: '#8A7D6B',
          }}
        >
          {isLeverDown ? readyText : offText}
        </span>
      </div>

      {/* Heavy Throw Lever */}
      <div
        style={{
          position: 'relative',
          width: 30,
          height: 130,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transformOrigin: 'bottom center',
          transform: `rotate(${leverAngle}deg)`,
        }}
      >
        {/* Terracotta Grip Knob */}
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
            boxShadow: '0 6px 18px rgba(198, 83, 42, 0.4)',
            border: '4px solid #8A3314',
            marginBottom: -14,
            zIndex: 5,
          }}
        />
        {/* Metal Shaft */}
        <div
          style={{
            width: 16,
            height: 90,
            backgroundColor: '#7C6E5E',
            borderRadius: 8,
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)',
          }}
        />
      </div>

      {/* Pivot Fulcrum */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          width: 60,
          height: 26,
          borderRadius: 8,
          backgroundColor: '#3A3530',
        }}
      />
    </div>
  );
};
