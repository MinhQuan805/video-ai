import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";
import { FaIcon } from "../../shared/FaIcon";

/**
 * 1. ViralRetentionGraph: Biểu đồ tỷ lệ giữ chân người xem YouTube Shorts / Reels 95%
 */
export const ViralRetentionGraph: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const progress = interpolate(frame - delay, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 24px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaIcon icon="chart" size={14} color="#16A34A" />
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Audience Retention Rate</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, backgroundColor: "#DCFCE7", color: "#16A34A", padding: "3px 8px", borderRadius: 6, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800 }}>
          <FaIcon icon="arrow-trend-up" size={9} color="#16A34A" />
          <span>94.8% Hook Retention</span>
        </div>
      </div>

      <div style={{ position: "relative", height: 75, width: "100%", overflow: "hidden" }}>
        <svg width="100%" height={75} viewBox="0 0 440 75" preserveAspectRatio="none">
          <defs>
            <linearGradient id="viralGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M 0 15 Q 100 18, 200 24 T 340 32 T 440 38 L 440 75 L 0 75 Z" fill="url(#viralGrad)" />
          <path
            d="M 0 15 Q 100 18, 200 24 T 340 32 T 440 38"
            fill="none"
            stroke="#16A34A"
            strokeWidth={3}
            strokeDasharray="480"
            strokeDashoffset={480 * (1 - progress)}
          />
          {/* Baseline so sánh video thường tụt dốc */}
          <path d="M 0 15 Q 80 55, 180 65 T 440 70" fill="none" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="4 4" />
        </svg>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>
        <span>0s (Hook)</span>
        <span style={{ color: COLORS.terracotta, fontWeight: 700 }}>Paper Motion Giữ Chân Khách Hàng</span>
        <span>60s (CTA)</span>
      </div>
    </div>
  );
};

/**
 * 2. FollowerGrowthOdometer: Cột mốc nhảy số 100K Follower nhận nút bạc
 */
export const FollowerGrowthOdometer: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const followers = Math.min(100000, Math.round(interpolate(frame - delay, [0, 45], [94200, 100000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 24px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: `2px solid ${COLORS.terracotta}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <FaIcon icon="trophy" size={13} color="#F59E0B" />
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted, fontWeight: 800 }}>
            CREATOR MILESTONE
          </span>
        </div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 36, color: COLORS.inkPrimary, letterSpacing: -0.5 }}>
          {followers.toLocaleString()}
        </div>
        <div style={{ fontFamily: FONTS.inter, fontSize: 12, color: COLORS.terminalGreen, fontWeight: 700 }}>
          Đạt mốc Nút Bạc YouTube Creator
        </div>
      </div>

      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          backgroundColor: COLORS.terracottaLight,
          border: `2px solid ${COLORS.terracotta}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaIcon icon="award" size={24} color={COLORS.terracotta} />
      </div>
    </div>
  );
};

/**
 * 3. ContentCalendarScheduler: Lịch đăng bài 7 ngày với các khung giờ vàng
 */
export const ContentCalendarScheduler: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  const days = [
    { day: "T2", title: "Hook Video", hour: "11:30", active: true },
    { day: "T3", title: "Case Study", hour: "19:00", active: false },
    { day: "T4", title: "Tutorial", hour: "12:00", active: true },
    { day: "T5", title: "Paper Reel", hour: "20:00", active: false },
    { day: "T6", title: "Meta Ads", hour: "11:30", active: true },
    { day: "T7", title: "Podcast Cut", hour: "15:00", active: false },
    { day: "CN", title: "Review Tuần", hour: "20:30", active: true },
  ];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 22px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaIcon icon="calendar" size={13} color={COLORS.terracotta} />
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Lịch Đăng Content Khung Giờ Vàng</span>
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>7 Ngày / Tuần</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              backgroundColor: d.active ? COLORS.terracottaLight : "#F9F8F5",
              border: d.active ? `1.5px solid ${COLORS.terracotta}` : "1px solid rgba(0,0,0,0.06)",
              borderRadius: 10,
              padding: "8px 4px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 11, color: d.active ? COLORS.terracotta : COLORS.inkPrimary }}>
              {d.day}
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 8.5, color: COLORS.inkMuted, margin: "4px 0" }}>
              {d.hour}
            </div>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: d.active ? COLORS.terracotta : "#D1D5DB", margin: "0 auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 4. EngagementRateRadar: Biểu đồ mạng nhện tương tác đa kênh 5 trục
 */
export const EngagementRateRadar: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 22px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>ENGAGEMENT SCORE</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 24, color: COLORS.inkPrimary, marginTop: 2 }}>
          8.6% <span style={{ fontSize: 12, color: "#16A34A" }}>Top 1% Creator</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 8, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkSecondary }}>
          <div>Like: 12.4K • Comment: 840</div>
          <div>Share: 2.1K • Save: 3.5K</div>
        </div>
      </div>

      {/* SVG Ngũ giác radar */}
      <svg width={100} height={100} viewBox="0 0 100 100">
        <polygon points="50,10 88,38 73,82 27,82 12,38" fill="none" stroke="#E5E7EB" strokeWidth={1.5} />
        <polygon points="50,22 78,44 68,74 32,74 22,44" fill="none" stroke="#E5E7EB" strokeWidth={1} />
        <polygon points="50,14 84,40 70,78 30,78 16,40" fill={COLORS.terracottaLight} fillOpacity={0.65} stroke={COLORS.terracotta} strokeWidth={2} />
      </svg>
    </div>
  );
};

/**
 * 5. CrossPlatformDistributor: Phân phối tự động 1 video sang 4 định dạng mạng xã hội
 */
export const CrossPlatformDistributor: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  const formats = [
    { name: "TikTok / Reel", ratio: "9:16", brand: "tiktok" },
    { name: "YouTube Main", ratio: "16:9", brand: "youtube" },
    { name: "Feed Post", ratio: "1:1", brand: "instagram" },
    { name: "LinkedIn Video", ratio: "4:5", brand: "linkedin" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 22px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Tự Động Xuất Đa Kênh Tỷ Lệ Chuẩn</div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terminalGreen, fontWeight: 700 }}>4 Kênh Đồng Bộ</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {formats.map((fmt, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#FAF8F5",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 12,
              padding: "10px 6px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 800, color: COLORS.terracotta }}>{fmt.ratio}</div>
            <div style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 10.5, color: COLORS.inkPrimary, marginTop: 4 }}>{fmt.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 6. CommentSentimentAnalysis: Thanh phân tích cảm xúc khách hàng (94% Tích cực)
 */
export const CommentSentimentAnalysis: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 22px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Phân Tích Cảm Xúc Khán Giả (Sentiment)</div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#16A34A", fontWeight: 800 }}>94% Tích Cực</span>
      </div>

      {/* Thanh đo phân đoạn */}
      <div style={{ height: 12, borderRadius: 6, display: "flex", overflow: "hidden", marginBottom: 10 }}>
        <div style={{ width: "94%", backgroundColor: "#16A34A" }} />
        <div style={{ width: "5%", backgroundColor: "#F59E0B" }} />
        <div style={{ width: "1%", backgroundColor: "#DC2626" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted }}>
        <span style={{ color: "#16A34A", fontWeight: 700 }}>● Hài lòng &amp; Khen ngợi (94%)</span>
        <span style={{ color: "#F59E0B" }}>● Trung tính (5%)</span>
        <span style={{ color: "#DC2626" }}>● Tiêu cực (1%)</span>
      </div>
    </div>
  );
};

/**
 * 7. UgcVsBrandSplitter: So sánh mức độ tin cậy video UGC khách hàng vs video thương hiệu
 */
export const UgcVsBrandSplitter: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        width: 480,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px", border: "1px solid rgba(0,0,0,0.08)", boxShadow: SHADOWS.subtle }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 800 }}>BRAND SELF-PROMO</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13, margin: "6px 0" }}>Video Tự Khen</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkSecondary }}>Độ tin cậy: 28%</div>
      </div>

      <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px", border: `2px solid ${COLORS.terracotta}`, boxShadow: SHADOWS.card, position: "relative" }}>
        <div style={{ position: "absolute", top: -9, right: 10, backgroundColor: COLORS.terracotta, color: "#FFF", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 6 }}>
          TRUST x3.4
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>UGC PAPER EDITORIAL</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13, margin: "6px 0", color: COLORS.inkPrimary }}>Bằng Chứng Khách Hàng</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 11.5, color: "#16A34A" }}>Độ tin cậy: 89%</div>
      </div>
    </div>
  );
};

/**
 * 8. BurnRateRunwayClock: Đồng hồ đếm ngược số tháng Runway tồn tại của Startup
 */
export const BurnRateRunwayClock: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 24px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>CASH RUNWAY CLOCK</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 32, color: COLORS.inkPrimary, marginTop: 2 }}>
          28 Tháng <span style={{ fontSize: 12, color: "#16A34A", fontWeight: 700 }}>An Toàn Cao</span>
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkSecondary, marginTop: 4 }}>
          Burn Rate: $12K/tháng • Điểm hòa vốn đã đạt
        </div>
      </div>

      <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaIcon icon="shield" size={20} color="#16A34A" />
      </div>
    </div>
  );
};

/**
 * 9. CartAbandonmentRecovery: Tỷ lệ cứu giỏ hàng bị bỏ quên 42%
 */
export const CartAbandonmentRecovery: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 22px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Cứu Đơn Giỏ Hàng Bị Bỏ Quên</div>
        <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", padding: "2px 8px", borderRadius: 6, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800 }}>+42% Recovered</span>
      </div>
      <div style={{ fontFamily: FONTS.inter, fontSize: 12.5, color: COLORS.inkSecondary, marginBottom: 10 }}>
        Chuỗi nhắc tự động gửi tin nhắn kèm voucher giảm 10% chốt thêm $8,400 doanh thu.
      </div>
      <div style={{ height: 6, backgroundColor: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: "42%", height: "100%", backgroundColor: COLORS.terracotta }} />
      </div>
    </div>
  );
};

/**
 * 10. CustomerLifetimeValueTier: Tháp phân hạng giá trị vòng đời khách hàng LTV
 */
export const CustomerLifetimeValueTier: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 24px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Phân Hạng Giá Trị Khách Hàng (LTV)</div>
        <FaIcon icon="trophy" size={13} color="#F59E0B" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", backgroundColor: "#FEF3C7", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
          <span>Platinum VIP (Top 5%)</span>
          <span style={{ color: "#B45309" }}>LTV: $14,500</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", backgroundColor: "#F3F4F6", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
          <span>Gold (Top 20%)</span>
          <span>LTV: $4,200</span>
        </div>
      </div>
    </div>
  );
};
