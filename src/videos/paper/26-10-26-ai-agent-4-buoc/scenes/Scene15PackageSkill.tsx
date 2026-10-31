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

  // Let the checkmarked cards settle, then have the agent glide through and consume them.
  const consume1 = interpolate(frame, [70, 82], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const consume2 = interpolate(frame, [82, 94], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const consume3 = interpolate(frame, [94, 106], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const agentTravelX = interpolate(frame, [70, 106], [0, 272], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
          {/* Robot with Checkmark on Head */}
          <div style={{ position: 'relative', transform: `translateX(${agentTravelX}px)` }}>
            <RobotHero size={184} blink={frame >= 50 && frame <= 56} />
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
          <div style={{ width: 60, height: 4, backgroundColor: COLORS.accent, borderRadius: 2, opacity: 1 - interpolate(frame, [70, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }} />

          {/* 3 Checkmarked Category Cards Row */}
          <div style={{ display: 'flex', gap: 12 }}>
            {/* Card 1: Lỗi */}
            <div
              style={{
                width: 140,
                height: 140,
                backgroundColor: '#FFFFFF',
                borderRadius: 22,
                border: '1.5px solid rgba(26,24,22,0.12)',
                boxShadow: '0 12px 28px rgba(26,24,22,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transform: `translateX(${-consume1 * 250}px) scale(${card1 * (1 - consume1 * 0.55)})`,
                opacity: card1 * (1 - consume1),
              }}
            >
              <span style={{ fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.ink }}>
                Lỗi
              </span>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            {/* Card 2: Thanh toán */}
            <div
              style={{
                width: 140,
                height: 140,
                backgroundColor: '#FFFFFF',
                borderRadius: 22,
                border: '1.5px solid rgba(26,24,22,0.12)',
                boxShadow: '0 12px 28px rgba(26,24,22,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transform: `translateX(${-consume2 * 250}px) scale(${card2 * (1 - consume2 * 0.55)})`,
                opacity: card2 * (1 - consume2),
              }}
            >
              <span style={{ fontFamily: FONTS.body, fontSize: 17, fontWeight: 700, color: COLORS.ink }}>
                Thanh toán
              </span>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            {/* Card 3: Góp ý */}
            <div
              style={{
                width: 140,
                height: 140,
                backgroundColor: '#FFFFFF',
                borderRadius: 22,
                border: '1.5px solid rgba(26,24,22,0.12)',
                boxShadow: '0 12px 28px rgba(26,24,22,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transform: `translateX(${-consume3 * 250}px) scale(${card3 * (1 - consume3 * 0.55)})`,
                opacity: card3 * (1 - consume3),
              }}
            >
              <span style={{ fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.ink }}>
                Góp ý
              </span>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Three-dot bubble stays attached beneath the agent as it travels. */}
        <div
          style={{
            position: 'absolute',
            left: 67,
            top: 270,
            zIndex: 30,
            transform: `translateX(${agentTravelX}px) scale(${bubbleSpring})`,
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
