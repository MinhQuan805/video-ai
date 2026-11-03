import { FaIcon } from "../../shared/FaIcon";
import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, SHADOWS } from "../tokens";
import { PhoneMockup } from "../components/PhoneMockup";
import { BrowserWindow } from "../components/BrowserWindow";

/**
 * 31. IPhoneChatGPTApp: Khung iPhone chạy app ChatGPT
 */
export const IPhoneChatGPTApp: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PhoneMockup width={280} height={520} preset="chatgpt" promptText="Làm sao để motion graphics mượt mà như video benchmark?" delay={delay} />
    </div>
  );
};

/**
 * 32. IPhoneCalTracker: Khung iPhone chạy CalTracker
 */
export const IPhoneCalTracker: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PhoneMockup width={280} height={520} preset="caltracker" delay={delay} />
    </div>
  );
};

/**
 * 33. MacBrowserPreview: Trình duyệt Desktop xem trước Localhost
 */
export const MacBrowserPreview: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BrowserWindow width={460} height={320} url="http://localhost:3000/reel" delay={delay}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}><FaIcon icon="bolt" size={24} color={COLORS.terracotta} /></div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 16 }}>Remotion Dev Server</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terminalGreen }}>Ready on port 3000</div>
        </div>
      </BrowserWindow>
    </div>
  );
};

/**
 * 34. MacFinderDragDrop: Kéo thả file vào thư mục
 */
export const MacFinderDragDrop: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const fileX = Math.min(160, (frame - delay) * 4);

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 20px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.trafficRed }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.trafficYellow }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.trafficGreen }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative", height: 70 }}>
        {/* File đang bị kéo */}
        <div style={{ position: "absolute", left: fileX, top: 10, backgroundColor: COLORS.terracottaLight, border: `1.5px solid ${COLORS.terracotta}`, borderRadius: 10, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, zIndex: 10 }}>
          <FaIcon icon="file" size={14} color={COLORS.inkMuted} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700 }}>render.mp4</span>
        </div>
        {/* Thư mục đích */}
        <div style={{ position: "absolute", right: 20, top: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaIcon icon="folder" size={32} color="#F59E0B" />
          <span style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700 }}>output/</span>
        </div>
      </div>
    </div>
  );
};

/**
 * 35. HyperFramesCodeEditor: Trình soạn code có số dòng
 */
export const HyperFramesCodeEditor: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#181716", borderRadius: 18, padding: "16px 20px", width: 450, boxShadow: SHADOWS.card, color: "#FFF", fontFamily: FONTS.mono, fontSize: 12 }}>
      <div style={{ color: "#8E8D8A", marginBottom: 10 }}>// remotion.config.ts</div>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ color: "#666", userSelect: "none" }}>1<br />2<br />3</div>
        <div>
          <span style={{ color: "#0A84FF" }}>export const</span> config = &#123;<br />
          &nbsp;&nbsp;fps: <span style={{ color: COLORS.terracotta }}>60</span>,<br />
          &nbsp;&nbsp;smoothing: <span style={{ color: COLORS.terminalGreen }}>&quot;critically-damped&quot;</span><br />
          &#125;;
        </div>
      </div>
    </div>
  );
};

/**
 * 36. TerminalStreamingLogs: Dòng log Terminal cuộn lên liên tục
 */
export const TerminalStreamingLogs: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#141312", borderRadius: 16, padding: "16px 20px", width: 450, fontFamily: FONTS.mono, fontSize: 12, boxShadow: SHADOWS.card }}>
      <div style={{ color: COLORS.terminalGreen, marginBottom: 4 }}> Bundle built in 142ms</div>
      <div style={{ color: "#A8A29E", marginBottom: 4 }}>[ffmpeg] Transcribing word-level timestamps...</div>
      <div style={{ color: COLORS.terracotta }}>[remotion] Rendered 100/100 frames at 60fps</div>
    </div>
  );
};

/**
 * 37. DynamicIslandNotification: Đảo tương tác Dynamic Island thả thông báo
 */
export const DynamicIslandNotification: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#000000", color: "#FFFFFF", borderRadius: 28, padding: "10px 20px", display: "inline-flex", alignItems: "center", gap: 14, boxShadow: SHADOWS.card }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: COLORS.terracotta, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
        
      </div>
      <div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 12 }}>Video AI Rendered</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: "#A8A29E" }}>Ready to publish to TikTok</div>
      </div>
    </div>
  );
};

/**
 * 38. MacDockInteractive: Thanh Dock macOS bo góc dưới
 */
export const MacDockInteractive: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", borderRadius: 22, padding: "8px 14px", display: "inline-flex", gap: 10, border: "1px solid rgba(255,255,255,0.5)", boxShadow: SHADOWS.card }}>
      {["Finder", "Safari", "Terminal", "Remotion", "Notion"].map((name, i) => (
        <div key={i} style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#EFECE3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: SHADOWS.subtle }}>
          <FaIcon icon={i === 0 ? "folder" : i === 1 ? "compass" : i === 2 ? "terminal" : i === 3 ? "video" : "file"} size={16} color={COLORS.inkPrimary} />
        </div>
      ))}
    </div>
  );
};

/**
 * 39. NotificationBanner: Thông báo Banner đẩy góc trên
 */
export const NotificationBanner: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "12px 18px", width: 400, display: "flex", alignItems: "center", gap: 12, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: COLORS.terracotta, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
        
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13 }}>New Benchmark Found</div>
        <div style={{ fontFamily: FONTS.inter, fontSize: 11, color: COLORS.inkMuted }}>100 motion graphics loaded successfully</div>
      </div>
    </div>
  );
};

/**
 * 40. SpotlightSearch: Thanh tìm kiếm Spotlight Command+Space
 */
export const SpotlightSearch: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px 20px", width: 440, boxShadow: SHADOWS.card, border: `1.5px solid ${COLORS.terracotta}`, display: "flex", alignItems: "center", gap: 12 }}>
      <FaIcon icon="search" size={16} color={COLORS.inkMuted} />
      <span style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 600, color: COLORS.inkPrimary }}>paper-engine/components</span>
      <span style={{ color: COLORS.terracotta, fontWeight: 800 }}>|</span>
    </div>
  );
};
