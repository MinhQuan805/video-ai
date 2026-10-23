import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { PaperBackground } from "./PaperBackground";
import { renderEmphasisTitle } from "./BigNumberScene";

export interface ComparisonSide {
  tag: string;
  value: string;
  unit?: string;
  desc?: string;
  highlight?: boolean;
}

export interface ComparisonSceneProps {
  tag?: string;
  title: string;
  subtitle?: string;
  left: ComparisonSide;
  right: ComparisonSide;
  verdict?: string;
}

export const ComparisonScene: React.FC<ComparisonSceneProps> = ({
  tag,
  title,
  subtitle,
  left,
  right,
  verdict,
}) => {
  const frame = useCurrentFrame();

  // Một cú chuyển động có trọng lượng cho toàn bộ khung cảnh
  const mainEntrance = spring({
    frame,
    fps: 30,
    config: {
      mass: 1.6,
      damping: 17,
      stiffness: 70,
    },
  });

  const translateY = interpolate(mainEntrance, [0, 1], [60, 0]);
  const opacity = interpolate(mainEntrance, [0, 0.4, 1], [0, 0.8, 1]);

  return (
    <PaperBackground>
      <div
        style={{
          padding: "160px 80px 100px 80px",
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
        <div style={{ marginBottom: 24 }}>
          {renderEmphasisTitle(title, 56, 1.25)}
        </div>

        {subtitle && (
          <div
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 28,
              lineHeight: 1.5,
              color: theme.colors.subtle,
              marginBottom: 60,
              maxWidth: 860,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Khối so sánh 2 bên cực kỳ thoáng và cân đối */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: 60,
          }}
        >
          {/* Bên trái (ví dụ: Dự kiến) */}
          <div
            style={{
              padding: "40px 32px",
              backgroundColor: left.highlight ? theme.colors.paperMuted : theme.colors.paper,
              border: `1px solid ${left.highlight ? theme.colors.accent : theme.colors.line}`,
              boxShadow: "0 4px 20px rgba(26, 24, 22, 0.04)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 22,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "3px",
                color: left.highlight ? theme.colors.accent : theme.colors.subtle,
                marginBottom: 28,
              }}
            >
              {left.tag}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.title,
                  fontSize: 110,
                  lineHeight: 1,
                  fontWeight: 700,
                  color: left.highlight ? theme.colors.accent : theme.colors.ink,
                }}
              >
                {left.value}
              </span>
              {left.unit && (
                <span
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: theme.colors.subtle,
                  }}
                >
                  {left.unit}
                </span>
              )}
            </div>

            {left.desc && (
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 24,
                  lineHeight: 1.5,
                  color: theme.colors.ink,
                  marginTop: "auto",
                }}
              >
                {left.desc}
              </div>
            )}
          </div>

          {/* Bên phải (ví dụ: Thực tế - nổi bật) */}
          <div
            style={{
              padding: "40px 32px",
              backgroundColor: right.highlight ? theme.colors.paperMuted : theme.colors.paper,
              border: `1px solid ${right.highlight ? theme.colors.accent : theme.colors.line}`,
              boxShadow: "0 6px 24px rgba(26, 24, 22, 0.06)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Điểm nhấn viền màu cam đất */}
            {right.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: theme.colors.accent,
                }}
              />
            )}

            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 22,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "3px",
                color: right.highlight ? theme.colors.accent : theme.colors.subtle,
                marginBottom: 28,
              }}
            >
              {right.tag}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.title,
                  fontSize: 110,
                  lineHeight: 1,
                  fontWeight: 700,
                  color: right.highlight ? theme.colors.accent : theme.colors.ink,
                }}
              >
                {right.value}
              </span>
              {right.unit && (
                <span
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: theme.colors.accent,
                  }}
                >
                  {right.unit}
                </span>
              )}
            </div>

            {right.desc && (
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 24,
                  lineHeight: 1.5,
                  color: theme.colors.ink,
                  marginTop: "auto",
                }}
              >
                {right.desc}
              </div>
            )}
          </div>
        </div>

        {/* Kết luận / Nhận định (Verdict) */}
        {verdict && (
          <div
            style={{
              padding: "24px 32px",
              borderLeft: `3px solid ${theme.colors.accent}`,
              backgroundColor: theme.colors.paper,
              fontFamily: theme.fonts.body,
              fontSize: 28,
              lineHeight: 1.55,
              color: theme.colors.ink,
            }}
          >
            {verdict}
          </div>
        )}
      </div>
    </PaperBackground>
  );
};
