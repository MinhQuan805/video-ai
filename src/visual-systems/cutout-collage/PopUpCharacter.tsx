import React from "react";
import { useCurrentFrame, interpolate, staticFile } from "remotion";
import { theme } from "./theme";

export interface PopUpCharacterProps {
  src: string;
  startFrame?: number;
  width?: number;
  height?: number;
  splitPercent?: number; // 56% cho chân dung dưới cằm
  hasAccentSilhouette?: boolean;
  style?: React.CSSProperties;
}

export const PopUpCharacter: React.FC<PopUpCharacterProps> = ({
  src,
  startFrame = 0,
  width = 460,
  height = 550,
  splitPercent = 56,
  hasAccentSilhouette = true,
  style,
}) => {
  const currentFrame = useCurrentFrame();
  const rel = currentFrame - startFrame;

  if (rel < 0) {
    return null;
  }

  // 1. Nửa dưới dựng lên quanh bản lề ở chân (18 khung bung, 20 khung nảy)
  // Góc từ -85 độ (nằm ngửa) lên 0 độ, quá đà +8 độ rồi nảy về
  let rotBottom = 0;
  if (rel < 18) {
    const t = rel / 18;
    rotBottom = interpolate(t, [0, 1], [-85, 8]);
  } else if (rel < 38) {
    const p = (rel - 18) / 20;
    rotBottom = 8 * Math.exp(-3.2 * p) * Math.cos(p * 2.5 * Math.PI);
  } else {
    rotBottom = 0;
  }

  // 2. Nửa trên bung ra trễ 5 khung sau nửa dưới
  // Từ gập đôi 130 độ xuống 0 độ, quá đà -10 độ rồi nảy về
  const relTop = rel - 5;
  let rotTop = 130;
  if (relTop <= 0) {
    rotTop = 130;
  } else if (relTop < 18) {
    const t = relTop / 18;
    rotTop = interpolate(t, [0, 1], [130, -10]);
  } else if (relTop < 38) {
    const p = (relTop - 18) / 20;
    rotTop = -10 * Math.exp(-3.2 * p) * Math.cos(p * 2.5 * Math.PI);
  } else {
    rotTop = 0;
  }

  // Nửa nào đang nghiêng thì tối đi (brightness từ 0.55 -> 1.0)
  const brightBottom = interpolate(Math.abs(rotBottom), [0, 85], [1.0, 0.55]);
  const brightTop = interpolate(Math.abs(rotTop), [0, 130], [1.0, 0.5]);

  const cutoutShadow =
    "drop-shadow(0px 2px 4px rgba(27, 24, 21, 0.45)) drop-shadow(12px 16px 20px rgba(27, 24, 21, 0.28))";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        perspective: 1200,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {/* Vệt màu nhấn lệch phía sau: 20px sang phải, 8px xuống */}
      {hasAccentSilhouette && (
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 20,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
            filter: "url(#accent-silhouette-filter)",
            opacity: 0.92,
            transform: `rotateX(${rotBottom * 0.5}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <img
            src={src}
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      )}

      {/* NỬA DƯỚI (Bottom Half: từ splitPercent đến đáy) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(${splitPercent}% 0 0 0)`,
          transformOrigin: "bottom center",
          transform: `rotateX(${rotBottom}deg)`,
          filter: `${cutoutShadow} brightness(${brightBottom})`,
          zIndex: 5,
        }}
      >
        <img
          src={src}
          alt="Character Bottom"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* NỬA TRÊN (Top Half: từ đỉnh đến splitPercent, bản lề tại nếp gập) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(0 0 ${100 - splitPercent}% 0)`,
          transformOrigin: `center ${splitPercent}%`,
          transform: `rotateX(${rotTop}deg)`,
          filter: `${cutoutShadow} brightness(${brightTop})`,
          zIndex: 8,
        }}
      >
        <img
          src={src}
          alt="Character Top"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Vệt nếp gập mờ còn lại sau khi dựng xong */}
      {rel >= 20 && (
        <div
          style={{
            position: "absolute",
            top: `${splitPercent}%`,
            left: "10%",
            width: "80%",
            height: "2px",
            background:
              "linear-gradient(to right, transparent, rgba(27, 24, 21, 0.4), rgba(251, 250, 247, 0.3), transparent)",
            zIndex: 15,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
