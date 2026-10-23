import React, { useMemo } from "react";
import { theme } from "./theme";
import { PaperTextureFilter, PaperTextureOverlay } from "./PaperTexture";

export const Background: React.FC = () => {
  // Tạo đường mép răng cưa xé gồ ghề từ x=0 đến x=1080 quanh y=1340
  const floorClipPath = useMemo(() => {
    const points: string[] = ["0% 100%"];
    const startY = 1340;
    const segments = 45; // 45 đoạn răng cưa
    const step = 1080 / segments;

    // Các răng cưa lệch ngẫu nhiên nhưng cố định
    const offsets = [
      0, 6, -4, 8, -2, 7, -6, 5, -8, 4, -3, 9, -5, 2, -7, 6, -4, 8, -2, 7, -6,
      5, -8, 4, -3, 9, -5, 2, -7, 6, -4, 8, -2, 7, -6, 5, -8, 4, -3, 9, -5, 2,
      -7, 6, 0,
    ];

    for (let i = 0; i <= segments; i++) {
      const x = (i * step).toFixed(1);
      const y = (startY + (offsets[i] || 0)).toFixed(1);
      points.push(`${x}px ${y}px`);
    }

    points.push("1080px 100%");
    return `polygon(${points.join(", ")})`;
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: theme.colors.background,
        overflow: "hidden",
      }}
    >
      <PaperTextureFilter />

      {/* Lưới ô mờ của nền giấy */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(27, 24, 21, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(27, 24, 21, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Dải sàn từ khoảng y=1340 xuống đáy với mép trên xé răng cưa */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: theme.colors.floor,
          clipPath: floorClipPath,
        }}
      >
        {/* Lớp bóng đổ nhẹ dưới nếp gấp sàn */}
        <div
          style={{
            position: "absolute",
            top: 1335,
            left: 0,
            right: 0,
            height: 12,
            background:
              "linear-gradient(to bottom, rgba(27, 24, 21, 0.12), transparent)",
            pointerEvents: "none",
          }}
        />
        {/* Thớ giấy cho sàn */}
        <PaperTextureOverlay opacity={0.35} />
      </div>

      {/* Lớp thớ giấy phủ toàn bộ nền */}
      <PaperTextureOverlay opacity={0.4} />
    </div>
  );
};
