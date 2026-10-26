import React from 'react';
import { Img, interpolate, spring, staticFile, useVideoConfig } from 'remotion';
import { BOARD_LAYOUT, FLOATING_CENTER, TIER_SLOT_COORDS } from '../constants';
import { RankingScene } from '../types';

interface FloatingRankCardProps {
  currentFrame: number;
  scene: RankingScene;
}

export const FloatingRankCard: React.FC<FloatingRankCardProps> = ({ currentFrame, scene }) => {
  const { fps } = useVideoConfig();

  // If before appearance or already settled, don't render floating clone
  if (
    currentFrame < scene.start_frame ||
    currentFrame >= scene.land_frame ||
    !scene.tier ||
    !scene.icon
  ) {
    return null;
  }

  const targetCoords = TIER_SLOT_COORDS[scene.tier] || FLOATING_CENTER;

  // Phase 1: Spawn & Float in Center
  const entranceProgress = spring({
    frame: currentFrame - scene.start_frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 170 },
  });

  const baseScale = interpolate(entranceProgress, [0, 1], [0, 1]);
  const baseOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  // Phase 2: Flight down to Tier Slot
  let currentX = FLOATING_CENTER.x;
  let currentY = FLOATING_CENTER.y;
  let currentScale = baseScale;

  if (currentFrame >= scene.fly_frame) {
    const flyProgress = spring({
      frame: currentFrame - scene.fly_frame,
      fps,
      config: { damping: 15, mass: 0.7, stiffness: 180 },
    });

    currentX = interpolate(flyProgress, [0, 1], [FLOATING_CENTER.x, targetCoords.x]);
    currentY = interpolate(flyProgress, [0, 1], [FLOATING_CENTER.y, targetCoords.y]);
    currentScale = interpolate(flyProgress, [0, 1], [1, BOARD_LAYOUT.slotSize / 130]);
  } else {
    // Subtle breathing float while centered in the middle of the board
    const floatOffset = Math.sin((currentFrame - scene.start_frame) * 0.12) * 4;
    currentY += floatOffset;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        width: 130,
        height: 130,
        transform: `translate(-50%, -50%) scale(${currentScale})`,
        opacity: baseOpacity,
        borderRadius: 28,
        backgroundColor: '#FFFFFF',
        boxShadow:
          '0 24px 48px rgba(15, 23, 42, 0.22), 0 8px 20px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,1)',
        border: '2px solid rgba(255, 255, 255, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        zIndex: 50,
      }}
    >
      <Img
        src={staticFile(scene.icon)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
