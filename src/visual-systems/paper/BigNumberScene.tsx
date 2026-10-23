import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { PaperBackground } from "./PaperBackground";

export interface BigNumberSceneProps {
  tag?: string;
  title: string;          // Dùng *từ này* để tự động chuyển sang Fraunces in nghiêng màu cam đất
  number: string;
  unit?: string;
  description?: string;
  detail?: string;
}

/**
 * Hàm phân tích chuỗi có định dạng *chữ nhấn* thành thẻ span Fraunces in nghiêng màu cam đất
 */
export const renderEmphasisTitle = (
  text: string,
  fontSize: number = 60,
  lineHeight: number = 1.25
) => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <div
      style={{
        fontFamily: theme.fonts.title,
        fontSize,
        lineHeight,
        color: theme.colors.ink,
        letterSpacing: "-0.5px",
      }}
    >
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          const content = part.slice(1, -1);
          return (
            <span
              key={i}
              style={{
                fontStyle: "italic",
                color: theme.colors.accent,
                fontWeight: 600,
              }}
            >
              {content}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};

export const BigNumberScene: React.FC<BigNumberSceneProps> = ({
  tag,
  title,
  number,
  unit,
  description,
  detail,
}) => {
  const frame = useCurrentFrame();

  // Một cú chuyển động có trọng lượng (mass: 1.6, damping: 16)
  const entrance = spring({
    frame,
    fps: 30,
    config: {
      mass: 1.6,
      damping: 16,
      stiffness: 70,
    },
  });

  const translateY = interpolate(entrance, [0, 1], [60, 0]);
  const opacity = interpolate(entrance, [0, 0.4, 1], [0, 0.8, 1]);

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
              marginBottom: 36,
            }}
          >
            {tag}
          </div>
        )}

        {/* Tiêu đề Fraunces có chữ in nghiêng màu cam đất */}
        <div style={{ marginBottom: 60 }}>
          {renderEmphasisTitle(title, 64, 1.25)}
        </div>

        {/* Khối con số lớn */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "24px",
            marginBottom: 50,
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.title,
              fontSize: 260,
              lineHeight: 0.9,
              color: theme.colors.ink,
              fontWeight: 700,
              letterSpacing: "-4px",
            }}
          >
            {number}
          </span>

          {unit && (
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 36,
                fontWeight: 700,
                color: theme.colors.accent,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {unit}
            </div>
          )}
        </div>

        {/* Đường kẻ ngang thanh thoát */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: theme.colors.line,
            marginBottom: 44,
          }}
        />

        {/* Mô tả chữ thường Inter */}
        {description && (
          <div
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 34,
              lineHeight: 1.55,
              color: theme.colors.ink,
              fontWeight: 400,
              maxWidth: 820,
              marginBottom: detail ? 24 : 0,
            }}
          >
            {description}
          </div>
        )}

        {detail && (
          <div
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 26,
              lineHeight: 1.6,
              color: theme.colors.subtle,
              maxWidth: 800,
            }}
          >
            {detail}
          </div>
        )}
      </div>
    </PaperBackground>
  );
};
