import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, MaskReveal } from './common';

export const Scene13IterationLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance Springs
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 180 },
  });

  // 2. Paper sheets stagger appearances
  const sheet1Spring = spring({ frame: Math.max(0, frame - 4), fps, config: { mass: 0.5, damping: 12, stiffness: 190 } });
  const sheet2Spring = spring({ frame: Math.max(0, frame - 14), fps, config: { mass: 0.5, damping: 12, stiffness: 190 } });

  // 3. Diagonal pencil slash on sheet 2 (stroke draw-on from frame 20 to 36)
  const slash2Progress = interpolate(frame, [20, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 4. Clean final paper card drops in with spring at frame 38
  const cardSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { mass: 0.7, damping: 13, stiffness: 170 },
  });

  // 5. 4 bullet items stagger reveal (frames 48, 55, 62, 69)
  const itemSpring = (delay: number) =>
    spring({
      frame: Math.max(0, frame - delay),
      fps,
      config: { mass: 0.4, damping: 10, stiffness: 220 },
    });

  const row1 = itemSpring(48);
  const row2 = itemSpring(54);
  const row3 = itemSpring(60);
  const row4 = itemSpring(66);

  // 6. Exit transition
  const exitProgress = interpolate(frame, [102, 114], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.94]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 180,
        paddingLeft: 140,
        paddingRight: 140,
        boxSizing: 'border-box',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <div style={{ width: '100%', maxWidth: 780 }}>
        {/* Eyebrow Header: [icon] 03 Giao việc */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: '#1E1D1B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
          </div>
          <span style={{ fontFamily: FONTS.title, fontSize: 30, fontWeight: 800, color: COLORS.accent }}>
            03
          </span>
          <span style={{ fontFamily: FONTS.title, fontSize: 30, fontWeight: 800, color: COLORS.ink }}>
            Giao việc
          </span>
        </div>

        {/* Serif Headline: Chỉnh tới / khi ưng */}
        <MaskReveal progress={enterSpring} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 82,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.15,
            }}
          >
            Chỉnh tới
            <br />
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
              khi ưng
            </span>
          </div>
        </MaskReveal>
      </div>

      {/* Tactile Paper Metaphor Canvas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 860,
          height: 680,
          marginTop: 40,
        }}
      >
        {/* REJECTED SHEET 1 (Back, rotated -8 deg) */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 60,
            width: 230,
            height: 290,
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            border: '1.5px solid rgba(26,24,22,0.12)',
            boxShadow: '0 12px 30px rgba(26,24,22,0.08)',
            transform: `rotate(-8deg) scale(${sheet1Spring})`,
            opacity: sheet1Spring,
            padding: '20px 22px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* Header icon and bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, backgroundColor: '#716E68' }} />
            <div style={{ height: 8, width: 90, borderRadius: 4, backgroundColor: '#716E68' }} />
          </div>
          {/* Skeleton lines */}
          <div style={{ height: 7, width: 140, borderRadius: 3.5, backgroundColor: '#D4CFCA' }} />
          <div style={{ height: 7, width: 110, borderRadius: 3.5, backgroundColor: '#D4CFCA' }} />

          {/* Diagonal Slash Strike / */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 230 290"
          >
            <line
              x1="45"
              y1="250"
              x2="195"
              y2="40"
              stroke="#1A1816"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* REJECTED SHEET 2 (Middle, rotated -4 deg) */}
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 360,
            width: 230,
            height: 290,
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            border: '1.5px solid rgba(26,24,22,0.12)',
            boxShadow: '0 14px 34px rgba(26,24,22,0.08)',
            transform: `rotate(-4deg) scale(${sheet2Spring})`,
            opacity: sheet2Spring,
            padding: '20px 22px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* Header icon and bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, backgroundColor: '#716E68' }} />
            <div style={{ height: 8, width: 90, borderRadius: 4, backgroundColor: '#716E68' }} />
          </div>
          {/* Skeleton lines */}
          <div style={{ height: 7, width: 140, borderRadius: 3.5, backgroundColor: '#D4CFCA' }} />
          <div style={{ height: 7, width: 110, borderRadius: 3.5, backgroundColor: '#D4CFCA' }} />

          {/* Animated Diagonal Slash Strike / */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 230 290"
          >
            <line
              x1="45"
              y1="250"
              x2="195"
              y2="40"
              stroke="#1A1816"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="260"
              strokeDashoffset={(1 - slash2Progress) * 260}
            />
          </svg>
        </div>

        {/* PRISTINE FINAL DOCUMENT CARD (Right) */}
        <div
          style={{
            position: 'absolute',
            left: 280,
            top: 20,
            width: 480,
            height: 600,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            border: '1.5px solid rgba(26,24,22,0.12)',
            boxShadow: '0 28px 70px rgba(26,24,22,0.10)',
            transform: `translateY(${(1 - cardSpring) * 60}px) scale(${cardSpring})`,
            opacity: cardSpring,
            padding: '44px 44px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 36,
          }}
        >
          {/* Header: Black square tag + dark horizontal title bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: '#1E1D1B',
                boxShadow: '0 6px 14px rgba(0,0,0,0.14)',
              }}
            />
            <div
              style={{
                height: 16,
                width: 200,
                borderRadius: 8,
                backgroundColor: '#2D2A26',
              }}
            />
          </div>

          {/* 4 Bullet Rows (Orange dots + dark bars) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 10 }}>
            {/* Row 1 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `translateX(${(1 - row1) * -30}px)`,
                opacity: row1,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  height: 14,
                  width: 320,
                  borderRadius: 7,
                  backgroundColor: '#2D2A26',
                }}
              />
            </div>

            {/* Row 2 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `translateX(${(1 - row2) * -30}px)`,
                opacity: row2,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  height: 14,
                  width: 240,
                  borderRadius: 7,
                  backgroundColor: '#2D2A26',
                }}
              />
            </div>

            {/* Row 3 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `translateX(${(1 - row3) * -30}px)`,
                opacity: row3,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  height: 14,
                  width: 290,
                  borderRadius: 7,
                  backgroundColor: '#2D2A26',
                }}
              />
            </div>

            {/* Row 4 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `translateX(${(1 - row4) * -30}px)`,
                opacity: row4,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  height: 14,
                  width: 180,
                  borderRadius: 7,
                  backgroundColor: '#2D2A26',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

