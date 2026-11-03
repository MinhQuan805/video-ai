import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface SegmentedBarProps {
  totalSegments?: number;
  activeSegments?: number;
  orientation?: "horizontal" | "vertical";
  label?: string;
  delay?: number;
  staggerOffset?: number;
  activeColor?: string;
  inactiveColor?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * SegmentedBar: Thanh vạch phân đoạn đo lường (như thanh token stack trong video 9 và progress bar video 5).
 * Tích hợp stagger spring nảy từng khối nối tiếp nhau.
 */
export const SegmentedBar: React.FC<SegmentedBarProps> = ({
  totalSegments = 8,
  activeSegments = 5,
  orientation = "vertical",
  label,
  delay = 5,
  staggerOffset = 2,
  activeColor = COLORS.terracotta,
  inactiveColor = "rgba(29, 28, 26, 0.10)",
  width = orientation === "vertical" ? 170 : 420,
  height = orientation === "vertical" ? 220 : 38,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = orientation === "vertical";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width,
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 15,
            fontWeight: 700,
            color: COLORS.inkSecondary,
            textAlign: isVertical ? "center" : "left",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </span>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column-reverse" : "row",
          gap: isVertical ? 6 : 6,
          width: "100%",
          height: isVertical ? height : "auto",
        }}
      >
        {Array.from({ length: totalSegments }).map((_, idx) => {
          const isActive = idx < activeSegments;
          const segDelay = delay + idx * staggerOffset;

          const entrance = getSmoothEntrance({
            frame,
            fps,
            delay: segDelay,
            config: SPRING_PRESETS.pop,
            distanceY: isVertical ? 10 : 0,
            startScale: 0.8,
          });

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: isVertical ? 18 : height,
                backgroundColor: isActive ? activeColor : inactiveColor,
                borderRadius: isVertical ? 6 : 8,
                border: isActive ? "none" : `1px dashed rgba(29, 28, 26, 0.18)`,
                transform: `scale(${entrance.scale})`,
                opacity: entrance.opacity,
                filter: entrance.filter,
                boxShadow: isActive ? "0 2px 8px rgba(200, 82, 40, 0.22)" : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
