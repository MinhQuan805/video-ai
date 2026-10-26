import React from "react";
import {
  AbsoluteFill,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Background } from "../../../../visual-systems/cutout-collage/Background";
import { PageFlip } from "../../../../visual-systems/cutout-collage/PageFlip";
import { TornReveal } from "../../../../visual-systems/cutout-collage/TornReveal";
import { InkBlock } from "../../../../visual-systems/cutout-collage/InkBlock";
import { theme } from "../../../../visual-systems/cutout-collage/theme";

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Tiêu đề Cảnh 4
  const headerSpring = spring({
    frame,
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });

  // 2. Huy hiệu "CHỈ 5 TUẦN" (khung 18+)
  const badgeSpring = spring({
    frame: Math.max(0, frame - 18),
    fps: 30,
    config: { damping: 10, stiffness: 120 },
  });

  // 3. Nhãn biến chuyển "ĐÃ LÀM THAY ĐỔI TẤT CẢ" (khung 90+)
  const changeSpring = spring({
    frame: Math.max(0, frame - 90),
    fps: 30,
    config: { damping: 11, stiffness: 110 },
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background />

      {/* Tiêu đề trên cùng */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 60,
          transform: `scale(${headerSpring}) rotate(-1.5deg)`,
          transformOrigin: "top left",
          zIndex: 40,
        }}
      >
        <InkBlock borderPadding={8} style={{ padding: "12px 26px" }}>
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 44,
              color: theme.colors.yellow,
              letterSpacing: "2px",
            }}
          >
            BƯỚC NGOẶT GALAPAGOS
          </span>
        </InkBlock>
      </div>

      {/* TẤM ALBUM MẪU VẬT VÀO BẰNG LẬT TRANG (PAGE FLIP - Câu lệnh 26) */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: "50%",
          transform: "translateX(-50%)",
          width: "920px",
          zIndex: 25,
        }}
      >
        <PageFlip startFrame={0}>
          <div
            style={{
              backgroundColor: "#F3EEE2",
              border: `3px solid ${theme.colors.ink}`,
              boxShadow: "0 12px 30px rgba(27, 24, 21, 0.35)",
              padding: "36px 32px",
              boxSizing: "border-box",
            }}
          >
            {/* Thanh tiêu đề sổ tay mẫu vật */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `2px solid ${theme.colors.ink}`,
                paddingBottom: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.anton,
                  fontSize: 32,
                  color: theme.colors.ink,
                  letterSpacing: "1.5px",
                }}
              >
                SỔ TAY MẪU VẬT · QUẦN ĐẢO GALAPAGOS (1835)
              </span>

              {/* Huy hiệu 5 TUẦN */}
              <div
                style={{
                  transform: `scale(${badgeSpring}) rotate(3deg)`,
                  backgroundColor: theme.colors.accent,
                  color: "#FFFFFF",
                  fontFamily: theme.fonts.anton,
                  fontSize: 26,
                  padding: "4px 14px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(27, 24, 21, 0.3)",
                }}
              >
                CHỈ 5 TUẦN!
              </div>
            </div>

            {/* Ảnh các loài chim sẻ Galapagos (John Gould 1845) */}
            <div style={{ marginTop: "24px", position: "relative" }}>
              <img
                src={staticFile("videos/vox/darwin/assets/finches.png")}
                alt="Darwin's Finches"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(4px 8px 12px rgba(27, 24, 21, 0.3))",
                }}
              />
            </div>

            {/* Dải xé giấy lộ ra ghi chú khảo sát (khung 40+) */}
            {frame >= 40 && (
              <div style={{ marginTop: "18px" }}>
                <TornReveal startFrame={40} duration={12}>
                  <div
                    style={{
                      backgroundColor: theme.colors.paper,
                      padding: "14px 20px",
                      border: `2px solid ${theme.colors.ink}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: theme.fonts.fraunces,
                        fontSize: 24,
                        fontWeight: 700,
                        color: theme.colors.ink,
                      }}
                    >
                      Bản khắc 4 loài chim sẻ với hình dạng mỏ thích nghi đặc thù
                    </span>
                    <span
                      style={{
                        fontFamily: theme.fonts.beVietnamPro,
                        fontSize: 18,
                        color: "#6B6356",
                      }}
                    >
                      Nền tảng quan trọng giúp Darwin hình thành thuyết Chọn lọc tự nhiên
                    </span>
                  </div>
                </TornReveal>
              </div>
            )}
          </div>
        </PageFlip>
      </div>

      {/* Dán đè: ĐÃ LÀM THAY ĐỔI TẤT CẢ (khung 90+) */}
      {frame >= 90 && (
        <div
          style={{
            position: "absolute",
            bottom: 560,
            left: "50%",
            transform: `translateX(-50%) scale(${changeSpring}) rotate(-3deg)`,
            transformOrigin: "center center",
            zIndex: 45,
          }}
        >
          <div
            style={{
              backgroundColor: theme.colors.yellow,
              padding: "16px 36px",
              border: `3px solid ${theme.colors.ink}`,
              boxShadow: "6px 8px 0px rgba(27, 24, 21, 0.85)",
            }}
          >
            <span
              style={{
                fontFamily: theme.fonts.anton,
                fontSize: 44,
                color: theme.colors.accent,
                letterSpacing: "2px",
              }}
            >
              ĐÃ LÀM THAY ĐỔI HOÀN TOÀN!
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
