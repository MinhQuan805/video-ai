import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ClickRipple, COLORS, EyebrowHeader, Flip3DIn, FONTS, MaskReveal, ShockwaveRing, SimulatedCursor } from './common';

export const Scene12DraftApproval: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // Cursor moves directly onto "Duyệt & Gửi" button: frame 25 to 55
  const cursorX = interpolate(frame, [25, 55], [200, 645], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const cursorY = interpolate(frame, [25, 55], [90, 165], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const isClicking = frame >= 55 && frame <= 63;

  // Stamp drop at frame 64
  const stampSpring = spring({
    frame: Math.max(0, frame - 64),
    fps,
    config: { mass: 0.5, damping: 9, stiffness: 220 },
  });

  // Shockwave recoil on hero card when stamped
  const recoil = frame >= 64 && frame <= 82
    ? Math.sin((frame - 64) * 0.7) * Math.exp(-(frame - 64) * 0.22) * 8
    : 0;

  const exitProgress = interpolate(frame, [112, 124], [0, 1], {
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
      <EyebrowHeader
        icon={
          <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFF', fontSize: 16, fontWeight: 900 }}>✓</span>
          </div>
        }
        stepNum="03"
        tag="Duyệt bản nháp"
      />

      <div style={{ width: '100%', maxWidth: 780, marginTop: 6 }}>
        <MaskReveal progress={enterSpring} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.2,
            }}
          >
            Soạn sẵn bản nháp,{' '}
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
              chỉ cần duyệt
            </span>
          </div>
        </MaskReveal>
      </div>

      {/* Draft Email Card */}
      <div
        style={{
          marginTop: 20,
          width: '100%',
          maxWidth: 760,
          position: 'relative',
          transform: `translateY(${recoil}px)`,
        }}
      >
        <Flip3DIn progress={enterSpring} axis="X" initialAngle={-18}>
          <div
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: `1.5px solid ${COLORS.line}`,
              boxShadow: '0 20px 48px rgba(26, 24, 22, 0.10)',
              padding: '24px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${COLORS.line}`, paddingBottom: 10 }}>
              <div style={{ fontFamily: FONTS.title, fontSize: 20, fontWeight: 700, color: COLORS.ink }}>
                Re: [Hỗ trợ] Lỗi đăng nhập tài khoản
              </div>
              <span style={{ fontFamily: FONTS.body, fontSize: 12, fontWeight: 700, color: COLORS.accent, backgroundColor: 'rgba(198,83,42,0.1)', padding: '4px 10px', borderRadius: 8 }}>
                AI SOẠN THẢO
              </span>
            </div>

            <div style={{ fontFamily: FONTS.body, fontSize: 17, color: COLORS.ink, lineHeight: 1.5 }}>
              Chào bạn, mình đã kiểm tra và hỗ trợ cấp lại liên kết đặt lại mật khẩu cho tài khoản. Bạn vui lòng kiểm tra hộp thư nhé!
            </div>

            {/* Action Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16, marginTop: 8 }}>
              <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.subtle }}>Chỉnh sửa</span>
              <div
                style={{
                  backgroundColor: COLORS.accent,
                  color: '#FFFFFF',
                  padding: '10px 24px',
                  borderRadius: 12,
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 6px 18px rgba(198,83,42,0.3)',
                  transform: `scale(${isClicking ? 0.92 : 1})`,
                  transition: 'transform 0.08s ease',
                }}
              >
                <span>Duyệt & Gửi</span>
                <span>➤</span>
              </div>
            </div>

            {/* Terracotta Stamp Seal Slamming Down with Shockwave */}
            {frame >= 64 && (
              <>
                <ShockwaveRing
                  x={580}
                  y={60}
                  progress={interpolate(frame, [64, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                  color={COLORS.accent}
                  size={180}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: 40,
                    top: 40,
                    transform: `scale(${stampSpring}) rotate(-12deg)`,
                    border: `3.5px solid ${COLORS.accent}`,
                    borderRadius: 14,
                    padding: '8px 22px',
                    color: COLORS.accent,
                    fontFamily: FONTS.body,
                    fontSize: 24,
                    fontWeight: 900,
                    letterSpacing: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    boxShadow: '0 8px 26px rgba(198,83,42,0.35)',
                    opacity: Math.min(1, stampSpring * 2),
                    zIndex: 25,
                  }}
                >
                  ĐÃ DUYỆT ✓
                </div>
              </>
            )}
          </div>
        </Flip3DIn>

        {/* Gliding mouse cursor & click ripple */}
        <SimulatedCursor x={cursorX} y={cursorY} isClicking={isClicking} />
        {frame >= 55 && (
          <ClickRipple
            x={645}
            y={165}
            progress={interpolate(frame, [55, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            color={COLORS.accent}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
