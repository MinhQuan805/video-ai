import React from 'react';
import { OffthreadVideo, staticFile } from 'remotion';
import { SPEAKER_LAYOUT } from '../constants';

interface TalkingHeadProps {
  videoSrc?: string;
}

export const TalkingHead: React.FC<TalkingHeadProps> = ({
  videoSrc = 'videos/ranking/10-23-26/assets/10-23-26_speed.mp4',
}) => {
  const targetX = 540;
  const targetY = 940;
  const scale = 0.855;

  return (
    <div
      style={{
        position: 'absolute',
        top: SPEAKER_LAYOUT.top,
        left: SPEAKER_LAYOUT.left,
        width: SPEAKER_LAYOUT.width,
        height: SPEAKER_LAYOUT.height,
        borderRadius: SPEAKER_LAYOUT.borderRadius,
        overflow: 'hidden',
        boxShadow:
          '0 28px 65px rgba(15, 23, 42, 0.16), 0 6px 18px rgba(15, 23, 42, 0.08)',
        border: '3px solid #FFFFFF',
        backgroundColor: '#FFFFFF',
        zIndex: 15,
      }}
    >
      <OffthreadVideo
        src={staticFile(videoSrc)}
        style={{
          width: 1080,
          height: 1920,
          position: 'absolute',
          left: SPEAKER_LAYOUT.width / 2 - targetX,
          top: SPEAKER_LAYOUT.height / 2 - targetY,
          transform: `scale(${scale})`,
          transformOrigin: `${targetX}px ${targetY}px`,
        }}
      />
    </div>
  );
};
