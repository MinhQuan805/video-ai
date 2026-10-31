import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  COLORS,
  continuousFloat,
  EyebrowHeader,
  FaIcon,
  FONTS,
  MaskReveal,
  SPRINGS,
} from './common';

export const Scene7PromptVsSkill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headlines
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });

  // Two halves entrance
  const helmSpring = spring({ frame: Math.max(0, frame - 12), fps, config: SPRINGS.elastic });
  const gearsSpring = spring({ frame: Math.max(0, frame - 24), fps, config: SPRINGS.elastic });

  // Steering helm turning motion (swaying to steer)
  const helmAngle = Math.sin(frame * 0.08) * 22;

  // Clockwork gears rotation
  const gear1Angle = (frame * 5) % 360;
  const gear2Angle = -(frame * 7.5) % 360;

  // Kinetic pulse along the transmission line
  const pulseOffset = (frame * 6) % 100;

  // Floating idle
  const floatL = continuousFloat(frame, 0.05, 3);
  const floatR = continuousFloat(frame + 20, 0.05, 3);

  // Exit transition
  const exitProgress = spring({ frame: Math.max(0, frame - 175), fps, config: SPRINGS.snappy });
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
      }}
    >
      <EyebrowHeader
        icon={<FaIcon icon="scale-balanced" size={26} color={COLORS.accent} />}
        tag="NGUYÊN TẮC CỐT LÕI"
        stepNum="07"
      />

      <div style={{ textAlign: 'center', marginBottom: 24, padding: '0 60px' }}>
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
            Phân định rõ vai trò <br />
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>Prompt vs Skill</span>
          </div>
        </MaskReveal>
      </div>

      {/* Main Open Stage: Steering Helm (Prompt) <--- Transmission ---> Cogs Engine (Skill) */}
      <div
        style={{
          position: 'relative',
          width: 880,
          height: 520,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Kinetic Linkage Line between Helm and Gears */}
        <div
          style={{
            position: 'absolute',
            top: 240,
            left: 290,
            right: 290,
            height: 3,
            borderTop: '2.5px dashed rgba(198, 83, 42, 0.4)',
            zIndex: 5,
          }}
        >
          {/* Moving Kinetic Pulse Bead */}
          <div
            style={{
              position: 'absolute',
              top: -5,
              left: `${pulseOffset}%`,
              width: 13,
              height: 13,
              borderRadius: '50%',
              backgroundColor: COLORS.accent,
              boxShadow: '0 0 12px rgba(198, 83, 42, 0.85)',
            }}
          />
        </div>

        {/* LEFT: PROMPT (The Steering Helm / Bánh Lái) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${floatL}px) scale(${helmSpring})`,
            opacity: helmSpring,
            zIndex: 10,
          }}
        >
          {/* Tactile Brass Steering Helm */}
          <div
            style={{
              position: 'relative',
              width: 270,
              height: 270,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${helmAngle}deg)`,
            }}
          >
            {/* Outer Rim */}
            <div
              style={{
                position: 'absolute',
                width: 210,
                height: 210,
                borderRadius: '50%',
                border: `12px solid ${COLORS.accent}`,
                boxShadow: '0 12px 28px rgba(198, 83, 42, 0.2)',
                boxSizing: 'border-box',
              }}
            />

            {/* Inner Ring */}
            <div
              style={{
                position: 'absolute',
                width: 110,
                height: 110,
                borderRadius: '50%',
                border: `7px solid ${COLORS.accent}`,
                backgroundColor: '#FAF7F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <FaIcon icon="compass" size={40} color={COLORS.accent} />
            </div>

            {/* 8 Spokes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <div
                key={deg}
                style={{
                  position: 'absolute',
                  width: 7,
                  height: 250,
                  backgroundColor: COLORS.accent,
                  borderRadius: 3.5,
                  transform: `rotate(${deg}deg)`,
                  zIndex: -1,
                }}
              />
            ))}
          </div>

          {/* Description Badge */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.12em',
                color: COLORS.accent,
                backgroundColor: 'rgba(198, 83, 42, 0.15)',
                padding: '8px 24px',
                borderRadius: 100,
              }}
            >
              PROMPT
            </div>
          </div>
        </div>

        {/* RIGHT: SKILL (The Mechanical Gear Engine / Động Cơ) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${floatR}px) scale(${gearsSpring})`,
            opacity: gearsSpring,
            zIndex: 10,
          }}
        >
          {/* Interlocking Gears */}
          <div
            style={{
              position: 'relative',
              width: 270,
              height: 270,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Primary Large Gear */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 15,
                width: 175,
                height: 175,
                borderRadius: '50%',
                border: `10px dashed ${COLORS.accent}`,
                backgroundColor: 'rgba(198, 83, 42, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${gear1Angle}deg)`,
                boxShadow: '0 12px 24px rgba(198, 83, 42, 0.18)',
              }}
            >
              <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: COLORS.accent }} />
            </div>

            {/* Secondary Interlocking Gear */}
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: 15,
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: '8px dashed #1E1D1B',
                backgroundColor: 'rgba(30, 29, 27, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${gear2Angle}deg)`,
              }}
            >
              <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#1E1D1B' }} />
            </div>
          </div>

          {/* Description Badge */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.12em',
                color: COLORS.accent,
                backgroundColor: 'rgba(198, 83, 42, 0.15)',
                padding: '8px 24px',
                borderRadius: 100,
              }}
            >
              SKILL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
