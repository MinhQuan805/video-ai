import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { FaIcon } from '../../../../shared/FaIcon';

interface ColdOutreachSceneProps {
  currentFrame: number;
  startFrame: number;
  endFrame: number;
}

// 5 Surrounding client prospects (surrounding the center locked lead)
const PROSPECTS = [
  { x: 470, y: 88, delay: 0 },   // Top Center
  { x: 180, y: 195, delay: 4 },   // Upper Left
  { x: 760, y: 195, delay: 8 },   // Upper Right
  { x: 230, y: 415, delay: 12 },  // Lower Left
  { x: 710, y: 415, delay: 16 },  // Lower Right
];

export const ColdOutreachScene: React.FC<ColdOutreachSceneProps> = ({
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

  // Target lock happens at frame 55 ("Nếu nhắm đúng đối tượng")
  const isLocked = localFrame >= 55;

  // Continuous rotation for sniper crosshair
  const continuousRotation = localFrame * (isLocked ? 1.0 : 2.2);

  // Snap lock spring at frame 55
  const lockSpring = spring({
    frame: Math.max(0, localFrame - 55),
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 240 },
  });
  const lockScale = isLocked ? interpolate(lockSpring, [0, 1], [1.32, 1]) : 1.0;

  // Sonar radar pulse (repeats continuously every 35 frames)
  const pingPhase = (localFrame % 35) / 35;
  const pingScale = interpolate(pingPhase, [0, 1], [0.6, 2.0]);
  const pingOpacity = interpolate(pingPhase, [0, 0.3, 1], [0.8, 0.4, 0]);

  // Ambient breathing pulse when locked
  const lockedBreath = isLocked ? Math.sin(localFrame * 0.2) * 0.04 : 0;

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
        zIndex: 30,
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        pointerEvents: 'none',
      }}
    >
      {/* Container holding all prospect icons and central crosshair */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* 5 Surrounding Prospect Client Badges (Enlarged size) */}
        {PROSPECTS.map((p, idx) => {
          const pSpring = spring({
            frame: Math.max(0, localFrame - p.delay),
            fps,
            config: { damping: 12, mass: 0.5, stiffness: 180 },
          });
          const floatY = Math.sin((localFrame + idx * 15) * 0.12) * 7;

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                transform: `translate(-50%, -50%) translateY(${floatY}px) scale(${interpolate(pSpring, [0, 1], [0, 1])})`,
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '3px solid rgba(226, 232, 240, 0.95)',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.09), 0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isLocked ? 0.38 : 0.9,
                transition: 'opacity 0.35s ease',
              }}
            >
              <FaIcon icon="user" size={60} color="#64748B" />
            </div>
          );
        })}

        {/* Center Target Icon (The Main Locked Prospect - Extra Large) */}
        <div
          style={{
            position: 'absolute',
            left: 470,
            top: 290,
            transform: `translate(-50%, -50%) scale(${lockScale + lockedBreath})`,
            width: 340,
            height: 340,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          }}
        >
          {/* Continuous Sonar Radar Ping Wave */}
          <div
            style={{
              position: 'absolute',
              width: 170,
              height: 170,
              borderRadius: '50%',
              border: `3.5px solid ${isLocked ? '#EF4444' : '#3B82F6'}`,
              transform: `scale(${pingScale})`,
              opacity: pingOpacity,
              pointerEvents: 'none',
            }}
          />

          {/* Continuously Rotating Outer Concentric Target Rings */}
          <svg
            width="340"
            height="340"
            viewBox="0 0 340 340"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `rotate(${continuousRotation}deg)`,
            }}
          >
            <circle
              cx="170"
              cy="170"
              r="152"
              fill="none"
              stroke={isLocked ? '#EF4444' : '#94A3B8'}
              strokeWidth="4.5"
              strokeDasharray="24 16"
            />
            <circle
              cx="170"
              cy="170"
              r="104"
              fill="none"
              stroke={isLocked ? 'rgba(239, 68, 68, 0.45)' : 'rgba(148, 163, 184, 0.45)'}
              strokeWidth="3.5"
              strokeDasharray="14 10"
            />
            {/* 4 Crosshair lines */}
            <line x1="170" y1="4" x2="170" y2="48" stroke={isLocked ? '#EF4444' : '#64748B'} strokeWidth="5.5" strokeLinecap="round" />
            <line x1="170" y1="292" x2="170" y2="336" stroke={isLocked ? '#EF4444' : '#64748B'} strokeWidth="5.5" strokeLinecap="round" />
            <line x1="4" y1="170" x2="48" y2="170" stroke={isLocked ? '#EF4444' : '#64748B'} strokeWidth="5.5" strokeLinecap="round" />
            <line x1="292" y1="170" x2="336" y2="170" stroke={isLocked ? '#EF4444' : '#64748B'} strokeWidth="5.5" strokeLinecap="round" />
          </svg>

          {/* Center Target User Mark -> Turns Red Check on Lock (Extra Large 150px) */}
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: isLocked ? '#EF4444' : '#FFFFFF',
              border: isLocked ? 'none' : '3.5px solid rgba(226, 232, 240, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isLocked
                ? '0 16px 42px rgba(239, 68, 68, 0.58), 0 4px 12px rgba(0,0,0,0.12)'
                : '0 12px 32px rgba(15, 23, 42, 0.1)',
              transition: 'background-color 0.15s ease',
              zIndex: 2,
            }}
          >
            <FaIcon
              icon={isLocked ? 'check' : 'user'}
              size={76}
              color={isLocked ? '#FFFFFF' : '#3B82F6'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
