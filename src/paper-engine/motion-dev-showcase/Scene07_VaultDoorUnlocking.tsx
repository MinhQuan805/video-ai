import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene07_VaultDoorUnlocking: React.FC = () => {
  const frame = useCurrentFrame();

  const unlockFrame = 20;
  // Heavy cast-iron wheel spins 180 degrees with smooth torque (18 frames), stopping dead on mark
  const wheelAngle = smoothStep(frame, 2, 18, 0, 180, EASING_PRESETS.appleEaseOut);

  // Locking bolts retract with crisp mechanical snap (8 frames)
  const boltRetract = smoothStep(frame, unlockFrame, 8, 0, 24, EASING_PRESETS.mechanicalSnap);
  const isUnlocked = frame >= unlockFrame + 4;

  return (
    <MotionWrapper
      step="07"
      category="Tài Chính & Dòng Tiền SaaS"
      headlineMain="Xoay vô-lăng két sắt,"
      headlineAccent="Series A $10 Triệu"
      subtitlePre="mở khóa kho bạc tăng trưởng"
      subtitleAccent="nguồn vốn lớn sẵn sàng mở rộng quy mô"
    >
      <div style={{ position: "relative", width: 560, height: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Cửa Két Sắt Khối Tròn - Tông Trắng & Cam Tối Giản */}
        <motion.div
          style={{
            width: 380,
            height: 380,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: `14px solid ${COLORS.terracotta}`,
            boxShadow: "0 32px 64px rgba(200,82,40,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Vòng Bi Bánh Răng Đồng Tâm Khắc Chìm */}
          <div
            style={{
              position: "absolute",
              width: 310,
              height: 310,
              borderRadius: "50%",
              border: "2px dashed rgba(200,82,40,0.3)",
            }}
          />

          {/* 6 Chốt Khóa Tròn Màu Cam Thụt Vào */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              style={{
                position: "absolute",
                width: 24,
                height: 40,
                backgroundColor: COLORS.terracotta,
                borderRadius: 4,
                boxShadow: "0 4px 8px rgba(200,82,40,0.3)",
                transform: `rotate(${deg}deg) translateY(${-170 + boltRetract}px)`,
                transformOrigin: "center center",
              }}
            />
          ))}

          {/* Vô Lăng Quay Tay 4 Chấu - Trắng & Cam */}
          <motion.div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "#FAF8F5",
              border: `10px solid ${COLORS.terracotta}`,
              boxShadow: "0 10px 24px rgba(200,82,40,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${wheelAngle}deg)`,
              position: "relative",
            }}
          >
            {/* Nan Hoa Bánh Xe Ngang & Dọc */}
            <div style={{ position: "absolute", width: "100%", height: 10, backgroundColor: COLORS.terracotta, borderRadius: 4 }} />
            <div style={{ position: "absolute", width: 10, height: "100%", backgroundColor: COLORS.terracotta, borderRadius: 4 }} />

            {/* Núm Trung Tâm Trắng */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                border: `3px solid ${COLORS.terracotta}`,
                zIndex: 10,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Badge Series A - Trắng & Cam */}
        {isUnlocked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
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
              SERIES A • $10,000,000 TREASURY SECURED
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
