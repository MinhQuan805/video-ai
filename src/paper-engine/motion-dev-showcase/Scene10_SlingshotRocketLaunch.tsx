import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene10_SlingshotRocketLaunch: React.FC = () => {
  const frame = useCurrentFrame();

  const launchFrame = 14;
  const isPulling = frame < launchFrame;
  // 1. Pull back tension (nén dây ná)
  const pullbackY = isPulling ? smoothStep(frame, 0, launchFrame, 0, 80, EASING_PRESETS.appleEaseOut) : 80;

  // 2. High-velocity slingshot release: accelerates rapidly into the stratosphere
  const rocketY = !isPulling
    ? smoothStep(frame, launchFrame, 16, 80, -320, EASING_PRESETS.gravityDrop)
    : pullbackY;

  // 3. Elastic fork recoil: strictly 8 frames after release
  const relLaunch = Math.max(0, frame - launchFrame);
  const forkRecoil = (!isPulling && relLaunch < 10)
    ? Math.sin(relLaunch * 0.9) * Math.exp(-relLaunch * 0.45) * 14
    : 0;

  return (
    <MotionWrapper
      step="10"
      category="Tăng Trưởng & Bứt Phá Doanh Số"
      headlineMain="Bắn ná cao su,"
      headlineAccent="phóng vọt mốc $5M"
      subtitlePre="lực nén tăng trưởng bứt phá"
      subtitleAccent="vượt mọi chỉ tiêu KPI quý 4"
    >
      <div style={{ position: "relative", width: 560, height: 540, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Tên Lửa - Tông Trắng & Cam Tối Giản */}
        <motion.div
          style={{
            position: "absolute",
            top: 220,
            transform: `translateY(${rocketY}px)`,
            zIndex: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Thân Tên Lửa Trắng Viền Cam */}
          <div
            style={{
              width: 58,
              height: 110,
              backgroundColor: "#FFFFFF",
              borderRadius: "29px 29px 8px 8px",
              border: `3px solid ${COLORS.terracotta}`,
              boxShadow: "0 14px 28px rgba(200,82,40,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Chóp Đỉnh Cam */}
            <div style={{ position: "absolute", top: 0, width: "100%", height: 30, backgroundColor: COLORS.terracotta, borderRadius: "26px 26px 0 0" }} />
            {/* Logo $5M */}
            <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 13, color: COLORS.inkPrimary, marginTop: 24, zIndex: 5 }}>
              $5M
            </span>
          </div>

          {/* Ngọn Lửa Phun Đuôi Màu Cam */}
          {!isPulling && (
            <motion.div
              style={{
                width: 24,
                height: 44,
                backgroundColor: COLORS.terracotta,
                borderRadius: "0 0 12px 12px",
                boxShadow: "0 0 16px rgba(200,82,40,0.6)",
                transform: `scaleY(${Math.sin(frame * 0.8) * 0.3 + 1})`,
              }}
            />
          )}
        </motion.div>

        {/* Chạc Cây Ná Chữ Y - Nền Trắng Viền Cam */}
        <motion.div
          style={{
            position: "absolute",
            top: 240,
            transform: `translateY(${forkRecoil}px)`,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 2 Nhánh Chữ Y */}
          <div style={{ position: "relative", width: 220, height: 120 }}>
            {/* Nhánh Trái */}
            <div
              style={{
                position: "absolute",
                left: 20,
                width: 22,
                height: 110,
                backgroundColor: "#FFFFFF",
                border: `3px solid ${COLORS.terracotta}`,
                borderRadius: "11px 11px 0 0",
                transform: "rotate(-25deg)",
                transformOrigin: "bottom center",
                boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
              }}
            />

            {/* Dây Thun Cao Su Màu Cam */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 30,
                right: 30,
                height: isPulling ? 80 : 10,
                borderBottom: `6px solid ${COLORS.terracotta}`,
                borderRadius: isPulling ? "0 0 100px 100px" : "0",
              }}
            />

            {/* Nhánh Phải */}
            <div
              style={{
                position: "absolute",
                right: 20,
                width: 22,
                height: 110,
                backgroundColor: "#FFFFFF",
                border: `3px solid ${COLORS.terracotta}`,
                borderRadius: "11px 11px 0 0",
                transform: "rotate(25deg)",
                transformOrigin: "bottom center",
                boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
              }}
            />
          </div>

          {/* Cán Cầm Dưới Cùng */}
          <div
            style={{
              width: 28,
              height: 140,
              backgroundColor: "#FFFFFF",
              border: `3px solid ${COLORS.terracotta}`,
              borderRadius: "0 0 14px 14px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
            }}
          />
        </motion.div>

        {/* Cột Mốc Tăng Trưởng - Trắng & Cam */}
        {!isPulling && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
            style={{
              position: "absolute",
              bottom: 10,
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
              REVENUE LAUNCH • $5,000,000 ARR ACHIEVED
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
