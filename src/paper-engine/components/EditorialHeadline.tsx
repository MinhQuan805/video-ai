import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface EditorialHeadlineProps {
  primaryText?: string;
  accentText?: string;
  markdownText?: string; // Dùng định dạng "Lên Google, *dùng luôn*"
  fontSize?: number;
  lineHeight?: number;
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * EditorialHeadline: Tiêu đề báo chí / tạp chí đặc trưng trong video mẫu.
 * Dòng 1: Chữ đứng Serif than đậm uy quyền.
 * Dòng 2: Chữ nghiêng Serif màu cam đất Terracotta tinh tế.
 */
export const EditorialHeadline: React.FC<EditorialHeadlineProps> = ({
  primaryText,
  accentText,
  markdownText,
  fontSize = 62,
  lineHeight = 1.22,
  delay = 2,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    distanceY: 26,
    startScale: 0.95,
  });

  // Xử lý markdownText nếu có
  if (markdownText) {
    const parts = markdownText.split(/(\*[^*]+\*)/g);
    return (
      <div
        style={{
          fontFamily: FONTS.frauncesNormal,
          fontSize,
          lineHeight,
          color: COLORS.inkPrimary,
          transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
          opacity: entrance.opacity,
          filter: entrance.filter,
          letterSpacing: "-0.5px",
          ...style,
        }}
      >
        {parts.map((part, i) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <span
                key={i}
                style={{
                  fontFamily: FONTS.frauncesItalic,
                  fontStyle: "italic",
                  color: COLORS.terracotta,
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                {part.slice(1, -1)}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {primaryText && (
        <span
          style={{
            fontFamily: FONTS.frauncesNormal,
            fontSize,
            lineHeight,
            fontWeight: 700,
            color: COLORS.inkPrimary,
            letterSpacing: "-0.5px",
          }}
        >
          {primaryText}
        </span>
      )}

      {accentText && (
        <span
          style={{
            fontFamily: FONTS.frauncesItalic,
            fontStyle: "italic",
            fontSize,
            lineHeight,
            fontWeight: 700,
            color: COLORS.terracotta,
            letterSpacing: "-0.5px",
          }}
        >
          {accentText}
        </span>
      )}
    </div>
  );
};
