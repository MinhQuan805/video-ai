import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface KineticSubtitleProps {
  words: {
    text: string;
    isHighlighted?: boolean;
    startFrame?: number;
    endFrame?: number;
  }[];
  delay?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}

/**
 * KineticSubtitles: Phụ đề ngắn gọn, chữ đậm phong cách reel hiện đại.
 * Tự động làm nổi bật từ khóa bằng màu cam đất Terracotta (như trong video mẫu 5, 6, 7, 8, 9).
 */
export const KineticSubtitles: React.FC<KineticSubtitleProps> = ({
  words,
  delay = 0,
  fontSize = 38,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.pop,
    distanceY: 12,
    startScale: 0.96,
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {words.map((w, idx) => {
        const isCurrent =
          w.startFrame !== undefined && w.endFrame !== undefined
            ? frame >= w.startFrame && frame <= w.endFrame
            : w.isHighlighted;

        return (
          <span
            key={idx}
            style={{
              fontFamily: FONTS.inter,
              fontSize,
              fontWeight: 800,
              color: isCurrent ? COLORS.terracotta : COLORS.inkPrimary,
              letterSpacing: "-0.5px",
              transition: "color 0.1s ease",
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
