import React from "react";
import { COLORS, FONTS, SHADOWS } from "../tokens";
import { HubAndSpoke } from "../components/HubAndSpoke";
import { VerticalPipeline } from "../components/VerticalPipeline";
import { ApprovalStamp } from "../components/ApprovalStamp";
import { TaskObserverEye } from "../components/TaskObserverEye";

/**
 * 41. HubAndSpokeIntegration: Mạng liên kết 4 công cụ xoay quanh Robot
 */
export const HubAndSpokeIntegration: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <HubAndSpoke width={460} height={340} delay={delay} />
    </div>
  );
};

/**
 * 42. VerticalRoadmapRail: Đường ray 4 bước tự động hóa
 */
export const VerticalRoadmapRail: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <VerticalPipeline width={340} height={320} delay={delay} />
    </div>
  );
};

/**
 * 43. HorizontalStepWizard: Thanh tiến trình 3 bước ngang
 */
export const HorizontalStepWizard: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  const steps = ["1. Phân tích", "2. Dựng Motion", "3. Xuất 60fps"];
  return (
    <div style={{ display: "flex", gap: 12, width: 460 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ flex: 1, backgroundColor: i <= 1 ? COLORS.terracottaLight : "#F7F5EE", border: i <= 1 ? `1.5px solid ${COLORS.terracotta}` : "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
          <span style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 12, color: i <= 1 ? COLORS.terracotta : COLORS.inkMuted }}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );
};

/**
 * 44. KnowledgeGraphCluster: Đồ thị tri thức chùm sao
 */
export const KnowledgeGraphCluster: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#181716", borderRadius: 20, padding: "20px", width: 440, height: 200, position: "relative", boxShadow: SHADOWS.card }}>
      <svg width="100%" height="100%" viewBox="0 0 400 160">
        <line x1={80} y1={80} x2={200} y2={40} stroke="rgba(255,255,255,0.3)" />
        <line x1={80} y1={80} x2={200} y2={120} stroke="rgba(255,255,255,0.3)" />
        <line x1={200} y1={40} x2={320} y2={80} stroke={COLORS.terracotta} strokeWidth={2} />
        <line x1={200} y1={120} x2={320} y2={80} stroke="rgba(255,255,255,0.3)" />
        {/* Nodes */}
        <circle cx={80} cy={80} r={12} fill="#3B82F6" />
        <circle cx={200} cy={40} r={10} fill="#10B981" />
        <circle cx={200} cy={120} r={10} fill="#F59E0B" />
        <circle cx={320} cy={80} r={16} fill={COLORS.terracotta} />
      </svg>
    </div>
  );
};

/**
 * 45. KanbanTaskShift: Bảng Kanban dịch chuyển thẻ
 */
export const KanbanTaskShift: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", gap: 10, width: 460 }}>
      {["Todo (0)", "In Progress (1)", "Done (4)"].map((col, i) => (
        <div key={i} style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, padding: "12px 10px", border: `1px solid ${COLORS.cardBorder}`, boxShadow: SHADOWS.subtle }}>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 11, color: COLORS.inkMuted, marginBottom: 8 }}>{col}</div>
          {i === 1 && (
            <div style={{ backgroundColor: COLORS.terracottaLight, border: `1.5px solid ${COLORS.terracotta}`, borderRadius: 8, padding: "8px", fontSize: 11, fontFamily: FONTS.inter, fontWeight: 700, color: COLORS.terracotta }}>
              100 motion graphics
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * 46. BranchingDecisionTree: Cây quyết định rẽ nhánh logic
 */
export const BranchingDecisionTree: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px 20px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <span style={{ backgroundColor: COLORS.terracottaLight, border: `1.5px solid ${COLORS.terracotta}`, borderRadius: 10, padding: "6px 14px", fontFamily: FONTS.inter, fontWeight: 800, fontSize: 12, color: COLORS.terracotta }}>
          Motion có bị đơ không?
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 11 }}>Có &rarr; Sửa Spring Physics</span>
        <span style={{ color: COLORS.terminalGreen, fontWeight: 800, fontSize: 11 }}>Không &rarr; Xuất bản ngay</span>
      </div>
    </div>
  );
};

/**
 * 47. CircuitBoardTrace: Đường mạch điện tử bằng đồng trên nền giấy
 */
export const CircuitBoardTrace: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FAF8F5", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "16px", width: 440, height: 110 }}>
      <svg width="100%" height="100%" viewBox="0 0 400 80">
        <path d="M 20 40 H 120 L 160 15 H 280 L 320 40 H 380" fill="none" stroke={COLORS.terracotta} strokeWidth={2.5} />
        <circle cx={20} cy={40} r={4} fill={COLORS.terracotta} />
        <circle cx={160} cy={15} r={4} fill={COLORS.terracotta} />
        <circle cx={380} cy={40} r={4} fill={COLORS.terracotta} />
      </svg>
    </div>
  );
};

/**
 * 48. TaskObserverEyeList: Con mắt theo dõi tiến trình
 */
export const TaskObserverEyeList: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TaskObserverEye width={460} delay={delay} />
    </div>
  );
};

/**
 * 49. ApprovalStampDocument: Tài liệu đóng dấu "Duyệt"
 */
export const ApprovalStampDocument: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ApprovalStamp width={460} height={220} delay={delay} />
    </div>
  );
};

/**
 * 50. PriorityMatrix: Ma trận ưu tiên 2x2
 */
export const PriorityMatrix: React.FC<{ delay?: number }> = ({ delay = 2 }) => {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: "16px", width: 440, boxShadow: SHADOWS.card, border: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ backgroundColor: COLORS.terracottaLight, border: `1.5px solid ${COLORS.terracotta}`, borderRadius: 10, padding: "12px", textAlign: "center" }}>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 800, fontSize: 12, color: COLORS.terracotta }}> Ưu tiên cao nhất</div>
          <div style={{ fontSize: 10, color: COLORS.inkMuted }}>Motion mượt mà</div>
        </div>
        <div style={{ backgroundColor: "#F7F5EE", borderRadius: 10, padding: "12px", textAlign: "center" }}>
          <div style={{ fontFamily: FONTS.inter, fontWeight: 700, fontSize: 12 }}>Ủy quyền</div>
          <div style={{ fontSize: 10, color: COLORS.inkMuted }}>Tạo kịch bản thô</div>
        </div>
      </div>
    </div>
  );
};
