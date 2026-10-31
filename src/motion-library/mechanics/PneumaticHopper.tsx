import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface PneumaticHopperProps {
  token1Label?: string;
  token1Icon?: string;
  token1Y?: number;
  token1Scale?: number;
  token1Opacity?: number;

  token2Label?: string;
  token2Icon?: string;
  token2Y?: number;
  token2Scale?: number;
  token2Opacity?: number;

  outputTitle?: string;
  outputSubtitle?: string;
  outputIcon?: string;
  outputY?: number;
  outputScale?: number;
  outputOpacity?: number;

  pressRecoil?: number;
  yOffset?: number;
  scale?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Editorial Pneumatic Hopper / Input Synthesizer:
 * Takes 2 minimal input tokens (e.g. Topic + Raw Notes),
 * compresses them with pneumatic recoil, and produces a finished output tablet.
 */
export const PneumaticHopper: React.FC<PneumaticHopperProps> = ({
  token1Label = 'CHỦ ĐỀ',
  token1Icon = 'lightbulb',
  token1Y = 0,
  token1Scale = 1,
  token1Opacity = 1,

  token2Label = 'Ý THÔ',
  token2Icon = 'pencil',
  token2Y = 0,
  token2Scale = 1,
  token2Opacity = 1,

  outputTitle = 'Bài Viết Hoàn Tất',
  outputSubtitle = '● ĐẠT 100% TIÊU CHÍ SKILL',
  outputIcon = 'circle-check',
  outputY = 160,
  outputScale = 1,
  outputOpacity = 0,

  pressRecoil = 0,
  yOffset = 0,
  scale = 1,
  width = 860,
  height = 520,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {/* The Output Result Tablet (slides out from behind hopper) */}
      <div
        style={{
          position: 'absolute',
          width: 760,
          height: 210,
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          border: '2.5px solid #C8BCAB',
          boxShadow: '0 24px 50px rgba(60, 48, 36, 0.16)',
          padding: '26px 36px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: `translateY(${outputY}px) scale(${outputScale})`,
          opacity: outputOpacity,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: 'rgba(198, 83, 42, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaIcon icon={outputIcon} size={36} color={COLORS.accent} />
          </div>
          <div>
            <div
              style={{
                fontFamily: FONTS.title,
                fontSize: 28,
                fontWeight: 800,
                color: COLORS.ink,
              }}
            >
              {outputTitle}
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 15,
                color: COLORS.accent,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              {outputSubtitle}
            </div>
          </div>
        </div>
      </div>

      {/* The Central Funnel Hopper (Sits in front) */}
      <div
        style={{
          position: 'relative',
          width: 840,
          height: 190,
          backgroundColor: '#FAF7F0',
          borderRadius: 26,
          border: '2.5px solid #C8BCAB',
          boxShadow: '0 24px 45px rgba(60, 48, 36, 0.14)',
          padding: '24px 32px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: `translateY(${yOffset + pressRecoil}px)`,
          zIndex: 20,
        }}
      >
        {/* Left Slot: Token 1 */}
        <div
          style={{
            flex: 1,
            height: 126,
            borderRadius: 18,
            backgroundColor: '#FFFFFF',
            border: `2.5px dashed ${COLORS.accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${token1Y}px) scale(${token1Scale})`,
            opacity: token1Opacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <FaIcon icon={token1Icon} size={28} color={COLORS.accent} />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                fontWeight: 900,
                color: COLORS.accent,
              }}
            >
              {token1Label}
            </span>
          </div>
        </div>

        {/* Plus Sign */}
        <div
          style={{
            padding: '0 24px',
            fontFamily: FONTS.mono,
            fontSize: 32,
            fontWeight: 900,
            color: '#A49685',
          }}
        >
          +
        </div>

        {/* Right Slot: Token 2 */}
        <div
          style={{
            flex: 1,
            height: 126,
            borderRadius: 18,
            backgroundColor: '#FFFFFF',
            border: `2.5px dashed ${COLORS.accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${token2Y}px) scale(${token2Scale})`,
            opacity: token2Opacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <FaIcon icon={token2Icon} size={28} color={COLORS.accent} />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                fontWeight: 900,
                color: COLORS.accent,
              }}
            >
              {token2Label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
