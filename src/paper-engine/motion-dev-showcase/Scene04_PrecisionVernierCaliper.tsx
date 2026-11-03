import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene04_PrecisionVernierCaliper: React.FC = () => {
  const frame = useCurrentFrame();

  const clampFrame = 18;
  const isClamped = frame >= clampFrame;
  // 1. Sliding Jaw moves with buttery-smooth Apple Quintic Out (0 micro-jitter, stops dead at 350)
  const rightJawX = smoothStep(frame, 2, 16, 460, 350, EASING_PRESETS.appleEaseOut);

  // 2. Chip micro-compression upon machined contact: 2 damped micro-ticks (8 frames), then dead silent
  const clampRel = Math.max(0, frame - clampFrame);
  const chipScale = (clampRel > 0 && clampRel < 10)
    ? 1 - Math.sin(clampRel * 0.8) * Math.exp(-clampRel * 0.45) * 0.03
    : 1;

  return (
    <MotionWrapper
      step="04"
      category="Phát Triển Sản Phẩm & Kỹ Thuật"
      headlineMain="Thước kẹp vi mô,"
      headlineAccent="chuẩn xác 3 Nanomet"
      subtitlePre="đo đạc từng chi tiết kiến trúc vi mạch"
      subtitleAccent="dung sai bằng 0 tuyệt đối"
    >
      <div style={{ position: "relative", width: 620, height: 480, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Thước Kẹp Kim Loại - Tông Trắng & Cam Tối Giản */}
        <div style={{ position: "relative", width: 560, height: 260 }}>
          
          {/* Thanh Thước Ngang - Nền Trắng Sạch & Vạch Đo Mực/Cam */}
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 40,
              width: 500,
              height: 36,
              backgroundColor: "#FFFFFF",
              borderRadius: 6,
              border: "2px solid rgba(29, 28, 26, 0.15)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              boxSizing: "border-box",
            }}
          >
            {/* Các vạch đo tỷ lệ */}
            <div style={{ display: "flex", gap: 8, width: "100%", justifyContent: "space-between" }}>
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i % 5 === 0 ? 2 : 1,
                    height: i % 5 === 0 ? 18 : 10,
                    backgroundColor: i % 5 === 0 ? COLORS.terracotta : "rgba(29, 28, 26, 0.3)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mỏ Kẹp Cố Định Bên Trái (Fixed Left Jaw) - Trắng & Cam */}
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 20,
              width: 110,
              height: 200,
              backgroundColor: "#FFFFFF",
              borderRadius: "8px 0 0 16px",
              border: "2px solid rgba(29, 28, 26, 0.15)",
              borderRight: `3px solid ${COLORS.terracotta}`,
              boxShadow: "0 14px 28px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 12,
              boxSizing: "border-box",
              zIndex: 10,
            }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 800, color: COLORS.terracotta }}>
              VERNIER
            </span>
            <div style={{ width: 12, height: 40, backgroundColor: COLORS.terracotta, borderRadius: 3 }} />
          </div>

          {/* Khối Vi Mạch Silicon 3nm Ở Giữa (Hoàn Toàn Không Bị Che Chữ) */}
          <motion.div
            style={{
              position: "absolute",
              left: 150,
              top: 60,
              width: 200,
              height: 140,
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              border: `3px solid ${isClamped ? COLORS.terracotta : "rgba(29, 28, 26, 0.15)"}`,
              boxShadow: isClamped ? "0 16px 36px rgba(200,82,40,0.18)" : "0 10px 24px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${chipScale})`,
              zIndex: 5,
              padding: 16,
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 900, color: COLORS.terracotta, letterSpacing: 1 }}>
              SILICON ARCHITECTURE
            </div>
            <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 48, fontWeight: 900, color: COLORS.inkPrimary, margin: "4px 0" }}>
              3 nm
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted, fontWeight: 700 }}>
              EUV FINFET • ZERO DEFECT
            </div>
          </motion.div>

          {/* Mỏ Kẹp Trượt Bên Phải (Sliding Right Jaw) - Kẹp Đúng Mép Phải */}
          <motion.div
            style={{
              position: "absolute",
              left: rightJawX,
              top: 20,
              width: 90,
              height: 200,
              backgroundColor: "#FFFFFF",
              borderRadius: "0 8px 16px 0",
              border: "2px solid rgba(29, 28, 26, 0.15)",
              borderLeft: `3px solid ${COLORS.terracotta}`,
              boxShadow: "0 16px 32px rgba(0,0,0,0.1)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 12,
              boxSizing: "border-box",
            }}
          >
            {/* Núm Vặn Lăn Ngón Tay (Thumb Roller) - Màu Cam */}
            <div
              style={{
                width: 20,
                height: 36,
                backgroundColor: COLORS.terracotta,
                borderRadius: 4,
                alignSelf: "flex-end",
                boxShadow: "0 2px 6px rgba(200,82,40,0.3)",
              }}
            />
            <div style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 800, color: COLORS.inkMuted, textAlign: "right" }}>
              LOCK
            </div>
          </motion.div>
        </div>

        {/* Màn Hình Đồng Hồ Số Đo Điện Tử Bật Ra Phía Dưới */}
        {isClamped && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
            style={{
              marginTop: 30,
              backgroundColor: "#FFFFFF",
              padding: "12px 36px",
              borderRadius: 30,
              border: `2px solid ${COLORS.terracotta}`,
              boxShadow: "0 14px 32px rgba(200,82,40,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              READOUT: 3.000 nm ± 0.001 TOLERANCE VERIFIED
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
