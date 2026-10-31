import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface StudioMixerConsoleProps {
  title?: string;
  isActive?: boolean;
  dialAngle?: number;
  dialLabel?: string;
  dialActive?: boolean;
  faderProgressPercent?: number; // 0 to 100
  faderY?: number;
  faderLabel?: string;
  switchAngle?: number;
  switchLabel?: string;
  switchActive?: boolean;
  width?: number;
  height?: number;
  scale?: number;
  opacity?: number;
  yOffset?: number;
  style?: React.CSSProperties;
}

/**
 * Editorial Studio Audio/Parameter Mixer Console featuring:
 * 1. Rotary Tone Dial with notch and smooth angular rotation
 * 2. Vertical Linear Fader with active level fill and sliding knob
 * 3. Heavy Mechanical Toggle Switch with tactile angular deflection
 */
export const StudioMixerConsole: React.FC<StudioMixerConsoleProps> = ({
  title = 'CONTENT-WRITER / PRESETS',
  isActive = false,
  dialAngle = 0,
  dialLabel = 'TÔNG VĂN',
  dialActive = true,
  faderProgressPercent = 50,
  faderY = 0,
  faderLabel = 'BÀI MẪU',
  switchAngle = 0,
  switchLabel = 'CHECKLIST',
  switchActive = false,
  width = 840,
  height = 380,
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
        boxShadow: '0 24px 50px rgba(60, 48, 36, 0.14)',
        padding: '26px 36px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: `translateY(${yOffset}px) scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1.5px solid rgba(26,24,22,0.1)',
          paddingBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 15,
            color: COLORS.ink,
            fontWeight: 800,
          }}
        >
          {title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: '50%',
              backgroundColor: isActive ? COLORS.accent : '#D97706',
              boxShadow: `0 0 12px ${isActive ? COLORS.accent : '#D97706'}`,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              color: isActive ? COLORS.accent : '#D97706',
              fontWeight: 800,
            }}
          >
            {isActive ? 'ACTIVE' : 'TUNING'}
          </span>
        </div>
      </div>

      {/* 3 Physical Controls (Dial, Fader, Switch) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 28,
          alignItems: 'center',
          flex: 1,
          padding: '16px 14px',
        }}
      >
        {/* Control 1: Rotary Tone Dial */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: `4px solid ${dialActive ? COLORS.accent : '#D1C4B2'}`,
              boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${dialAngle}deg)`,
            }}
          >
            {/* Dial Notch Indicator */}
            <div
              style={{
                position: 'absolute',
                top: 7,
                width: 6,
                height: 22,
                backgroundColor: dialActive ? COLORS.accent : '#A49685',
                borderRadius: 3,
              }}
            />
            <FaIcon
              icon="microphone"
              size={36}
              color={dialActive ? COLORS.accent : '#A49685'}
            />
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              fontWeight: 900,
              color: COLORS.ink,
              letterSpacing: '0.05em',
            }}
          >
            {dialLabel}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1.5,
            height: 150,
            backgroundColor: 'rgba(26,24,22,0.1)',
          }}
        />

        {/* Control 2: Linear Fader */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Fader Track */}
          <div
            style={{
              position: 'relative',
              width: 16,
              height: 124,
              backgroundColor: '#E5DDD1',
              borderRadius: 8,
              border: '1.5px solid #C8BCAB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Active fill */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: `${Math.min(100, Math.max(0, faderProgressPercent))}%`,
                backgroundColor: COLORS.accent,
                borderRadius: 8,
              }}
            />
            {/* Fader Knob */}
            <div
              style={{
                position: 'absolute',
                width: 58,
                height: 32,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                border: `2px solid ${COLORS.accent}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateY(${faderY}px)`,
              }}
            >
              <FaIcon icon="scroll" size={17} color={COLORS.accent} />
            </div>
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              fontWeight: 900,
              color: COLORS.ink,
              letterSpacing: '0.05em',
            }}
          >
            {faderLabel}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1.5,
            height: 150,
            backgroundColor: 'rgba(26,24,22,0.1)',
          }}
        />

        {/* Control 3: Mechanical Toggle Switch */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Switch Plate */}
          <div
            style={{
              position: 'relative',
              width: 66,
              height: 124,
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              border: `2.5px solid ${switchActive ? COLORS.accent : '#D1C4B2'}`,
              boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Toggle Lever */}
            <div
              style={{
                width: 14,
                height: 64,
                backgroundColor: switchActive ? COLORS.accent : '#7C6E5E',
                borderRadius: 7,
                transformOrigin: 'center center',
                transform: `rotate(${switchAngle}deg)`,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              fontWeight: 900,
              color: COLORS.ink,
              letterSpacing: '0.05em',
            }}
          >
            {switchLabel}
          </div>
        </div>
      </div>
    </div>
  );
};
