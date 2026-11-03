import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene03_IndustrialToggleSwitch: React.FC = () => {
  const frame = useCurrentFrame();

  const toggleFrame = 14;
  // Snap from -32 to +32 deg with mechanical torque (7 frames), 0 floaty wobble
  const leverAngle = smoothStep(frame, toggleFrame, 7, -32, 32, EASING_PRESETS.mechanicalSnap);
  const isTurnedOn = frame >= toggleFrame + 3;

  return (
    <MotionWrapper
      step="03"
      category="Vận Hành & Tự Động Hóa"
      headlineMain="Bật gạt công nghiệp,"
      headlineAccent="kích hoạt 100% AI"
      subtitlePre="chuyển toàn bộ quy trình thủ công"
      subtitleAccent="sang tự động hóa không chạm"
    >
      <div style={{ position: "relative", width: 560, height: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Bảng Điều Khiển Nhôm - Tông Trắng & Cam Tối Giản */}
        <motion.div
          style={{
            width: 420,
            height: 380,
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            border: "2px solid rgba(29, 28, 26, 0.12)",
            boxShadow: "0 28px 60px rgba(0,0,0,0.08)",
            padding: "24px 28px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* 4 Ốc Vít Lục Giác Màu Cam Nhạt */}
          {[
            { top: 16, left: 16 },
            { top: 16, right: 16 },
            { bottom: 16, left: 16 },
            { bottom: 16, right: 16 },
          ].map((pos, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                ...pos,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#FAF8F5",
                border: "2px solid rgba(200,82,40,0.4)",
              }}
            />
          ))}

          {/* Dàn Đèn Báo Trạng Thái LED Cam & Xám */}
          <div style={{ display: "flex", justifyContent: "space-between", width: "80%", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: !isTurnedOn ? "#F87171" : "#E2E8F0",
                  border: "2px solid rgba(29, 28, 26, 0.1)",
                }}
              />
              <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, color: COLORS.inkMuted }}>
                OFF
              </span>
            </div>

            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 900,
                color: COLORS.inkPrimary,
                letterSpacing: 2,
                borderBottom: `2px solid ${COLORS.terracotta}`,
                paddingBottom: 2,
              }}
            >
              TOGGLE SWITCH
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: isTurnedOn ? COLORS.terracotta : "#E2E8F0",
                  boxShadow: isTurnedOn ? `0 0 16px ${COLORS.terracotta}` : "none",
                  border: `2px solid ${isTurnedOn ? COLORS.terracotta : "rgba(29, 28, 26, 0.1)"}`,
                }}
              />
              <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, color: isTurnedOn ? COLORS.terracotta : COLORS.inkMuted }}>
                ON
              </span>
            </div>
          </div>

          {/* Ổ Xoay Trung Tâm - Nền Trắng Viền Cam Đậm */}
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: "50%",
              backgroundColor: "#FAF8F5",
              border: `6px solid ${COLORS.terracotta}`,
              boxShadow: "0 12px 28px rgba(200,82,40,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Cần Gạt Màu Cam */}
            <motion.div
              style={{
                width: 18,
                height: 110,
                backgroundColor: COLORS.terracotta,
                borderRadius: 9,
                transformOrigin: "bottom center",
                transform: `rotate(${leverAngle}deg)`,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 6px 14px rgba(200,82,40,0.3)",
              }}
            >
              {/* Đầu Núm Tròn Trắng */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: `3px solid ${COLORS.terracotta}`,
                  marginTop: -16,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                }}
              />
            </motion.div>
          </div>

          {/* Nhãn Hệ Thống */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 14, color: COLORS.inkPrimary }}>
              AI AGENT PIPELINE
            </div>
          </div>
        </motion.div>

        {/* Badge Kích Hoạt Tự Động Hóa - Trắng & Cam */}
        {isTurnedOn && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            style={{
              position: "absolute",
              bottom: -10,
              backgroundColor: "#FFFFFF",
              border: `2px solid ${COLORS.terracotta}`,
              borderRadius: 30,
              padding: "12px 32px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 14px 32px rgba(200,82,40,0.15)",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              AGENT ACTIVE • 100% OPERATIONAL
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
