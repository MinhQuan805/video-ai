import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";

interface MotionWrapperProps {
  step: string;
  category: string;
  headlineMain: string;
  headlineAccent: string;
  subtitlePre: string;
  subtitleAccent: string;
  children: React.ReactNode;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  step,
  category,
  headlineMain,
  headlineAccent,
  subtitlePre,
  subtitleAccent,
  children,
}) => {
  const frame = useCurrentFrame();

  // Staggered Apple-grade Ease-out curves (Zero spring micro-jitter)
  const tagEntrance = smoothStep(frame, 0, 12, 0, 1, EASING_PRESETS.appleEaseOut);
  const titleEntrance = smoothStep(frame, 2, 14, 0, 1, EASING_PRESETS.appleEaseOut);
  const footerEntrance = smoothStep(frame, 4, 14, 0, 1, EASING_PRESETS.appleEaseOut);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: COLORS.bgPaper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "160px 80px 140px 80px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Top Section: Eyebrow + Large Fraunces Headline */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
            transform: `translateY(${(1 - tagEntrance) * 20}px)`,
            opacity: tagEntrance,
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: COLORS.terracotta,
              borderRadius: 6,
              color: "#FFF",
              fontFamily: FONTS.mono,
              fontSize: 14,
              fontWeight: 800,
              boxShadow: "0 4px 12px rgba(200, 82, 40, 0.25)",
            }}
          >
            {step}
          </div>
          <span
            style={{
              fontFamily: FONTS.inter,
              fontWeight: 800,
              fontSize: 18,
              color: COLORS.inkPrimary,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "#E2E8F0",
              color: "#334155",
              borderRadius: 4,
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            motion.dev 60fps
          </span>
        </div>

        <h1
          style={{
            fontFamily: FONTS.frauncesNormal,
            fontSize: 72,
            lineHeight: 1.15,
            color: COLORS.inkPrimary,
            margin: 0,
            fontWeight: 900,
            transform: `translateY(${(1 - titleEntrance) * 24}px)`,
            opacity: titleEntrance,
          }}
        >
          {headlineMain}{" "}
          <span
            style={{
              fontFamily: FONTS.frauncesItalic,
              fontStyle: "italic",
              fontWeight: 400,
              color: COLORS.terracotta,
            }}
          >
            {headlineAccent}
          </span>
        </h1>
      </div>

      {/* 2. Middle Section: Physical Object Floating Freely */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {children}
      </div>

      {/* 3. Bottom Section: Subtitle */}
      <div
        style={{
          textAlign: "center",
          transform: `translateY(${(1 - footerEntrance) * 18}px)`,
          opacity: footerEntrance,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.inter,
            fontSize: 30,
            fontWeight: 800,
            color: COLORS.inkPrimary,
          }}
        >
          {subtitlePre}{" "}
          <span
            style={{
              color: COLORS.terracotta,
              textDecoration: "underline",
              textUnderlineOffset: 6,
            }}
          >
            {subtitleAccent}
          </span>
        </span>
      </div>
    </div>
  );
};
