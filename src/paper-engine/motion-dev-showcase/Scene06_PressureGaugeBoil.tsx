import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene06_PressureGaugeBoil: React.FC = () => {
  const frame = useCurrentFrame();

  const spikeFrame = 18;
  // Needle sweeps up with industrial torque (18 frames), stopping firmly in the redline
  const baseAngle = smoothStep(frame, 2, 16, -120, 68, EASING_PRESETS.appleEaseOut);
  // Subtle vibration under peak hydraulic pressure
  const jitter = frame >= spikeFrame ? Math.sin((frame - spikeFrame) * 1.2) * 1.8 : 0;
  const needleAngle = baseAngle + jitter;

  return (
    <MotionWrapper
      step="06"
      category="Đo Lường Hiệu Năng & Chỉ Số"
      headlineMain="Đồng hồ quá tải,"
      headlineAccent="chạm đỉnh 10K req/s"
      subtitlePre="hệ thống vẫn đứng vững kiên cường"
      subtitleAccent="nhờ cơ chế tự động xả áp"
    >
      <div style={{ position: "relative", width: 560, height: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Thân Đồng Hồ - Tông Trắng & Cam Tối Giản */}
        <motion.div
          style={{
            width: 360,
            height: 360,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: `16px solid ${COLORS.terracotta}`,
            boxShadow: "0 28px 60px rgba(200,82,40,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Vạch Đo Cam Khắc Chìm */}
          <div
            style={{
              position: "absolute",
              width: 310,
              height: 310,
              borderRadius: "50%",
              border: "2px dashed rgba(200,82,40,0.3)",
              pointerEvents: "none",
            }}
          />

          {/* Vạch Đỏ Cảnh Báo Nguy Hiểm Vùng Đỏ */}
          <div
            style={{
              position: "absolute",
              top: 36,
              right: 48,
              width: 80,
              height: 16,
              backgroundColor: COLORS.terracotta,
              borderRadius: 4,
              transform: "rotate(38deg)",
            }}
          />

          <div style={{ position: "absolute", top: 80, fontFamily: FONTS.mono, fontWeight: 900, fontSize: 13, color: COLORS.inkMuted }}>
            PRESSURE GAUGE • REQ/S
          </div>

          <div style={{ position: "absolute", bottom: 70, fontFamily: FONTS.mono, fontWeight: 900, fontSize: 32, color: frame >= spikeFrame ? COLORS.terracotta : COLORS.inkPrimary }}>
            {frame >= spikeFrame ? "10,240" : "4,200"}
          </div>

          {/* Kim Chỉ Đồng Hồ Màu Cam */}
          <motion.div
            style={{
              position: "absolute",
              width: 8,
              height: 140,
              backgroundColor: COLORS.terracotta,
              borderRadius: "4px 4px 0 0",
              transformOrigin: "bottom center",
              transform: `rotate(${needleAngle}deg)`,
              top: 50,
              zIndex: 15,
              boxShadow: "0 4px 8px rgba(200,82,40,0.4)",
            }}
          />

          {/* Trục Quay Trung Tâm Màu Trắng Viền Cam */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: `4px solid ${COLORS.terracotta}`,
              zIndex: 20,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>

        {/* Badge Cảnh Báo Trạng Thái Áp Lực Đỉnh - Trắng & Cam */}
        {frame >= spikeFrame && (
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
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              PEAK LOAD 10K REQ/S • AUTO-THROTTLED
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
