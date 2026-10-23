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
          zIndex: 50,
          width: "820px",
        }}
      >
        <PaperPiece
          n={16}
          style={{
            padding: "50px 40px",
            border: `3px solid ${theme.colors.ink}`,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: theme.colors.ink,
              color: theme.colors.yellow,
              fontFamily: theme.fonts.anton,
              fontSize: 60,
              padding: "10px 30px",
              borderRadius: "8px",
              letterSpacing: "2px",
            }}
          >
            CẢNH {sceneNumber}
          </div>

          <div
            style={{
              fontFamily: theme.fonts.fraunces,
              fontSize: 36,
              fontWeight: 700,
              color: theme.colors.ink,
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>

          {description && (
            <div
              style={{
                fontFamily: theme.fonts.beVietnamPro,
                fontSize: 26,
                color: "#666055",
                maxWidth: "680px",
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          )}

          <div
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 24,
              color: theme.colors.accent,
              letterSpacing: "1px",
              marginTop: "10px",
            }}
          >
            FRAME {from} ➔ {to} ({to - from} FRAMES)
          </div>
        </PaperPiece>
      </div>
    </AbsoluteFill>
  );
};
