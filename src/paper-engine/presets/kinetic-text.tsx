import React from "react";
import { COLORS, FONTS, SHADOWS } from "../tokens";
import { EditorialHeadline } from "../components/EditorialHeadline";
import { KineticSubtitles } from "../components/KineticSubtitles";
import { SearchBar } from "../components/SearchBar";
import { SegmentedBar } from "../components/SegmentedBar";
import { MouseCursor } from "../components/MouseCursor";

/**
 * 61. EditorialHeadlineHero: Tiêu đề báo chí 2 dòng chuẩn vàng
 */
export const EditorialHeadlineHero: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <EditorialHeadline markdownText="Thiết kế chuẩn, *dùng luôn*" fontSize={64} delay={delay} />
  );
};

/**
 * 62. KaraokeSubtitleBar: Phụ đề Karaoke từ nối tiếp từ
 */
export const KaraokeSubtitleBar: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <KineticSubtitles
      words={[
        { text: "hoặc" },
        { text: "ChatGPT", isHighlighted: true },
        { text: "desktop" },
      ]}
      delay={delay}
    />
  );
};

/**
 * 63. TypewriterTerminal: Gõ lệnh từng chữ trong Terminal
 */
export const TypewriterTerminal: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#181716", borderRadius: 14, padding: "12px 18px", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: SHADOWS.card }}>
      <span style={{ color: COLORS.terminalGreen, fontWeight: 900 }}>&gt;</span>
      <span style={{ fontFamily: FONTS.mono, color: "#FFFFFF", fontSize: 13 }}>npx remotion preview</span>
      <span style={{ color: COLORS.terracotta, fontWeight: 800 }}>|</span>
    </div>
  );
};

/**
 * 64. WordStaggerReveal: Từng chữ rơi vào so le domino
 */
export const WordStaggerReveal: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {["Mượt", "Mà", "Dứt", "Khoát"].map((w, i) => (
        <span key={i} style={{ fontFamily: FONTS.frauncesItalic, fontStyle: "italic", fontSize: 28, fontWeight: 800, color: i === 2 ? COLORS.terracotta : COLORS.inkPrimary }}>
          {w}
        </span>
      ))}
    </div>
  );
};

/**
 * 65. CounterOdometer: Bộ đếm số tự động tăng
 */
export const CounterOdometer: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <span style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 54, color: COLORS.terracotta }}>99.9%</span>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.inkMuted, marginTop: 4 }}>TỶ LỆ KHỚP CHUẨN BENCHMARK</div>
    </div>
  );
};

/**
 * 66. SearchPillTypewriter: Thanh tìm kiếm hình viên thuốc
 */
export const SearchPillTypewriter: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SearchBar searchText="Remotion Motion Engine" delay={delay} />
    </div>
  );
};

/**
 * 67. SegmentedTabSlider: Thanh chuyển Tab trượt
 */
export const SegmentedTabSlider: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SegmentedBar totalSegments={5} activeSegments={3} width={380} height={32} delay={delay} />
    </div>
  );
};

/**
 * 68. TagPillCluster: Cụm tag phân loại trôi nổi
 */
export const TagPillCluster: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", width: 440 }}>
      {["#Remotion", "#MotionGraphics", "#PaperDesign", "#60fps", "#NoSlop"].map((t, i) => (
        <span key={i} style={{ backgroundColor: i === 0 ? COLORS.terracottaLight : "#FFFFFF", color: i === 0 ? COLORS.terracotta : COLORS.inkPrimary, border: i === 0 ? `1.5px solid ${COLORS.terracotta}` : `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: "6px 14px", fontFamily: FONTS.inter, fontWeight: 700, fontSize: 12, boxShadow: SHADOWS.subtle }}>
          {t}
        </span>
      ))}
    </div>
  );
};

/**
 * 69. TargetReticlePing: Điểm ngắm mục tiêu tỏa sóng
 */
export const TargetReticlePing: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ width: 60, height: 60, borderRadius: "50%", border: `3px solid ${COLORS.terracotta}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", position: "relative" }}>
      <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
    </div>
  );
};

/**
 * 70. MouseClickInteraction: Con trỏ chuột lướt vào click
 */
export const MouseClickInteraction: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ width: 300, height: 140, position: "relative", backgroundColor: "#FFFFFF", borderRadius: 16, border: `1px solid ${COLORS.cardBorder}`, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button style={{ backgroundColor: COLORS.terracotta, color: "#FFFFFF", border: "none", borderRadius: 10, padding: "10px 22px", fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
        Click duyệt video
      </button>
      <MouseCursor startFrame={delay} durationFrames={20} startPoint={{ x: 260, y: 120 }} targetPoint={{ x: 150, y: 70 }} />
    </div>
  );
};
