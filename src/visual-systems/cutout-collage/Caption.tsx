import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { useVideoContext } from "../../context/VideoContext";
import { CaptionsPayload } from "../../types";

export interface CaptionProps {
  captions?: CaptionsPayload;
  style?: React.CSSProperties;
}

export const Caption: React.FC<CaptionProps> = ({ captions: propCaptions, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const context = useVideoContext();
  const captionsData = propCaptions || context.captions;

  if (!captionsData || !captionsData.phrases) {
    return null;
  }

  // Tìm phrase đang active ở frame hiện tại
  const activePhrase = captionsData.phrases.find(
    (p) => frame >= p.startFrame && frame < p.endFrame
  );

  if (!activePhrase) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 1420,
        left: 0,
        right: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "0 40px",
        boxSizing: "border-box",
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px 14px",
          maxWidth: "1000px",
          padding: "16px 28px",
          borderRadius: "16px",
          backgroundColor: "rgba(251, 250, 247, 0.95)",
          boxShadow: "0 8px 24px rgba(27, 24, 21, 0.25), 0 2px 6px rgba(27, 24, 21, 0.15)",
          border: `3px solid ${theme.colors.ink}`,
        }}
      >
        {activePhrase.words.map((word, idx) => {
          // Xác định từ đang được đọc
          const nextWord = activePhrase.words[idx + 1];
          const isCurrent =
            currentTime >= word.s &&
            (nextWord ? currentTime < nextWord.s : currentTime <= word.e + 0.15);

          const wordColor = isCurrent ? "#C6532A" : theme.colors.ink;

          return (
            <span
              key={`${activePhrase.id}-${idx}-${word.w}`}
              style={{
                fontFamily: theme.fonts.beVietnamPro,
                fontSize: 64,
                fontWeight: 800,
                color: wordColor,
                padding: "2px 8px",
                whiteSpace: "nowrap",
                display: "inline-block",
                lineHeight: 1.15,
                transition: "color 0.08s ease",
              }}
            >
              {word.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
