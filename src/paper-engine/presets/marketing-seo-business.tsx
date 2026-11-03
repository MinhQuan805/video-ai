import React from "react";
import { useCurrentFrame, interpolate, staticFile, Img } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";
import { FaIcon } from "../../shared/FaIcon";

/**
 * 71. GoogleSerpCard: Kết quả tìm kiếm Google chuẩn SEO với Rich Snippet & Logo Google
 */
export const GoogleSerpCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 24px",
        width: 500,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      {/* Google Header & Favicon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#F8F9FA",
              border: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Img src={staticFile("icon/google.png")} style={{ width: 20, height: 20, objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontFamily: FONTS.inter, fontSize: 13, fontWeight: 700, color: COLORS.inkPrimary }}>
              Antigravity Studio
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted }}>
              https://agency.com/dich-vu-seo-meta-ads
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#E8F0FE",
            color: "#1A73E8",
            fontFamily: FONTS.mono,
            fontSize: 10,
            fontWeight: 800,
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          TOP #1 GOOGLE
        </div>
      </div>

      {/* SEO Title */}
      <div
        style={{
          fontFamily: FONTS.inter,
          fontWeight: 800,
          fontSize: 18,
          color: "#1A0DAB",
          marginBottom: 8,
          lineHeight: 1.35,
          letterSpacing: -0.2,
        }}
      >
        Dịch Vụ SEO & Chạy Ads Chuyển Đổi Cao #1 Thị Trường
      </div>

      {/* Rich Snippet Stars using Font Awesome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <FaIcon key={i} icon="star" color="#F59E0B" size={13} />
          ))}
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted, fontWeight: 700 }}>
          4.9/5 • 428 khách hàng đánh giá hài lòng
        </span>
      </div>

      {/* Meta Description */}
      <div style={{ fontFamily: FONTS.inter, fontSize: 13, color: COLORS.inkSecondary, lineHeight: 1.5 }}>
        Giải pháp bứt phá doanh số với kỹ thuật <strong>Technical SEO toàn diện</strong> kết hợp <strong>Meta Ads tối ưu CPA</strong>. Tăng trưởng organic traffic bền vững 300%.
      </div>
    </div>
  );
};

/**
 * 72. GoogleSearchConsoleDashboard: Bảng điều khiển Google Search Console với biểu đồ SVG động
 */
export const GoogleSearchConsoleDashboard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  const clicks = Math.min(28450, Math.round(interpolate(frame - delay, [0, 45], [0, 28450], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const impressions = Math.min(620000, Math.round(interpolate(frame - delay, [0, 45], [0, 620000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const progress = interpolate(frame - delay, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 24px",
        width: 500,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Img src={staticFile("icon/google.png")} style={{ width: 22, height: 22, objectFit: "contain" }} />
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 15, color: COLORS.inkPrimary }}>
            Google Search Console
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#E6F4EA",
            color: "#137333",
            padding: "4px 10px",
            borderRadius: 8,
            fontFamily: FONTS.mono,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          <FaIcon icon="arrow-trend-up" size={11} color="#137333" />
          <span>+48.6% Traffic</span>
        </div>
      </div>

      {/* 4 Chỉ số cốt lõi */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Tổng Click", val: clicks.toLocaleString(), color: "#1A73E8" },
          { label: "Hiển Thị", val: (impressions / 1000).toFixed(0) + "K", color: "#7A1FA2" },
          { label: "CTR TB", val: "5.4%", color: "#00796B" },
          { label: "Vị Trí", val: "2.8", color: COLORS.terracotta },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 12,
              padding: "10px 8px",
              textAlign: "center",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: COLORS.inkMuted, fontWeight: 700 }}>
              {item.label}
            </div>
            <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: item.color, marginTop: 4 }}>
              {item.val}
            </div>
          </div>
        ))}
      </div>

      {/* Biểu đồ đường tăng trưởng SVG với gradient fill */}
      <div style={{ position: "relative", height: 70, width: "100%", overflow: "hidden" }}>
        <svg width="100%" height={70} viewBox="0 0 450 70" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gscGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A73E8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#1A73E8" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 58 Q 90 52, 160 42 T 280 26 T 380 14 T 450 8 L 450 70 L 0 70 Z"
            fill="url(#gscGrad)"
          />
          <path
            d="M 0 58 Q 90 52, 160 42 T 280 26 T 380 14 T 450 8"
            fill="none"
            stroke="#1A73E8"
            strokeWidth={3}
            strokeDasharray="500"
            strokeDashoffset={500 * (1 - progress)}
          />
          <circle cx={450 * progress} cy={58 - 50 * progress} r={5} fill="#1A73E8" stroke="#FFFFFF" strokeWidth={2} />
        </svg>
      </div>
    </div>
  );
};

/**
 * 73. PageSpeedGauge: Đồng hồ đo điểm hiệu năng Google PageSpeed 99/100
 */
export const PageSpeedGauge: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const score = Math.min(99, Math.round(interpolate(frame - delay, [0, 45], [0, 99], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 24px",
        width: 480,
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
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <FaIcon icon="gauge-high" size={13} color="#059669" />
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted, fontWeight: 800 }}>
            GOOGLE PAGESPEED INSIGHTS
          </span>
        </div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18, color: COLORS.inkPrimary }}>
          Core Web Vitals Tối Đa
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          {[
            { metric: "LCP", val: "0.9s" },
            { metric: "FID", val: "8ms" },
            { metric: "CLS", val: "0.00" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#ECFDF5",
                color: "#059669",
                padding: "3px 8px",
                borderRadius: 6,
                fontFamily: FONTS.mono,
                fontSize: 10.5,
                fontWeight: 800,
              }}
            >
              <FaIcon icon="check" size={9} color="#059669" />
              <span>{item.metric}: {item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Đồng hồ vòng tròn điểm xanh lá chuẩn Google */}
      <div style={{ position: "relative", width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={84} height={84} viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="none" stroke="#E6F4EA" strokeWidth="5" />
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#059669"
            strokeWidth="5"
            strokeDasharray="157"
            strokeDashoffset={157 - (157 * score) / 100}
            strokeLinecap="round"
            transform="rotate(-90 30 30)"
          />
        </svg>
        <span style={{ position: "absolute", fontFamily: FONTS.inter, fontWeight: 900, fontSize: 24, color: "#059669" }}>
          {score}
        </span>
      </div>
    </div>
  );
};

/**
 * 74. MetaAdPreview: Mẫu bài đăng Quảng cáo Meta Sponsored chuẩn nhận diện
 */
export const MetaAdPreview: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 20px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      {/* Header Fanpage */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: "#F0F2F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Img src={staticFile("icon/meta.png")} style={{ width: 26, height: 26, objectFit: "contain" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Performance Creative Hub</span>
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaIcon icon="check" size={8} color="#FFFFFF" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, marginTop: 1 }}>
            <span>Được tài trợ</span>
            <span>•</span>
            <FaIcon icon="globe" size={9} color={COLORS.inkMuted} />
          </div>
        </div>
      </div>

      {/* Primary Ad Copy */}
      <div style={{ fontFamily: FONTS.inter, fontSize: 13, color: COLORS.inkPrimary, marginBottom: 12, lineHeight: 1.45 }}>
        Khám phá bí quyết nhân 5 lần tỷ lệ chuyển đổi (ROAS 4.8x) với định dạng <strong>Editorial Paper Motion Video</strong>. Đăng ký nhận tài liệu chiến dịch ngay hôm nay.
      </div>

      {/* Ad Creative Image Banner Mockup */}
      <div
        style={{
          height: 140,
          backgroundColor: "#F9F6F0",
          borderRadius: 14,
          border: `1px solid ${COLORS.cardBorder}`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 12,
            backgroundColor: COLORS.terracotta,
            color: "#FFF",
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 10,
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          CASE STUDY
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <FaIcon icon="arrow-trend-up" size={24} color={COLORS.terracotta} />
          <span style={{ fontFamily: FONTS.frauncesNormal, fontWeight: 800, fontSize: 22, color: COLORS.inkPrimary }}>
            +280% CTR Quảng Cáo
          </span>
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkSecondary, marginTop: 4 }}>
          Paper Motion vs Static Image Ad
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F8F9FA",
          borderRadius: 12,
          padding: "10px 14px",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, textTransform: "uppercase" }}>
            GROWTHAGENCY.COM
          </div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13, color: COLORS.inkPrimary }}>
            Tải Tài Liệu Ebook Miễn Phí
          </div>
        </div>
        <div
          style={{
            backgroundColor: COLORS.terracotta,
            color: "#FFFFFF",
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 12,
            padding: "7px 16px",
            borderRadius: 8,
            boxShadow: SHADOWS.subtle,
          }}
        >
          Đăng ký ngay
        </div>
      </div>
    </div>
  );
};

/**
 * 75. MetaAdsManagerStats: Chỉ số hiệu quả Ads Manager (ROAS, CPA, Spend)
 */
export const MetaAdsManagerStats: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const roas = (4.72 + Math.sin(frame * 0.08) * 0.12).toFixed(2);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Img src={staticFile("icon/Facebook_Logo_Primary.png")} style={{ width: 22, height: 22, objectFit: "contain" }} />
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 15, color: COLORS.inkPrimary }}>
            Meta Ads Manager
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#DCFCE7",
            color: "#15803D",
            padding: "4px 12px",
            borderRadius: 12,
            fontFamily: FONTS.mono,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          <FaIcon icon="arrow-trend-up" size={11} color="#15803D" />
          <span>ROAS: {roas}X</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <div style={{ backgroundColor: "#FAF8F5", borderRadius: 14, padding: "12px", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <FaIcon icon="dollar" size={10} color={COLORS.inkMuted} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>NGÂN SÁCH</span>
          </div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 19, color: COLORS.inkPrimary }}>
            $1,450
          </div>
        </div>

        <div style={{ backgroundColor: "#FAF8F5", borderRadius: 14, padding: "12px", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <FaIcon icon="chart" size={10} color="#16A34A" />
            <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>DOANH SỐ</span>
          </div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 19, color: "#16A34A" }}>
            $6,980
          </div>
        </div>

        <div style={{ backgroundColor: "#FAF8F5", borderRadius: 14, padding: "12px", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <FaIcon icon="bullseye" size={10} color={COLORS.terracotta} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>CPA TỐI ƯU</span>
          </div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 19, color: COLORS.terracotta }}>
            $6.80
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 76. AdCreativeSplitTest: So sánh A/B Testing Creative (Ảnh tĩnh vs Motion Graphic)
 */
export const AdCreativeSplitTest: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        width: 480,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      {/* Biến thể A: Ảnh tĩnh thua cuộc */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 18,
          padding: "16px",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: SHADOWS.subtle,
          opacity: 0.75,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <FaIcon icon="close" size={11} color="#DC2626" />
          <span style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 800 }}>
            CREATIVE A (ẢNH TĨNH)
          </span>
        </div>
        <div
          style={{
            height: 90,
            backgroundColor: "#F1EFEA",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 4,
            marginBottom: 10,
          }}
        >
          <FaIcon icon="camera" size={20} color={COLORS.inkMuted} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>CTR: 1.1%</span>
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkSecondary, textAlign: "center" }}>
          CPA: $18.40 (Đắt)
        </div>
      </div>

      {/* Biến thể B: Paper Motion chiến thắng */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 18,
          padding: "16px",
          border: `2px solid ${COLORS.terracotta}`,
          boxShadow: SHADOWS.card,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -11,
            right: 12,
            backgroundColor: COLORS.terracotta,
            color: "#FFF",
            padding: "3px 10px",
            borderRadius: 8,
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <FaIcon icon="trophy" size={9} color="#FFFFFF" />
          <span>WINNER +280%</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <FaIcon icon="check" size={11} color="#16A34A" />
          <span style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.terracotta, fontWeight: 800 }}>
            CREATIVE B (PAPER MOTION)
          </span>
        </div>

        <div
          style={{
            height: 90,
            backgroundColor: COLORS.terracottaLight,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 4,
            marginBottom: 10,
            border: `1px dashed ${COLORS.terracotta}`,
          }}
        >
          <FaIcon icon="video" size={20} color={COLORS.terracotta} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 800 }}>
            CTR: 4.9% (+280%)
          </span>
        </div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 12, color: "#16A34A", textAlign: "center" }}>
          CPA: $5.20 (Rẻ x3 lần)
        </div>
      </div>
    </div>
  );
};

/**
 * 77. MarketingFunnel: Phễu chuyển đổi 4 tầng Marketing & Sales
 */
export const MarketingFunnel: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  const stages = [
    { name: "Top Phễu: Tiếp Cận (Awareness)", count: "100,000 Reach", width: "100%", bg: "#F8ECE7", icon: "bullhorn" },
    { name: "Giữa Phễu: Quan Tâm (Consideration)", count: "18,400 Click", width: "78%", bg: "#F3D5CA", icon: "filter" },
    { name: "Dưới Phễu: Khách Tiềm Năng (Leads)", count: "3,600 Lead", width: "56%", bg: "#EBBEAD", icon: "users" },
    { name: "Chốt Đơn: Mua Hàng (Purchase)", count: "720 Khách Hàng", width: "36%", bg: COLORS.terracotta, color: "#FFFFFF", icon: "dollar" },
  ];

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 15, color: COLORS.inkPrimary }}>
          Phễu Chuyển Đổi Doanh Thu (Marketing Funnel)
        </div>
        <FaIcon icon="filter" size={14} color={COLORS.terracotta} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "center" }}>
        {stages.map((st, i) => (
          <div
            key={i}
            style={{
              width: st.width,
              backgroundColor: st.bg,
              color: st.color || COLORS.inkPrimary,
              borderRadius: 10,
              padding: "9px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              boxShadow: SHADOWS.subtle,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FaIcon icon={st.icon} size={11} color={st.color || COLORS.terracotta} />
              <span style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 11.5 }}>{st.name}</span>
            </div>
            <span style={{ fontFamily: FONTS.mono, fontWeight: 800, fontSize: 11.5 }}>{st.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 78. KeywordRankTracker: Bảng theo dõi thứ hạng từ khóa SEO Top 1
 */
export const KeywordRankTracker: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  const keywords = [
    { kw: "dịch vụ làm video motion paper", rank: "#1", diff: "+6", vol: "9.4K/tháng" },
    { kw: "cách chạy ads meta chuyển đổi cao", rank: "#1", diff: "+12", vol: "16.8K/tháng" },
    { kw: "phần mềm dựng video ai remotion", rank: "#2", diff: "+4", vol: "7.2K/tháng" },
  ];

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaIcon icon="trophy" size={14} color="#F59E0B" />
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 15, color: COLORS.inkPrimary }}>
            Top Thứ Hạng Từ Khóa SEO
          </div>
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted }}>Ahrefs Live Rank</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {keywords.map((k, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              backgroundColor: i === 0 ? COLORS.terracottaLight : "#F9F8F5",
              borderRadius: 12,
              border: i === 0 ? `1.5px solid ${COLORS.terracotta}` : "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <div style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 13, color: COLORS.inkPrimary }}>
                {k.kw}
              </div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, marginTop: 2 }}>
                Lưu lượng: {k.vol}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: FONTS.inter,
                  fontWeight: 900,
                  fontSize: 18,
                  color: i === 0 ? COLORS.terracotta : COLORS.inkPrimary,
                }}
              >
                {k.rank}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  backgroundColor: "#DCFCE7",
                  color: "#16A34A",
                  padding: "3px 7px",
                  borderRadius: 6,
                  fontFamily: FONTS.mono,
                  fontSize: 10.5,
                  fontWeight: 800,
                }}
              >
                <FaIcon icon="arrow-trend-up" size={9} color="#16A34A" />
                <span>{k.diff}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 79. MrrGrowthTicker: Đồng hồ nhảy số doanh thu định kỳ MRR & Churn Rate
 */
export const MrrGrowthTicker: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const mrr = Math.min(52400, Math.round(interpolate(frame - delay, [0, 45], [0, 52400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 26px",
        width: 480,
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
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <FaIcon icon="dollar" size={11} color={COLORS.inkMuted} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>
            DOANH THU ĐỊNH KỲ (MRR)
          </span>
        </div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 32, color: COLORS.inkPrimary, letterSpacing: -0.5 }}>
          ${mrr.toLocaleString()}
          <span style={{ fontSize: 14, color: COLORS.terminalGreen, fontWeight: 800, marginLeft: 8 }}>
            +34% MoM
          </span>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: "#DCFCE7",
            color: "#16A34A",
            padding: "3px 8px",
            borderRadius: 6,
            fontFamily: FONTS.mono,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          <FaIcon icon="check" size={9} color="#16A34A" />
          <span>Churn: 0.6%</span>
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: COLORS.terracotta, fontWeight: 800, marginTop: 5 }}>
          LTV/CAC: 5.2X
        </div>
      </div>
    </div>
  );
};

/**
 * 80. LeadGenerationCrmCard: Thẻ chuyển đổi Lead khách hàng tiềm năng CRM (HubSpot)
 */
export const LeadGenerationCrmCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 22px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1.5px solid ${COLORS.terracotta}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Img src={staticFile("icon/hubspot.png")} style={{ width: 20, height: 20, objectFit: "contain" }} />
          <span
            style={{
              backgroundColor: COLORS.terracottaLight,
              color: COLORS.terracotta,
              padding: "3px 10px",
              borderRadius: 8,
              fontFamily: FONTS.mono,
              fontSize: 10.5,
              fontWeight: 800,
            }}
          >
            QUALIFIED LEAD TỪ META ADS
          </span>
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted }}>Vừa gửi xong</span>
      </div>

      <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 16, color: COLORS.inkPrimary, marginBottom: 4 }}>
        Nguyễn Văn An • Giám Đốc Điều Hành (CEO)
      </div>
      <div style={{ fontFamily: FONTS.inter, fontSize: 12.5, color: COLORS.inkSecondary, marginBottom: 14 }}>
        Nhu cầu: Sản xuất 30 video Editorial Paper Motion/tháng • Ngân sách: $6,000/tháng
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.terracotta,
            color: "#FFF",
            borderRadius: 10,
            padding: "9px",
            textAlign: "center",
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 12.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            boxShadow: SHADOWS.subtle,
          }}
        >
          <FaIcon icon="calendar" size={12} color="#FFFFFF" />
          <span>Đặt lịch Demo tư vấn ngay</span>
        </div>
      </div>
    </div>
  );
};

/**
 * 81. BacklinkAuthorityTree: Cây đồ thị liên kết ngược truyền Link Juice Domain Rating 82
 */
export const BacklinkAuthorityTree: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  const backlinks = [
    { source: "vnexpress.net", dr: 88, dofollow: true },
    { source: "cafebiz.vn", dr: 76, dofollow: true },
    { source: "forbes.com", dr: 92, dofollow: true },
  ];

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
          <FaIcon icon="link" size={13} color="#1A73E8" />
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Backlink Quality & Domain Rating</span>
        </div>
        <span style={{ backgroundColor: "#E8F0FE", color: "#1A73E8", padding: "3px 8px", borderRadius: 6, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800 }}>DR: 82 / 100</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {backlinks.map((b, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: "#F8F9FA", borderRadius: 10 }}>
            <span style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 12 }}>{b.source}</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800, color: "#16A34A" }}>DR {b.dr}</span>
              <span style={{ fontSize: 9, backgroundColor: "#DCFCE7", color: "#16A34A", padding: "2px 6px", borderRadius: 4, fontFamily: FONTS.mono, fontWeight: 700 }}>Dofollow</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 82. SiteAuditHealthScore: Kiểm tra lỗi kỹ thuật SEO (Technical SEO Health Score 100%)
 */
export const SiteAuditHealthScore: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 24px",
        width: 480,
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
        <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>TECHNICAL SEO AUDIT</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 24, color: COLORS.inkPrimary, marginTop: 2 }}>
          100% Sức Khỏe Web
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 6, fontFamily: FONTS.mono, fontSize: 10.5, color: "#16A34A" }}>
          <span>0 Lỗi 404</span>
          <span>•</span>
          <span>100% Index</span>
          <span>•</span>
          <span>Sitemap Hợp Lệ</span>
        </div>
      </div>
      <div style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaIcon icon="shield" size={22} color="#16A34A" />
      </div>
    </div>
  );
};

/**
 * 83. SerpHeatmapClickMap: Bản đồ nhiệt nhấp chuột vào kết quả tìm kiếm Google #1
 */
export const SerpHeatmapClickMap: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Bản Đồ Nhiệt Nhấp Chuột (SERP Heatmap)</div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 800 }}>Top 1 chiếm 68% Clicks</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ backgroundColor: "#FEE2E2", border: "1.5px solid #EF4444", borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, color: "#991B1B" }}>
          <span>Vị Trí #1 (Top Đỉnh)</span>
          <span>68.2% Lượt Nhấp</span>
        </div>
        <div style={{ backgroundColor: "#FEF3C7", borderRadius: 8, padding: "6px 12px", display: "flex", justifyContent: "space-between", fontSize: 11, color: "#92400E" }}>
          <span>Vị Trí #2</span>
          <span>15.4%</span>
        </div>
        <div style={{ backgroundColor: "#F3F4F6", borderRadius: 8, padding: "6px 12px", display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4B5563" }}>
          <span>Vị Trí #3</span>
          <span>7.3%</span>
        </div>
      </div>
    </div>
  );
};

/**
 * 84. SchemaMarkupRichSnippet: Dữ liệu có cấu trúc FAQ & Product Schema JSON-LD
 */
export const SchemaMarkupRichSnippet: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

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
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <FaIcon icon="code" size={12} color="#1A73E8" />
        <span style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>SCHEMA.ORG JSON-LD</span>
      </div>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14, color: "#1A0DAB", marginBottom: 6 }}>
        Câu Hỏi Thường Gặp (FAQ Rich Snippet)
      </div>
      <div style={{ backgroundColor: "#F8F9FA", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: COLORS.inkSecondary }}>
        <strong>Q: Thời gian sản xuất 1 video là bao lâu?</strong><br />
        A: Nhờ Remotion Paper Engine, thời gian render hoàn thành trong 15 phút.
      </div>
    </div>
  );
};

/**
 * 85. AdFrequencyFatigueMeter: Đo tần suất bão hòa quảng cáo Ad Fatigue
 */
export const AdFrequencyFatigueMeter: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 24px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Tần Suất Quảng Cáo (Ad Fatigue)</div>
        <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", padding: "2px 8px", borderRadius: 6, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800 }}>Tần suất: 1.4 (Tối Ưu)</span>
      </div>
      <div style={{ fontFamily: FONTS.inter, fontSize: 12, color: COLORS.inkSecondary, marginBottom: 10 }}>
        Tự động xoay vòng mẫu video creative mới khi tần suất chạm ngưỡng 3.0 để giữ CPA luôn thấp.
      </div>
      <div style={{ height: 8, backgroundColor: "#E5E7EB", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: "35%", height: "100%", backgroundColor: "#16A34A" }} />
      </div>
    </div>
  );
};

/**
 * 86. LookalikeAudienceExpander: Mở rộng tệp đối tượng tương tự Lookalike 1% - 5%
 */
export const LookalikeAudienceExpander: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

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
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Mở Rộng Tệp Đối Tượng Lookalike (LAL)</div>
        <FaIcon icon="users" size={13} color={COLORS.terracotta} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
        <div style={{ backgroundColor: COLORS.terracottaLight, border: `1.5px solid ${COLORS.terracotta}`, borderRadius: 10, padding: "8px" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>LAL 1%</div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 14, color: COLORS.inkPrimary, marginTop: 2 }}>650,000</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.inkMuted }}>Chuyển đổi cao nhất</div>
        </div>
        <div style={{ backgroundColor: "#F9F8F5", borderRadius: 10, padding: "8px" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>LAL 2%</div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14, marginTop: 2 }}>1,300,000</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.inkMuted }}>Quy mô mở rộng</div>
        </div>
        <div style={{ backgroundColor: "#F9F8F5", borderRadius: 10, padding: "8px" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>LAL 5%</div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14, marginTop: 2 }}>3,250,000</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.inkMuted }}>Tối đa tiếp cận</div>
        </div>
      </div>
    </div>
  );
};

/**
 * 87. ScrollStopHookRateMeter: Tỷ lệ dừng cuộn 3 giây đầu Scroll-Stop Rate 68%
 */
export const ScrollStopHookRateMeter: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 24px",
        width: 480,
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
        <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>3-SECOND HOOK RATE</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 28, color: COLORS.inkPrimary, marginTop: 2 }}>
          68.4% <span style={{ fontSize: 12, color: "#16A34A" }}>Gấp 3.8x trung bình</span>
        </div>
        <div style={{ fontFamily: FONTS.inter, fontSize: 11.5, color: COLORS.inkSecondary, marginTop: 2 }}>
          Nhờ Typography động &amp; Cắt cảnh dứt khoát 10 frames
        </div>
      </div>
      <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: COLORS.terracottaLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaIcon icon="eye" size={20} color={COLORS.terracotta} />
      </div>
    </div>
  );
};

/**
 * 88. CohortRetentionMatrix: Ma trận giữ chân khách hàng SaaS theo tháng (Cohort Retention)
 */
export const CohortRetentionMatrix: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Tỷ Lệ Giữ Chân Khách Hàng (Retention Cohort)</div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>12 Tháng</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, textAlign: "center", fontFamily: FONTS.mono, fontSize: 10 }}>
        {["M1: 100%", "M3: 92%", "M6: 88%", "M9: 85%", "M12: 83%", "LTV: 5x"].map((val, i) => (
          <div key={i} style={{ backgroundColor: i < 5 ? "#DCFCE7" : COLORS.terracottaLight, color: i < 5 ? "#166534" : COLORS.terracotta, padding: "6px 2px", borderRadius: 6, fontWeight: 800 }}>
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 89. NetPromoterScoreGauge: Thước đo mức độ hài lòng khách hàng NPS +78
 */
export const NetPromoterScoreGauge: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 24px",
        width: 480,
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
        <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>NET PROMOTER SCORE</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 32, color: "#16A34A", marginTop: 2 }}>
          NPS: +78
        </div>
        <div style={{ fontFamily: FONTS.inter, fontSize: 12, color: COLORS.inkSecondary }}>
          84% Khách Hàng Giới Thiệu Bạn Bè (Promoters)
        </div>
      </div>
      <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaIcon icon="heart" size={20} color="#16A34A" />
      </div>
    </div>
  );
};

/**
 * 90. SalesPipelineStageMove: Thẻ hợp đồng B2B $25,000 chuyển trạng thái Closed Won
 */
export const SalesPipelineStageMove: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 22px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1.5px solid ${COLORS.terminalGreen}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", padding: "3px 8px", borderRadius: 6, fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 800 }}>
          CLOSED WON • ĐÃ KÝ HỢP ĐỒNG
        </span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted }}>Deal #482</span>
      </div>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18, color: COLORS.inkPrimary, marginBottom: 4 }}>
        Gói Sản Xuất Video 1 Năm: $25,000
      </div>
      <div style={{ fontFamily: FONTS.inter, fontSize: 12, color: COLORS.inkSecondary }}>
        Khách hàng: Tập đoàn Thương Mại Điện Tử Quốc Tế
      </div>
    </div>
  );
};

/**
 * 91. PaymentGatewayCheckout: Giao diện thanh toán một chạm Apple Pay / Thẻ tín dụng
 */
export const PaymentGatewayCheckout: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
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
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>INSTANT 1-CLICK PAY</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 20, color: COLORS.inkPrimary, marginTop: 2 }}>
          Đã Thanh Toán Thành Công
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#16A34A", fontWeight: 700, marginTop: 2 }}>
          Visa •••• 4242 ($149.00)
        </div>
      </div>
      <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaIcon icon="check" size={18} color="#16A34A" />
      </div>
    </div>
  );
};

/**
 * 92. PricingTierMatrix: Bảng so sánh 3 gói giá (Starter, Pro, Enterprise)
 */
export const PricingTierMatrix: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        width: 480,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, padding: "12px", border: "1px solid rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>STARTER</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, margin: "4px 0" }}>$29</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.inkMuted }}>10 Video/tháng</div>
      </div>
      <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, padding: "12px", border: `2px solid ${COLORS.terracotta}`, textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", backgroundColor: COLORS.terracotta, color: "#FFF", fontSize: 8, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>POPULAR</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>PRO</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, margin: "4px 0", color: COLORS.terracotta }}>$79</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.inkMuted }}>30 Video + 60fps</div>
      </div>
      <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, padding: "12px", border: "1px solid rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>SCALE</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, margin: "4px 0" }}>$199</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.inkMuted }}>Unlimited + AI</div>
      </div>
    </div>
  );
};
