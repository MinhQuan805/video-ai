import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../visual-systems/cutout-collage/Background";
import { theme } from "../visual-systems/cutout-collage/theme";
import { PaperPiece } from "../visual-systems/cutout-collage/PaperPiece";

export interface PlaceholderSceneProps {
  sceneNumber: number;
  title: string;
  from: number;
  to: number;
  description?: string;
}

export const PlaceholderScene: React.FC<PlaceholderSceneProps> = ({
  sceneNumber,
  title,
  from,
  to,
  description,
}) => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background />

      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "820px",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <PaperPiece
          n={8}
          style={{
            padding: "48px 40px",
            border: `3px dashed ${theme.colors.ink}`,
            borderRadius: "4px",
            backgroundColor: "#FAF7EF",
          }}
        >
          {/* Nhãn số cảnh */}
          <div
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 32,
              color: theme.colors.accent,
              letterSpacing: "3px",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            CẢNH {sceneNumber} · CHỜ DỰNG
          </div>

          {/* Tiêu đề cảnh */}
          <div
            style={{
              fontFamily: theme.fonts.fraunces,
              fontSize: 44,
              fontWeight: 700,
              color: theme.colors.ink,
              lineHeight: 1.3,
              marginBottom: 20,
            }}
          >
            {title}
          </div>

          {/* Mô tả chi tiết nếu có */}
          {description && (
            <div
              style={{
                fontFamily: theme.fonts.beVietnamPro,
                fontSize: 22,
                color: "rgba(27, 24, 21, 0.7)",
                lineHeight: 1.5,
                marginBottom: 24,
              }}
            >
              {description}
            </div>
          )}

          {/* Thông số khung hình */}
          <div
            style={{
              display: "inline-block",
              fontFamily: theme.fonts.beVietnamPro,
              fontSize: 18,
              fontWeight: 600,
              color: theme.colors.ink,
              backgroundColor: theme.colors.yellow,
              padding: "6px 18px",
              borderRadius: "4px",
              letterSpacing: "1px",
            }}
          >
            Khung hình: {from} ➔ {to} ({(to - from) / 30}s)
          </div>
        </PaperPiece>
      </div>
    </AbsoluteFill>
  );
};
