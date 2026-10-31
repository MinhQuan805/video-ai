import React from 'react';
import { COLORS } from '../core/tokens';

export interface WritingPencilProps {
  tipX: number;
  tipY: number;
  opacity?: number;
  rotation?: number;
  scale?: number;
  color?: string;
  isWriting?: boolean;
}

/**
 * Tactile Drafting Pencil with graphite lead tip, sharpened cedar wood cone,
 * terracotta body shaft, brass ferrule, and pink eraser.
 * The graphite tip sits exactly at (tipX, tipY).
 */
export const WritingPencil: React.FC<WritingPencilProps> = ({
  tipX,
  tipY,
  opacity = 1,
  rotation = 38,
  scale = 1,
  color = COLORS.accent,
}) => {
  if (opacity <= 0.005) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: tipX,
        top: tipY,
        opacity,
        zIndex: 40,
        pointerEvents: 'none',
        transform: `translate(-8px, -48px) scale(${scale})`,
        transformOrigin: '8px 48px',
        filter: 'drop-shadow(3px 8px 12px rgba(26,24,22,0.25))',
      }}
    >
      <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
        {/* Rotate pencil around the lead tip at (8, 48) */}
        <g transform={`rotate(${rotation} 8 48)`}>
          {/* Graphite Lead Tip */}
          <polygon points="8,48 5.5,43 10.5,43" fill="#1A1816" />
          {/* Sharpened Wood Cone */}
          <polygon points="5.5,43 10.5,43 12,33 4,33" fill="#E8D3B8" />
          {/* Pencil Shaft Body */}
          <rect x="4" y="3" width="8" height="30" rx="1" fill={color} />
          {/* Subtle highlight sheen */}
          <rect x="6.5" y="3" width="2" height="30" fill="rgba(255,255,255,0.35)" />
          {/* Gold Brass Ferrule */}
          <rect x="4" y="-1" width="8" height="4" fill="#C49E4A" />
          {/* Pink/Salmon Eraser */}
          <rect x="4" y="-5" width="8" height="4" rx="2" fill="#D97757" />
        </g>
      </svg>
    </div>
  );
};
