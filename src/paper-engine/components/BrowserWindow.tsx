import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface BrowserWindowProps {
  width?: number;
  height?: number;
  url?: string;
  delay?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * BrowserWindow: Cửa sổ trình duyệt máy tính tối giản (như trong video mẫu 8).
 * Thanh địa chỉ hiển thị `http://localhost:8081` hoặc URL tùy chọn, tích hợp 3 nút traffic lights.
 */
export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  width = 540,
  height = 580,
  url = "http://localhost:8081",
  delay = 5,
  children,
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
    startScale: 0.94,
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Chrome Header */}
      <div
        style={{
          height: 48,
          backgroundColor: "#FAF9F6",
          borderBottom: `1px solid ${COLORS.divider}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 14,
        }}
      >
        {/* 3 traffic light buttons */}
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficRed }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficYellow }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficGreen }} />
        </div>

        {/* URL Pill Capsule */}
        <div
          style={{
            flex: 1,
            height: 28,
            backgroundColor: "#EFECE4",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 8,
          }}
        >
          {/* Chrome mini icon */}
          <div style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid #4285F4" }} />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.inkPrimary,
              letterSpacing: "-0.2px",
            }}
          >
            {url}
          </span>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FDFCFA",
          position: "relative",
          overflow: "hidden",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
};
