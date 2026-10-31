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

export const Scene4SolutionSkillIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headlines
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });

  // Center Skill Core Disk entrance
  const coreSpring = spring({ frame: Math.max(0, frame - 8), fps, config: SPRINGS.elastic });
  const idleFloat = continuousFloat(frame, 0.05, 3);

  // 3 Knowledge Cartridges flying in and docking into the Core:
  // 1: HƯỚNG DẪN (From top-left towards center-left)
  const part1 = spring({ frame: Math.max(0, frame - 28), fps, config: SPRINGS.elastic });
  const part1X = interpolate(part1, [0, 1], [-280, -170]);
  const part1Y = interpolate(part1, [0, 1], [-140, -40]);
  const part1Rot = interpolate(part1, [0, 1], [-30, -10]);
  const recoil1 = dampedOscillation(frame, 38, 14, 6, 0.85);

  // 2: BÀI MẪU (From top-right towards center-right)
  const part2 = spring({ frame: Math.max(0, frame - 50), fps, config: SPRINGS.elastic });
  const part2X = interpolate(part2, [0, 1], [280, 170]);
  const part2Y = interpolate(part2, [0, 1], [-140, -40]);
  const part2Rot = interpolate(part2, [0, 1], [30, 10]);
  const recoil2 = dampedOscillation(frame, 60, 14, 6, 0.85);

  // 3: TÀI LIỆU (From bottom towards center-bottom)
  const part3 = spring({ frame: Math.max(0, frame - 72), fps, config: SPRINGS.elastic });
  const part3Y = interpolate(part3, [0, 1], [200, 110]);
  const recoil3 = dampedOscillation(frame, 82, 16, 8, 0.85);

  // Locking mechanism: Frame 100 clamps everything into 1 sealed unit
  const lockSpring = spring({ frame: Math.max(0, frame - 98), fps, config: SPRINGS.heavy });
  const isLocked = frame >= 106;
  const lockRecoil = dampedOscillation(frame, 106, 18, 10, 0.8);

  // Halo rotation when locked
  const coreRotation = interpolate(lockSpring, [0, 1], [0, 90]);

  // Exit transition
  const exitProgress = spring({ frame: Math.max(0, frame - 170), fps, config: SPRINGS.snappy });
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
        icon={<FaIcon icon="puzzle-piece" size={26} color={COLORS.accent} />}
        tag="ĐÓNG GÓI TRI THỨC"
        stepNum="04"
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
            Đóng gói tri thức <br />
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>thành Skill</span>
          </div>
        </MaskReveal>
      </div>

      {/* Main Open Stage: The Skill Core Assembly (Not a boring card!) */}
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
        {/* Shockwave Rings on Lock Frame */}
        {isLocked &&
          [106, 118].map((trig, i) => {
            const rel = frame - trig;
            if (rel < 0 || rel > 22) return null;
            const rScale = interpolate(rel, [0, 22], [0.8, 2.5]);
            const rOp = interpolate(rel, [0, 22], [0.8, 0]);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  border: `3px solid ${COLORS.accent}`,
                  transform: `scale(${rScale})`,
                  opacity: rOp,
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />
            );
          })}

        {/* Center Skill Core Base (Concentric Titanium & Brass Rings) */}
        <div
          style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            backgroundColor: '#FAF7F0',
            border: `3.5px solid ${isLocked ? COLORS.accent : '#C8BCAB'}`,
            boxShadow: isLocked
              ? '0 24px 60px rgba(198, 83, 42, 0.3), inset 0 0 24px rgba(198, 83, 42, 0.15)'
              : '0 20px 48px rgba(60, 48, 36, 0.14)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${idleFloat + recoil1 + recoil2 + recoil3 + lockRecoil}px) scale(${coreSpring})`,
            zIndex: 10,
          }}
        >
          {/* Internal Circuit Lines */}
          <div
            style={{
              position: 'absolute',
              width: 240,
              height: 240,
              borderRadius: '50%',
              border: `2px dashed ${isLocked ? COLORS.accent : 'rgba(26,24,22,0.15)'}`,
              transform: `rotate(${coreRotation}deg)`,
            }}
          />

          {/* Central Processor Core */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 32,
              backgroundColor: isLocked ? COLORS.accent : '#FFFFFF',
              border: `3px solid ${isLocked ? '#8A3314' : COLORS.accent}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transform: `scale(${isLocked ? 1.08 : 1.0})`,
              transition: 'background-color 0.15s ease',
            }}
          >
            <FaIcon
              icon={isLocked ? 'bolt' : 'microchip'}
              size={44}
              color={isLocked ? '#FFFFFF' : COLORS.accent}
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: '0.12em',
                color: isLocked ? '#FFFFFF' : COLORS.ink,
              }}
            >
              {isLocked ? 'SKILL CORE' : 'DOCKING...'}
            </span>
          </div>
        </div>

        {/* Cartridge 1: HƯỚNG DẪN (Blueprint / Workflow Module) */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${part1X}px, ${part1Y + idleFloat}px) rotate(${part1Rot}deg) scale(${part1})`,
            opacity: part1,
            zIndex: 15,
          }}
        >
          <div
            style={{
              width: 170,
              padding: '16px 14px',
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              border: `2px solid ${isLocked ? COLORS.accent : '#D1C4B2'}`,
              boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: 'rgba(198, 83, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaIcon icon="sliders" size={26} color={COLORS.accent} />
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                fontWeight: 900,
                color: COLORS.ink,
                letterSpacing: '0.05em',
              }}
            >
              HƯỚNG DẪN
            </div>
            {/* Guide rule lines */}
            <div style={{ width: '80%', height: 4, borderRadius: 2, backgroundColor: '#E5DDD1' }} />
          </div>
        </div>

        {/* Cartridge 2: BÀI MẪU (Examples / Manuscript Module) */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${part2X}px, ${part2Y + idleFloat}px) rotate(${part2Rot}deg) scale(${part2})`,
            opacity: part2,
            zIndex: 15,
          }}
        >
          <div
            style={{
              width: 170,
              padding: '16px 14px',
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              border: `2px solid ${isLocked ? COLORS.accent : '#D1C4B2'}`,
              boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: 'rgba(198, 83, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaIcon icon="scroll" size={26} color={COLORS.accent} />
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                fontWeight: 900,
                color: COLORS.ink,
                letterSpacing: '0.05em',
              }}
            >
              BÀI MẪU
            </div>
            <div style={{ width: '80%', height: 4, borderRadius: 2, backgroundColor: '#E5DDD1' }} />
          </div>
        </div>

        {/* Cartridge 3: TÀI LIỆU (Knowledge Reference Module) */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(0px, ${part3Y + idleFloat}px) scale(${part3})`,
            opacity: part3,
            zIndex: 15,
          }}
        >
          <div
            style={{
              width: 170,
              padding: '16px 14px',
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              border: `2px solid ${isLocked ? COLORS.accent : '#D1C4B2'}`,
              boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: 'rgba(198, 83, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaIcon icon="book" size={26} color={COLORS.accent} />
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                fontWeight: 900,
                color: COLORS.ink,
                letterSpacing: '0.05em',
              }}
            >
              TÀI LIỆU
            </div>
            <div style={{ width: '80%', height: 4, borderRadius: 2, backgroundColor: '#E5DDD1' }} />
          </div>
        </div>

        {/* Bottom Status Pill */}
        {isLocked && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              backgroundColor: COLORS.accent,
              borderRadius: 100,
              padding: '8px 24px',
              boxShadow: '0 6px 18px rgba(198, 83, 42, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 20,
            }}
          >
            <FaIcon icon="check" size={14} color="#FFFFFF" />
            <span style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.08em' }}>
              ĐÃ GÓI GỌN VÀO 1 SKILL
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
