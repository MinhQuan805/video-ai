import React from 'react';
import { Img, interpolate, staticFile } from 'remotion';
import { BOARD_LAYOUT, TIER_CONFIGS } from '../constants';
import { RankingScene } from '../types';

interface TierBoardProps {
  currentFrame: number;
  scenes: RankingScene[];
  activeScene?: RankingScene;
}

export const TierBoard: React.FC<TierBoardProps> = ({
  currentFrame,
  scenes,
  activeScene,
}) => {
  let boardOpacity = 1;
  let boardTranslateY = 0;

  if (activeScene && activeScene.id !== 'outro' && activeScene.card_start_frame) {
    const { card_start_frame, card_end_frame } = activeScene;
    if (currentFrame >= card_start_frame && currentFrame <= card_end_frame) {
      const fadeOut = interpolate(
        currentFrame,
        [card_start_frame, card_start_frame + 6],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      const fadeIn = interpolate(
        currentFrame,
        [card_end_frame - 6, card_end_frame],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      boardOpacity = Math.min(fadeOut, fadeIn);
      boardTranslateY = interpolate(boardOpacity, [0, 1], [-20, 0]);
    }
  }

  if (boardOpacity <= 0.005) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: BOARD_LAYOUT.left,
        top: BOARD_LAYOUT.top,
        width: BOARD_LAYOUT.width,
        display: 'flex',
        flexDirection: 'column',
        gap: BOARD_LAYOUT.rowGap,
        zIndex: 10,
        opacity: boardOpacity,
        transform: `translateY(${boardTranslateY}px)`,
      }}
    >
      {TIER_CONFIGS.map((tier) => {
        // Find scenes assigned to this tier that have already landed
        const settledItems = scenes.filter(
          (s) => s.tier === tier.id && currentFrame >= s.land_frame
        );

        return (
          <div
            key={tier.id}
            style={{
              height: BOARD_LAYOUT.rowHeight,
              width: '100%',
              borderRadius: 24,
              background: '#CBD5E1',
              boxShadow:
                'inset 0 2px 4px rgba(0, 0, 0, 0.08), 0 3px 8px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              position: 'relative',
              border: '1.5px solid rgba(255, 255, 255, 0.85)',
            }}
          >
            {/* Left Tier Badge */}
            <div
              style={{
                width: BOARD_LAYOUT.badgeWidth,
                height: BOARD_LAYOUT.badgeHeight,
                borderRadius: 20,
                backgroundColor: tier.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: -0.5,
                }}
              >
                {tier.label}
              </span>
            </div>

            {/* Placed Items Slot Container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                paddingLeft: 20,
                flex: 1,
                height: '100%',
              }}
            >
              {settledItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: BOARD_LAYOUT.slotSize,
                    height: BOARD_LAYOUT.slotSize,
                    borderRadius: 22,
                    backgroundColor: '#FFFFFF',
                    boxShadow:
                      '0 6px 16px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                    border: '1.5px solid rgba(255, 255, 255, 0.95)',
                  }}
                >
                  <Img
                    src={staticFile(item.icon)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
