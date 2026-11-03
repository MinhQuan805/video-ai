import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface ManilaFolderProps {
  labelPrefix?: string;
  labelMain?: string;
  delay?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * ManilaFolder: Tập hồ sơ giấy Kraft màu vàng nâu cổ điển (như trong video mẫu 3).
 * - Các trang tài liệu trắng xếp tầng bên trong.
 * - Thẻ nhãn dán sticker màu trắng "FILE: YOU" kèm gạch chân đỏ nảy ra ở mặt trước.
 */
export const ManilaFolder: React.FC<ManilaFolderProps> = ({
  labelPrefix = "FILE:",
  labelMain = "YOU",
  delay = 3,
  width = 280,
  height = 200,
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
    startScale: 0.92,
  });

  const labelEntrance = getSmoothEntrance({
    frame,
    fps,
    delay: delay + 6,
    config: SPRING_PRESETS.pop,
    distanceY: 14,
    startScale: 0.85,
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Nắp sau của bìa hồ sơ Folder (Kraft Tab) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 10,
          width: 80,
          height: 30,
          backgroundColor: "#D5BA86",
          borderRadius: "8px 8px 0 0",
        }}
      />

      {/* Các tờ giấy trắng nhô ra bên trong */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 20,
          right: 20,
          height: 60,
          backgroundColor: "#FFFFFF",
          borderRadius: "6px 6px 0 0",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          padding: "10px 14px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ width: "80%", height: 4, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 2 }} />
        <div style={{ width: "50%", height: 4, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 2 }} />
      </div>

      {/* Thân trước của bìa hồ sơ Folder Kraft */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          backgroundColor: "#E2C898",
          borderRadius: 14,
          boxShadow: SHADOWS.card,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Nhãn dán Sticker "FILE: YOU" */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "12px 32px",
            borderRadius: 12,
            boxShadow: SHADOWS.sticker,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${labelEntrance.translateY}px) scale(${labelEntrance.scale})`,
            opacity: labelEntrance.opacity,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontWeight: 700,
              fontSize: 11,
              color: COLORS.inkMuted,
              letterSpacing: "1.5px",
            }}
          >
            {labelPrefix}
          </span>
          <span
            style={{
              fontFamily: FONTS.inter,
              fontWeight: 900,
              fontSize: 32,
              color: COLORS.inkPrimary,
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
            }}
          >
            {labelMain}
          </span>
          {/* Gạch chân đỏ */}
          <div style={{ width: 44, height: 3.5, backgroundColor: COLORS.terracotta, borderRadius: 2, marginTop: 4 }} />
        </div>
      </div>
    </div>
  );
};
