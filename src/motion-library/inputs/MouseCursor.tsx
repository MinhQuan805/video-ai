import React from 'react';

export interface MouseCursorProps {
  x: number;
  y: number;
  isGrabbing?: boolean;
  scale?: number;
}

/**
 * Authentic OS Vector Arrow Mouse Cursor with grab click recoil
 */
export const MouseCursor: React.FC<MouseCursorProps> = ({
  x,
  y,
  isGrabbing = false,
  scale = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      zIndex: 60,
      pointerEvents: 'none',
      transform: `scale(${scale * (isGrabbing ? 0.92 : 1)})`,
      transformOrigin: 'top left',
      filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.28))',
      transition: 'transform 0.05s ease',
    }}
  >
    <svg width="32" height="38" viewBox="0 0 28 34" fill="none">
      <path
        d="M2 2L11 28L15.5 19L24 16.5L2 2Z"
        fill="#1A1816"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
