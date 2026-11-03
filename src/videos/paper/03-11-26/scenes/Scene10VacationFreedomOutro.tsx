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

export const Scene10VacationFreedomOutro: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame: Math.max(0, frame - 4),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  return (
    <PaperCanvasBackground isSplit={true}>
      <SceneHeader
        step="10 THẢNH THƠI"
        category="Thảnh thơi nghỉ ngơi"
        mainText="Nghỉ thảnh thơi,"
        accentText="việc vẫn chạy"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
        }}
      >
        {/* Simplified Single Master Card */}
        <div
          style={{
            width: '100%',
            maxWidth: 920,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            border: `2.5px solid ${COLORS.terracotta}`,
            padding: '32px 40px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Pill: System status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                backgroundColor: COLORS.terracottaLight,
                color: COLORS.terracottaDark,
                fontFamily: FONTS.inter,
                fontWeight: 800,
                fontSize: 14,
                padding: '6px 16px',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FaIcon icon="gears" size={16} color={COLORS.terracotta} />
              <span>HỆ THỐNG VẬN HÀNH TỰ ĐỘNG</span>
            </div>

            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 14,
                fontWeight: 800,
                color: '#16A34A',
                backgroundColor: '#DCFCE7',
                padding: '6px 14px',
                borderRadius: 16,
              }}
            >
              ● HOẠT ĐỘNG 24/7
            </div>
          </div>

          {/* Main Headline */}
          <div>
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.inkPrimary,
                lineHeight: 1.35,
              }}
            >
              Bạn vắng một ngày, công việc vẫn chạy
            </div>
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 17,
                color: COLORS.inkSecondary,
                marginTop: 6,
                lineHeight: 1.4,
              }}
            >
              Không cần chờ bạn trả lời từng tin nhắn
            </div>
          </div>

          {/* Bottom Badges */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
            <div
              style={{
                backgroundColor: '#FBF1ED',
                border: `1.5px solid rgba(200, 82, 40, 0.3)`,
                borderRadius: 16,
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: FONTS.inter,
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.inkPrimary,
              }}
            >
              <FaIcon icon="folder-check" size={18} color={COLORS.terracotta} />
              <span>1 Hồ sơ duy nhất</span>
            </div>

            <div
              style={{
                backgroundColor: '#FBF1ED',
                border: `1.5px solid rgba(200, 82, 40, 0.3)`,
                borderRadius: 16,
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: FONTS.inter,
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.inkPrimary,
              }}
            >
              <FaIcon icon="users" size={18} color={COLORS.terracotta} />
              <span>Đội ngũ tự tra cứu</span>
            </div>
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
