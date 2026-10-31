import React, {useId} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../visual-systems/paper/theme';
import {clamp, cssTransform, frameTime, type Pose, type Rig} from '../motion/core.ts';
import {interactionAt, type ActorState, type Interaction, type InteractionSample, type JawDesign} from './poses.ts';

export const MotionLayer: React.FC<{actor: ActorState; children: React.ReactNode; style?: React.CSSProperties}> = ({actor, children, style}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: actor.rig.bounds.width, height: actor.rig.bounds.height,
    transformOrigin: '0 0', transform: cssTransform(actor.pose, actor.rig.pivot), opacity: actor.pose.opacity, ...style}}>{children}</div>
);

/** Shell deforms, label counter-scales around its center so Vietnamese text remains readable. */
export const PaperCard: React.FC<{actor: ActorState; children: React.ReactNode; accent?: boolean}> = ({actor, children, accent = false}) => (
  <MotionLayer actor={actor}>
    <div style={{position: 'absolute', inset: 0, boxSizing: 'border-box', borderRadius: 22, background: theme.colors.paper,
      border: `1.5px solid ${accent ? theme.colors.accent : theme.colors.line}`, boxShadow: '0 12px 28px rgba(26,24,22,0.08)'}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: `scale(${1 / actor.pose.scale.x}, ${1 / actor.pose.scale.y})`, transformOrigin: 'center',
      fontFamily: theme.fonts.body, color: theme.colors.ink, fontWeight: 700, fontSize: 28, lineHeight: 1.3,
      textAlign: 'center', whiteSpace: 'pre-line', padding: 12, boxSizing: 'border-box'}}>{children}</div>
  </MotionLayer>
);

/** A configurable paper jaw rig, not an icon or a mandatory mascot for every scene. */
export const PaperJawActor: React.FC<{jawOpen: number; design?: JawDesign; children?: React.ReactNode}> = ({jawOpen, design = {}, children}) => {
  const w = design.backWidth ?? 220;
  const h = design.crownHeight ?? 135;
  const paper = design.paper ?? theme.colors.paper;
  const angle = clamp(jawOpen) * Math.atan2(110, 180) * 180 / Math.PI;
  return <>
    <path d={`M ${-w} ${-h} L -65 ${-h + 12} L 0 -55 L -115 -55 L -120 90 L ${-w} 90 Z`}
      fill={paper} stroke={theme.colors.ink} strokeWidth={3} strokeLinejoin="round" />
    {children}
    <g transform={`rotate(${angle} -180 55)`}>
      <path d={`M -180 55 L 0 -55 L -32 40 L -85 82 L ${-w} 82 Z`} fill={paper}
        stroke={theme.colors.ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M -130 49 L -63 6" stroke={theme.colors.accent} strokeWidth={7} strokeLinecap="round" />
    </g>
    <circle cx={design.eyeX ?? -103} cy={-h + 52} r={10} fill={theme.colors.ink} />
    <circle cx={(design.eyeX ?? -103) + 3} cy={-h + 49} r={3} fill={theme.colors.paper} />
  </>;
};

const SvgCard: React.FC<{p: Pose; rig: Rig; text: string}> = ({p, rig, text}) => (
  <g transform={`translate(${p.position.x} ${p.position.y}) rotate(${p.rotation * 180 / Math.PI}) scale(${p.scale.x} ${p.scale.y}) translate(${-rig.pivot.x} ${-rig.pivot.y})`} opacity={p.opacity}>
    <rect width={rig.bounds.width} height={rig.bounds.height} rx={18} fill={theme.colors.paperMuted} stroke={theme.colors.ink} strokeWidth={2} />
    <text x={rig.bounds.width / 2} y={rig.bounds.height / 2} dominantBaseline="central" textAnchor="middle"
      fontFamily={theme.fonts.body} fontSize={24} fill={theme.colors.ink}>{text}</text>
  </g>
);

export type PaperInteractionProps = {interaction: Interaction; targetLabel: string; loadLabel?: string;
  timeOffsetMs?: number; width?: number; height?: number;
  renderActor?: (sample: InteractionSample) => React.ReactNode};

/** Consume the same declarative spec that validate_motion.mjs checks; no timers or stateful simulation. */
export const PaperInteraction: React.FC<PaperInteractionProps> = ({interaction, targetLabel, loadLabel = '', timeOffsetMs = 0,
  width = 1080, height = 940, renderActor}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const sample = interactionAt(frameTime(frame, fps) + timeOffsetMs, interaction);
  const clipId = `mouth-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  if (interaction.kind === 'swallow' && sample.mouth) {
    const m = sample.mouth; const lip = m.x + m.width; const centerY = m.y + m.height / 2;
    return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <defs><clipPath id={clipId} clipPathUnits="userSpaceOnUse">
        <rect x={lip} y={0} width={Math.max(0, width - lip)} height={height} />
        <rect {...m} />
      </clipPath></defs>
      <rect {...m} fill={theme.colors.ink} />
      <g clipPath={`url(#${clipId})`}><SvgCard p={sample.actors.target.pose} rig={sample.actors.target.rig} text={targetLabel} /></g>
      <g transform={`translate(${lip} ${centerY}) scale(${m.width / 120} ${m.height / 110})`}>
        <PaperJawActor jawOpen={sample.jawOpen ?? 0} design={interaction.spec.actorDesign} />
      </g>
      {renderActor?.(sample)}
    </svg>;
  }
  return <div style={{position: 'relative', width, height}}>
    {renderActor?.(sample)}
    <PaperCard actor={sample.actors.target} accent={interaction.kind === 'card' && sample.state !== 'idle'}>{targetLabel}</PaperCard>
    {sample.actors.load && <PaperCard actor={sample.actors.load}>{loadLabel}</PaperCard>}
    {sample.grip && !renderActor && <svg style={{position: 'absolute', left: sample.grip.x - 35, top: sample.grip.y - 25, width: 40, height: 50}} viewBox="0 0 40 50">
      <path d="M 4 8 L 33 8 L 33 16 L 13 16 L 13 34 L 33 34 L 33 42 L 4 42 Z" fill={theme.colors.paperMuted} stroke={theme.colors.ink} strokeWidth={2} />
    </svg>}
  </div>;
};
