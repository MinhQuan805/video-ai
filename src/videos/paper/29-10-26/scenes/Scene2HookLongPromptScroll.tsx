import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  COLORS,
  EyebrowHeader,
  FaIcon,
  FONTS,
  MaskReveal,
  SPRINGS,
} from './common';

export const Scene2HookLongPromptScroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline entrance
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });

  // Continuous mechanical gear spinning at bottom roller
  const gearSpeed = interpolate(frame, [0, 80, 180], [5, 9, 14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gearRotation = (frame * gearSpeed) % 360;

  // Paper feed: emerges from bottom roller and flows UPWARDS slowly and steadily
  // Progressively feeds out across the entire narration (frame 15 to 175)
  const paperFeedProgress = interpolate(frame, [15, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Paper height as it emerges upward from the bottom dispenser slot (0 to 410px)
  const paperHeight = interpolate(paperFeedProgress, [0, 1], [0, 410]);
  const paperFlutter = Math.sin(frame * 0.25) * 1.5;

  // Length measurement counter (0m -> 120m)
  const lengthMeters = Math.round(
    interpolate(paperFeedProgress, [0, 1], [0, 120], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Ruler pointer sliding indicator (tracking meters from bottom up in lockstep with paper height)
  // Starts at 12% at bottom (0m), moves upward towards 84% as paper height increases
  const rulerNeedleBottom = interpolate(paperFeedProgress, [0, 1], [12, 84], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Exit transition
  const exitProgress = spring({
    frame: Math.max(0, frame - 188),
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
        paddingTop: 160,
        opacity: exitOpacity,
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    >
      <EyebrowHeader
        icon={<FaIcon icon="gear" size={26} color={COLORS.accent} />}
        tag="HỘI CHỨNG MEGA-PROMPT"
        stepNum="02"
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
            Câu lệnh <span style={{ fontStyle: 'italic', color: COLORS.accent }}>dài vô tận</span>
          </div>
        </MaskReveal>
      </div>

      {/* Stage: Left Ruler + Bottom Roller with Paper Flowing Upward */}
      <div
        style={{
          position: 'relative',
          width: 880,
          height: 480,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Left Side: Drafting Ruler Gauge with Indicator Needle climbing from bottom to top */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            bottom: 20,
            width: 90,
            backgroundColor: '#ECE3D3',
            borderRadius: 18,
            border: `2px solid ${COLORS.line}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 8px',
            boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
            zIndex: 30,
          }}
        >
          {/* Active Sliding Needle Arrow (moves from bottom up) */}
          <div
            style={{
              position: 'absolute',
              right: -10,
              bottom: `${rulerNeedleBottom}%`,
              transform: 'translateY(50%)',
              display: 'flex',
              alignItems: 'center',
              zIndex: 35,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                borderRight: `10px solid ${COLORS.accent}`,
              }}
            />
          </div>

          <div style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 900, color: COLORS.accent }}>
            {lengthMeters}m
          </div>

          {/* Ruler notches */}
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 12, width: '100%', alignItems: 'flex-end', paddingRight: 6 }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 2,
                  width: i % 4 === 0 ? 32 : 16,
                  backgroundColor: COLORS.ink,
                  opacity: i % 4 === 0 ? 0.8 : 0.4,
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONTS.mono, fontSize: 14, fontWeight: 800, color: COLORS.accent }}>
            DÀI <FaIcon icon="ruler" size={14} color={COLORS.accent} />
          </div>
        </div>

        {/* Paper Printer Assembly */}
        <div
          style={{
            position: 'relative',
            width: 700,
            marginLeft: 80,
            height: '100%',
          }}
        >
          {/* Paper emerging and flowing UPWARD from the bottom slot */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: 20,
              right: 20,
              height: paperHeight,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px 24px 0 0',
                border: `2px solid ${COLORS.line}`,
                borderBottom: 'none',
                boxShadow: '0 -16px 40px rgba(0,0,0,0.09)',
                padding: '28px 32px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                transform: `rotate(${paperFlutter}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Prominent Header at leading edge */}
              <div style={{ borderBottom: `1.5px dashed ${COLORS.line}`, paddingBottom: 16 }}>
                <div style={{ fontFamily: FONTS.mono, fontSize: 14, color: COLORS.accent, fontWeight: 800 }}>
                  SYSTEM ROLE:
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 28, fontWeight: 800, color: COLORS.ink, marginTop: 4 }}>
                  "Chuyên gia 20 năm kinh nghiệm"
                </div>
              </div>

              {/* Requirement lines trailing behind */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ height: 10, width: '92%', backgroundColor: 'rgba(26,24,22,0.15)', borderRadius: 5 }} />
                <div style={{ height: 10, width: '78%', backgroundColor: 'rgba(26,24,22,0.12)', borderRadius: 5 }} />
                <div style={{ height: 10, width: '86%', backgroundColor: 'rgba(26,24,22,0.12)', borderRadius: 5 }} />
                <div style={{ height: 10, width: '64%', backgroundColor: 'rgba(26,24,22,0.1)', borderRadius: 5 }} />
              </div>

              {/* Endless repeating instructions flowing from bottom */}
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    height: 14,
                    backgroundColor: '#F3F4F6',
                    borderRadius: 4,
                    width: `${88 - (idx % 3) * 12}%`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Mechanical Dispenser Roller with Spinning Gears (Paper flows out from behind this) */}
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              height: 52,
              backgroundColor: '#B59E7D',
              borderRadius: 26,
              border: `2.5px solid #8C7355`,
              boxShadow: '0 12px 28px rgba(60, 45, 30, 0.22)',
              zIndex: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
            }}
          >
            <div style={{ transform: `rotate(${gearRotation}deg)` }}>
              <FaIcon icon="gear" size={24} color={COLORS.accent} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 140, height: 6, backgroundColor: COLORS.accent, borderRadius: 3, boxShadow: `0 0 8px ${COLORS.accent}` }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 800, color: '#4A3420' }}>
                FEEDING...
              </span>
            </div>
            <div style={{ transform: `rotate(${-gearRotation}deg)` }}>
              <FaIcon icon="gear" size={24} color={COLORS.accent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
