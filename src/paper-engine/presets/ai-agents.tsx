import { FaIcon } from "../../shared/FaIcon";
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance, getTypewriter, getTargetPulse } from "../physics";
import { AppTile } from "../components/AppTile";

/**
 * 1. ClaudePromptFlow: Hộp nhập lệnh -> Đang suy nghĩ -> Thẻ kết quả
 */
export const ClaudePromptFlow: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const typewriter = getTypewriter("Tạo kịch bản video TikTok 60 giây", frame, delay + 6, 1.2);
  const showThinking = frame > delay + 35;
  const showResult = frame > delay + 50;

  const resultEntrance = getSmoothEntrance({
    frame,
    delay: delay + 50,
    config: SPRING_PRESETS.snappy,
    distanceY: 20,
    enableIdleFloat: true,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 480 }}>
      {/* Input box */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 20px", boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <AppTile brand="claude" size={28} delay={0} />
          <span style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 13 }}>Claude 3.5 Sonnet</span>
        </div>
        <div style={{ fontFamily: FONTS.inter, fontSize: 14, color: COLORS.inkPrimary }}>
          {typewriter.displayedText}
          <span style={{ color: COLORS.terracotta, fontWeight: 800 }}>|</span>
        </div>
      </div>

      {/* Thinking pill */}
      {showThinking && !showResult && (
        <div style={{ alignSelf: "flex-start", backgroundColor: COLORS.terracottaLight, borderRadius: 20, padding: "6px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12 }}></span>
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: COLORS.terracotta }}>Thinking for 3s...</span>
        </div>
      )}

      {/* Result card */}
      {showResult && (
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "18px 20px", boxShadow: SHADOWS.card, border: `1.5px solid ${COLORS.terracotta}`, transform: `translateY(${resultEntrance.translateY}px) scale(${resultEntrance.scale})`, opacity: resultEntrance.opacity }}>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 13, color: COLORS.terracotta, marginBottom: 6 }}>KỊCH BẢN ĐÃ TẠO</div>
          <div style={{ fontFamily: FONTS.inter, fontSize: 13, color: COLORS.inkPrimary, lineHeight: 1.5 }}>
            [0-3s] Hook: Tại sao 90% AI video bị đơ?<br />
            [4-15s] Nguyên nhân do Spring Physics sai...
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 2. MultiAgentHandoff: Bàn giao tác vụ giữa 3 Agent (Planner -> Coder -> QA)
 */
export const MultiAgentHandoff: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const activeAgent = Math.min(2, Math.floor(Math.max(0, frame - delay) / 25));

  const agents = [
    { name: "Planner", role: "Lập dàn ý", brand: "notion" as const },
    { name: "Coder", role: "Viết Remotion", brand: "claude" as const },
    { name: "Reviewer", role: "Kiểm tra mượt", brand: "robot" as const },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, width: 480, justifyContent: "center" }}>
      {agents.map((ag, i) => {
        const isActive = i === activeAgent;
        const isDone = i < activeAgent;
        const pulse = getTargetPulse(frame, delay + i * 25, 20);

        return (
          <React.Fragment key={i}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative" }}>
              {isActive && (
                <div style={{ position: "absolute", top: -8, width: 96, height: 96, borderRadius: 28, border: `2px solid ${COLORS.terracotta}`, transform: `scale(${pulse.scale})`, opacity: pulse.opacity, pointerEvents: "none" }} />
              )}
              <AppTile brand={ag.brand} size={80} delay={delay + i * 4} isActive={isActive} />
              <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 12, color: isActive ? COLORS.terracotta : COLORS.inkPrimary }}>{ag.name}</span>
              <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: isDone ? COLORS.terminalGreen : COLORS.inkMuted }}>{isDone ? "Đã xong" : ag.role}</span>
            </div>
            {i < 2 && (
              <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}><FaIcon icon="arrow-right" size={14} color={i < activeAgent ? COLORS.terracotta : "rgba(0,0,0,0.2)"} /></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/**
 * 3. ToolCallExecution: Agent gọi công cụ Terminal / Bash
 */
export const ToolCallExecution: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const isExecuting = frame > delay + 10 && frame < delay + 45;
  const isDone = frame >= delay + 45;
  const spinnerAngle = (frame * 12) % 360;

  return (
    <div style={{ backgroundColor: "#1C1B1A", borderRadius: 16, padding: "16px 20px", width: 460, boxShadow: SHADOWS.card }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaIcon icon="gear" size={13} color="#FFFFFF" />
          <span style={{ fontFamily: FONTS.mono, color: "#FFFFFF", fontWeight: 700, fontSize: 13 }}>Tool: read_file</span>
        </div>
        {isExecuting && (
          <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #555", borderTopColor: COLORS.terracotta, transform: `rotate(${spinnerAngle}deg)` }} />
        )}
        {isDone && <span style={{ color: COLORS.terminalGreen, fontWeight: 900, fontSize: 12 }}>COMPLETED</span>}
      </div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: "#8E8D8A" }}>
        Path: &quot;videos/paper/sample/5.mp4&quot;<br />
        {isDone && <span style={{ color: "#D1D0CB" }}>&gt; Extracted 100 motion keyframes (100% matched)</span>}
      </div>
    </div>
  );
};

/**
 * 4. ModelComparisonCard: So sánh 3 mô hình Claude vs GPT vs Gemini
 */
export const ModelComparisonCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", gap: 12, width: 480 }}>
      {[
        { brand: "claude" as const, name: "Claude 3.5", score: "96.4%", label: "Code & Motion", win: true },
        { brand: "chatgpt" as const, name: "GPT-4o", score: "88.2%", label: "Reasoning" },
        { brand: "gemini" as const, name: "Gemini 1.5", score: "89.0%", label: "Multimodal" },
      ].map((m, i) => (
        <div key={i} style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: "14px 10px", textAlign: "center", border: m.win ? `2px solid ${COLORS.terracotta}` : `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.card }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <AppTile brand={m.brand} size={54} delay={delay + i * 3} isActive={m.win} />
          </div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 12 }}>{m.name}</div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 18, color: m.win ? COLORS.terracotta : COLORS.inkPrimary, margin: "4px 0" }}>{m.score}</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.inkMuted }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
};

/**
 * 5. TokenStreamerCard: Tốc độ nhả chữ Token/giây
 */
export const TokenStreamerCard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const tokens = Math.min(1840, Math.round(interpolate(frame - delay, [0, 60], [0, 1840], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "18px 24px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted, fontWeight: 700, letterSpacing: "1px" }}>STREAMING SPEED</div>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 900, fontSize: 36, color: COLORS.inkPrimary }}>{tokens.toLocaleString()} <span style={{ fontSize: 16, color: COLORS.terracotta, fontWeight: 700 }}>t/s</span></div>
      </div>
      <div style={{ backgroundColor: COLORS.terracottaLight, border: `1.5px solid ${COLORS.terracotta}`, borderRadius: 12, padding: "8px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 14 }}>Turbo</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 9, fontWeight: 700, color: COLORS.terracotta }}>Latency: 18ms</div>
      </div>
    </div>
  );
};

/**
 * 6. AgentMemoryBank: Khay lưu trữ phiên bộ nhớ Claude-Mem
 */
export const AgentMemoryBank: React.FC<{ delay?: number }> = () => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "18px 22px", width: 460, border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.card }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaIcon icon="microchip" size={14} color={COLORS.terracotta} />
          <span style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>Claude Memory Bank</span>
        </div>
        <span style={{ backgroundColor: "#EAE6DE", borderRadius: 8, padding: "3px 8px", fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700 }}>ACTIVE</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {["Phiên 1: UI Spec", "Phiên 2: Physics", "Phiên 3: Assets"].map((s, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: i === 1 ? COLORS.terracottaLight : "#F7F5EE", border: i === 1 ? `1.5px solid ${COLORS.terracotta}` : "1px solid rgba(0,0,0,0.06)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: i === 1 ? COLORS.terracotta : COLORS.inkPrimary }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 7. CodeDiffReview: Xem thay đổi Git Diff đỏ/xanh
 */
export const CodeDiffReview: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#181716", borderRadius: 16, padding: "16px 20px", width: 460, boxShadow: SHADOWS.card, fontFamily: FONTS.mono, fontSize: 12 }}>
      <div style={{ color: "#8E8D8A", borderBottom: "1px solid #333", paddingBottom: 8, marginBottom: 8 }}>diff --git a/motion.ts b/motion.ts</div>
      <div style={{ color: "#EF4444", backgroundColor: "rgba(239,68,68,0.12)", padding: "2px 6px", borderRadius: 4 }}>- damping: 10, stiffness: 100 (AI slow)</div>
      <div style={{ color: "#10B981", backgroundColor: "rgba(16,185,129,0.12)", padding: "2px 6px", borderRadius: 4, marginTop: 4 }}>+ damping: 22, stiffness: 220 (Critically Damped)</div>
    </div>
  );
};

/**
 * 8. AgentSkillCard: Thẻ kỹ năng Agent mở rộng
 */
export const AgentSkillCard: React.FC<{ delay?: number }> = () => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 20px", width: 440, border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.terracotta, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}><FaIcon icon="bolt" size={20} color="#FFFFFF" /></div>
        <div>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 15 }}>Autonomous Evolution</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted }}>Tự nâng cấp skill & asset</div>
        </div>
      </div>
      <div style={{ backgroundColor: COLORS.terracottaLight, color: COLORS.terracotta, border: `1px solid ${COLORS.terracotta}`, borderRadius: 20, padding: "4px 12px", fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700 }}>
        v2.4
      </div>
    </div>
  );
};

/**
 * 9. PromptOptimizer: So sánh Prompt trước & sau khi tối ưu
 */
export const PromptOptimizer: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 460 }}>
      <div style={{ backgroundColor: "#F7F5EE", borderRadius: 12, padding: "12px 16px", border: "1px dashed rgba(0,0,0,0.15)" }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.inkMuted, fontWeight: 700 }}>TRƯỚC (Vague):</span>
        <div style={{ fontFamily: FONTS.inter, fontSize: 13, color: COLORS.inkSecondary, marginTop: 4 }}>&quot;Hãy làm video đẹp và mượt cho tôi.&quot;</div>
      </div>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 12, padding: "14px 16px", border: `2px solid ${COLORS.terracotta}`, boxShadow: SHADOWS.card }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.terracotta, fontWeight: 800 }}>SAU KHI TỐI ƯU (Structured):</span>
        <div style={{ fontFamily: FONTS.inter, fontSize: 13, color: COLORS.inkPrimary, fontWeight: 600, marginTop: 4 }}>
          &quot;Áp dụng Fraunces Editorial Serif + Spring Damping 22 + Stagger 3 frames + Terracotta #C85228.&quot;
        </div>
      </div>
    </div>
  );
};

/**
 * 10. OmniRouteSwitcher: Bộ định tuyến chuyển luồng AI khi cạn Quota
 */
export const OmniRouteSwitcher: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const frame = useCurrentFrame();
  const isFallback = frame > delay + 25;

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "16px 20px", width: 460, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 14 }}>OmniRoute AI Failover</div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10, backgroundColor: isFallback ? "#FEF3C7" : "#D1FAE5", color: isFallback ? "#D97706" : "#059669", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>
          {isFallback ? "REROUTED" : "OPTIMAL"}
        </span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: isFallback ? "#F3F4F6" : COLORS.terracottaLight, border: isFallback ? "1px solid #E5E7EB" : `1.5px solid ${COLORS.terracotta}` }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: isFallback ? "#9CA3AF" : COLORS.terracotta }}>Claude: {isFallback ? "Cạn Quota 429" : "Hoạt động"}</div>
        </div>
        <div style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: isFallback ? "#EFF6FF" : "#F3F4F6", border: isFallback ? "1.5px solid #3B82F6" : "1px solid #E5E7EB" }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: isFallback ? "#2563EB" : "#9CA3AF" }}>Gemini: {isFallback ? "Tiếp quản 100%" : "Chờ dự phòng"}</div>
        </div>
      </div>
    </div>
  );
};
