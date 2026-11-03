import React from "react";
import { useCurrentFrame, useVideoConfig, staticFile, Img } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTargetPulse } from "../physics";
import { FaIcon } from "../../shared/FaIcon";

export type BrandType =
  | "claude"
  | "chatgpt"
  | "gemini"
  | "qwen"
  | "glm"
  | "google"
  | "gmail"
  | "calendar"
  | "drive"
  | "notion"
  | "remotion"
  | "apple"
  | "github"
  | "react"
  | "meta"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "hubspot"
  | "deepseek"
  | "copilot"
  | "python"
  | "vscode"
  | "terminal"
  | "robot"
  | "omniroute"
  | "caltracker"
  | "openverse";

export interface AppTileProps {
  size?: number;
  icon?: React.ReactNode;
  brand?: BrandType;
  label?: string;
  isActive?: boolean;
  showTargetPing?: boolean;
  stickerBadge?: string;
  stickerAngle?: number;
  delay?: number;
  stickerDelayOffset?: number;
  style?: React.CSSProperties;
}

const BRAND_IMAGE_MAP: Record<string, string> = {
  claude: "icon/claude.png",
  chatgpt: "icon/chatgpt.png",
  gemini: "icon/gemini.png",
  google: "icon/google.png",
  gmail: "icon/Gmail.png",
  calendar: "icon/calendar.svg",
  drive: "icon/drive.png",
  notion: "icon/notion.png",
  apple: "icon/apple.png",
  github: "icon/GitHub.png",
  react: "icon/React.png",
  meta: "icon/meta.png",
  facebook: "icon/Facebook_Logo_Primary.png",
  instagram: "icon/instagram.png",
  tiktok: "icon/tiktok-seeklogo.png",
  youtube: "icon/youtube.png",
  linkedin: "icon/linkedin.png",
  hubspot: "icon/hubspot.png",
  deepseek: "icon/deepseek.png",
  copilot: "icon/copilot.png",
  python: "icon/python.png",
  vscode: "icon/VS Code.png",
};

/**
 * AppTile: Biểu tượng ứng dụng bo góc mềm (Squircle) phong cách Apple / Modern Reel.
 * Sử dụng 100% logo chính thức từ thư viện public/icon và icon chuẩn Font Awesome.
 * Tuyệt đối không dùng emoji hay icon tự vẽ tay mô phỏng.
 */
export const AppTile: React.FC<AppTileProps> = ({
  size = 110,
  icon,
  brand,
  label,
  isActive = false,
  showTargetPing = false,
  stickerBadge,
  stickerAngle = -8,
  delay = 4,
  stickerDelayOffset = 5,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chuyển động nảy của Icon chính
  const tileEntrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 28,
    startScale: 0.9,
  });

  // Chuyển động rơi dán đè của Sticker Badge
  const stickerEntrance = getSmoothEntrance({
    frame,
    fps,
    delay: delay + stickerDelayOffset,
    config: SPRING_PRESETS.pop,
    distanceY: -16,
    startScale: 0.65,
  });

  // Sóng ping mục tiêu
  const targetPulse = getTargetPulse(frame, delay + 8);

  const renderBrandIcon = () => {
    const iconSize = size * 0.54;

    if (icon) {
      return icon;
    }

    if (brand && BRAND_IMAGE_MAP[brand]) {
      return (
        <Img
          src={staticFile(BRAND_IMAGE_MAP[brand])}
          style={{
            width: iconSize,
            height: iconSize,
            objectFit: "contain",
          }}
        />
      );
    }

    // Các trường hợp đặc biệt không có trong ảnh PNG (dùng Font Awesome chuẩn)
    switch (brand) {
      case "terminal":
        return <FaIcon icon="terminal" size={Math.round(iconSize * 0.7)} color={COLORS.inkPrimary} />;
      case "robot":
        return <FaIcon icon="robot" size={Math.round(iconSize * 0.7)} color={COLORS.terracotta} />;
      case "remotion":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            <path d="M5 4.5L19 12L5 19.5V4.5Z" fill="#0B84FE" />
            <path d="M8 8L15 12L8 16V8Z" fill="#FFFFFF" />
          </svg>
        );
      case "caltracker":
        return <FaIcon icon="calendar" size={Math.round(iconSize * 0.7)} color="#F97316" />;
      case "omniroute":
        return <FaIcon icon="compass" size={Math.round(iconSize * 0.7)} color={COLORS.terracotta} />;
      case "qwen":
      case "glm":
      case "openverse":
        return <FaIcon icon="microchip" size={Math.round(iconSize * 0.7)} color={COLORS.inkPrimary} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${tileEntrance.translateY}px) scale(${tileEntrance.scale})`,
        opacity: tileEntrance.opacity,
        ...style,
      }}
    >
      {/* Sóng Ping tròn tỏa ra nếu là mục tiêu được kích hoạt */}
      {showTargetPing && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: size * 1.5,
            height: size * 1.5,
            marginTop: -(size * 1.5) / 2 - (label ? 14 : 0),
            marginLeft: -(size * 1.5) / 2,
            borderRadius: "50%",
            border: `2px solid ${COLORS.terracotta}`,
            transform: `scale(${targetPulse.scale})`,
            opacity: targetPulse.opacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Khối Squircle chứa Icon */}
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: "#FFFFFF",
          borderRadius: Math.round(size * 0.28), // Chuẩn tỷ lệ Squircle Apple iOS
          boxShadow: isActive ? SHADOWS.floating : SHADOWS.card,
          border: isActive ? `2.5px solid ${COLORS.terracotta}` : `1px solid ${COLORS.cardBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Phản xạ ánh sáng mặt kính nhẹ ở nửa trên */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "45%",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo chính thức */}
        {renderBrandIcon()}
      </div>

      {/* Nhãn dán Sticker nảy đè lên góc */}
      {stickerBadge && (
        <div
          style={{
            position: "absolute",
            top: -10,
            right: -12,
            backgroundColor: COLORS.terracotta,
            color: "#FFFFFF",
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: Math.max(11, Math.round(size * 0.12)),
            padding: "4px 10px",
            borderRadius: 8,
            boxShadow: SHADOWS.sticker,
            transform: `translateY(${stickerEntrance.translateY}px) scale(${stickerEntrance.scale}) rotate(${stickerAngle}deg)`,
            opacity: stickerEntrance.opacity,
            whiteSpace: "nowrap",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {stickerBadge.startsWith("✓") ? (
            <>
              <FaIcon icon="check" size={10} color="#FFFFFF" />
              <span>{stickerBadge.replace("✓", "").trim()}</span>
            </>
          ) : (
            stickerBadge
          )}
        </div>
      )}

      {/* Nhãn văn bản bên dưới icon */}
      {label && (
        <div
          style={{
            marginTop: 10,
            fontFamily: FONTS.inter,
            fontWeight: 700,
            fontSize: Math.max(13, Math.round(size * 0.14)),
            color: COLORS.inkPrimary,
            letterSpacing: -0.2,
            textAlign: "center",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
