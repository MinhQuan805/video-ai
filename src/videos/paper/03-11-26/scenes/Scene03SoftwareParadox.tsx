import React from 'react';
import {
  COLORS,
  FONTS,
  FaIcon,
  PaperCanvasBackground,
  SceneHeader,
  spring,
  SPRING_PRESETS,
} from './common';
import { Img, staticFile, useCurrentFrame } from 'remotion';

export const Scene03SoftwareParadox: React.FC = () => {
  const frame = useCurrentFrame();

  const centerEntrance = spring({
    frame: Math.max(0, frame - 2),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const ringEntrance = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const orbitAngle = (frame * 0.45) % 360;

  // Tools with real official icons from public/icon
  const tools = [
    { name: 'Notion', iconPath: 'icon/notion.png', bg: '#FFFFFF' },
    { name: 'Zalo', iconPath: 'icon/zalo.png', bg: '#FFFFFF' },
    { name: 'Sheets', iconPath: 'icon/Google-Sheets.png', bg: '#FFFFFF' },
    { name: 'Drive', iconPath: 'icon/drive.png', bg: '#FFFFFF' },
    { name: 'Gmail', iconPath: 'icon/Gmail.png', bg: '#FFFFFF' },
  ];

  // Circle orbit radius - to hơn, các card ứng dụng to nổi bật
  const radius = 245;
  const iconSize = 108;

  return (
    <PaperCanvasBackground isSplit={true}>
      <SceneHeader
        step="03 NGHỊCH LÝ"
        category="Thừa phần mềm - Thiếu rõ ràng"
        mainText="Đủ phần mềm,"
        accentText="vẫn hỏi bạn"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          height: 540,
        }}
      >
        {/* Đường tròn quỹ đạo - ĐẬM HƠN, RÕ NÉT */}
        <div
          style={{
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            border: `3.5px dashed rgba(200, 82, 40, 0.5)`,
            opacity: ringEntrance,
            boxSizing: 'border-box',
          }}
        />

        {/* Orbiting App Tools: TỪNG ICON XUẤT HIỆN MỘT, NẰM CHUẨN XÁC TRÊN ĐƯỜNG TRÒN */}
        {tools.map((t, idx) => {
          // Stagger từng icon xuất hiện cách nhau 6 frames
          const iconEntrance = spring({
            frame: Math.max(0, frame - (8 + idx * 7)),
            fps: 30,
            config: SPRING_PRESETS.pop,
          });

          // Góc chuẩn trên đường tròn hoàn hảo
          const angle = (idx * (360 / tools.length) + orbitAngle) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={t.name}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: iconSize,
                height: iconSize,
                // Dời tâm icon khớp chính xác tâm đường tròn
                marginLeft: -iconSize / 2,
                marginTop: -iconSize / 2,
                transform: `translate(${x}px, ${y}px) scale(${iconEntrance})`,
                opacity: iconEntrance,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 15,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 24,
                  backgroundColor: '#FFFFFF',
                  border: `2px solid rgba(29, 28, 26, 0.12)`,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 14,
                  boxSizing: 'border-box',
                }}
              >
                <Img
                  src={staticFile(t.iconPath)}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          );
        })}

        {/* Center Human Bottleneck Node - TO HƠN, NỔI BẬT */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            transform: `scale(${centerEntrance})`,
            opacity: centerEntrance,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Pulsing ring */}
          <div
            style={{
              position: 'absolute',
              width: 190,
              height: 190,
              borderRadius: '50%',
              backgroundColor: COLORS.terracottaLight,
              transform: `scale(${1 + Math.sin(frame * 0.15) * 0.08})`,
              zIndex: -1,
            }}
          />

          <div
            style={{
              width: 144,
              height: 144,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: `4px solid ${COLORS.terracotta}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <FaIcon icon="user-tie" size={52} color={COLORS.terracotta} />
            <span
              style={{
                fontFamily: FONTS.inter,
                fontWeight: 800,
                fontSize: 18,
                color: COLORS.terracottaDark,
              }}
            >
              BẠN
            </span>
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
