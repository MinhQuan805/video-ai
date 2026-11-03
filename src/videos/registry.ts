import { DarwinVideo } from "./vox/darwin";
import { RankingVideo } from "./ranking/10-23-26";
import { CrmRankingVideo } from "./ranking/10-25-26";
import { PaperVideo1026 } from "./paper/26-10-26-ai-agent-4-buoc";
import { PaperVideo0211 } from "./paper/02-11-26";
import { PaperVideo0311 } from "./paper/03-11-26";
import { VideoProjectConfig } from "../types";

/**
 * Danh mục đăng ký các dự án video độc lập trong hệ thống.
 * Mỗi video có một thư mục riêng biệt tại:
 * 1. src/videos/<genre>/<video-id>/ (Chứa mã nguồn React, scenes, captions của video)
 * 2. videos/<genre>/<video-id>/ (Chứa kịch bản, âm thanh wav, assets và file kết quả)
 */
export const videoProjects: Record<string, VideoProjectConfig> = {
  "paper-2026-11-03": {
    id: "paper-2026-11-03",
    title: "1 Khách Hàng 1 Hồ Sơ: Thảnh thơi nghỉ ngơi",
    durationInFrames: 1322,
    fps: 30,
    width: 1080,
    height: 1920,
    component: PaperVideo0311,
  },
  "paper-2026-11-02": {
    id: "paper-2026-11-02",
    title: "Tạm biệt AI-Slop: Dùng Apple Design Skill",
    durationInFrames: 1535,
    fps: 30,
    width: 1080,
    height: 1920,
    component: PaperVideo0211,
  },
  "paper-10-26-26": {
    id: "paper-10-26-26",
    title: "Tự tạo AI Agent chỉ với 4 bước (Paper Editorial)",
    durationInFrames: 1565,
    fps: 30,
    width: 1080,
    height: 1920,
    component: PaperVideo1026,
  },
  "paper-2026-10-26-ai-agent-4-buoc": {
    id: "paper-2026-10-26-ai-agent-4-buoc",
    title: "Tự tạo AI Agent chỉ với 4 bước (Paper Editorial)",
    durationInFrames: 1565,
    fps: 30,
    width: 1080,
    height: 1920,
    component: PaperVideo1026,
  },
  "ranking-10-25-26": {
    id: "ranking-10-25-26",
    title: "Xếp hạng công cụ quản lý khách hàng",
    durationInFrames: 907,
    fps: 30,
    width: 1080,
    height: 1920,
    component: CrmRankingVideo,
  },
  darwin: {
    id: "darwin",
    title: "Chuyến tàu Beagle của Charles Darwin",
    durationInFrames: 855,
    fps: 30,
    width: 1080,
    height: 1920,
    component: DarwinVideo,
  },
  ranking: {
    id: "ranking",
    title: "Xếp hạng cách kiếm khách hàng online",
    durationInFrames: 1081,
    fps: 30,
    width: 1080,
    height: 1920,
    component: RankingVideo,
  },
};

// Video mặc định đang được kích hoạt biên tập
export const ACTIVE_VIDEO_ID = "paper-2026-11-03";

export const getActiveVideo = (): VideoProjectConfig => {
  return videoProjects[ACTIVE_VIDEO_ID] || videoProjects["darwin"];
};
