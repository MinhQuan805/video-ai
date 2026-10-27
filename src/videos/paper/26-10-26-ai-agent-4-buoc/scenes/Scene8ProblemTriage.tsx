import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EyebrowHeader, FONTS, MaskReveal, RobotHero } from './common';

export const Scene8ProblemTriage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 180 },
  });

  // Category trays entrance on the right
  const traysEntrance = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config: { mass: 0.6, damping: 13, stiffness: 180 },
  });

  // The agent glides across the three categories and pulls each card into itself.
  const consume1 = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const consume2 = interpolate(frame, [25, 37], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const consume3 = interpolate(frame, [40, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const aiTravelX = interpolate(frame, [0, 50], [0, 210], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // ==========================================
  // The robot recoils lightly as each category is consumed.
  // ==========================================
  let aiOffsetY = 0;
  let aiScaleX = 1;
  let aiScaleY = 1;

  // First bite (frame 12 to 22)
  if (frame >= 12 && frame < 23) {
    const p = Math.sin((frame - 12) * (Math.PI / 11));
    aiOffsetY = -p * 22;
    aiScaleY = 1 + p * 0.18;
    aiScaleX = 1 - p * 0.09;
  }
  // Second bite (frame 27 to 37)
  else if (frame >= 27 && frame < 38) {
    const p = Math.sin((frame - 27) * (Math.PI / 11));
    aiOffsetY = -p * 18;
    aiScaleY = 1 + p * 0.15;
    aiScaleX = 1 - p * 0.08;
  }
  // Third bite (frame 42 to 52)
  else if (frame >= 42 && frame < 53) {
    const p = Math.sin((frame - 42) * (Math.PI / 11));
    aiOffsetY = -p * 16;
    aiScaleY = 1 + p * 0.13;
    aiScaleX = 1 - p * 0.07;
  }

  // AI Eyes looking right at trays
  const eyeOffsetX = interpolate(
    frame,
    [0, 6, 20, 24, 38, 48, 54],
    [3, 12, 12, 14, 12, 8, 3],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const isBlinking =
    (frame >= 18 && frame <= 21) ||
    (frame >= 34 && frame <= 37) ||
    (frame >= 48 && frame <= 51);

  // Reaction on "Lỗi" tray when Letter 1 lands
  const impactLoi = frame >= 22
    ? Math.sin(Math.min(Math.PI, (frame - 22) * (Math.PI / 8))) * 7
    : 0;

  const draftLines = interpolate(frame, [24, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const exitProgress = interpolate(frame, [46, 54], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });

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
        opacity: 1 - exitProgress,
        transform: `scale(${1 - exitProgress * 0.05})`,
      }}
    >
      {/* Header & Title */}
      <div style={{ width: '100%', maxWidth: 780, marginBottom: 16 }}>
        <EyebrowHeader
          icon={
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: COLORS.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#FFF', fontSize: 16, fontWeight: 900 }}>⚡</span>
            </div>
          }
          stepNum="02"
          tag="Kết nối công cụ"
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
              Phân loại{' '}
              <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
                vấn đề cần xử lý
              </span>
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Visual Workspace: Centered with compact gap (AI & Trays closer together) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 840,
          height: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 45,
          boxSizing: 'border-box',
        }}
      >
        {/* AI glides right through the category cards and eats them in sequence. */}
        <div
          style={{
            position: 'relative',
            width: 250,
            height: 380,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              transform: `translate(${aiTravelX}px, ${aiOffsetY}px) scaleX(${aiScaleX}) scaleY(${aiScaleY})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <RobotHero
              size={210}
              blink={isBlinking}
              eyeOffsetX={eyeOffsetX}
            />

            {/* Action Callout */}
            <div
              style={{
                marginTop: 14,
                padding: '7px 16px',
                borderRadius: 14,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 6px 18px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 15 }}>🎯</span>
              <span style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: COLORS.ink }}>
                Tự động phân luồng
              </span>
            </div>
          </div>
        </div>

        {/* Right: 3 Category Trays (Wider, larger font, readable) */}
        <div
          style={{
            width: 440,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            transform: `translateX(${interpolate(traysEntrance, [0, 1], [60, 0])}px)`,
            opacity: traysEntrance,
          }}
        >
          {/* Tray 1: LỖI HỆ THỐNG (Receives Envelope 1 with red seal) */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: '16px 22px',
              boxShadow:
                frame >= 22
                  ? '0 18px 40px rgba(235,94,40,0.18), 0 0 0 2px #EB5E28'
                  : '0 10px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: `translateX(${-consume1 * 300}px) translateY(${impactLoi}px) scale(${1 - consume1 * 0.58})`,
              opacity: 1 - consume1,
              transition: 'transform 0.15s ease',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: 'rgba(235, 94, 40, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  🚨
                </div>
                <span style={{ fontFamily: FONTS.title, fontSize: 24, fontWeight: 800, color: COLORS.ink }}>
                  Lỗi hệ thống
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#FFF',
                  backgroundColor: COLORS.accent,
                  padding: '5px 10px',
                  borderRadius: 8,
                }}
              >
                ƯU TIÊN
              </span>
            </div>

            {/* Skeleton lines preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 10 }}>
              <div
                style={{
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: COLORS.ink,
                  opacity: 0.75,
                  width: `${interpolate(draftLines, [0, 1], [40, 94])}%`,
                }}
              />
              <div
                style={{
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: COLORS.ink,
                  opacity: 0.4,
                  width: `${interpolate(draftLines, [0, 1], [20, 70])}%`,
                }}
              />
            </div>
          </div>

          {/* Tray 2: THANH TOÁN (Receives Envelope 2) */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: '16px 22px',
              boxShadow:
                frame >= 36
                  ? '0 18px 40px rgba(0,0,0,0.14), 0 0 0 2px #2B2D42'
                  : '0 10px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: `translateX(${-consume2 * 300}px) scale(${1 - consume2 * 0.58})`,
              opacity: 1 - consume2,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: 'rgba(43, 45, 66, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  💳
                </div>
                <span style={{ fontFamily: FONTS.title, fontSize: 24, fontWeight: 800, color: COLORS.ink }}>
                  Thanh toán
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.subtle,
                  backgroundColor: '#F0ECE1',
                  padding: '5px 10px',
                  borderRadius: 8,
                }}
              >
                {frame >= 36 ? '1 thư' : 'Chờ'}
              </span>
            </div>

            <div style={{ width: '78%', height: 7, borderRadius: 4, backgroundColor: COLORS.ink, opacity: 0.35 }} />
          </div>

          {/* Tray 3: GÓP Ý & HỎI ĐÁP (Receives Envelope 3) */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: '16px 22px',
              boxShadow:
                frame >= 46
                  ? '0 18px 40px rgba(0,0,0,0.14), 0 0 0 2px #8D99AE'
                  : '0 10px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: `translateX(${-consume3 * 300}px) scale(${1 - consume3 * 0.58})`,
              opacity: 1 - consume3,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: 'rgba(141, 153, 174, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  💬
                </div>
                <span style={{ fontFamily: FONTS.title, fontSize: 24, fontWeight: 800, color: COLORS.ink }}>
                  Góp ý & hỏi đáp
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.subtle,
                  backgroundColor: '#F0ECE1',
                  padding: '5px 10px',
                  borderRadius: 8,
                }}
              >
                {frame >= 46 ? '1 thư' : 'Chờ'}
              </span>
            </div>

            <div style={{ width: '65%', height: 7, borderRadius: 4, backgroundColor: COLORS.ink, opacity: 0.35 }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
