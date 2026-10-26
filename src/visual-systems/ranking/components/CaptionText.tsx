import React from 'react';
import { useCurrentFrame } from 'remotion';
import { BOARD_LAYOUT, SPEAKER_LAYOUT } from '../constants';
import { CaptionPhrase } from '../types';

interface CaptionTextProps {
  phrases?: CaptionPhrase[];
}

// Vertical zone between bottom of TierBoard and top of Speaker Card
const rankBoardBottom =
  BOARD_LAYOUT.top + 5 * BOARD_LAYOUT.rowHeight + 4 * BOARD_LAYOUT.rowGap; // 966
const speakerCardTop = SPEAKER_LAYOUT.top; // 1095

export const CaptionText: React.FC<CaptionTextProps> = ({ phrases = [] }) => {
  const frame = useCurrentFrame();

  // Find active 3-4 word phrase
  const activePhrase = phrases.find(
    (p) => frame >= p.start_frame && frame <= p.end_frame
  );

  if (!activePhrase) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: rankBoardBottom,
        height: speakerCardTop - rankBoardBottom,
        left: 0,
        width: 1080,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 25,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '0 20px',
        }}
      >
        {activePhrase.words.map((word, idx) => {
          const isLastWord = idx === activePhrase.words.length - 1;
          const isCurrentWord =
            frame >= word.start_frame &&
            (isLastWord ? frame <= word.end_frame : frame < word.end_frame);

          return (
            <span
              key={idx}
              style={{
                fontSize: 48,
                fontWeight: isCurrentWord ? 900 : 700,
                color: isCurrentWord ? '#DE7356' : '#1A1816',
                transform: isCurrentWord ? 'scale(1.08)' : 'scale(1)',
                display: 'inline-block',
                transition: 'color 0.1s ease, transform 0.1s ease',
                letterSpacing: '-0.5px',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
