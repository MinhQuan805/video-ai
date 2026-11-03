import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface SkillItem {
  id: number;
  name: string;
  sub?: string;
  isActive?: boolean;
}

export interface SkillMatrixGridProps {
  title?: string;
  count?: number | string;
  items: SkillItem[];
  delay?: number;
  staggerStep?: number;
  style?: React.CSSProperties;
}

/**
 * SkillMatrixGrid: Lưới ma trận các kỹ năng / components (như video mẫu 1 và 4).
 * Tích hợp đường nối luồng tương tác và hiệu ứng nảy so le cascade.
 */
export const SkillMatrixGrid: React.FC<SkillMatrixGridProps> = ({
  title = "Claude skills",
  count = 11,
  items,
  delay = 5,
  staggerStep = 2,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerEntrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 28,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 520,
        gap: 16,
        transform: `translateY(${containerEntrance.translateY}px) scale(${containerEntrance.scale})`,
        opacity: containerEntrance.opacity,
        ...style,
      }}
    >
      {/* Header của Matrix */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Claude icon nhỏ */}
          <div
            style={{
              width: 48,
              height: 48,
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: SHADOWS.subtle,
              border: `1px solid ${COLORS.cardBorder}`,
            }}
          >
            <span style={{ color: COLORS.terracotta, fontSize: 24 }}>*</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontFamily: FONTS.frauncesNormal,
                fontSize: 38,
                fontWeight: 800,
                color: COLORS.inkPrimary,
              }}
            >
              {count}
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: FONTS.inter, fontSize: 16, fontWeight: 700, color: COLORS.inkPrimary }}>
                {title}
              </span>
              <span style={{ fontFamily: FONTS.inter, fontSize: 13, color: COLORS.inkMuted }}>
                for day trading
              </span>
            </div>
          </div>
        </div>

        {/* Chip FREE bo tròn cam */}
        <div
          style={{
            backgroundColor: COLORS.terracotta,
            color: "#FFFFFF",
            fontFamily: FONTS.inter,
            fontSize: 14,
            fontWeight: 800,
            padding: "6px 14px",
            borderRadius: 14,
            boxShadow: SHADOWS.sticker,
            letterSpacing: 0.5,
          }}
        >
          FREE
        </div>
      </div>

      {/* Lưới 3 cột các thẻ con */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {items.map((item, idx) => {
          const itemDelay = delay + idx * staggerStep;
          const itemEntrance = getSmoothEntrance({
            frame,
            fps,
            delay: itemDelay,
            config: SPRING_PRESETS.pop,
            distanceY: 14,
            startScale: 0.9,
          });

          return (
            <div
              key={item.id}
              style={{
                height: 64,
                backgroundColor: COLORS.cardBg,
                borderRadius: 14,
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: item.isActive ? SHADOWS.glowAccent : SHADOWS.subtle,
                border: item.isActive
                  ? `1.5px solid ${COLORS.terracotta}`
                  : `1px solid ${COLORS.cardBorder}`,
                transform: `translateY(${itemEntrance.translateY}px) scale(${itemEntrance.scale})`,
                opacity: itemEntrance.opacity,
                filter: itemEntrance.filter,
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              {item.isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    left: -6,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: COLORS.terracotta,
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.id}
                </div>
              )}

              <span
                style={{
                  fontFamily: FONTS.inter,
                  fontSize: 14,
                  fontWeight: 700,
                  color: item.isActive ? COLORS.terracotta : COLORS.inkPrimary,
                  lineHeight: 1.2,
                }}
              >
                {item.name}
              </span>
              {item.sub && (
                <span
                  style={{
                    fontFamily: FONTS.inter,
                    fontSize: 11,
                    color: COLORS.inkMuted,
                  }}
                >
                  {item.sub}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
