import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EyebrowHeader, Flip3DIn, FONTS, MaskReveal, SplitSlideIn } from './common';

export const Scene4LocalAgent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // Chat typing effect
  const chatPromptText = 'Viết giúp mình email trả lời khách hàng';
  const charsTyped = Math.max(0, Math.min(chatPromptText.length, Math.floor(frame / 1.1)));
  const currentChatText = chatPromptText.slice(0, charsTyped);

  // Stage 2: macOS Finder Window entrance at frame 32
  const finderSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 160 },
  });

  // Staggered traffic light buttons in Finder window
  const dot1Spring = spring({ frame: Math.max(0, frame - 34), fps, config: { mass: 0.4, damping: 10, stiffness: 220 } });
  const dot2Spring = spring({ frame: Math.max(0, frame - 36), fps, config: { mass: 0.4, damping: 10, stiffness: 220 } });
  const dot3Spring = spring({ frame: Math.max(0, frame - 38), fps, config: { mass: 0.4, damping: 10, stiffness: 220 } });

  // Sequential cursor movement & clicks:
  // Waypoint 1: frame 36-48 -> DATA (x: 275, y: 150), click at 48
  // Waypoint 2: frame 52-70 -> DOC (x: 430, y: 150), click at 70
  // Waypoint 3: frame 74-92 -> NOTE (x: 580, y: 150), click at 92
  // Waypoint 4: frame 96-112 -> Execute button (x: 500, y: 260), click at 112
  const cursorX = interpolate(
    frame,
    [32, 48, 52, 70, 74, 92, 96, 112],
    [100, 275, 275, 430, 430, 580, 580, 500],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );
  const cursorY = interpolate(
    frame,
    [32, 48, 52, 70, 74, 92, 96, 112],
    [240, 150, 150, 150, 150, 150, 150, 260],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const isClicking =
    (frame >= 48 && frame <= 52) ||
    (frame >= 70 && frame <= 74) ||
    (frame >= 92 && frame <= 96) ||
    (frame >= 112 && frame <= 116);
  const cursorScale = isClicking ? 0.8 : 1.0;

  // 3 Checkmark springs for the 3 files
  const check1Spring = spring({ frame: Math.max(0, frame - 48), fps, config: { mass: 0.5, damping: 10, stiffness: 210 } });
  const check2Spring = spring({ frame: Math.max(0, frame - 70), fps, config: { mass: 0.5, damping: 10, stiffness: 210 } });
  const check3Spring = spring({ frame: Math.max(0, frame - 92), fps, config: { mass: 0.5, damping: 10, stiffness: 210 } });

  // Reactive hop / jump physics for each file when cursor clicks it
  const getFileJump = (clickFrame: number) => {
    if (frame < clickFrame) return { y: 0, scale: 1, rot: 0 };
    const elapsed = frame - clickFrame;
    if (elapsed > 16) return { y: 0, scale: 1, rot: 0 };
    const springVal = Math.sin(elapsed * 0.65) * Math.exp(-elapsed * 0.22);
    return {
      y: -springVal * 10,
      scale: 1 + springVal * 0.12,
      rot: springVal * 3,
    };
  };

  const jump1 = getFileJump(48);
  const jump2 = getFileJump(70);
  const jump3 = getFileJump(92);

  // Execution Progress from frame 112 to 135
  const execProgress = interpolate(frame, [112, 134], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Exit transition (frame 136 -> 144) to sustain full 145 frames without blank gaps
  const exitProgress = interpolate(frame, [136, 144], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.94]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        width: 1080,
        height: 940,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 140,
        paddingRight: 140,
        boxSizing: 'border-box',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Eyebrow Header */}
      <EyebrowHeader tag="Cài Agent" />

      {/* Main Headline with MaskReveal */}
      <div
        style={{
          width: '100%',
          maxWidth: 780,
          marginTop: 6,
        }}
      >
        <MaskReveal progress={enterSpring} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.2,
            }}
          >
            Không chỉ chat,{' '}
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
              làm trên máy
            </span>
          </div>
        </MaskReveal>
      </div>

      {/* Mockup Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 780,
          marginTop: 40,
          minHeight: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {frame < 32 ? (
          /* Stage 1: Dark Chat Prompt Card with SlideIn */
          <SplitSlideIn progress={enterSpring} from="bottom" distance={60}>
            <div
              style={{
                width: 680,
                backgroundColor: '#1E1D1B',
                borderRadius: 32,
                padding: '36px 40px',
                boxShadow: '0 24px 55px rgba(26, 24, 22, 0.16)',
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 30,
                  color: '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {currentChatText}
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: 28,
                    backgroundColor: COLORS.accent,
                    marginLeft: 4,
                    verticalAlign: 'middle',
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: 30,
                }}
              >
                +
              </div>
            </div>
          </SplitSlideIn>
        ) : (
          /* Stage 2: macOS Finder Window Mockup with 3D Flip Unfold */
          <Flip3DIn progress={finderSpring} axis="X" initialAngle={-30}>
            <div
              style={{
                position: 'relative',
                width: 740,
                backgroundColor: '#FFFFFF',
                borderRadius: 28,
                border: `1px solid ${COLORS.line}`,
                boxShadow: '0 24px 55px rgba(26, 24, 22, 0.10), 0 2px 6px rgba(26,24,22,0.04)',
                overflow: 'hidden',
              }}
            >
              {/* macOS Window Titlebar with staggered traffic light buttons */}
              <div
                style={{
                  height: 50,
                  backgroundColor: '#F8F7F4',
                  borderBottom: `1px solid ${COLORS.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 22,
                  paddingRight: 22,
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', gap: 9 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FF5F56', transform: `scale(${dot1Spring})`, opacity: dot1Spring }} />
                  <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FFBD2E', transform: `scale(${dot2Spring})`, opacity: dot2Spring }} />
                  <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27C93F', transform: `scale(${dot3Spring})`, opacity: dot3Spring }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 16 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, backgroundColor: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 900 }}>F</span>
                  </div>
                  <div style={{ width: 140, height: 12, borderRadius: 6, backgroundColor: COLORS.line }} />
                </div>
              </div>

            {/* Files Grid Row */}
            <div
              style={{
                padding: '44px 36px 54px 36px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              {/* Item 1: Folder */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 84, height: 68, borderRadius: 12, backgroundColor: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px rgba(96,165,250,0.25)' }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                  </svg>
                </div>
                <div style={{ width: 50, height: 8, borderRadius: 4, backgroundColor: COLORS.line }} />
              </div>

              {/* Item 2: Numbers File (Gets Checkmark 1 and reactive jump) */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  transform: `translateY(${jump1.y}px) scale(${jump1.scale}) rotate(${jump1.rot}deg)`,
                  transition: 'transform 0.05s ease',
                }}
              >
                {/* Terracotta Checkmark Badge 1 */}
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -8,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: COLORS.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(198,83,42,0.4)',
                    zIndex: 20,
                    opacity: check1Spring,
                    transform: `scale(${check1Spring})`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div style={{ width: 76, height: 94, borderRadius: 10, backgroundColor: '#F3F4F6', border: '1.5px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
                      <rect x="3" y="12" width="4" height="8" rx="1" /><rect x="10" y="8" width="4" height="12" rx="1" /><rect x="17" y="4" width="4" height="16" rx="1" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>DATA</span>
                </div>
                <div style={{ width: 44, height: 8, borderRadius: 4, backgroundColor: COLORS.line }} />
              </div>

              {/* Item 3: Pages File (Gets Checkmark 2 and reactive jump) */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  transform: `translateY(${jump2.y}px) scale(${jump2.scale}) rotate(${jump2.rot}deg)`,
                  transition: 'transform 0.05s ease',
                }}
              >
                {/* Terracotta Checkmark Badge 2 */}
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -8,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: COLORS.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(198,83,42,0.4)',
                    zIndex: 20,
                    opacity: check2Spring,
                    transform: `scale(${check2Spring})`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div style={{ width: 76, height: 94, borderRadius: 10, backgroundColor: '#F3F4F6', border: '1.5px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>DOC</span>
                </div>
                <div style={{ width: 44, height: 8, borderRadius: 4, backgroundColor: COLORS.line }} />
              </div>

              {/* Item 4: Text File (Gets Checkmark 3 and reactive jump) */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  transform: `translateY(${jump3.y}px) scale(${jump3.scale}) rotate(${jump3.rot}deg)`,
                  transition: 'transform 0.05s ease',
                }}
              >
                {/* Terracotta Checkmark Badge 3 */}
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -8,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: COLORS.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(198,83,42,0.4)',
                    zIndex: 20,
                    opacity: check3Spring,
                    transform: `scale(${check3Spring})`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div style={{ width: 76, height: 94, borderRadius: 10, backgroundColor: '#F3F4F6', border: '1.5px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10, boxSizing: 'border-box', gap: 6 }}>
                  <div style={{ width: '100%', height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }} />
                  <div style={{ width: '85%', height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }} />
                  <div style={{ width: '90%', height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }} />
                  <div style={{ width: '60%', height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }} />
                </div>
                <div style={{ width: 44, height: 8, borderRadius: 4, backgroundColor: COLORS.line }} />
              </div>
            </div>

            {/* Bottom Execution Action Bar (frames 96+) */}
            {frame >= 96 && (
              <div
                style={{
                  margin: '0 28px 24px 28px',
                  padding: '12px 20px',
                  borderRadius: 14,
                  backgroundColor: '#FAF8F5',
                  border: `1.5px solid ${frame >= 112 ? COLORS.accent : COLORS.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(26,24,22,0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <span style={{ fontSize: 18 }}>{frame >= 130 ? '✓' : '⚡'}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, marginRight: 16 }}>
                    <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: COLORS.ink }}>
                      {frame >= 130
                        ? 'Đã thực thi trực tiếp trên máy!'
                        : frame >= 112
                        ? 'Đang thực thi tác vụ trên máy...'
                        : 'Sẵn sàng thực thi tác vụ'}
                    </span>
                    {frame >= 112 && (
                      <div style={{ width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(26,24,22,0.1)', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${execProgress * 100}%`,
                            backgroundColor: frame >= 130 ? '#10B981' : COLORS.accent,
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: frame >= 112 ? COLORS.accent : '#1E1D1B',
                    color: '#FFFFFF',
                    padding: '8px 18px',
                    borderRadius: 10,
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                    transform: `scale(${isClicking && frame >= 112 ? 0.92 : 1})`,
                    transition: 'transform 0.08s ease',
                  }}
                >
                  <span>{frame >= 130 ? 'Hoàn tất' : frame >= 112 ? 'Đang chạy...' : 'Thực thi ngay'}</span>
                  <span>{frame >= 130 ? '✓' : '▶'}</span>
                </div>
              </div>
            )}

            {/* Smoothly Gliding macOS Mouse Cursor */}
            <div
              style={{
                position: 'absolute',
                left: cursorX,
                top: cursorY,
                pointerEvents: 'none',
                zIndex: 50,
                transform: `scale(${cursorScale})`,
                transition: 'transform 0.08s ease',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M4 2l16 12-7.5.5 4.5 7.5-3 1.5-4.5-7.5L4 21V2z" fill="#1E1D1B" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          </Flip3DIn>
        )}
      </div>
    </AbsoluteFill>
  );
};
