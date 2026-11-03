import React from "react";
import { Sequence, useCurrentFrame, interpolate } from "remotion";
import { PaperCanvas, PaperEyebrow, COLORS, FONTS } from "../index";
import { FaIcon } from "../../shared/FaIcon";

// Import all preset components
import {
  GoogleSerpCard,
  GoogleSearchConsoleDashboard,
  PageSpeedGauge,
  MetaAdPreview,
  MetaAdsManagerStats,
  AdCreativeSplitTest,
  MarketingFunnel,
  KeywordRankTracker,
  MrrGrowthTicker,
  LeadGenerationCrmCard,
  BacklinkAuthorityTree,
  SiteAuditHealthScore,
  SerpHeatmapClickMap,
  SchemaMarkupRichSnippet,
  AdFrequencyFatigueMeter,
  LookalikeAudienceExpander,
  ScrollStopHookRateMeter,
  CohortRetentionMatrix,
  NetPromoterScoreGauge,
  SalesPipelineStageMove,
  PaymentGatewayCheckout,
  PricingTierMatrix,
} from "../presets/marketing-seo-business";

import {
  ViralRetentionGraph,
  FollowerGrowthOdometer,
  ContentCalendarScheduler,
  EngagementRateRadar,
  CrossPlatformDistributor,
  CommentSentimentAnalysis,
  UgcVsBrandSplitter,
  BurnRateRunwayClock,
  CartAbandonmentRecovery,
  CustomerLifetimeValueTier,
} from "../presets/social-and-creative";

import {
  AccordionFaqUnfold,
  CardSwipeTinder,
  ScratchCardReveal,
  PerforatedCouponTear,
  RotatingWheelFortune,
  SliderBeforeAfterComparison,
  WaxSealLetter,
  StickyNotePeel,
  NewspaperHeadline,
  TextHighlighterSwipe,
  PriceStrikeThrough,
  BadgeStickerSlam,
  PaperBinderClip,
  TornPaperReveal,
} from "../presets/paper-editorial";

import {
  AudioWaveformPlayer,
  VideoSpeedRamp,
  CameraFocusBox,
  SoundEffectCallout,
  VideoCutdownMatrix,
  LowerThirdChyron,
} from "../presets/media-audio";

import { VideoEditorTimeline } from "../components/VideoEditorTimeline";

import {
  LiveCandlestickCard,
  MonteCarloSimulator,
  SparklineScanner,
  DonutCalorieGauge,
  BigNumberCounter,
  CryptoPriceTicker,
  BarChartRaceCard,
  BalanceSheetCard,
} from "../presets/finance-charts";

import {
  IPhoneChatGPTApp,
  IPhoneCalTracker,
  MacBrowserPreview,
  MacFinderDragDrop,
  TerminalStreamingLogs,
  DynamicIslandNotification,
  MacDockInteractive,
  SpotlightSearch,
} from "../presets/macos-devices";

import {
  HubAndSpokeIntegration,
  VerticalRoadmapRail,
  HorizontalStepWizard,
  KnowledgeGraphCluster,
  KanbanTaskShift,
  BranchingDecisionTree,
  CircuitBoardTrace,
  PriorityMatrix,
} from "../presets/workflows-nodes";

import {
  EditorialHeadlineHero,
  KaraokeSubtitleBar,
  TypewriterTerminal,
  WordStaggerReveal,
  CounterOdometer,
  SearchPillTypewriter,
  TargetReticlePing,
  MouseClickInteraction,
} from "../presets/kinetic-text";

import {
  ClaudePromptFlow,
  MultiAgentHandoff,
  ToolCallExecution,
  ModelComparisonCard,
  TokenStreamerCard,
  AgentMemoryBank,
  CodeDiffReview,
  OmniRouteSwitcher,
} from "../presets/ai-agents";

import {
  AppTile,
  ApprovalStamp,
  TaskObserverEye,
  ManilaFolder,
  PaperHangtag,
  SceneOmniRouteReroute,
  SceneRobotDataFeeder,
  SceneFanningAppStoreDeck,
  SceneMacFinderFileAudit,
  SceneRobotMailClassifier,
  SceneScissorsPaperCut,
  ScenePolaroidAddyOsmani,
  ScenePacmanCostEater,
  SceneChairSwivelUpgrade,
  SceneMagnetLeadAttractor,
  ScenePushPullLeverSwitch,
  SceneStarRatingDropBounce,
  SceneTornPaperZipReveal,
  SceneGoogleSearchPill,
  SceneDynamicIslandExpand,
  SceneBrowserAddressBar,
  SceneVoiceWaveformPulse,
  SceneBookPageFlip,
} from "../index";

interface ShowcaseSlideProps {
  index: number;
  total: number;
  name: string;
  category: string;
  desc: string;
  children: React.ReactNode;
}

const ShowcaseSlide: React.FC<ShowcaseSlideProps> = ({
  index,
  total,
  name,
  category,
  desc,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, 82, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(frame * 0.08) * 6;
  const floatRot = Math.sin(frame * 0.04) * 0.35;

  return (
    <PaperCanvas backgroundColor={COLORS.bgPaper}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "110px 60px 90px 60px",
          boxSizing: "border-box",
          opacity,
          justifyContent: "space-between",
        }}
      >
        {/* Top Header Badge */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <PaperEyebrow stepNumber={index} label={`${category.toUpperCase()} • ${index}/${total}`} delay={0} />
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 800,
                color: COLORS.terracotta,
                backgroundColor: COLORS.terracottaLight,
                padding: "6px 14px",
                borderRadius: 8,
                border: `1px solid ${COLORS.terracottaGlow}`,
              }}
            >
              HTML DESIGN SPEC
            </div>
          </div>

          {/* Component Name & Description */}
          <div
            style={{
              fontFamily: FONTS.frauncesNormal,
              fontSize: 48,
              fontWeight: 900,
              color: COLORS.inkPrimary,
              lineHeight: 1.15,
              letterSpacing: -0.6,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: FONTS.inter,
              fontSize: 16,
              fontWeight: 600,
              color: COLORS.inkSecondary,
              marginTop: 8,
              lineHeight: 1.4,
            }}
          >
            {desc}
          </div>
        </div>

        {/* Main Central Motion Stage: exact float & scale from HTML */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              transform: `scale(1.75) translateY(${floatY}px) rotate(${floatRot}deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </div>

        {/* Bottom Status Pill */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            padding: "14px 24px",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid rgba(29,28,26,0.08)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
          }}
        >
          <FaIcon icon="check" size={14} color="#059669" />
          <span style={{ fontFamily: FONTS.inter, fontSize: 15, fontWeight: 700, color: COLORS.inkPrimary }}>
            Chuẩn thiết kế HTML • <span style={{ color: COLORS.terracotta }}>Khớp 100% Review Dashboard</span>
          </span>
        </div>
      </div>
    </PaperCanvas>
  );
};

// ==========================================
// 1. SEO & Meta Ads Showcase (22 components)
// ==========================================
export const SeoAdsShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "GoogleSerpCard", desc: "Kết quả tìm kiếm Google chuẩn SEO với 5 sao và Rich Snippet", comp: <GoogleSerpCard /> },
    { name: "GoogleSearchConsoleDashboard", desc: "Bảng chỉ số Search Console 4 thẻ + biểu đồ sóng SVG", comp: <GoogleSearchConsoleDashboard /> },
    { name: "PageSpeedGauge", desc: "Vòng tròn đồng hồ xanh lá 99/100 và Core Web Vitals", comp: <PageSpeedGauge /> },
    { name: "MetaAdPreview", desc: "Mẫu quảng cáo Facebook/Instagram với logo Meta và CTA", comp: <MetaAdPreview /> },
    { name: "MetaAdsManagerStats", desc: "Bảng hiệu quả Meta Ads nhảy số ROAS 4.7x và chi phí thực", comp: <MetaAdsManagerStats /> },
    { name: "AdCreativeSplitTest", desc: "A/B Testing so sánh mẫu ảnh tĩnh vs Paper Motion +280% CTR", comp: <AdCreativeSplitTest /> },
    { name: "MarketingFunnel", desc: "Phễu chuyển đổi 4 tầng Awareness -> Consideration -> Purchase", comp: <MarketingFunnel /> },
    { name: "KeywordRankTracker", desc: "Theo dõi thứ hạng từ khóa SEO top 1 kèm biến động tăng", comp: <KeywordRankTracker /> },
    { name: "MrrGrowthTicker", desc: "Bộ đếm doanh thu định kỳ MRR $48,500/mo kèm Churn 0.6%", comp: <MrrGrowthTicker /> },
    { name: "LeadGenerationCrmCard", desc: "Thẻ chốt khách hàng tiềm năng CRM HubSpot với lịch hẹn", comp: <LeadGenerationCrmCard /> },
    { name: "BacklinkAuthorityTree", desc: "Cây liên kết ngược DR 82 truyền dòng chảy Link Juice", comp: <BacklinkAuthorityTree /> },
    { name: "SiteAuditHealthScore", desc: "Kiểm tra kỹ thuật SEO 100% sức khỏe, 0 lỗi 404", comp: <SiteAuditHealthScore /> },
    { name: "SerpHeatmapClickMap", desc: "Bản đồ nhiệt nhấp chuột SERP tập trung 68% vào Top 1", comp: <SerpHeatmapClickMap /> },
    { name: "SchemaMarkupRichSnippet", desc: "Cấu trúc FAQ Rich Snippet hiển thị dưới kết quả", comp: <SchemaMarkupRichSnippet /> },
    { name: "AdFrequencyFatigueMeter", desc: "Đo tần suất bão hòa quảng cáo 3.8x tự động xoay creative", comp: <AdFrequencyFatigueMeter /> },
    { name: "LookalikeAudienceExpander", desc: "Mở rộng tệp đối tượng Lookalike 1% -> 5% tiếp cận 450K khách", comp: <LookalikeAudienceExpander /> },
    { name: "ScrollStopHookRateMeter", desc: "Tỷ lệ dừng cuộn 3 giây đầu 68% Hook Rate vượt trội", comp: <ScrollStopHookRateMeter /> },
    { name: "CohortRetentionMatrix", desc: "Ma trận giữ chân khách hàng 12 tháng duy trì 83%", comp: <CohortRetentionMatrix /> },
    { name: "NetPromoterScoreGauge", desc: "Chỉ số độ hài lòng NPS +78 chuẩn Top 2% thế giới", comp: <NetPromoterScoreGauge /> },
    { name: "SalesPipelineStageMove", desc: "Quy trình bán hàng hợp đồng $12K di chuyển Closed Won", comp: <SalesPipelineStageMove /> },
    { name: "PaymentGatewayCheckout", desc: "Cổng thanh toán tự động quét thẻ tín dụng thành công", comp: <PaymentGatewayCheckout /> },
    { name: "PricingTierMatrix", desc: "Bảng báo giá 3 gói dịch vụ với gói Pro nổi bật", comp: <PricingTierMatrix /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="SEO & Meta Ads" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 2. Media, Video & Audio Showcase (7 components)
// ==========================================
export const MediaAudioShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "VideoEditorTimeline", desc: "Bàn dựng NLE đa track với kim đọc Playhead đỏ quét mượt mà", comp: <VideoEditorTimeline delay={2} /> },
    { name: "AudioWaveformPlayer", desc: "Máy phát âm thanh với 32 cột sóng dao động theo nhịp giọng", comp: <AudioWaveformPlayer /> },
    { name: "VideoSpeedRamp", desc: "Đồ thị đường cong gia tốc Bezier từ 1.0x lên 3.5x rồi về 0.8x", comp: <VideoSpeedRamp /> },
    { name: "CameraFocusBox", desc: "Khung ngắm máy quay 4K 60FPS nhấp nháy đèn REC đỏ và tâm ngắm", comp: <CameraFocusBox /> },
    { name: "SoundEffectCallout", desc: "Bong bóng hiệu ứng âm thanh Whoosh! phát sóng nảy xúc giác", comp: <SoundEffectCallout /> },
    { name: "VideoCutdownMatrix", desc: "Khung định dạng so sánh tỷ lệ an toàn 9:16 và 16:9", comp: <VideoCutdownMatrix /> },
    { name: "LowerThirdChyron", desc: "Dải băng tên nhân vật truyền hình trượt ngang sang trọng", comp: <LowerThirdChyron /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="Media & Audio" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 3. Tactile Paper Metaphors (14 components)
// ==========================================
export const TactilePaperShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "AccordionFaqUnfold", desc: "Thẻ Accordion mở rộng nội dung với mũi tên xoay 180 độ", comp: <AccordionFaqUnfold /> },
    { name: "CardSwipeTinder", desc: "Thao tác vuốt thẻ trái phải đóng dấu Approved xanh lá", comp: <CardSwipeTinder /> },
    { name: "ScratchCardReveal", desc: "Thẻ cào tráng bạc cào dần lộ mã ưu đãi 50%", comp: <ScratchCardReveal /> },
    { name: "PerforatedCouponTear", desc: "Phiếu giảm giá đường đục lỗ xé rời nảy xúc giác", comp: <PerforatedCouponTear /> },
    { name: "RotatingWheelFortune", desc: "Vòng quay may mắn 8 ô quà tặng quay và dừng trúng giải", comp: <RotatingWheelFortune /> },
    { name: "SliderBeforeAfterComparison", desc: "Thanh trượt vách ngăn so sánh trước và sau", comp: <SliderBeforeAfterComparison /> },
    { name: "WaxSealLetter", desc: "Phong bì cổ điển đóng dấu sáp son đỏ uy tín", comp: <WaxSealLetter /> },
    { name: "StickyNotePeel", desc: "Giấy ghi chú Post-it vàng ấm bóc cong góc tự nhiên", comp: <StickyNotePeel /> },
    { name: "NewspaperHeadline", desc: "Tiêu đề trang nhất báo in phong cách vintage", comp: <NewspaperHeadline /> },
    { name: "TextHighlighterSwipe", desc: "Vệt bút dạ quang quét ngang làm nổi bật từ khóa", comp: <TextHighlighterSwipe /> },
    { name: "PriceStrikeThrough", desc: "Đường kẻ đỏ gạch ngang giá cũ và giá mới nhảy số", comp: <PriceStrikeThrough /> },
    { name: "BadgeStickerSlam", desc: "Huy hiệu nhãn dán răng cưa rơi xuống đập nảy lò xo", comp: <BadgeStickerSlam /> },
    { name: "PaperBinderClip", desc: "Kẹp bướm kim loại kẹp giữ mép tập tài liệu", comp: <PaperBinderClip /> },
    { name: "TornPaperReveal", desc: "Mép giấy xé rách lộ thông điệp ẩn bên dưới", comp: <TornPaperReveal /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="Tactile Paper" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 4. Viral Social & Growth (10 components)
// ==========================================
export const SocialGrowthShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "ViralRetentionGraph", desc: "Đường cong giữ chân khán giả Shorts/TikTok 95%", comp: <ViralRetentionGraph /> },
    { name: "FollowerGrowthOdometer", desc: "Bộ đếm nhảy số 100K Follower nhận nút bạc YouTube", comp: <FollowerGrowthOdometer /> },
    { name: "ContentCalendarScheduler", desc: "Lịch đăng 7 ngày tự động theo các khung giờ vàng", comp: <ContentCalendarScheduler /> },
    { name: "EngagementRateRadar", desc: "Biểu đồ ngũ giác 5 trục đo tương tác Top 1% Creator", comp: <EngagementRateRadar /> },
    { name: "CrossPlatformDistributor", desc: "Phân phối 1 video gốc sang 9:16, 16:9, 1:1, 4:5", comp: <CrossPlatformDistributor /> },
    { name: "CommentSentimentAnalysis", desc: "Phân tích cảm xúc bình luận 94% tích cực", comp: <CommentSentimentAnalysis /> },
    { name: "UgcVsBrandSplitter", desc: "Đối chiếu độ tin cậy UGC 89% so với tự quảng cáo 28%", comp: <UgcVsBrandSplitter /> },
    { name: "BurnRateRunwayClock", desc: "Đồng hồ đếm ngược Runway an toàn dòng tiền 28 tháng", comp: <BurnRateRunwayClock /> },
    { name: "CartAbandonmentRecovery", desc: "Tự động gửi voucher cứu giỏ hàng thành công +$8,400", comp: <CartAbandonmentRecovery /> },
    { name: "CustomerLifetimeValueTier", desc: "Tháp phân hạng khách hàng VIP Platinum LTV", comp: <CustomerLifetimeValueTier /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="Viral Social" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 5. Finance & Charts Showcase (8 components)
// ==========================================
export const FinanceChartsShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "LiveCandlestickCard", desc: "Biểu đồ nến Nhật xanh đỏ dao động cập nhật giá", comp: <LiveCandlestickCard /> },
    { name: "MonteCarloSimulator", desc: "Mô phỏng xác suất Monte Carlo 10 kịch bản tương lai", comp: <MonteCarloSimulator /> },
    { name: "SparklineScanner", desc: "Biểu đồ xu hướng mini kèm tia quét laser đọc đỉnh", comp: <SparklineScanner /> },
    { name: "DonutCalorieGauge", desc: "Vòng tròn phân bổ 72% lợi nhuận cốt lõi", comp: <DonutCalorieGauge /> },
    { name: "BigNumberCounter", desc: "KPI lớn $248.5K kèm huy hiệu tăng trưởng +142%", comp: <BigNumberCounter /> },
    { name: "CryptoPriceTicker", desc: "Băng giá chạy bảng điện tử Ticker Tape vô tận", comp: <CryptoPriceTicker /> },
    { name: "BarChartRaceCard", desc: "Cuộc đua hoán đổi vị trí xếp hạng các thương hiệu", comp: <BarChartRaceCard /> },
    { name: "BalanceSheetCard", desc: "Bảng cân đối kế toán tài sản vượt trội so với nợ", comp: <BalanceSheetCard /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="Finance & Charts" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 6. macOS & Devices Showcase (8 components)
// ==========================================
export const DevicesShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "IPhoneChatGPTApp", desc: "Mô hình iPhone chạy ứng dụng AI Chat trò chuyện", comp: <IPhoneChatGPTApp /> },
    { name: "IPhoneCalTracker", desc: "3 vòng tròn hoạt động thể chất đóng kín mượt mà", comp: <IPhoneCalTracker /> },
    { name: "BrowserWindow", desc: "Cửa sổ trình duyệt Safari macOS với thanh URL và trang web", comp: <MacBrowserPreview /> },
    { name: "MacFinder", desc: "Trình quản lý tệp Finder kéo thả tài liệu vào thư mục", comp: <MacFinderDragDrop /> },
    { name: "MacTerminal", desc: "Cửa sổ dòng lệnh Terminal đen bóng render 60fps", comp: <TerminalStreamingLogs /> },
    { name: "DynamicIslandNotification", desc: "Viên thuốc Dynamic Island mở rộng hiển thị cuộc gọi", comp: <DynamicIslandNotification /> },
    { name: "MacDockInteractive", desc: "Thanh Dock macOS phóng to icon dạng parabol", comp: <MacDockInteractive /> },
    { name: "SpotlightSearch", desc: "Hộp tìm kiếm Spotlight gõ lệnh và xuất kết quả gợi ý", comp: <SpotlightSearch /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="macOS & Devices" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 7. Workflows & Pipelines Showcase (8 components)
// ==========================================
export const WorkflowsShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "HubAndSpoke", desc: "Bộ não trung tâm kết nối 6 công cụ truyền dữ liệu", comp: <HubAndSpokeIntegration /> },
    { name: "VerticalRoadmapRail", desc: "Đường ray cột mốc lộ trình thẳng đứng hoàn thành từng chặng", comp: <VerticalRoadmapRail /> },
    { name: "HorizontalStepWizard", desc: "Quy trình 4 bước tiến trình ngang tự động nối màu", comp: <HorizontalStepWizard /> },
    { name: "KnowledgeGraphCluster", desc: "Mạng lưới đồ thị tri thức đàn hồi tự cân bằng", comp: <KnowledgeGraphCluster /> },
    { name: "KanbanTaskShift", desc: "Thẻ nhiệm vụ nâng lên và chuyển sang cột Done", comp: <KanbanTaskShift /> },
    { name: "BranchingDecisionTree", desc: "Cây quyết định logic rẽ nhánh Đúng/Sai", comp: <BranchingDecisionTree /> },
    { name: "CircuitBoardTrace", desc: "Mạch điện tử phát xung cấp nguồn cho chip AI", comp: <CircuitBoardTrace /> },
    { name: "PriorityMatrix", desc: "Ma trận ưu tiên Eisenhower 4 ô khẩn cấp / quan trọng", comp: <PriorityMatrix /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="Workflows & Pipelines" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 8. Kinetic Typography Showcase (8 components)
// ==========================================
export const KineticTextShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "KineticSubtitles", desc: "Phụ đề karaoke động nhảy chữ màu đất nung nổi bật", comp: <KaraokeSubtitleBar /> },
    { name: "EditorialHeadline", desc: "Tiêu đề lớn báo chí phối chữ đứng và chữ nghiêng", comp: <EditorialHeadlineHero /> },
    { name: "TypewriterTerminal", desc: "Máy đánh chữ gõ phím kèm con trỏ nhấp nháy", comp: <TypewriterTerminal /> },
    { name: "WordStaggerReveal", desc: "Từng từ trong câu rơi xuống so le nhau tạo nhịp điệu", comp: <WordStaggerReveal /> },
    { name: "CounterOdometer", desc: "Trục lăn số nhảy Odometer cơ học cán mốc 99.8%", comp: <CounterOdometer /> },
    { name: "SearchPillTypewriter", desc: "Thanh tìm kiếm tự động gõ truy vấn xu hướng", comp: <SearchPillTypewriter /> },
    { name: "TargetReticlePing", desc: "Hồng tâm tròn định vị mục tiêu phát sóng radar", comp: <TargetReticlePing /> },
    { name: "MouseCursor", desc: "Con trỏ chuột lướt nhấp nảy sóng trên nút bấm", comp: <MouseClickInteraction /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="Kinetic Typography" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 9. AI Agents & Intelligence (8 components)
// ==========================================
export const AiAgentsShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "ClaudePromptFlow", desc: "Luồng prompt Claude 3.7 tư duy và xuất artifact", comp: <ClaudePromptFlow /> },
    { name: "MultiAgentHandoff", desc: "Chuyển giao nhiệm vụ Planner -> Coder bằng gói dữ liệu", comp: <MultiAgentHandoff /> },
    { name: "ToolCallExecution", desc: "Thực thi lệnh gọi hàm Tool Execution trả kết quả 200", comp: <ToolCallExecution /> },
    { name: "ModelComparisonCard", desc: "So sánh hiệu năng Claude 3.7 vs GPT-4.5 vs Gemini", comp: <ModelComparisonCard /> },
    { name: "TokenStreamerCard", desc: "Bộ đo tốc độ xuất chữ siêu tốc 134 tokens/giây", comp: <TokenStreamerCard /> },
    { name: "AgentMemoryBank", desc: "Ngân hàng bộ nhớ vector trích lục 98.4% ký ức dự án", comp: <AgentMemoryBank /> },
    { name: "CodeDiffReview", desc: "So sánh Code Diff dòng xanh thêm mới và dòng đỏ lược bỏ", comp: <CodeDiffReview /> },
    { name: "OmniRouteSwitcher", desc: "Bộ định tuyến thông minh chuyển đổi giữa Flash và Pro", comp: <OmniRouteSwitcher /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="AI Agents" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 10. Core Brand & Symbols (5 components)
// ==========================================
export const CoreBrandShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const items = [
    { name: "AppTile", desc: "Biểu tượng ứng dụng bo góc mềm Apple với logo Claude", comp: <AppTile brand="claude" size={96} delay={2} /> },
    { name: "ApprovalStamp", desc: "Con dấu cao su đóng chéo góc nảy lò xo mực đỏ loang", comp: <ApprovalStamp stampText="APPROVED" delay={2} /> },
    { name: "TaskObserverEye", desc: "Mắt cơ học quan sát tiến trình liếc mắt quét dữ liệu", comp: <TaskObserverEye delay={2} /> },
    { name: "ManilaFolder", desc: "Bìa kẹp hồ sơ giấy vàng ấm mở hé tài liệu bên trong", comp: <ManilaFolder labelMain="DỰ ÁN SEO & ADS" delay={2} /> },
    { name: "PaperHangtag", desc: "Mác giấy đục lỗ đung đưa theo con lắc vật lý", comp: <PaperHangtag text="PREMIUM 60FPS" delay={2} /> },
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ShowcaseSlide index={idx + 1} total={items.length} name={item.name} category="Core Brand" desc={item.desc}>
            {item.comp}
          </ShowcaseSlide>
        </Sequence>
      ))}
    </>
  );
};

import {
  SceneAuctionGavelSlam,
  SceneRamSnapping,
  SceneRailTrackSwitcher,
  SceneMechanicalToggleSwitch,
  ScenePressureGaugeOverload,
  SceneSlingshotLaunch,
  SceneBrassPadlockUnlock,
  SceneThermalReceiptPrinter,
} from "../presets/tech-business-physical-metaphors";

// ==========================================
// 11. Creative Physical Metaphors (Clone 100% Sample 5-9)
// ==========================================
export const PhysicalMetaphorsShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const scenes = [
    <SceneOmniRouteReroute />,
    <SceneRobotDataFeeder />,
    <SceneFanningAppStoreDeck />,
    <SceneMacFinderFileAudit />,
    <SceneRobotMailClassifier />,
    <SceneScissorsPaperCut />,
    <ScenePolaroidAddyOsmani />,
    <ScenePacmanCostEater />,
    <SceneChairSwivelUpgrade />,
    <SceneMagnetLeadAttractor />,
    <ScenePushPullLeverSwitch />,
    <SceneStarRatingDropBounce />,
    <SceneTornPaperZipReveal />,
    <SceneGoogleSearchPill />,
    <SceneDynamicIslandExpand />,
    <SceneBrowserAddressBar />,
    <SceneVoiceWaveformPulse />,
    <SceneBookPageFlip />,
  ];

  return (
    <>
      {scenes.map((scene, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          {scene}
        </Sequence>
      ))}
    </>
  );
};

// ==========================================
// 12. Tech & Business Physical Metaphors (Open-Floating, No White Cards)
// ==========================================
export const TechBusinessMetaphorsShowcase: React.FC = () => {
  const SLIDE_DURATION = 90;
  const scenes = [
    <SceneAuctionGavelSlam />,
    <SceneRamSnapping />,
    <SceneRailTrackSwitcher />,
    <SceneMechanicalToggleSwitch />,
    <ScenePressureGaugeOverload />,
    <SceneSlingshotLaunch />,
    <SceneBrassPadlockUnlock />,
    <SceneThermalReceiptPrinter />,
  ];

  return (
    <>
      {scenes.map((scene, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          {scene}
        </Sequence>
      ))}
    </>
  );
};



