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

export const Scene5ExampleContentCreator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headlines
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });
  const idleFloat = continuousFloat(frame, 0.05, 3);

  // Phase 1: 3 Big Cards Enter (Staggered fast so all 3 are fully visible early)
  // Left: Studio Microphone (Tông văn)
  const micEnter = spring({ frame: Math.max(0, frame - 6), fps, config: SPRINGS.elastic });
  const micWave = Math.sin(frame * 0.35) * 8;

  // Center: Open Manuscript (Bài mẫu)
  const bookEnter = spring({ frame: Math.max(0, frame - 18), fps, config: SPRINGS.elastic });
  const pageFlutter = Math.sin(frame * 0.25) * 4;

  // Right: Checklist with Magnifier (Checklist)
  const checkEnter = spring({ frame: Math.max(0, frame - 30), fps, config: SPRINGS.elastic });

  // Phase 2: Merge Animation (Frame 68 to 86)
  // The two outer cards (Left & Right) move inward into the center card!
  const mergeProgress = spring({
    frame: Math.max(0, frame - 68),
    fps,
    config: { mass: 0.8, damping: 13, stiffness: 140 },
  });

  const leftX = interpolate(mergeProgress, [0, 1], [-275, 0]);
  const leftRot = interpolate(mergeProgress, [0, 1], [0, 14]);
  const leftOp = interpolate(mergeProgress, [0, 0.85, 1], [1, 0.9, 0]);

  const rightX = interpolate(mergeProgress, [0, 1], [275, 0]);
  const rightRot = interpolate(mergeProgress, [0, 1], [0, -14]);
  const rightOp = interpolate(mergeProgress, [0, 0.85, 1], [1, 0.9, 0]);

  // Center card reacts to incoming cards
  const centerScaleBefore = interpolate(mergeProgress, [0, 0.8, 1], [1, 1.08, 0]);

  // Phase 3: The Unified Skill Emerges from Fusion (Frame 86 onwards)
  const isFused = frame >= 85;
  const fuseSpring = spring({
    frame: Math.max(0, frame - 85),
    fps,
    config: SPRINGS.elastic,
  });
  const fuseScale = interpolate(fuseSpring, [0, 1], [0.75, 1.08]);
  const fuseRecoil = dampedOscillation(frame, 85, 20, 14, 0.75, 0.22);

  // Exit transition
  const exitProgress = spring({ frame: Math.max(0, frame - 142), fps, config: SPRINGS.snappy });
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
        paddingTop: 170,
        opacity: exitOpacity,
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    >
      <EyebrowHeader
        icon={<FaIcon icon="feather-pointed" size={26} color={COLORS.accent} />}
        tag="VÍ DỤ THỰC TẾ"
        stepNum="05"
      />

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
            Ví dụ thực tế: <br />
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>Người Viết Content</span>
          </div>
        </MaskReveal>
      </div>

      {/* Main Stage: 3 Big Cards Merging into Center */}
      <div
        style={{
          position: 'relative',
          width: 860,
          height: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Shockwave Rings on Fusion Point (Frame 85) */}
        {isFused &&
          [85, 97].map((trig, i) => {
            const rel = frame - trig;
            if (rel < 0 || rel > 22) return null;
            const rScale = interpolate(rel, [0, 22], [0.6, 2.4]);
            const rOp = interpolate(rel, [0, 22], [0.8, 0]);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  border: `3.5px solid ${COLORS.accent}`,
                  transform: `scale(${rScale})`,
                  opacity: rOp,
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              />
            );
          })}

        {/* Phase 1 & 2: The 3 Cards before and during merge */}
        {!isFused && (
          <>
            {/* Card 1 (LEFT): TÔNG VĂN -> Slides to Center */}
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `translate(${leftX}px, ${idleFloat}px) rotate(${leftRot}deg) scale(${micEnter})`,
                opacity: leftOp,
                zIndex: 15,
              }}
            >
              {/* Big Mic Prop */}
              <div
                style={{
                  position: 'relative',
                  width: 170,
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Acoustic Soundwave Rings */}
                {[1, 2].map((ring) => (
                  <div
                    key={ring}
                    style={{
                      position: 'absolute',
                      width: 120 + ring * 40 + micWave,
                      height: 120 + ring * 40 + micWave,
                      borderRadius: '50%',
                      border: '2px solid rgba(198, 83, 42, 0.25)',
                      opacity: 0.8 - ring * 0.3,
                    }}
                  />
                ))}

                <div
                  style={{
                    width: 124,
                    height: 160,
                    borderRadius: 56,
                    backgroundColor: '#FFFFFF',
                    border: `3.5px solid ${COLORS.accent}`,
                    boxShadow: '0 20px 45px rgba(198, 83, 42, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaIcon icon="microphone" size={60} color={COLORS.accent} />
                </div>
              </div>

              {/* Bold Big Title (NO Subtitle!) */}
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 24,
                  fontWeight: 900,
                  color: COLORS.ink,
                  letterSpacing: '0.06em',
                  marginTop: 14,
                }}
              >
                TÔNG VĂN
              </div>
            </div>

            {/* Card 2 (CENTER): BÀI MẪU -> Receives Left and Right */}
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `translate(0px, ${idleFloat}px) scale(${bookEnter * centerScaleBefore})`,
                opacity: centerScaleBefore,
                zIndex: 12,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 175,
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 175,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    border: `3.5px solid ${COLORS.accent}`,
                    boxShadow: '0 20px 45px rgba(198, 83, 42, 0.22)',
                    padding: '20px 18px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    transform: `rotate(${pageFlutter}deg)`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '2px dashed #E5DDD1', paddingBottom: 8 }}>
                    <FaIcon icon="scroll" size={22} color={COLORS.accent} />
                    <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, color: COLORS.accent }}>SAMPLE.MD</span>
                  </div>
                  <div style={{ height: 8, width: '92%', backgroundColor: '#2B2622', borderRadius: 4 }} />
                  <div style={{ height: 8, width: '74%', backgroundColor: '#6B6259', borderRadius: 4 }} />
                  <div style={{ height: 8, width: '86%', backgroundColor: '#9C9184', borderRadius: 4 }} />
                </div>
              </div>

              {/* Bold Big Title (NO Subtitle!) */}
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 24,
                  fontWeight: 900,
                  color: COLORS.ink,
                  letterSpacing: '0.06em',
                  marginTop: 14,
                }}
              >
                BÀI MẪU
              </div>
            </div>

            {/* Card 3 (RIGHT): CHECKLIST -> Slides to Center */}
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `translate(${rightX}px, ${idleFloat}px) rotate(${rightRot}deg) scale(${checkEnter})`,
                opacity: rightOp,
                zIndex: 15,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 175,
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 175,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    border: `3.5px solid ${COLORS.accent}`,
                    boxShadow: '0 20px 45px rgba(198, 83, 42, 0.22)',
                    padding: '20px 18px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {[1, 2, 3].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <FaIcon icon="circle-check" size={18} color="#16A34A" />
                      <div style={{ height: 7, width: 75, backgroundColor: '#E5DDD1', borderRadius: 3.5 }} />
                    </div>
                  ))}
                </div>

                {/* Magnifying Glass floating over checklist */}
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 4,
                    transform: 'rotate(-18deg)',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                  }}
                >
                  <FaIcon icon="magnifying-glass" size={44} color={COLORS.accent} />
                </div>
              </div>

              {/* Bold Big Title (NO Subtitle!) */}
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 24,
                  fontWeight: 900,
                  color: COLORS.ink,
                  letterSpacing: '0.06em',
                  marginTop: 14,
                }}
              >
                CHECKLIST
              </div>
            </div>
          </>
        )}

        {/* Phase 3: The Unified Skill Formed from the 3 Merged Cards! */}
        {isFused && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `translateY(${idleFloat + fuseRecoil}px) scale(${fuseScale})`,
              zIndex: 30,
            }}
          >
            <div
              style={{
                width: 380,
                padding: '30px 36px',
                backgroundColor: '#FFFFFF',
                borderRadius: 32,
                border: `4px solid ${COLORS.accent}`,
                boxShadow: '0 28px 70px rgba(198, 83, 42, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 18,
              }}
            >
              {/* Glowing Bolt Badge */}
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 26,
                  backgroundColor: COLORS.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 26px rgba(198, 83, 42, 0.45)',
                }}
              >
                <FaIcon icon="bolt" size={48} color="#FFFFFF" />
              </div>

              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: FONTS.title,
                    fontSize: 30,
                    fontWeight: 900,
                    color: COLORS.ink,
                  }}
                >
                  Skill: Viết Content
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    color: COLORS.accent,
                    fontWeight: 900,
                    marginTop: 6,
                    letterSpacing: '0.08em',
                  }}
                >
                  ● ĐÃ HỢP NHẤT THÀNH 1 SKILL
                </div>
              </div>

              {/* The 3 Fused Badges */}
              <div style={{ display: 'flex', gap: 12 }}>
                {['Tông văn', 'Bài mẫu', 'Checklist'].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 12,
                      fontWeight: 900,
                      backgroundColor: 'rgba(198, 83, 42, 0.12)',
                      color: COLORS.accent,
                      padding: '6px 14px',
                      borderRadius: 100,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
