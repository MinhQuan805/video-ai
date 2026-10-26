import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Background } from "../../../../visual-systems/cutout-collage/Background";
import { PopUpCharacter } from "../../../../visual-systems/cutout-collage/PopUpCharacter";
import { theme } from "../../../../visual-systems/cutout-collage/theme";
import { InkBlock } from "../../../../visual-systems/cutout-collage/InkBlock";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Tờ giấy kẻ dòng gập đôi bung lên (ở phía sau)
  const foldRel = frame;
  let paperFoldRot = 0;
  if (foldRel < 16) {
    paperFoldRot = interpolate(foldRel, [0, 16], [-70, 0]);
  } else if (foldRel < 32) {
    const p = (foldRel - 16) / 16;
    paperFoldRot = 6 * Math.exp(-3 * p) * Math.cos(p * 2 * Math.PI);
  } else {
    paperFoldRot = 0;
  }

  // 2. Dải tên đen chữ trắng đập xuống ngang ngực (khung 24+)
  const nameSpring = spring({
    frame: Math.max(0, frame - 24),
    fps: 30,
    config: { damping: 11, stiffness: 120 },
  });
  const nameScale = interpolate(nameSpring, [0, 1], [1.8, 1.0]);
  const nameRot = interpolate(nameSpring, [0, 1], [6, -1]);

  // 3. Dòng vai trò hiện sau dải tên (khung 32+)
  const roleSpring = spring({
    frame: Math.max(0, frame - 32),
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });

  // 4. Mảnh giấy vàng ghi chú dán băng dính (khung 45+)
  const noteSpring = spring({
    frame: Math.max(0, frame - 45),
    fps: 30,
    config: { damping: 10, stiffness: 90 },
  });

  // 5. Bong bóng thoại câu nói thật sự trong nguồn của Darwin (khung 60+)
  const speechSpring = spring({
    frame: Math.max(0, frame - 60),
    fps: 30,
    config: { damping: 12, stiffness: 110 },
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
          transform: "rotate(-1.5deg)",
          zIndex: 40,
        }}
      >
        <InkBlock borderPadding={8} style={{ padding: "12px 24px" }}>
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 44,
              color: theme.colors.yellow,
              letterSpacing: "2px",
            }}
          >
            HỒ SƠ NHÂN VẬT
          </span>
        </InkBlock>
      </div>

      {/* BÊN PHẢI: TỜ GIẤY KẺ DÒNG GẬP ĐÔI BUNG LÊN */}
      <div
        style={{
          position: "absolute",
          top: 240,
          right: 50,
          width: "520px",
          height: "820px",
          backgroundColor: "#FAF6EC",
          border: `2px solid ${theme.colors.ink}`,
          boxShadow: "0 10px 24px rgba(27, 24, 21, 0.25)",
          padding: "36px 30px",
          boxSizing: "border-box",
          transformOrigin: "bottom center",
          transform: `rotateX(${paperFoldRot}deg)`,
          zIndex: 10,
        }}
      >
        {/* Nếp gập giữa tờ giấy */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            borderBottom: "1px dashed rgba(27, 24, 21, 0.3)",
          }}
        />

        {/* Các dòng kẻ xanh nhạt kiểu sổ tay vintage */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "12px" }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "rgba(120, 140, 160, 0.25)",
              }}
            />
          ))}
        </div>

        {/* CỘT NỘI DUNG TRÊN GIẤY KẺ DÒNG */}
        <div style={{ position: "absolute", top: 40, left: 30, right: 30, zIndex: 15 }}>
          {/* Dải tên đen chữ trắng đập xuống ngang ngực */}
          {frame >= 24 && (
            <div
              style={{
                transform: `scale(${nameScale}) rotate(${nameRot}deg)`,
                transformOrigin: "left center",
              }}
            >
              <div
                style={{
                  backgroundColor: theme.colors.ink,
                  padding: "14px 24px",
                  boxShadow: "5px 7px 0px rgba(224, 64, 28, 0.9)",
                  border: "2px solid #FFFFFF",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    fontFamily: theme.fonts.anton,
                    fontSize: 46,
                    color: "#FFFFFF",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  CHARLES DARWIN
                </span>
              </div>
            </div>
          )}

          {/* Dòng vai trò dưới dải tên */}
          {frame >= 32 && (
            <div
              style={{
                marginTop: "16px",
                transform: `scale(${interpolate(roleSpring, [0, 1], [0.8, 1.0])})`,
                transformOrigin: "left center",
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.fraunces,
                  fontSize: 26,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#3A352C",
                  lineHeight: 1.3,
                  display: "block",
                }}
              >
                Nhà tự nhiên học trên tàu HMS Beagle (1831–1836)
              </span>
            </div>
          )}

          {/* Mảnh giấy vàng ghi chú dán băng dính */}
          {frame >= 45 && (
            <div
              style={{
                marginTop: "48px",
                transform: `scale(${interpolate(noteSpring, [0, 1], [0.7, 1.0])}) rotate(-3deg)`,
                transformOrigin: "top left",
              }}
            >
              <div
                style={{
                  position: "relative",
                  backgroundColor: theme.colors.yellow,
                  padding: "20px 24px",
                  border: `2px solid ${theme.colors.ink}`,
                  boxShadow: "4px 6px 0px rgba(27, 24, 21, 0.8)",
                  maxWidth: "420px",
                }}
              >
                {/* Miếng băng dính dán chéo góc trên trái */}
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 20,
                    width: "90px",
                    height: "26px",
                    backgroundColor: "rgba(243, 238, 226, 0.85)",
                    transform: "rotate(-18deg)",
                    border: "1px dashed rgba(27, 24, 21, 0.3)",
                  }}
                />

                <div
                  style={{
                    fontFamily: theme.fonts.anton,
                    fontSize: 34,
                    color: theme.colors.accent,
                    letterSpacing: "1px",
                  }}
                >
                  SAY SÓNG TRIỀN MIÊN!
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.beVietnamPro,
                    fontSize: 22,
                    fontWeight: 700,
                    color: theme.colors.ink,
                    marginTop: "6px",
                    lineHeight: 1.3,
                  }}
                >
                  Dành hẳn <span style={{ color: theme.colors.accent }}>3 năm 3 tháng</span> khám phá trên đất liền
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BÊN TRÁI: NHÂN VẬT BUNG POP-UP (Nếp gập 56% dưới cằm) */}
      <div
        style={{
          position: "absolute",
          bottom: 560,
          left: 40,
          zIndex: 30,
        }}
      >
        <PopUpCharacter
          src={staticFile("videos/vox/darwin/assets/young-darwin.png")}
          startFrame={0}
          width={470}
          height={560}
          splitPercent={56}
          hasAccentSilhouette={true}
        />
      </div>

      {/* Bong bóng thoại câu nói có thật trong nguồn của Darwin */}
      {frame >= 60 && (
        <div
          style={{
            position: "absolute",
            bottom: 1160,
            left: 220,
            transform: `scale(${interpolate(speechSpring, [0, 1], [0.5, 1.0])}) rotate(2deg)`,
            transformOrigin: "bottom left",
            zIndex: 45,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: `3px solid ${theme.colors.ink}`,
              padding: "16px 24px",
              borderRadius: "18px",
              boxShadow: "4px 6px 12px rgba(27, 24, 21, 0.3)",
              maxWidth: "340px",
            }}
          >
            <div
              style={{
                fontFamily: theme.fonts.fraunces,
                fontSize: 22,
                fontStyle: "italic",
                color: theme.colors.ink,
                lineHeight: 1.3,
              }}
            >
              "Tôi ghét từng con sóng của đại dương..."
            </div>
            <div
              style={{
                fontFamily: theme.fonts.beVietnamPro,
                fontSize: 16,
                fontWeight: 700,
                color: "#7E7568",
                marginTop: "4px",
                textAlign: "right",
              }}
            >
              — Thư gửi gia đình, 1832
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
