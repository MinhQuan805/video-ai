import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { FaIcon } from "../../shared/FaIcon";

/**
 * SceneWrapperOpen: Khung cảnh chuẩn cho các sự vật Mở (Open-Floating)
 * KHÔNG NHỐT TRONG CARD TRẮNG - Các sự vật cơ khí, công nghệ và kinh doanh
 * nổi tự do trực tiếp trên nền giấy ấm #F7F5EE với bóng đổ vật lý đa tầng.
 */
interface SceneWrapperOpenProps {
  step: string;
  category: string;
  headlineMain: string;
  headlineAccent: string;
  subtitlePre: string;
  subtitleAccent: string;
  children: React.ReactNode;
}

export const SceneWrapperOpen: React.FC<SceneWrapperOpenProps> = ({
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
        justifyContent: "space-between",
        padding: "160px 80px 140px 80px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Top Section: Eyebrow + Large Fraunces Headline */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
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
              padding: "5px 14px",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(200,82,40,0.3)",
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

        <div
          style={{
            fontFamily: FONTS.frauncesNormal,
            fontSize: 66,
            fontWeight: 900,
            color: COLORS.inkPrimary,
            lineHeight: 1.15,
            letterSpacing: -1,
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
              fontWeight: 700,
            }}
          >
            {headlineAccent}
          </span>
        </div>
      </div>

      {/* 2. Central Open-Floating Physical Stage (NO WHITE CARD) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          margin: "40px 0",
        }}
      >
        {children}
      </div>

      {/* 3. Bottom Kinetic Karaoke Subtitle Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${(1 - entrance) * 30}px)`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.inter,
            fontSize: 28,
            fontWeight: 800,
            color: COLORS.inkPrimary,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {subtitlePre}{" "}
          <span
            style={{
              color: COLORS.terracotta,
              fontWeight: 900,
              textDecoration: "underline",
              textDecorationColor: COLORS.terracotta,
            }}
          >
            {subtitleAccent}
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 1. SceneAuctionGavelSlam: Búa phiên đấu giá gõ cọc chốt deal Enterprise
// =========================================================================
export const SceneAuctionGavelSlam: React.FC = () => {
  const frame = useCurrentFrame();

  // Búa vung lên rồi đập dập dứt khoát xuống mặt thớt đúng frame 18
  const gavelLift = interpolate(frame, [0, 10, 18], [0, -35, 0], {
    extrapolateRight: "clamp",
  });
  const gavelRot = interpolate(frame, [0, 10, 18], [0, -35, 12], {
    extrapolateRight: "clamp",
  });
  
  // Sóng chấn động lan tỏa từ điểm tiếp xúc
  const isSlam = frame >= 18;
  const shockProgress = isSlam ? (frame - 18) * 0.08 : 0;
  const shockScale = interpolate(shockProgress, [0, 1], [0.4, 2.2], {
    extrapolateRight: "clamp",
  });
  const shockOpacity = interpolate(shockProgress, [0, 0.2, 1], [0, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Đế gỗ nhún xuống theo lực tác động rồi nảy lại
  const blockDip = isSlam ? Math.max(0, 10 - (frame - 18) * 1.5) : 0;

  // Thẻ giá trị deal nảy bừng sáng
  const dealSpring = spring({
    frame: frame - 19,
    fps: 30,
    config: SPRING_PRESETS.pop,
  });

  return (
    <SceneWrapperOpen
      step="01"
      category="Chốt Hợp Đồng"
      headlineMain="Gõ búa,"
      headlineAccent="chốt deal lớn"
      subtitlePre="hoàn tất hợp đồng"
      subtitleAccent="Enterprise $150K"
    >
      <div style={{ position: "relative", width: 640, height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "scale(1.3)" }}>
        
        {/* Vòng sóng chấn động lan tỏa khi búa đập xuống */}
        {isSlam && (
          <div
            style={{
              position: "absolute",
              width: 180 * shockScale,
              height: 70 * shockScale,
              borderRadius: "50%",
              border: `3px solid ${COLORS.terracotta}`,
              opacity: shockOpacity,
              top: 240,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Chiếc Búa Gỗ Mahogany Nổi Tự Do */}
        <div
          style={{
            position: "absolute",
            top: 60 + gavelLift,
            left: 210,
            transformOrigin: "bottom right",
            transform: `rotate(${gavelRot}deg)`,
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
            zIndex: 10,
          }}
        >
          {/* Đầu Búa Khối Gỗ với Vòng Đai Đồng */}
          <div style={{ position: "relative", width: 140, height: 70, backgroundColor: "#78350F", borderRadius: 12, border: "3px solid #451A03", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Đai kim loại mạ vàng */}
            <div style={{ width: 24, height: "100%", backgroundColor: "#F59E0B", borderLeft: "2px solid #D97706", borderRight: "2px solid #D97706" }} />
            {/* Cán Búa Vươn Dài */}
            <div style={{ position: "absolute", top: "50%", right: -120, width: 140, height: 18, backgroundColor: "#92400E", borderRadius: "0 9px 9px 0", transform: "translateY(-50%)", border: "2px solid #451A03" }} />
          </div>
        </div>

        {/* Mặt Thớt Gỗ Tròn Đón Búa (Sound Block) */}
        <div
          style={{
            marginTop: 180 + blockDip,
            width: 240,
            height: 60,
            backgroundColor: "#78350F",
            borderRadius: "50%",
            border: "4px solid #451A03",
            boxShadow: "0 24px 50px rgba(0,0,0,0.3), inset 0 4px 10px rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ width: 190, height: 38, borderRadius: "50%", border: "2px dashed #F59E0B", opacity: 0.7 }} />
        </div>

        {/* Badge Giá Trị Hợp Đồng Nổ Bung */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 40,
            transform: `scale(${dealSpring})`,
            opacity: dealSpring,
            backgroundColor: "#ECFDF5",
            border: "2.5px solid #059669",
            borderRadius: 20,
            padding: "12px 26px",
            boxShadow: "0 16px 36px rgba(5,150,105,0.25)",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: "#059669", fontWeight: 800 }}>DEAL CLOSED</div>
          <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 36, fontWeight: 900, color: "#059669" }}>
            $150,000
          </div>
        </div>
      </div>
    </SceneWrapperOpen>
  );
};

// =========================================================================
// 2. SceneRamSnapping: Thanh RAM server cắm gài lẫy tanh tách
// =========================================================================
export const SceneRamSnapping: React.FC = () => {
  const frame = useCurrentFrame();

  // Thanh RAM từ trên hạ xuống khe cắm đúng frame 16
  const ramY = interpolate(frame, [0, 16], [-100, 0], {
    extrapolateRight: "clamp",
  });
  
  // Hai lẫy khóa hai đầu bật sập vào đúng frame 18
  const isLocked = frame >= 18;
  const latchAngle = interpolate(frame, [14, 18], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chân pin vàng phát sáng xung nhịp
  const pinGlow = isLocked ? Math.abs(Math.sin(frame * 0.3)) : 0;

  return (
    <SceneWrapperOpen
      step="02"
      category="Nâng Cấp Cache"
      headlineMain="Gài khớp,"
      headlineAccent="nạp thanh RAM"
      subtitlePre="mở rộng dung lượng"
      subtitleAccent="+64GB Cache tức thì"
    >
      <div style={{ position: "relative", width: 620, height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "scale(1.3)" }}>
        
        {/* Thanh RAM Module Thép Xanh Đen Nổi Tự Do */}
        <div
          style={{
            width: 380,
            height: 90,
            backgroundColor: "#064E3B",
            borderRadius: 8,
            border: "3px solid #022C22",
            boxShadow: "0 24px 50px rgba(0,0,0,0.22)",
            transform: `translateY(${ramY}px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "8px 12px 0 12px",
            zIndex: 5,
          }}
        >
          {/* Hàng 8 Chip Nhớ Đen trên thanh RAM */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 48,
                  backgroundColor: "#18181B",
                  borderRadius: 4,
                  border: "1px solid #3F3F46",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: "#27272A" }} />
              </div>
            ))}
          </div>

          {/* Dải chân kim loại mạ vàng Gold Pins */}
          <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 2 }}>
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 12,
                  backgroundColor: isLocked ? "#F59E0B" : "#D97706",
                  boxShadow: pinGlow > 0.5 ? "0 0 6px rgba(245,158,11,0.8)" : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Khe Cắm Mainboard Đen với 2 Lẫy Thép Bật Khóa */}
        <div
          style={{
            position: "relative",
            width: 440,
            height: 28,
            backgroundColor: "#18181B",
            borderRadius: 6,
            border: "2px solid #27272A",
            marginTop: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px",
          }}
        >
          {/* Lẫy Khóa Trái */}
          <div
            style={{
              width: 14,
              height: 36,
              backgroundColor: isLocked ? COLORS.terracotta : "#D4D4D8",
              borderRadius: 3,
              transformOrigin: "bottom center",
              transform: `rotate(${-latchAngle}deg)`,
              transition: "background-color 0.1s",
            }}
          />

          {/* Khe rãnh cắm trung tâm */}
          <div style={{ flex: 1, height: 6, backgroundColor: "#09090B", margin: "0 12px", borderRadius: 2 }} />

          {/* Lẫy Khóa Phải */}
          <div
            style={{
              width: 14,
              height: 36,
              backgroundColor: isLocked ? COLORS.terracotta : "#D4D4D8",
              borderRadius: 3,
              transformOrigin: "bottom center",
              transform: `rotate(${latchAngle}deg)`,
              transition: "background-color 0.1s",
            }}
          />
        </div>

        {/* Badge Tốc Độ Bộ Nhớ */}
        {isLocked && (
          <div
            style={{
              marginTop: 28,
              backgroundColor: "#FFF",
              padding: "8px 24px",
              borderRadius: 14,
              boxShadow: SHADOWS.cardHover,
              border: `2px solid ${COLORS.terracotta}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <FaIcon icon="microchip" size={18} color={COLORS.terracotta} />
            <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              DDR5 • 64GB 6400MHz LOCKED
            </span>
          </div>
        )}
      </div>
    </SceneWrapperOpen>
  );
};

// =========================================================================
// 3. SceneRailTrackSwitcher: Cần gạt bẻ ghi đường ray Git Branching
// =========================================================================
export const SceneRailTrackSwitcher: React.FC = () => {
  const frame = useCurrentFrame();

  // Cần gạt bẻ ghi chuyển hướng đúng frame 16
  const isSwitched = frame >= 16;
  const leverAngle = interpolate(frame, [10, 18], [-26, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Xe đẩy hàng dữ liệu chạy dọc nhánh ray rẽ mới
  const cartProgress = interpolate(frame, [20, 60], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapperOpen
      step="03"
      category="Rẽ Nhánh Code"
      headlineMain="Bẻ ghi,"
      headlineAccent="rẽ nhánh Git"
      subtitlePre="tự động hóa luồng"
      subtitleAccent="CI/CD thần tốc"
    >
      <div style={{ position: "relative", width: 640, height: 380, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.25)" }}>
        
        {/* Đường Ray Thép Vẽ Bằng SVG Mở Hoàn Toàn */}
        <svg width="560" height="260" viewBox="0 0 560 260" style={{ position: "absolute", top: 40, left: 40 }}>
          {/* Nhánh ray chính cũ (Bị bỏ qua) */}
          <path d="M 40 130 L 240 130 L 520 70" fill="none" stroke="#CBD5E1" strokeWidth="8" strokeDasharray="10,10" />
          
          {/* Nhánh ray mới AI Feature (Được kích hoạt) */}
          <path
            d="M 40 130 L 240 130 L 520 190"
            fill="none"
            stroke={isSwitched ? COLORS.terracotta : "#CBD5E1"}
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Thanh tà vẹt gỗ ngang đường ray */}
          {[60, 110, 160, 210, 280, 340, 400, 460].map((x, i) => (
            <rect key={i} x={x} y={115 + (i > 3 ? (i - 3) * 12 : 0)} width="10" height="30" fill="#78350F" rx="2" />
          ))}

          {/* Xe đẩy gói tính năng di chuyển dọc đường ray rẽ mới */}
          {isSwitched && (
            <g transform={`translate(${240 + (cartProgress * 0.9)}, ${130 + (cartProgress * 0.2)})`}>
              <rect x="-24" y="-20" width="48" height="40" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="3" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.15))" />
              <text x="0" y="4" textAnchor="middle" fill="#059669" fontFamily={FONTS.mono} fontSize="11" fontWeight="800">
                PROD
              </text>
            </g>
          )}
        </svg>

        {/* Cơ Cấu Cần Gạt Cơ Khí Bẻ Ghi */}
        <div
          style={{
            position: "absolute",
            left: 200,
            bottom: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Hộp đế thép bẻ ghi */}
          <div style={{ width: 60, height: 40, backgroundColor: "#27272A", borderRadius: 10, border: "2px solid #52525B", position: "relative" }}>
            {/* Cần gạt kim loại xoay trục */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 26,
                width: 8,
                height: 70,
                backgroundColor: "#D4D4D8",
                borderRadius: 4,
                transformOrigin: "bottom center",
                transform: `rotate(${leverAngle}deg)`,
              }}
            >
              {/* Quả bi đỏ đầu cần gạt */}
              <div style={{ position: "absolute", top: -14, left: -6, width: 20, height: 20, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
            </div>
          </div>
        </div>

        {/* Nhãn Tag Git Branch */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 40,
            backgroundColor: "#FFFFFF",
            padding: "8px 18px",
            borderRadius: 12,
            border: `2px solid ${isSwitched ? COLORS.terracotta : COLORS.divider}`,
            boxShadow: SHADOWS.card,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FaIcon icon="code-branch" size={16} color={COLORS.terracotta} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 800, color: COLORS.inkPrimary }}>
            feature/ai-pipeline
          </span>
        </div>
      </div>
    </SceneWrapperOpen>
  );
};

// =========================================================================
// 4. SceneMechanicalToggleSwitch: Công tắc kim loại bật nảy tia lửa điện
// =========================================================================
export const SceneMechanicalToggleSwitch: React.FC = () => {
  const frame = useCurrentFrame();

  const isFlipped = frame >= 18;
  const switchAngle = interpolate(frame, [12, 18], [-28, 28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapperOpen
      step="04"
      category="Kích Hoạt Hệ Thống"
      headlineMain="Bật gạt,"
      headlineAccent="vận hành 100%"
      subtitlePre="chuyển từ thủ công"
      subtitleAccent="sang tự động AI"
    >
      <div style={{ position: "relative", width: 600, height: 380, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.3)" }}>
        
        {/* Tấm Kim Loại Nhôm Phay Xước Cố Định Độc Lập */}
        <div
          style={{
            width: 260,
            height: 300,
            backgroundColor: "#E4E4E7",
            borderRadius: 24,
            border: "4px solid #A1A1AA",
            boxShadow: "0 28px 60px rgba(0,0,0,0.18), inset 0 2px 6px rgba(255,255,255,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 24,
            position: "relative",
          }}
        >
          {/* 4 Đinh Ốc Thép 4 Góc */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 10, height: 10, borderRadius: "50%", backgroundColor: "#71717A" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 10, height: 10, borderRadius: "50%", backgroundColor: "#71717A" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 10, height: 10, borderRadius: "50%", backgroundColor: "#71717A" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 10, height: 10, borderRadius: "50%", backgroundColor: "#71717A" }} />

          {/* Đèn LED Báo Trạng Thái */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: !isFlipped ? "#EF4444" : "#71717A", boxShadow: !isFlipped ? "0 0 10px #EF4444" : "none" }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 800, color: "#71717A" }}>OFF</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: isFlipped ? "#10B981" : "#71717A", boxShadow: isFlipped ? "0 0 14px #10B981" : "none" }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 800, color: isFlipped ? "#10B981" : "#71717A" }}>ON</span>
            </div>
          </div>

          {/* Ổ Vặn Trục Kim Loại Trung Tâm */}
          <div
            style={{
              position: "relative",
              width: 110,
              height: 110,
              borderRadius: "50%",
              backgroundColor: "#27272A",
              border: "6px solid #71717A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 4px 10px rgba(0,0,0,0.6)",
            }}
          >
            {/* Cần Gạt Kim Loại Đầu Khía */}
            <div
              style={{
                width: 14,
                height: 85,
                backgroundColor: "#F4F4F5",
                borderRadius: 7,
                transformOrigin: "bottom center",
                transform: `rotate(${switchAngle}deg)`,
                border: "2px solid #71717A",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ position: "absolute", top: -14, width: 28, height: 28, borderRadius: "50%", backgroundColor: isFlipped ? COLORS.terracotta : "#A1A1AA", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }} />
            </div>
          </div>

          {/* Dòng Chữ Dập Nổi */}
          <div style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 900, color: COLORS.inkPrimary, letterSpacing: 1 }}>
            AI AGENT ENGINE
          </div>
        </div>

        {/* Trạng Thái Tự Động Hóa Bay Lơ Lửng Phía Sau */}
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 60,
            backgroundColor: "#FFFFFF",
            padding: "16px 24px",
            borderRadius: 18,
            boxShadow: SHADOWS.cardHover,
            border: `2px solid ${isFlipped ? "#10B981" : COLORS.divider}`,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.inkMuted, fontWeight: 700 }}>CHẾ ĐỘ</div>
          <div style={{ fontFamily: FONTS.inter, fontSize: 22, fontWeight: 900, color: isFlipped ? "#10B981" : "#EF4444" }}>
            {isFlipped ? "TỰ ĐỘNG AI 100%" : "THỦ CÔNG 0%"}
          </div>
        </div>
      </div>
    </SceneWrapperOpen>
  );
};

// =========================================================================
// 5. ScenePressureGaugeOverload: Đồng hồ cơ áp suất rung giật kim vọt đỏ
// =========================================================================
export const ScenePressureGaugeOverload: React.FC = () => {
  const frame = useCurrentFrame();

  // Kim đồng hồ quét từ vùng xanh lên vùng đỏ 10,000 req/s
  const baseAngle = interpolate(frame, [0, 25], [-120, 110], {
    extrapolateRight: "clamp",
  });
  
  // Kim rung giật dữ dội khi chạm đỉnh công suất
  const isRed = frame > 20;
  const jitter = isRed ? Math.sin(frame * 1.6) * 4 : 0;
  const needleAngle = baseAngle + jitter;

  return (
    <SceneWrapperOpen
      step="05"
      category="Chịu Tải Cao"
      headlineMain="Tải đỉnh điểm,"
      headlineAccent="không nghẽn mạng"
      subtitlePre="xử lý mượt mà"
      subtitleAccent="10,000 req/s"
    >
      <div style={{ position: "relative", width: 620, height: 420, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.25)" }}>
        
        {/* Đồng Hồ Áp Suất Bằng Đồng Thau Cổ Điển Mở Tự Do */}
        <div
          style={{
            position: "relative",
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "12px solid #D97706",
            boxShadow: "0 32px 70px rgba(0,0,0,0.22), inset 0 6px 14px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Cung Vạch Đo 3 Màu: Xanh -> Vàng -> Đỏ */}
          <svg width="260" height="260" viewBox="0 0 200 200" style={{ position: "absolute", top: 18, left: 18 }}>
            {/* Vùng xanh */}
            <path d="M 40 160 A 75 75 0 0 1 70 50" fill="none" stroke="#10B981" strokeWidth="10" strokeLinecap="round" />
            {/* Vùng vàng */}
            <path d="M 70 50 A 75 75 0 0 1 130 50" fill="none" stroke="#F59E0B" strokeWidth="10" />
            {/* Vùng đỏ */}
            <path d="M 130 50 A 75 75 0 0 1 160 160" fill="none" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
          </svg>

          {/* Số Đo Lưu Lượng */}
          <div style={{ textAlign: "center", marginTop: 70, zIndex: 2 }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 800, color: COLORS.inkMuted }}>REQUESTS</div>
            <div style={{ fontFamily: FONTS.frauncesNormal, fontSize: 32, fontWeight: 900, color: isRed ? "#EF4444" : COLORS.inkPrimary }}>
              10,000<span style={{ fontSize: 16 }}>/s</span>
            </div>
          </div>

          {/* Kim Đồng Hồ Bằng Thép Quét Rung Giật */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 6,
              height: 110,
              backgroundColor: isRed ? "#EF4444" : "#18181B",
              transformOrigin: "bottom center",
              transform: `translate(-50%, -100%) rotate(${needleAngle}deg)`,
              borderRadius: "3px 3px 0 0",
              zIndex: 10,
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            {/* Đầu kim nhọn */}
            <div style={{ position: "absolute", top: -8, left: -4, width: 14, height: 14, borderRadius: "50%", backgroundColor: isRed ? "#EF4444" : "#18181B" }} />
          </div>

          {/* Trục Xoay Tròn Đồng Giữa */}
          <div style={{ position: "absolute", width: 28, height: 28, borderRadius: "50%", backgroundColor: "#78350F", border: "3px solid #F59E0B", zIndex: 12 }} />
        </div>

        {/* Ống Đồng Dẫn Áp Suất Phía Dưới */}
        <div style={{ position: "absolute", bottom: -20, width: 24, height: 50, backgroundColor: "#D97706", borderRadius: "0 0 6px 6px" }} />
      </div>
    </SceneWrapperOpen>
  );
};

// =========================================================================
// 6. SceneSlingshotLaunch: Bắn ná thun bứt phá tăng trưởng
// =========================================================================
export const SceneSlingshotLaunch: React.FC = () => {
  const frame = useCurrentFrame();

  // Dây thun kéo căng lùi về sau rồi bung mạnh đúng frame 18
  const isReleased = frame >= 18;
  const pullBack = interpolate(frame, [0, 16], [0, 60], {
    extrapolateRight: "clamp",
  });

  // Hạt đạn phóng vút về phía trước sau khi thả
  const rocketX = interpolate(frame, [18, 50], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rocketScale = interpolate(frame, [18, 26, 40], [1, 1.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapperOpen
      step="06"
      category="Bứt Phá Tăng Trưởng"
      headlineMain="Kéo căng ná,"
      headlineAccent="phóng bứt tốc"
      subtitlePre="tăng trưởng thần tốc"
      subtitleAccent="+500% quy mô"
    >
      <div style={{ position: "relative", width: 640, height: 380, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.25)" }}>
        
        {/* Chạc Ná Cây Gỗ Tự Nhiên Chữ Y */}
        <div
          style={{
            position: "absolute",
            left: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Hai Nhánh Gỗ Chữ Y */}
          <div style={{ display: "flex", gap: 90 }}>
            <div style={{ width: 26, height: 90, backgroundColor: "#78350F", borderRadius: "12px 12px 0 0", transform: "rotate(-18deg)", border: "3px solid #451A03" }} />
            <div style={{ width: 26, height: 90, backgroundColor: "#78350F", borderRadius: "12px 12px 0 0", transform: "rotate(18deg)", border: "3px solid #451A03" }} />
          </div>
          {/* Thân Cán Cầm */}
          <div style={{ width: 34, height: 110, backgroundColor: "#78350F", borderRadius: "0 0 16px 16px", marginTop: -20, border: "3px solid #451A03" }} />
        </div>

        {/* Dây Thun Kéo Căng */}
        {!isReleased ? (
          <div
            style={{
              position: "absolute",
              left: 110 - pullBack,
              top: 130,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Miếng Da Giữ Đạn */}
            <div style={{ width: 36, height: 46, backgroundColor: COLORS.terracotta, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaIcon icon="rocket" size={20} color="#FFF" />
            </div>
          </div>
        ) : (
          /* Tên Lửa Vàng Phóng Vút Đi Để Lại Vệt Sáng */
          <div
            style={{
              position: "absolute",
              left: 140 + rocketX,
              top: 130,
              transform: `scale(${rocketScale})`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 28px rgba(245,158,11,0.8)",
              }}
            >
              <FaIcon icon="rocket" size={28} color="#FFF" />
            </div>
            {/* Vệt khói phản lực */}
            <div style={{ width: 80, height: 6, backgroundColor: COLORS.terracotta, borderRadius: 3, opacity: 0.8 }} />
          </div>
        )}

        {/* Thẻ Chỉ Số Bùng Nổ */}
        {isReleased && (
          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 40,
              backgroundColor: "#FFF",
              padding: "16px 28px",
              borderRadius: 20,
              boxShadow: SHADOWS.cardHover,
              border: `2px solid ${COLORS.terracotta}`,
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.terracotta, fontWeight: 800 }}>TĂNG TRƯỞNG</div>
            <div style={{ fontFamily: FONTS.inter, fontSize: 38, fontWeight: 900, color: "#059669" }}>
              +500% KPI
            </div>
          </div>
        )}
      </div>
    </SceneWrapperOpen>
  );
};

// =========================================================================
// 7. SceneBrassPadlockUnlock: Ổ khóa đồng tra chìa mở bung ngàm bảo mật
// =========================================================================
export const SceneBrassPadlockUnlock: React.FC = () => {
  const frame = useCurrentFrame();

  // Chìa khóa tra vào vặn mở đúng frame 16
  const keyY = interpolate(frame, [0, 14], [80, 0], {
    extrapolateRight: "clamp",
  });
  const keyRot = interpolate(frame, [14, 20], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ngàm khóa bật bung nảy lò xo đúng frame 22
  const isUnlocked = frame >= 22;
  const shackleLift = isUnlocked ? spring({ frame: frame - 22, fps: 30, config: SPRING_PRESETS.pop }) : 0;

  return (
    <SceneWrapperOpen
      step="07"
      category="Bảo Mật Cấp Cao"
      headlineMain="Mở ổ khóa,"
      headlineAccent="xác thực 2FA"
      subtitlePre="bảo vệ toàn diện"
      subtitleAccent="tiêu chuẩn Enterprise"
    >
      <div style={{ position: "relative", width: 620, height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "scale(1.3)" }}>
        
        {/* Ổ Khóa Đồng Thau Cổ Điển Mở Tự Do */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Ngàm Thép Chữ U Bật Nảy */}
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "55px 55px 0 0",
              border: "18px solid #94A3B8",
              borderBottom: "none",
              marginBottom: -10,
              transform: `translateY(-${shackleLift * 32}px) ${isUnlocked ? "rotate(-12deg)" : "none"}`,
              transformOrigin: "bottom left",
              transition: "transform 0.1s ease",
            }}
          />

          {/* Thân Khóa Đồng Khối Vuông Bo Góc */}
          <div
            style={{
              width: 190,
              height: 150,
              backgroundColor: "#D97706",
              borderRadius: 24,
              border: "4px solid #B45309",
              boxShadow: "0 28px 60px rgba(0,0,0,0.24), inset 0 4px 10px rgba(255,255,255,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 5,
            }}
          >
            {/* Lỗ Khóa Tròn */}
            <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#451A03" }} />
            <div style={{ width: 8, height: 18, backgroundColor: "#451A03", marginTop: -4 }} />

            {/* Chìa Khóa Vàng Tra Vào */}
            <div
              style={{
                position: "absolute",
                top: 85 + keyY,
                transform: `rotate(${keyRot}deg)`,
                zIndex: 10,
              }}
            >
              <FaIcon icon="key" size={36} color="#FEF3C7" />
            </div>
          </div>
        </div>

        {/* Trạng Thái Bảo Mật An Toàn */}
        {isUnlocked && (
          <div
            style={{
              marginTop: 32,
              backgroundColor: "#ECFDF5",
              border: "2px solid #059669",
              padding: "10px 24px",
              borderRadius: 16,
              boxShadow: "0 12px 28px rgba(5,150,105,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FaIcon icon="shield" size={18} color="#059669" />
            <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: "#059669" }}>
              2FA VERIFIED • 100% SECURE
            </span>
          </div>
        )}
      </div>
    </SceneWrapperOpen>
  );
};

// =========================================================================
// 8. SceneThermalReceiptPrinter: Máy in hóa đơn nhiệt nhả cuộn giấy chốt đơn
// =========================================================================
export const SceneThermalReceiptPrinter: React.FC = () => {
  const frame = useCurrentFrame();

  // Dải giấy in hóa đơn đùn dài xuống theo thời gian
  const paperHeight = interpolate(frame, [0, 45], [20, 240], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapperOpen
      step="08"
      category="Doanh Thu Đổ Về"
      headlineMain="Nhả hóa đơn,"
      headlineAccent="chốt đơn 1 giây"
      subtitlePre="doanh thu tự động"
      subtitleAccent="chảy về tài khoản"
    >
      <div style={{ position: "relative", width: 620, height: 420, display: "flex", flexDirection: "column", alignItems: "center", transform: "scale(1.2)" }}>
        
        {/* Miệng Máy In Hóa Đơn Kim Loại Nổi Tự Do */}
        <div
          style={{
            width: 340,
            height: 70,
            backgroundColor: "#27272A",
            borderRadius: "18px 18px 0 0",
            border: "3px solid #3F3F46",
            boxShadow: "0 16px 36px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 8px #10B981" }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 800, color: "#A1A1AA" }}>POS TERMINAL</span>
          </div>
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 800 }}>PRINTING...</span>
        </div>

        {/* Dải Giấy Hóa Đơn Trắng Đùn Dài Xuống */}
        <div
          style={{
            width: 300,
            height: paperHeight,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            padding: "20px 24px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", borderBottom: "2px dashed #CBD5E1", paddingBottom: 10 }}>
            <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>
              BIÊN LAI ĐƠN HÀNG
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted }}>#INV-2026-9812</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700 }}>
            <span>Gói Enterprise</span>
            <span>$4,250</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700 }}>
            <span>VAT (0%)</span>
            <span>$0</span>
          </div>

          <div style={{ marginTop: "auto", borderTop: "2px solid #1D1C1A", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 15 }}>TỔNG CỘNG:</span>
            <span style={{ fontFamily: FONTS.frauncesNormal, fontWeight: 900, fontSize: 24, color: "#059669" }}>$4,250</span>
          </div>
        </div>

        {/* Răng Cưa Cắt Giấy Dưới Cùng */}
        <div style={{ width: 300, height: 8, background: "radial-gradient(circle, transparent 4px, #FFF 4px) 0 0/12px 8px repeat-x", marginTop: -2 }} />
      </div>
    </SceneWrapperOpen>
  );
};
