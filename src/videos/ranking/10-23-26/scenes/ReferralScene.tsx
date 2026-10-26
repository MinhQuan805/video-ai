import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { FaIcon } from '../../../../shared/FaIcon';

interface ReferralSceneProps {
  currentFrame: number;
  startFrame: number;
  endFrame: number;
}

const NODES = [
  { x: 190, y: 190, length: 322 },
  { x: 330, y: 130, length: 260 },
  { x: 470, y: 105, length: 245 },
  { x: 610, y: 130, length: 260 },
  { x: 750, y: 190, length: 322 },
];

const CENTER_X = 470;
const CENTER_Y = 350;

export const ReferralScene: React.FC<ReferralSceneProps> = ({
  currentFrame,
  startFrame,
  endFrame,
}) => {
  const { fps } = useVideoConfig();

  if (currentFrame < startFrame || currentFrame > endFrame) {
    return null;
  }

  const localFrame = currentFrame - startFrame;

  // Overall scene entrance & exit
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 140 },
  });

  const exitProgress = interpolate(currentFrame, [endFrame - 8, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sceneOpacity = interpolate(entrance, [0, 1], [0, 1]) * (1 - exitProgress);
  const sceneScale = interpolate(entrance, [0, 1], [0.94, 1]) * (1 - exitProgress * 0.05);

  // 1. Center Node Entrance (Frame 0-16)
  const centerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 11, mass: 0.6, stiffness: 180 },
  });
  const centerScale = interpolate(centerSpring, [0, 1], [0, 1]);

  // Center breathing pulse
  const centerPulse = 1 + Math.sin(localFrame * 0.12) * 0.03;

  // 2. Trust Halo shockwave (Frame 48+)
  const isSuperTrust = localFrame >= 48;
  const burstProgress = isSuperTrust ? ((localFrame - 48) % 40) / 40 : 0;
  const burstScale = isSuperTrust ? interpolate(burstProgress, [0, 1], [0.5, 2.3]) : 0;
  const burstOpacity = isSuperTrust ? interpolate(burstProgress, [0, 0.25, 1], [0.75, 0.35, 0]) : 0;

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
        opacity: sceneOpacity,
        transform: `scale(${sceneScale})`,
        pointerEvents: 'none',
      }}
    >
      {/* Golden Trust Halo Shockwave from Center */}
      {isSuperTrust && (
        <div
          style={{
            position: 'absolute',
            left: CENTER_X,
            top: CENTER_Y,
            width: 280,
            height: 280,
            borderRadius: '50%',
            border: '3px solid #F59E0B',
            transform: `translate(-50%, -50%) scale(${burstScale})`,
            opacity: burstOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* SVG Connecting Lines between Center Node and 5 Satellite Nodes */}
      <svg
        width={940}
        height={580}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
        }}
      >
        {NODES.map((node, i) => {
          // Lines draw on sequentially: frame 8 to 28
          const lineSpring = spring({
            frame: Math.max(0, localFrame - 8 - i * 3),
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 160 },
          });

          const drawProgress = interpolate(lineSpring, [0, 1], [0, 1]);
          const dashOffset = node.length * (1 - drawProgress);

          // Energy pulse traveling along line
          const pulsePhase = ((localFrame + i * 7) % 36) / 36;
          const pulseX = interpolate(pulsePhase, [0, 1], [CENTER_X, node.x]);
          const pulseY = interpolate(pulsePhase, [0, 1], [CENTER_Y, node.y]);

          return (
            <g key={i}>
              {/* Connection Line */}
              <line
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={node.x}
                y2={node.y}
                stroke="#FCD34D"
                strokeWidth={3.5}
                strokeDasharray={node.length}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                opacity={0.88}
              />

              {/* Energy pulse traveling outward */}
              {drawProgress > 0.8 && (
                <circle
                  cx={pulseX}
                  cy={pulseY}
                  r={5}
                  fill="#F59E0B"
                  opacity={0.95}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* 5 Satellite Nodes -> Morphing into 5 Golden Stars */}
      {NODES.map((node, i) => {
        // Satellite circle entrance (frame 16 + i * 4)
        const nodeSpring = spring({
          frame: Math.max(0, localFrame - 16 - i * 4),
          fps,
          config: { damping: 12, mass: 0.5, stiffness: 190 },
        });
        const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);

        // Star reveal trigger (frame 42 + i * 5)
        const starTriggerFrame = 42 + i * 5;
        const hasStarStarted = localFrame >= starTriggerFrame;
        const starSpring = spring({
          frame: Math.max(0, localFrame - starTriggerFrame),
          fps,
          config: { damping: 10, mass: 0.5, stiffness: 210 },
        });

        // Circle node shrinks out when star blooms
        const circleScale = hasStarStarted
          ? interpolate(starSpring, [0, 0.4], [1, 0], { extrapolateRight: 'clamp' })
          : 1;

        // Star scale with overshoot
        const starScale = hasStarStarted
          ? interpolate(starSpring, [0, 0.6, 1], [0, 1.25, 1])
          : 0;
        const starRotate = interpolate(starSpring, [0, 1], [-30, 0]);

        // Harmonic wave float (floating like liquid gold)
        const waveFloatY = Math.sin((localFrame + i * 8) * 0.14) * 8;

        // Continuous light shimmer passing through stars
        const shimmerPhase = (localFrame * 0.08 - i * 0.25) % 3;
        const isShimmering = shimmerPhase > 0 && shimmerPhase < 0.8;
        const shimmerBoost = isShimmering ? 1.12 : 1.0;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              transform: `translate(-50%, -50%) translateY(${waveFloatY}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Phase 1: Satellite User Node Circle (Enlarged 84px) */}
            {circleScale > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '2.5px solid #FCD34D',
                  boxShadow: '0 8px 24px rgba(245, 158, 11, 0.22), 0 2px 6px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${nodeScale * circleScale})`,
                }}
              >
                <FaIcon icon="user" size={44} color="#D97706" />
              </div>
            )}

            {/* Phase 2: Radiant Golden Star ⭐ (Enlarged 102px) */}
            {hasStarStarted && (
              <div
                style={{
                  transform: `scale(${starScale * shimmerBoost}) rotate(${starRotate}deg)`,
                  filter: isSuperTrust
                    ? 'drop-shadow(0 14px 28px rgba(245, 158, 11, 0.65)) drop-shadow(0 0 16px rgba(251, 191, 36, 0.5))'
                    : 'drop-shadow(0 10px 22px rgba(245, 158, 11, 0.45)) drop-shadow(0 2px 6px rgba(217, 119, 6, 0.25))',
                }}
              >
                <FaIcon icon="star" size={102} color="#F59E0B" />
              </div>
            )}
          </div>
        );
      })}

      {/* Central Person / User Circle Node (Khách Cũ - Enlarged 104px) */}
      <div
        style={{
          position: 'absolute',
          left: CENTER_X,
          top: CENTER_Y,
          transform: `translate(-50%, -50%) scale(${centerScale * centerPulse})`,
          width: 104,
          height: 104,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          border: '3.5px solid #C6532A',
          boxShadow: '0 14px 34px rgba(198, 83, 42, 0.24), 0 3px 10px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
        }}
      >
        <FaIcon icon="user" size={54} color="#C6532A" />
      </div>
    </div>
  );
};
