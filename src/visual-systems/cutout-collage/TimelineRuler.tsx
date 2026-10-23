import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import { theme } from "./theme";
import { PaperPiece } from "./PaperPiece";

export interface MilestoneItem {
  year: string;
  title: string;
  frameHit: number; // Khung hình chỉ màu nhấn chạm tới mốc
  position?: "top" | "bottom"; // Xen kẽ trên và dưới trục
}

export interface TimelineRulerProps {
  startFrame?: number;
  items?: MilestoneItem[];
  top?: number;
  style?: React.CSSProperties;
}

const DEFAULT_MILESTONES: MilestoneItem[] = [
  { year: "1831", title: "Beagle khởi hành", frameHit: 24, position: "top" },
  { year: "1836", title: "Beagle về tới Anh", frameHit: 48, position: "bottom" },
];

export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  startFrame = 0,
  items = DEFAULT_MILESTONES,
  top = 900,
  style,
}) => {
  const currentFrame = useCurrentFrame();
  const rel = currentFrame - startFrame;

  if (rel < 0) {
    return null;
  }

  // 1. Dải giấy cây thước rơi xuống nằm yên trong khoảng 15 khung
  let rulerY = 0;
  let rulerRot = 0;
  let rulerShadowElev = 6;

  if (rel < 9) {
    const t = rel / 9;
    rulerY = interpolate(t, [0, 1], [-850, 0]);
    rulerRot = interpolate(t, [0, 1], [18, 2]);
    rulerShadowElev = 26;
  } else if (rel < 15) {
    const p = (rel - 9) / 6;
    rulerY = 16 * Math.exp(-2.8 * p) * Math.sin(p * 2 * Math.PI);
    rulerRot = interpolate(p, [0, 0.5, 1], [2, -1.5, 0]);
    rulerShadowElev = interpolate(p, [0, 1], [16, 6]);
  } else {
    rulerY = 0;
    rulerRot = -0.5;
    rulerShadowElev = 6;
  }

  // 2. Chiều rộng thanh thước: 940px
  const rulerWidth = 940;
  const rulerHeight = 84;

  // 3. Vạch màu nhấn chạy từ trái sang (bắt đầu chạy từ khung 15 tới 56)
  const lineProgress = interpolate(rel, [15, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineWidth = (rulerWidth - 80) * lineProgress;

  // Tính tọa độ X các mốc (chia đều trên thanh thước)
  const marginX = 140;
  const usableWidth = rulerWidth - marginX * 2;
  const milestoneCount = items.length;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top,
        transform: `translateX(-50%) translateY(${rulerY}px) rotate(${rulerRot}deg)`,
        transformOrigin: "center center",
        width: rulerWidth,
        zIndex: 30,
        ...style,
      }}
    >
      {/* Mảnh giấy cây thước */}
      <PaperPiece
        n={rulerShadowElev}
        style={{
          width: rulerWidth,
          height: rulerHeight,
          backgroundColor: "#F3EEE2",
          border: `2px solid ${theme.colors.ink}`,
          borderRadius: "2px",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Vạch kẻ như thước đo ở mép trên và mép dưới */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "18px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px",
            boxSizing: "border-box",
            borderBottom: "1px dashed rgba(27, 24, 21, 0.2)",
          }}
        >
          {Array.from({ length: 46 }).map((_, idx) => (
            <div
              key={`top-tick-${idx}`}
              style={{
                width: 2,
                height: idx % 5 === 0 ? 14 : 7,
                backgroundColor: theme.colors.ink,
                opacity: idx % 5 === 0 ? 0.75 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Trục rãnh dẫn hướng ở giữa thước */}
        <div
          style={{
            position: "absolute",
            top: 39,
            left: 40,
            width: rulerWidth - 80,
            height: 6,
            backgroundColor: "rgba(27, 24, 21, 0.15)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Vạch màu nhấn chạy từ trái sang */}
          <div
            style={{
              width: lineWidth,
              height: "100%",
              backgroundColor: theme.colors.accent,
              borderRadius: 3,
              boxShadow: `0 0 6px ${theme.colors.accent}`,
            }}
          />
        </div>

        {/* Vạch đo ở mép dưới */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "18px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px",
            boxSizing: "border-box",
            borderTop: "1px dashed rgba(27, 24, 21, 0.2)",
          }}
        >
          {Array.from({ length: 46 }).map((_, idx) => (
            <div
              key={`bot-tick-${idx}`}
              style={{
                width: 2,
                height: idx % 5 === 0 ? 14 : 7,
                backgroundColor: theme.colors.ink,
                opacity: idx % 5 === 0 ? 0.75 : 0.4,
                alignSelf: "flex-end",
              }}
            />
          ))}
        </div>
      </PaperPiece>

      {/* Các mốc thời gian đập xuống xen kẽ trên dưới */}
      {items.map((m, idx) => {
        const posX =
          milestoneCount > 1
            ? marginX + (usableWidth / (milestoneCount - 1)) * idx
            : rulerWidth / 2;

        const isTop = m.position
          ? m.position === "top"
          : idx % 2 === 0;

        const hitRel = rel - m.frameHit;
        if (hitRel < 0) return null;

        // Chấm tròn màu nhấn bật ra
        const dotSpring = spring({
          frame: hitRel,
          fps: 30,
          config: { damping: 11, stiffness: 160 },
        });

        // Thẻ mốc đập xuống (2 khung đầu to gấp đôi / 1.8 và nghiêng, rồi co về trong 5-6 khung)
        let cardScale = 1;
        let cardRot = 0;
        let cardY = 0;
        let cardShadow = 6;

        if (hitRel <= 2) {
          cardScale = 1.85;
          cardRot = isTop ? -5 : 5;
          cardY = isTop ? -30 : 30;
          cardShadow = 24;
        } else if (hitRel <= 8) {
          const t = (hitRel - 2) / 6;
          cardScale = interpolate(t, [0, 1], [1.85, 1.0]);
          cardRot = interpolate(t, [0, 0.6, 1], [isTop ? -5 : 5, isTop ? 2 : -2, isTop ? -1.5 : 1.5]);
          cardY = interpolate(t, [0, 1], [isTop ? -30 : 30, 0]);
          cardShadow = interpolate(t, [0, 1], [24, 6]);
        } else {
          cardScale = 1.0;
          cardRot = isTop ? -1.5 : 1.5;
          cardY = 0;
          cardShadow = 6;
        }

        return (
          <React.Fragment key={`milestone-${idx}`}>
            {/* Chấm tròn ghim màu nhấn ngay trên trục */}
            <div
              style={{
                position: "absolute",
                left: posX,
                top: 42,
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: theme.colors.accent,
                border: `3px solid ${theme.colors.paper}`,
                boxShadow: "0 2px 6px rgba(27, 24, 21, 0.4)",
                transform: `translate(-50%, -50%) scale(${dotSpring})`,
                zIndex: 40,
              }}
            >
              {/* Điểm tâm ghim */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                }}
              />
            </div>

            {/* Que / đường chỉ nối từ trục tới thẻ mốc */}
            <div
              style={{
                position: "absolute",
                left: posX - 1,
                top: isTop ? -45 : 52,
                width: 3,
                height: 48,
                backgroundColor: theme.colors.accent,
                opacity: 0.8,
                zIndex: 35,
              }}
            />

            {/* Thẻ mốc đập xuống */}
            <div
              style={{
                position: "absolute",
                left: posX,
                top: isTop ? -175 : 102,
                transform: `translateX(-50%) translateY(${cardY}px) scale(${cardScale}) rotate(${cardRot}deg)`,
                transformOrigin: isTop ? "bottom center" : "top center",
                zIndex: 45,
              }}
            >
              <PaperPiece
                n={cardShadow}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#F3EEE2",
                  border: `2px solid ${theme.colors.ink}`,
                  textAlign: "center",
                  minWidth: "200px",
                  borderRadius: "2px",
                }}
              >
                {/* Năm to bằng font Anton in hoa */}
                <div
                  style={{
                    fontFamily: theme.fonts.anton,
                    fontSize: 54,
                    color: theme.colors.accent,
                    letterSpacing: "1px",
                    lineHeight: 1,
                  }}
                >
                  {m.year}
                </div>

                {/* Nhãn mô tả nhỏ (tối đa 20 ký tự) */}
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: theme.fonts.beVietnamPro,
                    fontSize: 22,
                    fontWeight: 700,
                    color: theme.colors.ink,
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.title}
                </div>
              </PaperPiece>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
