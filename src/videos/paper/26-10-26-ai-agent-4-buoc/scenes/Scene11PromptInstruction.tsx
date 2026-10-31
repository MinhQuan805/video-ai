import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EyebrowHeader, FONTS, MaskReveal } from './common';

export const Scene11PromptInstruction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 180 },
  });

  const cardSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { mass: 0.6, damping: 13, stiffness: 180 },
  });

  // Animated pencil stroke on line 2 (frame 18 to 36)
  const line2Progress = interpolate(frame, [18, 36], [0.3, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const exitProgress = interpolate(frame, [40, 49], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.94]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        width: 1080,
        height: 940,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 140,
        paddingRight: 140,
        boxSizing: 'border-box',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <div style={{ width: '100%', maxWidth: 780, marginBottom: 16 }}>
        <EyebrowHeader
          icon={
            <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#1E1D1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: COLORS.accent, fontSize: 16, fontWeight: 900 }}>✏</span>
            </div>
          }
          stepNum="03"
          tag="Giao việc"
        />

        <div style={{ width: '100%', marginTop: 6 }}>
          <MaskReveal progress={enterSpring} direction="up">
            <div
              style={{
                fontFamily: FONTS.title,
                fontSize: 66,
                fontWeight: 800,
                color: COLORS.ink,
                lineHeight: 1.15,
              }}
            >
              Tả việc{' '}
              <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
                cho agent
              </span>
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Tactile Document Card with Top Clip (matching frame 31) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 680,
          marginTop: 30,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 600,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            border: '1.5px solid rgba(26,24,22,0.12)',
            boxShadow: '0 24px 60px rgba(26,24,22,0.10)',
            padding: '36px 36px 36px 36px',
            boxSizing: 'border-box',
            transform: `scale(${cardSpring})`,
            opacity: cardSpring,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* Top Dark Clip Tag */}
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 22,
              borderRadius: 11,
              backgroundColor: '#1E1D1B',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          />

          {/* Bullet Row 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: COLORS.accent, flexShrink: 0 }} />
            <div style={{ height: 14, width: '90%', borderRadius: 7, backgroundColor: '#2D2A26' }} />
          </div>

          {/* Bullet Row 2 (with animated pencil drawing stroke) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: COLORS.accent, flexShrink: 0 }} />
            <div style={{ height: 14, width: `${line2Progress * 75}%`, borderRadius: 7, backgroundColor: '#2D2A26' }} />
            {/* Animated pencil tip mark */}
            {frame >= 18 && frame <= 38 && (
              <div
                style={{
                  width: 6,
                  height: 18,
                  backgroundColor: COLORS.accent,
                  borderRadius: 3,
                  transform: 'rotate(-25deg)',
                  boxShadow: '0 2px 6px rgba(198,83,42,0.4)',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
