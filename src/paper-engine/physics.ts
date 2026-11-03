import { interpolate, spring, SpringConfig } from "remotion";
import { SPRING_PRESETS } from "./tokens";

export interface SmoothEntranceConfig {
  frame: number;
  fps?: number;
  delay?: number;
  config?: Partial<SpringConfig>;
  distanceY?: number;
  startScale?: number;
  startBlur?: number;
  enableBlur?: boolean;
  enableIdleFloat?: boolean;
  idleFloatSpeed?: number;
  idleFloatAmplitude?: number;
}

export interface SmoothEntranceResult {
  translateY: number;
  scale: number;
  opacity: number;
  filter: string;
  progress: number;
  idleRotate: number;
}

/**
 * Tính toán chuyển động xuất hiện "Chuẩn Apple / Minimalist Reel":
 * Kết hợp 3 chiều không gian: Translate Y + Scale + Opacity (Khóa Opacity sớm).
 * Tích hợp chế độ Idle Breathing (thở nhẹ tự nhiên) sau khi xuất hiện,
 * CHỐNG TRIỆT ĐỂ lỗi "lúc xuất hiện thì mượt, lúc sau đơ như tượng".
 */
export const getSmoothEntrance = ({
  frame,
  fps = 30,
  delay = 0,
  config = SPRING_PRESETS.snappy,
  distanceY = 24,
  startScale = 0.94,
  startBlur = 0,
  enableBlur = false,
  enableIdleFloat = true,
  idleFloatSpeed = 0.06,
  idleFloatAmplitude = 2.5,
}: SmoothEntranceConfig): SmoothEntranceResult => {
  const currentFrame = Math.max(0, frame - delay);

  const progress = spring({
    frame: currentFrame,
    fps,
    config,
  });

  const baseTranslateY = interpolate(progress, [0, 1], [distanceY, 0], {
    extrapolateRight: "clamp",
  });
  
  const scale = interpolate(progress, [0, 1], [startScale, 1], {
    extrapolateRight: "clamp",
  });
  
  // Opacity đạt 1 sớm hơn (khoảng progress = 0.65) để phần tử hiển thị sắc nét ngay từ đầu
  const opacity = interpolate(progress, [0, 0.65, 1], [0, 1, 1], {
    extrapolateRight: "clamp",
  });
  
  // Blur nhẹ chống giật chỉ khi enableBlur = true
  const blurVal = enableBlur && startBlur > 0
    ? interpolate(progress, [0, 0.7, 1], [startBlur, 0, 0], { extrapolateRight: "clamp" })
    : 0;

  // CHUYỂN ĐỘNG THỞ LIÊN TỤC (IDLE BREATHING / FLOATING):
  // Sau khi xuất hiện xong (progress > 0.9), phần tử tiếp tục bồng bềnh hữu cơ, không bao giờ bị đơ!
  let idleY = 0;
  let idleRotate = 0;
  if (enableIdleFloat && currentFrame > 10) {
    const floatTime = currentFrame - 10;
    const blendIn = Math.min(1, floatTime / 15);
    idleY = Math.sin(floatTime * idleFloatSpeed) * idleFloatAmplitude * blendIn;
    idleRotate = Math.sin(floatTime * idleFloatSpeed * 0.7) * 0.4 * blendIn;
  }

  return {
    translateY: baseTranslateY + idleY,
    scale,
    opacity,
    filter: blurVal > 0.1 ? `blur(${blurVal.toFixed(1)}px)` : "none",
    progress,
    idleRotate,
  };
};

/**
 * Hook dao động hữu cơ lơ lửng liên tục (Continuous Floating Breath)
 */
export const getIdleFloating = (
  frame: number,
  options: {
    speed?: number;
    amplitudeY?: number;
    amplitudeRotate?: number;
    phase?: number;
  } = {}
): { y: number; rotate: number; scale: number } => {
  const { speed = 0.05, amplitudeY = 3, amplitudeRotate = 0.5, phase = 0 } = options;
  const t = frame * speed + phase;
  const y = Math.sin(t) * amplitudeY;
  const rotate = Math.cos(t * 0.8) * amplitudeRotate;
  const scale = 1 + Math.sin(t * 1.2) * 0.008;
  return { y, rotate, scale };
};

/**
 * Phản hồi va đập (Impact Recoil):
 * Tạo rung chấn vật lý tức thì khi có vật thể nện xuống (như Con dấu đóng cộp, nhấp chuột mạnh).
 */
export const getImpactRecoil = (
  frame: number,
  impactFrame: number,
  amplitudeY = 5,
  decayFrames = 10
): { offsetY: number; scale: number } => {
  const t = frame - impactFrame;
  if (t < 0 || t > decayFrames) return { offsetY: 0, scale: 1 };
  
  const decay = 1 - t / decayFrames;
  const wave = Math.sin(t * 1.4) * decay;
  const offsetY = wave * amplitudeY;
  const scale = 1 + wave * 0.02;
  
  return { offsetY, scale };
};

/**
 * Mô phỏng con lắc vật lý tắt dần (Damped Harmonic Oscillator)
 * Kèm chuyển động đung đưa gió nhẹ liên tục sau khi tắt dần.
 */
export const getPendulumSwing = (
  frame: number,
  startFrame: number,
  initialAngleDeg = 16,
  frequency = 0.32,
  decay = 0.1
): number => {
  const t = frame - startFrame;
  if (t < 0) return 0;
  // Dao động tắt dần ban đầu
  const primarySwing = initialAngleDeg * Math.exp(-decay * t) * Math.cos(frequency * t);
  // Gió thoảng hữu cơ liên tục về sau (không bao giờ đơ)
  const ambientBreeze = Math.sin(t * 0.04) * 0.8;
  return primarySwing + ambientBreeze;
};

/**
 * Hiệu ứng gõ văn bản từng ký tự (Typewriter) mượt mà kèm con trỏ nhấp nháy liên tục
 */
export const getTypewriter = (
  fullText: string,
  frame: number,
  startFrame: number,
  speedCharsPerFrame = 0.75
): { displayedText: string; isComplete: boolean; showCursor: boolean } => {
  const t = Math.max(0, frame - startFrame);
  const totalChars = fullText.length;
  const currentChars = Math.min(totalChars, Math.floor(t * speedCharsPerFrame));
  
  const displayedText = fullText.slice(0, currentChars);
  const isComplete = currentChars >= totalChars;
  // Nhấp nháy con trỏ mỗi 12 frames
  const showCursor = !isComplete || Math.floor(frame / 12) % 2 === 0;

  return {
    displayedText,
    isComplete,
    showCursor,
  };
};

/**
 * Hiệu ứng nhảy số (Counter / Odometer) từ 0 đến giá trị mục tiêu
 */
export const getCounterNumber = (
  target: number,
  frame: number,
  startFrame: number,
  fps = 30,
  config = SPRING_PRESETS.glide
): number => {
  const currentFrame = Math.max(0, frame - startFrame);
  const p = spring({
    frame: currentFrame,
    fps,
    config,
  });

  return Math.round(interpolate(p, [0, 1], [0, target], { extrapolateRight: "clamp" }));
};

/**
 * Quỹ đạo di chuyển chuột (Mouse Cursor Trajectory) với gia tốc tự nhiên (Bézier arc)
 * Kèm chuyển động idle hover sau khi tới đích.
 */
export const getCursorFlight = (
  frame: number,
  startFrame: number,
  durationFrames = 22,
  startPoint = { x: 300, y: 700 },
  targetPoint = { x: 180, y: 450 },
  clickFrameOffset = 18
) => {
  const t = Math.max(0, frame - startFrame);
  const progress = Math.min(1, Math.max(0, t / durationFrames));
  
  const eased = progress < 0.5 
    ? 4 * progress * progress * progress 
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  const arcOffset = Math.sin(progress * Math.PI) * 24;

  let x = interpolate(eased, [0, 1], [startPoint.x, targetPoint.x]) + arcOffset * 0.4;
  let y = interpolate(eased, [0, 1], [startPoint.y, targetPoint.y]) - arcOffset;

  // Hiệu ứng click nhấp xuống nảy lên
  const clickT = frame - (startFrame + clickFrameOffset);
  let clickScale = 1;
  let isClicked = false;
  let clickRipple = 0;

  if (clickT >= 0 && clickT <= 14) {
    isClicked = true;
    clickScale = interpolate(clickT, [0, 3, 7, 14], [1, 0.82, 1.08, 1], {
      extrapolateRight: "clamp",
    });
    clickRipple = interpolate(clickT, [0, 14], [0, 1], {
      extrapolateRight: "clamp",
    });
  } else if (clickT > 14) {
    isClicked = true;
    // Sau khi click xong: Chuột hover nhẹ tự nhiên quanh điểm đích
    const idleTime = clickT - 14;
    x += Math.sin(idleTime * 0.05) * 1.5;
    y += Math.cos(idleTime * 0.04) * 1.2;
  }

  return {
    x,
    y,
    clickScale,
    isClicked,
    clickRipple,
    isArrived: progress >= 1,
  };
};

/**
 * Vẽ đường dây dẫn SVG (Stroke Dash Draw)
 */
export const getWireDraw = (
  frame: number,
  startFrame: number,
  durationFrames = 14
): number => {
  const t = Math.max(0, frame - startFrame);
  const p = Math.min(1, t / durationFrames);
  return 1 - Math.pow(1 - p, 4);
};

/**
 * Hiệu ứng sóng lan tỏa mục tiêu (Target Reticle Ping) - Chu kỳ lặp vô tận
 */
export const getTargetPulse = (
  frame: number,
  startFrame: number,
  periodFrames = 24
): { scale: number; opacity: number } => {
  const t = Math.max(0, frame - startFrame);
  const cycle = (t % periodFrames) / periodFrames;
  const scale = 1 + cycle * 1.4;
  const opacity = Math.max(0, 1 - cycle);
  return { scale, opacity };
};

/**
 * Trạng thái chớp mắt tự nhiên (Natural Blinking Cycle)
 * Cho Robot hoặc Con mắt Observer Eye
 */
export const getBlinkState = (
  frame: number,
  intervalFrames = 65,
  blinkDuration = 4
): { scaleY: number; isBlinking: boolean } => {
  const cycle = frame % intervalFrames;
  const isBlinking = cycle < blinkDuration;
  const scaleY = isBlinking ? 0.15 : 1;
  return { scaleY, isBlinking };
};

/**
 * Dải tần âm thanh biến thiên liên tục (Continuous Dynamic Waveform Bars)
 * Giúp các thanh audio waveform luôn nhảy sống động như nhạc thật.
 */
export const getDynamicWaveform = (
  frame: number,
  index: number,
  totalBars = 32,
  minHeight = 6,
  maxHeight = 32
): number => {
  const t = frame * 0.18;
  const wave1 = Math.sin(t + index * 0.35);
  const wave2 = Math.cos(t * 0.7 - index * 0.2);
  const raw = (wave1 + wave2 + 2) / 4; // 0 to 1
  return minHeight + raw * (maxHeight - minHeight);
};

/**
 * Tiến trình lặp liên tục (Continuous Looping Progress) 0 -> 1
 */
export const getLoopingProgress = (frame: number, periodFrames = 60): number => {
  return ((frame % periodFrames) + (frame > 0 ? (frame - Math.floor(frame)) : 0)) / periodFrames;
};
