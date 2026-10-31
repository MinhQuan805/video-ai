import React from 'react';
import { COLORS } from '../core/tokens';

export interface PaperBackgroundProps {
  showNoise?: boolean;
  showBrackets?: boolean;
  backgroundColor?: string;
  bracketColor?: string;
}

/**
 * Editorial Textured Paper Background with fine SVG grain
 * and 4 drafting corner registration brackets.
 */
export const PaperBackground: React.FC<PaperBackgroundProps> = ({
  showNoise = true,
  showBrackets = true,
  backgroundColor = COLORS.bg,
  bracketColor = 'rgba(26, 24, 22, 0.2)',
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Ultra-fine SVG noise filter */}
      {showNoise && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.035,
          }}
        >
          <filter id="lib-paper-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves={3}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#lib-paper-noise)" />
        </svg>
      )}

      {/* Drafting brackets at 4 corners */}
      {showBrackets && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              width: 24,
              height: 24,
              borderTop: `2px solid ${bracketColor}`,
              borderLeft: `2px solid ${bracketColor}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 40,
              width: 24,
              height: 24,
              borderTop: `2px solid ${bracketColor}`,
              borderRight: `2px solid ${bracketColor}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              width: 24,
              height: 24,
              borderBottom: `2px solid ${bracketColor}`,
              borderLeft: `2px solid ${bracketColor}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              width: 24,
              height: 24,
              borderBottom: `2px solid ${bracketColor}`,
              borderRight: `2px solid ${bracketColor}`,
            }}
          />
        </>
      )}
    </div>
  );
};
