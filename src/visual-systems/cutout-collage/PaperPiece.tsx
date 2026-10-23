import React from "react";
import { theme } from "./theme";
import { PaperTextureOverlay } from "./PaperTexture";
import { useCurrentFrame, useVideoConfig } from "remotion";

export interface PaperPieceProps {
  n?: number; // Độ nâng tính bằng px (0 -> 30+)
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  jitter?: boolean; // Bật chế độ giật 12 fps cho animation
}

/**
 * Hook trả về frame được làm tròn theo tốc độ giật 12 fps
 */
export const useCollageFrame = (targetFps: number = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = fps / targetFps; // 30 / 12 = 2.5
  return Math.floor(frame / step) * step;
};

export const PaperPiece: React.FC<PaperPieceProps> = ({
  n = 4,
  children,
  style,
  className,
}) => {
  // Tính toán bóng: gồm vệt sát mép và vệt xa lệch xuống bên phải
  const contactShadow = `0 1px 2px rgba(27, 24, 21, 0.3)`;
  const distantOffsetX = (n * 0.75).toFixed(1);
  const distantOffsetY = (n * 1.15).toFixed(1);
  const distantBlur = (n * 1.4 + 4).toFixed(1);
  const distantOpacity = Math.min(0.38, 0.12 + n * 0.007).toFixed(3);
  const distantShadow = `${distantOffsetX}px ${distantOffsetY}px ${distantBlur}px rgba(27, 24, 21, ${distantOpacity})`;

  const fullBoxShadow = `${contactShadow}, ${distantShadow}`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        backgroundColor: theme.colors.paper,
        boxShadow: fullBoxShadow,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Nội dung bên trong mảnh giấy */}
      {children}

      {/* Lớp hạt mịn và sợi ngang phủ lên mảnh giấy */}
      <PaperTextureOverlay opacity={0.35} />
    </div>
  );
};
