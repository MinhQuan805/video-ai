import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONTS, SHADOWS } from "../tokens";

/**
 * 11. LiveCandlestickCard: Biểu đồ nến sống với điểm vào lệnh
 */
export const LiveCandlestickCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const tick = Math.sin(frame * 0.18) * 4;
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "18px 22px", width: 460, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 16 }}>Apple (AAPL)</span>
        <span style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 14, color: COLORS.terminalGreen }}>$224.50 (+1.8%)</span>
      </div>
      <svg width="100%" height={120} viewBox="0 0 400 120">
        {[40, 80, 120, 160, 200, 240, 280, 320].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={20 + i * 5} x2={x} y2={90} stroke="#1A1A1A" strokeWidth={1.5} />
            <rect x={x - 6} y={35 + i * 4} width={12} height={35} rx={2} fill={i % 2 === 0 ? "#1A1A1A" : "#888"} />
          </g>
        ))}
        {/* Nến đang chạy giá */}
        <g transform={`translate(360, ${tick})`}>
          <line x1={0} y1={25} x2={0} y2={85} stroke={COLORS.terracotta} strokeWidth={2} />
          <rect x={-6} y={38} width={12} height={30} rx={2} fill={COLORS.terracotta} />
          <circle cx={0} cy={38} r={4} fill={COLORS.terracotta} />
        </g>
      </svg>
    </div>
  );
};

/**
 * 12. MonteCarloSimulator: Mô phỏng 10,000 kịch bản tương lai rẽ quạt
 */
export const MonteCarloSimulator: React.FC<{ delay?: number }> = () => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "18px 22px", width: 460, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 15 }}>Monte Carlo Simulation</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 700 }}>10,000 paths</span>
      </div>
      <svg width="100%" height={110} viewBox="0 0 400 110">
        <line x1={0} y1={55} x2={160} y2={55} stroke="#1A1A1A" strokeWidth={2} />
        {/* Quạt rẽ nhánh */}
        {[-35, -20, -8, 5, 18, 32, 45].map((yEnd, i) => (
          <path key={i} d={`M 160 55 Q 260 ${55 + yEnd * 0.5} 390 ${55 + yEnd}`} fill="none" stroke="rgba(200,82,40,0.35)" strokeWidth={1.5} />
        ))}
        <line x1={160} y1={0} x2={160} y2={110} stroke="#EF4444" strokeDasharray="3,3" />
      </svg>
    </div>
  );
};

/**
 * 13. SparklineScanner: Lưới 3x2 quét tín hiệu cổ phiếu
 */
export const SparklineScanner: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, width: 460 }}>
      {["NVDA", "TSLA", "MSFT", "GOOG", "AMZN", "META"].map((sym, i) => (
        <div key={i} style={{ backgroundColor: "#FFFFFF", borderRadius: 12, padding: "10px", border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.subtle }}>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 11 }}>{sym}</div>
          <svg width="100%" height={30} viewBox="0 0 100 30">
            <path d={`M 0 25 Q 25 ${10 + (i % 3) * 5} 50 18 T 100 ${5 + (i % 2) * 12}`} fill="none" stroke={i === 0 ? COLORS.terracotta : "#888"} strokeWidth={1.8} />
          </svg>
        </div>
      ))}
    </div>
  );
};

/**
 * 14. DonutCalorieGauge: Vòng tròn đo calo và dinh dưỡng
 */
export const DonutCalorieGauge: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const cal = Math.min(1850, Math.round(interpolate(frame - delay, [0, 40], [0, 1850], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "18px 24px", width: 440, boxShadow: SHADOWS.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>CALORIES TARGET</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 32, color: COLORS.inkPrimary }}>{cal} <span style={{ fontSize: 14, color: COLORS.inkMuted }}>kcal</span></div>
      </div>
      <svg width={70} height={70} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="15" fill="none" stroke="#F0ECE1" strokeWidth={4} />
        <circle cx="20" cy="20" r="15" fill="none" stroke={COLORS.terracotta} strokeWidth={4} strokeDasharray="94" strokeDashoffset={25} strokeLinecap="round" transform="rotate(-90 20 20)" />
      </svg>
    </div>
  );
};

/**
 * 15. BigNumberCounter: Con số thống kê tăng trưởng nhảy múa
 */
export const BigNumberCounter: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const count = Math.min(5900, Math.round(interpolate(frame - delay, [0, 45], [0, 5900], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 22, padding: "20px 28px", width: 440, border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.card }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 700 }}>ACTIVE COMMUNITY</div>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 48, color: COLORS.inkPrimary, letterSpacing: "-1px" }}>~{count.toLocaleString()}</div>
      <div style={{ fontFamily: FONTS.inter, fontSize: 13, color: COLORS.inkSecondary }}>Nhà sáng tạo nội dung tự động hóa</div>
    </div>
  );
};

/**
 * 16. CryptoPriceTicker: Thẻ nhảy giá Coin thời gian thực
 */
export const CryptoPriceTicker: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const price = (94250 + Math.sin(frame * 0.2) * 120).toFixed(1);
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px 20px", width: 440, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#F7931A", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>₿</div>
        <div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Bitcoin (BTC)</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>24h Vol: $42B</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 800, fontSize: 16 }}>${price}</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terminalGreen, fontWeight: 700 }}>+4.25% ▲</div>
      </div>
    </div>
  );
};

/**
 * 17. BarChartRaceCard: Biểu đồ thanh so sánh năng lực
 */
export const BarChartRaceCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const bars = [
    { label: "Remotion Engine", w: Math.min(95, 30 + frame * 1.2), color: COLORS.terracotta },
    { label: "AI Slop Generator", w: Math.min(45, 10 + frame * 0.6), color: "#8E8D8A" },
    { label: "Traditional NLE", w: Math.min(65, 20 + frame * 0.8), color: "#1A1A1A" },
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "18px 22px", width: 450, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14, marginBottom: 14 }}>Tốc Độ Sản Xuất Video</div>
      {bars.map((b, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.inter, fontSize: 11, fontWeight: 600, marginBottom: 3 }}>
            <span>{b.label}</span>
            <span style={{ fontFamily: FONTS.mono }}>{Math.round(b.w)}%</span>
          </div>
          <div style={{ height: 10, backgroundColor: "#F0ECE1", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${b.w}%`, backgroundColor: b.color, borderRadius: 5 }} />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * 18. BalanceSheetCard: Doanh thu vs Chi phí
 */
export const BalanceSheetCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", gap: 12, width: 450 }}>
      <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px", border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.subtle }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>DOANH THU</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 22, color: COLORS.terminalGreen }}>$12,450</div>
        <div style={{ fontSize: 10, color: COLORS.terminalGreen }}>+34% tháng này</div>
      </div>
      <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px", border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.subtle }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>CHI PHÍ AI API</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 22, color: COLORS.terracotta }}>$48.20</div>
        <div style={{ fontSize: 10, color: COLORS.inkMuted }}>Tiết kiệm 99.6%</div>
      </div>
    </div>
  );
};

/**
 * 19. MetricStatPill: Viên thuốc chỉ số ngắn gọn
 */
export const MetricStatPill: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, backgroundColor: "#FFFFFF", borderRadius: 24, padding: "8px 18px", boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
      <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13 }}>FPS: 60 mượt mà</span>
      <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terminalGreen, fontWeight: 700 }}>0 Drop Frames</span>
    </div>
  );
};

/**
 * 20. TargetStopLossCard: Vùng chốt lời & cắt lỗ giao dịch
 */
export const TargetStopLossCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 20px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", padding: "3px 8px", borderRadius: 6, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800 }}>TARGET: +15.4%</span>
        <span style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "3px 8px", borderRadius: 6, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800 }}>STOP: -2.1%</span>
      </div>
      <div style={{ height: 6, backgroundColor: "#E5E7EB", borderRadius: 3, position: "relative" }}>
        <div style={{ position: "absolute", left: "20%", width: "65%", height: "100%", backgroundColor: COLORS.terracotta, borderRadius: 3 }} />
      </div>
    </div>
  );
};
