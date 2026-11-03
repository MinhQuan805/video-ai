import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface PaperEyebrowProps {
  label: string;
  stepNumber?: string | number;
  icon?: React.ReactNode;
  delay?: number;
  showDivider?: boolean;
}

/**
 * PaperEyebrow: Thẻ tiêu đề phụ trên cùng của khung hình phong cách Paper Reel.
 * Ví dụ: "01 AI Agent", "02 Remotion", "PONYTAIL".
 */
export const PaperEyebrow: React.FC<PaperEyebrowProps> = ({
  label,
  stepNumber,
  icon,
  delay = 0,
  showDivider = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    distanceY: 16,
    startScale: 0.96,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingBottom: showDivider ? 14 : 0,
        }}
      >
        {icon && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            {icon}
          </div>
        )}

        {stepNumber !== undefined && (
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.terracotta,
              letterSpacing: 0.5,
            }}
          >
            {typeof stepNumber === "number" && stepNumber < 10
              ? `0${stepNumber}`
              : stepNumber}
          </span>
        )}

        <span
          style={{
            fontFamily: FONTS.frauncesNormal,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.inkPrimary,
            letterSpacing: 0.2,
          }}
        >
          {label}
        </span>
      </div>

      {showDivider && (
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: COLORS.divider,
            marginBottom: 24,
          }}
        />
      )}
    </div>
  );
};
