import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTypewriter } from "../physics";

export interface ClaudeChatBoxProps {
  width?: number;
  height?: number;
  linkChipText?: string;
  linkChipIcon?: "github" | "link";
  inputText?: string;
  delay?: number;
  typewriterDelay?: number;
  style?: React.CSSProperties;
}

/**
 * ClaudeChatBox: Hộp nhập lệnh Prompt của Claude / AI tương tác sống động.
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + Sau khi gõ xong câu hỏi, nút Send cam Terracotta phát sóng nhịp nảy sẵn sàng gửi.
 *   + Con trỏ nhấp nháy đều đặn.
 *   + Toàn bộ hộp thoại bồng bềnh hữu cơ.
 */
export const ClaudeChatBox: React.FC<ClaudeChatBoxProps> = ({
  width = 460,
  height = 240,
  linkChipText = "github.com/remotion-dev/remotion",
  linkChipIcon = "github",
  inputText = "Phân tích và dựng video ngắn tự động bằng React",
  delay = 4,
  typewriterDelay = 10,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 30,
    startScale: 0.94,
    enableIdleFloat: true,
  });

  const chipEntrance = getSmoothEntrance({
    frame,
    fps,
    delay: delay + 4,
    config: SPRING_PRESETS.pop,
    distanceY: 14,
    startScale: 0.9,
    enableIdleFloat: false,
  });

  const typewriter = getTypewriter(inputText, frame, typewriterDelay, 1.2);

  // Nút gửi nảy xung nhịp khi đã có chữ trong ô
  const isReadyToSend = typewriter.isComplete;
  const sendButtonPulse = isReadyToSend ? 1 + Math.sin(frame * 0.2) * 0.08 : 1;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: COLORS.cardBg,
        borderRadius: 22,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        flexDirection: "column",
        padding: "18px 22px",
        boxSizing: "border-box",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Header Hộp thoại */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingBottom: 14,
          borderBottom: `1px solid ${COLORS.divider}`,
        }}
      >
        {/* Logo hoa thị Claude */}
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L13.8 8.6L20.4 7L15.6 11.8L21.8 14.8L15.2 16.4L17 23L12 18.6L7 23L8.8 16.4L2.2 14.8L8.4 11.8L3.6 7L10.2 8.6L12 2Z"
            fill={COLORS.terracotta}
          />
        </svg>
        <span
          style={{
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 16,
            color: COLORS.inkPrimary,
            letterSpacing: "-0.3px",
          }}
        >
          Claude
        </span>
      </div>

      {/* Nội dung Input Box */}
      <div style={{ flex: 1, paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Chip liên kết (Link Chip) */}
        {linkChipText && (
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#FAF9F6",
              border: `1.5px solid ${COLORS.terracottaLight}`,
              borderRadius: 10,
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              transform: `translateY(${chipEntrance.translateY}px) scale(${chipEntrance.scale})`,
              opacity: chipEntrance.opacity,
            }}
          >
            {/* GitHub icon */}
            <svg width={14} height={14} viewBox="0 0 24 24" fill={COLORS.inkPrimary}>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontWeight: 600,
                fontSize: 12,
                color: COLORS.inkPrimary,
              }}
            >
              {linkChipText}
            </span>
          </div>
        )}

        {/* Text gõ hoặc con trỏ nhấp nháy */}
        <div style={{ fontFamily: FONTS.inter, fontSize: 14, color: COLORS.inkPrimary, minHeight: 28, lineHeight: 1.4 }}>
          {typewriter.displayedText}
          <span
            style={{
              color: COLORS.terracotta,
              fontWeight: 800,
              fontSize: 18,
              opacity: typewriter.showCursor ? 1 : 0,
            }}
          >
            |
          </span>
        </div>
      </div>

      {/* Nút gửi tròn màu cam đất ở góc phải dưới */}
      <div
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: COLORS.terracotta,
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isReadyToSend ? SHADOWS.glowAccent : SHADOWS.sticker,
          fontSize: 18,
          fontWeight: 700,
          transform: `scale(${sendButtonPulse})`,
        }}
      >
        ↑
      </div>
    </div>
  );
};
