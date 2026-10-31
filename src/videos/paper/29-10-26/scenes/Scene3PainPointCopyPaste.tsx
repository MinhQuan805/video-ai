import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  COLORS,
  continuousFloat,
  dampedOscillation,
  EyebrowHeader,
  FaIcon,
  FONTS,
  MaskReveal,
  SPRINGS,
} from './common';

// Authentic OS Arrow Mouse Cursor
const MouseCursor: React.FC<{ x: number; y: number; isGrabbing?: boolean }> = ({ x, y }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      zIndex: 60,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.28))',
    }}
  >
    <svg width="32" height="38" viewBox="0 0 28 34" fill="none">
      <path
        d="M2 2L11 28L15.5 19L24 16.5L2 2Z"
        fill="#1A1816"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// Tactile Angled Drafting Pencil with Graphite Tip
const WritingPencil: React.FC<{
  tipX: number;
  tipY: number;
  opacity: number;
  isWriting: boolean;
}> = ({ tipX, tipY, opacity, isWriting }) => {
  if (opacity <= 0.01) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: tipX,
        top: tipY,
        opacity,
        zIndex: 40,
        pointerEvents: 'none',
        transform: 'translate(-8px, -48px)',
        filter: 'drop-shadow(3px 8px 12px rgba(26,24,22,0.25))',
      }}
    >
      <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
        {/* Rotate pencil by 38 degrees around graphite tip at (8, 48) */}
        <g transform="rotate(38 8 48)">
          {/* Graphite Lead Tip */}
          <polygon points="8,48 5.5,43 10.5,43" fill="#1A1816" />
          {/* Sharpened Wood Cone */}
          <polygon points="5.5,43 10.5,43 12,33 4,33" fill="#E8D3B8" />
          {/* Wooden Shaft in Terracotta Accent */}
          <rect x="4" y="3" width="8" height="30" rx="1" fill={COLORS.accent} />
          {/* Subtle highlight sheen */}
          <rect x="6.5" y="3" width="2" height="30" fill="rgba(255,255,255,0.35)" />
          {/* Gold Brass Ferrule */}
          <rect x="4" y="-1" width="8" height="4" fill="#C49E4A" />
          {/* Pink/Salmon Eraser */}
          <rect x="4" y="-5" width="8" height="4" rx="2" fill="#D97757" />
        </g>
      </svg>
    </div>
  );
};

export const Scene3PainPointCopyPaste: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline entrance
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });

  // 1. Initial Paper Sheet Entrance (frame 0 to 18)
  const paperEnter = spring({ frame, fps, config: SPRINGS.elastic });
  const paperFloat = continuousFloat(frame, 0.05, 3);

  // Progressive drawing of 4 prompt lines by the writing pencil
  const w1 = interpolate(frame, [6, 16], [0, 340], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const w2 = interpolate(frame, [18, 26], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const w3 = interpolate(frame, [28, 36], [0, 350], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const w4 = interpolate(frame, [38, 44], [0, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Dynamic pencil trajectory: moves along each line as it is drawn
  const getPencilCoords = (f: number) => {
    const startX = 28;
    if (f < 6) {
      const ent = Math.max(0, f) / 6;
      return {
        x: interpolate(ent, [0, 1], [startX + 180, startX]),
        y: interpolate(ent, [0, 1], [40, 91]),
        isWriting: false,
        opacity: ent,
      };
    }
    if (f <= 16) {
      const p = (f - 6) / 10;
      return { x: startX + p * 340, y: 91, isWriting: true, opacity: 1 };
    }
    if (f < 18) {
      const jump = (f - 16) / 2;
      return {
        x: interpolate(jump, [0, 1], [startX + 340, startX]),
        y: interpolate(jump, [0, 1], [91, 141]),
        isWriting: false,
        opacity: 1,
      };
    }
    if (f <= 26) {
      const p = (f - 18) / 8;
      return { x: startX + p * 300, y: 141, isWriting: true, opacity: 1 };
    }
    if (f < 28) {
      const jump = (f - 26) / 2;
      return {
        x: interpolate(jump, [0, 1], [startX + 300, startX]),
        y: interpolate(jump, [0, 1], [141, 191]),
        isWriting: false,
        opacity: 1,
      };
    }
    if (f <= 36) {
      const p = (f - 28) / 8;
      return { x: startX + p * 350, y: 191, isWriting: true, opacity: 1 };
    }
    if (f < 38) {
      const jump = (f - 36) / 2;
      return {
        x: interpolate(jump, [0, 1], [startX + 350, startX]),
        y: interpolate(jump, [0, 1], [191, 241]),
        isWriting: false,
        opacity: 1,
      };
    }
    if (f <= 44) {
      const p = (f - 38) / 6;
      return { x: startX + p * 240, y: 241, isWriting: true, opacity: 1 };
    }
    if (f <= 48) {
      const lift = (f - 44) / 4;
      return {
        x: startX + 240 + lift * 25,
        y: 241 - lift * 35,
        isWriting: false,
        opacity: 1 - lift,
      };
    }
    return { x: 0, y: 0, isWriting: false, opacity: 0 };
  };

  const pencilState = getPencilCoords(frame);
  const writingJitter = pencilState.isWriting ? Math.sin(frame * 4) * 1.5 : 0;

  // 2. Mouse Cursor Enters & Moves to grab the paper (frame 32 to 46)
  const cursorMove1 = spring({ frame: Math.max(0, frame - 32), fps, config: SPRINGS.smooth });
  const cursorX1 = interpolate(cursorMove1, [0, 1], [680, 420]);
  const cursorY1 = interpolate(cursorMove1, [0, 1], [-40, 160]);

  // Click / Grab at frame 46
  const isGrabbed = frame >= 46;
  const grabClickRecoil = dampedOscillation(frame, 46, 12, 6, 0.9);

  // 3. Dragging towards Claude Chat & shrinking paper into a file icon (frame 48 to 78)
  const dragProgress = spring({ frame: Math.max(0, frame - 48), fps, config: SPRINGS.smooth });
  const cursorX2 = interpolate(dragProgress, [0, 1], [420, 80]);
  const cursorY2 = interpolate(dragProgress, [0, 1], [160, 375]);

  // The paper morphs from full document to compact file token while dragging
  const paperScale = isGrabbed
    ? interpolate(dragProgress, [0, 0.6, 1], [0.95, 0.45, 0])
    : paperEnter;
  const paperOpacity = isGrabbed
    ? interpolate(dragProgress, [0, 0.8, 1], [1, 0.6, 0])
    : 1;

  // The compact dragging file token (appears at frame 50 attached to cursor)
  const showDragToken = isGrabbed && frame < 84;
  const tokenScale = interpolate(dragProgress, [0, 0.4, 0.8], [0.2, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Claude Chat window appears (full-width) at frame 54
  const chatEnter = spring({ frame: Math.max(0, frame - 54), fps, config: SPRINGS.elastic });

  // 5. File dropped into Claude Chat at frame 84
  const isDropped = frame >= 84;
  const dropProgress = spring({ frame: Math.max(0, frame - 84), fps, config: SPRINGS.elastic });
  const dropRecoil = dampedOscillation(frame, 84, 16, 10, 0.85);

  // Active cursor position
  const currentCursorX = !isGrabbed ? cursorX1 : cursorX2;
  const currentCursorY = !isGrabbed ? cursorY1 : cursorY2;

  // Blinking caret inside Claude Chat
  const isCaretVisible = Math.floor(frame / 6) % 2 === 0;

  // Exit transition
  const exitProgress = spring({
    frame: Math.max(0, frame - 108),
    fps,
    config: SPRINGS.snappy,
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        pointerEvents: 'none',
        boxSizing: 'border-box',
        padding: '0 40px',
      }}
    >
      <EyebrowHeader
        icon={<FaIcon icon="rotate" size={26} color={COLORS.accent} />}
        tag="VÒNG LẶP THỦ CÔNG"
        stepNum="03"
      />

      <div style={{ textAlign: 'center', marginBottom: 28, padding: '0 60px' }}>
        <MaskReveal progress={titleProgress}>
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.22,
            }}
          >
            Nỗi đau <br />
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>lặp lại mỗi ngày</span>
          </div>
        </MaskReveal>
      </div>

      {/* Main Stage: Paper Initial -> Mouse Drag -> Claude Chat Full Width */}
      <div
        style={{
          position: 'relative',
          width: 860,
          height: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Phase 1: Large Paper Document (Centered initially) */}
        {paperOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 20,
              width: 440,
              height: 360,
              transform: `translateY(${paperFloat + grabClickRecoil}px) scale(${paperScale})`,
              transformOrigin: 'center center',
              opacity: paperOpacity,
              zIndex: 20,
            }}
          >
            {/* Top Metal Binder Clip */}
            <div
              style={{
                position: 'absolute',
                top: -14,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 26,
                borderRadius: 13,
                backgroundColor: '#2D2824',
                border: '1.5px solid #5C5248',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                zIndex: 10,
              }}
            />

            {/* Paper Sheet Body: Pristine minimal document */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: 22,
                border: `2px solid ${COLORS.line}`,
                boxShadow: '0 24px 52px rgba(26,24,22,0.14)',
                padding: '24px 28px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Paper Header: Clean & minimal */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1.5px dashed ${COLORS.line}`, paddingBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FaIcon icon="file" size={18} color={COLORS.accent} />
                  <span style={{ fontFamily: FONTS.mono, fontSize: 15, fontWeight: 800, color: COLORS.ink }}>
                    prompt.txt
                  </span>
                </div>
                <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.subtle, fontWeight: 700 }}>
                  v12 • 4KB
                </span>
              </div>

              {/* Progressive Writing Lines with Notebook Guidelines */}
              <div style={{ position: 'relative', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 36 }}>
                {/* Line 1 */}
                <div style={{ position: 'relative', height: 14 }}>
                  <div style={{ position: 'absolute', top: 6, left: 0, right: 0, height: 1.5, backgroundColor: '#EFEAE2', borderRadius: 1 }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 1,
                      left: 0,
                      width: w1,
                      height: 12,
                      backgroundColor: '#2D2824',
                      borderRadius: 6,
                    }}
                  />
                </div>

                {/* Line 2 */}
                <div style={{ position: 'relative', height: 14 }}>
                  <div style={{ position: 'absolute', top: 6, left: 0, right: 0, height: 1.5, backgroundColor: '#EFEAE2', borderRadius: 1 }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 1,
                      left: 0,
                      width: w2,
                      height: 12,
                      backgroundColor: '#3D3630',
                      borderRadius: 6,
                    }}
                  />
                </div>

                {/* Line 3 */}
                <div style={{ position: 'relative', height: 14 }}>
                  <div style={{ position: 'absolute', top: 6, left: 0, right: 0, height: 1.5, backgroundColor: '#EFEAE2', borderRadius: 1 }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 1,
                      left: 0,
                      width: w3,
                      height: 12,
                      backgroundColor: '#2D2824',
                      borderRadius: 6,
                    }}
                  />
                </div>

                {/* Line 4 */}
                <div style={{ position: 'relative', height: 14 }}>
                  <div style={{ position: 'absolute', top: 6, left: 0, right: 0, height: 1.5, backgroundColor: '#EFEAE2', borderRadius: 1 }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 1,
                      left: 0,
                      width: w4,
                      height: 12,
                      backgroundColor: '#4A413B',
                      borderRadius: 6,
                    }}
                  />
                </div>
              </div>

              {/* Physical Writing Pencil (Tip tracks the drawn line in real-time) */}
              <WritingPencil
                tipX={pencilState.x}
                tipY={pencilState.y + writingJitter}
                opacity={pencilState.opacity}
                isWriting={pencilState.isWriting}
              />
            </div>
          </div>
        )}

        {/* Floating Compact File Token (being dragged by cursor) */}
        {showDragToken && (
          <div
            style={{
              position: 'absolute',
              left: currentCursorX + 16,
              top: currentCursorY + 16,
              backgroundColor: '#FFFFFF',
              border: `2px solid ${COLORS.accent}`,
              borderRadius: 12,
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 12px 28px rgba(198, 83, 42, 0.25)',
              transform: `scale(${tokenScale}) rotate(-4deg)`,
              zIndex: 55,
            }}
          >
            <FaIcon icon="file" size={18} color={COLORS.accent} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 800, color: COLORS.ink }}>
              prompt.txt
            </span>
          </div>
        )}

        {/* Authentic Claude Input Box (matching official Claude AI UI) */}
        {chatEnter > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              width: 840,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: isDropped ? `2px solid ${COLORS.accent}` : '1.5px solid #E5E7EB',
              boxShadow: isDropped
                ? '0 24px 56px rgba(198, 83, 42, 0.16), 0 4px 16px rgba(0, 0, 0, 0.06)'
                : '0 20px 48px rgba(0, 0, 0, 0.08)',
              padding: '20px 24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              transform: `scale(${chatEnter}) translateY(${dropRecoil}px)`,
              opacity: chatEnter,
              zIndex: 10,
            }}
          >
            {/* Top Row: Attached File Card (Top Left) */}
            <div style={{ display: 'flex', alignItems: 'flex-start', minHeight: 88 }}>
              {isDropped ? (
                <div
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: 16,
                    background: 'linear-gradient(180deg, #F9FAFB 0%, #E5E7EB 100%)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    transform: `scale(${interpolate(dropProgress, [0, 0.7, 1], [0.6, 1.15, 1])})`,
                  }}
                >
                  <FaIcon icon="file" size={26} color={COLORS.accent} />
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 11,
                      fontWeight: 800,
                      color: COLORS.ink,
                      maxWidth: 72,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    prompt.txt
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: 16,
                    border: '2px dashed #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FAFAFA',
                  }}
                >
                  <FaIcon icon="arrow-down" size={16} color="#9CA3AF" />
                </div>
              )}
            </div>

            {/* Middle: Claude Placeholder Prompt Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4 }}>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 22,
                  fontWeight: 500,
                  color: isDropped ? COLORS.ink : '#6B7280',
                  letterSpacing: '-0.01em',
                }}
              >
                How can I help you today?
              </span>
              {isDropped && isCaretVisible && (
                <span style={{ width: 2, height: 22, backgroundColor: COLORS.accent }} />
              )}
            </div>

            {/* Bottom Bar: [+] [Chat | Cowork] -------- [Sonnet 5.5 High ⌄] [🎤] [↑] */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 8,
              }}
            >
              {/* Left Side: + and Chat/Cowork Switch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaIcon icon="plus" size={18} color="#6B7280" />
                </div>

                {/* Pill Switch */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#F3F4F6',
                    borderRadius: 12,
                    padding: '3px 4px',
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 9,
                      padding: '4px 12px',
                      fontFamily: FONTS.body,
                      fontSize: 14,
                      fontWeight: 700,
                      color: COLORS.ink,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    }}
                  >
                    Chat
                  </div>
                  <div
                    style={{
                      padding: '4px 10px',
                      fontFamily: FONTS.body,
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#6B7280',
                    }}
                  >
                    Cowork
                  </div>
                </div>
              </div>

              {/* Right Side: Model + Mic + Terracotta Send Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Model Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: 15, fontWeight: 600, color: '#374151' }}>
                    Sonnet 5.5
                  </span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                    High
                  </span>
                  <FaIcon icon="chevron-down" size={10} color="#6B7280" />
                </div>

                {/* Microphone Icon */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaIcon icon="microphone" size={16} color="#6B7280" />
                </div>

                {/* Terracotta Rounded Arrow Send Button */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: isDropped ? COLORS.accent : '#D1D5DB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isDropped ? '0 4px 14px rgba(198, 83, 42, 0.45)' : 'none',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <FaIcon icon="arrow-up" size={18} color="#FFFFFF" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* The Mouse Cursor */}
        {frame >= 32 && frame < 95 && (
          <MouseCursor x={currentCursorX} y={currentCursorY} isGrabbing={isGrabbed} />
        )}
      </div>
    </div>
  );
};
