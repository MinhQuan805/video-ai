import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRING_PRESETS } from "../tokens";
import { getCounterNumber, getSmoothEntrance } from "../physics";

export interface BigMetricProps {
  value: number;
  suffix?: string;
  trendLabel?: string;
  trendDirection?: "down" | "up";
  color?: string;
  fontSize?: number;
  showBarUnderline?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * BigMetric: Con số thống kê kích thước lớn uy quyền (như 100% trong video 7, 50% trong video 9).
 * Tích hợp hiệu ứng nhảy số tự động và nhãn xu hướng phong cách tối giản.
 */
export const BigMetric: React.FC<BigMetricProps> = ({
  value,
  suffix = "%",
  trendLabel,
  trendDirection = "down",
  color = COLORS.terracotta,
  fontSize = 140,
  showBarUnderline = true,
  delay = 5,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 30,
    startScale: 0.9,
  });

  const animatedValue = getCounterNumber(value, frame, delay + 2, fps, SPRING_PRESETS.glide);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.frauncesItalic,
            fontStyle: "italic",
            fontSize,
            lineHeight: 0.92,
            fontWeight: 700,
            color,
            letterSpacing: "-2px",
          }}
        >
          {animatedValue}{suffix}
        </span>
      </div>

      {trendLabel && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 8,
            fontFamily: FONTS.inter,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.inkPrimary,
          }}
        >
          <span style={{ color: COLORS.terracotta }}>
            {trendDirection === "down" ? "↓" : "↑"}
          </span>
          <span>{trendLabel}</span>
        </div>
      )}

      {showBarUnderline && (
        <div
          style={{
            width: "100%",
            height: 12,
            backgroundColor: COLORS.inkPrimary,
            borderRadius: 6,
            marginTop: 18,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        />
      )}
    </div>
  );
};
