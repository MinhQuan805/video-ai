import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Background } from "../../../../visual-systems/cutout-collage/Background";
import { NewspaperSnippet } from "../../../../visual-systems/cutout-collage/NewspaperSnippet";
import { theme } from "../../../../visual-systems/cutout-collage/theme";
import { InkBlock } from "../../../../visual-systems/cutout-collage/InkBlock";

export const Scene2: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Nền giấy và sàn xé răng cưa */}
      <Background />

      {/* Tiêu đề trên cùng */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 60,
          transform: "rotate(-1deg)",
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
            HỒ SƠ HẢI TRÌNH
          </span>
        </InkBlock>
      </div>

      {/* Mẩu báo rơi từ trên xuống, nảy, dán băng dính, quét dạ quang và dán ảnh xé mép */}
      <NewspaperSnippet
        sceneStartFrame={0}
        highlightFrame={18}
        imageFrame={26}
      />

      {/* Đồ vật bổ trợ: Đồng hồ hàng hải Marine Chronometer #509 đứng trên sàn ở góc trái dưới */}
      <div
        style={{
          position: "absolute",
          bottom: 560,
          left: 50,
          width: "280px",
          transform: "rotate(-3deg)",
          zIndex: 35,
          filter: "drop-shadow(6px 12px 18px rgba(27, 24, 21, 0.4))",
        }}
      >
        <img
          src={staticFile("videos/vox/darwin/assets/chronometer.png")}
          alt="Chronometer #509"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </AbsoluteFill>
  );
};
