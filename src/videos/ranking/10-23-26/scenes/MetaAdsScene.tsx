import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { FaIcon } from '../../../../shared/FaIcon';

interface MetaAdsSceneProps {
  currentFrame: number;
  startFrame: number;
  endFrame: number;
}

export const MetaAdsScene: React.FC<MetaAdsSceneProps> = ({
  currentFrame,
  startFrame,
  endFrame,
}) => {
  const { fps } = useVideoConfig();

  if (currentFrame < startFrame || currentFrame > endFrame) {
    return null;
  }

  const localFrame = currentFrame - startFrame;

  // Scene entrance & exit
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

  // Transition trigger: at frame 50 ("nhưng rất dễ đốt tiền nếu không biết tối ưu")
  const isBurningHard = localFrame >= 50;

  // 1. LEFT SIDE: NGỌN LỬA ĐỐT TIỀN (FLAME / BURN COST)
  // Early (localFrame < 50): small flame (~0.85), cost -$250
  // Later (localFrame >= 50): flame shoots up to 1.55x, rises higher, cost surges to -$3,850!
  const flameSpring = spring({
    frame: Math.max(0, localFrame - 50),
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const flameScale = isBurningHard
    ? interpolate(flameSpring, [0, 1], [0.85, 1.55])
    : 0.85;

  const flameRise = isBurningHard
    ? interpolate(flameSpring, [0, 1], [0, 28])
    : 0;

  const flameShakeX = isBurningHard ? Math.sin(localFrame * 0.9) * 6 : 0;
  const flameRotate = Math.sin(localFrame * 0.28) * (isBurningHard ? 7 : 3.5);
  const flameFlicker = Math.sin(localFrame * (isBurningHard ? 0.75 : 0.35)) * (isBurningHard ? 0.12 : 0.06);

  // Burn cost number: starts at -$250, surges to -$3,850
  const burnProgress = isBurningHard
    ? interpolate(flameSpring, [0, 1], [0, 1])
    : interpolate(localFrame, [10, 45], [0, 0.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const burnAmount = Math.round(interpolate(burnProgress, [0, 1], [-250, -3850]));

  // Rising embers from the burning fire
  const embers = [
    { offset: 0, x: -35, speed: 2.2 },
    { offset: 12, x: 25, speed: 2.6 },
    { offset: 25, x: -15, speed: 2.9 },
    { offset: 38, x: 38, speed: 2.3 },
  ];

  // 2. RIGHT SIDE: SỐ TIỀN KIẾM ĐƯỢC (EARNED REVENUE / MONEY ICON)
  // Early (localFrame < 50): large money icon (1.35x), revenue +$4,200 (vibrant green)
  // Later (localFrame >= 50): shrinks down to 0.68x, sinks, drops to +$180!
  const earnSpring = spring({
    frame: Math.max(0, localFrame - 50),
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 95 },
  });

  const earnScale = isBurningHard
    ? interpolate(earnSpring, [0, 1], [1.35, 0.68])
    : 1.35 + Math.sin(localFrame * 0.15) * 0.04;

  const earnSink = isBurningHard
    ? interpolate(earnSpring, [0, 1], [0, 24])
    : 0;

  const earnAmount = isBurningHard
    ? Math.round(interpolate(earnSpring, [0, 1], [4200, 180]))
    : Math.round(interpolate(localFrame, [12, 45], [1200, 4200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

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
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 30,
        opacity: sceneOpacity,
        transform: `scale(${sceneScale})`,
        pointerEvents: 'none',
      }}
    >
      {/* LEFT COLUMN: ĐỐT TIỀN (FIRE & ADS COST) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 380,
          gap: 22,
        }}
      >
        {/* Fire Icon with flame surge & rising embers */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translate(${flameShakeX}px, -${flameRise}px) scale(${flameScale + flameFlicker}) rotate(${flameRotate}deg)`,
            transformOrigin: 'center bottom',
            filter: isBurningHard
              ? 'drop-shadow(0 16px 36px rgba(239, 68, 68, 0.65)) drop-shadow(0 0 24px rgba(245, 158, 11, 0.45))'
              : 'drop-shadow(0 10px 24px rgba(239, 68, 68, 0.35))',
            transition: 'filter 0.2s ease',
          }}
        >
          <FaIcon icon="fire" size={135} color="#EF4444" />

          {/* Embers */}
          {embers.map((ember, i) => {
            const t = ((localFrame + ember.offset) * ember.speed) % 75;
            const emberY = -t * 1.9;
            const emberOpacity = interpolate(t, [0, 15, 55, 75], [0, 1, 0.85, 0]);
            const emberScale = interpolate(t, [0, 35, 75], [0.6, 1, 0.4]);

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${ember.x + Math.sin(t * 0.18) * 14}px)`,
                  top: emberY,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: i % 2 === 0 ? '#F59E0B' : '#EF4444',
                  opacity: emberOpacity,
                  transform: `scale(${emberScale})`,
                  boxShadow: '0 0 10px #F59E0B',
                }}
              />
            );
          })}
        </div>

        {/* Cost Number */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: '#DC2626',
              letterSpacing: '-1.5px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transform: isBurningHard ? `scale(${1 + Math.sin(localFrame * 0.4) * 0.03})` : 'scale(1)',
            }}
          >
            {burnAmount.toLocaleString()} $
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#EF4444',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Đốt tiền Ads
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: SỐ TIỀN KIẾM ĐƯỢC (EARNED REVENUE / MONEY ICON) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 380,
          gap: 22,
        }}
      >
        {/* Money Icon (Large -> Shrunken) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${earnSink}px) scale(${earnScale})`,
            filter: isBurningHard
              ? 'drop-shadow(0 6px 14px rgba(100, 116, 139, 0.25))'
              : 'drop-shadow(0 14px 32px rgba(16, 185, 129, 0.45)) drop-shadow(0 0 20px rgba(52, 211, 153, 0.35))',
            transition: 'filter 0.3s ease',
          }}
        >
          <FaIcon
            icon="money-bill"
            size={135}
            color={isBurningHard ? '#94A3B8' : '#10B981'}
          />
        </div>

        {/* Earned Amount */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: isBurningHard ? '#64748B' : '#059669',
              letterSpacing: '-1.5px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'color 0.3s ease',
            }}
          >
            +{earnAmount.toLocaleString()} $
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: isBurningHard ? '#94A3B8' : '#10B981',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
          >
            Kiếm được
          </span>
        </div>
      </div>
    </div>
  );
};
