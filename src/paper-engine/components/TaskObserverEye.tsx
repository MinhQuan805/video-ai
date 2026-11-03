import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getBlinkState } from "../physics";

export interface TaskObserverEyeProps {
  tasks?: string[];
  badgeText?: string;
  delay?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * TaskObserverEye: Con mắt quan sát tác vụ ngầm sống động.
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + Con mắt liếc qua lại liên tục theo dõi công việc (`pupilOffsetX`, `pupilOffsetY`).
 *   + Mí mắt chớp mắt tự nhiên (`getBlinkState`).
 *   + Các tác vụ terminal hoàn thành sẽ hiện dấu tích xanh lần lượt.
 */
export const TaskObserverEye: React.FC<TaskObserverEyeProps> = ({
  tasks = ["> edit api.ts", "> npm test", "> git commit"],
  badgeText = "✓ gu của bạn",
  delay = 4,
  width = 460,
  height = 240,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 28,
    startScale: 0.94,
    enableIdleFloat: true,
  });

  const badgeEntrance = getSmoothEntrance({
    frame,
    fps,
    delay: delay + 10,
    config: SPRING_PRESETS.pop,
    distanceY: 14,
    startScale: 0.85,
  });

  // Chớp mắt tự nhiên
  const { scaleY: eyeLidScaleY } = getBlinkState(frame, 70, 4);

  // Đồng tử liếc mượt mà qua lại
  const pupilOffsetX = Math.sin((frame - delay) * 0.07) * 6;
  const pupilOffsetY = Math.cos((frame - delay) * 0.05) * 3;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Con mắt quan sát Task Observer bên trái */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 130,
            height: 74,
            backgroundColor: "#FCE7CF",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            border: `3px solid ${COLORS.inkPrimary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: SHADOWS.card,
            transform: `scaleY(${eyeLidScaleY})`,
          }}
        >
          {/* Tròng mắt vàng cam gradient */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: `radial-gradient(circle, #EA580C 20%, #F59E0B 80%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translate(${pupilOffsetX}px, ${pupilOffsetY}px)`,
            }}
          >
            {/* Đồng tử đen */}
            <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: COLORS.inkPrimary }} />
          </div>
        </div>

        {/* Thẻ badge cam chốt hạ bên dưới */}
        <div
          style={{
            backgroundColor: COLORS.terracotta,
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: 12,
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 13,
            boxShadow: SHADOWS.sticker,
            transform: `translateY(${badgeEntrance.translateY}px) scale(${badgeEntrance.scale})`,
            opacity: badgeEntrance.opacity,
          }}
        >
          {badgeText}
        </div>
      </div>

      {/* Cột các thẻ lệnh terminal bên phải */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {tasks.map((task, idx) => {
          const itemDelay = delay + 4 + idx * 4;
          const itemEntrance = getSmoothEntrance({
            frame,
            fps,
            delay: itemDelay,
            config: SPRING_PRESETS.snappy,
            distanceY: 16,
            startScale: 0.92,
            enableIdleFloat: true,
            idleFloatSpeed: 0.05 + idx * 0.02,
          });

          // Tác vụ hoàn tất chuyển sang màu xanh lá
          const isDone = frame > itemDelay + 18;

          return (
            <div
              key={idx}
              style={{
                backgroundColor: COLORS.cardBg,
                border: isDone
                  ? `1.5px solid ${COLORS.terminalGreen}`
                  : `1.5px solid ${COLORS.terracotta}`,
                borderRadius: 12,
                padding: "10px 18px",
                boxShadow: SHADOWS.subtle,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `translateY(${itemEntrance.translateY}px) scale(${itemEntrance.scale})`,
                opacity: itemEntrance.opacity,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontWeight: 700,
                  fontSize: 14,
                  color: COLORS.inkPrimary,
                }}
              >
                {task}
              </span>
              {isDone && (
                <span style={{ color: COLORS.terminalGreen, fontWeight: 900, fontSize: 13 }}>
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
