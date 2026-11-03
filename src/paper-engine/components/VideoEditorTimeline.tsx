import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getDynamicWaveform } from "../physics";
import { AppTile } from "./AppTile";

export interface VideoEditorTimelineProps {
  width?: number;
  height?: number;
  delay?: number;
  playheadPeriod?: number;
  showBadge?: boolean;
  style?: React.CSSProperties;
}

/**
 * VideoEditorTimeline: Thẻ trình dựng video NLE đa tầng (tái tạo 100% video mẫu 5).
 * - KHÔNG BAO GIỜ BỊ ĐƠ:
 *   + Đầu đọc Playhead quét qua liên tục có chu kỳ.
 *   + Sóng âm thanh Audio Waveform nhảy nhót sống động theo dải tần thực tế (`getDynamicWaveform`).
 *   + Toàn bộ thẻ bồng bềnh hữu cơ (`getIdleFloating`).
 *   + Khung preview dọc có chấm đỏ ghi hình REC nhấp nháy.
 */
export const VideoEditorTimeline: React.FC<VideoEditorTimelineProps> = ({
  width = 500,
  height = 200,
  delay = 4,
  playheadPeriod = 75,
  showBadge = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chuyển động vào của toàn bộ thẻ
  const cardEntrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 30,
    startScale: 0.94,
    enableIdleFloat: true,
  });

  // Đầu đọc Playhead lướt liên tục qua timeline (chu kỳ tuần hoàn, không dừng đơ)
  const timelineProgress = ((frame - delay) % playheadPeriod) / playheadPeriod;
  const playheadX = interpolate(timelineProgress, [0, 1], [140, width - 20]);

  // Nhấp nháy chấm REC đỏ trên màn hình xem trước
  const isRecBlinking = Math.floor(frame / 15) % 2 === 0;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        transform: `translateY(${cardEntrance.translateY}px) scale(${cardEntrance.scale}) rotate(${cardEntrance.idleRotate}deg)`,
        opacity: cardEntrance.opacity,
        filter: cardEntrance.filter,
        ...style,
      }}
    >
      {/* Container chính */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.cardBg,
          borderRadius: 22,
          boxShadow: SHADOWS.card,
          border: `1px solid ${COLORS.cardBorder}`,
          display: "flex",
          padding: 14,
          gap: 14,
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Khung màn hình preview dọc bên trái */}
        <div
          style={{
            width: 90,
            height: "100%",
            backgroundColor: "#5B96F7",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            boxSizing: "border-box",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)",
            position: "relative",
          }}
        >
          {/* Chấm đỏ REC đang phát video */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: 8,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#FF3B30",
                opacity: isRecBlinking ? 1 : 0.3,
              }}
            />
            <span style={{ fontSize: 7, color: "#FFFFFF", fontWeight: 800 }}>REC</span>
          </div>

          {/* Điện thoại mini bên trong preview */}
          <div
            style={{
              width: 58,
              height: 110,
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "6px 4px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: 18, height: 4, backgroundColor: "#000000", borderRadius: 2, marginBottom: 6 }} />
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#FFE5D9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
              
            </div>
            <div style={{ width: "80%", height: 3, backgroundColor: "#E5E5EA", borderRadius: 1.5, marginTop: 8 }} />
            <div style={{ width: "60%", height: 3, backgroundColor: "#E5E5EA", borderRadius: 1.5, marginTop: 4 }} />
          </div>
        </div>

        {/* Khung Timeline đa track bên phải */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
          {/* Track 1: Video clips */}
          <div style={{ display: "flex", gap: 8, height: 34 }}>
            <div
              style={{
                width: 95,
                height: "100%",
                backgroundColor: COLORS.terracotta,
                borderRadius: 8,
                boxShadow: "0 2px 4px rgba(200,82,40,0.2)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#202022",
                borderRadius: 8,
              }}
            />
          </div>

          {/* Track 2: B-Roll clips */}
          <div style={{ display: "flex", gap: 8, height: 34 }}>
            <div
              style={{
                width: 130,
                height: "100%",
                backgroundColor: "#007AFF",
                borderRadius: 8,
                boxShadow: "0 2px 4px rgba(0,122,255,0.2)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: COLORS.terracotta,
                borderRadius: 8,
              }}
            />
          </div>

          {/* Track 3: Audio Waveform track màu vàng NHẢY SÓNG LIÊN TỤC */}
          <div
            style={{
              height: 38,
              backgroundColor: "#E2AA2D",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              overflow: "hidden",
            }}
          >
            {Array.from({ length: 42 }).map((_, idx) => {
              // Thanh sóng nhảy nhót theo nhịp thực tế
              const barH = getDynamicWaveform(frame, idx, 42, 6, 28);
              return (
                <div
                  key={idx}
                  style={{
                    width: 2.5,
                    height: barH,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: 1.5,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Đầu đọc Playhead di chuyển dọc qua Timeline */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: playheadX,
            width: 2,
            backgroundColor: "#E02020",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {/* Đầu nhọn con chạy playhead */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: -5,
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "8px solid #E02020",
            }}
          />
        </div>
      </div>

      {/* AppTile Claude bay vào đậu đè lên góc phải trên */}
      {showBadge && (
        <div
          style={{
            position: "absolute",
            top: -24,
            right: 18,
            zIndex: 20,
          }}
        >
          <AppTile
            brand="claude"
            size={72}
            delay={delay + 5}
          />
        </div>
      )}
    </div>
  );
};
