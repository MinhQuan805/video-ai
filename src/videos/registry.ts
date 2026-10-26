import { DarwinVideo } from "./vox/darwin";
import { RankingVideo } from "./ranking/10-23-26";
import { CrmRankingVideo } from "./ranking/10-25-26";
import { PaperVideo1026 } from "./paper/2026-10-26-ai-agent-4-buoc";
import { VideoProjectConfig } from "../types";

/**
 * Danh mục đăng ký các dự án video độc lập trong hệ thống.
 * Mỗi video có một thư mục riêng biệt tại:
 * 1. src/videos/<genre>/<video-id>/ (Chứa mã nguồn React, scenes, captions của video)
 * 2. videos/<genre>/<video-id>/ (Chứa kịch bản, âm thanh wav, assets và file kết quả)
 */
export const videoProjects: Record<string, VideoProjectConfig> = {
  "paper-10-26-26": {
    id: "paper-10-26-26",
    title: "Tự tạo AI Agent chỉ với 4 bước (Paper Editorial)",
    durationInFrames: 472,
    fps: 30,
    width: 1080,
    height: 1920,
    component: PaperVideo1026,
  },
  "paper-2026-10-26-ai-agent-4-buoc": {
    id: "paper-2026-10-26-ai-agent-4-buoc",
    title: "Tự tạo AI Agent chỉ với 4 bước (Paper Editorial)",
    durationInFrames: 472,
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
export const ACTIVE_VIDEO_ID = "paper-2026-10-26-ai-agent-4-buoc";

export const getActiveVideo = (): VideoProjectConfig => {
  return videoProjects[ACTIVE_VIDEO_ID] || videoProjects["darwin"];
};
