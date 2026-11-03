import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene09_LeadMagnetHorseshoe: React.FC = () => {
  const frame = useCurrentFrame();

  const attractFrame = 12;
  // Magnetic attraction: exponential magnetic snap over 14 frames, stopping completely
  const pullProgress = smoothStep(frame, attractFrame, 14, 0, 1, EASING_PRESETS.mechanicalSnap);
  
  const leadCount = Math.min(12850, Math.floor(1200 + pullProgress * (12850 - 1200)));
  const isAttracting = frame >= attractFrame;

  const leads = [
    { title: "CTO • FinTech", x: -160, y: 180 },
    { title: "VP Engineering", x: -90, y: 220 },
    { title: "Head of AI", x: 0, y: 240 },
    { title: "Founder & CEO", x: 90, y: 220 },
    { title: "Enterprise Architect", x: 160, y: 180 },
  ];

  return (
    <MotionWrapper
      step="09"
      category="Tăng Trưởng & Marketing B2B"
      headlineMain="Nam châm hút Lead,"
      headlineAccent="12,850 khách tiềm năng"
      subtitlePre="chiến dịch nội dung giá trị cao"
      subtitleAccent="thu hút đúng tệp ra quyết định"
    >
      <div style={{ position: "relative", width: 600, height: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Nam Châm Móng Ngựa - Tông Trắng & Cam Tối Giản */}
        <motion.div
          style={{
            width: 260,
            height: 240,
            border: `40px solid ${COLORS.terracotta}`,
            borderBottom: "none",
            borderRadius: "140px 140px 0 0",
            boxShadow: "0 28px 60px rgba(200,82,40,0.22)",
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Cực Bắc Trái (Trắng Sạch) */}
          <div
            style={{
              position: "absolute",
              left: -40,
              bottom: 0,
              width: 40,
              height: 50,
              backgroundColor: "#FFFFFF",
              border: `2px solid ${COLORS.terracotta}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.mono,
              fontWeight: 900,
              fontSize: 18,
              color: COLORS.terracotta,
            }}
          >
            N
          </div>

          {/* Cực Nam Phải (Trắng Sạch) */}
          <div
            style={{
              position: "absolute",
              right: -40,
              bottom: 0,
              width: 40,
              height: 50,
              backgroundColor: "#FFFFFF",
              border: `2px solid ${COLORS.terracotta}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.mono,
              fontWeight: 900,
              fontSize: 18,
              color: COLORS.terracotta,
            }}
          >
            S
          </div>
        </motion.div>

        {/* 5 Thẻ Lead B2B Bay Về Phía Nam Châm */}
        <div style={{ position: "relative", width: "100%", height: 180, marginTop: 20, zIndex: 15 }}>
          {leads.map((lead, i) => {
            const targetX = i < 3 ? -90 : 90;
            const targetY = 10;
            const currentX = interpolate(pullProgress, [0, 1], [lead.x, targetX]);
            const currentY = interpolate(pullProgress, [0, 1], [lead.y, targetY]);

            return (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  transform: `translate(calc(-50% + ${currentX}px), ${currentY}px)`,
                  backgroundColor: "#FFFFFF",
                  border: `2px solid ${isAttracting ? COLORS.terracotta : "rgba(29, 28, 26, 0.15)"}`,
                  borderRadius: 20,
                  padding: "6px 16px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  fontFamily: FONTS.mono,
                  fontWeight: 900,
                  fontSize: 12,
                  color: COLORS.inkPrimary,
                  whiteSpace: "nowrap",
                }}
              >
                ★ {lead.title}
              </motion.div>
            );
          })}
        </div>

        {/* Màn Hình Đếm Ticker Số Lượng Lead - Trắng & Cam */}
        <motion.div
          style={{
            marginTop: 20,
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
          <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 18, color: COLORS.inkPrimary }}>
            +{leadCount.toLocaleString()} QUALIFIED B2B LEADS
          </span>
        </motion.div>
      </div>
    </MotionWrapper>
  );
};
