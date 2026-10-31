import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface DraftingRulerGaugeProps {
  currentValue?: number | string;
  unit?: string;
  needleProgressPercent?: number; // 0 to 100
  label?: string;
  notchCount?: number;
  width?: number;
  height?: number | string;
  style?: React.CSSProperties;
}

/**
 * Editorial Drafting Ruler with calibrated tick marks,
 * metric measurement readout, and an active sliding indicator needle.
 */
export const DraftingRulerGauge: React.FC<DraftingRulerGaugeProps> = ({
  currentValue = '12',
  unit = 'm',
  needleProgressPercent = 50,
  label = 'DÀI',
  notchCount = 16,
  width = 90,
  height = '100%',
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: '#ECE3D3',
        borderRadius: 18,
        border: `2px solid ${COLORS.line}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 8px',
        boxSizing: 'border-box',
        boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
        zIndex: 30,
        ...style,
      }}
    >
      {/* Active Sliding Indicator Needle Arrow */}
      <div
        style={{
          position: 'absolute',
          right: -10,
          bottom: `${needleProgressPercent}%`,
          transform: 'translateY(50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 35,
          transition: 'bottom 0.05s linear',
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderRight: `10px solid ${COLORS.accent}`,
          }}
        />
      </div>

      {/* Top Value Readout */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 18,
          fontWeight: 900,
          color: COLORS.accent,
        }}
      >
        {currentValue}
        {unit}
      </div>

      {/* Ruler Notches / Ticks */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: 12,
          width: '100%',
          alignItems: 'flex-end',
          paddingRight: 6,
          boxSizing: 'border-box',
        }}
      >
        {Array.from({ length: notchCount }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 2,
              width: i % 4 === 0 ? 32 : 16,
              backgroundColor: COLORS.ink,
              opacity: i % 4 === 0 ? 0.8 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Bottom Tool Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: FONTS.mono,
          fontSize: 14,
          fontWeight: 800,
          color: COLORS.accent,
        }}
      >
        {label} <FaIcon icon="ruler" size={14} color={COLORS.accent} />
      </div>
    </div>
  );
};
