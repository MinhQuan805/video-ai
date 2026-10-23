import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "./theme";

export interface SlidingCutoutProps {
  src: string;
  enterFrame: number;
  exitFrame: number;
  startX?: number;
  targetX?: number;
  targetY?: number;
  width?: number;
  direction?: "left" | "right";
  hasAccentSilhouette?: boolean;
  hasBaseTape?: boolean;
  alt?: string;
  style?: React.CSSProperties;
}

export const SlidingCutout: React.FC<SlidingCutoutProps> = ({
  src,
  enterFrame,
  exitFrame,
  startX = -700,
  targetX = 60,
  targetY = 620,
  width = 520,
  direction = "left",
  hasAccentSilhouette = true,
  hasBaseTape = true,
  alt = "Cutout",
  style,
}) => {
  const frame = useCurrentFrame();

  if (frame < enterFrame || frame > exitFrame + 11) {
    return null;
  }

  // 1. Tính toán chuyển động trượt vào (11 khung) và lắc về (14 khung)
  const relEnter = frame - enterFrame;
  const relExit = frame - exitFrame;

  let currentX = targetX;
  let currentRot = 0;
  const dirSign = direction === "left" ? 1 : -1;

  if (relExit >= 0) {
    // Đang trượt ra (11 khung) đúng đường đã vào
    const tExit = Math.min(1, relExit / 11);
    currentX = interpolate(tExit, [0, 1], [targetX, startX]);
    // Đầu ngả về sau khi đi ra
    currentRot = -10 * dirSign;
  } else if (relEnter < 11) {
    // Đang trượt vào (11 khung) từ cạnh bên
    const tEnter = relEnter / 11;
    currentX = interpolate(tEnter, [0, 1], [startX, targetX]);
    // Đầu ngả về sau lúc đi
    currentRot = -10 * dirSign;
  } else if (relEnter < 25) {
    // Tới chỗ thì khựng, đầu hất về trước rồi lắc về trong khoảng 14 khung
    currentX = targetX;
    const p = (relEnter - 11) / 14;
    // Dao động giảm chấn: hất về trước (+8.5 deg) rồi lắc tắt dần
    currentRot = 8.5 * Math.exp(-3.2 * p) * Math.cos(p * 2.5 * Math.PI) * dirSign;
  } else {
    currentX = targetX;
    currentRot = 0;
  }

  // Bóng đổ cắt dán
  const cutoutShadow =
    "drop-shadow(0px 2px 4px rgba(27, 24, 21, 0.45)) drop-shadow(14px 18px 22px rgba(27, 24, 21, 0.28))";

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        bottom: targetY,
        width,
        transform: `rotate(${currentRot}deg)`,
        transformOrigin: "bottom center",
        zIndex: 25,
        ...style,
      }}
    >
      {/* Định nghĩa bộ lọc SVG tạo bóng màu nhấn 100% chuẩn màu #E0401C */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="accent-silhouette-filter">
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.878
                0 0 0 0 0.251
                0 0 0 0 0.110
                0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Vệt màu nhấn đặt lệch phía sau: 20 px sang phải, 8 px xuống */}
      {hasAccentSilhouette && (
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 20,
            width: "100%",
            zIndex: 1,
            pointerEvents: "none",
            filter: "url(#accent-silhouette-filter)",
            opacity: 0.95,
          }}
        >
          <img
            src={src}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Ảnh cắt chính với bóng đổ */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            filter: cutoutShadow,
          }}
        />
      </div>

      {/* Chân đế là một dải giấy dán xuống sàn */}
      {hasBaseTape && (
        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: "15%",
            width: "70%",
            height: "28px",
            backgroundColor: "#E4DFD3",
            border: `2px solid ${theme.colors.ink}`,
            boxShadow: "0 3px 6px rgba(27, 24, 21, 0.3)",
            transform: "rotate(-1.5deg)",
            zIndex: 10,
            clipPath:
              "polygon(0% 2px, 3px 0%, 97% 3px, 100% 1px, 98% 97%, 95% 100%, 2% 98%, 0% 95%)",
          }}
        />
      )}
    </div>
  );
};
