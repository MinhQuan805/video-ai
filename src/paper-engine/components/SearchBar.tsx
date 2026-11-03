import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTypewriter } from "../physics";

export interface SearchBarProps {
  searchText?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  delay?: number;
  typewriterDelayOffset?: number;
  style?: React.CSSProperties;
}

/**
 * SearchBar: Thanh tìm kiếm hình viên thuốc (pill shape) tối giản (như video mẫu 5).
 * Tích hợp con trỏ nhấp nháy màu cam terracotta và gõ chữ mượt mà.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  searchText = "",
  placeholder = "",
  width = 460,
  height = 54,
  delay = 5,
  typewriterDelayOffset = 10,
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
    startScale: 0.92,
  });

  const typeStart = delay + typewriterDelayOffset;
  const { displayedText, showCursor } = getTypewriter(
    searchText,
    frame,
    typeStart,
    0.65
  );

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.cardBg,
        borderRadius: height / 2,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 14,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Icon Kính lúp */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={COLORS.inkSecondary}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      {/* Text đã gõ + Con trỏ nhấp nháy màu cam đất */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: FONTS.inter,
          fontSize: 22,
          fontWeight: 500,
          color: COLORS.inkPrimary,
          flex: 1,
        }}
      >
        {displayedText ? (
          <span>{displayedText}</span>
        ) : (
          <span style={{ color: COLORS.inkMuted }}>{placeholder}</span>
        )}

        {showCursor && (
          <span
            style={{
              display: "inline-block",
              width: 2.2,
              height: 24,
              backgroundColor: COLORS.terracotta,
              marginLeft: 2,
              borderRadius: 1,
            }}
          />
        )}
      </div>
    </div>
  );
};
