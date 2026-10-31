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

const captionChunks: CaptionChunk[] = [];

for (const phrase of (captionsData as any)) {
  const words: CaptionWord[] = phrase.words || [];
  if (!words || words.length === 0) continue;

  // Max 3 words per chunk for clean mobile TikTok pacing without overflowing edges
  if (words.length <= 3) {
    captionChunks.push({
      start_frame: words[0].start_frame,
      end_frame: words[words.length - 1].end_frame + 6,
      words,
    });
  } else {
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
  }
}

export const PaperCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const isSplit = isSpeakerVisible(frame);

  const activeChunk = captionChunks.find(
    (c) => frame >= c.start_frame && frame < c.end_frame
  );

  if (!activeChunk) return null;

  // TikTok Safe Zones:
  // Split-screen: placed lower down, centered in the middle of the video (top: 920)
  // Fullscreen motion: placed at TikTok safe lower center (top: 1480), clear of bottom description & music bar
  const topPos = isSplit ? 920 : 1480;

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
        // TikTok safe horizontal margins: 140px on right (for action buttons), 80px on left
        padding: '0 140px 0 80px',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        transition: 'top 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px 18px',
          maxWidth: 780,
          textAlign: 'center',
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
