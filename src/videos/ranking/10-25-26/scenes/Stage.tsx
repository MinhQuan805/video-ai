import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import data from '../scenes.json';
import { layer, travel } from './motion';
export { ease, clamp } from './motion';

export const INK = '#172333';
export const MUTED = '#98A2AF';
export const PAPER = '#EAE8E1';
export const FONT = '"Segoe UI", -apple-system, BlinkMacSystemFont, Arial, sans-serif';

export const Stage: React.FC<{
  index: number;
  title?: string;
  children: React.ReactNode;
}> = ({ index, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = data.scenes[index];
  const start = scene.card_start_frame - scene.start_frame;
  const end = scene.end_frame - scene.start_frame + 1;
  const exit = travel(frame, end - 8, end + 6);

  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: 250,
        width: 880,
        height: 690,
        fontFamily: FONT,
        color: INK,
        opacity: 1 - exit,
        transform: `translateY(${-exit * 20}px) scale(${1 - exit * 0.02})`,
      }}
    >
      {/* Main Visual Stage */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 0,
          width: 880,
          height: 605,
          pointerEvents: 'none',
          ...layer(frame, start + 3, fps, 24),
        }}
      >
        {children}
      </div>
    </div>
  );
};
