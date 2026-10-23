import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Bảng màu hệ hình "paper":
// Nền giấy trắng sáng, chữ mực đen, đúng một màu nhấn cam đất (Terracotta).
export const theme = {
  colors: {
    background: "#FAF8F5", // Nền giấy trắng sáng thanh lịch
    paper: "#FFFFFF",      // Mảnh giấy trắng sạch
    paperMuted: "#F4F0E8", // Giấy tông ngà ấm nhẹ
    ink: "#1A1816",        // Chữ mực đen đậm
    accent: "#C6532A",     // Đúng một màu nhấn cam đất
    subtle: "rgba(26, 24, 22, 0.45)",
    line: "rgba(26, 24, 22, 0.12)",
  },
  fonts: {
    title: loadFraunces().fontFamily,
    body: loadInter().fontFamily,
  },
} as const;

export type PaperTheme = typeof theme;
