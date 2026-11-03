import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";
import { MouseCursor } from "./MouseCursor";

export interface MacFinderProps {
  width?: number;
  height?: number;
  folderName?: string;
  delay?: number;
  interactiveCursor?: boolean;
  style?: React.CSSProperties;
}

/**
 * MacFinder: Cửa sổ Finder macOS thanh lịch (như trong video mẫu 6).
 * Hiển thị các icon folder xanh, tài liệu văn bản, và con trỏ chuột lướt vào click.
 */
export const MacFinder: React.FC<MacFinderProps> = ({
  width = 540,
  height = 240,
  folderName = "Projects",
  delay = 5,
  interactiveCursor = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 32,
    startScale: 0.94,
  });

  // Tọa độ con trỏ click vào Folder đầu tiên
  const folderClickFrame = delay + 18;
  const isFolderActive = frame >= folderClickFrame;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Titlebar macOS */}
      <div
        style={{
          height: 38,
          borderBottom: `1px solid ${COLORS.divider}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          backgroundColor: "#FBFBFA",
        }}
      >
        {/* 3 traffic light buttons */}
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficRed }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficYellow }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficGreen }} />
        </div>

        {/* Finder face icon nhỏ */}
        <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: "#0A84FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 6, height: 6, borderBottom: "1.5px solid white", borderRadius: 2 }} />
        </div>

        {/* Thanh tìm kiếm mờ thanh mảnh */}
        <div
          style={{
            width: 130,
            height: 10,
            borderRadius: 5,
            backgroundColor: "rgba(29, 28, 26, 0.08)",
          }}
        />
      </div>

      {/* Nội dung bên trong: Grid Files & Folders */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 28px",
        }}
      >
        {/* Folder chính (có thể click) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            transform: isFolderActive ? "scale(0.96)" : "scale(1)",
            transition: "transform 0.1s ease",
          }}
        >
          {/* Icon Thư mục xanh macOS */}
          <div
            style={{
              width: 68,
              height: 52,
              backgroundColor: isFolderActive ? "#54A0EB" : "#72B5F6",
              borderRadius: "4px 10px 8px 8px",
              boxShadow: isFolderActive
                ? "0 0 0 2px #C85228, 0 4px 12px rgba(114, 181, 246, 0.4)"
                : "0 4px 10px rgba(0,0,0,0.06)",
              position: "relative",
            }}
          >
            {/* Tab nhỏ phía trên của folder */}
            <div
              style={{
                position: "absolute",
                top: -6,
                left: 0,
                width: 26,
                height: 8,
                backgroundColor: isFolderActive ? "#4190DF" : "#5DA5EE",
                borderRadius: "4px 4px 0 0",
              }}
            />
          </div>
          {/* Tên thư mục dạng pill */}
          <div
            style={{
              width: 48,
              height: 7,
              borderRadius: 3.5,
              backgroundColor: isFolderActive ? COLORS.terracotta : "rgba(29, 28, 26, 0.16)",
            }}
          />
        </div>

        {/* File 1: Spreadsheet / Numbers */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 50,
              height: 60,
              backgroundColor: "#FFFFFF",
              borderRadius: "4px 12px 4px 4px",
              border: `1px solid ${COLORS.divider}`,
              boxShadow: SHADOWS.subtle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 22, height: 22, backgroundColor: "#30D158", borderRadius: 4, opacity: 0.85 }} />
          </div>
          <div style={{ width: 44, height: 6, borderRadius: 3, backgroundColor: "rgba(29, 28, 26, 0.12)" }} />
        </div>

        {/* File 2: Document / Pages */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 50,
              height: 60,
              backgroundColor: "#FFFFFF",
              borderRadius: "4px 12px 4px 4px",
              border: `1px solid ${COLORS.divider}`,
              boxShadow: SHADOWS.subtle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 22, height: 22, backgroundColor: "#FF9F0A", borderRadius: 4, opacity: 0.85 }} />
          </div>
          <div style={{ width: 44, height: 6, borderRadius: 3, backgroundColor: "rgba(29, 28, 26, 0.12)" }} />
        </div>

        {/* File 3: Text file */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 50,
              height: 60,
              backgroundColor: "#FFFFFF",
              borderRadius: "4px 12px 4px 4px",
              border: `1px solid ${COLORS.divider}`,
              boxShadow: SHADOWS.subtle,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: "10px 8px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "100%", height: 3, backgroundColor: "rgba(29, 28, 26, 0.2)", borderRadius: 1.5 }} />
            <div style={{ width: "80%", height: 3, backgroundColor: "rgba(29, 28, 26, 0.2)", borderRadius: 1.5 }} />
            <div style={{ width: "60%", height: 3, backgroundColor: "rgba(29, 28, 26, 0.2)", borderRadius: 1.5 }} />
          </div>
          <div style={{ width: 44, height: 6, borderRadius: 3, backgroundColor: "rgba(29, 28, 26, 0.12)" }} />
        </div>
      </div>

      {/* Chuột lướt vào click */}
      {interactiveCursor && (
        <MouseCursor
          startFrame={delay + 5}
          durationFrames={16}
          startPoint={{ x: width * 0.75, y: height * 0.85 }}
          targetPoint={{ x: 74, y: 110 }}
          clickFrameOffset={14}
        />
      )}
    </div>
  );
};
