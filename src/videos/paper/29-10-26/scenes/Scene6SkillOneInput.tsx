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

export const Scene6SkillOneInput: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headlines
  const titleProgress = spring({ frame, fps, config: SPRINGS.snappy });
  const idleFloat = continuousFloat(frame, 0.05, 3);

  // Phase 1: 2 Minimal Input Capsules fall from top into the Skill Engine
  // Capsule 1: CHỦ ĐỀ (Frame 12)
  const cap1 = spring({ frame: Math.max(0, frame - 12), fps, config: SPRINGS.elastic });
  const cap1Y = interpolate(cap1, [0, 0.7, 1], [-140, 0, 40]);
  const cap1Scale = interpolate(cap1, [0, 0.6, 0.9, 1], [0.6, 1.05, 0.8, 0]);
  const cap1Op = interpolate(cap1, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);

  // Capsule 2: NGUYÊN LIỆU THÔ (Frame 24)
  const cap2 = spring({ frame: Math.max(0, frame - 24), fps, config: SPRINGS.elastic });
  const cap2Y = interpolate(cap2, [0, 0.7, 1], [-140, 0, 40]);
  const cap2Scale = interpolate(cap2, [0, 0.6, 0.9, 1], [0.6, 1.05, 0.8, 0]);
  const cap2Op = interpolate(cap2, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);

  // Engine Processing & Piston Recoil (Frame 38)
  const engineRecoil = dampedOscillation(frame, 38, 16, 10, 0.8);
  const gearSpin = interpolate(frame, [25, 75], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const isProcessed = frame >= 45;

  // Phase 2: Finished Editorial Article slides out from bottom slot (Frame 48)
  const paperSlide = spring({ frame: Math.max(0, frame - 48), fps, config: SPRINGS.elastic });
  const paperY = interpolate(paperSlide, [0, 1], [-60, 110]);
  const paperScale = interpolate(paperSlide, [0, 1], [0.75, 1.0]);

  // Phase 3: Red Wax Seal Stamp slams down on the article corner (Frame 74)
  const stampSpring = spring({ frame: Math.max(0, frame - 74), fps, config: SPRINGS.bouncy });
  const stampRecoil = dampedOscillation(frame, 80, 14, 8, 0.9);

  // Exit transition
  const exitProgress = spring({ frame: Math.max(0, frame - 140), fps, config: SPRINGS.snappy });
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
        icon={<FaIcon icon="bolt" size={26} color={COLORS.accent} />}
        tag="THỰC THI TỐI GIẢN"
        stepNum="06"
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
            Chỉ 1 Dòng Lệnh <br />
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>với chủ đề & ý thô</span>
          </div>
        </MaskReveal>
      </div>

      {/* Main Stage: Automated Content Factory */}
      <div
        style={{
          position: 'relative',
          width: 860,
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Falling Input Capsule 1: CHỦ ĐỀ */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 200,
            transform: `translateY(${cap1Y}px) scale(${cap1Scale})`,
            opacity: cap1Op,
            zIndex: 30,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: `2.5px solid ${COLORS.accent}`,
              borderRadius: 100,
              padding: '12px 24px',
              boxShadow: '0 10px 24px rgba(198, 83, 42, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <FaIcon icon="lightbulb" size={20} color={COLORS.accent} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 900, color: COLORS.accent }}>
              CHỦ ĐỀ
            </span>
          </div>
        </div>

        {/* Falling Input Capsule 2: NGUYÊN LIỆU THÔ */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 200,
            transform: `translateY(${cap2Y}px) scale(${cap2Scale})`,
            opacity: cap2Op,
            zIndex: 30,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: `2.5px solid ${COLORS.accent}`,
              borderRadius: 100,
              padding: '12px 24px',
              boxShadow: '0 10px 24px rgba(198, 83, 42, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <FaIcon icon="pencil" size={20} color={COLORS.accent} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 900, color: COLORS.accent }}>
              Ý THÔ
            </span>
          </div>
        </div>

        {/* Finished Output Article (Ejected from bottom slot, slides down) */}
        <div
          style={{
            position: 'absolute',
            transform: `translateY(${paperY + idleFloat}px) scale(${paperScale})`,
            opacity: paperSlide,
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 580,
              backgroundColor: '#FFFFFF',
              borderRadius: 22,
              border: '2px solid rgba(26,24,22,0.12)',
              boxShadow: '0 24px 50px rgba(60, 48, 36, 0.16)',
              padding: '24px 28px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {/* Top Article Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px dashed #E5DDD1', paddingBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaIcon icon="newspaper" size={18} color={COLORS.accent} />
                <span style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 800, color: COLORS.ink }}>
                  BÀI VIẾT HOÀN TẤT
                </span>
              </div>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: '#16A34A', fontWeight: 800 }}>
                ● 100% TIÊU CHÍ
              </span>
            </div>

            {/* Headline and Mock Paragraph ink lines */}
            <div style={{ fontFamily: FONTS.title, fontSize: 22, fontWeight: 800, color: COLORS.ink }}>
              Chiến Lược Tăng Trưởng Nội Dung 2026
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              <div style={{ height: 8, width: '94%', backgroundColor: '#2B2622', borderRadius: 4 }} />
              <div style={{ height: 8, width: '85%', backgroundColor: '#4A413B', borderRadius: 4 }} />
              <div style={{ height: 8, width: '90%', backgroundColor: '#7C6E5E', borderRadius: 4 }} />
            </div>

            {/* Official Wax Seal Stamp in Bottom Corner */}
            {stampSpring > 0 && (
              <div
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 16,
                  transform: `scale(${interpolate(stampSpring, [0, 0.6, 1], [2.2, 0.9, 1])}) translateY(${stampRecoil}px) rotate(-8deg)`,
                  zIndex: 25,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    backgroundColor: COLORS.accent,
                    border: '3px solid #8A3314',
                    boxShadow: '0 8px 20px rgba(198, 83, 42, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaIcon icon="circle-check" size={24} color="#FFFFFF" />
                  <span style={{ fontFamily: FONTS.mono, fontSize: 8, fontWeight: 900, color: '#FFFFFF', marginTop: 2 }}>
                    CHUẨN GU
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Central Skill Processing Engine (Sits in front, operates inputs) */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            width: 480,
            height: 140,
            backgroundColor: '#FAF7F0',
            borderRadius: 24,
            border: `2.5px solid ${isProcessed ? COLORS.accent : '#C8BCAB'}`,
            boxShadow: '0 16px 40px rgba(60, 48, 36, 0.15)',
            padding: '16px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: `translateY(${idleFloat + engineRecoil}px)`,
            zIndex: 20,
          }}
        >
          {/* Left: Input Funnel Port */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: 'rgba(198, 83, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ transform: `rotate(${gearSpin}deg)` }}>
                <FaIcon icon="gear" size={26} color={COLORS.accent} />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 900, color: COLORS.ink }}>
                SKILL PROCESSOR
              </div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: isProcessed ? '#16A34A' : '#D97706', fontWeight: 800 }}>
                {isProcessed ? '● GENERATION DONE' : 'WAITING INPUT...'}
              </div>
            </div>
          </div>

          {/* Right: Automated Arrow Down to Ejection Slot */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: isProcessed ? COLORS.accent : '#E5DDD1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isProcessed ? '0 4px 12px rgba(198, 83, 42, 0.35)' : 'none',
            }}
          >
            <FaIcon icon="arrow-down" size={20} color={isProcessed ? '#FFFFFF' : '#8A7D6B'} />
          </div>
        </div>
      </div>
    </div>
  );
};
