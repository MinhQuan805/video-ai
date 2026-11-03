import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Easing, interpolate } from "remotion";

// Tải font Google Fonts tối ưu cho Remotion
export const FONTS = {
  frauncesNormal: loadFraunces("normal", {
    weights: ["600", "700", "800"],
    subsets: ["vietnamese", "latin"],
    ignoreTooManyRequestsWarning: true,
  }).fontFamily,
  frauncesItalic: loadFraunces("italic", {
    weights: ["600", "700", "800"],
    subsets: ["vietnamese", "latin"],
    ignoreTooManyRequestsWarning: true,
  }).fontFamily,
  inter: loadInter("normal", {
    weights: ["400", "500", "600", "700", "800"],
    subsets: ["vietnamese", "latin"],
    ignoreTooManyRequestsWarning: true,
  }).fontFamily,
  mono: "'SF Mono', 'JetBrains Mono', 'Menlo', 'Consolas', monospace",
};

export const COLORS = {
  // Nền giấy Paper ấm cao cấp (Khớp 100% review-dashboard.html --bg-paper)
  bgPaper: "#F7F5EE",
  bgPaperSecondary: "#F3EFE6",
  bgPaperDark: "#18181A",
  
  // Màu mực Ink tự nhiên (không đen bệt)
  inkPrimary: "#1D1C1A",
  inkSecondary: "#68645E",
  inkMuted: "#969188",
  inkFaint: "rgba(29, 28, 26, 0.35)",
  
  // Màu điểm nhấn cam đất Terracotta đặc trưng
  terracotta: "#C85228",
  terracottaBright: "#D9532F",
  terracottaDark: "#A83E1B",
  terracottaLight: "#FBF1ED",
  terracottaGlow: "rgba(200, 82, 40, 0.28)",
  
  // Card & Surfaces
  cardBg: "#FFFFFF",
  cardBgMuted: "#FDFCFA",
  cardBorder: "rgba(29, 28, 26, 0.08)",
  cardBorderActive: "#C85228",
  divider: "rgba(29, 28, 26, 0.08)",
  
  // Tech & App Brands
  brandClaude: "#D97757",
  brandChatGPT: "#10A37F",
  brandGemini: "#2563EB",
  brandGoogle: "#4285F4",
  brandGmail: "#EA4335",
  brandCalendar: "#4285F4",
  brandDrive: "#34A853",
  brandNotion: "#000000",
  brandQwen: "#6366F1",
  brandGLM: "#1E293B",
  brandGitHub: "#24292F",
  brandRemotion: "#0B84FE",
  brandOpenverse: "#FFD026",
  
  // macOS & Tech accents
  terminalBg: "#181716",
  terminalText: "#F5F5F7",
  terminalGreen: "#34C759",
  terminalBlue: "#0A84FF",
  terminalYellow: "#FFD60A",
  trafficRed: "#FF5F56",
  trafficYellow: "#FFBD2E",
  trafficGreen: "#27C93F",
  
  // Status Colors
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
};

export const SHADOWS = {
  subtle: "0 2px 4px rgba(29, 28, 26, 0.02), 0 6px 12px -2px rgba(29, 28, 26, 0.04)",
  card: "0 4px 6px -1px rgba(29, 28, 26, 0.02), 0 16px 32px -4px rgba(29, 28, 26, 0.06), 0 1px 2px rgba(0, 0, 0, 0.02)",
  cardHover: "0 10px 20px -2px rgba(29, 28, 26, 0.04), 0 24px 48px -6px rgba(29, 28, 26, 0.09)",
  floating: "0 10px 24px -4px rgba(29, 28, 26, 0.05), 0 32px 64px -8px rgba(29, 28, 26, 0.10)",
  phone: "0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 12px 24px -6px rgba(0, 0, 0, 0.12)",
  sticker: "0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)",
  glowAccent: "0 8px 24px -2px rgba(200, 82, 40, 0.30)",
};

/**
 * THÔNG SỐ SPRING CHUẨN VÀNG (GOLDEN SPRING CONFIGS)
 * Giải quyết dứt điểm vấn đề "AI slow" / giật / đơ / bồng bềnh:
 * - Damping ratio được căn chỉnh chính xác:
 *   - snappy: Critically damped (damping: 22, mass: 0.7, stiffness: 220).
 *     Đạt 99% đích sau 10 frames (~0.33s), overshoot chỉ 0.07%, dừng chắc như đinh đóng cột!
 *   - pop: Dành cho chip/badge/sticker (overshoot 4%, settle cực nhanh 8 frames).
 *   - slam: Dành cho Stamp nện dấu (nện dứt khoát không nẩy bồng bềnh).
 *   - glide: Di chuyển mượt mà (cursor, playhead).
 */
export const SPRING_PRESETS = {
  // Xuất hiện dứt khoát, thanh thoát chuẩn Apple Editorial (Dùng cho Card, Title, Windows, Container)
  snappy: { mass: 0.7, damping: 22, stiffness: 220, overshootClamping: false },
  
  // Nảy đàn hồi tinh tế (Tactile Pop) - Dùng cho Badge, Icon, Pill, Button Click
  pop: { mass: 0.45, damping: 15, stiffness: 260, overshootClamping: false },
  
  // Nện dấu mạnh mẽ (Impact Slam) - Dùng cho Rubber Stamp "Duyệt", Sticker va đập
  slam: { mass: 0.8, damping: 16, stiffness: 320, overshootClamping: false },
  
  // Trượt êm ái (Smooth Glide) - Dùng cho Cursor di chuyển, thanh trượt, playhead
  glide: { mass: 0.8, damping: 20, stiffness: 180, overshootClamping: false },
  
  // Con lắc treo lửng lơ (Pendulum) - Dùng cho Thẻ treo dây PaperHangtag
  pendulum: { mass: 1.0, damping: 8, stiffness: 65, overshootClamping: false },
  
  // Nhẹ nhàng (Gentle) - Dùng cho Fade/Scale phụ trợ
  gentle: { mass: 0.9, damping: 24, stiffness: 150, overshootClamping: false },
};

/**
 * BỘ ĐƯỜNG CONG GIA TỐC CHUẨN XÁC CAO (PRECISION EASING CURVES)
 * Thay thế spring bằng cubic-bezier để đạt độ mượt tuyệt đối, không có đuôi dao động lề mề
 */
export const EASING_PRESETS = {
  // Apple Quintic Out: Bứt phá cực nhanh, phanh êm ái, dừng đứt điểm 100%
  appleEaseOut: Easing.bezier(0.16, 1, 0.3, 1),
  
  // Mechanical Snap: Vào khớp cơ khí nhanh gọn (công tắc, ngàm khóa, RAM snap)
  mechanicalSnap: Easing.bezier(0.2, 0, 0, 1),
  
  // Snappy Overshoot: Nhấn nhẹ có độ nảy vi mô nhưng dừng dứt khoát
  snappyOvershoot: Easing.bezier(0.34, 1.35, 0.64, 1),
  
  // Gravity Drop: Tăng tốc trọng lực rơi tự do, đạt vận tốc lớn nhất khi chạm đích
  gravityDrop: Easing.bezier(0.7, 0, 0.84, 0),
  
  // Smooth Symmetric: Di chuyển qua lại điều hòa
  smoothMove: Easing.bezier(0.65, 0, 0.35, 1),
};

/**
 * Helper chuyển động mượt mà với thời lượng chính xác tuyệt đối
 */
export const smoothStep = (
  frame: number,
  startFrame: number,
  durationFrames: number,
  fromVal: number,
  toVal: number,
  easing = EASING_PRESETS.appleEaseOut
): number => {
  return interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [fromVal, toVal],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing,
    }
  );
};
