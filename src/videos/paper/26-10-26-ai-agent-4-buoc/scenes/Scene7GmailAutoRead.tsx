import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrandLogo, COLORS, EyebrowHeader, FONTS, MaskReveal, RobotHero } from './common';

export const Scene7GmailAutoRead: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 180 },
  });

  // ==========================================
  // TIMELINE
  // Frame 0 - 34: Phone on Left + Mail dropping dramatically from top on Right
  // Frame 34 - 42: Phone slides out to Left and completely unmounts
  // Frame 42 - 123: AI Robot enters on Left
  // Frame 54 - 115: AI sucks mail from Right, squashes/nhún xuống on each mail
  // ==========================================

  // Phone entrance and exit
  const phoneEntrance = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 190 },
  });

  const phoneExitProgress = interpolate(frame, [32, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });

  // Avatars around phone
  const a1 = spring({ frame: Math.max(0, frame - 4), fps, config: { mass: 0.4, damping: 8, stiffness: 220 } });
  const a2 = spring({ frame: Math.max(0, frame - 10), fps, config: { mass: 0.4, damping: 8, stiffness: 220 } });
  const a3 = spring({ frame: Math.max(0, frame - 16), fps, config: { mass: 0.4, damping: 8, stiffness: 220 } });
  const a4 = spring({ frame: Math.max(0, frame - 22), fps, config: { mass: 0.4, damping: 8, stiffness: 220 } });

  // 4 Letters dropping dramatically from top down (hiệu ứng rơi từ trên xuống)
  const drop4 = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 160 },
  });
  const drop3 = spring({
    frame: Math.max(0, frame - 7),
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 160 },
  });
  const drop2 = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 160 },
  });
  const drop1 = spring({
    frame: Math.max(0, frame - 17),
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 160 },
  });

  // AI Robot entrance on Left (ONLY after phone is gone)
  const aiEntrance = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // Suction of 4 designed envelopes from Right into AI
  const suction1 = interpolate(frame, [50, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const suction2 = interpolate(frame, [67, 79], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const suction3 = interpolate(frame, [84, 96], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const suction4 = interpolate(frame, [101, 113], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // AI Squash & Dip (nhún xuống theo từng thư nhận được)
  let aiOffsetY = 0;
  let aiScaleX = 1;
  let aiScaleY = 1;

  if (frame >= 62 && frame < 69) {
    const p = Math.sin((frame - 62) * (Math.PI / 7));
    aiOffsetY = p * 16;
    aiScaleY = 1 - p * 0.14;
    aiScaleX = 1 + p * 0.10;
  } else if (frame >= 79 && frame < 86) {
    const p = Math.sin((frame - 79) * (Math.PI / 7));
    aiOffsetY = p * 16;
    aiScaleY = 1 - p * 0.14;
    aiScaleX = 1 + p * 0.10;
  } else if (frame >= 96 && frame < 103) {
    const p = Math.sin((frame - 96) * (Math.PI / 7));
    aiOffsetY = p * 16;
    aiScaleY = 1 - p * 0.14;
    aiScaleX = 1 + p * 0.10;
  } else if (frame >= 113 && frame < 120) {
    const p = Math.sin((frame - 113) * (Math.PI / 7));
    aiOffsetY = p * 18;
    aiScaleY = 1 - p * 0.16;
    aiScaleX = 1 + p * 0.12;
  }

  const isBlinking =
    (frame >= 46 && frame <= 49) ||
    (frame >= 62 && frame <= 65) ||
    (frame >= 79 && frame <= 82) ||
    (frame >= 96 && frame <= 99) ||
    (frame >= 113 && frame <= 116);

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
      {/* Header & Title */}
      <div style={{ width: '100%', maxWidth: 780, marginBottom: 16 }}>
        <EyebrowHeader
          icon={<BrandLogo name="gmail" size={28} />}
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
              Tự động{' '}
              <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
                đọc thư mới
              </span>
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Visual Workspace: Centered horizontally with compact gap (AI & Mail close together) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 840,
          height: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          boxSizing: 'border-box',
        }}
      >
        {/* ======================================================== */}
        {/* LEFT COLUMN: Phone (f0 - f40) THEN AI Robot (f42+)       */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'relative',
            width: 250,
            height: 380,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 1. Phone with user avatars: ONLY renders before frame 41 */}
          {frame < 41 && (
            <div
              style={{
                position: 'relative',
                width: 185,
                height: 350,
                backgroundColor: '#1E1E1E',
                borderRadius: 40,
                padding: 12,
                boxShadow: '0 24px 48px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `translateX(${-phoneExitProgress * 180}px) scale(${phoneEntrance * (1 - phoneExitProgress * 0.15)})`,
                opacity: 1 - phoneExitProgress,
              }}
            >
              {/* Speaker notch */}
              <div
                style={{
                  width: 55,
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: '#3A3A3A',
                  marginBottom: 12,
                }}
              />

              {/* Phone Screen */}
              <div
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  borderRadius: 30,
                  padding: '18px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 18,
                    backgroundColor: 'rgba(235, 94, 40, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    marginBottom: 12,
                  }}
                >
                  🙋
                </div>
                <div
                  style={{
                    width: '75%',
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: COLORS.ink,
                    opacity: 0.8,
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    width: '92%',
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    border: '1px solid rgba(0,0,0,0.06)',
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    width: '92%',
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                />
              </div>

              {/* Avatar Orbit 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: 50,
                  left: -26,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  boxShadow: '0 8px 18px rgba(235,94,40,0.3)',
                  transform: `scale(${a1})`,
                }}
              >
                👤
              </div>

              {/* Avatar Orbit 2 */}
              <div
                style={{
                  position: 'absolute',
                  top: 65,
                  right: -26,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#2B2D42',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 21,
                  boxShadow: '0 8px 18px rgba(0,0,0,0.2)',
                  transform: `scale(${a2})`,
                }}
              >
                👩‍💻
              </div>

              {/* Avatar Orbit 3 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 85,
                  left: -24,
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  backgroundColor: '#8D99AE',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  transform: `scale(${a3})`,
                }}
              >
                👨‍💼
              </div>

              {/* Avatar Orbit 4 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 65,
                  right: -26,
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  boxShadow: '0 8px 18px rgba(235,94,40,0.3)',
                  transform: `scale(${a4})`,
                }}
              >
                🧑‍🔬
              </div>
            </div>
          )}

          {/* 2. AI Robot (size 210px for strong readability) */}
          {frame >= 41 && (
            <div
              style={{
                transform: `scale(${aiEntrance}) translateY(${aiOffsetY}px) scaleX(${aiScaleX}) scaleY(${aiScaleY})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10,
              }}
            >
              <RobotHero
                size={210}
                blink={isBlinking}
                eyeOffsetX={0}
              />
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
                <span style={{ fontSize: 16 }}>📥</span>
                <span style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: COLORS.ink }}>
                  {frame >= 113 ? '4' : frame >= 96 ? '3' : frame >= 79 ? '2' : frame >= 62 ? '1' : '0'} thư đã tiếp nhận
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Mailbox Slot & 4 Envelopes Dropping In     */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'relative',
            width: 320,
            height: 380,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Mailbox slot */}
          <div
            style={{
              width: 260,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#E5E1D8',
              border: '1px solid rgba(0,0,0,0.06)',
              marginBottom: 16,
            }}
          />

          {/* Mail stack dropping from TOP down - 4 Envelopes */}
          <div style={{ position: 'relative', width: 250, height: 280 }}>
            {/* Envelope 4 (Bottom-most, gold seal) */}
            <div
              style={{
                position: 'absolute',
                top: 102,
                left: 14,
                width: 230,
                height: 140,
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 12px 28px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
                transform: `translateY(${interpolate(drop4, [0, 1], [-400, 0])}px) rotate(5deg)`,
                opacity: suction4 > 0 ? 0 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.05s ease',
              }}
            >
              <svg width="230" height="140" style={{ position: 'absolute', top: 0, left: 0 }}>
                <path d="M 0 0 L 115 75 L 230 0" fill="none" stroke="#E5E1D8" strokeWidth="2.5" />
                <circle cx="115" cy="75" r="8" fill="#DDA15E" />
              </svg>
            </div>

            {/* Envelope 3 (Slate blue seal) */}
            <div
              style={{
                position: 'absolute',
                top: 68,
                left: 10,
                width: 230,
                height: 140,
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 14px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
                transform: `translateY(${interpolate(drop3, [0, 1], [-370, 0])}px) rotate(-3deg)`,
                opacity: suction3 > 0 ? 0 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.05s ease',
              }}
            >
              <svg width="230" height="140" style={{ position: 'absolute', top: 0, left: 0 }}>
                <path d="M 0 0 L 115 75 L 230 0" fill="none" stroke="#E5E1D8" strokeWidth="2.5" />
                <circle cx="115" cy="75" r="8" fill="#8D99AE" />
              </svg>
            </div>

            {/* Envelope 2 (Charcoal seal) */}
            <div
              style={{
                position: 'absolute',
                top: 34,
                left: 5,
                width: 230,
                height: 140,
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 36px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)',
                transform: `translateY(${interpolate(drop2, [0, 1], [-340, 0])}px) rotate(3deg)`,
                opacity: suction2 > 0 ? 0 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.05s ease',
              }}
            >
              <svg width="230" height="140" style={{ position: 'absolute', top: 0, left: 0 }}>
                <path d="M 0 0 L 115 75 L 230 0" fill="none" stroke="#E5E1D8" strokeWidth="2.5" />
                <circle cx="115" cy="75" r="8" fill="#2B2D42" />
              </svg>
            </div>

            {/* Envelope 1 (Topmost, Terracotta accent seal) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 230,
                height: 140,
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 42px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
                transform: `translateY(${interpolate(drop1, [0, 1], [-310, 0])}px) rotate(-1deg)`,
                opacity: suction1 > 0 ? 0 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.05s ease',
              }}
            >
              <svg width="230" height="140" style={{ position: 'absolute', top: 0, left: 0 }}>
                <path d="M 0 0 L 115 75 L 230 0" fill="none" stroke="#E5E1D8" strokeWidth="2.5" />
                <circle cx="115" cy="75" r="8" fill={COLORS.accent} />
              </svg>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUCTION ANIMATION: 4 Envelopes Sucked into AI            */}
        {/* ======================================================== */}

        {/* Suction 1 */}
        {suction1 > 0 && suction1 < 1 && (
          <div
            style={{
              position: 'absolute',
              right: interpolate(suction1, [0, 1], [150, 520]),
              top: interpolate(suction1, [0, 1], [140, 210]),
              transform: `scale(${interpolate(suction1, [0, 1], [1, 0.45])}) rotate(${interpolate(suction1, [0, 1], [0, -18])}deg)`,
              opacity: interpolate(suction1, [0, 0.85, 1], [1, 1, 0]),
              zIndex: 30,
              width: 88,
              height: 56,
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="88" height="56" style={{ position: 'absolute', top: 0, left: 0 }}>
              <path d="M 0 0 L 44 28 L 88 0" fill="none" stroke="#E5E1D8" strokeWidth="2" />
              <circle cx="44" cy="28" r="5" fill={COLORS.accent} />
            </svg>
          </div>
        )}

        {/* Suction 2 */}
        {suction2 > 0 && suction2 < 1 && (
          <div
            style={{
              position: 'absolute',
              right: interpolate(suction2, [0, 1], [150, 520]),
              top: interpolate(suction2, [0, 1], [160, 210]),
              transform: `scale(${interpolate(suction2, [0, 1], [1, 0.45])}) rotate(${interpolate(suction2, [0, 1], [8, -12])}deg)`,
              opacity: interpolate(suction2, [0, 0.85, 1], [1, 1, 0]),
              zIndex: 30,
              width: 88,
              height: 56,
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="88" height="56" style={{ position: 'absolute', top: 0, left: 0 }}>
              <path d="M 0 0 L 44 28 L 88 0" fill="none" stroke="#E5E1D8" strokeWidth="2" />
              <circle cx="44" cy="28" r="5" fill="#2B2D42" />
            </svg>
          </div>
        )}

        {/* Suction 3 */}
        {suction3 > 0 && suction3 < 1 && (
          <div
            style={{
              position: 'absolute',
              right: interpolate(suction3, [0, 1], [150, 520]),
              top: interpolate(suction3, [0, 1], [180, 210]),
              transform: `scale(${interpolate(suction3, [0, 1], [1, 0.45])}) rotate(${interpolate(suction3, [0, 1], [-6, 10])}deg)`,
              opacity: interpolate(suction3, [0, 0.85, 1], [1, 1, 0]),
              zIndex: 30,
              width: 88,
              height: 56,
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="88" height="56" style={{ position: 'absolute', top: 0, left: 0 }}>
              <path d="M 0 0 L 44 28 L 88 0" fill="none" stroke="#E5E1D8" strokeWidth="2" />
              <circle cx="44" cy="28" r="5" fill="#8D99AE" />
            </svg>
          </div>
        )}

        {/* Suction 4 */}
        {suction4 > 0 && suction4 < 1 && (
          <div
            style={{
              position: 'absolute',
              right: interpolate(suction4, [0, 1], [150, 520]),
              top: interpolate(suction4, [0, 1], [200, 210]),
              transform: `scale(${interpolate(suction4, [0, 1], [1, 0.45])}) rotate(${interpolate(suction4, [0, 1], [6, -10])}deg)`,
              opacity: interpolate(suction4, [0, 0.85, 1], [1, 1, 0]),
              zIndex: 30,
              width: 88,
              height: 56,
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="88" height="56" style={{ position: 'absolute', top: 0, left: 0 }}>
              <path d="M 0 0 L 44 28 L 88 0" fill="none" stroke="#E5E1D8" strokeWidth="2" />
              <circle cx="44" cy="28" r="5" fill="#DDA15E" />
            </svg>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
