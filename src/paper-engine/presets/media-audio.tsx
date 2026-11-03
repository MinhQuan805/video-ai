import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, SHADOWS } from "../tokens";
import { getDynamicWaveform } from "../physics";

/**
 * 21. NLETimelineScrubber: Timeline dựng phim đa tầng với đầu đọc Playhead quét qua
 */
export const NLETimelineScrubber: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const playheadX = ((frame * 3) % 360) + 40;

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "16px 20px", width: 460, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}`, position: "relative" }}>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13, marginBottom: 12 }}>Trình Dựng NLE Đa Track</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
        {/* Playhead */}
        <div style={{ position: "absolute", top: -8, bottom: -8, left: playheadX, width: 2, backgroundColor: "#EF4444", zIndex: 10 }}>
          <div style={{ position: "absolute", top: 0, left: -4, width: 10, height: 8, backgroundColor: "#EF4444", borderRadius: 2 }} />
        </div>
        {/* Track 1 */}
        <div style={{ height: 26, backgroundColor: COLORS.terracotta, borderRadius: 6, width: "70%" }} />
        {/* Track 2 */}
        <div style={{ height: 26, backgroundColor: "#0A84FF", borderRadius: 6, width: "90%" }} />
        {/* Track 3 Audio */}
        <div style={{ height: 32, backgroundColor: "#E2AA2D", borderRadius: 6, display: "flex", alignItems: "center", padding: "0 8px", gap: 3, overflow: "hidden" }}>
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} style={{ width: 3, height: getDynamicWaveform(frame, i, 36, 6, 24), backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 1.5 }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * 22. AudioWaveformPlayer: Máy phát âm thanh với sóng nhạc nhảy nhót
 */
export const AudioWaveformPlayer: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 22, padding: "16px 22px", width: 450, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}`, display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: COLORS.terracotta, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
        ▶
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTS.inter, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
          <span>whoosh-impact.wav</span>
          <span style={{ fontFamily: FONTS.mono, color: COLORS.inkMuted }}>0:03 / 0:12</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2.5, height: 26 }}>
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: getDynamicWaveform(frame, i, 32, 4, 24), backgroundColor: i < 18 ? COLORS.terracotta : "#DDD", borderRadius: 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * 23. AudiogramCard: Vòng tròn Audiogram sóng âm lan tỏa
 */
export const AudiogramCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "20px", width: 440, textAlign: "center", boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ fontFamily: FONTS.frauncesItalic, fontStyle: "italic", fontSize: 20, color: COLORS.inkPrimary, marginBottom: 14 }}>
        &quot;Thiết kế mượt mà là chìa khóa giữ chân người xem.&quot;
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, height: 36 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{ width: 4, height: getDynamicWaveform(frame, i, 24, 6, 32), backgroundColor: COLORS.terracotta, borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
};

/**
 * 24. VideoSpeedRamp: Đồ thị đường cong tăng tốc video (Speed Ramp)
 */
export const VideoSpeedRamp: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 20px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13 }}>Speed Ramping (Bezier Curve)</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 700 }}>1.0x &rarr; 3.5x &rarr; 0.8x</span>
      </div>
      <svg width="100%" height={60} viewBox="0 0 380 60">
        <path d="M 0 50 C 120 50, 160 10, 220 10 S 300 45, 380 45" fill="none" stroke={COLORS.terracotta} strokeWidth={3} />
        <circle cx={220} cy={10} r={5} fill={COLORS.terracotta} />
      </svg>
    </div>
  );
};

/**
 * 25. CameraFocusBox: Khung ngắm máy quay REC với 4 góc lấy nét
 */
export const CameraFocusBox: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const isRec = Math.floor(frame / 15) % 2 === 0;
  return (
    <div style={{ width: 400, height: 220, border: "2px dashed rgba(29,28,26,0.2)", borderRadius: 16, position: "relative", padding: 14, boxSizing: "border-box" }}>
      <div style={{ position: "absolute", top: 10, left: 14, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#EF4444", opacity: isRec ? 1 : 0.2 }} />
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800, color: "#EF4444" }}>REC 4K 60FPS</span>
      </div>
      {/* 4 góc ngắm */}
      <div style={{ position: "absolute", top: 8, left: 8, width: 14, height: 14, borderTop: "3px solid #1A1A1A", borderLeft: "3px solid #1A1A1A" }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: 14, height: 14, borderTop: "3px solid #1A1A1A", borderRight: "3px solid #1A1A1A" }} />
      <div style={{ position: "absolute", bottom: 8, left: 8, width: 14, height: 14, borderBottom: "3px solid #1A1A1A", borderLeft: "3px solid #1A1A1A" }} />
      <div style={{ position: "absolute", bottom: 8, right: 8, width: 14, height: 14, borderBottom: "3px solid #1A1A1A", borderRight: "3px solid #1A1A1A" }} />
      {/* Tâm ngắm */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 24, height: 24, border: "1.5px solid rgba(29,28,26,0.4)", borderRadius: "50%" }} />
    </div>
  );
};

/**
 * 26. SoundEffectCallout: Nhãn âm thanh bay vào kèm sóng âm
 */
export const SoundEffectCallout: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#FFFFFF", borderRadius: 20, padding: "8px 16px", boxShadow: SHADOWS.card, border: `1.5px solid ${COLORS.terracotta}` }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.terracotta }} />
      <span style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 800, color: COLORS.inkPrimary }}>whoosh.wav</span>
    </div>
  );
};

/**
 * 27. VideoCutdownMatrix: Khung định dạng tỷ lệ 16:9 so với 9:16
 */
export const VideoCutdownMatrix: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 20px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}`, display: "flex", gap: 16, alignItems: "center" }}>
      <div style={{ width: 90, height: 140, border: `2px solid ${COLORS.terracotta}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.terracottaLight }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800, color: COLORS.terracotta }}>9:16 Reel</span>
      </div>
      <div style={{ width: 140, height: 80, border: "2px solid #888", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F7F5EE" }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: COLORS.inkMuted }}>16:9 Wide</span>
      </div>
    </div>
  );
};

/**
 * 28. LowerThirdChyron: Dải băng tên nhân vật phong cách đài truyền hình
 */
export const LowerThirdChyron: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderLeft: `5px solid ${COLORS.terracotta}`, borderRadius: "0 14px 14px 0", padding: "12px 20px", boxShadow: SHADOWS.card, display: "inline-block" }}>
      <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 16, color: COLORS.inkPrimary }}>MINH QUÂN</div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.terracotta, fontWeight: 700 }}>AI Video Motion Engineer</div>
    </div>
  );
};

/**
 * 29. SpeechTranscriptSync: Dòng chữ chạy bám sát âm thanh
 */
export const SpeechTranscriptSync: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const words = ["Chuyển", "động", "mượt", "mà", "như", "Apple"];
  const activeIdx = Math.min(words.length - 1, Math.floor(frame / 12));

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {words.map((w, i) => (
        <span key={i} style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 20, color: i === activeIdx ? COLORS.terracotta : COLORS.inkPrimary, transform: i === activeIdx ? "scale(1.15)" : "scale(1)", transition: "all 0.1s" }}>
          {w}
        </span>
      ))}
    </div>
  );
};

/**
 * 30. MediaThumbnailStack: Xếp tầng 3 hình thu nhỏ xòe quạt
 */
export const MediaThumbnailStack: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ position: "relative", width: 220, height: 160, margin: "0 auto" }}>
      <div style={{ position: "absolute", width: 140, height: 100, backgroundColor: "#EAE6DE", borderRadius: 12, transform: "rotate(-10deg)", boxShadow: SHADOWS.subtle }} />
      <div style={{ position: "absolute", width: 140, height: 100, backgroundColor: "#D5BA86", borderRadius: 12, transform: "rotate(6deg)", boxShadow: SHADOWS.subtle, left: 20, top: 10 }} />
      <div style={{ position: "absolute", width: 140, height: 100, backgroundColor: "#FFFFFF", borderRadius: 12, transform: "rotate(-2deg)", boxShadow: SHADOWS.card, left: 40, top: 20, border: `1.5px solid ${COLORS.terracotta}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
        
      </div>
    </div>
  );
};
