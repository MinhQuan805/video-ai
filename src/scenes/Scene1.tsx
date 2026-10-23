import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../visual-systems/cutout-collage/Background";
import { InkBlock } from "../visual-systems/cutout-collage/InkBlock";
import { theme } from "../visual-systems/cutout-collage/theme";
import { PaperPiece } from "../visual-systems/cutout-collage/PaperPiece";
import { BigNumber } from "../visual-systems/cutout-collage/BigNumber";
import { SlidingCutout } from "../visual-systems/cutout-collage/SlidingCutout";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Tiêu đề "BẠN CÓ BIẾT?" (Frame 0+)
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [-80, 0]);
  const titleRotate = interpolate(titleSpring, [0, 1], [-6, -2]);

  // 2. Nhãn "CHARLES DARWIN" (Frame 59+)
  const darwinLabelSpring = spring({
    frame: Math.max(0, frame - 59),
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const darwinLabelScale = interpolate(darwinLabelSpring, [0, 1], [0, 1]);

  // 3. Tàu HMS Beagle (Frame 87+)
  const shipSpring = spring({
    frame: Math.max(0, frame - 87),
    fps,
    config: { damping: 15, stiffness: 75 },
  });
  const shipX = interpolate(shipSpring, [0, 1], [600, 0]);
  const shipY = interpolate(shipSpring, [0, 1], [150, 0]);
  const shipRocking = Math.sin((frame - 87) * 0.08) * 1.5;

  // 4. Mẩu giấy "CHỈ ĐỂ LÀM BẠN" (Frame 154+)
  const friendSpring = spring({
    frame: Math.max(0, frame - 154),
    fps,
    config: { damping: 11, stiffness: 110 },
  });
  const friendScale = interpolate(friendSpring, [0, 1], [0, 1]);
  const friendRotate = interpolate(friendSpring, [0, 1], [15, -3]);

  // 5. Thuyền trưởng Robert FitzRoy (Frame 196+)
  const fitzroySpring = spring({
    frame: Math.max(0, frame - 196),
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const fitzroyY = interpolate(fitzroySpring, [0, 1], [400, 0]);
  const fitzroyScale = interpolate(fitzroySpring, [0, 1], [0.85, 1.0]);

  const cutoutShadow =
    "drop-shadow(0px 2px 4px rgba(27, 24, 21, 0.45)) drop-shadow(14px 18px 22px rgba(27, 24, 21, 0.28))";

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Nền giấy và sàn xé răng cưa tại y 1340 */}
      <Background />

      {/* 1. Tiêu đề trên cùng bên trái */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 60,
          transform: `translateY(${titleY}px) rotate(${titleRotate}deg)`,
          transformOrigin: "top left",
          zIndex: 40,
        }}
      >
        <InkBlock borderPadding={10} style={{ padding: "14px 28px" }}>
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 54,
              color: theme.colors.yellow,
              letterSpacing: "2px",
            }}
          >
            BẠN CÓ BIẾT?
          </span>
        </InkBlock>
      </div>

      {/* 2. CHỮ SỐ TO 22 đập xuống ở khung 22 (Câu lệnh 23) */}
      <BigNumber
        number="22"
        label="TUỔI"
        subLabel="1831"
        slamFrame={22}
        x={560}
        y={150}
      />

      {/* 3. HÌNH CẮT MINH HỌA VÀO KIỂU TRƯỢT (Câu lệnh 23) */}
      <SlidingCutout
        src={staticFile("videos/darwin/assets/young-darwin.png")}
        enterFrame={22}
        exitFrame={242}
        startX={-650}
        targetX={40}
        targetY={580}
        width={490}
        direction="left"
        hasAccentSilhouette={true}
        hasBaseTape={true}
        alt="Young Charles Darwin"
      />

      {/* Nhãn tên "CHARLES DARWIN" đi kèm sau khi trượt vào */}
      {frame >= 59 && (
        <div
          style={{
            position: "absolute",
            bottom: 600,
            left: 50,
            transform: `scale(${darwinLabelScale}) rotate(-2deg)`,
            transformOrigin: "bottom left",
            zIndex: 38,
          }}
        >
          <PaperPiece
            n={10}
            style={{
              padding: "8px 20px",
              border: `2px solid ${theme.colors.ink}`,
            }}
          >
            <span
              style={{
                fontFamily: theme.fonts.fraunces,
                fontSize: 32,
                fontWeight: 700,
                color: theme.colors.ink,
              }}
            >
              Charles Darwin
            </span>
          </PaperPiece>
        </div>
      )}

      {/* 4. Tàu HMS Beagle (Frame 87+) */}
      {frame >= 87 && (
        <div
          style={{
            position: "absolute",
            top: 500,
            right: 30,
            transform: `translate(${shipX}px, ${shipY}px) rotate(${shipRocking}deg)`,
            transformOrigin: "bottom center",
            zIndex: 15,
          }}
        >
          <img
            src={staticFile("videos/darwin/assets/beagle.png")}
            alt="HMS Beagle"
            style={{
              width: "600px",
              height: "auto",
              filter: cutoutShadow,
              display: "block",
            }}
          />
        </div>
      )}

      {/* 5. Mẩu giấy nối "CHỈ ĐỂ LÀM BẠN" (Frame 154+) */}
      {frame >= 154 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: "50%",
            transform: `translateX(-50%) scale(${friendScale}) rotate(${friendRotate}deg)`,
            transformOrigin: "center center",
            zIndex: 45,
          }}
        >
          <div
            style={{
              backgroundColor: theme.colors.yellow,
              padding: "14px 28px",
              border: `3px solid ${theme.colors.ink}`,
              boxShadow: "6px 8px 0px rgba(27, 24, 21, 0.8)",
              transform: "skew(-2deg)",
            }}
          >
            <span
              style={{
                fontFamily: theme.fonts.anton,
                fontSize: 44,
                color: theme.colors.ink,
                letterSpacing: "2px",
              }}
            >
              CHỈ ĐỂ LÀM BẠN!
            </span>
          </div>
        </div>
      )}

      {/* 6. Thuyền trưởng Robert FitzRoy (Frame 196+) */}
      {frame >= 196 && (
        <div
          style={{
            position: "absolute",
            bottom: 580,
            right: 40,
            transform: `translateY(${fitzroyY}px) scale(${fitzroyScale})`,
            transformOrigin: "bottom right",
            zIndex: 30,
          }}
        >
          <img
            src={staticFile("videos/darwin/assets/fitzroy.png")}
            alt="Robert FitzRoy"
            style={{
              width: "460px",
              height: "auto",
              filter: cutoutShadow,
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 25,
              right: 10,
              transform: "rotate(3deg)",
              transformOrigin: "bottom right",
              zIndex: 35,
            }}
          >
            <InkBlock borderPadding={6} style={{ padding: "8px 18px" }}>
              <span
                style={{
                  fontFamily: theme.fonts.anton,
                  fontSize: 28,
                  color: theme.colors.paper,
                  letterSpacing: "1px",
                }}
              >
                THUYỀN TRƯỞNG FITZROY
              </span>
            </InkBlock>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
