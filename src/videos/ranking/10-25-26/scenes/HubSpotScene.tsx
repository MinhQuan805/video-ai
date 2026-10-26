import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FaIcon} from '../../../../shared/FaIcon';
import {Stage} from './Stage';
import {ease, settle, travel} from './motion';

export const HubSpotScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Story Act 1: 3 pricing pedestals rise (local frames 56 - 95)
  const hop1 = travel(frame, 68, 86);
  const hop2 = travel(frame, 88, 108);

  // Story Act 2: Pro pedestal rises out of reach & Padlock slams shut (local frames 108 - 128)
  const proShootUp = settle(frame, 110, fps, 20);
  const lockSlam = settle(frame, 116, fps, 18);

  // Story Act 3: Price badge escalates ($500+/tháng) (local frames 126 - 155)
  const pricePop = settle(frame, 132, fps, 22);

  // Ball parabolic motion coordinates
  const ballProgress = hop1 * 235 + hop2 * 235;
  const ballArc1 = Math.sin(Math.min(1, hop1) * Math.PI) * 45;
  const ballArc2 = Math.sin(Math.min(1, hop2) * Math.PI) * 55;
  const ballY = 90 + hop1 * 50 + hop2 * 80 + (hop2 > 0 ? ballArc2 : ballArc1);

  // Lock slam physics
  const lockScale = 0.5 + lockSlam * 0.5;
  const lockY = (1 - lockSlam) * -60;

  return (
    <Stage index={2} title="HubSpot">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 480,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: 20,
        }}
      >
        <div style={{position: 'relative', width: 750, height: 420}}>
          {/* 3 Pedestal Cards */}
          {[
            {name: 'Free', baseH: 150, color: '#94A3B8', bg: '#F8FAFC'},
            {name: 'Starter', baseH: 210, color: '#3B82F6', bg: '#EFF6FF'},
            {name: 'Pro', baseH: 270, color: '#FF7A59', bg: '#FFF7ED'},
          ].map((tier, idx) => {
            const entry = settle(frame, 56 + idx * 8, fps, 24);
            const extraH = idx === 2 ? proShootUp * 50 : 0;
            const currentH = (tier.baseH + extraH) * entry;

            return (
              <div
                key={tier.name}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: idx * 255,
                  width: 230,
                  height: Math.max(10, currentH),
                  borderRadius: '24px 24px 12px 12px',
                  background: tier.bg,
                  border: `2px solid ${idx === 2 ? '#FF7A59' : '#E2E8F0'}`,
                  boxShadow:
                    idx === 2
                      ? '0 20px 45px rgba(255, 122, 89, 0.16)'
                      : '0 8px 24px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '18px 16px',
                  boxSizing: 'border-box',
                  opacity: ease(frame, 56 + idx * 8, 68 + idx * 8),
                }}
              >
                {/* Official HubSpot Logo on Pro Card */}
                {idx === 2 ? (
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 14,
                      background: '#FFFFFF',
                      padding: 6,
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      marginBottom: 8,
                      boxShadow: '0 4px 12px rgba(255, 122, 89, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Img
                      src={staticFile('icon/hubspot.png')}
                      style={{width: '100%', height: '100%', objectFit: 'contain'}}
                    />
                  </div>
                ) : (
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: '#1E293B',
                      marginBottom: 8,
                    }}
                  >
                    {tier.name}
                  </span>
                )}

                {/* Skeleton Feature ticks */}
                <div style={{display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 8}}>
                  {[0, 1].map((k) => (
                    <div key={k} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: idx === 2 ? '#FFEDD5' : '#E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FaIcon icon="check" size={9} color={idx === 2 ? '#EA580C' : '#94A3B8'} />
                      </div>
                      <div
                        style={{
                          height: 8,
                          borderRadius: 4,
                          background: idx === 2 ? '#FDBA74' : '#CBD5E1',
                          width: '75%',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Pro Tier Lock & Gate */}
                {idx === 2 && lockSlam > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12 + lockY,
                      width: 58,
                      height: 58,
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '2px solid #EA580C',
                      boxShadow: '0 8px 20px rgba(234, 88, 12, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `scale(${lockScale})`,
                      opacity: lockSlam,
                      zIndex: 20,
                    }}
                  >
                    <FaIcon icon="lock" size={26} color="#EA580C" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Energy Ball leaping across tiers */}
          {frame < 128 && (
            <div
              style={{
                position: 'absolute',
                left: 105 + ballProgress,
                bottom: ballY,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#FF7A59',
                boxShadow: '0 0 16px rgba(255, 122, 89, 0.8)',
                zIndex: 30,
                opacity: ease(frame, 62, 70),
              }}
            />
          )}

          {/* Act 3 Payoff: Pure Price Metric Badge with HubSpot Logo */}
          {pricePop > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 260,
                background: '#FFFFFF',
                borderRadius: 20,
                border: '2.5px solid #EF4444',
                boxShadow: '0 16px 36px rgba(239, 68, 68, 0.20)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                opacity: pricePop,
                transform: `scale(${0.8 + pricePop * 0.2}) translateY(${(1 - pricePop) * 15}px)`,
                zIndex: 40,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(255, 122, 89, 0.2)',
                }}
              >
                <Img
                  src={staticFile('icon/hubspot.png')}
                  style={{width: '100%', height: '100%', objectFit: 'contain'}}
                />
              </div>
              <div style={{fontSize: 28, fontWeight: 900, color: '#DC2626', letterSpacing: '-0.5px'}}>
                $500+ / tháng
              </div>
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
};
