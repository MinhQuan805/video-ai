import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "./theme";

export interface BigNumberProps {
  number: string | number;
  label: string;
  subLabel?: string;
  slamFrame: number;
  x?: number;
  y?: number;
  style?: React.CSSProperties;
}

export const BigNumber: React.FC<BigNumberProps> = ({
  number,
  label,
  subLabel,
  slamFrame,
  x = 100,
  y = 300,
  style,
}) => {
  const frame = useCurrentFrame();

  if (frame < slamFrame) {
    return null;
  }

  const relFrame = frame - slamFrame;

  // Hai khung đầu to gấp đôi (scale 2.0) và nghiêng 5 độ, có bóng xa.
  // Rồi co về đúng cỡ trong 5 đến 6 khung.
  let scale = 1.0;
  let rotation = 0;
  let shadow = "0 8px 18px rgba(27, 24, 21, 0.35)";

  if (relFrame < 2) {
    scale = 2.0;
    rotation = 5;
    shadow = "30px 45px 30px rgba(27, 24, 21, 0.55)";
  } else if (relFrame <= 7) {
    // Co về trong 5 khung (từ 2.0 về 1.0 với một chút nảy)
    const p = (relFrame - 2) / 5;
    scale = interpolate(p, [0, 0.7, 1], [2.0, 0.94, 1.0]);
    rotation = interpolate(p, [0, 1], [5, -1]);
    shadow = "8px 14px 20px rgba(27, 24, 21, 0.4)";
  } else {
    scale = 1.0;
    rotation = -1;
    shadow = "4px 8px 14px rgba(27, 24, 21, 0.3)";
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        zIndex: 50,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {/* 1. Chữ số khổng lồ (Anton, in hoa, cỡ khoảng 400 px) */}
      <div
        style={{
          fontFamily: theme.fonts.anton,
          fontSize: 380,
          lineHeight: 0.85,
          color: theme.colors.ink,
          textTransform: "uppercase",
          letterSpacing: "-8px",
          transform: `scale(${scale})`,
          transformOrigin: "bottom left",
          filter: `drop-shadow(${shadow})`,
          userSelect: "none",
        }}
      >
        {number}
      </div>

      {/* 2. Dưới số là nhãn giấy xé màu nhấn ghi mô tả */}
      {relFrame >= 2 && (
        <div
          style={{
            marginTop: "16px",
            backgroundColor: theme.colors.accent,
            padding: "12px 28px",
            boxShadow: "4px 6px 0px rgba(27, 24, 21, 0.85)",
            border: `3px solid ${theme.colors.ink}`,
            clipPath:
              "polygon(0% 4px, 4px 0%, 98% 2px, 100% 6px, 99% 94%, 96% 100%, 2% 98%, 0% 92%)",
            transform: "rotate(-2deg)",
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 48,
              color: "#FFFFFF",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>

          {subLabel && (
            <span
              style={{
                backgroundColor: theme.colors.yellow,
                color: theme.colors.ink,
                fontFamily: theme.fonts.anton,
                fontSize: 32,
                padding: "4px 12px",
                borderRadius: "4px",
                letterSpacing: "1px",
              }}
            >
              {subLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
