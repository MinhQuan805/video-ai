import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTypewriter } from "../physics";

export interface TerminalLine {
  text: string;
  type?: "command" | "info" | "success" | "accent";
  delayOffset: number; // Số frames sau khi terminal xuất hiện
}

export interface MacTerminalProps {
  width?: number;
  height?: number;
  title?: string;
  lines?: TerminalLine[];
  delay?: number;
  style?: React.CSSProperties;
}

const DEFAULT_LINES: TerminalLine[] = [
  { text: "> cài React Native + Expo", type: "accent", delayOffset: 8 },
  { text: "Installing packages...", type: "info", delayOffset: 26 },
  { text: "$ npx create-expo-app my-app", type: "command", delayOffset: 42 },
  { text: " react-native installed successfully", type: "success", delayOffset: 62 },
];

/**
 * MacTerminal: Cửa sổ dòng lệnh Terminal macOS siêu tối giản (như video mẫu 8).
 * Tích hợp gõ lệnh dạng Typewriter từng ký tự và checkmark thành công.
 */
export const MacTerminal: React.FC<MacTerminalProps> = ({
  width = 540,
  height = 320,
  title = "~ claude",
  lines = DEFAULT_LINES,
  delay = 5,
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
    startScale: 0.94,
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: COLORS.terminalBg,
        borderRadius: 18,
        boxShadow: "0 18px 48px -6px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 38,
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          backgroundColor: "#1F1E1D",
        }}
      >
        {/* 3 traffic light buttons */}
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficRed }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficYellow }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.trafficGreen }} />
        </div>

        {/* Tiêu đề terminal */}
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </span>
      </div>

      {/* Nội dung dòng lệnh bên trong */}
      <div
        style={{
          flex: 1,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontFamily: FONTS.mono,
          fontSize: 18,
          lineHeight: 1.5,
        }}
      >
        {lines.map((line, idx) => {
          const lineStart = delay + line.delayOffset;
          if (frame < lineStart) return null;

          const { displayedText, showCursor, isComplete } = getTypewriter(
            line.text,
            frame,
            lineStart,
            0.85
          );

          // Màu sắc theo loại dòng
          let textColor = COLORS.terminalText;
          if (line.type === "accent") textColor = COLORS.terracotta;
          else if (line.type === "info") textColor = "rgba(255, 255, 255, 0.55)";
          else if (line.type === "success") textColor = COLORS.terminalGreen;

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                color: textColor,
                whiteSpace: "pre",
              }}
            >
              <span>{displayedText}</span>
              {!isComplete && showCursor && (
                <span
                  style={{
                    display: "inline-block",
                    width: 9,
                    height: 18,
                    backgroundColor: COLORS.terracotta,
                    marginLeft: 2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
