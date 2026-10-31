import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Bảng màu hệ hình "paper":
// Nền giấy trắng sáng, chữ mực đen, đúng một màu nhấn cam đất (Terracotta).
export const theme = {
  colors: {
    background: "#F4EFE6", // Nền giấy trắng sáng thanh lịch
    paper: "#FFFFFF",      // Mảnh giấy trắng sạch
    paperMuted: "#ECE5D8", // Giấy tông ngà ấm nhẹ
    ink: "#1A1816",        // Chữ mực đen đậm
    accent: "#C6532A",     // Đúng một màu nhấn cam đất
    subtle: "rgba(26, 24, 22, 0.45)",
    line: "rgba(26, 24, 22, 0.12)",
  },
  fonts: {
    title: (loadFraunces('normal', {
      weights: ['700', '800'],
      subsets: ['vietnamese', 'latin'],
      ignoreTooManyRequestsWarning: true,
    }),
    loadFraunces('italic', {
      weights: ['700', '800'],
      subsets: ['vietnamese', 'latin'],
      ignoreTooManyRequestsWarning: true,
    })).fontFamily,
    body: loadInter('normal', {
      weights: ['500', '600', '700', '800', '900'],
      subsets: ['vietnamese', 'latin'],
      ignoreTooManyRequestsWarning: true,
    }).fontFamily,
  },
} as const;

export type PaperTheme = typeof theme;
