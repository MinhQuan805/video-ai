import React from 'react';
import { useCurrentFrame } from 'remotion';
import captionsData from './captions.json';
import { COLORS, FONTS, isSpeakerVisible } from './scenes/common';

interface CaptionWord {
  text: string;
  start_frame: number;
  end_frame: number;
}

interface CaptionChunk {
  start_frame: number;
  end_frame: number;
  words: CaptionWord[];
}

// Chunk words strictly WITHIN each phrase to preserve 100% Whisper audio alignment
const captionChunks: CaptionChunk[] = [];

for (const phrase of captionsData.phrases) {
  const words = phrase.words;
  if (!words || words.length === 0) continue;

  if (words.length <= 4) {
    captionChunks.push({
      start_frame: words[0].start_frame,
      end_frame: words[words.length - 1].end_frame + 6,
      words,
    });
  } else if (words.length <= 8) {
    const mid = Math.ceil(words.length / 2);
    const chunk1 = words.slice(0, mid);
    const chunk2 = words.slice(mid);
    captionChunks.push({
      start_frame: chunk1[0].start_frame,
      end_frame: chunk2[0].start_frame,
      words: chunk1,
    });
    captionChunks.push({
      start_frame: chunk2[0].start_frame,
      end_frame: chunk2[chunk2.length - 1].end_frame + 6,
      words: chunk2,
    });
  } else {
    // 9+ words: split into 3 chunks
    const step = Math.ceil(words.length / 3);
    for (let j = 0; j < words.length; j += step) {
      const sub = words.slice(j, j + step);
      const nextSub = words.slice(j + step, j + 2 * step);
      captionChunks.push({
        start_frame: sub[0].start_frame,
        end_frame:
          nextSub.length > 0
            ? nextSub[0].start_frame
            : sub[sub.length - 1].end_frame + 6,
        words: sub,
      });
    }
  }
}

export const PaperCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const isSplit = isSpeakerVisible(frame);

  // Find active 2-4 word chunk
  const activeChunk = captionChunks.find(
    (c) => frame >= c.start_frame && frame < c.end_frame
  );

  if (!activeChunk) return null;

  // Split-screen: placed above talking head (top: 960)
  // Fullscreen motion: placed at lower safe zone (top: 1620)
  const topPos = isSplit ? 960 : 1620;

  return (
    <div
      style={{
        position: 'absolute',
        top: topPos,
        left: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        padding: '0 40px',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        transition: 'top 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px 18px',
          maxWidth: 960,
        }}
      >
        {activeChunk.words.map((word, idx) => {
          const nextWord = activeChunk.words[idx + 1];
          const wordEnd = nextWord ? nextWord.start_frame : word.end_frame + 4;
          const isActive = frame >= word.start_frame && frame < wordEnd;
          return (
            <span
              key={`${activeChunk.start_frame}-${idx}`}
              style={{
                fontFamily: FONTS.body,
                fontSize: 54,
                fontWeight: 900,
                color: isActive ? COLORS.accent : COLORS.ink,
                transform: isActive ? 'scale(1.10)' : 'scale(1.0)',
                display: 'inline-block',
                transition: 'transform 0.06s ease, color 0.06s ease',
                textShadow:
                  '0 2px 14px rgba(255, 255, 255, 0.98), 0 0 6px rgba(255, 255, 255, 0.95), 0 1px 2px rgba(26,24,22,0.15)',
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
