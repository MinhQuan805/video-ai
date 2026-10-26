import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import data from './scenes.json';
import {ease, settle, travel} from './scenes/motion';

// Episode-local geometry: the flying logo and its resting slot share exact bounds.
const LEFT = 100;
const TOP = 300;
const ROW = 114;
const GAP = 12;
const SLOT_X = 224;
const SLOT = 90;

export const RankingIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const active = data.scenes.find((scene) => frame >= scene.start_frame && frame <= scene.end_frame);
  if (!active?.tier) return null;
  const rel = frame - active.start_frame;
  const appearance = active.start_frame === 0 ? ease(rel, 0, 16) : ease(rel, 5, 22);
  const handoff = travel(frame, active.card_start_frame - 4, active.card_start_frame + 14);
  const opacity = appearance * (1 - handoff);
  const tierIndex = data.tiers.findIndex((tier) => tier.id === active.tier);
  const flight = travel(frame, active.fly_frame, active.land_frame);
  const pop = settle(rel, 3, fps, 22);
  const targetX = SLOT_X + SLOT / 2;
  const targetY = TOP + tierIndex * (ROW + GAP) + ROW / 2;
  const x = 540 + (targetX - 540) * flight;
  const y = 629 + (targetY - 629) * flight - Math.sin(flight * Math.PI) * 34;
  const size = (146 + (SLOT - 146) * flight) * (0.8 + pop * 0.2);
  return <div style={{position: 'absolute', inset: 0, opacity,
    transform: `translateY(${(1 - appearance) * 18 - handoff * 14}px)`, pointerEvents: 'none'}}>
    <div style={{position: 'absolute', top: TOP, left: LEFT, width: 880, display: 'flex', flexDirection: 'column', gap: GAP}}>
      {data.tiers.map((tier) => <div key={tier.id} style={{position: 'relative', height: ROW, borderRadius: 24, background: '#CBD5E1', border: '1.5px solid rgba(255, 255, 255, 0.9)', boxShadow: 'inset 0 2px 5px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.05)'}}>
        <div style={{position: 'absolute', left: 10, top: 9, width: 96, height: 96, borderRadius: 20, background: tier.color, color: 'white', fontSize: 48, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)'}}>{tier.id}</div>
        {data.scenes.filter((scene) => scene.tier === tier.id && frame >= scene.land_frame).map((scene) => <div key={scene.id} style={{position: 'absolute', left: SLOT_X - LEFT, top: (ROW - SLOT) / 2, width: SLOT, height: SLOT, boxSizing: 'border-box', padding: 11, borderRadius: 21, background: 'white', border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 14px rgba(15,23,42,0.12)'}}>
          <Img src={staticFile(scene.icon)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
        </div>)}
      </div>)}
    </div>
    {frame < active.land_frame && <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, boxSizing: 'border-box', padding: 11 + (1 - flight) * 7, borderRadius: 21 + (1 - flight) * 8, background: 'white', opacity: ease(rel, 3, 12), transform: `rotate(${-Math.sin(flight * Math.PI) * 5}deg)`, boxShadow: `0 ${4 + (1 - flight) * 10}px ${12 + (1 - flight) * 20}px rgba(23,35,51,0.09)`}}>
      <Img src={staticFile(active.icon)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
    </div>}
  </div>;
};
