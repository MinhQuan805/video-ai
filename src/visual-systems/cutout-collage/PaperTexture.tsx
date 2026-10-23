import React from "react";

export const PaperTextureFilter: React.FC = () => {
  return (
    <svg
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* Bộ lọc hạt mịn và sợi ngang */}
        <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
          {/* Lớp hạt mịn */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            result="fineGrain"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0"
            result="coloredGrain"
          />

          {/* Lớp sợi ngang */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.03 0.8"
            numOctaves={2}
            result="horizontalFibers"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0"
            result="coloredFibers"
          />

          {/* Hòa trộn hạt và sợi */}
          <feBlend in="coloredGrain" in2="coloredFibers" mode="multiply" />
        </filter>
      </defs>
    </svg>
  );
};

export const PaperTextureOverlay: React.FC<{ opacity?: number }> = ({
  opacity = 0.45,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        filter: "url(#paper-texture)",
        opacity,
        pointerEvents: "none",
        mixBlendMode: "multiply",
      }}
    />
  );
};
