import React from "react";
import { theme } from "./theme";
import { PaperTextureOverlay } from "./PaperTexture";

export interface InkBlockProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  paperPadding?: { top?: number; right?: number; bottom?: number; left?: number };
  borderPadding?: number;
  rotate?: number;
}

export const InkBlock: React.FC<InkBlockProps> = ({
  children,
  style,
  innerStyle,
  paperPadding,
  borderPadding,
  rotate = -0.5,
}) => {
  const defaultPadding = borderPadding
    ? { top: borderPadding, right: borderPadding, bottom: borderPadding, left: borderPadding }
    : { top: 6, right: 8, bottom: 9, left: 11 };
  const pad = paperPadding ?? defaultPadding;
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        backgroundColor: theme.colors.paper,
        paddingTop: `${pad.top ?? 6}px`,
        paddingRight: `${pad.right ?? 8}px`,
        paddingBottom: `${pad.bottom ?? 9}px`,
        paddingLeft: `${pad.left ?? 11}px`,
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
