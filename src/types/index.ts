export interface CaptionWord {
  w: string;
  s: number;
  e: number;
}

export interface CaptionPhrase {
  id: number | string;
  text: string;
  startFrame: number;
  endFrame: number;
  words: CaptionWord[];
}

export interface CaptionsPayload {
  phrases: CaptionPhrase[];
}

export interface KeyframeEvent {
  frame: number;
  event: string;
}

export interface SceneConfig {
  scene: number;
  from: number;
  to: number;
  type: string;
  description?: string;
  text?: string;
  image?: string;
  keyframes?: KeyframeEvent[];
}

export interface ScenesData {
  visual_system?: string;
  scenes: SceneConfig[];
}

export interface VideoProjectConfig {
  id: string;
  title: string;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  component: React.FC;
}
