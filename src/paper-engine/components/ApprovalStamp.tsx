import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getImpactRecoil, getBlinkState } from "../physics";

export interface ApprovalStampProps {
  stampText?: string;
  angle?: number;
  delay?: number;
  documentTitle?: string;
  documentSnippet?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * ApprovalStamp: Con dấu đóng cộp vật lý cực mạnh kèm tương tác sống động.
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + Con dấu nện cộp xuống gây rung chấn giật lùi (Impact Recoil).
 *   + Sau khi đóng, vệt sáng Shimmer lướt qua mặt con dấu.
 *   + Robot bên hông ngó đầu ra chớp mắt gật đầu đồng ý.
 */
export const ApprovalStamp: React.FC<ApprovalStampProps> = ({
  stampText = "Duyệt",
  angle = -7,
  delay = 8,
  documentTitle = "Lỗi",
  documentSnippet = "Đã sửa hoàn tất trong api.ts và chuẩn bị commit lên repo...",
  width = 460,
  height = 240,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chuyển động xuất hiện của tờ tài liệu
  const docEntrance = getSmoothEntrance({
    frame,
    fps,
    delay: 2,
    config: SPRING_PRESETS.snappy,
    distanceY: 30,
    startScale: 0.94,
    enableIdleFloat: true,
  });

  // Chuyển động nện dấu cộp xuống (Slam)
  const stampEntrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.slam,
    distanceY: -40,
    startScale: 1.6,
    enableIdleFloat: false,
  });

  // Rung chấn va đập trên tài liệu khi con dấu nện xuống (tại frame delay)
  const recoil = getImpactRecoil(frame, delay + 2, 4.5, 8);

  // Chớp mắt của robot nhòm trộm
  const { scaleY: eyeBlink } = getBlinkState(frame, 55, 4);
  const robotNodY = frame > delay + 6 ? Math.sin((frame - delay) * 0.15) * 2 : 0;

  // Ánh sáng shimmer lướt qua con dấu sau khi đóng
  const stampAge = frame - (delay + 6);
  const shimmerProgress = Math.max(0, Math.min(1, stampAge / 20));

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        transform: `translateY(${docEntrance.translateY + recoil.offsetY}px) scale(${docEntrance.scale * recoil.scale}) rotate(${docEntrance.idleRotate}deg)`,
        opacity: docEntrance.opacity,
        filter: docEntrance.filter,
        ...style,
      }}
    >
      {/* Tờ tài liệu / Email Draft Paper Card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.cardBg,
          borderRadius: 20,
          boxShadow: SHADOWS.card,
          border: `1px solid ${COLORS.cardBorder}`,
          padding: "24px 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Header tài liệu */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 18, color: COLORS.inkPrimary }}>
            {documentTitle}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 40, height: 6, backgroundColor: "rgba(0,0,0,0.08)", borderRadius: 3 }} />
            <div style={{ width: 24, height: 6, backgroundColor: "rgba(0,0,0,0.08)", borderRadius: 3 }} />
          </div>
        </div>

        {/* Đoạn văn skeleton lines mô phỏng văn bản */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          <div style={{ width: "95%", height: 8, backgroundColor: "rgba(0,0,0,0.07)", borderRadius: 4 }} />
          <div style={{ width: "88%", height: 8, backgroundColor: "rgba(0,0,0,0.07)", borderRadius: 4 }} />
          <div style={{ width: "70%", height: 8, backgroundColor: "rgba(0,0,0,0.07)", borderRadius: 4 }} />
        </div>

        {/* Robot nhỏ nhòm trộm từ bên hông, gật gù tán thành */}
        <div
          style={{
            position: "absolute",
            left: -24,
            bottom: 30 + robotNodY,
            width: 44,
            height: 44,
            backgroundColor: "#202022",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            boxShadow: SHADOWS.subtle,
            zIndex: 10,
          }}
        >
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.terracotta, transform: `scaleY(${eyeBlink})` }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.terracotta, transform: `scaleY(${eyeBlink})` }} />
        </div>
      </div>

      {/* Con dấu cao su đóng cộp đè lên (Approval Rubber Stamp) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${stampEntrance.translateY}px) scale(${stampEntrance.scale}) rotate(${angle}deg)`,
          opacity: stampEntrance.opacity,
          filter: stampEntrance.filter,
          border: `3.5px solid ${COLORS.terracotta}`,
          borderRadius: 12,
          padding: "10px 32px",
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(6px)",
          boxShadow: SHADOWS.sticker,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.frauncesItalic,
            fontStyle: "italic",
            fontWeight: 800,
            fontSize: 42,
            color: COLORS.terracotta,
            letterSpacing: "1px",
            lineHeight: 1,
          }}
        >
          {stampText}
        </span>

        {/* Vệt sáng lướt qua khi mực khô */}
        {stampAge > 0 && stampAge < 25 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${shimmerProgress * 140 - 20}%`,
              width: 30,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              transform: "skewX(-20deg)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
};
