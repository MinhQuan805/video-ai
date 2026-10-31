import React from 'react';
import { OffthreadVideo, staticFile, useCurrentFrame, spring } from 'remotion';
import { isSpeakerVisible, COLORS, SPRINGS } from './common';

export const UserSpeakerFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = isSpeakerVisible(frame);

  // Smooth opacity & scale transition based on visibility
  // Using spring physics for entering/exiting
  const animProgress = spring({
    frame: visible ? 10 : 0,
    from: 0,
    to: visible ? 1 : 0,
    fps: 30,
    config: SPRINGS.snappy,
  });

  if (!visible && animProgress < 0.02) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: `translateX(-50%) scale(${animProgress})`,
        opacity: animProgress,
        zIndex: 40,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Passepartout Paper Frame Badge */}
      <div
        style={{
          width: 380,
          height: 380,
          borderRadius: 56,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          padding: 8,
          boxShadow: '0 24px 56px rgba(26, 24, 22, 0.18), 0 6px 16px rgba(26, 24, 22, 0.08)',
          border: `2px solid ${COLORS.line}`,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 48,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#1A1816',
          }}
        >
          <OffthreadVideo
            src={staticFile('videos/paper/29-10-26/user_raw.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 42%', // Perfectly centers speaker face
            }}
          />
        </div>

        {/* Small live badge indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(26, 24, 22, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            letterSpacing: '0.04em',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#22C55E',
              boxShadow: '0 0 8px #22C55E',
            }}
          />
          CREATOR
        </div>
      </div>
    </div>
  );
};
