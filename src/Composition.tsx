import React from "react";
import { Composition } from "remotion";
import { getActiveVideo } from "./videos/registry";

/**
 * VideoComponent - Bộ điều phối video toàn cục.
 * Tự động kết nối đến dự án video đang được kích hoạt trong registry.
 */
export const VideoComponent: React.FC = () => {
  const active = getActiveVideo();
  const Component = active.component;
  return <Component />;
};

export const VideoComposition: React.FC = () => {
  const active = getActiveVideo();
  return (
    <Composition
      id="Video"
      component={VideoComponent}
      durationInFrames={active.durationInFrames}
      fps={active.fps}
      width={active.width}
      height={active.height}
    />
  );
};

export default VideoComposition;
