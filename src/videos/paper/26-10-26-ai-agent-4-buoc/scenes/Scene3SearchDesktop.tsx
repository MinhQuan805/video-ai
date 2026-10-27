import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrandLogo, ClickRipple, COLORS, EyebrowHeader, Flip3DIn, FONTS, MaskReveal, SimulatedCursor, SplitSlideIn, StampDropIn } from './common';

export const Scene3SearchDesktop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Master entrance
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // Beat 1: Split Slide entrances (Claude Code from Left, Codex from Right)
  const card1Spring = spring({ frame: Math.max(0, frame - 4), fps, config: { mass: 0.6, damping: 12, stiffness: 170 } });
  const hoacSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { mass: 0.5, damping: 10, stiffness: 200 } });
  const card2Spring = spring({ frame: Math.max(0, frame - 14), fps, config: { mass: 0.6, damping: 12, stiffness: 170 } });
  const checkSpring = spring({ frame: Math.max(0, frame - 22), fps, config: { mass: 0.5, damping: 10, stiffness: 210 } });

  // Reactionary shockwaves & hops:
  // 1. Shockwave when "hoặc" drops into the middle at frame 10:
  const getHoacShock = (side: 'left' | 'right') => {
    if (frame < 10) return { x: 0, rot: 0 };
    const elapsed = frame - 10;
    if (elapsed > 16) return { x: 0, rot: 0 };
    const v = Math.sin(elapsed * 0.7) * Math.exp(-elapsed * 0.25);
    return {
      x: (side === 'left' ? -1 : 1) * v * 9,
      rot: (side === 'left' ? -1 : 1) * v * 3.5,
    };
  };

  const shockLeft = getHoacShock('left');
  const shockRight = getHoacShock('right');

  // 2. Hop when checkmarks pop on cards at frame 22:
  const getCheckHop = () => {
    if (frame < 22) return 0;
    const elapsed = frame - 22;
    if (elapsed > 16) return 0;
    return Math.sin(elapsed * 0.65) * Math.exp(-elapsed * 0.22) * 8;
  };
  const cardHopY = getCheckHop();

  // Beat 2: Transition to "Lên Google" at frame 36
  const beat2Entrance = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // Search input typing effect
  const fullSearchText = 'Claude desktop';
  const typeStartFrame = 46;
  const charsTyped = Math.max(
    0,
    Math.min(fullSearchText.length, Math.floor((frame - typeStartFrame) / 2))
  );
  const currentTypedText = fullSearchText.slice(0, charsTyped);

  // Suggested icons
  const claudeIconSpring = spring({ frame: Math.max(0, frame - 60), fps, config: { mass: 0.5, damping: 11, stiffness: 190 } });
  const gptIconSpring = spring({ frame: Math.max(0, frame - 66), fps, config: { mass: 0.5, damping: 11, stiffness: 190 } });

  // Sub-beat B: Webpage Download Card 3D tilt unfold at frame 78
  const webCardSpring = spring({
    frame: Math.max(0, frame - 78),
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 160 },
  });

  // Exit transition (frame 112 -> 123)
  const exitProgress = interpolate(frame, [112, 123], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.93]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // Cursor blink
  const isCaretVisible = Math.floor(frame / 6) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 180,
        paddingLeft: 140,
        paddingRight: 140,
        boxSizing: 'border-box',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Eyebrow Header */}
      <EyebrowHeader
        icon={<BrandLogo name="claude-code" size={32} />}
        stepNum="01"
        tag="Cài Agent"
      />

      {/* Dynamic Headline: Beat 1 vs Beat 2 */}
      <div
        style={{
          width: '100%',
          maxWidth: 780,
          marginTop: 10,
          minHeight: 140,
        }}
      >
        {frame < 36 ? (
          <MaskReveal progress={enterSpring} direction="up">
            <div
              style={{
                fontFamily: FONTS.title,
                fontSize: 68,
                fontWeight: 800,
                color: COLORS.ink,
                lineHeight: 1.2,
              }}
            >
              Chọn một <span style={{ fontStyle: 'italic', color: COLORS.accent }}>trong hai</span>
            </div>
          </MaskReveal>
        ) : (
          <MaskReveal progress={beat2Entrance} direction="up">
            <div
              style={{
                fontFamily: FONTS.title,
                fontSize: 68,
                fontWeight: 800,
                color: COLORS.ink,
                lineHeight: 1.2,
              }}
            >
              Lên Google,
              {frame >= 78 && (
                <span style={{ fontStyle: 'italic', color: COLORS.accent, display: 'block' }}>
                  tải về máy
                </span>
              )}
            </div>
          </MaskReveal>
        )}
      </div>

      {/* Mockup Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 780,
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {frame < 36 ? (
          /* Beat 1: Claude Code vs Codex with SplitSlideIn from Left & Right */
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 36,
              marginTop: 40,
            }}
          >
            {/* Left Card: Claude Code (Slides from Left with subtle tilt & reactive shockwave/hop) */}
            <SplitSlideIn progress={card1Spring} from="left" distance={180} tiltAngle={-8}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `translate(${shockLeft.x}px, ${-cardHopY}px) rotate(${shockLeft.rot}deg)`,
                  transition: 'transform 0.05s ease',
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 38,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 36px rgba(26,24,22,0.08)',
                    border: `1px solid ${COLORS.line}`,
                  }}
                >
                  <BrandLogo name="claude-code" size={96} />
                </div>
                <span
                  style={{
                    marginTop: 18,
                    fontFamily: FONTS.title,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.ink,
                  }}
                >
                  Claude Code
                </span>
                {/* Checkmark Stamp Pop */}
                <div
                  style={{
                    marginTop: 12,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: COLORS.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: checkSpring,
                    transform: `scale(${checkSpring})`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </SplitSlideIn>

            {/* "hoặc" drops from Top with mechanical drop */}
            <StampDropIn progress={hoacSpring} dropDistance={-60}>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 22,
                  fontWeight: 600,
                  color: COLORS.subtle,
                  marginBottom: 40,
                }}
              >
                hoặc
              </div>
            </StampDropIn>

            {/* Right Card: Codex (Slides from Right with subtle tilt & reactive shockwave/hop) */}
            <SplitSlideIn progress={card2Spring} from="right" distance={180} tiltAngle={8}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `translate(${shockRight.x}px, ${-cardHopY}px) rotate(${shockRight.rot}deg)`,
                  transition: 'transform 0.05s ease',
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 38,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 36px rgba(26,24,22,0.08)',
                    border: `1px solid ${COLORS.line}`,
                  }}
                >
                  <BrandLogo name="codex" size={96} />
                </div>
                <span
                  style={{
                    marginTop: 18,
                    fontFamily: FONTS.title,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.ink,
                  }}
                >
                  Codex
                </span>
                {/* Checkmark Stamp Pop */}
                <div
                  style={{
                    marginTop: 12,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: COLORS.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: checkSpring,
                    transform: `scale(${checkSpring})`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </SplitSlideIn>
          </div>
        ) : frame < 78 ? (
          /* Beat 2 Sub-beat A: Google Search & Suggestion Icons */
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Google Logo with 3D Flip */}
            <Flip3DIn progress={beat2Entrance} axis="Y" initialAngle={-70}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 26,
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 30px rgba(26, 24, 22, 0.08)',
                  border: `1px solid ${COLORS.line}`,
                  marginBottom: 28,
                }}
              >
                <BrandLogo name="google" size={62} />
              </div>
            </Flip3DIn>

            {/* Search Pill Input with expanding width */}
            <div
              style={{
                width: interpolate(beat2Entrance, [0, 1], [220, 580], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                height: 74,
                borderRadius: 40,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 40px rgba(26, 24, 22, 0.09), 0 2px 6px rgba(26,24,22,0.04)',
                border: `1px solid ${COLORS.line}`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 28,
                paddingRight: 28,
                boxSizing: 'border-box',
                gap: 16,
                overflow: 'hidden',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.subtle} strokeWidth="2.5" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 28,
                  fontWeight: 600,
                  color: COLORS.ink,
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{currentTypedText}</span>
                {isCaretVisible && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2.5,
                      height: 28,
                      backgroundColor: COLORS.accent,
                      marginLeft: 2,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Suggested App Icons */}
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginTop: 32,
              }}
            >
              <SplitSlideIn progress={claudeIconSpring} from="bottom" distance={40}>
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 22,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 26px rgba(26, 24, 22, 0.08)',
                    border: `1px solid ${COLORS.line}`,
                  }}
                >
                  <BrandLogo name="claude" size={52} />
                </div>
              </SplitSlideIn>

              <SplitSlideIn progress={gptIconSpring} from="bottom" distance={40}>
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 22,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 26px rgba(26, 24, 22, 0.08)',
                    border: `1px solid ${COLORS.line}`,
                  }}
                >
                  <BrandLogo name="chatgpt" size={52} />
                </div>
              </SplitSlideIn>
            </div>
          </div>
        ) : (
          /* Beat 2 Sub-beat B: Real Webpage Download Claude Card with Dynamic Zoom & Simulated Cursor */
          <Flip3DIn progress={webCardSpring} axis="X" initialAngle={25}>
            <div
              style={{
                position: 'relative',
                width: 760,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                border: `1px solid ${COLORS.line}`,
                boxShadow: '0 24px 60px rgba(26, 24, 22, 0.12)',
                overflow: 'hidden',
              }}
            >
              {/* Browser top bar */}
              <div
                style={{
                  height: 48,
                  backgroundColor: '#F7F6F3',
                  borderBottom: `1px solid ${COLORS.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                  gap: 14,
                }}
              >
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
                </div>
                <div
                  style={{
                    marginLeft: 14,
                    height: 28,
                    borderRadius: 6,
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${COLORS.line}`,
                    padding: '0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: COLORS.subtle,
                  }}
                >
                  claude.ai/download
                </div>
              </div>

              {/* Webpage Content with Dynamic Pan & Zoom into Windows Download Button */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 380,
                  overflow: 'hidden',
                  backgroundColor: '#FAF8F5',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: `scale(${interpolate(frame, [86, 104], [1.0, 1.45], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) })}) translate(${interpolate(frame, [86, 104], [0, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px, ${interpolate(frame, [86, 104], [0, -30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    transformOrigin: 'center center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Img
                    src={staticFile('ai agent/Claude Download.png')}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Simulated Cursor moving to Download for Windows and clicking */}
                {frame >= 80 && (
                  <>
                    <SimulatedCursor
                      x={interpolate(frame, [82, 102], [540, 310], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) })}
                      y={interpolate(frame, [82, 102], [320, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) })}
                      isClicking={frame >= 104 && frame <= 112}
                    />
                    {frame >= 104 && (
                      <ClickRipple
                        x={310}
                        y={240}
                        progress={interpolate(frame, [104, 116], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                        color={COLORS.accent}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </Flip3DIn>
        )}
      </div>
    </AbsoluteFill>
  );
};
