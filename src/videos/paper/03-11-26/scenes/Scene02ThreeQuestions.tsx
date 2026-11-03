import React from 'react';
import {
  COLORS,
  FONTS,
  FaIcon,
  interpolate,
  PaperCanvasBackground,
  SceneHeader,
  spring,
} from './common';
import { useCurrentFrame } from 'remotion';

export const Scene02ThreeQuestions: React.FC = () => {
  const frame = useCurrentFrame();

  // Bouncy drop springs for each card with juicy landing overshoot
  const card1 = spring({
    frame: Math.max(0, frame - 3),
    fps: 30,
    config: { damping: 12, mass: 0.9, stiffness: 130 },
  });

  const card2 = spring({
    frame: Math.max(0, frame - 18),
    fps: 30,
    config: { damping: 12, mass: 0.9, stiffness: 130 },
  });

  const card3 = spring({
    frame: Math.max(0, frame - 42),
    fps: 30,
    config: { damping: 12, mass: 0.9, stiffness: 130 },
  });

  // Rơi từ trên cao xuống vị trí
  const dropY1 = interpolate(card1, [0, 1], [-700, 0]);
  const dropY2 = interpolate(card2, [0, 1], [-750, 0]);
  const dropY3 = interpolate(card3, [0, 1], [-800, 0]);

  // Physical impact recoil khi thẻ trên rơi đè xuống thẻ dưới
  const impactOnCard1 = spring({
    frame: Math.max(0, frame - 20),
    fps: 30,
    config: { damping: 10, mass: 0.5, stiffness: 220 },
  });
  const recoil1 = interpolate(impactOnCard1, [0, 0.35, 1], [0, 8, 0]);

  const impactOnCard2 = spring({
    frame: Math.max(0, frame - 44),
    fps: 30,
    config: { damping: 10, mass: 0.5, stiffness: 220 },
  });
  const recoil2 = interpolate(impactOnCard2, [0, 0.35, 1], [0, 8, 0]);

  // Dynamic swing tilt trong lúc rơi và khóa vào góc nghiêng chốt: -2°, +1.5°, -1°
  const rot1 = interpolate(card1, [0, 0.65, 1], [-12, 1, -2]);
  const rot2 = interpolate(card2, [0, 0.65, 1], [10, -1, 1.5]);
  const rot3 = interpolate(card3, [0, 0.65, 1], [-10, 2, -1]);

  const op1 = interpolate(card1, [0, 0.15, 1], [0, 1, 1]);
  const op2 = interpolate(card2, [0, 0.15, 1], [0, 1, 1]);
  const op3 = interpolate(card3, [0, 0.15, 1], [0, 1, 1]);

  return (
    <PaperCanvasBackground isSplit={false}>
      <SceneHeader
        step="02 DỒN DẬP"
        category="3 Nút thắt thông tin"
        mainText="3 Câu hỏi"
        accentText="dồn dập kéo tới"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 940,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Card 1: -2° nghiêng - Rơi trước -> Nằm dưới cùng (zIndex: 1) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            padding: '28px 36px',
            border: `2px solid rgba(29, 28, 26, 0.12)`,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            transform: `translateY(${dropY1 + recoil1}px) rotate(${rot1}deg) scale(${interpolate(card1, [0, 1], [0.88, 1])})`,
            opacity: op1,
            zIndex: 1,
            boxSizing: 'border-box',
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              backgroundColor: COLORS.terracottaLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FaIcon icon="folder-open" size={32} color={COLORS.terracotta} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.inter, fontSize: 13, fontWeight: 800, color: COLORS.terracotta, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              TIN NHẮN NỘI BỘ • VỪA XONG
            </div>
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 36,
                color: COLORS.inkPrimary,
                fontWeight: 800,
                marginTop: 2,
              }}
            >
              "File ở đâu anh?"
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1.5px solid #FCA5A5',
              padding: '8px 18px',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: FONTS.inter,
              fontWeight: 800,
              fontSize: 14,
              color: '#DC2626',
              flexShrink: 0,
            }}
          >
            <FaIcon icon="clock" size={14} color="#DC2626" />
            <span>CHỜ TÌM</span>
          </div>
        </div>

        {/* Card 2: +1.5° nghiêng - Rơi thứ hai -> Nằm đè lên Card 1 (zIndex: 2) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            padding: '28px 36px',
            border: `2.5px solid ${COLORS.terracottaLight}`,
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(29, 28, 26, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginTop: -26,
            transform: `translateY(${dropY2 + recoil2}px) rotate(${rot2}deg) scale(${interpolate(card2, [0, 1], [0.88, 1])})`,
            opacity: op2,
            zIndex: 2,
            boxSizing: 'border-box',
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              backgroundColor: COLORS.terracottaLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FaIcon icon="handshake" size={32} color={COLORS.terracotta} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.inter, fontSize: 13, fontWeight: 800, color: COLORS.terracotta, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              ZALO KHÁCH HÀNG • 1 PHÚT TRƯỚC
            </div>
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 36,
                color: COLORS.inkPrimary,
                fontWeight: 800,
                marginTop: 2,
              }}
            >
              "Khách chốt chưa chị?"
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1.5px solid #FCA5A5',
              padding: '8px 18px',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: FONTS.inter,
              fontWeight: 800,
              fontSize: 14,
              color: '#DC2626',
              flexShrink: 0,
            }}
          >
            <FaIcon icon="bell" size={14} color="#DC2626" />
            <span>CHƯA LƯU</span>
          </div>
        </div>

        {/* Card 3: -1° nghiêng - Rơi cuối cùng -> Nằm đè lên trên cùng (zIndex: 3) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            padding: '28px 36px',
            border: `2px solid rgba(29, 28, 26, 0.12)`,
            boxShadow: '0 24px 56px rgba(0, 0, 0, 0.14), 0 6px 16px rgba(29, 28, 26, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginTop: -26,
            transform: `translateY(${dropY3}px) rotate(${rot3}deg) scale(${interpolate(card3, [0, 1], [0.88, 1])})`,
            opacity: op3,
            zIndex: 3,
            boxSizing: 'border-box',
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              backgroundColor: COLORS.terracottaLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FaIcon icon="user-gear" size={32} color={COLORS.terracotta} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.inter, fontSize: 13, fontWeight: 800, color: COLORS.terracotta, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              ĐỘI DỰ ÁN • 2 PHÚT TRƯỚC
            </div>
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 36,
                color: COLORS.inkPrimary,
                fontWeight: 800,
                marginTop: 2,
              }}
            >
              "Việc này ai đang làm?"
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1.5px solid #FCA5A5',
              padding: '8px 18px',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: FONTS.inter,
              fontWeight: 800,
              fontSize: 14,
              color: '#DC2626',
              flexShrink: 0,
            }}
          >
            <FaIcon icon="triangle-exclamation" size={14} color="#DC2626" />
            <span>THIẾU ĐẦU MỐI</span>
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
