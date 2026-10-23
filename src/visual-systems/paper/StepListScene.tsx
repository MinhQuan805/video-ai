import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { PaperBackground } from "./PaperBackground";
import { renderEmphasisTitle } from "./BigNumberScene";

export interface StepItem {
  number: string | number;
  label: string;
  detail?: string;
  highlight?: boolean;
}

export interface StepListSceneProps {
  tag?: string;
  title: string;
  subtitle?: string;
  steps: StepItem[];
}

export const StepListScene: React.FC<StepListSceneProps> = ({
  tag,
  title,
  subtitle,
  steps,
}) => {
  const frame = useCurrentFrame();

  // Một cú chuyển động có trọng lượng cho toàn bộ khung cảnh
  const mainEntrance = spring({
    frame,
    fps: 30,
    config: {
      mass: 1.5,
      damping: 18,
      stiffness: 75,
    },
  });

  const translateY = interpolate(mainEntrance, [0, 1], [50, 0]);
  const opacity = interpolate(mainEntrance, [0, 0.4, 1], [0, 0.7, 1]);

  return (
    <PaperBackground>
      <div
        style={{
          padding: "160px 100px 100px 100px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        {/* Eyebrow / Tag */}
        {tag && (
          <div
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "4px",
              color: theme.colors.accent,
              marginBottom: 32,
            }}
          >
            {tag}
          </div>
        )}

        {/* Tiêu đề Fraunces có chữ in nghiêng màu cam đất */}
        <div style={{ marginBottom: 28 }}>
          {renderEmphasisTitle(title, 58, 1.25)}
        </div>

        {subtitle && (
          <div
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 28,
              lineHeight: 1.5,
              color: theme.colors.subtle,
              marginBottom: 50,
              maxWidth: 820,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Danh sách các bước thoáng đãng */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "36px",
            marginTop: 20,
          }}
        >
          {steps.map((s, idx) => {
            // Chuyển động nhẹ nhàng tuần tự có trọng lượng
            const stepSpring = spring({
              frame: Math.max(0, frame - 4 - idx * 4),
              fps: 30,
              config: {
                mass: 1.2,
                damping: 15,
                stiffness: 85,
              },
            });
            const sY = interpolate(stepSpring, [0, 1], [24, 0]);
            const sOp = interpolate(stepSpring, [0, 1], [0, 1]);

            const numStr = typeof s.number === "number" ? `0${s.number}` : s.number;

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "32px",
                  padding: "24px 28px",
                  backgroundColor: s.highlight ? theme.colors.paperMuted : "transparent",
                  borderLeft: s.highlight
                    ? `4px solid ${theme.colors.accent}`
                    : `1px solid ${theme.colors.line}`,
                  transform: `translateY(${sY}px)`,
                  opacity: sOp,
                }}
              >
                {/* Số thứ tự Fraunces thanh lịch */}
                <span
                  style={{
                    fontFamily: theme.fonts.title,
                    fontSize: 42,
                    fontWeight: 700,
                    lineHeight: 1,
                    color: s.highlight ? theme.colors.accent : theme.colors.subtle,
                    minWidth: "54px",
                  }}
                >
                  {numStr}
                </span>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: 32,
                      fontWeight: 600,
                      color: theme.colors.ink,
                      lineHeight: 1.35,
                      marginBottom: s.detail ? 8 : 0,
                    }}
                  >
                    {s.label}
                  </div>
                  {s.detail && (
                    <div
                      style={{
                        fontFamily: theme.fonts.body,
                        fontSize: 24,
                        color: theme.colors.subtle,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PaperBackground>
  );
};
