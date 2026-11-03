import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getPendulumSwing, getSmoothEntrance } from "../physics";

export interface PaperHangtagProps {
  text: string;
  stringLength?: number;
  width?: number;
  height?: number;
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * PaperHangtag: Thẻ nhãn giấy treo bằng sợi dây mảnh từ icon xuống (như thẻ "miễn phí" trong video mẫu 5).
 * Tích hợp con lắc vật lý tắt dần (Damped Harmonic Oscillation) tạo chuyển động đung đưa chân thực.
 */
export const PaperHangtag: React.FC<PaperHangtagProps> = ({
  text,
  stringLength = 48,
  width = 138,
  height = 54,
  delay = 8,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance xuất hiện rơi xuống
  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: -20,
    startScale: 0.9,
  });

  // Dao động con lắc xoay quanh điểm móc dây trên cùng
  const swingAngle = getPendulumSwing(frame, delay + 4, 18, 0.32, 0.11);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transformOrigin: "top center",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${swingAngle.toFixed(2)}deg)`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Sợi dây treo mảnh */}
      <div
        style={{
          width: 1.5,
          height: stringLength,
          backgroundColor: COLORS.inkPrimary,
          opacity: 0.75,
        }}
      />

      {/* Thẻ nhãn giấy hình vát góc nhẹ */}
      <div
        style={{
          position: "relative",
          width,
          height,
          backgroundColor: COLORS.terracotta,
          borderRadius: "8px 8px 10px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: SHADOWS.sticker,
          marginTop: -2,
        }}
      >
        {/* Lỗ khuyên xỏ dây tròn */}
        <div
          style={{
            position: "absolute",
            top: 5,
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
          }}
        />

        {/* Chữ trên nhãn giấy Serif nghiêng thanh nhã */}
        <span
          style={{
            fontFamily: FONTS.frauncesItalic,
            fontStyle: "italic",
            fontSize: 22,
            fontWeight: 700,
            color: "#FFFFFF",
            marginTop: 4,
            letterSpacing: "0.2px",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
