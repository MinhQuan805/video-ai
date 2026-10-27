import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, MaskReveal, StampDropIn } from './common';

export const Scene10Step3Badge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowProgress = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cardSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { mass: 0.7, damping: 11, stiffness: 180 },
  });

  const titleProgress = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const exitProgress = interpolate(frame, [42, 53], [0, 1], {
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
        <MaskReveal progress={eyebrowProgress} direction="down">
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 26,
              fontWeight: 800,
              color: COLORS.accent,
              letterSpacing: '5px',
              textTransform: 'uppercase',
            }}
          >
            BƯỚC 03
          </div>
        </MaskReveal>
      </div>

      {/* 3D Black Squircle Stamp Card with Clipboard Icon */}
      <StampDropIn progress={cardSpring} dropDistance={-90}>
        <div
          style={{
            width: 230,
            height: 230,
            borderRadius: 58,
            backgroundColor: '#1E1D1B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 24px 56px rgba(26, 24, 22, 0.16)',
          }}
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M9 14l2 2 4-4" />
          </svg>
        </div>
      </StampDropIn>

      <div style={{ marginTop: 44 }}>
        <MaskReveal progress={titleProgress} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 76,
              fontWeight: 800,
              fontStyle: 'italic',
              color: COLORS.ink,
            }}
          >
            Giao việc rõ ràng
          </div>
        </MaskReveal>
      </div>
    </AbsoluteFill>
  );
};
