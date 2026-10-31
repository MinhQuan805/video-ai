import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrandLogo, ClickRipple, COLORS, EyebrowHeader, Flip3DIn, FONTS, MaskReveal, SimulatedCursor } from './common';

export const Scene6ConnectorCatalog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 180 },
  });

  // Typing "Gmail" in the search box (frame 12 -> 34)
  const searchText = 'Gmail';
  const charsTyped = Math.max(0, Math.min(searchText.length, Math.floor((frame - 12) / 4)));
  const currentSearch = frame >= 12 ? searchText.slice(0, charsTyped) : '';

  // Cursor gliding to the + Add button
  const cursorX = interpolate(frame, [25, 48], [520, 815], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const cursorY = interpolate(frame, [25, 48], [140, 173], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const isClicking = frame >= 50 && frame <= 56;
  const isConnected = frame >= 52;
  const connectSpring = spring({
    frame: Math.max(0, frame - 52),
    fps,
    config: { mass: 0.4, damping: 9, stiffness: 240 },
  });

  const exitProgress = interpolate(frame, [65, 76], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.94]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 80,
        paddingRight: 80,
        paddingBottom: 180,
        boxSizing: 'border-box',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <div style={{ width: '100%', marginBottom: 24 }}>
        <EyebrowHeader
          icon={<BrandLogo name="gmail" size={32} />}
          stepNum="02"
          tag="Kết nối công cụ"
        />

        <div style={{ width: '100%', marginTop: 8 }}>
          <MaskReveal progress={enterSpring} direction="up">
            <div
              style={{
                fontFamily: FONTS.title,
                fontSize: 72,
                fontWeight: 800,
                color: COLORS.ink,
                lineHeight: 1.15,
              }}
            >
              Vào mục{' '}
              <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
                Connectors
              </span>
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Claude Connectors Dark Mode UI Window (matching frame 26-27) */}
      <div style={{ width: '100%', position: 'relative' }}>
        <Flip3DIn progress={enterSpring} axis="X" initialAngle={-15} style={{ width: "100%", display: "block" }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: `1px solid ${COLORS.line}`,
              boxShadow: '0 24px 56px rgba(26, 24, 22, 0.12)',
              overflow: 'hidden',
              padding: '24px 32px 36px 32px',
              boxSizing: 'border-box',
            }}
          >
            {/* Header: Title, Tabs & Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 20,
                borderBottom: `1px solid ${COLORS.line}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <span style={{ fontFamily: FONTS.body, fontSize: 24, fontWeight: 700, color: COLORS.ink }}>
                  Connectors
                </span>
                <div style={{ display: 'flex', gap: 6, backgroundColor: '#ECE5D8', padding: 4, borderRadius: 10 }}>
                  <span style={{ padding: '4px 12px', fontSize: 14, fontWeight: 600, color: COLORS.subtle, borderRadius: 7 }}>
                    Yours
                  </span>
                  <span style={{ padding: '4px 12px', fontSize: 14, fontWeight: 700, color: COLORS.ink, backgroundColor: '#FFFFFF', borderRadius: 7 }}>
                    Discover
                  </span>
                </div>
              </div>

              {/* Search Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: '#F4EFE6',
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 10,
                  padding: '8px 16px',
                  width: 260,
                }}
              >
                <span style={{ fontSize: 16, color: COLORS.subtle }}>🔍</span>
                <span style={{ fontFamily: FONTS.body, fontSize: 16, fontWeight: 500, color: COLORS.ink }}>
                  {currentSearch}
                  <span style={{ color: COLORS.accent, fontWeight: 700 }}>|</span>
                </span>
              </div>
            </div>

            {/* Category Subheader */}
            <div style={{ marginTop: 22, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: COLORS.subtle, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Top Connectors
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.subtle, backgroundColor: '#ECE5D8', padding: '2px 8px', borderRadius: 6 }}>
                50+
              </span>
            </div>

            {/* Connector Row 1: Gmail (Highlighted Target) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px',
                borderRadius: 16,
                backgroundColor: isConnected ? 'rgba(198, 83, 42, 0.10)' : '#F4EFE6',
                border: isConnected ? `1.5px solid ${COLORS.accent}` : `1px solid ${COLORS.line}`,
                marginBottom: 12,
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <BrandLogo name="gmail" size={44} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: FONTS.body, fontSize: 20, fontWeight: 700, color: COLORS.ink }}>
                      Gmail
                    </span>
                    <span style={{ fontSize: 14, color: '#10B981' }}>✓</span>
                  </div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.subtle, marginTop: 4 }}>
                    Draft replies, summarize threads & search inbox
                  </div>
                </div>
              </div>

              {/* Action Button: + or Connected */}
              {isConnected ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 10,
                    backgroundColor: COLORS.accent,
                    color: '#FFFFFF',
                    fontFamily: FONTS.body,
                    fontSize: 14,
                    fontWeight: 700,
                    transform: `scale(${connectSpring})`,
                    boxShadow: '0 4px 14px rgba(198,83,42,0.4)',
                  }}
                >
                  <span>✓</span>
                  <span>Đã kết nối</span>
                </div>
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: '#ECE5D8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.ink,
                    fontSize: 22,
                    fontWeight: 600,
                  }}
                >
                  +
                </div>
              )}
            </div>

            {/* Connector Row 2: Google Drive */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: '#F4EFE6',
                border: `1px solid ${COLORS.line}`,
                marginBottom: 12,
                opacity: 0.7,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <BrandLogo name="drive" size={40} />
                <div>
                  <span style={{ fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.ink }}>
                    Google Drive
                  </span>
                  <div style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.subtle, marginTop: 3 }}>
                    Search, read, and upload files instantly
                  </div>
                </div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#ECE5D8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.ink, fontSize: 18 }}>
                +
              </div>
            </div>

            {/* Connector Row 3: Google Calendar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: '#F4EFE6',
                border: `1px solid ${COLORS.line}`,
                opacity: 0.5,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <BrandLogo name="calendar" size={40} />
                <div>
                  <span style={{ fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.ink }}>
                    Google Calendar
                  </span>
                  <div style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.subtle, marginTop: 3 }}>
                    Manage schedule and coordinate meetings
                  </div>
                </div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#ECE5D8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.ink, fontSize: 18 }}>
                +
              </div>
            </div>

            {/* Gliding Cursor & Ripple */}
            <SimulatedCursor x={cursorX} y={cursorY} isClicking={isClicking} />
            {frame >= 50 && (
              <ClickRipple
                x={815}
                y={173}
                progress={interpolate(frame, [50, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                color={COLORS.accent}
              />
            )}
          </div>
        </Flip3DIn>
      </div>
    </AbsoluteFill>
  );
};
