import React from 'react';
import { useCurrentFrame } from 'remotion';
import captionsData from './captions.json';
import { COLORS, FONTS } from './scenes/common';

export const PaperCaptions: React.FC = () => {
  const frame = useCurrentFrame();

  // Find the active phrase
  const activePhrase = captionsData.phrases.find(
    (p) => frame >= p.start_frame && frame < p.end_frame
  );

  if (!activePhrase) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 1480,
        left: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        padding: '0 60px',
        boxSizing: 'border-box',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px 16px',
        }}
      >
        {activePhrase.words.map((word, idx) => {
          const isActive = frame >= word.start_frame && frame < word.end_frame;
          return (
            <span
              key={`${activePhrase.start_frame}-${idx}`}
              style={{
                fontFamily: FONTS.body,
                fontSize: 52,
                fontWeight: 800,
                color: isActive ? COLORS.accent : COLORS.ink,
                transform: isActive ? 'scale(1.08)' : 'scale(1.0)',
                display: 'inline-block',
                transition: 'transform 0.08s ease, color 0.08s ease',
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
