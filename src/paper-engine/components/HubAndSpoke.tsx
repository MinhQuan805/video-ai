import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getWireDraw, getBlinkState, getIdleFloating } from "../physics";
import { AppTile, BrandType } from "./AppTile";

export interface SatelliteNode {
  brand: BrandType;
  label?: string;
  x: number;
  y: number;
  isActive?: boolean;
}

export interface HubAndSpokeProps {
  hubBrand?: BrandType;
  hubSize?: number;
  satellites?: SatelliteNode[];
  activeSatelliteIndex?: number;
  delay?: number;
  wireDelay?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * HubAndSpoke: Hệ thống mạng liên kết Trung tâm & Vệ tinh sống động.
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + Robot trung tâm chớp mắt tự nhiên (`getBlinkState`), đảo mắt và nghiêng nhẹ đầu.
 *   + Hạt năng lượng chạy tuần hoàn liên tục dọc theo các sợi dây nối.
 *   + Các vệ tinh bồng bềnh hữu cơ lệch pha nhau.
 */
export const HubAndSpoke: React.FC<HubAndSpokeProps> = ({
  hubBrand = "robot",
  hubSize = 100,
  satellites = [
    { brand: "gmail", label: "Gmail", x: 100, y: 120, isActive: true },
    { brand: "calendar", label: "Calendar", x: 440, y: 120 },
    { brand: "drive", label: "Drive", x: 100, y: 380 },
    { brand: "notion", label: "Notion", x: 440, y: 380 },
  ],
  activeSatelliteIndex = 0,
  delay = 3,
  wireDelay = 10,
  width = 540,
  height = 500,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 24,
    startScale: 0.95,
    enableIdleFloat: true,
  });

  const centerX = width / 2;
  const centerY = height / 2;

  // Tiến trình vẽ dây dẫn lần đầu
  const wireProgress = getWireDraw(frame, wireDelay, 14);

  // Chu kỳ hạt năng lượng tuần hoàn liên tục (20 frame / chu kỳ)
  const pulseLoop = ((frame * 1.5) % 30) / 30;

  // Chớp mắt và liếc mắt của Robot
  const { scaleY: eyeBlinkScale } = getBlinkState(frame, 60, 4);
  const robotPupilX = Math.sin(frame * 0.08) * 3;
  const robotHeadTilt = Math.sin(frame * 0.05) * 1.5;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale}) rotate(${entrance.idleRotate}deg)`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* SVG Canvas chứa các đường dây liên kết */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {satellites.map((sat, i) => {
          const isTarget = i === activeSatelliteIndex;
          const endX = sat.x + 45;
          const endY = sat.y + 45;

          const midX = (centerX + endX) / 2;
          const midY = (centerY + endY) / 2;
          const pathD = `M ${centerX} ${centerY} Q ${midX} ${midY} ${endX} ${endY}`;

          const strokeColor = isTarget ? COLORS.terracotta : "rgba(29, 28, 26, 0.18)";
          const strokeWidth = isTarget ? 3.5 : 2;
          const isDashed = !isTarget;

          // Hạt năng lượng chạy dọc dây nối active
          const beadX = interpolate(pulseLoop, [0, 1], [centerX, endX]);
          const beadY = interpolate(pulseLoop, [0, 1], [centerY, endY]);

          return (
            <g key={i}>
              {/* Dây chính */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isDashed ? "5,5" : "300"}
                strokeDashoffset={isTarget ? interpolate(wireProgress, [0, 1], [300, 0]) : 0}
                strokeLinecap="round"
              />

              {/* Hạt năng lượng phát sáng chạy liên tục tuần hoàn */}
              {isTarget && wireProgress > 0.8 && (
                <g>
                  <circle cx={beadX} cy={beadY} r={6} fill={COLORS.terracotta} opacity={0.3} />
                  <circle cx={beadX} cy={beadY} r={3.5} fill={COLORS.terracotta} />
                </g>
              )}

              {/* Chốt cắm kết nối ở hai đầu */}
              <circle cx={centerX} cy={centerY} r={4} fill={COLORS.terracotta} />
              {isTarget && wireProgress > 0.9 && (
                <circle cx={endX} cy={endY} r={5} fill={COLORS.terracotta} />
              )}
            </g>
          );
        })}
      </svg>

      {/* Hub Trung tâm với chuyển động mắt linh hoạt */}
      <div
        style={{
          position: "absolute",
          left: centerX - hubSize / 2,
          top: centerY - hubSize / 2,
          zIndex: 5,
          transform: `rotate(${robotHeadTilt}deg)`,
        }}
      >
        <AppTile
          brand={hubBrand}
          size={hubSize}
          delay={delay + 2}
          isActive={true}
        />
        {/* Lớp ghi đè mắt robot cử động thật */}
        {hubBrand === "robot" && (
          <div
            style={{
              position: "absolute",
              top: hubSize * 0.44,
              left: hubSize * 0.32,
              display: "flex",
              gap: 12,
              transform: `scaleY(${eyeBlinkScale}) translateX(${robotPupilX}px)`,
              pointerEvents: "none",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#FFFFFF" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#FFFFFF" }} />
          </div>
        )}
      </div>

      {/* Các nốt vệ tinh xung quanh lơ lửng hữu cơ */}
      {satellites.map((sat, i) => {
        const isTarget = i === activeSatelliteIndex;
        const satFloat = getIdleFloating(frame, { speed: 0.04, amplitudeY: 2, phase: i * 1.5 });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: sat.x,
              top: sat.y + satFloat.y,
              zIndex: 4,
            }}
          >
            <AppTile
              brand={sat.brand}
              size={90}
              label={sat.label}
              isActive={isTarget && wireProgress >= 0.95}
              showTargetPing={isTarget && wireProgress >= 0.95}
              delay={delay + 4 + i * 2}
            />
          </div>
        );
      })}
    </div>
  );
};
