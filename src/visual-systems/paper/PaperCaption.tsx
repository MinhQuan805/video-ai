import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { useVideoContext } from "../../context/VideoContext";
import { CaptionsPayload } from "../../types";

export interface PaperCaptionProps {
  captions?: CaptionsPayload;
  style?: React.CSSProperties;
}

export const PaperCaption: React.FC<PaperCaptionProps> = ({
  captions: propCaptions,
  style,
}) => {
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
        top: 1440,
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
          maxWidth: "960px",
          padding: "16px 32px",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          boxShadow: "0 10px 30px rgba(26, 24, 22, 0.08), 0 1px 3px rgba(26, 24, 22, 0.05)",
          border: `1px solid ${theme.colors.line}`,
        }}
      >
        {activePhrase.words.map((word, idx) => {
          const nextWord = activePhrase.words[idx + 1];
          const isCurrent =
            currentTime >= word.s &&
            (nextWord ? currentTime < nextWord.s : currentTime <= word.e + 0.15);

          return (
            <span
              key={`${activePhrase.id}-${idx}-${word.w}`}
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 54,
                fontWeight: 700,
                letterSpacing: "-0.5px",
                lineHeight: 1.25,
                color: isCurrent ? theme.colors.accent : theme.colors.ink,
                padding: "2px 8px",
                whiteSpace: "nowrap",
                display: "inline-block",
                transition: "color 0.1s ease",
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
