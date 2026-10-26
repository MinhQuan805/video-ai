import React from "react";
import scenesData from "../../../../videos/vox/darwin/scenes.json";
import { DarwinCutoutVideo } from "./DarwinCutoutVideo";
import { DarwinPaperVideo } from "./DarwinPaperVideo";

export * from "./DarwinCutoutVideo";
export * from "./DarwinPaperVideo";

/**
 * DarwinVideo component - Tự động chọn phong cách theo trường "visual_system" trong scenes.json
 */
export const DarwinVideo: React.FC = () => {
  const isPaper = (scenesData as { visual_system?: string }).visual_system === "paper";
  return isPaper ? <DarwinPaperVideo /> : <DarwinCutoutVideo />;
};

export default DarwinVideo;
