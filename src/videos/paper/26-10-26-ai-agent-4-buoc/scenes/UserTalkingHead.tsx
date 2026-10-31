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
        bottom: 0,
        left: '50%',
        width: 1080,
        height: 1920,
        transform: 'translateX(-50%) scale(0.60)',
        transformOrigin: 'center bottom',
        pointerEvents: 'none',
        zIndex: 10,
        filter: 'drop-shadow(0 12px 28px rgba(26, 24, 22, 0.12))',
      }}
    >
      <OffthreadVideo
        src={staticFile('videos/paper/26-10-26-ai-agent-4-buoc/user_nobg.webm')}
        transparent
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
