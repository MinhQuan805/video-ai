import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "./theme";

export interface TornRevealProps {
  startFrame?: number;
  duration?: number; // 12 khung
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const TornReveal: React.FC<TornRevealProps> = ({
  startFrame = 0,
  duration = 12,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;

  if (rel < 0) {
    return null;
  }

  // Dải xé chạy từ đỉnh xuống đáy trong 12 khung
  const t = Math.min(1, rel / duration);
  const revealPercent = t * 100;

  // Dải giấy xé rơi đi sau khi quét xong (sau frame 12)
  const isTornStripFalling = rel >= duration;
  const fallRel = Math.max(0, rel - duration);
  const fallY = fallRel * fallRel * 6; // gia tốc rơi
  const fallRot = fallRel * 4;

  return (
    <div style={{ position: "relative", ...style }}>
      {/* Nội dung được lộ ra dần từ trên xuống */}
      <div
        style={{
          clipPath: `inset(0 0 ${100 - revealPercent}% 0)`,
        }}
      >
        {children}
      </div>

      {/* Dải giấy xé chạy theo mép mở và rơi đi */}
      {rel < duration + 10 && (
        <div
          style={{
            position: "absolute",
            top: `${revealPercent}%`,
            left: "-5%",
            width: "110%",
            height: "30px",
            backgroundColor: theme.colors.paper,
            borderBottom: `2px solid ${theme.colors.ink}`,
            boxShadow: "0 4px 8px rgba(27, 24, 21, 0.4)",
            transform: `translateY(${fallY}px) rotate(${fallRot}deg)`,
            zIndex: 40,
            clipPath:
              "polygon(0% 0%, 100% 0%, 98% 100%, 92% 60%, 85% 95%, 78% 50%, 70% 90%, 62% 45%, 55% 95%, 48% 50%, 40% 90%, 32% 45%, 25% 95%, 18% 50%, 10% 85%, 3% 40%, 0% 100%)",
          }}
        />
      )}
    </div>
  );
};
