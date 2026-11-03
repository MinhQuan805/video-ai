import React from "react";
import { useCurrentFrame } from "remotion";
import { motion } from "motion/react";
import { COLORS, FONTS, smoothStep, EASING_PRESETS } from "../tokens";
import { MotionWrapper } from "./MotionWrapper";

export const Scene01_AuctionGavelDeal: React.FC = () => {
  const frame = useCurrentFrame();

  const strikeFrame = 14;
  let gavelAngle = -20;
  if (frame < 6) {
    // 1. Anticipation windup (nhấc búa lên chuẩn bị gõ)
    gavelAngle = smoothStep(frame, 0, 6, -20, -55, EASING_PRESETS.appleEaseOut);
  } else if (frame < strikeFrame) {
    // 2. Gravitational strike down (bổ xuống với gia tốc trọng lực)
    gavelAngle = smoothStep(frame, 6, 8, -55, 12, EASING_PRESETS.gravityDrop);
  } else {
    // 3. Crisp wood impact: 2 damped micro-bounces over 8 frames, then completely frozen
    const rel = frame - strikeFrame;
    gavelAngle = (rel < 10)
      ? 12 + Math.sin(rel * 0.9) * Math.exp(-rel * 0.45) * -12
      : 12;
  }

  const impactRel = Math.max(0, frame - strikeFrame);
  const blockRecoil = (impactRel > 0 && impactRel < 10)
    ? Math.sin(impactRel * 0.9) * Math.exp(-impactRel * 0.4) * 10
    : 0;
  const blockScaleY = (impactRel > 0 && impactRel < 8)
    ? 1 - (1 - impactRel / 8) * 0.12
    : 1;

  const shockwave = impactRel > 0 ? smoothStep(frame, strikeFrame, 20, 0, 240, EASING_PRESETS.appleEaseOut) : 0;
  const shockOpacity = impactRel > 0 ? smoothStep(frame, strikeFrame, 20, 0.9, 0, EASING_PRESETS.appleEaseOut) : 0;

  // 4. Coins burst up with snappy overshoot without endless vibration
  const coinFly = smoothStep(frame, strikeFrame, 16, 0, 1, EASING_PRESETS.snappyOvershoot);

  return (
    <MotionWrapper
      step="01"
      category="Bán Hàng & Chốt Hợp Đồng"
      headlineMain="Gõ búa dứt khoát,"
      headlineAccent="chốt deal $150,000"
      subtitlePre="thỏa thuận Enterprise được xác nhận"
      subtitleAccent="ngay sau tiếng gõ đanh thép"
    >
      <div style={{ position: "relative", width: 600, height: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Shockwave Rings Tỏa Ra - Màu Cam */}
        {frame >= strikeFrame && (
          <motion.div
            style={{
              position: "absolute",
              top: 260,
              width: 220 + shockwave,
              height: 60 + shockwave * 0.35,
              borderRadius: "50%",
              border: `3px solid ${COLORS.terracotta}`,
              opacity: shockOpacity,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Búa Gõ - Tông Trắng & Cam Tối Giản */}
        <motion.div
          style={{
            position: "absolute",
            top: 100,
            transformOrigin: "380px 180px",
            transform: `rotate(${gavelAngle}deg)`,
            zIndex: 10,
          }}
        >
          {/* Đầu Búa - Nền Trắng Viền Cam Đậm */}
          <div
            style={{
              width: 170,
              height: 74,
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              border: `4px solid ${COLORS.terracotta}`,
              boxShadow: "0 18px 36px rgba(200,82,40,0.18)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Vòng Đai Cam Giữa */}
            <div
              style={{
                width: 32,
                height: "100%",
                backgroundColor: COLORS.terracotta,
              }}
            />
          </div>

          {/* Cán Búa - Màu Trắng Viền Mực/Cam */}
          <div
            style={{
              position: "absolute",
              left: 165,
              top: 26,
              width: 220,
              height: 22,
              backgroundColor: "#FFFFFF",
              borderRadius: "0 12px 12px 0",
              border: `3px solid ${COLORS.terracotta}`,
              boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
            }}
          />
        </motion.div>

        {/* Khối Đệm Gỗ Tròn Bị Đập (Sound Block) - Trắng & Cam */}
        <motion.div
          style={{
            position: "absolute",
            top: 260,
            transform: `translateY(${blockRecoil}px) scaleY(${blockScaleY})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 320,
              height: 70,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: `4px solid ${COLORS.terracotta}`,
              boxShadow: "0 20px 40px rgba(200,82,40,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 260,
                height: 48,
                borderRadius: "50%",
                border: `2px dashed ${COLORS.terracotta}`,
                opacity: 0.6,
              }}
            />
          </div>
        </motion.div>

        {/* 3 Đồng Tiền Bay Tung Lên - Nền Trắng Viền Cam */}
        {frame >= strikeFrame && (
          <div style={{ position: "absolute", top: 200, width: "100%", height: 200, pointerEvents: "none" }}>
            {[-120, 0, 120].map((offsetX, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  left: 300 + offsetX * coinFly,
                  top: 40 - Math.sin(coinFly * Math.PI) * 110 + (i === 1 ? -30 : 0),
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: `3px solid ${COLORS.terracotta}`,
                  boxShadow: "0 8px 18px rgba(200,82,40,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.terracotta,
                  fontFamily: FONTS.mono,
                  fontWeight: 900,
                  fontSize: 20,
                  transform: `rotate(${coinFly * 360}deg)`,
                }}
              >
                $
              </motion.div>
            ))}
          </div>
        )}

        {/* Huy Hiệu Chốt Hợp Đồng - Trắng & Cam */}
        {frame >= strikeFrame + 6 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            style={{
              position: "absolute",
              bottom: 10,
              backgroundColor: "#FFFFFF",
              padding: "12px 32px",
              borderRadius: 40,
              border: `2px solid ${COLORS.terracotta}`,
              boxShadow: "0 14px 32px rgba(200,82,40,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            <span style={{ fontFamily: FONTS.mono, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              DEAL CLOSED • $150,000 SIGNED
            </span>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};
