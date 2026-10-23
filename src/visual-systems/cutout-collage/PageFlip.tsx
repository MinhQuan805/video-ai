import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export interface PageFlipProps {
  startFrame?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const PageFlip: React.FC<PageFlipProps> = ({
  startFrame = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;

  if (rel < 0) {
    return null;
  }

  // 10 khung mở từ -88 độ tới +6 độ (quá đà nhẹ)
  // 16 khung nảy về 0 độ
  let rotY = 0;
  if (rel < 10) {
    const t = rel / 10;
    rotY = interpolate(t, [0, 1], [-88, 6]);
  } else if (rel < 26) {
    const p = (rel - 10) / 16;
    rotY = 6 * Math.exp(-3.2 * p) * Math.cos(p * 2.5 * Math.PI);
  } else {
    rotY = 0;
  }

  // Độ sáng thay đổi khi lật: lúc mép nghiêng thì tối đi (0.5 -> 1.0)
  const brightness = interpolate(Math.abs(rotY), [0, 88], [1.0, 0.48]);

  return (
    <div
      style={{
        perspective: 1400,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <div
        style={{
          transformOrigin: "left center",
          transform: `rotateY(${rotY}deg)`,
          filter: `brightness(${brightness})`,
          transition: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};
