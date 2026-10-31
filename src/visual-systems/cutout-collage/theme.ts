import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadBeVietnamPro } from "@remotion/google-fonts/BeVietnamPro";

// 1. Bảng màu dùng chung (Accent color khai báo tại đúng một chỗ)
export const ACCENT_COLOR = "#E0401C";

export const theme = {
  colors: {
    background: "#FBFAF7",
    paper: "#F3EEE2",
    floor: "#E4DFD3",
    ink: "#1B1815",
    yellow: "#FFD23F",
    accent: ACCENT_COLOR,
  },
  fonts: {
    anton: loadAnton().fontFamily,
    fraunces: loadFraunces('normal', { weights: ['400', '700', '800'], subsets: ['latin', 'vietnamese'], ignoreTooManyRequestsWarning: true }).fontFamily,
    beVietnamPro: loadBeVietnamPro('normal', { weights: ['400', '600', '700'], subsets: ['latin', 'vietnamese'], ignoreTooManyRequestsWarning: true }).fontFamily,
  },
} as const;

export type Theme = typeof theme;
