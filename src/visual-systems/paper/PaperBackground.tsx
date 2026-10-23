import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "./theme";

export const PaperBackground: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        overflow: "hidden",
      }}
    >
      {/* Lớp hạt sợi giấy mịn (paper grain) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.18,
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      >
        <filter id="paper-fine-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-fine-grain)" />
      </svg>

      {/* Đường viền chỉ định vị nhẹ nhàng (Editorial inner frame) */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          right: 50,
          bottom: 50,
          border: `1px solid ${theme.colors.line}`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Vạch nhỏ đánh dấu góc trang sách */}
      <div
        style={{
          position: "absolute",
          top: 42,
          left: 42,
          width: 16,
          height: 16,
          borderTop: `2px solid ${theme.colors.accent}`,
          borderLeft: `2px solid ${theme.colors.accent}`,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 42,
          right: 42,
          width: 16,
          height: 16,
          borderTop: `2px solid ${theme.colors.accent}`,
          borderRight: `2px solid ${theme.colors.accent}`,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 5 }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
