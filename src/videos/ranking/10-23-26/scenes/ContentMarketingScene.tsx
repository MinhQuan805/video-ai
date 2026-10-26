import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';

interface ContentMarketingSceneProps {
  currentFrame: number;
  startFrame: number;
  endFrame: number;
}

export const ContentMarketingScene: React.FC<ContentMarketingSceneProps> = ({
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

  // Speech-synced two-phase line draw:
  // Phase 1 (f.0-80: "cần kiên trì..."): Crawls slowly along flat baseline (0% -> 58% length)
  // Phase 2 (f.80-112: "mới thấy kết quả!"): Rockets upward steeply to 100%!
  let drawProgress = 1;
  if (localFrame < 80) {
    drawProgress = interpolate(localFrame, [5, 80], [1, 0.42], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else {
    drawProgress = interpolate(localFrame, [80, 112], [0.42, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Reach peak trigger at frame 110
  const isPeaked = localFrame >= 110;
  const badgeSpring = spring({
    frame: Math.max(0, localFrame - 108),
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 220 },
  });
  const badgeScale = isPeaked ? interpolate(badgeSpring, [0, 1], [0, 1]) : 0;

  // Continuous sonar pulse at the graph tip once peaked
  const pulsePhase = isPeaked ? ((localFrame - 110) % 32) / 32 : 0;
  const pulseScale = isPeaked ? interpolate(pulsePhase, [0, 1], [0.6, 2.4]) : 0;
  const pulseOpacity = isPeaked ? interpolate(pulsePhase, [0, 0.3, 1], [0.8, 0.4, 0]) : 0;

  // Subtle breathing on badge once settled
  const badgeBreath = isPeaked ? Math.sin(localFrame * 0.15) * 0.03 : 0;

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
      {/* 1 Main Hero Motion: Speech-Synced Hockey Stick Growth Curve */}
      <div
        style={{
          position: 'relative',
          width: 780,
          height: 320,
        }}
      >
        {/* Subtle grid guidelines */}
        <svg width="780" height="320" viewBox="0 0 780 320" style={{ position: 'absolute', left: 0, top: 0 }}>
          <line x1="20" y1="70" x2="760" y2="70" stroke="#F1F5F9" strokeWidth="2.5" strokeDasharray="8 8" />
          <line x1="20" y1="170" x2="760" y2="170" stroke="#F1F5F9" strokeWidth="2.5" strokeDasharray="8 8" />
          <line x1="20" y1="270" x2="760" y2="270" stroke="#E2E8F0" strokeWidth="2.5" />

          {/* Hockey stick curve path */}
          <path
            d="M 30 265 C 110 258, 180 272, 260 260 C 340 252, 420 266, 500 256 C 565 250, 610 246, 650 195 L 735 45"
            fill="none"
            stroke="#10B981"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={drawProgress}
          />
        </svg>

        {/* Sonar shockwave at tip once peaked (x: 735, y: 45) */}
        {isPeaked && (
          <div
            style={{
              position: 'absolute',
              left: 735 - 20,
              top: 45 - 20,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '3px solid #10B981',
              transform: `scale(${pulseScale})`,
              opacity: pulseOpacity,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Growth Peak Badge (+48K) */}
        {isPeaked && (
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              transform: `scale(${badgeScale + badgeBreath})`,
              transformOrigin: 'bottom left',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#ECFDF5',
              border: '2.5px solid #86EFAC',
              padding: '8px 24px',
              borderRadius: 20,
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)',
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: '#059669',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              +48K Reach 🚀
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
