import React from 'react';
import {
  COLORS,
  FONTS,
  FaIcon,
  interpolate,
  PaperCanvasBackground,
  SceneHeader,
  spring,
  SPRING_PRESETS,
} from './common';
import { Img, staticFile, useCurrentFrame } from 'remotion';

export const Scene01PhoneOverload: React.FC = () => {
  const frame = useCurrentFrame();

  // Snappy dynamic phone entrance with slight overshoot
  const phoneEntrance = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    config: { damping: 14, mass: 0.85, stiffness: 140 },
  });

  // Giựt giựt nhẹ nhàng, tinh tế
  const isVibrating = frame >= 12 && frame <= 85;
  const vibrateX = isVibrating ? Math.sin(frame * 2.4) * 1.8 : 0;
  const vibrateY = isVibrating ? Math.cos(frame * 1.8) * 1.0 : 0;
  const vibrateRotate = isVibrating ? Math.sin(frame * 2.4) * 0.6 : 0;

  // Staggered Notification Springs
  const notif1 = spring({
    frame: Math.max(0, frame - 14),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const notif2 = spring({
    frame: Math.max(0, frame - 28),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  return (
    <PaperCanvasBackground isSplit={true}>
      <SceneHeader
        step="01 BÁO ĐỘNG"
        category="Tin nhắn dồn dập"
        mainText="Nghỉ 1 ngày,"
        accentText="chuông nổ liên tục"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Multi-ring Sonic Shockwaves: Gợn sóng âm thanh tỏa đều dồn dập */}
        {isVibrating && (
          <>
            {[0, 7, 14].map((offset, idx) => {
              const phase = ((frame + offset) % 21) / 21;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    width: 520,
                    height: 520,
                    borderRadius: 56,
                    border: '1.5px dashed rgba(200, 82, 40, 0.35)',
                    transform: `scale(${1 + phase * 0.22})`,
                    opacity: (1 - phase) * 0.45,
                    pointerEvents: 'none',
                  }}
                />
              );
            })}
          </>
        )}

        {/* Prominent iPhone Mockup với chuyển động rung chấn chân thực */}
        <div
          style={{
            width: 530,
            height: 510,
            backgroundColor: '#18181B',
            borderRadius: 44,
            padding: 14,
            boxSizing: 'border-box',
            border: '2.5px solid rgba(29, 28, 26, 0.25)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16)',
            transform: `translateY(${interpolate(phoneEntrance, [0, 1], [50, 0]) + vibrateY}px) translateX(${vibrateX}px) rotate(${vibrateRotate}deg) scale(${interpolate(phoneEntrance, [0, 1], [0.88, 1])})`,
            opacity: phoneEntrance,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Screen Content */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FAF9F5',
              borderRadius: 32,
              overflow: 'hidden',
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              gap: 14,
            }}
          >
            {/* Dynamic Island với Live Activity equalizer nhấp nháy */}
            <div
              style={{
                width: 170,
                height: 32,
                backgroundColor: '#000000',
                borderRadius: 20,
                margin: '0 auto 8px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 14px',
                boxSizing: 'border-box',
              }}
            >
              {/* Equalizer bars */}
              <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {[0, 1, 2].map((i) => {
                  const barH = isVibrating ? 6 + Math.abs(Math.sin(frame * 0.45 + i * 1.5)) * 10 : 6;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 3.5,
                        height: barH,
                        backgroundColor: COLORS.terracottaBright,
                        borderRadius: 2,
                      }}
                    />
                  );
                })}
              </div>
              <span
                style={{
                  color: '#FFF',
                  fontSize: 12,
                  fontFamily: FONTS.inter,
                  fontWeight: 800,
                  letterSpacing: 0.4,
                }}
              >
                {isVibrating ? 'CUỘC GỌI & TIN' : '09:41'}
              </span>
              <FaIcon icon="phone-volume" size={13} color={COLORS.terracottaBright} />
            </div>

            {/* Notification 1 with Zalo Official Logo */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: '14px 18px',
                border: `1.5px solid ${COLORS.cardBorder}`,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                transform: `scale(${notif1})`,
                opacity: interpolate(notif1, [0, 0.7, 1], [0, 1, 1]),
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Img
                  src={staticFile('icon/zalo.png')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: FONTS.inter,
                    fontWeight: 800,
                    fontSize: 16,
                    color: COLORS.inkPrimary,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Khách Hàng (Zalo)</span>
                  <span style={{ fontSize: 12, color: COLORS.inkMuted, fontWeight: 500 }}>Vừa xong</span>
                </div>
                <div
                  style={{
                    fontFamily: FONTS.inter,
                    fontSize: 14.5,
                    color: COLORS.terracottaDark,
                    fontWeight: 600,
                    marginTop: 3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  "File ở đâu rồi anh?"
                </div>
              </div>
            </div>

            {/* Notification 2 with Gmail Official Logo */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: '14px 18px',
                border: `1.5px solid ${COLORS.cardBorder}`,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                transform: `scale(${notif2})`,
                opacity: interpolate(notif2, [0, 0.7, 1], [0, 1, 1]),
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Img
                  src={staticFile('icon/Gmail.png')}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: FONTS.inter,
                    fontWeight: 800,
                    fontSize: 16,
                    color: COLORS.inkPrimary,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Đội Dự Án (Mail)</span>
                  <span style={{ fontSize: 12, color: COLORS.inkMuted, fontWeight: 500 }}>1p trước</span>
                </div>
                <div
                  style={{
                    fontFamily: FONTS.inter,
                    fontSize: 14.5,
                    color: COLORS.terracottaDark,
                    fontWeight: 600,
                    marginTop: 3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  "Khách chốt chưa chị?"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
