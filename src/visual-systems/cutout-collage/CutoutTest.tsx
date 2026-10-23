import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { InkBlock } from "./InkBlock";
import { PaperPiece } from "./PaperPiece";
import { theme } from "./theme";

export const CutoutTest: React.FC = () => {
  const frame = useCurrentFrame();

  // Nâng dần n từ 0 lên 30 trong 90 frames (3 giây)
  const elevation = interpolate(frame, [0, 89], [0, 30], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* 1. Nền giấy với lưới ô mờ và dải sàn xé răng cưa từ y=1340 */}
      <Background />

      {/* 2. Nhãn đen góc trên trái với viền cắt lệch và lưới chấm mờ */}
      <div style={{ position: "absolute", top: 80, left: 70, zIndex: 10 }}>
        <InkBlock rotate={-1.5}>
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 38,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: theme.colors.paper,
            }}
          >
            VOX CUTOUT COLLAGE
          </span>
        </InkBlock>
      </div>

      {/* 3. Mảnh giấy trống ở trung tâm nâng dần từ 0 lên 30 px */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(1.5deg) translateY(-${elevation * 0.5}px)`,
          zIndex: 5,
        }}
      >
        <PaperPiece
          n={elevation}
          style={{
            width: 620,
            height: 440,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 48,
              color: theme.colors.ink,
              marginBottom: 12,
            }}
          >
            MẢNH GIẤY CẮT DÁN
          </span>

          <span
            style={{
              fontFamily: theme.fonts.beVietnamPro,
              fontSize: 28,
              color: theme.colors.accent,
              fontWeight: 600,
            }}
          >
            Độ nâng n = {elevation.toFixed(1)} px
          </span>

          <span
            style={{
              fontFamily: theme.fonts.fraunces,
              fontSize: 22,
              fontStyle: "italic",
              color: "rgba(27, 24, 21, 0.65)",
              marginTop: 18,
              textAlign: "center",
            }}
          >
            Bóng xa lệch phải & nhoè dần khi n tăng
          </span>
        </PaperPiece>
      </div>
    </AbsoluteFill>
  );
};
