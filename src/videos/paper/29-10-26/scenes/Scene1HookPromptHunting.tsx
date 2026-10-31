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

// List of incoming prompt letters flying into the chest
const INTAKE_PAPERS = [
  // Phase 1: Initial few gentle letters
  { id: 1, start: 36, fromX: -260, fromY: -100, targetX: 230, rot: -28 },
  { id: 2, start: 48, fromX: 280, fromY: -80, targetX: 350, rot: 24 },

  // Phase 2: Swarm of multiple letters pouring in
  { id: 3, start: 66, fromX: -360, fromY: -160, targetX: 190, rot: -36 },
  { id: 4, start: 71, fromX: 380, fromY: -140, targetX: 390, rot: 32 },
  { id: 5, start: 76, fromX: -280, fromY: -220, targetX: 250, rot: -22 },
  { id: 6, start: 81, fromX: 300, fromY: -200, targetX: 330, rot: 25 },
  { id: 7, start: 86, fromX: -390, fromY: -80, targetX: 170, rot: -32 },
  { id: 8, start: 91, fromX: 400, fromY: -90, targetX: 410, rot: 28 },
  { id: 9, start: 96, fromX: -240, fromY: -240, targetX: 270, rot: -16 },
  { id: 10, start: 101, fromX: 260, fromY: -230, targetX: 310, rot: 18 },
  { id: 11, start: 106, fromX: -340, fromY: -140, targetX: 220, rot: -26 },
  { id: 12, start: 112, fromX: 350, fromY: -130, targetX: 360, rot: 22 },
];

export const Scene1HookPromptHunting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations for headline
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });

  // Vault / Chest entrance with elastic drop
  const chestDrop = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRINGS.elastic,
  });
  const chestEnterY = interpolate(chestDrop, [0, 1], [-120, 0]);

  // Subtle continuous idle breathing of the chest
  const chestIdleFloat = continuousFloat(frame, 0.05, 4);

  // Lock pops open at frame 32
  const lockPop = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: SPRINGS.bouncy,
  });

  // Chest lid opens at frame 40 with spring hinge bounce
  const lidOpenSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: SPRINGS.elastic,
  });
  const lidWobble = dampedOscillation(frame, 48, 18, 8, 0.7);
  const lidOpenAngle = interpolate(lidOpenSpring, [0, 1], [0, -56]) + (frame < 134 ? lidWobble : 0);

  // Chest lid closes at frame 134 (after all letters have poured in)
  const lidCloseSpring = spring({
    frame: Math.max(0, frame - 134),
    fps,
    config: { mass: 0.9, damping: 13, stiffness: 220 },
  });
  const lidCloseAngle = interpolate(lidCloseSpring, [0, 1], [0, 56]);
  const lidSlamRecoil = dampedOscillation(frame, 142, 16, 4, 0.75, 0.25);

  // Combined lid angle
  const lidAngle = Math.min(0, lidOpenAngle + lidCloseAngle) + (frame >= 142 ? lidSlamRecoil : 0);

  // Lock latches shut at frame 146 (after lid is closed!)
  const isUnlocked = frame >= 36 && frame < 147;
  const lockSnap = spring({
    frame: Math.max(0, frame - 146),
    fps,
    config: SPRINGS.bouncy,
  });
  const lockScale =
    frame < 146
      ? interpolate(lockPop, [0, 0.5, 1], [1, 1.25, 1])
      : interpolate(lockSnap, [0, 0.4, 1], [1, 1.35, 1]);

  // Incremental chest scale: Starts at comfortable medium size (0.88),
  // then swells gradually step-by-step each time a letter lands inside!
  const BASE_SCALE = 0.88;
  let incrementalGrowth = 0;
  let landingTremor = 0;

  INTAKE_PAPERS.forEach((p) => {
    const landFrame = p.start + 14;
    if (frame >= landFrame) {
      // Each letter adds +0.026 to chest scale smoothly over 8 frames
      const step = interpolate(
        frame,
        [landFrame, landFrame + 8],
        [0, 0.026],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      incrementalGrowth += step;

      // Small elastic impact pulse when the letter hits the chamber
      const bump = dampedOscillation(frame, landFrame, 12, 0.016, 0.75, 0.24);
      landingTremor += bump;
    }
  });

  const chestSlamBump = dampedOscillation(frame, 142, 14, 0.022, 0.75, 0.22);
  const currentScale =
    BASE_SCALE + incrementalGrowth + landingTremor + (frame >= 142 ? chestSlamBump : 0);

  // Exit transition
  const exitProgress = spring({
    frame: Math.max(0, frame - 165),
    fps,
    config: SPRINGS.snappy,
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.94]);

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
        paddingTop: 170,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* Editorial Eyebrow Header */}
      <EyebrowHeader
        icon={<FaIcon icon="scroll" size={26} color={COLORS.accent} />}
        tag="KỶ NGUYÊN 2023 - 2024"
        stepNum="01"
      />

      {/* Main Headline */}
      <div style={{ textAlign: 'center', marginBottom: 20, padding: '0 60px' }}>
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
            Trào lưu <span style={{ fontStyle: 'italic', color: COLORS.accent }}>"Săn Prompt"</span>
          </div>
        </MaskReveal>
      </div>

      {/* Hero Visual: Medium Box swells gradually as letters pour into the dark chamber */}
      <div
        style={{
          position: 'relative',
          width: 780,
          height: 520,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* The Treasure Chest Container */}
        <div
          style={{
            position: 'relative',
            width: 580,
            height: 360,
            transform: `translateY(${chestEnterY + chestIdleFloat}px) scale(${currentScale})`,
            transformOrigin: 'center bottom',
            zIndex: 10,
          }}
        >
          {/* Shockwave Rings on key intake beats (emitting from chest mouth at top: 90) */}
          {[52, 78, 96, 114].map((trigger, i) => {
            const rel = frame - trigger;
            if (rel < 0 || rel > 20) return null;
            const ringScale = interpolate(rel, [0, 20], [0.6, 2.2]);
            const ringOpacity = interpolate(rel, [0, 20], [0.75, 0]);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 90,
                  left: '50%',
                  width: 220,
                  height: 60,
                  transform: `translateX(-50%) scale(${ringScale})`,
                  borderRadius: '50%',
                  border: `3px solid ${COLORS.accent}`,
                  opacity: ringOpacity,
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />
            );
          })}

          {/* Chest Interior Glow / Chamber (The dark opening under the lid) */}
          <div
            style={{
              position: 'absolute',
              top: 70,
              left: 44,
              right: 44,
              height: 48,
              backgroundColor: '#261C12',
              borderRadius: '50%',
              boxShadow: 'inset 0 6px 20px #000000, 0 10px 24px rgba(0,0,0,0.35)',
              zIndex: 6,
              opacity: interpolate(Math.abs(lidAngle), [0, 30], [0, 1], {
                extrapolateRight: 'clamp',
              }),
            }}
          />

          {/* Incoming Prompt Letters (zIndex: 7 -> Lands into chamber, BEHIND chest front wall zIndex: 8) */}
          {INTAKE_PAPERS.map((p) => {
            const fly = spring({
              frame: Math.max(0, frame - p.start),
              fps,
              config: { mass: 0.7, damping: 13, stiffness: 130 },
            });
            if (fly <= 0 || fly >= 1.05) return null;

            // Horizontal trajectory towards p.targetX inside chamber opening
            const curX = interpolate(fly, [0, 0.8, 1], [290 + p.fromX, p.targetX, p.targetX]);

            // Vertical arc plunging directly INTO the dark chamber opening (y = 96px to 120px)
            const arcY = Math.sin(Math.min(1, fly) * Math.PI) * -50;
            const curY = interpolate(fly, [0, 0.75, 1], [p.fromY, 92, 118]) + arcY;

            // Rotation aligns towards vertical as it slides into slot
            const curRot = interpolate(fly, [0, 0.7, 1], [p.rot, p.rot * 0.3, 0]);

            // Scale shrinks as it enters deep into the chamber
            const curScale = interpolate(fly, [0, 0.4, 0.85, 1], [0.65, 1.05, 0.8, 0.38]);

            // Opacity fades out right as it slips behind the front rim
            const curOp = interpolate(fly, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

            return (
              <div
                key={`paper-${p.id}`}
                style={{
                  position: 'absolute',
                  left: curX,
                  top: curY,
                  transform: `translate(-50%, -50%) rotate(${curRot}deg) scale(${curScale})`,
                  opacity: curOp,
                  zIndex: 7, // In front of dark chamber (z: 6), BEHIND chest front wall (z: 8)!
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 56,
                    backgroundColor: '#FFFFFF',
                    border: `2px solid ${COLORS.accent}`,
                    borderRadius: 10,
                    boxShadow: '0 8px 18px rgba(198, 83, 42, 0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <FaIcon icon="file" size={17} color={COLORS.accent} />
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 12,
                      fontWeight: 800,
                      color: COLORS.accent,
                    }}
                  >
                    PROMPT
                  </span>
                </div>
              </div>
            );
          })}

          {/* Chest Front Body (zIndex: 8 -> Hides lower part of letters as they slip into the chamber) */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 236,
              backgroundColor: '#E5D6C0',
              borderRadius: '18px 18px 30px 30px',
              border: `3px solid #B8A386`,
              boxShadow: '0 28px 56px rgba(26, 24, 22, 0.16)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 8,
            }}
          >
            {/* Metallic Gold Trim Straps */}
            <div
              style={{
                position: 'absolute',
                left: 70,
                top: 0,
                bottom: 0,
                width: 22,
                backgroundColor: COLORS.accent,
                opacity: 0.35,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 70,
                top: 0,
                bottom: 0,
                width: 22,
                backgroundColor: COLORS.accent,
                opacity: 0.35,
              }}
            />

            {/* Central Keyhole Badge with popping padlock (Bigger icon & latch snap) */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              {/* Latch snap ring when lock closes at frame 147 */}
              {frame >= 147 && (
                <div
                  style={{
                    position: 'absolute',
                    width: 104,
                    height: 104,
                    borderRadius: '50%',
                    border: `3px solid ${COLORS.accent}`,
                    transform: `scale(${interpolate(frame, [147, 162], [1, 1.7], {
                      extrapolateRight: 'clamp',
                    })})`,
                    opacity: interpolate(frame, [147, 162], [0.85, 0], {
                      extrapolateRight: 'clamp',
                    }),
                    pointerEvents: 'none',
                  }}
                />
              )}

              <div
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: `4.5px solid ${COLORS.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 28px rgba(198, 83, 42, 0.22)',
                  transform: `scale(${lockScale})`,
                }}
              >
                {isUnlocked ? (
                  <FaIcon icon="unlock" size={48} color={COLORS.accent} />
                ) : (
                  <FaIcon icon="lock" size={48} color={COLORS.accent} />
                )}
              </div>
            </div>

            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 15,
                fontWeight: 900,
                color: COLORS.accent,
                marginTop: 12,
                letterSpacing: '0.12em',
              }}
            >
              PROMPT VAULT
            </div>
          </div>

          {/* Chest Lid (Hinged at top-back, tilts open with 3D spring) */}
          <div
            style={{
              position: 'absolute',
              top: 30,
              left: -12,
              right: -12,
              height: 86,
              backgroundColor: '#D1BEA3',
              borderRadius: '26px 26px 10px 10px',
              border: `3px solid #A48E6E`,
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              transformOrigin: 'center top',
              transform: `rotateX(${lidAngle}deg)`,
              zIndex: 15,
            }}
          />
        </div>
      </div>
    </div>
  );
};
