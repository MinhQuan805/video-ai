import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";
import { FaIcon } from "../../shared/FaIcon";

/**
 * 51. AccordionFaqUnfold: Thẻ accordion mở gấp nếp giấy mượt mà
 */
export const AccordionFaqUnfold: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const openProgress = interpolate(frame - delay, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: "18px 22px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>
          Tại sao video Motion Graphic lại chuyển đổi cao hơn ảnh tĩnh?
        </div>
        <div style={{ transform: `rotate(${openProgress * 180}deg)`, transition: "transform 0.2s" }}>
          <FaIcon icon="arrow-down" size={11} color={COLORS.terracotta} />
        </div>
      </div>

      <div
        style={{
          maxHeight: 100 * openProgress,
          overflow: "hidden",
          opacity: openProgress,
          marginTop: openProgress > 0 ? 10 : 0,
          borderTop: openProgress > 0 ? "1px solid rgba(0,0,0,0.06)" : "none",
          paddingTop: openProgress > 0 ? 10 : 0,
        }}
      >
        <div style={{ fontFamily: FONTS.inter, fontSize: 12.5, color: COLORS.inkSecondary, lineHeight: 1.5 }}>
          Não bộ xử lý hình ảnh chuyển động nhanh gấp 60,000 lần văn bản tĩnh. Nhịp cắt 10 frame giữ trọn sự chú ý và gia tăng tỷ lệ xem hết video lên 84%.
        </div>
      </div>
    </div>
  );
};

/**
 * 52. CardSwipeTinder: Thao tác vuốt gạt thẻ trái (Reject) và phải (Accept)
 */
export const CardSwipeTinder: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const swipeX = interpolate(frame - delay, [15, 40], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const swipeRotate = interpolate(frame - delay, [15, 40], [0, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 180,
        margin: "0 auto",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
      }}
    >
      {/* Thẻ nền bên dưới */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 10,
          right: 10,
          bottom: -8,
          backgroundColor: "#F2EFE9",
          borderRadius: 18,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: SHADOWS.subtle,
        }}
      />

      {/* Thẻ trên cùng đang vuốt */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#FFFFFF",
          borderRadius: 18,
          padding: "16px 20px",
          border: `1.5px solid ${COLORS.terracotta}`,
          boxShadow: SHADOWS.card,
          transform: `translateX(${swipeX}px) rotate(${swipeRotate}deg)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>QUYẾT ĐỊNH Ý TƯỞNG</span>
          <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 6 }}>
            APPROVE
          </span>
        </div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
          Đầu tư dựng 30 Paper Motion Videos / tháng
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaIcon icon="close" size={12} color="#DC2626" />
          </div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaIcon icon="heart" size={12} color="#16A34A" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 53. ScratchCardReveal: Thẻ cào tráng bạc cào lộ mã ưu đãi 50%
 */
export const ScratchCardReveal: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const scratchProgress = interpolate(frame - delay, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Thẻ Cào May Mắn Khách Hàng</div>
        <FaIcon icon="gift" size={13} color={COLORS.terracotta} />
      </div>

      <div
        style={{
          height: 65,
          borderRadius: 12,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.terracottaLight,
          border: `1.5px dashed ${COLORS.terracotta}`,
        }}
      >
        {/* Lớp ưu đãi ẩn bên dưới */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>MÃ GIẢM GIÁ 50%:</div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 20, color: COLORS.inkPrimary }}>PAPERMOTION50</div>
        </div>

        {/* Lớp tráng bạc cào đi */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: `${(1 - scratchProgress) * 100}%`,
            background: "linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)",
            borderLeft: "2px solid #FFFFFF",
          }}
        />
      </div>
    </div>
  );
};

/**
 * 54. PerforatedCouponTear: Phiếu giảm giá có đường đục lỗ xé rời
 */
export const PerforatedCouponTear: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const tearGap = interpolate(frame - delay, [20, 45], [0, 16], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        display: "flex",
        width: 460,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: 2.5, backgroundColor: "#FFFFFF", borderRadius: "16px 0 0 16px", padding: "16px 20px", border: `1px solid ${COLORS.cardBorder}`, borderRight: "none", boxShadow: SHADOWS.card }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>SPECIAL OFFER</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18, color: COLORS.inkPrimary, marginTop: 2 }}>Gói Khởi Động Doanh Nghiệp</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted, marginTop: 4 }}>Hạn dùng: 30 ngày kể từ ngày nhận</div>
      </div>

      {/* Đường xé đục lỗ */}
      <div style={{ width: 0, borderRight: "2px dashed #CBD5E1", margin: "8px 0" }} />

      <div
        style={{
          flex: 1,
          backgroundColor: COLORS.terracotta,
          color: "#FFFFFF",
          borderRadius: "0 16px 16px 0",
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: SHADOWS.card,
          transform: `translateX(${tearGap}px) rotate(${tearGap * 0.3}deg)`,
        }}
      >
        <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 22 }}>-30%</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 9, fontWeight: 800 }}>VOUCHER</span>
      </div>
    </div>
  );
};

/**
 * 55. RotatingWheelFortune: Vòng quay may mắn 8 ô quà tặng
 */
export const RotatingWheelFortune: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const wheelAngle = interpolate(frame - delay, [0, 50], [0, 720 + 45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "16px 22px",
        width: 440,
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
        <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 700 }}>MINIGAME TĂNG ENGAGEMENT</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18, color: COLORS.inkPrimary, marginTop: 2 }}>
          Vòng Quay May Mắn
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 800, marginTop: 4 }}>
          Phần thưởng: Miễn phí 1 Video Reel
        </div>
      </div>

      <div style={{ position: "relative", width: 72, height: 72 }}>
        <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `8px solid ${COLORS.terracotta}`, zIndex: 10 }} />
        <svg width={72} height={72} viewBox="0 0 100 100" style={{ transform: `rotate(${wheelAngle}deg)` }}>
          <circle cx="50" cy="50" r="48" fill="#FBF1ED" stroke={COLORS.terracotta} strokeWidth="3" />
          <line x1="50" y1="2" x2="50" y2="98" stroke={COLORS.terracotta} strokeWidth="2" />
          <line x1="2" y1="50" x2="98" y2="50" stroke={COLORS.terracotta} strokeWidth="2" />
          <line x1="16" y1="16" x2="84" y2="84" stroke={COLORS.terracotta} strokeWidth="2" />
          <line x1="16" y1="84" x2="84" y2="16" stroke={COLORS.terracotta} strokeWidth="2" />
          <circle cx="50" cy="50" r="10" fill={COLORS.terracotta} />
        </svg>
      </div>
    </div>
  );
};

/**
 * 56. SliderBeforeAfterComparison: Thanh trượt so sánh Trước và Sau
 */
export const SliderBeforeAfterComparison: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });
  const splitPos = interpolate(frame - delay, [10, 45], [30, 70], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: "16px 20px",
        width: 480,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#DC2626", fontWeight: 800 }}>BEFORE: AI Slop Đơ Lắc</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#16A34A", fontWeight: 800 }}>AFTER: Golden Spring 60fps</span>
      </div>

      <div style={{ position: "relative", height: 70, borderRadius: 12, overflow: "hidden", backgroundColor: "#F3EFE6" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#EAE6DE", display: "flex", alignItems: "center", paddingLeft: 20, color: "#888", fontSize: 12, fontWeight: 700 }}>
          Damping 10 • Chậm rì
        </div>

        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: `${100 - splitPos}%`, backgroundColor: COLORS.terracottaLight, borderLeft: `2.5px solid ${COLORS.terracotta}`, display: "flex", alignItems: "center", paddingLeft: 16, color: COLORS.terracotta, fontSize: 12, fontWeight: 800 }}>
          Damping 22 • Dứt khoát
        </div>
      </div>
    </div>
  );
};

/**
 * 57. WaxSealLetter: Bức thư trang trọng niêm phong sáp son đỏ
 */
export const WaxSealLetter: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.snappy, enableIdleFloat: true });

  return (
    <div
      style={{
        backgroundColor: "#FAF7EE",
        borderRadius: 18,
        padding: "18px 24px",
        width: 460,
        boxShadow: SHADOWS.card,
        border: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        boxSizing: "border-box",
      }}
    >
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>CONFIDENTIAL BRIEF</div>
        <div style={{ fontFamily: FONTS.frauncesNormal, fontWeight: 800, fontSize: 18, color: COLORS.inkPrimary, marginTop: 2 }}>
          Cam Kết Chất Lượng Độc Bản
        </div>
        <div style={{ fontFamily: FONTS.inter, fontSize: 11.5, color: COLORS.inkSecondary, marginTop: 4 }}>
          Bảo mật 100% tài liệu và chiến lược sản xuất video của đối tác.
        </div>
      </div>

      <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#991B1B", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(153,27,27,0.3)" }}>
        <FaIcon icon="stamp" size={20} color="#FFFFFF" />
      </div>
    </div>
  );
};

/**
 * 58. StickyNotePeel: Giấy ghi chú Post-it vàng góc cong
 */
export const StickyNotePeel: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FEF08A", width: 220, height: 160, borderRadius: "2px 2px 24px 2px", padding: "16px", boxShadow: SHADOWS.card, transform: "rotate(-2deg)", margin: "0 auto", boxSizing: "border-box" }}>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13, color: "#713F12" }}>Lưu ý quan trọng:</div>
      <div style={{ fontFamily: FONTS.inter, fontSize: 12, color: "#854D0E", marginTop: 6, lineHeight: 1.4 }}>
        Luôn dùng damping: 22, mass: 0.7 để animation hạ cánh trong 10 frame, không bị đơ!
      </div>
    </div>
  );
};

/**
 * 59. NewspaperHeadline: Báo cắt dán phong cách Vintage
 */
export const NewspaperHeadline: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#F5F2EB", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 12, padding: "16px 20px", width: 440, boxShadow: SHADOWS.subtle }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: COLORS.inkMuted, borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: 4, marginBottom: 8 }}>THE DAILY AI DISRUPTION • NOV 2026</div>
      <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 22, fontWeight: 900, color: COLORS.inkPrimary, lineHeight: 1.2, marginBottom: 6 }}>
        Paper Motion Engine Thay Thế Toàn Bộ Video AI Cũ
      </div>
      <div style={{ fontFamily: FONTS.inter, fontSize: 11.5, color: COLORS.inkSecondary, lineHeight: 1.4 }}>
        Kỷ nguyên dựng video ngắn bằng code Remotion chính thức bùng nổ với độ mượt mà tuyệt đối 60 khung hình/giây.
      </div>
    </div>
  );
};

/**
 * 60. TextHighlighterSwipe: Bút dạ quang tô màu quét qua từ khóa
 */
export const TextHighlighterSwipe: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const width = Math.min(100, Math.max(0, (frame - delay) * 4));

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "16px 22px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 20, color: COLORS.inkPrimary, lineHeight: 1.5 }}>
        Khám phá bí quyết đạt{" "}
        <span style={{ position: "relative", display: "inline-block", fontWeight: 900, color: COLORS.terracotta }}>
          <span style={{ position: "absolute", left: 0, bottom: 2, height: 12, width: `${width}%`, backgroundColor: "#FEF08A", zIndex: 0, borderRadius: 2 }} />
          <span style={{ position: "relative", zIndex: 1 }}>ROAS 4.8X</span>
        </span>{" "}
        với chi phí sản xuất siêu tiết kiệm.
      </div>
    </div>
  );
};

/**
 * 61. PriceStrikeThrough: Gạch giá cũ đỏ và hiện giá ưu đãi mới
 */
export const PriceStrikeThrough: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const isStruck = frame > delay + 15;

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 24px", width: 420, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted }}>GIÁ CŨ:</div>
        <div style={{ fontFamily: FONTS.inter, fontSize: 20, color: COLORS.inkMuted, textDecoration: isStruck ? "line-through" : "none", textDecorationColor: "#DC2626", textDecorationThickness: 3 }}>
          $1,500/video
        </div>
      </div>
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>ƯU ĐÃI NAY CHỈ:</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 28, color: COLORS.terracotta }}>
          $499/video
        </div>
      </div>
    </div>
  );
};

/**
 * 62. BadgeStickerSlam: Huy hiệu Sticker răng cưa đập nảy
 */
export const BadgeStickerSlam: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const entrance = getSmoothEntrance({ frame, delay, config: SPRING_PRESETS.pop, distanceY: -20, startScale: 0.6 });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          backgroundColor: COLORS.terracotta,
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: SHADOWS.sticker,
          transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(-8deg)`,
          opacity: entrance.opacity,
          border: "2px dashed #FFFFFF",
        }}
      >
        <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 14 }}>100%</span>
        <span style={{ fontFamily: FONTS.mono, fontWeight: 800, fontSize: 9 }}>MƯỢT MÀ</span>
      </div>
    </div>
  );
};

/**
 * 63. PaperBinderClip: Kẹp bướm kim loại kẹp giữ tài liệu
 */
export const PaperBinderClip: React.FC<{ delay?: number }> = () => {
  return (
    <div style={{ position: "relative", width: 280, backgroundColor: "#FFFFFF", borderRadius: 12, padding: "20px", boxShadow: SHADOWS.card, margin: "0 auto", border: `1px solid ${COLORS.cardBorder}` }}>
      {/* Kẹp kim loại ở đỉnh */}
      <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 44, height: 24, backgroundColor: "#1C1B1A", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SHADOWS.subtle }}>
        <div style={{ width: 24, height: 12, border: "2px solid #A1A1AA", borderRadius: 2 }} />
      </div>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13, color: COLORS.inkPrimary, marginTop: 4, textAlign: "center" }}>
        Tài Liệu Đã Kẹp Hồ Sơ
      </div>
    </div>
  );
};

/**
 * 64. TornPaperReveal: Mép giấy rách tự nhiên lộ nội dung
 */
export const TornPaperReveal: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const width = Math.min(100, Math.max(0, (frame - delay) * 3));

  return (
    <div style={{ position: "relative", width: 440, height: 80, backgroundColor: COLORS.terracotta, borderRadius: 14, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SHADOWS.card }}>
      <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18, color: "#FFFFFF" }}>
        BÍ MẬT TĂNG TRƯỞNG DOANH THU
      </span>
      {/* Lớp giấy trắng bị xé trượt sang trái */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: `${100 - width}%`,
          backgroundColor: "#FAF8F5",
          borderRight: "4px dotted #CBD5E1",
        }}
      />
    </div>
  );
};
