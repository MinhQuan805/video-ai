import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface ReceiptPrinterRollerProps {
  gearRotation?: number;
  statusText?: string;
  width?: number | string;
  height?: number;
  accentColor?: string;
  style?: React.CSSProperties;
}

/**
 * Mechanical Dispenser Roller with counter-rotating gears,
 * LED status slit, and tactile bronze casing.
 */
export const ReceiptPrinterRoller: React.FC<ReceiptPrinterRollerProps> = ({
  gearRotation = 0,
  statusText = 'FEEDING...',
  width = '100%',
  height = 52,
  accentColor = COLORS.accent,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: '#B59E7D',
        borderRadius: height / 2,
        border: '2.5px solid #8C7355',
        boxShadow: '0 12px 28px rgba(60, 45, 30, 0.22)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Left Counter-Rotating Gear */}
      <div style={{ transform: `rotate(${gearRotation}deg)` }}>
        <FaIcon icon="gear" size={24} color={accentColor} />
      </div>

      {/* Middle Status Slit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 140,
            height: 6,
            backgroundColor: accentColor,
            borderRadius: 3,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            fontWeight: 800,
            color: '#4A3420',
          }}
        >
          {statusText}
        </span>
      </div>

      {/* Right Counter-Rotating Gear */}
      <div style={{ transform: `rotate(${-gearRotation}deg)` }}>
        <FaIcon icon="gear" size={24} color={accentColor} />
      </div>
    </div>
  );
};
