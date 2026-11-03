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

export const Scene04FragmentedData: React.FC = () => {
  const frame = useCurrentFrame();

  const shard1 = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const shard2 = spring({
    frame: Math.max(0, frame - 18),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const shard3 = spring({
    frame: Math.max(0, frame - 32),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const breakPulse = Math.sin(frame * 0.15) * 4;

  return (
    <PaperCanvasBackground isSplit={false}>
      <SceneHeader
        step="04 PHÂN MẢNH"
        category="Dữ liệu bị chia cắt"
        mainText="Dữ liệu"
        accentText="bị phân mảnh"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          maxWidth: 920,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Shard 1: Zalo with Official Logo */}
        <div
          style={{
            alignSelf: 'flex-start',
            width: 760,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: '22px 28px',
            border: `2px solid rgba(200, 82, 40, 0.28)`,
            transform: `translateX(${interpolate(shard1, [0, 1], [-80, 0])}px) translateY(${breakPulse}px)`,
            opacity: shard1,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('icon/zalo.png')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span
              style={{
                fontFamily: FONTS.inter,
                fontWeight: 800,
                fontSize: 17,
                color: COLORS.terracotta,
              }}
            >
              ZALO CHAT
            </span>
          </div>
          <div
            style={{
              fontFamily: FONTS.inter,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.inkPrimary,
              lineHeight: 1.4,
              backgroundColor: '#FBF1ED',
              padding: '14px 20px',
              borderRadius: 16,
            }}
          >
            "Khách chốt gói 20 triệu rồi anh ơi!"
          </div>
        </div>

        {/* Broken link badge */}
        <div
          style={{
            alignSelf: 'center',
            backgroundColor: '#FBF1ED',
            border: `2px dashed ${COLORS.terracotta}`,
            borderRadius: 30,
            padding: '10px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: COLORS.terracotta,
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 16,
            transform: `scale(${interpolate(shard2, [0, 1], [0.8, 1])})`,
          }}
        >
          <FaIcon icon="link-slash" size={18} color={COLORS.terracotta} />
          <span>KHÔNG LIÊN THÔNG DỮ LIỆU</span>
        </div>

        {/* Shard 2: Gmail with Official Logo */}
        <div
          style={{
            alignSelf: 'flex-end',
            width: 760,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: '22px 28px',
            border: `2px solid rgba(200, 82, 40, 0.28)`,
            transform: `translateX(${interpolate(shard2, [0, 1], [80, 0])}px) translateY(${-breakPulse}px)`,
            opacity: shard2,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('icon/Gmail.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span
              style={{
                fontFamily: FONTS.inter,
                fontWeight: 800,
                fontSize: 17,
                color: COLORS.terracotta,
              }}
            >
              GMAIL
            </span>
          </div>
          <div
            style={{
              fontFamily: FONTS.inter,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.inkPrimary,
              backgroundColor: '#FBF1ED',
              padding: '14px 20px',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <FaIcon icon="file-pdf" size={24} color={COLORS.terracotta} />
            <span>Báo giá kèm điều khoản</span>
          </div>
        </div>

        {/* Shard 3: Excel with Official Logo */}
        <div
          style={{
            alignSelf: 'center',
            width: 820,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: '22px 28px',
            border: `2px solid rgba(200, 82, 40, 0.28)`,
            transform: `translateY(${interpolate(shard3, [0, 1], [40, 0])}px)`,
            opacity: shard3,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('icon/Excel.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span
              style={{
                fontFamily: FONTS.inter,
                fontWeight: 800,
                fontSize: 17,
                color: COLORS.terracotta,
              }}
            >
              EXCEL NỘI BỘ
            </span>
          </div>
          <div
            style={{
              fontFamily: FONTS.inter,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.inkPrimary,
              backgroundColor: '#FBF1ED',
              padding: '14px 20px',
              borderRadius: 16,
            }}
          >
            "Đang chờ khách duyệt mẫu số 3..."
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
