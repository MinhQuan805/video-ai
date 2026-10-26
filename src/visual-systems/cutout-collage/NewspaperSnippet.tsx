import React from "react";
import { useCurrentFrame, interpolate, spring, staticFile } from "remotion";
import { theme } from "./theme";
import { PaperTextureOverlay } from "./PaperTexture";

export interface NewspaperSnippetProps {
  sceneStartFrame?: number;
  highlightFrame?: number; // Khung bút dạ quang quét
  imageFrame?: number;     // Khung dán ảnh góc dưới phải
  style?: React.CSSProperties;
}

export const NewspaperSnippet: React.FC<NewspaperSnippetProps> = ({
  sceneStartFrame = 0,
  highlightFrame = 18,
  imageFrame = 30,
  style,
}) => {
  const currentFrame = useCurrentFrame();
  const rel = currentFrame - sceneStartFrame;

  if (rel < 0) {
    return null;
  }

  // 1. Chuyển động rơi từ trên xuống trong 9 khung, nghiêng 15-20 độ
  // Chạm mặt giấy thì mảnh lún xuống rồi nảy trong 14 khung (9 -> 23)
  let y = 0;
  let rot = 0;
  let shadow = "0 8px 20px rgba(27, 24, 21, 0.3)";

  if (rel < 9) {
    // Đang rơi từ trên cao
    const tFall = rel / 9;
    y = interpolate(tFall, [0, 1], [-900, 0]);
    // Nghiêng 18 độ lúc bay
    rot = 18;
    // Bóng xa và nhoè
    shadow = "35px 55px 35px rgba(27, 24, 21, 0.45)";
  } else if (rel < 23) {
    // Chạm mặt giấy: bóng khép sát mép, lún xuống rồi nảy trong 14 khung
    const p = (rel - 9) / 14;
    // Lún xuống (+20px) rồi nảy về 0
    y = 22 * Math.exp(-3.2 * p) * Math.sin(p * 2.5 * Math.PI);
    // Góc nghiêng chuyển từ 18 độ về nằm tự nhiên -2 độ
    rot = interpolate(p, [0, 0.4, 1], [18, -4, -2]);
    shadow = "4px 8px 12px rgba(27, 24, 21, 0.35)";
  } else {
    y = 0;
    rot = -2;
    shadow = "4px 8px 14px rgba(27, 24, 21, 0.3)";
  }

  // 2. Miếng băng dính vàng trong mờ dán ở mép trên (hiện từ khung 12)
  const tapeSpring = spring({
    frame: Math.max(0, rel - 12),
    fps: 30,
    config: { damping: 11, stiffness: 120 },
  });

  // 3. Bút dạ quang vàng quét qua phần tít bọc trong dấu * (ở khung highlightFrame)
  const highlightProgress = interpolate(
    rel,
    [highlightFrame, highlightFrame + 12],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 4. Ảnh xé mép dán đè góc dưới bên phải ở khung imageFrame
  const imgSpring = spring({
    frame: Math.max(0, rel - imageFrame),
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });
  const imgScale = interpolate(imgSpring, [0, 1], [0.8, 1.0]);
  const imgOpacity = interpolate(imgSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 260,
        transform: `translateX(-50%) translateY(${y}px) rotate(${rot}deg)`,
        transformOrigin: "center center",
        width: "900px",
        backgroundColor: "#F3EEE2",
        boxShadow: shadow,
        border: `3px solid ${theme.colors.ink}`,
        padding: "36px 40px",
        boxSizing: "border-box",
        zIndex: 30,
        userSelect: "none",
        ...style,
      }}
    >
      <PaperTextureOverlay opacity={0.3} />

      {/* Miếng băng dính vàng trong mờ ở mép trên */}
      {rel >= 12 && (
        <div
          style={{
            position: "absolute",
            top: -16,
            left: "42%",
            width: "160px",
            height: "36px",
            backgroundColor: "rgba(255, 210, 63, 0.78)",
            boxShadow: "0 2px 6px rgba(27, 24, 21, 0.2)",
            transform: `scale(${tapeSpring}) rotate(-2.5deg)`,
            transformOrigin: "center center",
            zIndex: 50,
            borderLeft: "2px dashed rgba(27, 24, 21, 0.3)",
            borderRight: "2px dashed rgba(27, 24, 21, 0.3)",
          }}
        />
      )}

      {/* Tên báo chung: Nhật ký hải trình */}
      <div
        style={{
          borderBottom: `2px solid ${theme.colors.ink}`,
          paddingBottom: "10px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.anton,
            fontSize: 52,
            letterSpacing: "4px",
            color: theme.colors.ink,
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          NHẬT KÝ HẢI TRÌNH
        </div>

        {/* Dòng ngày và mục */}
        <div
          style={{
            fontFamily: theme.fonts.beVietnamPro,
            fontSize: 18,
            fontWeight: 700,
            color: "#6E675B",
            letterSpacing: "1.5px",
            marginTop: "6px",
            textTransform: "uppercase",
            borderTop: `1px solid ${theme.colors.ink}`,
            paddingTop: "6px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>SỐ 1831 · NĂM 1831</span>
          <span>CHUYẾN ĐI CỦA TÀU BEAGLE</span>
          <span>MỤC THỜI SỰ HẢI NGOẠI</span>
        </div>
      </div>

      {/* Tít chữ có chân đậm (Fraunces) */}
      <div style={{ marginTop: "24px" }}>
        <h1
          style={{
            fontFamily: theme.fonts.fraunces,
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.25,
            color: theme.colors.ink,
            margin: 0,
          }}
        >
          Dự kiến:{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            {/* Vệt dạ quang quét qua tít bọc trong dấu * */}
            <span
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: -4,
                width: `${highlightProgress}%`,
                backgroundColor: "rgba(255, 210, 63, 0.85)",
                zIndex: -1,
                borderRadius: "4px",
                transform: "rotate(-1deg)",
              }}
            />
            *2 NĂM*
          </span>{" "}
          — Thực tế:{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: -4,
                width: `${highlightProgress}%`,
                backgroundColor: "rgba(255, 210, 63, 0.85)",
                zIndex: -1,
                borderRadius: "4px",
                transform: "rotate(1deg)",
              }}
            />
            *GẦN 5 NĂM TRỜI*
          </span>
        </h1>

        {/* Một dòng in nghiêng dưới tít */}
        <div
          style={{
            fontFamily: theme.fonts.fraunces,
            fontSize: 24,
            fontStyle: "italic",
            color: "#4A443B",
            marginTop: "10px",
            lineHeight: 1.3,
          }}
        >
          Chuyến khảo sát Nam Mỹ kéo dài gấp đôi dự tính ban đầu của Đô đốc Hải quân Anh
        </div>
      </div>

      {/* Phần dưới là các vạch xám giả chữ theo 2 cột */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "1px solid #D6CEBE",
        }}
      >
        {/* Cột 1 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ height: "8px", width: "95%", backgroundColor: "#C2BAAA", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "100%", backgroundColor: "#D4CCBC", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "88%", backgroundColor: "#C2BAAA", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "96%", backgroundColor: "#D4CCBC", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "70%", backgroundColor: "#C2BAAA", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "90%", backgroundColor: "#D4CCBC", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "82%", backgroundColor: "#C2BAAA", borderRadius: "2px" }} />
        </div>

        {/* Cột 2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ height: "8px", width: "98%", backgroundColor: "#D4CCBC", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "85%", backgroundColor: "#C2BAAA", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "92%", backgroundColor: "#D4CCBC", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "65%", backgroundColor: "#C2BAAA", borderRadius: "2px" }} />
          <div style={{ height: "8px", width: "90%", backgroundColor: "#D4CCBC", borderRadius: "2px" }} />
        </div>
      </div>

      {/* 4. Ảnh xé mép dán đè góc dưới bên phải ở khung imageFrame */}
      {rel >= imageFrame && (
        <div
          style={{
            position: "absolute",
            bottom: -50,
            right: -30,
            width: "360px",
            transform: `scale(${imgScale}) rotate(4deg)`,
            transformOrigin: "bottom right",
            opacity: imgOpacity,
            zIndex: 40,
            filter: "drop-shadow(6px 10px 14px rgba(27, 24, 21, 0.45))",
          }}
        >
          <img
            src={staticFile("videos/vox/darwin/assets/beagle-painting.png")}
            alt="HMS Beagle Painting"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      )}
    </div>
  );
};
