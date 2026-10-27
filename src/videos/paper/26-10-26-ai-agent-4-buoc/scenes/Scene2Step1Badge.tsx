import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrandLogo, COLORS, Flip3DIn, FONTS, MaskReveal } from './common';

export const Scene2Step1Badge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Eyebrow Tag Mask Reveal
  const eyebrowProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 2. 3D Card Flip unfolding with elastic spring
  const cardSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 160 },
  });

  // 3. Step Title Mask Reveal
  const titleProgress = interpolate(frame, [12, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Exit transition
  const exitProgress = interpolate(frame, [50, 63], [0, 1], {
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
      {/* Top Eyebrow Tag with Mask Reveal */}
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
            BƯỚC 01
          </div>
        </MaskReveal>
      </div>

      {/* 3D Perspective Card Flip-In */}
      <Flip3DIn progress={cardSpring} axis="Y" initialAngle={-80}>
        <div
          style={{
            width: 230,
            height: 230,
            borderRadius: 58,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 24px 56px rgba(26, 24, 22, 0.12), 0 3px 8px rgba(26, 24, 22, 0.05)',
            border: `1px solid ${COLORS.line}`,
          }}
        >
          <BrandLogo name="claude-code" size={130} />
        </div>
      </Flip3DIn>

      {/* Step Title with Mask Reveal */}
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
            Cài Agent
          </div>
        </MaskReveal>
      </div>
    </AbsoluteFill>
  );
};
