import React from 'react';
import {
  interpolate,
  useCurrentFrame,
  OffthreadVideo,
  Img,
  staticFile,
  Easing,
} from 'remotion';
import { FaIcon } from './FaIcon';

export interface ZoomEvent {
  /** The frame at which this zoom state begins transitioning */
  frame: number;
  /** Zoom scale: 1.0 = full window overview, 1.5 - 2.8 = focused detail */
  scale: number;
  /** Horizontal focus point: 0.0 (left) to 1.0 (right), 0.5 is center */
  originX: number;
  /** Vertical focus point: 0.0 (top) to 1.0 (bottom), 0.5 is center */
  originY: number;
  /** Transition duration in frames (default: 18) */
  transitionFrames?: number;
  /** Optional title or callout tag displayed when this zoom is active */
  label?: string;
}

export interface CursorEvent {
  frame: number;
  x: number; // 0.0 to 1.0
  y: number; // 0.0 to 1.0
  isClick?: boolean;
}

export interface ScreenMockupProps {
  /** Video source URL or staticFile path (mutually exclusive with imageSrc & children) */
  videoSrc?: string;
  /** Image source URL or staticFile path */
  imageSrc?: string;
  /** Custom children (e.g. live React UI, code blocks) inside screen viewport */
  children?: React.ReactNode;
  /** Window title bar label or URL */
  windowTitle?: string;
  /** Theme: 'dark' | 'light' | 'glass' */
  theme?: 'dark' | 'light' | 'glass';
  /** Width of the mockup window in pixels or percentage (default: '90%') */
  width?: number | string;
  /** Height of the mockup window in pixels (default: 'auto') */
  height?: number | string;
  /** Aspect ratio of the screen viewport (e.g. '16/9') */
  aspectRatio?: string;
  /** Zoom keyframes / events */
  zoomEvents?: ZoomEvent[];
  /** Cursor motion & click events */
  cursorEvents?: CursorEvent[];
  /** Enable spotlight darkening on inactive areas when zoomed */
  spotlight?: boolean;
  /** Enable subtle 3D tilt perspective (default: false) */
  tilt3D?: boolean;
  /** Custom CSS style for outer wrapper */
  style?: React.CSSProperties;
}

export const ScreenMockup: React.FC<ScreenMockupProps> = ({
  videoSrc,
  imageSrc,
  children,
  windowTitle = 'localhost:3000',
  theme = 'dark',
  width = '92%',
  height = 'auto',
  aspectRatio = '16/9',
  zoomEvents = [],
  cursorEvents = [],
  spotlight = false,
  tilt3D = false,
  style = {},
}) => {
  const frame = useCurrentFrame();

  // --- Calculate Camera Pan & Zoom ---
  let currentScale = 1.0;
  let currentOriginX = 0.5;
  let currentOriginY = 0.5;
  let activeLabel: string | undefined;

  if (zoomEvents.length > 0) {
    // Sort events by frame
    const sorted = [...zoomEvents].sort((a, b) => a.frame - b.frame);

    // Find active event
    let prev: ZoomEvent = {
      frame: 0,
      scale: 1.0,
      originX: 0.5,
      originY: 0.5,
      transitionFrames: 18,
    };

    for (let i = 0; i < sorted.length; i++) {
      if (frame >= sorted[i].frame) {
        prev = sorted[i];
      }
    }

    if (frame < sorted[0].frame) {
      currentScale = 1.0;
      currentOriginX = 0.5;
      currentOriginY = 0.5;
    } else {
      activeLabel = prev.label;
      const tDuration = prev.transitionFrames ?? 18;
      const progress = interpolate(
        frame,
        [prev.frame, prev.frame + tDuration],
        [0, 1],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        }
      );

      currentScale = interpolate(progress, [0, 1], [1.0, prev.scale]);
      currentOriginX = prev.originX;
      currentOriginY = prev.originY;
    }
  }

  // --- Theme Styles ---
  const isDark = theme === 'dark';
  const chromeBg = isDark ? '#1E1E22' : '#F2F2F7';
  const chromeBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textColor = isDark ? '#9A9AA6' : '#636366';
  const urlBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
  const windowBg = isDark ? '#141416' : '#FFFFFF';

  // --- Cursor Interpolation ---
  let cursorX = -100;
  let cursorY = -100;
  let isClicking = false;

  if (cursorEvents.length > 0) {
    const sortedCursor = [...cursorEvents].sort((a, b) => a.frame - b.frame);
    let cPrev = sortedCursor[0];
    let cNext = sortedCursor[0];

    for (let i = 0; i < sortedCursor.length; i++) {
      if (frame >= sortedCursor[i].frame) {
        cPrev = sortedCursor[i];
        cNext = sortedCursor[i + 1] || sortedCursor[i];
      }
    }

    if (cPrev && cNext && cNext.frame > cPrev.frame) {
      const cProg = interpolate(
        frame,
        [cPrev.frame, cNext.frame],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.33, 1, 0.68, 1) }
      );
      cursorX = interpolate(cProg, [0, 1], [cPrev.x, cNext.x]);
      cursorY = interpolate(cProg, [0, 1], [cPrev.y, cNext.y]);
    } else {
      cursorX = cPrev.x;
      cursorY = cPrev.y;
    }

    // Click effect (lasts 12 frames after click event)
    const recentClick = sortedCursor.find(
      (c) => c.isClick && frame >= c.frame && frame < c.frame + 14
    );
    if (recentClick) {
      isClicking = true;
    }
  }

  // Tilt dynamics
  const tiltTransform = tilt3D
    ? 'perspective(1200px) rotateX(4deg) rotateY(-2deg)'
    : 'none';

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: isDark
          ? '0 30px 90px -20px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)'
          : '0 25px 70px -15px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        transform: tiltTransform,
        backgroundColor: windowBg,
        ...style,
      }}
    >
      {/* --- macOS Window Chrome Header --- */}
      <div
        style={{
          height: 44,
          backgroundColor: chromeBg,
          borderBottom: `1px solid ${chromeBorder}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          position: 'relative',
          userSelect: 'none',
          zIndex: 10,
        }}
      >
        {/* Traffic Light Buttons */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
        </div>

        {/* URL Pill / Title */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: urlBg,
            borderRadius: 8,
            padding: '4px 20px',
            fontSize: 13,
            fontWeight: 500,
            color: textColor,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            maxWidth: '55%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <FaIcon icon="lock" size={11} color={textColor} style={{ opacity: 0.7 }} /> {windowTitle}
        </div>

        {/* Optional Active Zoom Label Callout */}
        {activeLabel && (
          <div
            style={{
              marginLeft: 'auto',
              backgroundColor: '#C6532A',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 6,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {activeLabel}
          </div>
        )}
      </div>

      {/* --- Screen Content Viewport with Camera Zoom & Pan --- */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio,
          overflow: 'hidden',
          backgroundColor: windowBg,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${currentScale})`,
            transformOrigin: `${currentOriginX * 100}% ${currentOriginY * 100}%`,
            transition: 'transform 0.05s linear',
            position: 'relative',
          }}
        >
          {/* Video or Image or Children */}
          {videoSrc ? (
            <OffthreadVideo
              src={videoSrc.startsWith('http') ? videoSrc : staticFile(videoSrc)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : imageSrc ? (
            <Img
              src={imageSrc.startsWith('http') ? imageSrc : staticFile(imageSrc)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            children
          )}

          {/* Spotlight Effect (dims surrounding area when zoomed in) */}
          {spotlight && currentScale > 1.1 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at ${currentOriginX * 100}% ${currentOriginY * 100}%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.45) 80%)`,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Cursor Simulation */}
          {cursorX >= 0 && cursorY >= 0 && (
            <div
              style={{
                position: 'absolute',
                left: `${cursorX * 100}%`,
                top: `${cursorY * 100}%`,
                pointerEvents: 'none',
                zIndex: 20,
                transform: 'translate(-2px, -2px)',
              }}
            >
              {/* macOS Style Pointer */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.5 3.5L18.5 13.5L12.5 14.5L10 20.5L7.5 19.5L10 13.5L5.5 3.5Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Click Ripple Ring */}
              {isClicking && (
                <div
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '2px solid #C6532A',
                    transform: 'translate(-50%, -50%) scale(1.6)',
                    opacity: 0.8,
                    animation: 'none',
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
