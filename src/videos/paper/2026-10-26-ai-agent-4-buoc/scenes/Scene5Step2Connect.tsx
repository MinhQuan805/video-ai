import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AppCard, COLORS, EyebrowHeader, FONTS, MaskReveal, RobotHero, SplitSlideIn, StampDropIn } from './common';

export const Scene5Step2Connect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part A: Step 2 Badge (frames 0 - 26)
  const badgeSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 11, stiffness: 180 },
  });

  const partATitleProgress = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Part B: Diagram entrance (frames 26 - 94)
  const diagramSpring = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // 4 Wire drawing progressions (0 to 1) with smooth cascade
  const wire1Progress = interpolate(frame, [34, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wire2Progress = interpolate(frame, [42, 54], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wire3Progress = interpolate(frame, [50, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wire4Progress = interpolate(frame, [58, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // App highlight states
  const isGmailConnected = wire1Progress >= 1;
  const isCalendarConnected = wire2Progress >= 1;
  const isDriveConnected = wire3Progress >= 1;
  const isNotionConnected = wire4Progress >= 1;

  // Staggered bounce springs for cards when wire connects
  const bounce1 = spring({ frame: Math.max(0, frame - 46), fps, config: { mass: 0.4, damping: 9, stiffness: 220 } });
  const bounce2 = spring({ frame: Math.max(0, frame - 54), fps, config: { mass: 0.4, damping: 9, stiffness: 220 } });
  const bounce3 = spring({ frame: Math.max(0, frame - 62), fps, config: { mass: 0.4, damping: 9, stiffness: 220 } });
  const bounce4 = spring({ frame: Math.max(0, frame - 70), fps, config: { mass: 0.4, damping: 9, stiffness: 220 } });

  // Reactive recoil physics: Robot jolts/wiggles each time an app connects!
  const recoil = (hitFrame: number, amp: number = 1) => {
    if (frame < hitFrame) return 0;
    const elapsed = frame - hitFrame;
    if (elapsed > 18) return 0;
    return Math.sin(elapsed * 0.7) * Math.exp(-elapsed * 0.25) * amp;
  };

  const r1 = recoil(46, 1);
  const r2 = recoil(54, 1);
  const r3 = recoil(62, 1);
  const r4 = recoil(70, 1.4);

  const robotRecoilX = -r1 * 8 + r2 * 8 - r3 * 7 + r4 * 7;
  const robotRecoilY = -r1 * 6 - r2 * 6 + r3 * 7 + r4 * 7;
  const robotRecoilRot = -r1 * 4 + r2 * 4 - r3 * 3.5 + r4 * 3.5;
  const robotJump = spring({ frame: Math.max(0, frame - 71), fps, config: { mass: 0.4, damping: 9, stiffness: 240 } });
  const robotScaleExtra = frame >= 71 ? (1 - robotJump) * 0.12 : 0;

  // Center Robot coordinate: (320, 240) in a 640x480 coordinate box
  const centerRobotX = 320;
  const centerRobotY = 240;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 140,
        paddingLeft: 80,
        paddingRight: 80,
        boxSizing: 'border-box',
      }}
    >
      {frame < 26 ? (
        /* Part A: Step 2 Badge */
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 120,
          }}
        >
          <div style={{ marginBottom: 36 }}>
            <MaskReveal progress={badgeSpring} direction="down">
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 26,
                  fontWeight: 800,
                  color: COLORS.accent,
                  letterSpacing: '5px',
                  textTransform: 'uppercase',
                }}
              >
                BƯỚC 02
              </div>
            </MaskReveal>
          </div>

          {/* Black Squircle Card with Orange Plug - Stamp Drop In */}
          <StampDropIn progress={badgeSpring} dropDistance={-100}>
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 56,
                backgroundColor: '#1E1D1B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 48px rgba(26, 24, 22, 0.16)',
              }}
            >
              <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6" />
                <path d="M7 8h10v4a5 5 0 0 1-10 0V8z" />
                <path d="M12 17v5" />
              </svg>
            </div>
          </StampDropIn>

          <div style={{ marginTop: 44 }}>
            <MaskReveal progress={partATitleProgress} direction="up">
              <div
                style={{
                  fontFamily: FONTS.title,
                  fontSize: 76,
                  fontWeight: 800,
                  fontStyle: 'italic',
                  color: COLORS.ink,
                }}
              >
                Kết nối
              </div>
            </MaskReveal>
          </div>
        </div>
      ) : (
        /* Part B: Connecting Diagram */
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Eyebrow Header */}
          <EyebrowHeader
            icon={
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: '#1E1D1B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2.5">
                  <path d="M12 2v6M7 8h10v4a5 5 0 0 1-10 0V8zM12 17v5" />
                </svg>
              </div>
            }
            stepNum="02"
            tag="Kết nối"
          />

          {/* Headline with MaskReveal */}
          <div
            style={{
              width: '100%',
              maxWidth: 920,
              marginTop: 10,
            }}
          >
            <MaskReveal progress={diagramSpring} direction="up">
              <div
                style={{
                  fontFamily: FONTS.title,
                  fontSize: 68,
                  fontWeight: 800,
                  color: COLORS.ink,
                  lineHeight: 1.2,
                }}
              >
                Nối với{' '}
                <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
                  công cụ
                </span>
              </div>
            </MaskReveal>
          </div>

          {/* Sơ đồ kết nối có dây vẽ bezier */}
          <div
            style={{
              position: 'relative',
              width: 640,
              height: 520,
              marginTop: 50,
            }}
          >
            {/* SVG Canvas for drawing wires */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 5,
              }}
              viewBox="0 0 640 520"
            >
              {/* Wire 1: Robot to Gmail (Top Left) */}
              <path
                d="M 230 240 C 160 240, 140 160, 95 105"
                fill="none"
                stroke={COLORS.accent}
                strokeWidth="4"
                strokeDasharray="260"
                strokeDashoffset={260 * (1 - wire1Progress)}
                strokeLinecap="round"
              />
              {isGmailConnected && <circle cx="95" cy="105" r="5" fill={COLORS.accent} />}

              {/* Wire 2: Robot to Calendar (Top Right) */}
              <path
                d="M 410 240 C 480 240, 500 160, 545 105"
                fill="none"
                stroke={COLORS.accent}
                strokeWidth="4"
                strokeDasharray="260"
                strokeDashoffset={260 * (1 - wire2Progress)}
                strokeLinecap="round"
              />
              {isCalendarConnected && <circle cx="545" cy="105" r="5" fill={COLORS.accent} />}

              {/* Wire 3: Robot to Drive (Bottom Left) */}
              <path
                d="M 230 260 C 160 260, 140 340, 95 395"
                fill="none"
                stroke={COLORS.accent}
                strokeWidth="4"
                strokeDasharray="260"
                strokeDashoffset={260 * (1 - wire3Progress)}
                strokeLinecap="round"
              />
              {isDriveConnected && <circle cx="95" cy="395" r="5" fill={COLORS.accent} />}

              {/* Wire 4: Robot to Notion (Bottom Right) */}
              <path
                d="M 410 260 C 480 260, 500 340, 545 395"
                fill="none"
                stroke={COLORS.accent}
                strokeWidth="4"
                strokeDasharray="260"
                strokeDashoffset={260 * (1 - wire4Progress)}
                strokeLinecap="round"
              />
              {isNotionConnected && <circle cx="545" cy="395" r="5" fill={COLORS.accent} />}
            </svg>

            {/* Central Robot with Reactive Recoil & Jump */}
            <div
              style={{
                position: 'absolute',
                left: centerRobotX - 90,
                top: centerRobotY - 90,
                zIndex: 10,
                transform: `translate(${robotRecoilX}px, ${robotRecoilY}px) rotate(${robotRecoilRot}deg) scale(${diagramSpring + robotScaleExtra})`,
                opacity: diagramSpring,
              }}
            >
              <RobotHero size={180} />
            </div>

            {/* Top-Left: Gmail */}
            <div
              style={{
                position: 'absolute',
                left: 40,
                top: 50,
                zIndex: 10,
              }}
            >
              <SplitSlideIn progress={diagramSpring} from="left" distance={80} tiltAngle={-6}>
                <div style={{ transform: `scale(${isGmailConnected ? 1 + (1 - bounce1) * 0.12 : 1})` }}>
                  <AppCard name="gmail" size={100} highlight={isGmailConnected} />
                </div>
              </SplitSlideIn>
            </div>

            {/* Top-Right: Google Calendar */}
            <div
              style={{
                position: 'absolute',
                right: 40,
                top: 50,
                zIndex: 10,
              }}
            >
              <SplitSlideIn progress={diagramSpring} from="right" distance={80} tiltAngle={6}>
                <div style={{ transform: `scale(${isCalendarConnected ? 1 + (1 - bounce2) * 0.12 : 1})` }}>
                  <AppCard name="calendar" size={100} highlight={isCalendarConnected} />
                </div>
              </SplitSlideIn>
            </div>

            {/* Bottom-Left: Google Drive */}
            <div
              style={{
                position: 'absolute',
                left: 40,
                bottom: 70,
                zIndex: 10,
              }}
            >
              <SplitSlideIn progress={diagramSpring} from="left" distance={80} tiltAngle={-4}>
                <div style={{ transform: `scale(${isDriveConnected ? 1 + (1 - bounce3) * 0.12 : 1})` }}>
                  <AppCard name="drive" size={100} highlight={isDriveConnected} />
                </div>
              </SplitSlideIn>
            </div>

            {/* Bottom-Right: Notion */}
            <div
              style={{
                position: 'absolute',
                right: 40,
                bottom: 70,
                zIndex: 10,
              }}
            >
              <SplitSlideIn progress={diagramSpring} from="right" distance={80} tiltAngle={4}>
                <div style={{ transform: `scale(${isNotionConnected ? 1 + (1 - bounce4) * 0.12 : 1})` }}>
                  <AppCard name="notion" size={100} highlight={isNotionConnected} />
                </div>
              </SplitSlideIn>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
