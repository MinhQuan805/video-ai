import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, MaskReveal, RobotHero } from './common';

const steps = ['Cài Agent', 'Kết nối', 'Giao việc', 'Đóng gói Skill'];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title1Progress = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const title2Progress = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const subProgress = interpolate(frame, [42, 54], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const robotSpring = spring({
    frame: Math.max(0, frame - 23), fps,
    config: { mass: 0.7, damping: 12, stiffness: 170 },
  });
  const exitProgress = interpolate(frame, [106, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.94]);
  const cardSpring = spring({
    frame: Math.max(0, frame - 56), fps,
    config: { mass: 0.65, damping: 13, stiffness: 155 },
  });

  return (
    <AbsoluteFill
      style={{
        width: 1080, height: 940, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingLeft: 140, paddingRight: 140,
        boxSizing: 'border-box', opacity: 1 - exitProgress, transform: `scale(${exitScale})`,
      }}
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MaskReveal progress={title1Progress} direction="up">
          <div style={{ fontFamily: FONTS.title, fontSize: 72, fontWeight: 800, lineHeight: 1.15, color: COLORS.ink }}>
            Tự tạo
          </div>
        </MaskReveal>
        <MaskReveal progress={title2Progress} direction="up">
          <div style={{ fontFamily: FONTS.title, fontSize: 72, fontWeight: 800, fontStyle: 'italic', lineHeight: 1.15, color: COLORS.accent }}>
            AI Agent
          </div>
        </MaskReveal>
        <div style={{ marginTop: 10 }}>
          <MaskReveal progress={subProgress} direction="up">
            <div style={{ fontFamily: FONTS.body, fontSize: 28, fontWeight: 600, color: COLORS.ink }}>
              chỉ với bốn bước
            </div>
          </MaskReveal>
        </div>
      </div>

      <div style={{ width: 720, height: 420, marginTop: 22, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: 4, transform: `translateY(${interpolate(robotSpring, [0, 1], [-56, 0])}px) scale(${robotSpring})` }}>
          <RobotHero size={142} blink={frame >= 48 && frame <= 52} />
        </div>
        <div style={{ marginTop: 8, fontFamily: FONTS.body, fontSize: 21, fontWeight: 700, color: COLORS.accent, opacity: interpolate(frame, [34, 43], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          Agent
        </div>

        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 28 }}>
          {steps.map((label, index) => {
            const progress = spring({ frame: Math.max(0, frame - 56 - index * 4), fps, config: { mass: 0.6, damping: 13, stiffness: 160 } });
            return (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: cardSpring, transform: `translateY(${(1 - progress) * 24}px) scale(${0.92 + progress * 0.08})` }}>
                <div style={{ width: '100%', height: 76, borderRadius: 18, backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.line}`, boxShadow: '0 10px 24px rgba(26,24,22,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', boxSizing: 'border-box', textAlign: 'center' }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: 20, lineHeight: 1.2, fontWeight: 750, color: COLORS.ink }}>{label}</span>
                </div>
                <div style={{ width: 42, height: 34, borderRadius: 11, backgroundColor: '#1E1D1B', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,0.12)' }}>
                  <span style={{ fontFamily: FONTS.title, fontWeight: 800, fontSize: 19, color: COLORS.accent }}>{`0${index + 1}`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
