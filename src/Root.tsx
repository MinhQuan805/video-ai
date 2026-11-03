import React from "react";
import { Composition, Folder } from "remotion";
import { VideoComposition } from "./Composition";
import { CutoutTest } from "./visual-systems/cutout-collage/CutoutTest";
import { TimelineTest } from "./visual-systems/cutout-collage/TimelineTest";
import { DarwinCutoutVideo } from "./videos/vox/darwin/DarwinCutoutVideo";
import { DarwinPaperVideo } from "./videos/vox/darwin/DarwinPaperVideo";
import { RankingVideo } from "./videos/ranking/10-23-26";
import { CrmRankingVideo } from "./videos/ranking/10-25-26";
import { ZaloScene } from "./videos/ranking/10-25-26/scenes/ZaloScene";
import { SheetScene } from "./videos/ranking/10-25-26/scenes/SheetScene";
import { HubSpotScene } from "./videos/ranking/10-25-26/scenes/HubSpotScene";
import { NotionScene } from "./videos/ranking/10-25-26/scenes/NotionScene";
import { OdooScene } from "./videos/ranking/10-25-26/scenes/OdooScene";
import { OutroScene } from "./videos/ranking/10-25-26/scenes/OutroScene";
import { PaperVideo1026 } from "./videos/paper/26-10-26-ai-agent-4-buoc";
import { PaperVideo1029 } from "./videos/paper/29-10-26";
import { PaperVideo0211 } from "./videos/paper/02-11-26";
import { PaperVideo0311 } from "./videos/paper/03-11-26";
import { PaperShowcase } from "./paper-engine/PaperShowcase";
import {
  MotionDev10Showcase,
  Scene01_AuctionGavelDeal,
  Scene02_ServerRamSnap,
  Scene03_IndustrialToggleSwitch,
  Scene04_PrecisionVernierCaliper,
  Scene05_ThermalReceiptPos,
  Scene06_PressureGaugeBoil,
  Scene07_VaultDoorUnlocking,
  Scene08_BrassPadlockAuth,
  Scene09_LeadMagnetHorseshoe,
  Scene10_SlingshotRocketLaunch,
} from "./paper-engine/motion-dev-showcase";
import {
  SeoAdsShowcase,
  MediaAudioShowcase,
  TactilePaperShowcase,
  SocialGrowthShowcase,
  FinanceChartsShowcase,
  DevicesShowcase,
  WorkflowsShowcase,
  KineticTextShowcase,
  AiAgentsShowcase,
  CoreBrandShowcase,
  PhysicalMetaphorsShowcase,
  TechBusinessMetaphorsShowcase,
} from "./paper-engine/gallery/CategoryShowcases";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ========================================================
          THƯ VIỆN PAPER MOTION GRAPHICS ENGINE (CHUYỂN ĐỘNG THẬT 60FPS)
         ======================================================== */}
      <Folder name="Paper-Engine-Library">
        {/* 1. Flagship Motion.dev Suite */}
        <Folder name="Motion-Dev-Flagship">
          <Composition
            id="motion-dev-all-10"
            component={MotionDev10Showcase}
            durationInFrames={900}
            fps={30}
            width={1080}
            height={1920}
          />
          <Folder name="10-Components-Single">
            <Composition
              id="01-gavel-deal"
              component={Scene01_AuctionGavelDeal}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="02-ram-snap"
              component={Scene02_ServerRamSnap}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="03-toggle-switch"
              component={Scene03_IndustrialToggleSwitch}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="04-vernier-caliper"
              component={Scene04_PrecisionVernierCaliper}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="05-receipt-pos"
              component={Scene05_ThermalReceiptPos}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="06-pressure-gauge"
              component={Scene06_PressureGaugeBoil}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="07-vault-door"
              component={Scene07_VaultDoorUnlocking}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="08-padlock-auth"
              component={Scene08_BrassPadlockAuth}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="09-lead-magnet"
              component={Scene09_LeadMagnetHorseshoe}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
            <Composition
              id="10-rocket-launch"
              component={Scene10_SlingshotRocketLaunch}
              durationInFrames={90}
              fps={30}
              width={1080}
              height={1920}
            />
          </Folder>
        </Folder>

        {/* 2. Business, Marketing & Finance */}
        <Folder name="Business-Marketing-Finance">
          <Composition
            id="paper-gallery-seo-ads"
            component={SeoAdsShowcase}
            durationInFrames={1980}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-social-growth"
            component={SocialGrowthShowcase}
            durationInFrames={900}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-finance-charts"
            component={FinanceChartsShowcase}
            durationInFrames={720}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-tech-business"
            component={TechBusinessMetaphorsShowcase}
            durationInFrames={720}
            fps={30}
            width={1080}
            height={1920}
          />
        </Folder>

        {/* 3. Tech, AI & Workflows */}
        <Folder name="Tech-AI-Workflows">
          <Composition
            id="paper-gallery-ai-agents"
            component={AiAgentsShowcase}
            durationInFrames={720}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-workflows"
            component={WorkflowsShowcase}
            durationInFrames={720}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-macos-devices"
            component={DevicesShowcase}
            durationInFrames={720}
            fps={30}
            width={1080}
            height={1920}
          />
        </Folder>

        {/* 4. Tactile Paper, Editorial & Motion */}
        <Folder name="Tactile-Editorial-Motion">
          <Composition
            id="paper-gallery-physical-metaphors"
            component={PhysicalMetaphorsShowcase}
            durationInFrames={1620}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-tactile-paper"
            component={TactilePaperShowcase}
            durationInFrames={1260}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-kinetic-text"
            component={KineticTextShowcase}
            durationInFrames={720}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-media-audio"
            component={MediaAudioShowcase}
            durationInFrames={630}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="paper-gallery-core-brand"
            component={CoreBrandShowcase}
            durationInFrames={450}
            fps={30}
            width={1080}
            height={1920}
          />
        </Folder>
      </Folder>

      {/* Showcase Thư viện Paper Motion Graphics Chuẩn */}
      <Composition
        id="paper-showcase"
        component={PaperShowcase}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Video chính theo cấu hình active hiện tại */}
      <VideoComposition />
      <Composition
        id="paper-2026-11-03"
        component={PaperVideo0311}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="paper-2026-11-02"
        component={PaperVideo0211}
        durationInFrames={1535}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="paper-2026-10-29"
        component={PaperVideo1029}
        durationInFrames={1319}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="paper-10-26-26"
        component={PaperVideo1026}
        durationInFrames={1565}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="paper-2026-10-26-ai-agent-4-buoc"
        component={PaperVideo1026}
        durationInFrames={1565}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="CRM-10-25-26">
        <Composition id="ranking-10-25-26" component={CrmRankingVideo} durationInFrames={907} fps={30} width={1080} height={1920} />
        <Composition id="crm-zalo" component={ZaloScene} durationInFrames={134} fps={30} width={1080} height={1920} />
        <Composition id="crm-sheet" component={SheetScene} durationInFrames={170} fps={30} width={1080} height={1920} />
        <Composition id="crm-hubspot" component={HubSpotScene} durationInFrames={159} fps={30} width={1080} height={1920} />
        <Composition id="crm-notion" component={NotionScene} durationInFrames={143} fps={30} width={1080} height={1920} />
        <Composition id="crm-odoo" component={OdooScene} durationInFrames={222} fps={30} width={1080} height={1920} />
        <Composition id="crm-outro" component={OutroScene} durationInFrames={79} fps={30} width={1080} height={1920} />
      </Folder>

      {/* Composition cho dự án Ranking Video */}
      <Composition
        id="ranking"
        component={RankingVideo}
        durationInFrames={1081}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Compositions riêng biệt cho từng dự án & hệ hình để xem trước độc lập */}
      <Composition
        id="darwin-cutout"
        component={DarwinCutoutVideo}
        durationInFrames={855}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="darwin-paper"
        component={DarwinPaperVideo}
        durationInFrames={855}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Các composition kiểm thử linh kiện dùng chung */}
      <Composition
        id="CutoutTest"
        component={CutoutTest}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TimelineTest"
        component={TimelineTest}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
