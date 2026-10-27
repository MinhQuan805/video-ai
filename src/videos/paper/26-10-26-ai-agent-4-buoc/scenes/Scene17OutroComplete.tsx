import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, Flip3DIn, FONTS, MaskReveal, ShockwaveRing } from './common';

export const Scene17OutroComplete: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 170 },
  });

  const laptopSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 160 },
  });

  const checkSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { mass: 0.4, damping: 8, stiffness: 240 },
  });

  // Animated email counter from 0 to 24
  const emailCount = Math.min(24, Math.floor(interpolate(frame, [10, 35], [0, 24], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

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
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <MaskReveal progress={enterSpring} direction="down">
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 20,
              fontWeight: 800,
              color: COLORS.accent,
              letterSpacing: '5px',
              textTransform: 'uppercase',
            }}
          >
            HOÀN TẤT TỰ ĐỘNG
          </div>
        </MaskReveal>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
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
            Xong xuôi trước khi{' '}
            <span style={{ fontStyle: 'italic', color: COLORS.accent, display: 'block' }}>
              bạn kịp mở máy
            </span>
          </div>
        </MaskReveal>
      </div>

      {/* Result Mockup Card */}
      <Flip3DIn progress={laptopSpring} axis="X" initialAngle={25}>
        <div
          style={{
            position: 'relative',
            width: 720,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            border: `1.5px solid ${COLORS.line}`,
            boxShadow: '0 20px 50px rgba(26, 24, 22, 0.12), 0 4px 12px rgba(26,24,22,0.05)',
            padding: '24px 36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {frame >= 20 && (
            <ShockwaveRing
              x={380}
              y={75}
              progress={interpolate(frame, [20, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              color="#10B981"
              size={180}
            />
          )}

          {/* Big Green Success Badge */}
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(16, 185, 129, 0.35)',
              transform: `scale(${checkSpring})`,
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: FONTS.title, fontSize: 34, fontWeight: 800, color: COLORS.ink }}>
              {emailCount} Email Đã Xử Lý Xong
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.subtle, marginTop: 6 }}>
              Bản nháp đã sẵn sàng để bạn duyệt và gửi
            </div>
          </div>

          {/* 4 Steps recap badges */}
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {[
              { num: '01', label: 'Cài Agent' },
              { num: '02', label: 'Kết nối' },
              { num: '03', label: 'Giao việc' },
              { num: '04', label: 'Tạo skill' },
            ].map((step, idx) => {
              const stepSpring = spring({
                frame: Math.max(0, frame - (30 + idx * 4)),
                fps,
                config: { mass: 0.4, damping: 9, stiffness: 220 },
              });
              return (
                <div
                  key={step.num}
                  style={{
                    backgroundColor: '#FAF8F5',
                    borderRadius: 14,
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    border: '1px solid rgba(26,24,22,0.08)',
                    transform: `scale(${stepSpring})`,
                  }}
                >
                  <span style={{ color: '#10B981', fontWeight: 900, fontSize: 13 }}>✓</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: COLORS.ink }}>
                    {step.num} {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Flip3DIn>
    </AbsoluteFill>
  );
};
