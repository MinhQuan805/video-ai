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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video chính theo cấu hình active hiện tại */}
      <VideoComposition />
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
