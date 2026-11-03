import React from "react";
import { COLORS } from "../tokens";

export interface PaperCanvasProps {
  children: React.ReactNode;
  showTexture?: boolean;
  textureOpacity?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

/**
 * PaperCanvas: Nền giấy mỹ thuật cao cấp (Fine Art Paper Ground).
 * Sử dụng bộ lọc SVG FeTurbulence siêu mịn để tạo hạt giấy tự nhiên,
 * triệt tiêu hoàn toàn cảm giác nền phẳng đơn điệu "rẻ tiền" của AI.
 */
export const PaperCanvas: React.FC<PaperCanvasProps> = ({
  children,
  showTexture = true,
  textureOpacity = 0.038,
  backgroundColor = COLORS.bgPaper,
  style,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor,
        overflow: "hidden",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* SVG Grain & Texture Filter siêu nhẹ */}
      {showTexture && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: textureOpacity,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <filter id="paper-canvas-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves={3}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-canvas-grain)" />
        </svg>
      )}

      {/* Nội dung bên trong canvas */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
};
