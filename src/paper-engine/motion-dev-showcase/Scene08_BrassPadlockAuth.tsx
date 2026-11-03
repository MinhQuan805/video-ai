import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene08_BrassPadlockAuth: React.FC = () => {
  const frame = useCurrentFrame();

  const unlockFrame = 14;
  // 1. Key inserts smoothly into keyhole
  const keyInsert = smoothStep(frame, 2, 6, 0, 1, EASING_PRESETS.appleEaseOut);
  // 2. Key turns 90 degrees with crisp mechanical torque
  const keyTurn = smoothStep(frame, 8, 6, 0, 90, EASING_PRESETS.mechanicalSnap);

  // 3. Shackle pops open with spring release (8 frames), zero continuous wobble
  const shackleY = smoothStep(frame, unlockFrame, 8, 0, -50, EASING_PRESETS.snappyOvershoot);
  const isUnlocked = frame >= unlockFrame + 2;

  return (
    <MotionWrapper
      step="08"
      category="Bảo Mật Không Gian Mạng"
      headlineMain="Mở ổ khóa đồng,"
      headlineAccent="xác thực 2FA"
      subtitlePre="khóa bảo mật phần cứng chống giả mạo"
      subtitleAccent="tiêu chuẩn chứng nhận SOC2 Type II"
    >
      <div style={{ position: "relative", width: 560, height: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Càng Khóa Bằng Thép - Tông Trắng & Cam */}
        <motion.div
          style={{
            width: 170,
            height: 180,
            border: `24px solid ${COLORS.terracotta}`,
            borderBottom: "none",
            borderRadius: "90px 90px 0 0",
            boxShadow: "0 10px 24px rgba(200,82,40,0.2)",
            transform: `translateY(${shackleY}px)`,
            zIndex: 5,
            position: "relative",
          }}
        />

        {/* Thân Ổ Khóa Nền Trắng Viền Cam Đậm */}
        <motion.div
          style={{
            width: 320,
            height: 240,
            backgroundColor: "#FFFFFF",
            borderRadius: 28,
            border: `4px solid ${COLORS.terracotta}`,
            boxShadow: "0 28px 60px rgba(200,82,40,0.16)",
            marginTop: -60,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 20px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 14, color: COLORS.terracotta, letterSpacing: 2 }}>
            SECURITY LOCK
          </div>

          {/* Lỗ Cắm Chìa Khóa Màu Cam */}
          <div
            style={{
              width: 44,
              height: 56,
              borderRadius: "50% 50% 8px 8px",
              backgroundColor: "#FAF8F5",
              border: `2px solid ${COLORS.terracotta}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Chìa Khóa Màu Cam */}
            <motion.div
              style={{
                width: 12,
                height: 44,
                backgroundColor: COLORS.terracotta,
                borderRadius: 3,
                transform: `rotate(${keyTurn}deg) scale(${keyInsert})`,
              }}
            />
          </div>

          <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800, color: COLORS.inkMuted }}>
            256-BIT CRYPTO VAULT
          </div>
        </motion.div>

        {/* Badge Bảo Mật - Trắng & Cam */}
        {isUnlocked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
            style={{
              marginTop: 24,
              backgroundColor: "#FFFFFF",
              border: `2px solid ${COLORS.terracotta}`,
              borderRadius: 30,
              padding: "12px 32px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 14px 32px rgba(200,82,40,0.15)",
              zIndex: 20,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              2FA VERIFIED • SOC2 TYPE II CERTIFIED
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
