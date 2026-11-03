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

export const Scene08TeamSyncUpdates: React.FC = () => {
  const frame = useCurrentFrame();

  const pipelineEntrance = spring({
    frame: Math.max(0, frame - 4),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const memberEntrance = spring({
    frame: Math.max(0, frame - 25),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  const resultEntrance = spring({
    frame: Math.max(0, frame - 45),
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  // Animated progress bar running all the way through Stage 3
  const progressLine = interpolate(frame, [8, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isStage2Reached = progressLine >= 0.48;
  const isStage3Reached = progressLine >= 0.98;

  return (
    <PaperCanvasBackground isSplit={false}>
      <SceneHeader
        step="08 ĐỒNG BỘ"
        category="Quy trình liên tục cập nhật"
        mainText="Cập nhật chung,"
        accentText="nắm được ngay"
        delay={0}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        {/* Top: Horizontal Live Pipeline Stepper */}
        <div
          style={{
            width: 920,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: '28px 38px',
            border: `2px solid rgba(200, 82, 40, 0.25)`,
            transform: `translateY(${interpolate(pipelineEntrance, [0, 1], [40, 0])}px)`,
            opacity: pipelineEntrance,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.inter,
                fontSize: 18,
                fontWeight: 800,
                color: COLORS.inkSecondary,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Tiến Trình Cập Nhật Hồ Sơ Trực Tiếp
            </span>
            <span
              style={{
                fontFamily: FONTS.inter,
                fontSize: 14,
                fontWeight: 800,
                color: isStage3Reached ? '#15803D' : COLORS.terracotta,
                backgroundColor: isStage3Reached ? '#DCFCE7' : COLORS.terracottaLight,
                padding: '6px 16px',
                borderRadius: 18,
                transition: 'all 0.3s ease',
              }}
            >
              {isStage3Reached ? '✓ HOÀN TẤT ĐỒNG BỘ' : '● ĐANG CẬP NHẬT'}
            </span>
          </div>

          {/* 3 Horizontal Stages connected by animated line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              padding: '12px 0',
            }}
          >
            {/* Background track line */}
            <div
              style={{
                position: 'absolute',
                left: 48,
                right: 48,
                top: 34,
                height: 4,
                backgroundColor: '#E2E8F0',
                zIndex: 1,
              }}
            />
            {/* Active filled line chạy hết 100% đến stage 3 */}
            <div
              style={{
                position: 'absolute',
                left: 48,
                width: `calc((100% - 96px) * ${progressLine})`,
                top: 34,
                height: 4,
                backgroundColor: COLORS.terracotta,
                zIndex: 2,
              }}
            />

            {/* Stage 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 3 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: COLORS.terracotta,
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #FFF',
                  boxShadow: '0 2px 8px rgba(200, 82, 40, 0.25)',
                }}
              >
                <FaIcon icon="check" size={22} color="#FFF" />
              </div>
              <span style={{ fontFamily: FONTS.inter, fontSize: 18, fontWeight: 800, color: COLORS.inkPrimary }}>
                1. Báo Giá Xong
              </span>
            </div>

            {/* Stage 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 3 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: isStage3Reached
                    ? COLORS.terracotta
                    : isStage2Reached
                    ? COLORS.terracottaLight
                    : '#F1F5F9',
                  border: `3px solid ${isStage2Reached ? COLORS.terracotta : '#FFF'}`,
                  color: isStage3Reached ? '#FFF' : isStage2Reached ? COLORS.terracotta : COLORS.inkMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isStage2Reached ? '0 2px 8px rgba(200, 82, 40, 0.25)' : 'none',
                }}
              >
                <FaIcon
                  icon={isStage3Reached ? 'check' : 'pen-ruler'}
                  size={22}
                  color={isStage3Reached ? '#FFF' : isStage2Reached ? COLORS.terracotta : COLORS.inkMuted}
                />
              </div>
              <span
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: 18,
                  fontWeight: 800,
                  color: isStage2Reached ? (isStage3Reached ? COLORS.inkPrimary : COLORS.terracotta) : COLORS.inkMuted,
                }}
              >
                2. Đang Thiết Kế
              </span>
            </div>

            {/* Stage 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 3 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: isStage3Reached ? COLORS.terracotta : '#F1F5F9',
                  color: isStage3Reached ? '#FFF' : COLORS.inkMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `3px solid ${isStage3Reached ? COLORS.terracotta : '#FFF'}`,
                  boxShadow: isStage3Reached ? '0 2px 8px rgba(200, 82, 40, 0.25)' : 'none',
                }}
              >
                <FaIcon icon={isStage3Reached ? 'check' : 'box-archive'} size={22} color={isStage3Reached ? '#FFF' : COLORS.inkMuted} />
              </div>
              <span
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: 18,
                  fontWeight: 800,
                  color: isStage3Reached ? COLORS.terracotta : COLORS.inkMuted,
                }}
              >
                3. Bàn Giao Khách
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Dual Card: Onboarding Teammate vs Instant Result */}
        <div style={{ display: 'flex', gap: 24, width: 920 }}>
          {/* Left Card: Teammate Opens Dossier */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 26,
              padding: '28px 32px',
              border: `1.5px solid rgba(200, 82, 40, 0.25)`,
              transform: `translateX(${interpolate(memberEntrance, [0, 1], [-40, 0])}px)`,
              opacity: memberEntrance,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: COLORS.terracottaLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaIcon icon="user-plus" size={32} color={COLORS.terracotta} />
            </div>
            <div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 24, fontWeight: 800, color: COLORS.inkPrimary }}>
                Đồng Nghiệp Mới
              </div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 16, color: COLORS.inkSecondary, marginTop: 4 }}>
                Chỉ cần mở hồ sơ là thấy toàn bộ tiến trình
              </div>
            </div>
          </div>

          {/* Right Card: Instant Result */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FBF1ED',
              borderRadius: 26,
              padding: '28px 32px',
              border: `2px solid ${COLORS.terracotta}`,
              transform: `translateX(${interpolate(resultEntrance, [0, 1], [40, 0])}px)`,
              opacity: resultEntrance,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: COLORS.terracotta,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaIcon icon="bolt" size={32} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 24, fontWeight: 800, color: COLORS.terracottaDark }}>
                Theo Kịp Ngay
              </div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 16, color: COLORS.inkPrimary, marginTop: 4 }}>
                Không mất thời gian hỏi bạn hay chờ chỉ việc
              </div>
            </div>
          </div>
        </div>
      </div>
    </PaperCanvasBackground>
  );
};
