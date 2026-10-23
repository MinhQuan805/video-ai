import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

// Tọa độ tính sẵn trên ảnh bản đồ rộng 880px, cao 976px
const CITIES = [
  { name: "Salvador", x: 744, y: 287, frameHit: 25 },
  { name: "Rio de Janeiro", x: 669, y: 446, frameHit: 50 },
  { name: "Montevideo", x: 461, y: 638, frameHit: 75 },
  { name: "Punta Alta", x: 367, y: 702, frameHit: 100 },
];

export interface MapRouteProps {
  startFrame?: number;
  style?: React.CSSProperties;
}

export const MapRoute: React.FC<MapRouteProps> = ({
  startFrame = 0,
  style,
}) => {
  const currentFrame = useCurrentFrame();
  const rel = currentFrame - startFrame;

  if (rel < 0) {
    return null;
  }

  // 1. Bản đồ vào kiểu rơi trong 9 khung, nảy trong 14 khung
  let fallY = 0;
  let fallRot = 0;
  let shadow = "0 8px 24px rgba(27, 24, 21, 0.35)";

  if (rel < 9) {
    const t = rel / 9;
    fallY = interpolate(t, [0, 1], [-900, 0]);
    fallRot = 16;
    shadow = "30px 50px 30px rgba(27, 24, 21, 0.45)";
  } else if (rel < 23) {
    const p = (rel - 9) / 14;
    fallY = 18 * Math.exp(-3.2 * p) * Math.sin(p * 2.5 * Math.PI);
    fallRot = interpolate(p, [0, 0.4, 1], [16, -3, -1]);
    shadow = "4px 8px 14px rgba(27, 24, 21, 0.35)";
  } else {
    fallY = 0;
    fallRot = -1;
    shadow = "4px 8px 16px rgba(27, 24, 21, 0.3)";
  }

  // 2. Độ dài đường đi tự vẽ từ Salvador đến Punta Alta
  // Đoạn 1: Salvador -> Rio (khung 25 -> 50)
  // Đoạn 2: Rio -> Montevideo (khung 50 -> 75)
  // Đoạn 3: Montevideo -> Punta Alta (khung 75 -> 100)
  const p1 = interpolate(rel, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p2 = interpolate(rel, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p3 = interpolate(rel, [75, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tọa độ đầu bút vẽ động
  const seg1_x = interpolate(p1, [0, 1], [CITIES[0].x, CITIES[1].x]);
  const seg1_y = interpolate(p1, [0, 1], [CITIES[0].y, CITIES[1].y]);

  const seg2_x = interpolate(p2, [0, 1], [CITIES[1].x, CITIES[2].x]);
  const seg2_y = interpolate(p2, [0, 1], [CITIES[1].y, CITIES[2].y]);

  const seg3_x = interpolate(p3, [0, 1], [CITIES[2].x, CITIES[3].x]);
  const seg3_y = interpolate(p3, [0, 1], [CITIES[2].y, CITIES[3].y]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 240,
        transform: `translateX(-50%) translateY(${fallY}px) rotate(${fallRot}deg)`,
        transformOrigin: "center center",
        width: "900px",
        backgroundColor: "#F3EEE2",
        border: `3px solid ${theme.colors.ink}`,
        boxShadow: shadow,
        padding: "24px 20px 20px 20px",
        boxSizing: "border-box",
        zIndex: 25,
        ...style,
      }}
    >
      {/* Tiêu đề bản đồ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `2px solid ${theme.colors.ink}`,
          paddingBottom: "8px",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontFamily: theme.fonts.anton,
            fontSize: 28,
            color: theme.colors.ink,
            letterSpacing: "1px",
          }}
        >
          HẢI TRÌNH KHẢO SÁT NAM MỸ (1832–1835)
        </span>
        <span
          style={{
            fontFamily: theme.fonts.beVietnamPro,
            fontSize: 18,
            fontWeight: 700,
            color: theme.colors.accent,
          }}
        >
          TÀU HMS BEAGLE
        </span>
      </div>

      {/* Khung bản đồ có ảnh và đường vẽ SVG */}
      <div
        style={{
          position: "relative",
          width: "860px",
          height: "954px",
          overflow: "hidden",
          border: `2px solid ${theme.colors.ink}`,
        }}
      >
        {/* Ảnh bản đồ Nam Mỹ Equirectangular */}
        <img
          src={staticFile("videos/darwin/assets/south_america_map.png")}
          alt="South America Map"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "860px",
            height: "954px",
            display: "block",
          }}
        />

        {/* Lưới kinh vĩ tuyến mờ 10 độ */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "860px",
            height: "954px",
            pointerEvents: "none",
          }}
          viewBox="0 0 880 976"
        >
          {/* Lưới kinh tuyến */}
          {[-80, -70, -60, -50, -40].map((lon) => {
            const x = ((lon - -85) / 55) * 880;
            return (
              <g key={`lon-${lon}`}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={976}
                  stroke="rgba(140, 130, 115, 0.35)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={x + 4}
                  y={18}
                  fill="rgba(100, 90, 75, 0.7)"
                  fontSize="14"
                  fontFamily={theme.fonts.beVietnamPro}
                >
                  {lon}°
                </text>
              </g>
            );
          })}

          {/* Lưới vĩ tuyến */}
          {[0, -10, -20, -30, -40, -50].map((lat) => {
            const y = ((5 - lat) / 61) * 976;
            return (
              <g key={`lat-${lat}`}>
                <line
                  x1={0}
                  y1={y}
                  x2={880}
                  y2={y}
                  stroke="rgba(140, 130, 115, 0.35)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={10}
                  y={y - 6}
                  fill="rgba(100, 90, 75, 0.7)"
                  fontSize="14"
                  fontFamily={theme.fonts.beVietnamPro}
                >
                  {lat}°
                </text>
              </g>
            );
          })}

          {/* Đoạn đường 1: Salvador -> Rio */}
          {rel >= 25 && (
            <line
              x1={CITIES[0].x}
              y1={CITIES[0].y}
              x2={seg1_x}
              y2={seg1_y}
              stroke={theme.colors.accent}
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}

          {/* Đoạn đường 2: Rio -> Montevideo */}
          {rel >= 50 && (
            <line
              x1={CITIES[1].x}
              y1={CITIES[1].y}
              x2={seg2_x}
              y2={seg2_y}
              stroke={theme.colors.accent}
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}

          {/* Đoạn đường 3: Montevideo -> Punta Alta */}
          {rel >= 75 && (
            <line
              x1={CITIES[2].x}
              y1={CITIES[2].y}
              x2={seg3_x}
              y2={seg3_y}
              stroke={theme.colors.accent}
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}

          {/* Điểm chấm và nhãn thành phố đập xuống ở đúng khung */}
          {CITIES.map((city, idx) => {
            if (rel < city.frameHit) return null;

            const pinSpring = spring({
              frame: Math.max(0, rel - city.frameHit),
              fps: 30,
              config: { damping: 11, stiffness: 140 },
            });
            const scale = interpolate(pinSpring, [0, 1], [2.2, 1.0]);

            return (
              <g
                key={city.name}
                transform={`translate(${city.x}, ${city.y}) scale(${scale}) translate(${-city.x}, ${-city.y})`}
              >
                {/* Chấm tròn */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={8}
                  fill={theme.colors.accent}
                  stroke={theme.colors.ink}
                  strokeWidth="2.5"
                />
                {/* Nhãn tên */}
                <rect
                  x={city.x + 12}
                  y={city.y - 14}
                  width={city.name.length * 13 + 18}
                  height="26"
                  fill={theme.colors.ink}
                  rx="4"
                />
                <text
                  x={city.x + 20}
                  y={city.y + 4}
                  fill={theme.colors.yellow}
                  fontFamily={theme.fonts.anton}
                  fontSize="16"
                  letterSpacing="1px"
                >
                  {city.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
