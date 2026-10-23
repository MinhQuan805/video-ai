import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "./theme";

export interface TearTransitionProps {
  startFrame: number;
  duration?: number; // 16 khung
}

export const TearTransition: React.FC<TearTransitionProps> = ({
  startFrame,
  duration = 16,
}) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;

  if (rel < 0 || rel >= duration) {
    return null;
  }

  // Trượt từ phải sang trái che kín khung (ở khung duration/2) rồi trượt tiếp ra ngoài mép trái
  const t = rel / duration;
  // Canvas width = 1080
  const x = interpolate(t, [0, 0.45, 0.55, 1], [1200, 0, 0, -1350]);

  return (
    <div
      style={{
        position: "absolute",
        top: -40,
        left: x,
        width: "1280px",
        height: "2000px",
        backgroundColor: theme.colors.accent,
        zIndex: 9000,
        boxShadow: "0 0 40px rgba(27, 24, 21, 0.6)",
        // Mép xé gồ ghề bằng clipPath đa giác răng cưa
        clipPath:
          "polygon(0% 0%, 96% 0%, 94% 6%, 98% 12%, 93% 18%, 97% 24%, 94% 30%, 98% 36%, 93% 42%, 97% 48%, 94% 54%, 98% 60%, 93% 66%, 97% 72%, 94% 78%, 98% 84%, 93% 90%, 97% 95%, 95% 100%, 4% 100%, 6% 94%, 2% 88%, 7% 82%, 3% 76%, 6% 70%, 2% 64%, 7% 58%, 3% 52%, 6% 46%, 2% 40%, 7% 34%, 3% 28%, 6% 22%, 2% 16%, 7% 10%, 4% 4%, 0% 0%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.anton,
          fontSize: 68,
          color: theme.colors.yellow,
          letterSpacing: "4px",
          transform: "rotate(-6deg)",
          textTransform: "uppercase",
          textShadow: "3px 4px 0px rgba(27, 24, 21, 0.8)",
        }}
      >
        HẢI TRÌNH BEAGLE
      </div>
    </div>
  );
};
