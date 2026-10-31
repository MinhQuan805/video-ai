import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EyebrowHeader, FONTS, MaskReveal, RobotHero } from './common';

const EnvelopeFlight: React.FC<{
  progress: number;
  startTop: number;
  endTop: number;
  arcHeight: number;
  sealColor: string;
  icon: string;
}> = ({ progress, startTop, endTop, arcHeight, sealColor, icon }) => {
  if (progress <= 0 || progress >= 1) return null;
  const arcY = Math.sin(progress * Math.PI) * -arcHeight;
  return (
    <div style={{
      position: 'absolute', left: interpolate(progress, [0, 1], [220, 500]),
      top: interpolate(progress, [0, 1], [startTop, endTop]) + arcY,
      transform: `rotate(${interpolate(progress, [0, 0.5, 1], [-16, 12, 0])}deg) scale(${interpolate(progress, [0, 0.5, 1], [0.85, 1.12, 0.9])})`,
      zIndex: 35, width: 100, height: 64, borderRadius: 12, backgroundColor: '#FFFFFF',
      boxShadow: '0 14px 32px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="100" height="64" style={{ position: 'absolute', top: 0, left: 0 }}>
        <path d="M 0 0 L 50 32 L 100 0" fill="none" stroke="#E5E1D8" strokeWidth="2.5" />
        <circle cx="50" cy="32" r="7" fill={sealColor} />
      </svg>
      <span style={{ position: 'absolute', bottom: 7, right: 9, fontSize: 15 }}>{icon}</span>
    </div>
  );
};

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

  // Three letters arc from the agent into their matching categories.
  const throw1Progress = interpolate(frame, [6, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const throw2Progress = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const throw3Progress = interpolate(frame, [36, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  // ==========================================
  // The robot hops as it throws each letter.
  // ==========================================
  let aiOffsetY = 0;
  let aiScaleX = 1;
  let aiScaleY = 1;

  // First throw (frame 5 to 17)
  if (frame >= 5 && frame < 17) {
    const p = Math.sin((frame - 5) * (Math.PI / 12));
    aiOffsetY = -p * 22;
    aiScaleY = 1 + p * 0.18;
    aiScaleX = 1 - p * 0.09;
  }
  // Second throw (frame 21 to 32)
  else if (frame >= 21 && frame < 32) {
    const p = Math.sin((frame - 21) * (Math.PI / 11));
    aiOffsetY = -p * 18;
    aiScaleY = 1 + p * 0.15;
    aiScaleX = 1 - p * 0.08;
  }
  // Third throw (frame 35 to 45)
  else if (frame >= 35 && frame < 45) {
    const p = Math.sin((frame - 35) * (Math.PI / 10));
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
        {/* AI stays on the left and tosses each letter toward its category. */}
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
              transform: `translateY(${aiOffsetY}px) scaleX(${aiScaleX}) scaleY(${aiScaleY})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <RobotHero
              size={230}
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
              <span style={{ fontFamily: FONTS.body, fontSize: 16, fontWeight: 700, color: COLORS.ink }}>
                Tự động phân luồng
              </span>
            </div>
          </div>
        </div>

        <EnvelopeFlight progress={throw1Progress} startTop={200} endTop={65} arcHeight={65} sealColor={COLORS.accent} icon="🚨" />
        <EnvelopeFlight progress={throw2Progress} startTop={210} endTop={185} arcHeight={50} sealColor="#2B2D42" icon="💳" />
        <EnvelopeFlight progress={throw3Progress} startTop={220} endTop={305} arcHeight={40} sealColor="#8D99AE" icon="💬" />

        {/* Right: 3 Category Trays (Wider, larger font, readable) */}
        <div
          style={{
            width: 460,
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
              padding: '18px 24px',
              boxShadow:
                frame >= 22
                  ? '0 18px 40px rgba(235,94,40,0.18), 0 0 0 2px #EB5E28'
                  : '0 10px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: `translateY(${impactLoi}px) scale(${frame >= 22 && frame <= 28 ? 1.04 : 1})`,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: 'rgba(235, 94, 40, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  🚨
                </div>
                <span style={{ fontFamily: FONTS.title, fontSize: 26, fontWeight: 800, color: COLORS.ink }}>
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
              padding: '18px 24px',
              boxShadow:
                frame >= 36
                  ? '0 18px 40px rgba(0,0,0,0.14), 0 0 0 2px #2B2D42'
                  : '0 10px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: `scale(${frame >= 36 && frame <= 42 ? 1.04 : 1})`,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: 'rgba(43, 45, 66, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  💳
                </div>
                <span style={{ fontFamily: FONTS.title, fontSize: 26, fontWeight: 800, color: COLORS.ink }}>
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
              padding: '18px 24px',
              boxShadow:
                frame >= 46
                  ? '0 18px 40px rgba(0,0,0,0.14), 0 0 0 2px #8D99AE'
                  : '0 10px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: `scale(${frame >= 46 && frame <= 52 ? 1.04 : 1})`,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: 'rgba(141, 153, 174, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  💬
                </div>
                <span style={{ fontFamily: FONTS.title, fontSize: 26, fontWeight: 800, color: COLORS.ink }}>
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
