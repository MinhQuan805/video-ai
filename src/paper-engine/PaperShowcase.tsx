import React from "react";
import { Series } from "remotion";
import {
  PaperCanvas,
  PaperEyebrow,
  EditorialHeadline,
  AppTile,
  SearchBar,
  SegmentedBar,
  PromptPillCard,
  KineticSubtitles,
  PhoneMockup,
  HubAndSpoke,
  ApprovalStamp,
  VideoEditorTimeline,
  VerticalPipeline,
  TaskObserverEye,
  TradingChartCard,
  ManilaFolder,
  CodeEditorWindow,
} from "./index";

/**
 * Cảnh 1: Tìm kiếm & Khởi đầu (Tái tạo 100% video mẫu 5)
 */
const Scene1Search: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <PaperEyebrow stepNumber={1} label="AI Agent" delay={0} />

        <EditorialHeadline
          markdownText="Lên Google, *tìm kiếm*"
          fontSize={68}
          delay={2}
          style={{ marginBottom: 60 }}
        />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 50 }}>
          <SearchBar
            searchText="Claude desktop"
            placeholder="Tìm kiếm..."
            delay={5}
            typewriterDelayOffset={8}
          />
        </div>

        {/* Companion App Tiles */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          <AppTile brand="claude" size={84} delay={8} />
          <AppTile brand="chatgpt" size={84} delay={11} />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "hoặc" },
              { text: "ChatGPT", isHighlighted: true },
              { text: "desktop" },
            ]}
            delay={4}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 2: Trình dựng Video Timeline NLE & Claude (Tái tạo 100% video mẫu 5)
 */
const Scene2VideoTimeline: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <PaperEyebrow stepNumber={2} label="Remotion" delay={0} />

        <EditorialHeadline
          primaryText="Edit video"
          accentText="bằng AI"
          fontSize={68}
          delay={2}
          style={{ marginBottom: 60 }}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <VideoEditorTimeline width={480} height={190} delay={4} />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "edit" },
              { text: "video" },
              { text: "bằng", isHighlighted: true },
              { text: "AI", isHighlighted: true },
            ]}
            delay={6}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 3: Hub & Spoke Mạng liên kết Robot & 4 Công cụ (Tái tạo 100% video mẫu 6)
 */
const Scene3HubAndSpoke: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "110px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <PaperEyebrow stepNumber={2} label="Kết nối" delay={0} />

        <EditorialHeadline
          primaryText="Nối với"
          accentText="công cụ"
          fontSize={66}
          delay={2}
          style={{ marginBottom: 30 }}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <HubAndSpoke
            hubBrand="robot"
            hubSize={90}
            activeSatelliteIndex={0}
            width={480}
            height={360}
            satellites={[
              { brand: "gmail", label: "Gmail", x: 40, y: 30, isActive: true },
              { brand: "calendar", label: "Lịch", x: 350, y: 30 },
              { brand: "drive", label: "Drive", x: 40, y: 240 },
              { brand: "notion", label: "Notion", x: 350, y: 240 },
            ]}
          />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "công" },
              { text: "cụ" },
              { text: "nó", isHighlighted: true },
              { text: "cần" },
            ]}
            delay={4}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 4: Con dấu đóng cộp Approval Stamp "Duyệt" (Tái tạo 100% video mẫu 6)
 */
const Scene4ApprovalStamp: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <PaperEyebrow label="KẾT NỐI" delay={0} />

        <EditorialHeadline
          primaryText="Soạn sẵn,"
          accentText="chờ duyệt"
          fontSize={66}
          delay={2}
          style={{ marginBottom: 60 }}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <ApprovalStamp
            stampText="Duyệt"
            angle={-7}
            delay={7}
            width={460}
            height={220}
          />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "duyệt", isHighlighted: true },
              { text: "và" },
              { text: "gửi" },
            ]}
            delay={5}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 5: iPhone Mockup & ChatGPT (Tái tạo 100% video mẫu 3 & 8)
 */
const Scene5PhoneMockup: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "100px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <SegmentedBar
            totalSegments={3}
            activeSegments={2}
            width={120}
            height={26}
            delay={0}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ backgroundColor: "#FFFFFF", padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
              ✓ What you told it
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PhoneMockup
            width={280}
            height={520}
            preset="chatgpt"
            promptText="What have you figured out about me that I never directly told you?"
            delay={3}
          />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 120 }}>
          <KineticSubtitles
            words={[
              { text: "AND" },
              { text: "WHAT", isHighlighted: true },
            ]}
            delay={4}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 6: Biểu đồ Giao dịch Nến & Target Reticle (Tái tạo 100% video mẫu 1)
 */
const Scene6TradingChart: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "110px 50px 0 50px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <SegmentedBar
            totalSegments={5}
            activeSegments={3}
            width={440}
            height={32}
            delay={0}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <TradingChartCard width={480} height={280} delay={3} />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "a" },
              { text: "stock", isHighlighted: true },
            ]}
            delay={3}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 7: Đường ray Tiến trình Dọc Vertical Pipeline (Tái tạo 100% video mẫu 9)
 */
const Scene7Pipeline: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "110px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <PaperEyebrow stepNumber={4} label="Agent Skills" delay={0} />

        <EditorialHeadline
          primaryText="Khâu nào,"
          accentText="skill nấy"
          fontSize={66}
          delay={2}
          style={{ marginBottom: 30 }}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <VerticalPipeline
            steps={[
              { label: "Plan", sublabel: "Lập kế hoạch" },
              { label: "Build", sublabel: "Xây dựng" },
              { label: "Test", sublabel: "Kiểm thử" },
              { label: "Ship", sublabel: "Phát hành" },
            ]}
            activeStepIndex={0}
            delay={4}
            width={340}
            height={320}
          />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "cho" },
              { text: "lập", isHighlighted: true },
              { text: "kế" },
              { text: "hoạch" },
            ]}
            delay={4}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 8: Con mắt Quan sát & Lệnh Terminal (Tái tạo 100% video mẫu 7)
 */
const Scene8ObserverEye: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "110px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <PaperEyebrow label="TASK OBSERVER" delay={0} />

        <EditorialHeadline
          primaryText="Âm thầm xem,"
          accentText="thuộc gu bạn"
          fontSize={64}
          delay={2}
          style={{ marginBottom: 40 }}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TaskObserverEye
            tasks={["> edit api.ts", "> npm test", "> git commit"]}
            badgeText="✓ gu của bạn"
            delay={4}
            width={460}
          />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "của" },
              { text: "bạn", isHighlighted: true },
            ]}
            delay={4}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 9: Tập hồ sơ Kraft Manila & Prompt Cards (Tái tạo 100% video mẫu 3)
 */
const Scene9ManilaFolder: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "110px 60px 0 60px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <ManilaFolder labelPrefix="FILE:" labelMain="YOU" delay={2} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <PromptPillCard
            step={1}
            tag="PROMPT 1"
            promptText="List everything you've stored"
            delay={6}
          />
          <PromptPillCard
            step={2}
            tag="PROMPT 2"
            promptText="What have you figured out?"
            delay={9}
          />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "LET", isHighlighted: true },
            ]}
            delay={4}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Cảnh 10: Cửa sổ soạn thảo Code Editor HyperFrames (Tái tạo 100% video mẫu 2)
 */
const Scene10CodeEditor: React.FC = () => {
  return (
    <PaperCanvas>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 50px 0 50px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <CodeEditorWindow
            width={480}
            height={280}
            title="HyperFrames Studio • my reel"
            stickerBadge="MY REEL"
            delay={3}
          />
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 140 }}>
          <KineticSubtitles
            words={[
              { text: "every", isHighlighted: true },
            ]}
            delay={3}
          />
        </div>
      </div>
    </PaperCanvas>
  );
};

/**
 * Master PaperShowcase: Tổng hợp toàn bộ 10 cảnh chuẩn vàng từ 9 video mẫu tham khảo.
 */
export const PaperShowcase: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={75}>
        <Scene1Search />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene2VideoTimeline />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene3HubAndSpoke />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene4ApprovalStamp />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene5PhoneMockup />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene6TradingChart />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene7Pipeline />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene8ObserverEye />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene9ManilaFolder />
      </Series.Sequence>
      <Series.Sequence durationInFrames={75}>
        <Scene10CodeEditor />
      </Series.Sequence>
    </Series>
  );
};
