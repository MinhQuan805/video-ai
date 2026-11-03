import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene02_ServerRamSnap: React.FC = () => {
  const frame = useCurrentFrame();

  const snapFrame = 14;
  // 1. RAM Stick drops with gravity acceleration, hitting the slot at exact frame 14
  const ramY = smoothStep(frame, 2, 12, -220, 0, EASING_PRESETS.gravityDrop);

  // 2. Motherboard Socket Compression: sharp rigid mechanical recoil over 8 frames
  const impactRel = Math.max(0, frame - snapFrame);
  const socketRecoil = (impactRel > 0 && impactRel < 10)
    ? Math.sin(impactRel * 0.9) * Math.exp(-impactRel * 0.45) * 8
    : 0;

  // 3. Dual Locking Latches: snap shut with instantaneous mechanical torque (6 frames)
  const latchAngle = smoothStep(frame, snapFrame, 6, 35, 0, EASING_PRESETS.mechanicalSnap);

  return (
    <MotionWrapper
      step="02"
      category="Cơ Sở Hạ Tầng & DevOps"
      headlineMain="Gài ngàm khóa,"
      headlineAccent="nạp thanh RAM 64GB"
      subtitlePre="mở rộng bộ nhớ đệm máy chủ"
      subtitleAccent="ECC DDR5 6400 MT/s tức thì"
    >
      <div style={{ position: "relative", width: 640, height: 480, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Thanh RAM Server - Tông Trắng & Cam Tối Giản */}
        <motion.div
          style={{
            width: 480,
            height: 130,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            border: `3px solid ${COLORS.terracotta}`,
            boxShadow: "0 24px 48px rgba(200,82,40,0.12)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px 20px",
            boxSizing: "border-box",
            transform: `translateY(${ramY}px)`,
            zIndex: 10,
            position: "relative",
          }}
        >
          {/* Header Thanh RAM: Logo & Thông Số Kỹ Thuật */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: COLORS.terracotta }} />
              <span style={{ fontFamily: FONTS.mono, color: COLORS.terracotta, fontSize: 14, fontWeight: 900 }}>
                SERVER ECC • DDR5 REG
              </span>
            </div>
            <span style={{ fontFamily: FONTS.mono, color: COLORS.inkPrimary, fontSize: 13, fontWeight: 800 }}>
              64GB • 6400 MT/s
            </span>
          </div>

          {/* Dàn Chip Nhớ Khối Trắng Viền Cam Nhạt */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, margin: "6px 0" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((chip) => (
              <div
                key={chip}
                style={{
                  flex: 1,
                  height: 44,
                  backgroundColor: "#FAF8F5",
                  borderRadius: 4,
                  border: "1.5px solid rgba(200,82,40,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
              </div>
            ))}
          </div>

          {/* Hàng Chân Mạ Vàng Tiếp Xúc */}
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 4, padding: "0 8px" }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 3.5,
                  height: 14,
                  backgroundColor: COLORS.terracotta,
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Khe Cắm DIMM Socket - Nền Trắng Viền Mực */}
        <motion.div
          style={{
            width: 560,
            height: 44,
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            border: "2px solid rgba(29, 28, 26, 0.15)",
            boxShadow: "0 14px 28px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
            marginTop: 4,
            position: "relative",
            transform: `translateY(${socketRecoil}px)`,
          }}
        >
          {/* Ngàm Khóa Cơ Khí Màu Cam Bên Trái */}
          <motion.div
            style={{
              width: 18,
              height: 50,
              backgroundColor: COLORS.terracotta,
              borderRadius: 4,
              boxShadow: "0 4px 10px rgba(200,82,40,0.3)",
              transformOrigin: "bottom right",
              transform: `rotate(${-latchAngle}deg)`,
            }}
          />

          {/* Rãnh Cắm Giữa */}
          <div
            style={{
              width: 480,
              height: 12,
              backgroundColor: "#F7F5EE",
              borderRadius: 3,
              border: "1px solid rgba(29, 28, 26, 0.1)",
            }}
          />

          {/* Ngàm Khóa Cơ Khí Màu Cam Bên Phải */}
          <motion.div
            style={{
              width: 18,
              height: 50,
              backgroundColor: COLORS.terracotta,
              borderRadius: 4,
              boxShadow: "0 4px 10px rgba(200,82,40,0.3)",
              transformOrigin: "bottom left",
              transform: `rotate(${latchAngle}deg)`,
            }}
          />
        </motion.div>

        {/* Badge Khóa Khớp Thành Công - Trắng & Cam */}
        {frame >= snapFrame + 4 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            style={{
              marginTop: 24,
              padding: "12px 32px",
              backgroundColor: "#FFFFFF",
              borderRadius: 30,
              border: `2px solid ${COLORS.terracotta}`,
              boxShadow: "0 12px 28px rgba(200,82,40,0.18)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              DUAL LATCHES LOCKED • +64GB LIVE CACHE
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
