import React from 'react';
import { staticFile, useCurrentFrame, Video } from 'remotion';
import { isSpeakerVisible } from './scenes/common';

const SCALE = 0.85;
const VIDEO_WIDTH = 1080;
const CARD_WIDTH = 920;

/**
 * Talking-Head Cutout over Kallaway-Style Slate-Gray Card (Khớp 100% video 29-10)
 * - Nền thẻ xám slate (#989FA4) bo tròn phía trên (44px), rộng 920px
 * - Người nói nổi bật trên nền xám, cắt tỉa không nền (user_nobg.webm)
 */
export const UserTalkingHead: React.FC = () => {
  const frame = useCurrentFrame();

  const visible = isSpeakerVisible(frame);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1920,
        pointerEvents: 'none',
        zIndex: 25,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* 1. Kallaway Slate-Gray Card */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: CARD_WIDTH,
          height: 520,
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(152, 159, 164, 0.45)',
          borderRadius: '44px 44px 0 0',
          border: '1.5px solid rgba(26, 24, 22, 0.1)',
          borderBottom: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. User Cutout Video (Không dùng drop-shadow viền mờ) */}
      <div
        style={{
          position: 'absolute',
          bottom: -300,
          left: '50%',
          width: VIDEO_WIDTH,
          height: 1920,
          transform: `translateX(-50%) scale(${SCALE})`,
          transformOrigin: 'center bottom',
          zIndex: 2,
        }}
      >
        <Video
          src={staticFile('videos/paper/03-11-26/user_nobg.webm')}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};
