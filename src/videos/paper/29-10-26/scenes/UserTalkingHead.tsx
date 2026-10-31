import React from 'react';
import { staticFile, useCurrentFrame, Video } from 'remotion';
import { isSpeakerVisible } from './common';

const SCALE = 0.85;
const VIDEO_WIDTH = 1080;
const CARD_WIDTH = 920; // Giữ nguyên nền xám (1080 * 0.85 = 918px khớp hoàn hảo)

/**
 * Talking-Head Cutout over Kallaway-Style Slate-Gray Card
 * - Face is BIG and impactful (scale: 0.96) like Kallaway reference.
 * - Shoulders fill the card width (920px) cleanly with no awkward empty wings.
 * - Sits centered horizontally with rounded top corners (44px).
 * - Slate-gray card tone (#989FA4) with crisp contrast against paper background.
 * - Hair top starts at Y ~ 925px, leaving clean 85px buffer below caption at Y: 780.
 * - Card height (520px) rises behind neck and jawline so head cleanly breaks out above card.
 * - Zero text or labels on the card.
 */
export const UserTalkingHead: React.FC = () => {
  const frame = useCurrentFrame();

  const visible = isSpeakerVisible(frame);

  if (!visible) {
    return null;
  }

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
          backgroundColor: '#989FA4', // Slate-gray matching Kallaway reference
          borderRadius: '44px 44px 0 0',
          boxShadow: '0 24px 60px rgba(26, 24, 22, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          border: '1.5px solid rgba(26, 24, 22, 0.12)',
          borderBottom: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. User Cutout: Mặt và người nhỏ lại (scale: 0.85), chiều ngang khớp nền xám, hạ thấp */}
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
          filter: 'drop-shadow(0 16px 36px rgba(26, 24, 22, 0.18))',
        }}
      >
        <Video
          src={staticFile('videos/paper/29-10-26/user_nobg.webm')}
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
