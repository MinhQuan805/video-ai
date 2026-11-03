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

export const Scene07ThreeCoreFields: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame: Math.max(0, frame - 2),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const card1 = spring({
    frame: Math.max(0, frame - 6),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const card2 = spring({
    frame: Math.max(0, frame - 18),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const card3 = spring({
    frame: Math.max(0, frame - 30),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  // Active highlighted card tracks the 3 clauses of speech:
  // "hai bên đã thống nhất gì (f0-32), ai phụ trách (f32-62), tiếp theo cần làm gì (f62-100)"
  const activeIdx = frame < 32 ? 0 : frame < 62 ? 1 : 2;

  const fields = [
    {
      num: '01',
      title: 'Hai bên đã thống nhất gì?',
      tag: 'Hợp đồng, phạm vi & giá chốt',
      icon: 'handshake',
      badge: '✓ ĐÃ LƯU',
      springVal: card1,
    },
    {
      num: '02',
      title: 'Ai đang phụ trách việc này?',
      tag: 'Phân công đúng người, rõ đầu mối',
      icon: 'user-check',
      badge: '✓ RÕ ĐẦU MỐI',
      springVal: card2,
    },
    {
      num: '03',
      title: 'Tiếp theo cần làm gì?',
      tag: 'Bước kế tiếp & hạn chót cụ thể',
      icon: 'arrow-right',
      badge: '✓ HẠN CHÓT RÕ',
      springVal: card3,
    },
  ];

  return (
    <PaperCanvasBackground isSplit={true}>
      <SceneHeader
        step="07 CỐT LÕI"
        category="3 Thông tin then chốt"
        mainText="3 Thông tin"
        accentText="then chốt"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          maxWidth: 920,
          margin: '0 auto',
          width: '100%',
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
        }}
      >
        {fields.map((f, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div
              key={f.num}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                padding: '24px 32px',
                border: isActive
                  ? `2.5px solid ${COLORS.terracotta}`
                  : `1.5px solid rgba(200, 82, 40, 0.2)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                transform: `translateX(${interpolate(f.springVal, [0, 1], [-30, 0])}px) scale(${isActive ? 1.02 : 1})`,
                opacity: f.springVal,
                transition: 'border 0.2s ease, transform 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Number Circle Badge */}
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 18,
                    backgroundColor: isActive ? COLORS.terracotta : COLORS.terracottaLight,
                    color: isActive ? '#FFFFFF' : COLORS.terracotta,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  <FaIcon icon={f.icon} size={26} color={isActive ? '#FFFFFF' : COLORS.terracotta} />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: 28,
                      fontWeight: 800,
                      color: COLORS.inkPrimary,
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.inter,
                      fontSize: 16,
                      color: COLORS.inkSecondary,
                      marginTop: 4,
                    }}
                  >
                    {f.tag}
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div
                style={{
                  backgroundColor: isActive ? COLORS.terracottaLight : '#F8FAFC',
                  color: isActive ? COLORS.terracottaDark : COLORS.inkSecondary,
                  fontFamily: FONTS.inter,
                  fontWeight: 800,
                  fontSize: 15,
                  padding: '8px 18px',
                  borderRadius: 20,
                  border: `1px solid ${isActive ? 'rgba(200, 82, 40, 0.3)' : COLORS.cardBorder}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {f.badge}
              </div>
            </div>
          );
        })}
      </div>
    </PaperCanvasBackground>
  );
};
