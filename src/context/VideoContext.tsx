import React, { createContext, useContext } from "react";
import { CaptionsPayload, ScenesData } from "../types";

export interface VideoContextValue {
  videoId?: string;
  captions?: CaptionsPayload;
  scenesData?: ScenesData;
}

const VideoContext = createContext<VideoContextValue>({});

export const VideoProvider: React.FC<{
  value: VideoContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
