import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTypewriter } from "../physics";

export type PhonePreset = "chatgpt" | "caltracker" | "custom";

export interface PhoneMockupProps {
  width?: number;
  height?: number;
  preset?: PhonePreset;
  promptText?: string;
  delay?: number;
  typewriterDelay?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * PhoneMockup: Khung điện thoại iPhone siêu thực tương tác sống động.
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + ChatGPT: Sau khi gõ xong câu hỏi, xuất hiện 3 chấm suy nghĩ nảy (Thinking Dots `● ● ●`).
 *   + CalTracker: Vòng đo calories thở nhịp tim, thông số calo biến thiên sống.
 *   + Dynamic Island co giãn nhẹ nhàng tạo sự sống.
 */
export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  width = 300,
  height = 580,
  preset = "chatgpt",
  promptText = "What have you figured out about me that I never directly told you?",
  delay = 5,
  typewriterDelay = 12,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 36,
    startScale: 0.92,
    enableIdleFloat: true,
  });

  const typewriter = getTypewriter(promptText, frame, typewriterDelay, 1.2);

  // Dynamic Island co giãn nhẹ (Subtle Pulse)
  const islandWidth = 74 + Math.sin(frame * 0.08) * 3;

  const renderContent = () => {
    if (preset === "chatgpt") {
      const thinkingStart = typewriterDelay + promptText.length / 1.2 + 8;
      const showThinking = frame > thinkingStart;

      return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px 14px", boxSizing: "border-box" }}>
          {/* Header ChatGPT */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 16, color: COLORS.inkPrimary, fontWeight: 700 }}>≡</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: FONTS.inter, fontWeight: 700, fontSize: 14 }}>
              ChatGPT <span style={{ fontSize: 10, color: COLORS.inkMuted }}>⌄</span>
            </div>
            <div style={{ fontSize: 14, color: COLORS.inkPrimary }}></div>
          </div>

          {/* Chat Bubble / Input Area */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: `1.5px solid ${COLORS.inkPrimary}`,
              borderRadius: 16,
              padding: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              position: "relative",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.inter,
                fontSize: 13,
                lineHeight: 1.45,
                color: COLORS.inkPrimary,
                minHeight: 60,
              }}
            >
              {typewriter.displayedText}
              {typewriter.showCursor && (
                <span style={{ color: COLORS.terracotta, fontWeight: 700 }}>|</span>
              )}
            </div>

            {/* Bottom Actions trong Input */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <span style={{ fontSize: 18, color: COLORS.inkMuted, fontWeight: 600 }}>+</span>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: COLORS.inkPrimary,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                ↑
              </div>
            </div>
          </div>

          {/* 3 chấm AI đang suy nghĩ nảy liên tục */}
          {showThinking && (
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#F2EFE9",
                borderRadius: 14,
                padding: "8px 14px",
                display: "flex",
                gap: 5,
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              {[0, 1, 2].map((dotIdx) => {
                const bounce = Math.sin((frame - thinkingStart) * 0.25 - dotIdx * 0.8) * 3;
                return (
                  <div
                    key={dotIdx}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: COLORS.terracotta,
                      transform: `translateY(${bounce}px)`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Gợi ý Quick Prompt Tag */}
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 20,
              padding: "5px 14px",
              fontFamily: FONTS.inter,
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.inkPrimary,
            }}
          >
            Guess
          </div>
        </div>
      );
    }

    if (preset === "caltracker") {
      // Vòng tròn calories thở nhịp sống
      const ringPulse = Math.sin(frame * 0.08) * 4;
      const liveCalories = 1250 + Math.round(Math.sin(frame * 0.04) * 5);

      return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px 12px", boxSizing: "border-box" }}>
          {/* App Titlebar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13 }}>
               CalTracker
            </div>
            <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#E5E5EA" }} />
          </div>

          {/* Vòng tròn đo Calories */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 26, color: COLORS.inkPrimary }}>
                {liveCalories}
              </div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 10, color: COLORS.inkMuted }}>
                Calories left
              </div>
            </div>

            {/* Circular Ring SVG */}
            <svg width={56} height={56} viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#F2F2F7" strokeWidth="4" />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke={COLORS.inkPrimary}
                strokeWidth="4"
                strokeDasharray="100"
                strokeDashoffset={35 + ringPulse}
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
              />
              <circle cx="20" cy="20" r="3" fill={COLORS.inkPrimary} />
            </svg>
          </div>

          {/* Macro Nutrient Pills */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 6, marginBottom: 14 }}>
            {[
              { val: "140g", label: "Protein", color: "#FF9500" },
              { val: "236g", label: "Carbs", color: "#34C759" },
              { val: "62g", label: "Fats", color: "#007AFF" },
            ].map((m, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  padding: "8px 6px",
                  textAlign: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 12, color: COLORS.inkPrimary }}>
                  {m.val}
                </div>
                <div style={{ fontFamily: FONTS.inter, fontSize: 9, color: m.color, fontWeight: 600 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Recent list item */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
              
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 11 }}>Avocado toast</div>
              <div style={{ fontFamily: FONTS.inter, fontSize: 9, color: COLORS.inkMuted }}> 420 cal</div>
            </div>
            <div style={{ fontSize: 9, color: COLORS.inkMuted }}>8:12 AM</div>
          </div>
        </div>
      );
    }

    return children || null;
  };

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#000000",
        borderRadius: 42,
        padding: "10px",
        boxSizing: "border-box",
        boxShadow: SHADOWS.phone,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Vỏ màn hình bên trong */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FAF9F6",
          borderRadius: 34,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Dynamic Island & Status Bar */}
        <div
          style={{
            height: 38,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 18px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Giờ 9:41 */}
          <span style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 11, color: COLORS.inkPrimary }}>
            9:41
          </span>

          {/* Dynamic Island Capsule co giãn nhẹ */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 7,
              transform: "translateX(-50%)",
              width: islandWidth,
              height: 20,
              backgroundColor: "#000000",
              borderRadius: 12,
            }}
          />

          {/* Icons sóng + pin */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ width: 12, height: 8, display: "flex", gap: 1.5, alignItems: "flex-end" }}>
              <div style={{ width: 2, height: 3, backgroundColor: COLORS.inkPrimary }} />
              <div style={{ width: 2, height: 5, backgroundColor: COLORS.inkPrimary }} />
              <div style={{ width: 2, height: 8, backgroundColor: COLORS.inkPrimary }} />
            </div>
            <div
              style={{
                width: 16,
                height: 8,
                borderRadius: 2,
                border: `1px solid ${COLORS.inkPrimary}`,
                padding: 1,
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: "80%", height: "100%", backgroundColor: COLORS.inkPrimary, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Nội dung bên trong app */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {renderContent()}
        </div>

        {/* Home Indicator Bar */}
        <div style={{ height: 18, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: 88, height: 3.5, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
};
