import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, MaskReveal, StampDropIn } from './common';

export const Scene5Step2Connect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 11, stiffness: 180 },
  });

  const partATitleProgress = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const exitProgress = interpolate(frame, [38, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 140,
        paddingRight: 140,
        paddingBottom: 160,
        boxSizing: 'border-box',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <div style={{ marginBottom: 36 }}>
        <MaskReveal progress={badgeSpring} direction="down">
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 30,
              fontWeight: 800,
              color: COLORS.accent,
              letterSpacing: '5px',
              textTransform: 'uppercase',
            }}
          >
            BƯỚC 02
          </div>
        </MaskReveal>
      </div>

      <StampDropIn progress={badgeSpring} dropDistance={-100}>
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: 72,
            backgroundColor: '#1E1D1B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 24px 56px rgba(26, 24, 22, 0.16)',
          }}
        >
          <svg width="126" height="126" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v6" />
            <path d="M7 8h10v4a5 5 0 0 1-10 0V8z" />
            <path d="M12 17v5" />
          </svg>
        </div>
      </StampDropIn>

      <div style={{ marginTop: 44 }}>
        <MaskReveal progress={partATitleProgress} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 84,
              fontWeight: 800,
              fontStyle: 'italic',
              color: COLORS.ink,
            }}
          >
            Kết nối công cụ
          </div>
        </MaskReveal>
      </div>
    </AbsoluteFill>
  );
};
