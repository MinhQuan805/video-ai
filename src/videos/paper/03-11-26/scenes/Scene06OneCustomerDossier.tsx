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

export const Scene06OneCustomerDossier: React.FC = () => {
  const frame = useCurrentFrame();

  const folderEntrance = spring({
    frame: Math.max(0, frame - 4),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  // Staggered docking of the 3 streams
  const dock1 = spring({
    frame: Math.max(0, frame - 14),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const dock2 = spring({
    frame: Math.max(0, frame - 28),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const dock3 = spring({
    frame: Math.max(0, frame - 42),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const stampProgress = spring({
    frame: Math.max(0, frame - 58),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  return (
    <PaperCanvasBackground isSplit={false}>
      <SceneHeader
        step="06 GIẢI PHÁP"
        category="1 Khách hàng • 1 Hồ sơ"
        mainText="1 Khách hàng,"
        accentText="1 hồ sơ"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Master Manila / Terracotta Binder */}
        <div
          style={{
            width: 920,
            backgroundColor: '#FFFFFF',
            borderRadius: 32,
            border: `2.5px solid ${COLORS.terracotta}`,
            padding: '38px 44px',
            boxSizing: 'border-box',
            transform: `translateY(${interpolate(folderEntrance, [0, 1], [60, 0])}px) scale(${interpolate(folderEntrance, [0, 1], [0.94, 1])})`,
            opacity: folderEntrance,
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            position: 'relative',
          }}
        >
          {/* Top Folder Tab Header */}
          <div
            style={{
              position: 'absolute',
              top: -30,
              left: 44,
              backgroundColor: COLORS.terracotta,
              color: '#FFFFFF',
              fontFamily: FONTS.inter,
              fontWeight: 800,
              fontSize: 16,
              padding: '8px 24px',
              borderRadius: '14px 14px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              letterSpacing: 0.5,
            }}
          >
            <FaIcon icon="folder" size={16} color="#FFF" />
            <span>HỒ SƠ KHÁCH HÀNG #01</span>
          </div>

          {/* Dossier Header Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1.5px solid ${COLORS.cardBorder}`,
              paddingBottom: 18,
              marginTop: 6,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: 34,
                  fontWeight: 800,
                  color: COLORS.inkPrimary,
                }}
              >
                Khách Hàng: Doanh Nghiệp A
              </div>
              <div
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: 16,
                  color: COLORS.inkSecondary,
                  marginTop: 6,
                }}
              >
                Gom trọn mọi thỏa thuận, hợp đồng và tiến độ vào một nơi
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FBF1ED',
                color: COLORS.terracotta,
                fontFamily: FONTS.inter,
                fontWeight: 800,
                fontSize: 15,
                padding: '8px 18px',
                borderRadius: 22,
                border: `1.5px solid rgba(200, 82, 40, 0.3)`,
              }}
            >
              1 NƠI DUY NHẤT
            </div>
          </div>

          {/* 3 Docked Streams (Zalo, Gmail, Sheets) with Official Logos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Item 1: Zalo Messages */}
            <div
              style={{
                backgroundColor: '#FBF1ED',
                border: `1.5px solid rgba(200, 82, 40, 0.35)`,
                borderRadius: 18,
                padding: '16px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transform: `translateX(${interpolate(dock1, [0, 1], [-40, 0])}px)`,
                opacity: dock1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden' }}>
                  <Img src={staticFile('icon/zalo.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.inter, fontSize: 20, fontWeight: 800, color: COLORS.inkPrimary }}>
                    Thỏa Thuận Zalo
                  </div>
                  <div style={{ fontFamily: FONTS.inter, fontSize: 15, color: COLORS.inkSecondary, marginTop: 2 }}>
                    Khách chốt gói 20 triệu kèm thời hạn
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 800, color: COLORS.terracotta }}>
                ✓ ĐÃ LƯU
              </div>
            </div>

            {/* Item 2: Gmail Attachment */}
            <div
              style={{
                backgroundColor: '#FBF1ED',
                border: `1.5px solid rgba(200, 82, 40, 0.35)`,
                borderRadius: 18,
                padding: '16px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transform: `translateX(${interpolate(dock2, [0, 1], [40, 0])}px)`,
                opacity: dock2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden' }}>
                  <Img src={staticFile('icon/Gmail.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.inter, fontSize: 20, fontWeight: 800, color: COLORS.inkPrimary }}>
                    Báo Giá & Hợp Đồng Gmail
                  </div>
                  <div style={{ fontFamily: FONTS.inter, fontSize: 15, color: COLORS.inkSecondary, marginTop: 2 }}>
                    Bao_Gia_Chinh_Thuc.pdf
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 800, color: COLORS.terracotta }}>
                ✓ ĐÃ LƯU
              </div>
            </div>

            {/* Item 3: Sheets Progress */}
            <div
              style={{
                backgroundColor: '#FBF1ED',
                border: `1.5px solid rgba(200, 82, 40, 0.35)`,
                borderRadius: 18,
                padding: '16px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transform: `translateX(${interpolate(dock3, [0, 1], [-40, 0])}px)`,
                opacity: dock3,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden' }}>
                  <Img src={staticFile('icon/Google-Sheets.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.inter, fontSize: 20, fontWeight: 800, color: COLORS.inkPrimary }}>
                    Tiến Độ Triển Khai
                  </div>
                  <div style={{ fontFamily: FONTS.inter, fontSize: 15, color: COLORS.inkSecondary, marginTop: 2 }}>
                    Cập nhật thời gian thực cho cả đội ngũ
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 800, color: COLORS.terracotta }}>
                ✓ ĐỒNG BỘ
              </div>
            </div>
          </div>

          {/* Rubber Stamp on bottom right */}
          <div
            style={{
              position: 'absolute',
              right: 32,
              bottom: -20,
              border: `3px solid ${COLORS.terracotta}`,
              borderRadius: 16,
              backgroundColor: '#FFFFFF',
              color: COLORS.terracotta,
              fontFamily: FONTS.inter,
              fontWeight: 900,
              fontSize: 20,
              padding: '8px 22px',
              transform: `scale(${interpolate(stampProgress, [0, 1], [2, 1])}) rotate(-6deg)`,
              opacity: interpolate(stampProgress, [0, 0.4, 1], [0, 1, 1]),
              zIndex: 30,
            }}
          >
            ✓ GOM XONG 1 HỒ SƠ
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
