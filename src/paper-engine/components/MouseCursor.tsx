import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../tokens";
import { getCursorFlight } from "../physics";

export interface MouseCursorProps {
  startFrame?: number;
  durationFrames?: number;
  startPoint?: { x: number; y: number };
  targetPoint?: { x: number; y: number };
  clickFrameOffset?: number;
  showRipple?: boolean;
}

/**
 * MouseCursor: Con trỏ chuột tương tác mượt mà phong cách macOS.
 * Tích hợp đường bay cong tự nhiên và hiệu ứng click nhấn xuống (squash) kèm vòng sóng ripple.
 */
export const MouseCursor: React.FC<MouseCursorProps> = ({
  startFrame = 10,
  durationFrames = 24,
  startPoint = { x: 340, y: 580 },
  targetPoint = { x: 190, y: 380 },
  clickFrameOffset = 20,
  showRipple = true,
}) => {
  const frame = useCurrentFrame();

  const { x, y, clickScale } = getCursorFlight(
    frame,
    startFrame,
    durationFrames,
    startPoint,
    targetPoint,
    clickFrameOffset
  );

  const clickAge = frame - (startFrame + clickFrameOffset);
  const rippleProgress = Math.max(0, Math.min(1, clickAge / 14));
  const rippleScale = interpolate(rippleProgress, [0, 1], [0.5, 2.2]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.3, 1], [0, 0.5, 0]);

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 99,
        transform: `scale(${clickScale})`,
        transformOrigin: "top left",
      }}
    >
      {/* Vòng tròn sóng click ripple */}
      {showRipple && clickAge >= 0 && clickAge <= 14 && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: -12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: `2px solid ${COLORS.terracotta}`,
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* Vector con trỏ chuột phong cách macOS chuẩn */}
      <svg
        width="26"
        height="32"
        viewBox="0 0 17 21"
        fill="none"
        style={{
          filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.18))",
        }}
      >
        <path
          d="M0 0V16.5L4.5 12.5L7.8 19.5L10.5 18.2L7.2 11.5L12.5 11.5L0 0Z"
          fill="#1D1C1A"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
