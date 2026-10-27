import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EyebrowHeader, FONTS, MaskReveal, RobotHero } from './common';

export const Scene15PackageSkill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 180 },
  });

  // Staggered checkmarked category cards
  const card1 = spring({ frame: Math.max(0, frame - 10), fps, config: { mass: 0.5, damping: 10, stiffness: 200 } });
  const card2 = spring({ frame: Math.max(0, frame - 16), fps, config: { mass: 0.5, damping: 10, stiffness: 200 } });
  const card3 = spring({ frame: Math.max(0, frame - 22), fps, config: { mass: 0.5, damping: 10, stiffness: 200 } });

  // Orange chat bubble pops below at frame 32
  const bubbleSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { mass: 0.5, damping: 9, stiffness: 220 },
  });

  const exitProgress = interpolate(frame, [115, 127], [0, 1], {
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
              <span style={{ color: COLORS.accent, fontSize: 16, fontWeight: 900 }}>📦</span>
            </div>
          }
          stepNum="04"
          tag="Tạo skill"
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
              Làm ổn rồi?
              <br />
              <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
                bảo một câu
              </span>
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Visual Canvas: Robot + Checkmarked Cards + Speech Bubble */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 840,
          height: 380,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Top Row: Robot connected to 3 checkmarked category cards */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative' }}>
          {/* Robot with Checkmark on Head */}
          <div style={{ position: 'relative' }}>
            <RobotHero size={170} blink={frame >= 50 && frame <= 56} />
            {/* Terracotta Checkmark circle on head */}
            <div
              style={{
                position: 'absolute',
                top: -12,
                right: -10,
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: COLORS.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(198,83,42,0.4)',
                border: '2.5px solid #FFFFFF',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Orange connector line */}
          <div style={{ width: 80, height: 4, backgroundColor: COLORS.accent, borderRadius: 2 }} />

          {/* 3 Checkmarked Category Cards Row */}
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Card 1: Lỗi */}
            <div
              style={{
                width: 120,
                height: 120,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                border: '1.5px solid rgba(26,24,22,0.12)',
                boxShadow: '0 12px 28px rgba(26,24,22,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transform: `scale(${card1})`,
                opacity: card1,
              }}
            >
              <span style={{ fontFamily: FONTS.body, fontSize: 16, fontWeight: 700, color: COLORS.ink }}>
                Lỗi
              </span>
              <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            {/* Card 2: Thanh toán */}
            <div
              style={{
                width: 120,
                height: 120,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                border: '1.5px solid rgba(26,24,22,0.12)',
                boxShadow: '0 12px 28px rgba(26,24,22,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transform: `scale(${card2})`,
                opacity: card2,
              }}
            >
              <span style={{ fontFamily: FONTS.body, fontSize: 15, fontWeight: 700, color: COLORS.ink }}>
                Thanh toán
              </span>
              <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            {/* Card 3: Góp ý */}
            <div
              style={{
                width: 120,
                height: 120,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                border: '1.5px solid rgba(26,24,22,0.12)',
                boxShadow: '0 12px 28px rgba(26,24,22,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transform: `scale(${card3})`,
                opacity: card3,
              }}
            >
              <span style={{ fontFamily: FONTS.body, fontSize: 16, fontWeight: 700, color: COLORS.ink }}>
                Góp ý
              </span>
              <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Orange Speech Bubble popping below (matching frame 41) */}
        <div
          style={{
            marginTop: 36,
            transform: `scale(${bubbleSpring})`,
            opacity: bubbleSpring,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              backgroundColor: COLORS.accent,
              borderRadius: 24,
              padding: '16px 36px',
              boxShadow: '0 10px 28px rgba(198,83,42,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {/* 3 white dots */}
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />

            {/* Speech triangle tail pointing up */}
            <div
              style={{
                position: 'absolute',
                top: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: `10px solid ${COLORS.accent}`,
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
