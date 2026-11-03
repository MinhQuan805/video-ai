import React from "react";
import { useCurrentFrame, interpolate, spring, staticFile, Img } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { FaIcon } from "../../shared/FaIcon";

/**
 * Helper: Khung cảnh chuẩn phong cách Video Mẫu 5-9
 * Bao gồm Eyebrow với Badge, Tiêu đề lớn Fraunces Serif + Italic Terracotta,
 * Sân khấu Motion Graphic trung tâm và Phụ đề Karaoke dưới chân.
 */
interface SceneWrapperProps {
  step: string;
  category: string;
  headlineMain: string;
  headlineAccent: string;
  subtitlePre: string;
  subtitleAccent: string;
  children: React.ReactNode;
}

export const SceneWrapper: React.FC<SceneWrapperProps> = ({
  step,
  category,
  headlineMain,
  headlineAccent,
  subtitlePre,
  subtitleAccent,
  children,
}) => {
  const frame = useCurrentFrame();
  const entrance = spring({ frame, fps: 30, config: SPRING_PRESETS.snappy });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: COLORS.bgPaper,
        display: "flex",
        flexDirection: "column",
        padding: "160px 80px 140px 80px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Top Eyebrow with Step Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 36,
          transform: `translateY(${(1 - entrance) * -20}px)`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.terracotta,
            color: "#FFFFFF",
            fontFamily: FONTS.mono,
            fontSize: 16,
            fontWeight: 800,
            padding: "4px 12px",
            borderRadius: 8,
          }}
        >
          {step}
        </div>
        <div
          style={{
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 20,
            color: COLORS.inkPrimary,
            letterSpacing: -0.2,
          }}
        >
          {category}
        </div>
      </div>

      {/* 2. Headline: Bold Fraunces Serif + Terracotta Italic */}
      <div
        style={{
          fontFamily: FONTS.frauncesNormal,
          fontSize: 68,
          fontWeight: 900,
          color: COLORS.inkPrimary,
          lineHeight: 1.15,
          letterSpacing: -1,
          marginBottom: 80,
          transform: `translateY(${(1 - entrance) * 30}px)`,
          opacity: entrance,
        }}
      >
        {headlineMain}{" "}
        <span
          style={{
            fontFamily: FONTS.frauncesItalic,
            fontStyle: "italic",
            color: COLORS.terracotta,
          }}
        >
          {headlineAccent}
        </span>
      </div>

      {/* 3. Central Hero Visual Stage */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {children}
      </div>

      {/* 4. Bottom Floating Karaoke Subtitles */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 34,
            color: COLORS.inkPrimary,
          }}
        >
          {subtitlePre}
        </span>
        <span
          style={{
            fontFamily: FONTS.inter,
            fontWeight: 900,
            fontSize: 34,
            color: COLORS.terracotta,
          }}
        >
          {subtitleAccent}
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 1. SceneOmniRouteReroute: 100% Giống Video Mẫu 9
// =========================================================================
export const SceneOmniRouteReroute: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({ frame: frame - 2, fps: 30, config: SPRING_PRESETS.snappy });
  const activePipeProgress = (frame * 3.5) % 100;
  const idleFloat = Math.sin(frame * 0.06) * 5;

  return (
    <SceneWrapper
      step="02"
      category="OmniRoute"
      headlineMain="Cạn quota?"
      headlineAccent="tự rẽ nhánh"
      subtitlePre="tự động chuyển sang"
      subtitleAccent="GLM tiếp theo"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${entrance * 1.4}) translateY(${idleFloat}px)`,
        }}
      >
        {/* OmniRoute Red Hub */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 30,
            backgroundColor: "#E11D48",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 36px rgba(225,29,72,0.4)",
            zIndex: 5,
          }}
        >
          <FaIcon icon="diagram-project" color="#FFFFFF" size={54} />
        </div>

        {/* Dynamic Branching SVG Pipes */}
        <div style={{ position: "relative", width: 560, height: 140, marginTop: -8 }}>
          <svg width="560" height="140" style={{ position: "absolute", top: 0, left: 0 }}>
            {/* Depleted/Grayed Out Paths */}
            <line x1="280" y1="0" x2="70" y2="130" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6,6" />
            <line x1="280" y1="0" x2="210" y2="130" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6,6" />
            <line x1="280" y1="0" x2="490" y2="130" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6,6" />

            {/* Active Conduit Line to GLM */}
            <line x1="280" y1="0" x2="350" y2="130" stroke={COLORS.terracotta} strokeWidth="12" strokeLinecap="round" />

            {/* Flowing Energy Plasma Dots */}
            {[0, 20, 40, 60, 80].map((offset, i) => {
              const p = ((activePipeProgress + offset) % 100) / 100;
              const cx = 280 + (350 - 280) * p;
              const cy = 0 + (130 - 0) * p;
              return <circle key={i} cx={cx} cy={cy} r={5} fill="#FFFFFF" filter="drop-shadow(0 0 5px #FFF)" />;
            })}
          </svg>
        </div>

        {/* 4 Models Target Row */}
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", marginTop: -14 }}>
          {/* Claude (Depleted) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.3 }}>
            <div style={{ width: 84, height: 84, borderRadius: 24, backgroundColor: "#FFF", boxShadow: SHADOWS.card, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("icon/claude.png")} style={{ width: 46, height: 46, objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: FONTS.inter, fontSize: 14, fontWeight: 700, marginTop: 8, color: COLORS.inkMuted }}>Claude</span>
          </div>

          {/* Gemini (Depleted) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.3 }}>
            <div style={{ width: 84, height: 84, borderRadius: 24, backgroundColor: "#FFF", boxShadow: SHADOWS.card, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("icon/gemini.png")} style={{ width: 46, height: 46, objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: FONTS.inter, fontSize: 14, fontWeight: 700, marginTop: 8, color: COLORS.inkMuted }}>Gemini</span>
          </div>

          {/* GLM (Active Winner) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 28,
                backgroundColor: "#18181B",
                border: `4px solid ${COLORS.terracotta}`,
                boxShadow: "0 16px 40px rgba(200,82,40,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${1 + Math.sin(frame * 0.15) * 0.05})`,
              }}
            >
              <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 34, color: "#FFF" }}>Z</span>
            </div>
            <div style={{ width: 60, height: 5, backgroundColor: COLORS.terracotta, borderRadius: 3, marginTop: 8 }} />
            <span style={{ fontFamily: FONTS.inter, fontSize: 16, fontWeight: 900, marginTop: 6, color: COLORS.terracotta }}>GLM</span>
          </div>

          {/* Qwen */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.6 }}>
            <div style={{ width: 84, height: 84, borderRadius: 24, backgroundColor: "#4F46E5", boxShadow: SHADOWS.card, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaIcon icon="network-wired" color="#FFF" size={36} />
            </div>
            <span style={{ fontFamily: FONTS.inter, fontSize: 14, fontWeight: 700, marginTop: 8, color: COLORS.inkSecondary }}>Qwen</span>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 2. SceneRobotDataFeeder: 100% Giống Video Mẫu 8 (Tactile Chomp & iPhone Sync)
// =========================================================================
export const SceneRobotDataFeeder: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({ frame: frame - 2, fps: 30, config: SPRING_PRESETS.snappy });
  
  // Nhịp cắn 8-bit của robot
  const mouthOpen = (Math.floor(frame / 6) % 2) === 0;
  const beadProgress = (frame * 5.5) % 240;
  
  // Phone haptic recoil khi hạt dữ liệu chạm vào điện thoại
  const isHit = beadProgress > 220;
  const phoneShake = isHit ? Math.sin(frame * 2) * 3 : 0;
  const progressPercent = Math.min(100, Math.floor(((frame * 1.8) % 100)));

  return (
    <SceneWrapper
      step="03"
      category="Thêm Tính Năng"
      headlineMain="Tích hợp,"
      headlineAccent="từ từ bổ sung"
      subtitlePre="chạy trực tiếp trên"
      subtitleAccent="máy của bạn"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          transform: `scale(${entrance * 1.25})`,
          position: "relative",
        }}
      >
        {/* Retro 8-bit Robot Creature với Ăng-ten & Con ngươi chuyển động */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 110,
              height: 96,
              backgroundColor: COLORS.terracotta,
              borderRadius: mouthOpen ? "22px 22px 6px 22px" : 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: "0 16px 36px rgba(200,82,40,0.35)",
              transform: `translateY(${Math.sin(frame * 0.15) * 4}px)`,
              transition: "border-radius 0.1s ease",
            }}
          >
            {/* Ăng-ten phát sóng nhấp nháy */}
            <div style={{ position: "absolute", top: -14, width: 4, height: 14, backgroundColor: COLORS.terracotta }} />
            <div
              style={{
                position: "absolute",
                top: -22,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: COLORS.terracotta,
                boxShadow: mouthOpen ? "0 0 12px rgba(200,82,40,1)" : "none",
              }}
            />

            {/* Cặp mắt vuông Pixel 8-bit */}
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ width: 14, height: 14, backgroundColor: "#FFF", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <div style={{ width: 6, height: 6, backgroundColor: COLORS.inkPrimary, borderRadius: 1 }} />
              </div>
              <div style={{ width: 14, height: 14, backgroundColor: "#FFF", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <div style={{ width: 6, height: 6, backgroundColor: COLORS.inkPrimary, borderRadius: 1 }} />
              </div>
            </div>

            {/* Răng cắn pixel */}
            {mouthOpen && (
              <div style={{ position: "absolute", bottom: 8, right: 10, width: 18, height: 8, backgroundColor: "#FFF", borderRadius: "2px 2px 0 0" }} />
            )}
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, marginTop: 12, color: COLORS.inkPrimary }}>
            AI ROBOT
          </div>
        </div>

        {/* Băng chuyền hạt năng lượng Plasma */}
        <div style={{ position: "relative", width: 240, height: 30 }}>
          <div style={{ position: "absolute", top: 13, left: 0, right: 0, borderTop: `4px dashed ${COLORS.divider}` }} />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: beadProgress,
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: COLORS.terracotta,
              boxShadow: "0 0 16px rgba(200,82,40,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#FFF" }} />
          </div>
        </div>

        {/* 3D Tilted iPhone với Giao diện CalTracker hoàn chỉnh */}
        <div
          style={{
            width: 220,
            height: 380,
            backgroundColor: "#FFFFFF",
            borderRadius: 38,
            border: "5px solid #1D1C1A",
            boxShadow: "0 28px 60px rgba(0,0,0,0.22)",
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            transform: `perspective(900px) rotateY(-12deg) rotateZ(${3 + phoneShake}deg)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dynamic Island */}
          <div style={{ width: 60, height: 12, backgroundColor: "#000", borderRadius: 7, margin: "0 auto 12px auto" }} />

          {/* App Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: FONTS.inter, fontSize: 13, fontWeight: 900, color: COLORS.inkPrimary }}>CalTracker AI</span>
            <span style={{ fontSize: 9, fontFamily: FONTS.mono, color: "#059669", fontWeight: 800, backgroundColor: "#ECFDF5", padding: "2px 6px", borderRadius: 4 }}>
              LIVE SYNC
            </span>
          </div>

          {/* Calorie Ring Metric Stage */}
          <div style={{ backgroundColor: "#F8FAFC", borderRadius: 18, padding: 12, textAlign: "center", border: "1px solid #E2E8F0" }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>NẠP HÔM NAY</div>
            <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 26, fontWeight: 900, color: COLORS.terracotta, marginTop: 2 }}>
              1,840 <span style={{ fontSize: 12, fontFamily: FONTS.inter }}>kcal</span>
            </div>
            {/* Thanh dinh dưỡng 3 màu */}
            <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", marginTop: 8, gap: 2 }}>
              <div style={{ flex: 4, backgroundColor: "#059669" }} />
              <div style={{ flex: 3, backgroundColor: "#F59E0B" }} />
              <div style={{ flex: 3, backgroundColor: COLORS.terracotta }} />
            </div>
          </div>

          {/* Thanh Tiến Trình Sync Dữ Liệu Tự Động */}
          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 10, fontFamily: FONTS.mono, fontWeight: 800 }}>
              <span style={{ color: COLORS.inkMuted }}>NẠP DATA</span>
              <span style={{ color: COLORS.terracotta }}>{progressPercent}%</span>
            </div>
            <div style={{ width: "100%", backgroundColor: "#F1F5F9", height: 12, borderRadius: 6, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  backgroundColor: COLORS.terracotta,
                  borderRadius: 6,
                  transition: "width 0.1s linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 3. SceneFanningAppStoreDeck: 100% Giống Video Mẫu 8 (Tactile Poker Deck)
// =========================================================================
export const SceneFanningAppStoreDeck: React.FC = () => {
  const frame = useCurrentFrame();

  const fanSpread = spring({
    frame: frame - 2,
    fps: 30,
    config: SPRING_PRESETS.gentle,
  });

  const cards = [
    { title: "Track", subtitle: "1,840 kcal", icon: "barcode", bg: "#FEF3C7", accent: "#D97706", rot: -18, y: 18 },
    { title: "Scan AI", subtitle: "98% Match", icon: "camera", bg: "#DCFCE7", accent: "#059669", rot: -9, y: 8 },
    { title: "Diet Pro", subtitle: "Macro 100%", icon: "apple-whole", bg: "#E0F2FE", accent: "#0284C7", rot: 0, y: -16, isCenter: true },
    { title: "Stats", subtitle: "+24% Protein", icon: "chart-simple", bg: "#F3E8FF", accent: "#7C3AED", rot: 9, y: 8 },
    { title: "Streak", subtitle: "14 Days", icon: "fire", bg: "#FFEDD5", accent: "#EA580C", rot: 18, y: 18 },
  ];

  return (
    <SceneWrapper
      step="05"
      category="Trang App Store"
      headlineMain="Bộ ảnh,"
      headlineAccent="App Store thật"
      subtitlePre="thiết kế xong"
      subtitleAccent="xuất bản ngay"
    >
      <div style={{ position: "relative", width: 620, height: 420, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.2)" }}>
        {cards.map((c, i) => {
          const currentRot = c.rot * fanSpread;
          const currentY = c.y * fanSpread;
          const scale = c.isCenter ? 1.15 : 0.94;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 190,
                height: 330,
                backgroundColor: c.bg,
                borderRadius: 28,
                border: "3.5px solid #1D1C1A",
                boxShadow: c.isCenter ? "0 32px 70px rgba(0,0,0,0.28)" : "0 16px 36px rgba(0,0,0,0.12)",
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transformOrigin: "bottom center",
                transform: `translateY(${currentY}px) rotate(${currentRot}deg) scale(${scale})`,
                zIndex: c.isCenter ? 10 : 5 - Math.abs(2 - i),
              }}
            >
              {/* Notch */}
              <div style={{ width: 40, height: 10, backgroundColor: "#1D1C1A", borderRadius: 5, marginBottom: 16 }} />

              {/* Title & Subtitle */}
              <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary, textAlign: "center" }}>
                {c.title}
              </div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: c.accent, marginTop: 2 }}>
                {c.subtitle}
              </div>

              {/* Center App Icon Surface */}
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 20,
                  backgroundColor: "#FFFFFF",
                  border: `2px solid ${c.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 24,
                  boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
                }}
              >
                <FaIcon icon={c.icon} size={30} color={c.accent} />
              </div>

              {/* Bottom CTA / Metric Pill */}
              <div
                style={{
                  marginTop: "auto",
                  width: "90%",
                  padding: "8px 0",
                  backgroundColor: c.isCenter ? c.accent : "rgba(255,255,255,0.7)",
                  color: c.isCenter ? "#FFF" : COLORS.inkPrimary,
                  borderRadius: 12,
                  textAlign: "center",
                  fontFamily: FONTS.inter,
                  fontWeight: 800,
                  fontSize: 11,
                }}
              >
                {c.isCenter ? "BẮT ĐẦU NGAY" : "XEM CHI TIẾT"}
              </div>
            </div>
          );
        })}
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 4. SceneMacFinderFileAudit: 100% Giống Video Mẫu 6
// =========================================================================
export const SceneMacFinderFileAudit: React.FC = () => {
  const frame = useCurrentFrame();
  const winEntrance = spring({ frame: frame - 2, fps: 30, config: SPRING_PRESETS.snappy });

  const files = [
    { name: "Folder", icon: "folder", color: "#3B82F6", tickDelay: 10 },
    { name: "Sheets", icon: "file-excel", color: "#10B981", tickDelay: 16 },
    { name: "Docs", icon: "file-lines", color: "#F59E0B", tickDelay: 22 },
    { name: "Code", icon: "file-code", color: "#8B5CF6", tickDelay: 28 },
  ];

  const cursorX = interpolate(frame, [0, 25, 45], [460, 380, 380], { extrapolateRight: "clamp" });
  const cursorY = interpolate(frame, [0, 25, 45], [260, 120, 120], { extrapolateRight: "clamp" });
  const isClick = frame > 42 && frame < 50;

  return (
    <SceneWrapper
      step="01"
      category="Cài Agent"
      headlineMain="Không chỉ chat,"
      headlineAccent="làm trên máy"
      subtitlePre="quản lý file trực tiếp"
      subtitleAccent="trên máy của bạn"
    >
      <div
        style={{
          width: 620,
          backgroundColor: "#FFFFFF",
          borderRadius: 26,
          boxShadow: "0 24px 56px rgba(0,0,0,0.16)",
          border: "2px solid rgba(29,28,26,0.12)",
          overflow: "hidden",
          transform: `scale(${winEntrance * 1.3})`,
          position: "relative",
        }}
      >
        <div style={{ backgroundColor: "#F8FAFC", padding: "16px 20px", display: "flex", alignItems: "center", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          </div>
          <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 800, color: COLORS.inkMuted, marginLeft: 20 }}>
            Finder • Workspace
          </span>
        </div>

        <div style={{ padding: "32px 28px", display: "flex", justifyContent: "space-between" }}>
          {files.map((f, i) => {
            const hasTick = frame > f.tickDelay;
            const tickSpring = spring({ frame: frame - f.tickDelay, fps: 30, config: SPRING_PRESETS.pop });

            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                {hasTick && (
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -8,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: COLORS.terracotta,
                      color: "#FFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      transform: `scale(${tickSpring})`,
                      zIndex: 5,
                      boxShadow: "0 4px 12px rgba(200,82,40,0.5)",
                    }}
                  >
                    <FaIcon icon="check" size={13} color="#FFF" />
                  </div>
                )}
                <div
                  style={{
                    width: 82,
                    height: 92,
                    borderRadius: 20,
                    backgroundColor: "#F8FAFC",
                    border: "1.5px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaIcon icon={f.icon} size={40} color={f.color} />
                </div>
                <span style={{ fontFamily: FONTS.inter, fontSize: 14, fontWeight: 800, marginTop: 10, color: COLORS.inkPrimary }}>
                  {f.name}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            top: cursorY,
            left: cursorX,
            transform: `scale(${isClick ? 0.85 : 1})`,
            transition: "transform 0.1s",
            pointerEvents: "none",
          }}
        >
          <FaIcon icon="arrow-pointer" size={28} color="#1D1C1A" />
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 5. SceneRobotMailClassifier: 100% Giống Video Mẫu 6 (Laser Classification)
// =========================================================================
export const SceneRobotMailClassifier: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({ frame: frame - 2, fps: 30, config: SPRING_PRESETS.snappy });
  const eyeBlink = (Math.floor(frame / 18) % 2) === 0;

  const categories = [
    { label: "Báo Lỗi Server", tag: "BUG", color: "#DC2626", delayOffset: 6 },
    { label: "Xác Nhận Đơn", tag: "BILLING", color: "#059669", delayOffset: 14 },
    { label: "Góp Ý Sản Phẩm", tag: "FEEDBACK", color: "#2563EB", delayOffset: 22 },
  ];

  return (
    <SceneWrapper
      step="04"
      category="Kết Nối"
      headlineMain="Tự động,"
      headlineAccent="phân loại thư"
      subtitlePre="xử lý hộp thư đến"
      subtitleAccent="chuẩn xác 100%"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          transform: `scale(${entrance * 1.25})`,
          position: "relative",
        }}
      >
        {/* Robot Head với Mắt Kính Visor Quét Laser */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 38,
              backgroundColor: "#18181B",
              border: "3px solid #27272A",
              boxShadow: "0 24px 50px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Ăng-ten với đầu phát sóng cam */}
            <div style={{ position: "absolute", top: -12, width: 6, height: 12, backgroundColor: COLORS.terracotta }} />
            <div
              style={{
                position: "absolute",
                top: -24,
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: COLORS.terracotta,
                boxShadow: "0 0 16px rgba(200,82,40,1)",
              }}
            />

            {/* Mắt quét Sensor đôi phát sáng */}
            <div style={{ display: "flex", gap: 28 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: COLORS.terracotta,
                  opacity: eyeBlink ? 1 : 0.4,
                  boxShadow: eyeBlink ? "0 0 14px rgba(200,82,40,1)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#FFF" }} />
              </div>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: COLORS.terracotta,
                  opacity: eyeBlink ? 1 : 0.4,
                  boxShadow: eyeBlink ? "0 0 14px rgba(200,82,40,1)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#FFF" }} />
              </div>
            </div>

            {/* Miệng quét tần số sóng âm */}
            <div style={{ display: "flex", gap: 4, marginTop: 14 }}>
              {[12, 18, 14, 20, 10].map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 3,
                    height: Math.sin(frame * 0.3 + idx) * 4 + h,
                    backgroundColor: "#52525B",
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, marginTop: 14, color: COLORS.inkPrimary }}>
            MAIL SORT AI
          </div>
        </div>

        {/* 3 Phong bì đã phân loại với Dấu sáp son đỏ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 320 }}>
          {categories.map((c, i) => {
            const pillEntrance = spring({
              frame: frame - c.delayOffset,
              fps: 30,
              config: SPRING_PRESETS.snappy,
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 22,
                  padding: "16px 22px",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
                  border: `2px solid ${COLORS.divider}`,
                  transform: `translateX(${(1 - pillEntrance) * 50}px)`,
                  opacity: pillEntrance,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: `${c.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaIcon icon="envelope" size={18} color={c.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
                      {c.label}
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800, color: c.color, marginTop: 2 }}>
                      {c.tag}
                    </div>
                  </div>
                </div>

                {/* Con dấu sáp son tròn nảy lò xo */}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: COLORS.terracotta,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(200,82,40,0.4)",
                  }}
                >
                  <FaIcon icon="check" size={11} color="#FFF" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 6. SceneScissorsPaperCut: Tương tác vật lý cắt phăng hoá đơn giấy
// =========================================================================
export const SceneScissorsPaperCut: React.FC = () => {
  const frame = useCurrentFrame();
  const isCut = frame >= 24;
  
  // Kéo di chuyển từ trên xuống cắt dọc theo đường đứt nét
  const scissorY = interpolate(frame, [0, 24, 45], [-60, 0, 160], {
    extrapolateRight: "clamp",
  });
  // Lưỡi kéo há ra rồi bấm sập vào cắt đúng frame 24
  const snipAngle = interpolate(frame, [10, 20, 24, 30], [25, 40, 2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  // Hai nửa hoá đơn tách ra sau khi bị cắt
  const separation = isCut ? Math.min(54, (frame - 24) * 3.2) : 0;
  const leftDrop = isCut ? Math.min(18, (frame - 24) * 1.2) : 0;
  const rightLift = isCut ? Math.min(14, (frame - 24) * 0.9) : 0;
  
  // Chớp sáng flash ngay khoảnh khắc cắt
  const cutFlash = frame >= 23 && frame <= 27;

  return (
    <SceneWrapper
      step="02"
      category="Cắt Giảm"
      headlineMain="Chi phí cũ,"
      headlineAccent="cắt giảm 70%"
      subtitlePre="tiết kiệm tối đa"
      subtitleAccent="ngân sách vận hành"
    >
      <div style={{ position: "relative", width: 620, height: 300, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.2)" }}>
        
        {/* Flash nổ sáng khi cắt trúng giấy */}
        {cutFlash && (
          <div
            style={{
              position: "absolute",
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#FFF",
              boxShadow: "0 0 40px rgba(220,38,38,0.8)",
              zIndex: 15,
            }}
          />
        )}

        {/* Nửa Trái: Hoá Đơn Cũ Bị Cắt Tụt Xuống */}
        <div
          style={{
            width: 220,
            height: 170,
            backgroundColor: "#FFFFFF",
            borderRadius: "24px 0 0 24px",
            border: "4px solid #1D1C1A",
            borderRight: isCut ? "3px dashed #DC2626" : "2px dashed #CBD5E1",
            padding: "24px 20px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
            transform: `translateX(-${separation}px) translateY(${leftDrop}px) rotate(-${separation * 0.22}deg)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <FaIcon icon="file-invoice-dollar" size={16} color="#DC2626" />
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.inkMuted, fontWeight: 800 }}>CHI PHÍ CŨ</span>
          </div>
          <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 40, fontWeight: 900, color: "#DC2626", textDecoration: "line-through" }}>
            $2,400
          </div>
          <div style={{ fontSize: 11, fontFamily: FONTS.mono, color: "#DC2626", fontWeight: 700, marginTop: 4 }}>
            ĐÃ BÃI BỎ
          </div>
        </div>

        {/* Nửa Phải: Mức Tiết Kiệm Nổi Bật Vút Lên */}
        <div
          style={{
            width: 220,
            height: 170,
            backgroundColor: "#F0FDF4",
            borderRadius: "0 24px 24px 0",
            border: "4px solid #059669",
            borderLeft: "none",
            padding: "24px 20px",
            boxShadow: "0 24px 50px rgba(5,150,105,0.22)",
            transform: `translateX(${separation}px) translateY(-${rightLift}px) rotate(${separation * 0.18}deg)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <FaIcon icon="piggy-bank" size={16} color="#059669" />
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: "#059669", fontWeight: 800 }}>TIẾT KIỆM</span>
          </div>
          <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 46, fontWeight: 900, color: "#059669" }}>
            -70%
          </div>
          <div style={{ fontSize: 11, fontFamily: FONTS.mono, color: "#059669", fontWeight: 800, marginTop: 4 }}>
            NGÂN SÁCH DƯ
          </div>
        </div>

        {/* Kéo Cơ Học Kim Loại Đang Bấm Cắt */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, calc(-50% + ${scissorY}px))`,
            zIndex: 20,
            opacity: frame < 42 ? 1 : Math.max(0, 1 - (frame - 42) * 0.2),
            filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.3))",
          }}
        >
          <div style={{ transform: `rotate(${-45 + snipAngle}deg)` }}>
            <FaIcon icon="scissors" size={74} color="#1D1C1A" />
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 7. ScenePolaroidAddyOsmani: 100% Giống Video Mẫu 9
// =========================================================================
export const ScenePolaroidAddyOsmani: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = spring({ frame: frame - 2, fps: 30, config: SPRING_PRESETS.snappy });
  const tilt = interpolate(drop, [0, 1], [-18, -4]);

  return (
    <SceneWrapper
      step="03"
      category="Agent Skills"
      headlineMain="Cựu giám đốc"
      headlineAccent="kỹ thuật AI"
      subtitlePre="chuyên gia hàng đầu"
      subtitleAccent="tại Google"
    >
      <div
        style={{
          width: 320,
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          padding: "18px 18px 40px 18px",
          boxShadow: "0 26px 60px rgba(0,0,0,0.22)",
          border: "1px solid rgba(0,0,0,0.06)",
          transform: `translateY(${(1 - drop) * -180}px) rotate(${tilt}deg) scale(${drop * 1.3})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 260,
            backgroundColor: "#38BDF8",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <FaIcon icon="user-tie" size={96} color="#FFF" />
        </div>

        <div
          style={{
            fontFamily: FONTS.frauncesItalic,
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: 24,
            color: COLORS.inkPrimary,
            marginTop: 20,
          }}
        >
          Addy Osmani • Google AI
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 8. ScenePacmanCostEater: Tương tác nuốt chi phí (Tactile Arcade Editorial)
// =========================================================================
export const ScenePacmanCostEater: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Chu kỳ cắn nhai 3 lần rồi nuốt
  const biteCycle = (frame % 24) / 24;
  const mouthAngle = Math.sin(biteCycle * Math.PI) * 45; // 0 đến 45 độ
  const isBiteSnap = mouthAngle < 8;
  
  // Squash & Stretch vật lý khi hàm cắn sập xuống
  const scaleX = isBiteSnap ? 1.08 : 1.0;
  const scaleY = isBiteSnap ? 0.92 : 1.0;

  // Viên chi phí di chuyển vào miệng và bị nghiền nát
  const pillProgress = (frame * 3.5) % 120;
  const pillX = interpolate(pillProgress, [0, 80, 110], [260, 40, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillScale = interpolate(pillProgress, [0, 70, 95], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillOpacity = interpolate(pillProgress, [0, 75, 95], [1, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hạt vụn nổ ra khi bị cắn nát
  const chompParticles = [0, 1, 2, 3, 4].map((i) => {
    const pAngle = (i * 72 * Math.PI) / 180;
    const pDist = isBiteSnap ? 28 : 6;
    return {
      x: Math.cos(pAngle) * pDist,
      y: Math.sin(pAngle) * pDist,
      opacity: isBiteSnap ? 0.9 : 0,
    };
  });

  // Thẻ điểm số nhảy vọt
  const metricSpring = spring({
    frame: frame % 60,
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  return (
    <SceneWrapper
      step="06"
      category="Cơ Chế Nuốt Chửng"
      headlineMain="Nuốt chửng,"
      headlineAccent="chi phí thừa"
      subtitlePre="giải phóng ngân sách"
      subtitleAccent="+320% hiệu suất"
    >
      {/* Sân khấu Card Paper cao cấp */}
      <div
        style={{
          width: 720,
          backgroundColor: "#FFFFFF",
          borderRadius: 32,
          padding: "50px 44px",
          boxShadow: "0 24px 60px rgba(29, 28, 26, 0.08), 0 4px 16px rgba(29, 28, 26, 0.04)",
          border: `2px solid ${COLORS.divider}`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        {/* Top Eyebrow của Card */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 800, color: COLORS.inkMuted, letterSpacing: 0.5 }}>
              CHOMP ENGINE • ACTIVE
            </span>
          </div>
          <div
            style={{
              backgroundColor: "#ECFDF5",
              color: "#059669",
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: 8,
              border: "1px solid rgba(5, 150, 105, 0.2)",
            }}
          >
            AUTO PURGE
          </div>
        </div>

        {/* Khu vực đường ray và Sinh vật Pacman cắn nhai */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", height: 170, padding: "0 20px" }}>
          
          {/* Đường ray chấm bi chuyển động */}
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 180,
              top: "50%",
              height: 2,
              borderBottom: `3px dashed ${COLORS.divider}`,
              zIndex: 1,
            }}
          />

          {/* Sinh vật Pacman cao cấp có mắt linh hoạt & Squash & Stretch */}
          <div
            style={{
              position: "relative",
              width: 140,
              height: 140,
              zIndex: 3,
              transform: `scale(${scaleX}, ${scaleY})`,
              filter: "drop-shadow(0 12px 24px rgba(245, 158, 11, 0.28))",
            }}
          >
            <svg width="140" height="140" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="pacmanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
              {/* Thân Pacman với hàm mở khép chuyển động mượt mà */}
              <path
                d={
                  mouthAngle > 2
                    ? `M 50 50 L ${50 + 48 * Math.cos((mouthAngle * Math.PI) / 180)} ${
                        50 - 48 * Math.sin((mouthAngle * Math.PI) / 180)
                      } A 48 48 0 1 0 ${50 + 48 * Math.cos((-mouthAngle * Math.PI) / 180)} ${
                        50 - 48 * Math.sin((-mouthAngle * Math.PI) / 180)
                      } Z`
                    : `M 50 50 m -48, 0 a 48,48 0 1,0 96,0 a 48,48 0 1,0 -96,0`
                }
                fill="url(#pacmanGrad)"
              />
              {/* Mắt to linh hoạt nhìn theo viên thức ăn */}
              <circle cx="56" cy="24" r="7" fill="#FFFFFF" />
              <circle cx="58" cy="24" r="4.5" fill="#1D1C1A" />
              {/* Điểm sáng con ngươi */}
              <circle cx="59.5" cy="22.5" r="1.5" fill="#FFFFFF" />
            </svg>

            {/* Hạt vụn nổ tung khi nhai sập hàm */}
            {chompParticles.map((p, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  right: 20 + p.x,
                  top: 70 + p.y,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: COLORS.terracotta,
                  opacity: p.opacity,
                  transition: "all 0.1s ease-out",
                }}
              />
            ))}
          </div>

          {/* Viên Thẻ Chi Phí đang bị hút và nghiền nát */}
          <div
            style={{
              position: "absolute",
              left: 100 + pillX,
              top: "50%",
              transform: `translateY(-50%) scale(${pillScale})`,
              opacity: pillOpacity,
              backgroundColor: "#FEF2F2",
              border: `2px solid ${COLORS.terracotta}`,
              color: COLORS.terracotta,
              borderRadius: 16,
              padding: "10px 22px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 8px 20px rgba(200, 82, 40, 0.18)",
              zIndex: 2,
              whiteSpace: "nowrap",
            }}
          >
            <FaIcon icon="receipt" size={16} color={COLORS.terracotta} />
            <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, textDecoration: "line-through" }}>
              CHI PHÍ CŨ
            </span>
          </div>

          {/* Cụm Số Liệu Hiệu Suất Nhảy Vọt Bừng Sáng */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              transform: `scale(${1 + (metricSpring - 1) * 0.15})`,
              zIndex: 3,
            }}
          >
            <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.inkMuted, fontWeight: 800 }}>
              HIỆU SUẤT
            </div>
            <div
              style={{
                fontFamily: FONTS.frauncesNormal,
                fontSize: 54,
                fontWeight: 900,
                color: "#059669",
                lineHeight: 1,
                marginTop: 4,
                letterSpacing: -1,
                filter: "drop-shadow(0 4px 12px rgba(5, 150, 105, 0.25))",
              }}
            >
              +320%
            </div>
            <div
              style={{
                marginTop: 8,
                backgroundColor: "#ECFDF5",
                color: "#059669",
                padding: "3px 10px",
                borderRadius: 6,
                fontFamily: FONTS.inter,
                fontWeight: 800,
                fontSize: 12,
              }}
            >
              TIẾT KIỆM 10X
            </div>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 9. SceneChairSwivelUpgrade: Ghế xoay 180 độ + Ngôi sao rớt
// =========================================================================
export const SceneChairSwivelUpgrade: React.FC = () => {
  const frame = useCurrentFrame();
  const swivel = interpolate(frame, [10, 45], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const starDrop = spring({
    frame: frame - 30,
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  return (
    <SceneWrapper
      step="07"
      category="Vị Thế Dẫn Đầu"
      headlineMain="Xoay chuyển,"
      headlineAccent="chiếm lĩnh #1"
      subtitlePre="thăng hạng thương hiệu"
      subtitleAccent="Top 1 ngành"
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: 500, height: 320, transform: "scale(1.2)" }}>
        {/* Star Dropping from top with bounce */}
        <div
          style={{
            position: "absolute",
            top: interpolate(starDrop, [0, 1], [-60, 20]),
            opacity: starDrop,
            transform: `scale(${starDrop}) rotate(${(1 - starDrop) * 45}deg)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#F59E0B",
            color: "#FFF",
            padding: "8px 20px",
            borderRadius: 999,
            boxShadow: SHADOWS.cardHover,
            zIndex: 10,
          }}
        >
          <FaIcon icon="star" size={20} color="#FFF" />
          <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16 }}>TOP 1 MARKET</span>
        </div>

        {/* Chair container with 3D Y-axis rotation */}
        <div
          style={{
            marginTop: 70,
            perspective: 800,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 32,
              backgroundColor: "#FFF",
              border: `2px solid ${COLORS.divider}`,
              boxShadow: SHADOWS.floating,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotateY(${swivel}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{ transform: swivel > 90 ? "rotateY(180deg)" : "none" }}>
              <FaIcon icon="chair" size={56} color={swivel > 90 ? COLORS.terracotta : COLORS.inkSecondary} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 14, color: COLORS.inkMuted, fontWeight: 700 }}>TĂNG TRƯỞNG</div>
          <div style={{ fontFamily: FONTS.inter, fontSize: 32, fontWeight: 900, color: COLORS.terracotta }}>
            +450% VỊ THẾ
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 10. SceneMagnetLeadAttractor: Nam châm hút Lead & Khách hàng
// =========================================================================
export const SceneMagnetLeadAttractor: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.2) * 0.08;

  const lead1Spring = spring({ frame: frame - 15, fps: 30, config: SPRING_PRESETS.snappy });
  const lead2Spring = spring({ frame: frame - 25, fps: 30, config: SPRING_PRESETS.snappy });
  const lead3Spring = spring({ frame: frame - 35, fps: 30, config: SPRING_PRESETS.snappy });

  return (
    <SceneWrapper
      step="08"
      category="Thu Hút Tự Động"
      headlineMain="Nam châm hút,"
      headlineAccent="khách hàng tiềm năng"
      subtitlePre="tự động kéo lead"
      subtitleAccent="về phễu bán hàng"
    >
      <div style={{ position: "relative", width: 560, height: 340, display: "flex", alignItems: "center", justifyContent: "space-between", transform: "scale(1.15)" }}>
        {/* Magnet Icon with pulse waves */}
        <div style={{ position: "relative", width: 150, display: "flex", justifyContent: "center" }}>
          {/* Wave ripple rings */}
          <div
            style={{
              position: "absolute",
              width: 130 * pulse,
              height: 130 * pulse,
              borderRadius: "50%",
              border: `2px dashed ${COLORS.terracotta}`,
              opacity: 0.4,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              backgroundColor: "#FFF",
              border: `2px solid ${COLORS.terracotta}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: SHADOWS.card,
              zIndex: 2,
            }}
          >
            <FaIcon icon="magnet" size={52} color={COLORS.terracotta} />
          </div>
        </div>

        {/* Incoming Leads Sucked Towards Magnet */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
          <div
            style={{
              backgroundColor: "#FFF",
              padding: "12px 18px",
              borderRadius: 14,
              boxShadow: SHADOWS.card,
              border: `1.5px solid ${COLORS.divider}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              transform: `translateX(${(1 - lead1Spring) * 120}px)`,
              opacity: lead1Spring,
            }}
          >
            <FaIcon icon="user-plus" size={18} color="#059669" />
            <span style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 700, color: COLORS.inkPrimary }}>Lead B2B Doanh Nghiệp</span>
          </div>

          <div
            style={{
              backgroundColor: "#FFF",
              padding: "12px 18px",
              borderRadius: 14,
              boxShadow: SHADOWS.card,
              border: `1.5px solid ${COLORS.divider}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              transform: `translateX(${(1 - lead2Spring) * 140}px)`,
              opacity: lead2Spring,
            }}
          >
            <FaIcon icon="bolt" size={18} color="#F59E0B" />
            <span style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 700, color: COLORS.inkPrimary }}>Đơn Hàng Tự Động</span>
          </div>

          <div
            style={{
              backgroundColor: "#FFF",
              padding: "12px 18px",
              borderRadius: 14,
              boxShadow: SHADOWS.card,
              border: `1.5px solid ${COLORS.divider}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              transform: `translateX(${(1 - lead3Spring) * 160}px)`,
              opacity: lead3Spring,
            }}
          >
            <FaIcon icon="gem" size={18} color="#8B5CF6" />
            <span style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 700, color: COLORS.inkPrimary }}>Khách VIP Đặt Cọc</span>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 11. ScenePushPullLeverSwitch: Cần gạt cơ học đẩy bật chế độ Tự Động
// =========================================================================
export const ScenePushPullLeverSwitch: React.FC = () => {
  const frame = useCurrentFrame();
  const leverThrown = frame >= 25;
  const leverAngle = interpolate(frame, [20, 32], [-28, 28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapper
      step="09"
      category="Cơ Chế Kích Hoạt"
      headlineMain="Bật cần gạt,"
      headlineAccent="kích hoạt AI"
      subtitlePre="chuyển từ thủ công"
      subtitleAccent="sang 100% tự động"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, width: 540, height: 300, transform: "scale(1.2)" }}>
        {/* Status Left: Thủ công */}
        <div
          style={{
            padding: "12px 20px",
            borderRadius: 14,
            backgroundColor: !leverThrown ? "#F3F4F6" : "transparent",
            color: !leverThrown ? COLORS.inkPrimary : COLORS.inkMuted,
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 16,
            transition: "all 0.2s",
          }}
        >
          THỦ CÔNG
        </div>

        {/* Heavy Industrial Mechanical Lever */}
        <div
          style={{
            position: "relative",
            width: 140,
            height: 180,
            backgroundColor: "#27272A",
            borderRadius: 24,
            border: "4px solid #3F3F46",
            boxShadow: SHADOWS.cardHover,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Lever handle with pivot at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              width: 14,
              height: 100,
              backgroundColor: "#D4D4D8",
              borderRadius: 7,
              transformOrigin: "bottom center",
              transform: `rotate(${leverAngle}deg)`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Top Ball Grip */}
            <div
              style={{
                position: "absolute",
                top: -24,
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: leverThrown ? COLORS.terracotta : "#71717A",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            />
          </div>
        </div>

        {/* Status Right: Tự Động Hoá AI */}
        <div
          style={{
            padding: "12px 20px",
            borderRadius: 14,
            backgroundColor: leverThrown ? "#FEF2F2" : "transparent",
            color: leverThrown ? COLORS.terracotta : COLORS.inkMuted,
            border: leverThrown ? `1.5px solid ${COLORS.terracotta}` : "none",
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          TỰ ĐỘNG AI
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 12. SceneStarRatingDropBounce: 5 Ngôi sao vàng rơi lò xo
// =========================================================================
export const SceneStarRatingDropBounce: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneWrapper
      step="10"
      category="Đánh Giá Uy Tín"
      headlineMain="Rơi bừng sáng,"
      headlineAccent="5 sao tuyệt đối"
      subtitlePre="chuẩn chất lượng"
      subtitleAccent="5.0/5.0 hoàn hảo"
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, width: 540, transform: "scale(1.2)" }}>
        {/* 5 Stars Staggered Drop */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {[0, 1, 2, 3, 4].map((i) => {
            const drop = spring({
              frame: frame - (i * 6 + 10),
              fps: 30,
              config: SPRING_PRESETS.pop,
            });
            return (
              <div
                key={i}
                style={{
                  transform: `translateY(${(1 - drop) * -80}px) scale(${drop})`,
                  opacity: drop,
                }}
              >
                <FaIcon icon="star" size={44} color="#F59E0B" />
              </div>
            );
          })}
        </div>

        {/* Rating Score Card */}
        <div
          style={{
            backgroundColor: "#FFF",
            padding: "16px 36px",
            borderRadius: 20,
            boxShadow: SHADOWS.card,
            border: `1.5px solid ${COLORS.divider}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 48, fontWeight: 900, color: COLORS.inkPrimary }}>
            5.0 <span style={{ fontSize: 24, color: COLORS.inkMuted, fontFamily: FONTS.inter }}>/ 5.0</span>
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: "#059669", fontWeight: 800, marginTop: 4 }}>
            1,420+ REVIEW XÁC THỰC
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 13. SceneTornPaperZipReveal: Xé toạc dải giấy hé lộ kết quả
// =========================================================================
export const SceneTornPaperZipReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const ripProgress = interpolate(frame, [15, 45], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapper
      step="11"
      category="Xé Rách Bí Mật"
      headlineMain="Xé toạc,"
      headlineAccent="bước đột phá"
      subtitlePre="hé lộ giải pháp"
      subtitleAccent="tiết kiệm 10x"
    >
      <div style={{ position: "relative", width: 520, height: 200, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.2)" }}>
        {/* Revealed Content Behind */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#18181B",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: SHADOWS.cardHover,
            padding: 24,
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontSize: 14, color: COLORS.terracotta, fontWeight: 800 }}>KẾT QUẢ CUỐI CÙNG</div>
          <div style={{ fontFamily: FONTS.inter, fontSize: 36, fontWeight: 900, color: "#FFF", marginTop: 8 }}>
            100% TỰ ĐỘNG HÓA
          </div>
        </div>

        {/* Covering Paper Overlay with Zipper Rip Width */}
        <div
          style={{
            position: "absolute",
            right: 0,
            width: `${100 - ripProgress}%`,
            height: "100%",
            backgroundColor: COLORS.bgPaper,
            borderLeft: ripProgress > 0 && ripProgress < 100 ? `4px dashed ${COLORS.terracotta}` : "none",
            borderRadius: "0 20px 20px 0",
            boxShadow: ripProgress > 0 ? "-6px 0 16px rgba(0,0,0,0.15)" : "none",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 16, color: COLORS.inkMuted }}>
            {ripProgress < 40 ? "KÉO ĐỂ XÉ >>>" : ""}
          </span>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 14. SceneGoogleSearchPill: 100% Benchmark Video Mẫu 5 (Typewriter Pill + Squircles)
// =========================================================================
export const SceneGoogleSearchPill: React.FC = () => {
  const frame = useCurrentFrame();
  const fullText = "AI Agent Tự Động...";
  const charsShown = Math.min(fullText.length, Math.floor(frame / 2.2));
  const displayText = fullText.slice(0, charsShown);
  const showCursor = Math.floor(frame / 12) % 2 === 0;

  const squircleSpring1 = spring({ frame: frame - 18, fps: 30, config: SPRING_PRESETS.pop });
  const squircleSpring2 = spring({ frame: frame - 26, fps: 30, config: SPRING_PRESETS.pop });

  return (
    <SceneWrapper
      step="01"
      category="Tìm Kiếm Ý Tưởng"
      headlineMain="Lên Google,"
      headlineAccent="tìm kiếm ngay"
      subtitlePre="khám phá giải pháp"
      subtitleAccent="tối ưu vượt trội"
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, width: 620, transform: "scale(1.2)" }}>
        {/* Typewriter Search Pill */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: 999,
            padding: "18px 28px",
            border: `2px solid ${COLORS.divider}`,
            boxShadow: "0 20px 48px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <FaIcon icon="google" size={24} color="#EA4335" />
          <div style={{ flex: 1, fontFamily: FONTS.inter, fontSize: 20, fontWeight: 700, color: COLORS.inkPrimary }}>
            {displayText}
            <span style={{ opacity: showCursor ? 1 : 0, color: COLORS.terracotta, fontWeight: 900 }}>|</span>
          </div>
          <div
            style={{
              backgroundColor: COLORS.terracotta,
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(200,82,40,0.35)",
            }}
          >
            <FaIcon icon="magnifying-glass" size={16} color="#FFF" />
          </div>
        </div>

        {/* 2 Squircles (Claude & ChatGPT) popping out */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 30,
              backgroundColor: "#FFF",
              border: `2px solid ${COLORS.divider}`,
              boxShadow: SHADOWS.cardHover,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transform: `scale(${squircleSpring1})`,
              opacity: squircleSpring1,
            }}
          >
            <Img src={staticFile("icon/claude.png")} style={{ width: 44, height: 44, objectFit: "contain" }} />
            <span style={{ fontFamily: FONTS.inter, fontSize: 11, fontWeight: 800, color: COLORS.inkPrimary }}>Claude</span>
          </div>

          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 30,
              backgroundColor: "#FFF",
              border: `2px solid ${COLORS.divider}`,
              boxShadow: SHADOWS.cardHover,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transform: `scale(${squircleSpring2})`,
              opacity: squircleSpring2,
            }}
          >
            <Img src={staticFile("icon/chatgpt.png")} style={{ width: 44, height: 44, objectFit: "contain" }} />
            <span style={{ fontFamily: FONTS.inter, fontSize: 11, fontWeight: 800, color: COLORS.inkPrimary }}>ChatGPT</span>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 15. SceneDynamicIslandExpand: 100% Benchmark Video Mẫu 5 (Apple Fluid Morph)
// =========================================================================
export const SceneDynamicIslandExpand: React.FC = () => {
  const frame = useCurrentFrame();
  const expandProgress = spring({
    frame: frame - 15,
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const width = interpolate(expandProgress, [0, 1], [160, 480]);
  const height = interpolate(expandProgress, [0, 1], [40, 110]);
  const radius = interpolate(expandProgress, [0, 1], [20, 36]);

  return (
    <SceneWrapper
      step="02"
      category="Trải Nghiệm Mượt"
      headlineMain="Dynamic Island,"
      headlineAccent="mở rộng mượt"
      subtitlePre="chuẩn trải nghiệm"
      subtitleAccent="Apple iOS 18"
    >
      <div style={{ position: "relative", width: 560, height: 260, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.2)" }}>
        {/* Dynamic Island Black Capsule */}
        <div
          style={{
            width,
            height,
            borderRadius: radius,
            backgroundColor: "#09090B",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            padding: "16px 24px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            color: "#FFF",
          }}
        >
          {/* Left Icon Surface */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: COLORS.terracotta,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaIcon icon="bolt" size={20} color="#FFF" />
            </div>
            {expandProgress > 0.4 && (
              <div style={{ opacity: (expandProgress - 0.4) / 0.6 }}>
                <div style={{ fontFamily: FONTS.inter, fontSize: 16, fontWeight: 900 }}>AI Agent Active</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#A1A1AA" }}>Đang đồng bộ dữ liệu...</div>
              </div>
            )}
          </div>

          {/* Right Waveform Spectrum */}
          {expandProgress > 0.4 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, opacity: (expandProgress - 0.4) / 0.6 }}>
              {[14, 28, 20, 36, 22, 16].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 4,
                    height: Math.sin(frame * 0.35 + i) * 8 + h,
                    backgroundColor: "#10B981",
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 16. SceneBrowserAddressBar: Benchmark Video Mẫu 7 (Safari SSL Lock Bar)
// =========================================================================
export const SceneBrowserAddressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({ frame: frame - 2, fps: 30, config: SPRING_PRESETS.snappy });
  
  const urlFull = "https://agent.ai/production/live";
  const chars = Math.min(urlFull.length, Math.floor(frame / 2.0));
  const urlDisplay = urlFull.slice(0, chars);

  return (
    <SceneWrapper
      step="03"
      category="Bảo Mật API"
      headlineMain="Truy cập web,"
      headlineAccent="bảo mật 100%"
      subtitlePre="kết nối an toàn"
      subtitleAccent="tiêu chuẩn cao nhất"
    >
      <div
        style={{
          width: 640,
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          border: `2px solid ${COLORS.divider}`,
          overflow: "hidden",
          transform: `scale(${entrance * 1.2})`,
        }}
      >
        {/* macOS Window Chrome Top Bar */}
        <div style={{ backgroundColor: "#F1F5F9", padding: "14px 20px", display: "flex", alignItems: "center", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          </div>

          {/* Centered Pill Address Bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 380,
              margin: "0 auto",
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #CBD5E1",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <FaIcon icon="lock" size={13} color="#059669" />
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700, color: COLORS.inkPrimary }}>
              {urlDisplay}
            </span>
          </div>
        </div>

        {/* Content Body Preview */}
        <div style={{ padding: "36px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: "#059669", fontWeight: 800 }}>SSL 256-BIT ENCRYPTED</div>
            <div style={{ fontFamily: FONTS.inter, fontSize: 24, fontWeight: 900, color: COLORS.inkPrimary, marginTop: 4 }}>
              Hệ Thống Đã Sẵn Sàng
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#ECFDF5",
              color: "#059669",
              padding: "10px 20px",
              borderRadius: 12,
              fontFamily: FONTS.inter,
              fontWeight: 900,
              fontSize: 14,
              border: "1.5px solid #059669",
            }}
          >
            ACTIVE 200 OK
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 17. SceneVoiceWaveformPulse: Benchmark Video Mẫu 6 (Audiophile Vocal Spectrum)
// =========================================================================
export const SceneVoiceWaveformPulse: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneWrapper
      step="04"
      category="Giọng Đọc AI"
      headlineMain="Âm thanh sống,"
      headlineAccent="bắt từng nhịp"
      subtitlePre="truyền cảm tự nhiên"
      subtitleAccent="100% chân thực"
    >
      <div
        style={{
          width: 600,
          backgroundColor: "#18181B",
          borderRadius: 30,
          padding: "44px 36px",
          boxShadow: "0 28px 70px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          transform: "scale(1.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.terracotta, boxShadow: "0 0 10px rgba(200,82,40,1)" }} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 800, color: "#A1A1AA", letterSpacing: 1 }}>
            STUDIO VOCAL SPECTRUM • 48KHZ
          </span>
        </div>

        {/* 16 Audio Bars Bouncing dynamically */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 100 }}>
          {[20, 45, 75, 90, 60, 35, 80, 100, 85, 55, 90, 70, 40, 65, 30, 15].map((baseH, i) => {
            const h = Math.abs(Math.sin(frame * 0.25 + i * 0.4)) * (baseH * 0.8) + 16;
            const isPeak = h > 75;
            return (
              <div
                key={i}
                style={{
                  width: 8,
                  height: h,
                  borderRadius: 4,
                  backgroundColor: isPeak ? COLORS.terracotta : "#3F3F46",
                  boxShadow: isPeak ? "0 0 14px rgba(200,82,40,0.8)" : "none",
                  transition: "height 0.05s linear",
                }}
              />
            );
          })}
        </div>

        <div style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 900, color: COLORS.terracotta }}>
          ELEVENLABS • NEURAL SPEECH
        </div>
      </div>
    </SceneWrapper>
  );
};

// =========================================================================
// 18. SceneBookPageFlip: Benchmark Video Mẫu 7 (3D Tactile Page Curl Flip)
// =========================================================================
export const SceneBookPageFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const flipAngle = interpolate(frame, [15, 45], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapper
      step="05"
      category="Đột Phá Tri Thức"
      headlineMain="Lật trang mới,"
      headlineAccent="dẫn đầu ngành"
      subtitlePre="bước tiến chiến lược"
      subtitleAccent="vượt xa đối thủ"
    >
      <div style={{ perspective: 1000, width: 560, height: 260, display: "flex", justifyContent: "center", transform: "scale(1.2)" }}>
        {/* Open Book Spread */}
        <div
          style={{
            position: "relative",
            width: 480,
            height: 240,
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            border: `2px solid ${COLORS.divider}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.14)",
            display: "flex",
          }}
        >
          {/* Left Page (Previous Chapter) */}
          <div style={{ flex: 1, padding: 28, borderRight: "1px solid #E2E8F0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.inkMuted, fontWeight: 800 }}>CHƯƠNG CŨ</div>
            <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 24, fontWeight: 900, color: COLORS.inkPrimary }}>
              Cách Làm Truyền Thống
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#EF4444", fontWeight: 700 }}>
              TỐN 40H / TUẦN
            </div>
          </div>

          {/* Right Page (New Chapter: AI Auto) */}
          <div style={{ flex: 1, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.terracotta, fontWeight: 800 }}>CHƯƠNG MỚI</div>
            <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 24, fontWeight: 900, color: COLORS.terracotta }}>
              Tự Động Hóa AI
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#059669", fontWeight: 700 }}>
              CHỈ MẤT 5 PHÚT
            </div>
          </div>

          {/* Turning Page with 3D Flip */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              transformOrigin: "left center",
              transform: `rotateY(${flipAngle}deg)`,
              backgroundColor: flipAngle < -90 ? "#F8FAFC" : "#FFFFFF",
              borderRadius: "0 16px 16px 0",
              boxShadow: flipAngle > -90 ? "-12px 0 24px rgba(0,0,0,0.15)" : "none",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {flipAngle > -90 && (
              <FaIcon icon="book" size={32} color={COLORS.terracotta} />
            )}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};
