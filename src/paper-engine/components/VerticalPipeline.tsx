import { FaIcon } from "../../shared/FaIcon";
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTargetPulse } from "../physics";

export interface PipelineStep {
  label: string;
  sublabel?: string;
  isActive?: boolean;
}

export interface VerticalPipelineProps {
  steps?: PipelineStep[];
  activeStepIndex?: number;
  autoProgress?: boolean;
  progressDuration?: number;
  delay?: number;
  stepStaggerDelay?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * VerticalPipeline: Lộ trình đường ray tiến trình dọc chuyển động dòng chảy liên tục.
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + Dòng chảy năng lượng cam Terracotta chạy dọc theo đường ray kích hoạt lần lượt các bước.
 *   + Nốt hiện tại phát sóng ping tỏa tròn liên tục.
 *   + Các nốt đã qua chuyển sang trạng thái đã hoàn thành (dấu tích ✓).
 */
export const VerticalPipeline: React.FC<VerticalPipelineProps> = ({
  steps = [
    { label: "Plan", sublabel: "Lập kế hoạch" },
    { label: "Build", sublabel: "Xây dựng tính năng" },
    { label: "Test", sublabel: "Kiểm thử tự động" },
    { label: "Ship", sublabel: "Phát hành sản phẩm" },
  ],
  activeStepIndex = 0,
  autoProgress = true,
  progressDuration = 70,
  delay = 3,
  stepStaggerDelay = 3,
  width = 320,
  height = 360,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 28,
    startScale: 0.94,
    enableIdleFloat: true,
  });

  const stepSpacing = (height - 60) / Math.max(1, steps.length - 1);

  // Tiến trình dòng chảy tự động chạy từ nốt 0 đến nốt cuối theo thời gian
  const dynamicIndex = autoProgress
    ? Math.min(
        steps.length - 1,
        Math.floor(interpolate(frame - delay - 6, [0, progressDuration], [0, steps.length], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }))
      )
    : activeStepIndex;

  const pulse = getTargetPulse(frame, delay + 8, 20);

  // Chiều cao dòng chảy cam trên đường ray
  const fluidHeight = interpolate(
    frame - delay - 6,
    [0, progressDuration],
    [0, (steps.length - 1) * stepSpacing],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Đường ray xám nền (Base Rail) */}
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 24,
          bottom: 24,
          width: 3,
          backgroundColor: "rgba(29, 28, 26, 0.12)",
          borderRadius: 2,
        }}
      />

      {/* Dòng chảy cam Terracotta chảy xuống (Active Fluid Rail) */}
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 24,
          height: fluidHeight,
          width: 3,
          backgroundColor: COLORS.terracotta,
          borderRadius: 2,
          boxShadow: "0 0 8px rgba(200, 82, 40, 0.4)",
        }}
      />

      {/* Các bước nốt */}
      {steps.map((step, idx) => {
        const isCurrentActive = idx === dynamicIndex;
        const isCompleted = idx < dynamicIndex;
        const nodeY = 24 + idx * stepSpacing;

        const nodeEntrance = getSmoothEntrance({
          frame,
          fps,
          delay: delay + idx * stepStaggerDelay,
          config: SPRING_PRESETS.pop,
          distanceY: 16,
          startScale: 0.88,
          enableIdleFloat: false,
        });

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: nodeY,
              left: 24,
              display: "flex",
              alignItems: "center",
              gap: 20,
              transform: `translateY(${nodeEntrance.translateY}px) scale(${nodeEntrance.scale})`,
              opacity: nodeEntrance.opacity,
            }}
          >
            {/* Vòng tròn nốt trên đường ray */}
            <div style={{ position: "relative", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Sóng ping mục tiêu tỏa tròn khi active */}
              {isCurrentActive && (
                <div
                  style={{
                    position: "absolute",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: `2px solid ${COLORS.terracotta}`,
                    transform: `scale(${pulse.scale})`,
                    opacity: pulse.opacity,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Vòng tròn chính */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: isCurrentActive || isCompleted ? COLORS.terracotta : COLORS.cardBg,
                  border: isCurrentActive || isCompleted
                    ? `2px solid ${COLORS.terracotta}`
                    : `2px solid rgba(29, 28, 26, 0.3)`,
                  boxShadow: isCurrentActive ? SHADOWS.sticker : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {isCompleted ? <FaIcon icon="check" size={10} color="#FFFFFF" /> : isCurrentActive ? (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#FFFFFF" }} />
                ) : null}
              </div>
            </div>

            {/* Thẻ Pill nhãn bước */}
            <div
              style={{
                backgroundColor: isCurrentActive ? COLORS.terracottaLight : isCompleted ? "#F5EFE9" : "#EAE6DE",
                border: isCurrentActive
                  ? `1.5px solid ${COLORS.terracotta}`
                  : "1px solid rgba(29, 28, 26, 0.08)",
                borderRadius: 14,
                padding: "8px 18px",
                display: "flex",
                alignItems: "center",
                boxShadow: isCurrentActive ? SHADOWS.subtle : "none",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.inter,
                  fontWeight: 700,
                  fontSize: 15,
                  color: isCurrentActive ? COLORS.terracotta : isCompleted ? COLORS.inkPrimary : COLORS.inkSecondary,
                }}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
