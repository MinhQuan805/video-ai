import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { FaIcon } from '../../../../shared/FaIcon';

interface SpamDmSceneProps {
  currentFrame: number;
  startFrame: number;
  endFrame: number;
}

const MESSAGES = [
  'Hey! Quick question 👋',
  'Love your page! ✨',
  'Need more clients? 🚀',
  'Saw your work 👀',
];

export const SpamDmScene: React.FC<SpamDmSceneProps> = ({
  currentFrame,
  startFrame,
  endFrame,
}) => {
  const { fps } = useVideoConfig();

  if (currentFrame < startFrame || currentFrame > endFrame) {
    return null;
  }

  const localFrame = currentFrame - startFrame;

  // Spring entrance
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 140 },
  });

  const exitProgress = interpolate(currentFrame, [endFrame - 8, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Annoyance shake (from frame 90 onward: "Vừa gây khó chịu...")
  const isAnnoyed = localFrame >= 90;
  const annoyanceShake = isAnnoyed ? Math.sin(localFrame * 0.85) * 4 : 0;

  // Ban Stamp Slam (at frame 115: "mất uy tín")
  const isBanned = localFrame >= 115;
  const stampSpring = spring({
    frame: Math.max(0, localFrame - 115),
    fps,
    config: { damping: 9, mass: 1.4, stiffness: 240 },
  });
  const stampScale = isBanned ? interpolate(stampSpring, [0, 1], [2.4, 1]) : 0;
  const stampRotate = isBanned ? interpolate(stampSpring, [0, 1], [-25, -8]) : 0;

  const cardOpacity = interpolate(entrance, [0, 1], [0, 1]) * (1 - exitProgress);
  const cardScale = interpolate(entrance, [0, 1], [0.94, 1]) * (1 - exitProgress * 0.05);

  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: 320,
        width: 880,
        height: 580,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        zIndex: 30,
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        pointerEvents: 'none',
      }}
    >
      {/* 1 Main Hero Motion: Staggered Chat Pills with Continuous Floating & Stamp Slam */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          width: '100%',
          transform: `translateX(${annoyanceShake}px)`,
        }}
      >
        {MESSAGES.map((msg, i) => {
          // Staggered pop-in synced with speaking rhythm: frames 8, 30, 52, 74
          const pillProgress = spring({
            frame: Math.max(0, localFrame - 8 - i * 22),
            fps,
            config: { damping: 12, mass: 0.6, stiffness: 180 },
          });

          const scale = interpolate(pillProgress, [0, 1], [0, 1]);
          const popY = interpolate(pillProgress, [0, 1], [30, 0]);
          const opacity = interpolate(pillProgress, [0, 1], [0, 1]);

          // Continuous floating bobbing (alive all the time!)
          const continuousFloatY = Math.sin(localFrame * 0.12 + i * 1.4) * 6;
          const tilt = i % 2 === 0 ? -1.8 : 1.8;

          return (
            <div
              key={i}
              style={{
                background:
                  'linear-gradient(135deg, #EC4899 0%, #D946EF 50%, #8B5CF6 100%)',
                color: '#FFFFFF',
                padding: '16px 40px',
                borderRadius: 999,
                fontSize: 34,
                fontWeight: 700,
                boxShadow: '0 10px 24px rgba(217, 70, 239, 0.32)',
                transform: `scale(${scale}) translateY(${popY + continuousFloatY}px) rotate(${tilt}deg)`,
                opacity: isBanned ? opacity * 0.45 : opacity,
                transition: 'opacity 0.2s ease',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {msg}
            </div>
          );
        })}

        {/* Slamming Ban Stamp (Frame 115) */}
        {isBanned && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${stampScale}) rotate(${stampRotate}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              border: '6px solid #FFFFFF',
              borderRadius: '50%',
              width: 140,
              height: 140,
              boxShadow:
                '0 20px 50px rgba(239, 68, 68, 0.6), 0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 10,
            }}
          >
            <FaIcon icon="xmark" size={80} color="#FFFFFF" />
          </div>
        )}
      </div>
    </div>
  );
};
