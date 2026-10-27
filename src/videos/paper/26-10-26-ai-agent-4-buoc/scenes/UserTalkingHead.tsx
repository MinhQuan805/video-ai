import React from 'react';
import { OffthreadVideo, staticFile, useCurrentFrame } from 'remotion';
import { isSpeakerVisible } from './common';

export const UserTalkingHead: React.FC = () => {
  const frame = useCurrentFrame();

  const isSplit = isSpeakerVisible(frame);

  if (!isSplit) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 1040,
        width: 1080,
        height: 880,
        overflow: 'hidden',
        borderTop: '2px solid rgba(26, 24, 22, 0.12)',
        backgroundColor: '#FAF8F5',
        zIndex: 5,
      }}
    >
      <OffthreadVideo
        src={staticFile('videos/paper/26-10-26-ai-agent-4-buoc/user_raw.mp4')}
        muted
        style={{
          position: 'absolute',
          width: 1080,
          height: 1920,
          left: 0,
          top: -580,
          transform: 'scale(1.0)',
        }}
      />
      {/* Subtle top divider shadow/gradient to blend cleanly */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 20,
          background: 'linear-gradient(to bottom, rgba(26,24,22,0.08), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
