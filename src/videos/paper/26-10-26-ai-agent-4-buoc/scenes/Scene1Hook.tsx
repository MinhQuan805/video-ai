import React from 'react';
import { faBox, faClipboardCheck, faMicrochip, faPlug } from '@fortawesome/free-solid-svg-icons';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FaIcon } from '../../../../shared/FaIcon';
import { AppCard, COLORS, FONTS, MaskReveal, RobotHero, StampDropIn } from './common';

const stepWidgets = [
  { label: 'Cài Agent', icon: faMicrochip },
  { label: 'Kết nối', icon: faPlug },
  { label: 'Giao việc', icon: faClipboardCheck },
  { label: 'Tạo skill', icon: faBox },
];

const cableCurves = [
  { start: { x: 220, y: 173 }, control1: { x: 152, y: 173 }, control2: { x: 157, y: 105 }, end: { x: 82, y: 98 } },
  { start: { x: 360, y: 173 }, control1: { x: 428, y: 173 }, control2: { x: 423, y: 105 }, end: { x: 498, y: 98 } },
  { start: { x: 220, y: 245 }, control1: { x: 152, y: 245 }, control2: { x: 157, y: 313 }, end: { x: 82, y: 330 } },
  { start: { x: 360, y: 245 }, control1: { x: 428, y: 245 }, control2: { x: 423, y: 313 }, end: { x: 498, y: 330 } },
];

const getCablePoint = (curve: typeof cableCurves[number], progress: number) => {
  const t = Math.max(0, Math.min(1, progress));
  const inverse = 1 - t;
  const weight0 = inverse ** 3;
  const weight1 = 3 * inverse ** 2 * t;
  const weight2 = 3 * inverse * t ** 2;
  const weight3 = t ** 3;
  return {
    x: weight0 * curve.start.x + weight1 * curve.control1.x + weight2 * curve.control2.x + weight3 * curve.end.x,
    y: weight0 * curve.start.y + weight1 * curve.control1.y + weight2 * curve.control2.y + weight3 * curve.end.y,
  };
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = (start: number, end: number) => interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const title1Progress = reveal(4, 16);
  const title2Progress = reveal(20, 32);
  const subProgress = reveal(38, 48);

  const robotSpring = spring({
    frame: Math.max(0, frame - 32), fps,
    config: { mass: 0.7, damping: 11, stiffness: 180 },
  });
  const agentLabelOpacity = reveal(38, 46);
  const isBlinking = frame >= 54 && frame <= 58;

  const connectionFrames = [52, 62, 72, 82];
  const cableProgress = connectionFrames.map((connectedAt) => reveal(connectedAt - 12, connectedAt));
  const appEntrances = [8, 12, 16, 20].map((appearsAt) => spring({
    frame: Math.max(0, frame - appearsAt), fps,
    config: { mass: 0.55, damping: 12, stiffness: 170 },
  }));
  const appRecoil = (connectedAt: number) => {
    const rel = frame - connectedAt;
    return rel >= 0 && rel < 20 ? Math.sin(rel * 0.72) * Math.exp(-rel * 0.17) : 0;
  };
  const stepEntrances = stepWidgets.map((_, index) => spring({
    frame: Math.max(0, frame - (86 + index * 4)), fps,
    config: { mass: 0.6, damping: 13, stiffness: 160 },
  }));

  const exitProgress = reveal(108, 120);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.95]);

  const appCards = [
    { name: 'gmail' as const, left: 29, top: 49 },
    { name: 'calendar' as const, left: 445, top: 49 },
    { name: 'drive' as const, left: 29, top: 281 },
    { name: 'sheets' as const, left: 445, top: 281 },
  ];
  return (
    <AbsoluteFill
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 220,
        opacity: 1 - exitProgress, transform: `scale(${exitScale})`, boxSizing: 'border-box',
      }}
    >
      <div style={{ textAlign: 'center', minHeight: 148, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 12, whiteSpace: 'nowrap' }}>
          <MaskReveal progress={title1Progress} direction="up">
            <div style={{ fontFamily: FONTS.title, fontSize: 68, fontWeight: 800, lineHeight: 1.12, color: COLORS.ink }}>
              Tự tạo
            </div>
          </MaskReveal>
          <MaskReveal progress={title2Progress} direction="up">
            <div style={{ fontFamily: FONTS.title, fontSize: 68, fontWeight: 800, fontStyle: 'italic', lineHeight: 1.12, color: COLORS.accent }}>
              AI Agent
            </div>
          </MaskReveal>
        </div>
        <div style={{ marginTop: 12 }}>
          <MaskReveal progress={subProgress} direction="up">
            <div style={{ fontFamily: FONTS.body, fontSize: 30, fontWeight: 600, color: COLORS.ink }}>
              chỉ với bốn bước
            </div>
          </MaskReveal>
        </div>
      </div>

      <div style={{ width: 580, height: 650, marginTop: 8, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* The four app widgets arrive first. The agent appears next, then draws a cable to each app. */}
        <div style={{ width: 580, height: 430, position: 'relative' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, overflow: 'visible' }} viewBox="0 0 580 430">
            {cableCurves.map((curve, index) => (
              <path
                key={index}
                d={`M ${curve.start.x} ${curve.start.y} C ${curve.control1.x} ${curve.control1.y}, ${curve.control2.x} ${curve.control2.y}, ${curve.end.x} ${curve.end.y}`}
                fill="none"
                stroke={COLORS.accent}
                strokeWidth={5}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - cableProgress[index]}
              />
            ))}
            {cableCurves.flatMap((curve, cableIndex) => {
              const elapsed = frame - connectionFrames[cableIndex] - 2;
              if (elapsed < 0) return [];
              return [0, 1, 2].map((dotIndex) => {
                const progress = ((elapsed / 24 + dotIndex / 3) % 1 + 1) % 1;
                const point = getCablePoint(curve, progress);
                return (
                  <g key={`data-${cableIndex}-${dotIndex}`}>
                    <circle cx={point.x} cy={point.y} r={8} fill={COLORS.accent} opacity={0.18} />
                    <circle cx={point.x} cy={point.y} r={4} fill={COLORS.accent} />
                  </g>
                );
              });
            })}
          </svg>

          <div style={{ position: 'absolute', left: 0, top: 0, width: 580, height: 430, zIndex: 5 }}>
            {appCards.map((app, index) => {
              const recoil = appRecoil(connectionFrames[index]);
              return (
                <div
                  key={app.name}
                  style={{
                    position: 'absolute', left: app.left, top: app.top,
                    opacity: appEntrances[index],
                    transform: `translateY(${Math.sin(recoil * Math.PI) * -7}px) rotate(${recoil * (index % 2 ? -3 : 3)}deg) scale(${appEntrances[index] * (1 + Math.abs(recoil) * 0.06)})`,
                    transformOrigin: 'center',
                  }}
                >
                  <AppCard name={app.name} size={106} />
                </div>
              );
            })}
          </div>

          <div style={{ position: 'absolute', left: 180, top: 102, width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <StampDropIn progress={robotSpring} dropDistance={-90}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <RobotHero size={176} blink={isBlinking} />
                <span style={{ marginTop: 14, fontFamily: FONTS.body, fontSize: 24, fontWeight: 700, color: COLORS.accent, opacity: agentLabelOpacity }}>
                  Agent
                </span>
              </div>
            </StampDropIn>
          </div>
        </div>

        {/* The four step widgets appear only after all four app connections land. */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 18 }}>
          {stepWidgets.map((step, index) => {
            const pop = stepEntrances[index];
            return (
              <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: pop, transform: `translateY(${(1 - pop) * 24}px) scale(${0.88 + pop * 0.12})` }}>
                <div style={{ width: 84, height: 84, borderRadius: 20, backgroundColor: index === 0 ? COLORS.accent : '#1E1D1B', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(26,24,22,0.16)' }}>
                  <FaIcon icon={step.icon} size={38} color="#FFFFFF" />
                </div>
                <span style={{ fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.ink, whiteSpace: 'nowrap' }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
