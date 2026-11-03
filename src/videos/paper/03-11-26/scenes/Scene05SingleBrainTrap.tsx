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

export const Scene05SingleBrainTrap: React.FC = () => {
  const frame = useCurrentFrame();

  const leftCard = spring({
    frame: Math.max(0, frame - 4),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const rightCard = spring({
    frame: Math.max(0, frame - 16),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  return (
    <PaperCanvasBackground isSplit={true}>
      <SceneHeader
        step="05 BẪY NHỚ HẾT"
        category="Rủi ro phụ thuộc cá nhân"
        mainText="Bạn nhớ hết,"
        accentText="người khác bí"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          maxWidth: 920,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Left Side: You know it all */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 26,
            padding: '28px 36px',
            border: `2.5px solid ${COLORS.terracotta}`,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            transform: `translateX(${interpolate(leftCard, [0, 1], [-40, 0])}px)`,
            opacity: leftCard,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: COLORS.terracottaLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaIcon icon="brain" size={36} color={COLORS.terracotta} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.inkPrimary,
              }}
            >
              "Tất cả đều nằm trong đầu mình!"
            </div>
          </div>
        </div>

        {/* Right Side: Colleague opens machine */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 26,
            padding: '28px 36px',
            border: `2.5px solid rgba(29, 28, 26, 0.15)`,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            transform: `translateX(${interpolate(rightCard, [0, 1], [40, 0])}px)`,
            opacity: rightCard,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: '#F3EFE6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaIcon icon="user-xmark" size={36} color={COLORS.inkSecondary} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.inkPrimary,
              }}
            >
              Không biết tìm từ đâu, đành nhắn hỏi!
            </div>
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
