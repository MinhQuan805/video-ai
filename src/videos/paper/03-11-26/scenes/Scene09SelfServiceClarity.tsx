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
import { useCurrentFrame } from 'remotion';

export const Scene09SelfServiceClarity: React.FC = () => {
  const frame = useCurrentFrame();

  const cardEntrance = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const answerEntrance = spring({
    frame: Math.max(0, frame - 16),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const stampProgress = spring({
    frame: Math.max(0, frame - 34),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const stampRecoil =
    stampProgress > 0.8 && stampProgress < 1.0
      ? Math.sin((stampProgress - 0.8) * 20) * 6
      : 0;

  // Blinking cursor simulation
  const showCursor = Math.floor(frame / 12) % 2 === 0;

  return (
    <PaperCanvasBackground isSplit={true}>
      <SceneHeader
        step="09 MINH BẠCH"
        category="Tự chủ thông tin"
        mainText="Tự mở xem,"
        accentText="rõ ràng ngay"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          maxWidth: 920,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Search Command Bar */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: '20px 30px',
            border: `2px solid rgba(200, 82, 40, 0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: `translateY(${interpolate(cardEntrance, [0, 1], [30, 0])}px)`,
            opacity: cardEntrance,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: COLORS.terracottaLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaIcon icon="magnifying-glass" size={24} color={COLORS.terracotta} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: 28,
                  fontWeight: 800,
                  color: COLORS.inkPrimary,
                }}
              >
                "Khách A chốt tới đâu rồi?"
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: 28,
                  backgroundColor: COLORS.terracotta,
                  marginLeft: 8,
                  opacity: showCursor ? 1 : 0,
                }}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: COLORS.terracottaLight,
              color: COLORS.terracottaDark,
              fontFamily: FONTS.inter,
              fontWeight: 800,
              fontSize: 15,
              padding: '8px 18px',
              borderRadius: 16,
            }}
          >
            TỰ TRA CỨU
          </div>
        </div>

        {/* Instant Answer & Verified Dossier Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: '28px 36px',
            border: `2px solid ${COLORS.terracotta}`,
            transform: `translateY(${interpolate(answerEntrance, [0, 1], [30, 0]) + stampRecoil}px)`,
            opacity: answerEntrance,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* Card Top Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: COLORS.terracotta,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: 17,
                  fontWeight: 800,
                  color: COLORS.inkSecondary,
                  letterSpacing: 0.5,
                }}
              >
                HỒ SƠ KHÁCH HÀNG A • TRẠNG THÁI HIỆN TẠI
              </span>
            </div>

            <span
              style={{
                fontFamily: FONTS.inter,
                fontSize: 15,
                fontWeight: 800,
                color: COLORS.terracotta,
                backgroundColor: COLORS.terracottaLight,
                padding: '6px 16px',
                borderRadius: 16,
              }}
            >
              TIẾN ĐỘ: 80%
            </span>
          </div>

          {/* Big Status Message */}
          <div
            style={{
              backgroundColor: '#FBF1ED',
              borderRadius: 18,
              padding: '20px 26px',
              border: `1.5px solid rgba(200, 82, 40, 0.25)`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 26,
                fontWeight: 800,
                color: COLORS.inkPrimary,
                lineHeight: 1.35,
              }}
            >
              Đã ký hợp đồng 25 triệu • Đang triển khai thiết kế mẫu số 3
            </div>
          </div>

          {/* Rubber Stamp */}
          <div
            style={{
              position: 'absolute',
              right: 32,
              bottom: 22,
              border: `3.5px solid ${COLORS.terracotta}`,
              borderRadius: 16,
              padding: '10px 24px',
              color: COLORS.terracotta,
              fontFamily: FONTS.inter,
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: 1,
              transform: `scale(${interpolate(stampProgress, [0, 1], [2.2, 1])}) rotate(-8deg)`,
              opacity: interpolate(stampProgress, [0, 0.5, 1], [0, 1, 1]),
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              zIndex: 30,
            }}
          >
            ✓ KHÔNG CẦN GỌI HỎI
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
