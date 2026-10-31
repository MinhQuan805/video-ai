import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  COLORS,
  continuousFloat,
  dampedOscillation,
  EyebrowHeader,
  FaIcon,
  FONTS,
  MaskReveal,
  SPRINGS,
} from './common';

export const Scene8OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headlines
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });

  // Console Base entrance
  const baseSpring = spring({ frame: Math.max(0, frame - 8), fps, config: SPRINGS.elastic });
  const idleFloat = continuousFloat(frame, 0.05, 3);

  // Power Switch Lever Throw: frame 24 to 38
  const leverSpring = spring({ frame: Math.max(0, frame - 24), fps, config: SPRINGS.snappy });
  const leverAngle = interpolate(leverSpring, [0, 1], [35, -35]);
  const isLeverDown = frame >= 34;

  // Impact recoil when lever locks down
  const impactRecoil = dampedOscillation(frame, 34, 18, 12, 0.85);

  // Shockwave Rings expanding outward (frame 34 onwards)
  const ring1 = spring({ frame: Math.max(0, frame - 34), fps, config: SPRINGS.smooth });
  const ring2 = spring({ frame: Math.max(0, frame - 42), fps, config: SPRINGS.smooth });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 940,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 180,
        transform: `translateY(${impactRecoil}px)`,
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    >
      <EyebrowHeader
        icon={<FaIcon icon="bolt" size={26} color={COLORS.accent} />}
        tag="BƯỚC TIẾP THEO"
        stepNum="08"
      />

      <div style={{ textAlign: 'center', marginBottom: 24, padding: '0 60px' }}>
        <MaskReveal progress={titleProgress}>
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.22,
            }}
          >
            Tạo Skill Đầu Tiên <br />
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>ngay hôm nay</span>
          </div>
        </MaskReveal>
      </div>

      {/* Main Stage: Heavy Vintage Power Switch Station */}
      <div
        style={{
          position: 'relative',
          width: 860,
          height: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Shockwave Rings on Lever Throw Contact */}
        {isLeverDown && (
          <>
            <div
              style={{
                position: 'absolute',
                top: 100,
                width: 320,
                height: 320,
                borderRadius: '50%',
                border: `3.5px solid ${COLORS.accent}`,
                transform: `scale(${interpolate(ring1, [0, 1], [0.7, 2.4])})`,
                opacity: interpolate(ring1, [0, 0.7, 1], [0.8, 0.4, 0]),
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 100,
                width: 320,
                height: 320,
                borderRadius: '50%',
                border: '2.5px solid #C49E4A',
                transform: `scale(${interpolate(ring2, [0, 1], [0.7, 2.7])})`,
                opacity: interpolate(ring2, [0, 0.7, 1], [0.8, 0.3, 0]),
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
          </>
        )}

        {/* Vintage Heavy Power Switch Base Console */}
        <div
          style={{
            position: 'relative',
            width: 620,
            height: 360,
            backgroundColor: '#FAF7F0',
            borderRadius: 28,
            border: '2.5px solid #C8BCAB',
            boxShadow: '0 24px 60px rgba(60, 48, 36, 0.16)',
            padding: '22px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: `translateY(${idleFloat}px) scale(${baseSpring})`,
            opacity: baseSpring,
            zIndex: 10,
          }}
        >
          {/* Top Status Header */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1.5px solid rgba(26,24,22,0.1)',
              paddingBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  backgroundColor: isLeverDown ? '#16A34A' : '#D97706',
                  boxShadow: isLeverDown ? '0 0 12px #16A34A' : '0 0 8px #D97706',
                }}
              />
              <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 800, color: COLORS.ink }}>
                {isLeverDown ? 'HỆ THỐNG ĐÃ KÍCH HOẠT' : 'CHỜ KÍCH HOẠT...'}
              </span>
            </div>
            <span style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 700, color: COLORS.accent }}>
              AUTOMATION ON
            </span>
          </div>

          {/* Center Zone: Heavy Knife Throw Lever (Unobstructed, lots of breathing room) */}
          <div
            style={{
              position: 'relative',
              width: 200,
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* The Lever Arm */}
            <div
              style={{
                position: 'relative',
                width: 32,
                height: 120,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transformOrigin: 'bottom center',
                transform: `rotate(${leverAngle}deg)`,
              }}
            >
              {/* Terracotta Knob */}
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  boxShadow: '0 6px 18px rgba(198, 83, 42, 0.4)',
                  border: '3.5px solid #8A3314',
                  marginBottom: -12,
                  zIndex: 5,
                }}
              />
              {/* Metal Shaft */}
              <div
                style={{
                  width: 14,
                  height: 80,
                  backgroundColor: '#7C6E5E',
                  borderRadius: 7,
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            {/* Pivot Base */}
            <div
              style={{
                position: 'absolute',
                bottom: 6,
                width: 58,
                height: 22,
                borderRadius: 6,
                backgroundColor: '#3A3530',
                boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                zIndex: 6,
              }}
            />
          </div>

          {/* Bottom Zone: Call To Action Pill Button (Cleanly situated below the lever) */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 4,
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.accent,
                borderRadius: 100,
                padding: '14px 44px',
                boxShadow: isLeverDown
                  ? '0 12px 30px rgba(198, 83, 42, 0.45)'
                  : '0 6px 18px rgba(198, 83, 42, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transform: `scale(${isLeverDown ? 1.04 : 1.0})`,
                transition: 'transform 0.15s ease',
              }}
            >
              <FaIcon icon="bolt" size={20} color="#FFFFFF" />
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}
              >
                TẠO SKILL NGAY
              </span>
              <FaIcon icon="arrow-right" size={16} color="#FFFFFF" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
