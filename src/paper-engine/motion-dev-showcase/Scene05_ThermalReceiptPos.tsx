import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene05_ThermalReceiptPos: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Paper Extrusion Physics: Motorized paper feed (22 frames), stopping clean without jitter
  const paperHeight = smoothStep(frame, 2, 22, 0, 310, EASING_PRESETS.appleEaseOut);
  const paperFlutter = frame < 26 ? Math.sin(frame * 0.35) * 1.5 : 0;

  // 2. Paid Stamp Slam at frame 24
  const stampFrame = 24;
  const stampScale = smoothStep(frame, stampFrame, 8, 2.2, 1, EASING_PRESETS.snappyOvershoot);
  const stampOpacity = smoothStep(frame, stampFrame, 4, 0, 0.95, EASING_PRESETS.appleEaseOut);
  const isStamped = frame >= stampFrame;

  return (
    <MotionWrapper
      step="05"
      category="Tài Chính & Dòng Tiền SaaS"
      headlineMain="Nhả biên lai POS,"
      headlineAccent="chốt $5,000 ARR"
      subtitlePre="thanh toán tự động ghi nhận ngay lập tức"
      subtitleAccent="đồng bộ tài chính thời gian thực"
    >
      <div style={{ position: "relative", width: 560, height: 540, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: 30 }}>
        
        {/* Khe Máy In POS Kim Loại Đen & OLED Status */}
        <motion.div
          style={{
            width: 440,
            height: 64,
            background: "linear-gradient(180deg, #27272A 0%, #18181B 100%)",
            borderRadius: "14px 14px 4px 4px",
            border: "3px solid #3F3F46",
            boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            zIndex: 20,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 10px #10B981" }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, color: "#E4E4E7" }}>
              POS TERMINAL v4.2
            </span>
          </div>
          <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.terracotta, fontWeight: 900, letterSpacing: 1 }}>
            {frame < 20 ? "PRINTING INVOICE..." : "TRANSACTION OK"}
          </span>
        </motion.div>

        {/* Dải Giấy Hóa Đơn Trắng Đùn Dài Xuống với Răng Cưa Cắt */}
        <motion.div
          style={{
            width: 380,
            height: paperHeight,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 28px 60px rgba(0,0,0,0.18)",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            padding: "24px 28px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            position: "relative",
            transform: `translateX(${paperFlutter}px)`,
            zIndex: 10,
          }}
        >
          {/* Header Hóa Đơn */}
          <div style={{ textAlign: "center", borderBottom: "2px dashed #CBD5E1", paddingBottom: 12 }}>
            <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18, color: COLORS.inkPrimary }}>
              BIÊN LAI ĐƠN HÀNG SAAS
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.inkMuted, marginTop: 4 }}>
              #INV-2026-9812 • STRIPE PAY
            </div>
          </div>

          {/* Các Hàng Mục Chi Phí Chi Tiết */}
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.mono, fontSize: 14, fontWeight: 800 }}>
            <span>Gói Enterprise Core</span>
            <span>$4,250</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.mono, fontSize: 14, fontWeight: 800 }}>
            <span>Multi-Agent AI Addon</span>
            <span>$750</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.mono, fontSize: 14, fontWeight: 800, color: "#059669" }}>
            <span>Chiết khấu năm (-0%)</span>
            <span>$0</span>
          </div>

          {/* Dòng Tổng Tiền Khủng */}
          <div style={{ marginTop: "auto", borderTop: "3px solid #1D1C1A", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18 }}>TỔNG CỘNG:</span>
            <span style={{ fontFamily: FONTS.frauncesNormal, fontWeight: 900, fontSize: 32, color: "#059669" }}>
              $5,000
            </span>
          </div>

          {/* Con Dấu Nện "PAID" Đỏ Đập Xuống Biên Lai - Frame-driven Butter Smooth */}
          {isStamped && (
            <div
              style={{
                position: "absolute",
                top: 80,
                right: 30,
                border: "4px solid #DC2626",
                borderRadius: 8,
                padding: "8px 20px",
                color: "#DC2626",
                fontFamily: FONTS.mono,
                fontWeight: 900,
                fontSize: 26,
                letterSpacing: 2,
                boxShadow: "0 4px 12px rgba(220,38,38,0.3)",
                transform: `scale(${stampScale}) rotate(-14deg)`,
                opacity: stampOpacity,
              }}
            >
              PAID • 100%
            </div>
          )}
        </motion.div>

        {/* Răng Cưa Cắt Giấy Ở Dưới Cùng */}
        <div
          style={{
            width: 380,
            height: 10,
            background: "radial-gradient(circle, transparent 5px, #FFF 5px) 0 0/14px 10px repeat-x",
            marginTop: -2,
            zIndex: 10,
          }}
        />
      </div>
    </MotionWrapper>
  );
};
