import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface PromptPillCardProps {
  step: number | string;
  tag?: string;
  promptText: string;
  width?: number;
  height?: number;
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * PromptPillCard: Thẻ prompt dạng viên thuốc bo tròn (như video mẫu 3).
 * Tích hợp huy hiệu số tròn màu cam đất phát sáng và typography tương phản cao.
 */
export const PromptPillCard: React.FC<PromptPillCardProps> = ({
  step,
  tag = `PROMPT ${step}`,
  promptText,
  width = 500,
  height = 84,
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
    distanceY: 28,
    startScale: 0.94,
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.cardBg,
        borderRadius: 24,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 18,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Huy hiệu tròn số thứ tự màu cam đất */}
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: COLORS.terracotta,
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.frauncesItalic,
          fontStyle: "italic",
          fontSize: 26,
          fontWeight: 700,
          boxShadow: SHADOWS.glowAccent,
          flexShrink: 0,
        }}
      >
        {step}
      </div>

      {/* Nội dung text của prompt */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
      >
        {tag && (
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.terracotta,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        )}

        <span
          style={{
            fontFamily: FONTS.inter,
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.inkPrimary,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {promptText}
        </span>
      </div>
    </div>
  );
};
