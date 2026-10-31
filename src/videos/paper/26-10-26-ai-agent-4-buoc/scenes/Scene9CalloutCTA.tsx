import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, Flip3DIn, FONTS, MaskReveal } from './common';

export const Scene9CalloutCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 170 },
  });

  const cardSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { mass: 0.8, damping: 13, stiffness: 160 },
  });

  // Typing effect "AI Agent"
  const commentText = 'AI Agent';
  const typeStart = 40;
  const charsTyped = Math.max(0, Math.min(commentText.length, Math.floor((frame - typeStart) / 3)));
  const currentComment = commentText.slice(0, charsTyped);

  // Send button press at frame 70
  const isSendPressed = frame >= 70 && frame <= 78;
  const sendScale = isSendPressed ? 0.88 : 1.0;

  // Heart pop at frame 78
  const heartSpring = spring({
    frame: Math.max(0, frame - 78),
    fps,
    config: { mass: 0.4, damping: 9, stiffness: 240 },
  });

  const exitProgress = interpolate(frame, [98, 107], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92]);
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
      <div style={{ marginBottom: 20 }}>
        <MaskReveal progress={enterSpring} direction="down">
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.accent,
              letterSpacing: '5px',
              textTransform: 'uppercase',
            }}
          >
            HƯỚNG DẪN CHI TIẾT
          </div>
        </MaskReveal>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <MaskReveal progress={enterSpring} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 66,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.2,
            }}
          >
            Bình luận{' '}
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
              "AI Agent"
            </span>
          </div>
        </MaskReveal>
      </div>

      {/* Tactile Comment Box Card */}
      <Flip3DIn progress={cardSpring} axis="Y" initialAngle={-35}>
        <div
          style={{
            position: 'relative',
            width: 720,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            border: `1.5px solid ${COLORS.line}`,
            boxShadow: '0 20px 50px rgba(26, 24, 22, 0.12), 0 4px 12px rgba(26,24,22,0.05)',
            padding: '28px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#F4EFE6',
                border: '1.5px solid rgba(26,24,22,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.ink} strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.ink,
                letterSpacing: '1px',
              }}
            >
              {currentComment}
              <span
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: 32,
                  backgroundColor: COLORS.accent,
                  marginLeft: 4,
                  verticalAlign: 'middle',
                }}
              />
            </div>
          </div>

          {/* Send comment button */}
          <div
            style={{
              padding: '16px 32px',
              borderRadius: 20,
              backgroundColor: COLORS.accent,
              color: '#FFFFFF',
              fontFamily: FONTS.body,
              fontSize: 20,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 8px 24px rgba(198,83,42,0.3)',
              transform: `scale(${sendScale})`,
              transition: 'transform 0.08s ease',
            }}
          >
            <span>Gửi</span>
            <span>➤</span>
          </div>

          {/* Floating celebratory heart pop */}
          {frame >= 78 && (
            <div
              style={{
                position: 'absolute',
                right: 50,
                top: -30,
                transform: `scale(${heartSpring}) translateY(${(1 - heartSpring) * 20}px)`,
                fontSize: 44,
              }}
            >
              🧡
            </div>
          )}
        </div>
      </Flip3DIn>
    </AbsoluteFill>
  );
};
