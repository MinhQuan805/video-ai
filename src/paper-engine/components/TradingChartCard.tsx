import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTargetPulse } from "../physics";

export interface TradingChartCardProps {
  width?: number;
  height?: number;
  delay?: number;
  title?: string;
  badgeText?: string;
  actionText?: string;
  showSimulation?: boolean;
  style?: React.CSSProperties;
}

/**
 * TradingChartCard: Thẻ biểu đồ giao dịch nến sống động.
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + Nến Entry cuối cùng liên tục nhấp nháy biến thiên giá sống (Live Price Ticking).
 *   + Điểm ngắm Target Reticle phát sóng ping liên tục tuần hoàn.
 *   + Toàn bộ thẻ bồng bềnh nhẹ nhàng.
 */
export const TradingChartCard: React.FC<TradingChartCardProps> = ({
  width = 520,
  height = 320,
  delay = 4,
  title = "Your trade",
  badgeText = "EXAMPLE",
  actionText = "Buy",
  showSimulation = false,
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

  const pulse = getTargetPulse(frame, delay + 8, 22);

  // Biến thiên giá sống của cây nến cuối cùng (Live Price Ticking)
  const priceWiggle = Math.sin(frame * 0.15) * 5 + Math.cos(frame * 0.28) * 3;

  const candles = [
    { x: 50, open: 220, close: 210, high: 205, low: 225 },
    { x: 90, open: 215, close: 200, high: 195, low: 218 },
    { x: 130, open: 205, close: 185, high: 180, low: 210 },
    { x: 170, open: 190, close: 180, high: 175, low: 195 },
    { x: 210, open: 180, close: 165, high: 160, low: 185 },
    { x: 250, open: 170, close: 155, high: 150, low: 175 },
    { x: 290, open: 160, close: 145, high: 140, low: 165 },
    { x: 330, open: 150, close: 140, high: 135, low: 155 },
    // Cây nến Entry sống động nhảy giá
    { x: 370, open: 145, close: 130 + priceWiggle, high: 122 + priceWiggle * 0.5, low: 152 },
  ];

  const currentPrice = (142.5 + priceWiggle * 0.25).toFixed(2);

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
        padding: "20px 24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Header Thẻ Giao Dịch */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 18, color: COLORS.inkPrimary }}>
            {title}
          </span>
          <span
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
              color: COLORS.inkSecondary,
              fontFamily: FONTS.inter,
              fontWeight: 700,
              fontSize: 10,
              padding: "3px 8px",
              borderRadius: 6,
              letterSpacing: "0.5px",
            }}
          >
            {badgeText}
          </span>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 700,
              color: COLORS.terracotta,
            }}
          >
            ${currentPrice}
          </span>
        </div>

        {/* Nút Action Đen Bo Tròn */}
        <div
          style={{
            backgroundColor: COLORS.inkPrimary,
            color: "#FFFFFF",
            fontFamily: FONTS.inter,
            fontWeight: 700,
            fontSize: 13,
            padding: "6px 20px",
            borderRadius: 20,
          }}
        >
          {actionText}
        </div>
      </div>

      {/* SVG Biểu đồ Nến & Tọa Độ */}
      <div style={{ flex: 1, position: "relative" }}>
        <svg width="100%" height="100%" viewBox="0 0 460 220">
          <line x1="0" y1="60" x2="460" y2="60" stroke="rgba(0,0,0,0.05)" strokeDasharray="3,3" />
          <line x1="0" y1="120" x2="460" y2="120" stroke="rgba(0,0,0,0.05)" strokeDasharray="3,3" />
          <line x1="0" y1="180" x2="460" y2="180" stroke="rgba(0,0,0,0.05)" strokeDasharray="3,3" />

          <line x1="370" y1="30" x2="370" y2="210" stroke="rgba(0,0,0,0.1)" strokeDasharray="4,4" />

          {candles.map((c, i) => {
            const isUp = c.close <= c.open;
            const bodyY = Math.min(c.open, c.close);
            const bodyH = Math.abs(c.open - c.close);
            return (
              <g key={i}>
                <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={COLORS.inkPrimary} strokeWidth="1.8" />
                <rect
                  x={c.x - 5}
                  y={bodyY}
                  width="10"
                  height={Math.max(4, bodyH)}
                  rx="2"
                  fill={isUp ? COLORS.inkPrimary : "#8E8E93"}
                />
              </g>
            );
          })}

          {/* Điểm ngắm Entry Target Reticle tại nến cuối cùng */}
          <g transform={`translate(370, ${130 + priceWiggle})`}>
            <circle cx="0" cy="0" r="18" fill="none" stroke={COLORS.terracotta} strokeWidth="2" opacity={pulse.opacity} transform={`scale(${pulse.scale})`} />
            <circle cx="0" cy="0" r="7" fill={COLORS.terracottaLight} stroke={COLORS.terracotta} strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill={COLORS.terracotta} />
          </g>
        </svg>

        {/* Nhãn Tag "Entry" */}
        <div
          style={{
            position: "absolute",
            top: 55 + priceWiggle * 0.4,
            left: 340,
            backgroundColor: COLORS.terracottaLight,
            border: `1.5px solid ${COLORS.terracotta}`,
            color: COLORS.terracotta,
            padding: "2px 8px",
            borderRadius: 10,
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 10,
            letterSpacing: "0.5px",
          }}
        >
          Entry
        </div>
      </div>
    </div>
  );
};
