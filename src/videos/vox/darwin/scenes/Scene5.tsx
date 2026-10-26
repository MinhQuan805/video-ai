import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Background } from "../../../../visual-systems/cutout-collage/Background";
import { InkBlock } from "../../../../visual-systems/cutout-collage/InkBlock";
import { PaperPiece } from "../../../../visual-systems/cutout-collage/PaperPiece";
import { theme } from "../../../../visual-systems/cutout-collage/theme";

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Tiêu đề câu hỏi mở đầu: "NẾU TỪ CHỐI..." (khung 0 - 65)
  const introSpring = spring({
    frame,
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });

  // 2. Mảnh tranh tàu Beagle thời điểm khởi hành (khung 0 -> mờ đi nhường chỗ ở khung 68)
  const shipFade = interpolate(frame, [65, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shipScale = interpolate(frame, [0, 65], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dấu mộc mực đỏ "TỪ CHỐI?" đập xuống lúc giọng đọc nói "từ chối" (khung 12+)
  const stampSpring = spring({
    frame: Math.max(0, frame - 12),
    fps: 30,
    config: { damping: 10, stiffness: 140 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1.0]);
  const stampRot = interpolate(stampSpring, [0, 1], [-18, -8]);

  // 3. Hai mảnh tư liệu khoa học: Cây tiến hóa 1837 và Sách Nguồn gốc các loài 1859 (khung 68+)
  const docRel = Math.max(0, frame - 68);
  const docSpring = spring({
    frame: docRel,
    fps: 30,
    config: { damping: 12, stiffness: 90 },
  });

  // 4. Nhãn "THUYẾT TIẾN HÓA" (khung 73+)
  const evoRel = Math.max(0, frame - 73);
  const evoSpring = spring({
    frame: evoRel,
    fps: 30,
    config: { damping: 11, stiffness: 120 },
  });

  // 5. Thẻ câu hỏi cao trào "MUỘN HƠN HÀNG THẬP KỶ?" đập xuống (khung 108+)
  const questionRel = Math.max(0, frame - 108);
  const questionSpring = spring({
    frame: questionRel,
    fps: 30,
    config: { damping: 10, stiffness: 130 },
  });
  const questionScale = interpolate(questionSpring, [0, 1], [1.9, 1.0]);
  const questionRot = interpolate(questionSpring, [0, 1], [8, -2]);

  // 6. Dấu hỏi lớn màu nhấn "?" bật nảy (khung 116+)
  const qMarkSpring = spring({
    frame: Math.max(0, frame - 116),
    fps: 30,
    config: { damping: 9, stiffness: 150 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background />

      {/* Header: Nhãn đặt vấn đề trên cùng */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 60,
          transform: `scale(${introSpring}) rotate(-1deg)`,
          transformOrigin: "top left",
          zIndex: 40,
        }}
      >
        <InkBlock borderPadding={8} style={{ padding: "12px 28px" }}>
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 44,
              color: theme.colors.yellow,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            NẾU NĂM ĐÓ TỪ CHỐI...
          </span>
        </InkBlock>
      </div>

      {/* GIAI ĐOẠN 1: Mảnh tàu Beagle với con dấu đỏ TỪ CHỐI? */}
      {shipFade > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 260,
            transform: `translateX(-50%) scale(${shipScale})`,
            opacity: shipFade,
            zIndex: 20,
          }}
        >
          <PaperPiece
            n={16}
            style={{
              padding: "16px",
              backgroundColor: "#F3EEE2",
              border: `2px solid ${theme.colors.ink}`,
              boxShadow: "0 14px 32px rgba(27, 24, 21, 0.3)",
              position: "relative",
            }}
          >
            <img
              src={staticFile("videos/vox/darwin/assets/ship-painting.png")}
              alt="HMS Beagle"
              style={{
                width: 780,
                height: "auto",
                display: "block",
              }}
            />

            {/* Dấu mộc mực đỏ TỪ CHỐI đập chéo lên tàu */}
            {frame >= 12 && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "48%",
                  transform: `translate(-50%, -50%) scale(${stampScale}) rotate(${stampRot}deg)`,
                  border: `6px solid ${theme.colors.accent}`,
                  padding: "10px 32px",
                  backgroundColor: "rgba(251, 250, 247, 0.92)",
                  boxShadow: "0 4px 16px rgba(224, 64, 28, 0.4)",
                  zIndex: 30,
                }}
              >
                <span
                  style={{
                    fontFamily: theme.fonts.anton,
                    fontSize: 72,
                    color: theme.colors.accent,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  TỪ CHỐI?
                </span>
              </div>
            )}
          </PaperPiece>
        </div>
      )}

      {/* GIAI ĐOẠN 2: Tư liệu khoa học & câu hỏi kết (khung 68+) */}
      {frame >= 68 && (
        <>
          {/* Mảnh 1: Cây tiến hóa 1837 (bên trái) */}
          <div
            style={{
              position: "absolute",
              left: 70,
              top: 260,
              transform: `scale(${docSpring}) rotate(-3deg)`,
              transformOrigin: "center center",
              zIndex: 22,
            }}
          >
            <PaperPiece
              n={14}
              style={{
                padding: "12px",
                backgroundColor: "#F3EEE2",
                border: `2px solid ${theme.colors.ink}`,
                width: 420,
              }}
            >
              <img
                src={staticFile("videos/vox/darwin/assets/darwin-tree.png")}
                alt="Darwin Tree 1837"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontFamily: theme.fonts.beVietnamPro,
                  fontSize: 18,
                  fontWeight: 700,
                  color: theme.colors.ink,
                  textAlign: "center",
                }}
              >
                Sơ đồ cây tiến hóa (1837)
              </div>
            </PaperPiece>
          </div>

          {/* Mảnh 2: Bìa sách Nguồn gốc các loài 1859 (bên phải) */}
          <div
            style={{
              position: "absolute",
              right: 70,
              top: 280,
              transform: `scale(${docSpring}) rotate(3.5deg)`,
              transformOrigin: "center center",
              zIndex: 23,
            }}
          >
            <PaperPiece
              n={14}
              style={{
                padding: "12px",
                backgroundColor: "#F3EEE2",
                border: `2px solid ${theme.colors.ink}`,
                width: 420,
              }}
            >
              <img
                src={staticFile("videos/vox/darwin/assets/origin-of-species.png")}
                alt="Origin of Species"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontFamily: theme.fonts.beVietnamPro,
                  fontSize: 18,
                  fontWeight: 700,
                  color: theme.colors.ink,
                  textAlign: "center",
                }}
              >
                Nguồn gốc các loài (1859)
              </div>
            </PaperPiece>
          </div>

          {/* Nhãn giữa: "THUYẾT TIẾN HÓA" (khung 73+) */}
          {frame >= 73 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 760,
                transform: `translateX(-50%) scale(${evoSpring}) rotate(-1.5deg)`,
                transformOrigin: "center center",
                zIndex: 35,
              }}
            >
              <InkBlock borderPadding={8} style={{ padding: "12px 30px" }}>
                <span
                  style={{
                    fontFamily: theme.fonts.anton,
                    fontSize: 52,
                    color: theme.colors.yellow,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  THUYẾT TIẾN HÓA
                </span>
              </InkBlock>
            </div>
          )}

          {/* Thẻ câu hỏi cao trào đập xuống: "MUỘN HƠN HÀNG THẬP KỶ?" (khung 108+) */}
          {frame >= 108 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 890,
                transform: `translateX(-50%) scale(${questionScale}) rotate(${questionRot}deg)`,
                transformOrigin: "center center",
                zIndex: 45,
                width: 900,
              }}
            >
              <PaperPiece
                n={22}
                style={{
                  padding: "24px 30px",
                  backgroundColor: "#F3EEE2",
                  border: `3px solid ${theme.colors.ink}`,
                  boxShadow: "0 16px 36px rgba(27, 24, 21, 0.4)",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Vạch bút dạ quang vàng sau chữ */}
                <div
                  style={{
                    position: "absolute",
                    left: 40,
                    right: 40,
                    top: 20,
                    bottom: 20,
                    backgroundColor: "rgba(255, 210, 63, 0.35)",
                    transform: "rotate(-0.5deg)",
                    zIndex: 0,
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: theme.fonts.anton,
                      fontSize: 58,
                      color: theme.colors.accent,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      display: "block",
                      lineHeight: 1.15,
                    }}
                  >
                    MUỘN HƠN HÀNG THẬP KỶ?
                  </span>
                  <div
                    style={{
                      marginTop: 10,
                      fontFamily: theme.fonts.fraunces,
                      fontSize: 26,
                      fontStyle: "italic",
                      color: theme.colors.ink,
                    }}
                  >
                    Lịch sử sinh học có lẽ đã rẽ sang một hướng khác.
                  </div>
                </div>

                {/* Dấu hỏi chấm khổng lồ màu nhấn ghim ở góc trên phải */}
                {frame >= 116 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -30,
                      top: -45,
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      backgroundColor: theme.colors.accent,
                      border: `4px solid ${theme.colors.paper}`,
                      boxShadow: "0 6px 18px rgba(224, 64, 28, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${qMarkSpring}) rotate(12deg)`,
                      zIndex: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: theme.fonts.anton,
                        fontSize: 66,
                        color: "#FFFFFF",
                        lineHeight: 1,
                      }}
                    >
                      ?
                    </span>
                  </div>
                )}
              </PaperPiece>
            </div>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
