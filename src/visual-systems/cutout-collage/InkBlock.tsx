import React from "react";
import { theme } from "./theme";
import { PaperTextureOverlay } from "./PaperTexture";

export interface InkBlockProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  paperPadding?: { top?: number; right?: number; bottom?: number; left?: number };
  rotate?: number;
}

export const InkBlock: React.FC<InkBlockProps> = ({
  children,
  style,
  innerStyle,
  paperPadding = { top: 6, right: 8, bottom: 9, left: 11 }, // Viền giấy dày mỏng không đều như cắt lệch
  rotate = -0.5,
}) => {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        backgroundColor: theme.colors.paper,
        paddingTop: `${paperPadding.top ?? 6}px`,
        paddingRight: `${paperPadding.right ?? 8}px`,
        paddingBottom: `${paperPadding.bottom ?? 9}px`,
        paddingLeft: `${paperPadding.left ?? 11}px`,
        boxShadow: "0 2px 4px rgba(27, 24, 21, 0.25)",
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {/* Ô mực in */}
      <div
        style={{
          position: "relative",
          backgroundColor: theme.colors.ink,
          color: theme.colors.paper,
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          ...innerStyle,
        }}
      >
        {/* Lưới chấm mờ của nền mực */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(243, 238, 226, 0.16) 1.2px, transparent 1.2px)",
            backgroundSize: "7px 7px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>

      {/* Thớ giấy cho viền giấy cắt lệch */}
      <PaperTextureOverlay opacity={0.3} />
    </div>
  );
};
