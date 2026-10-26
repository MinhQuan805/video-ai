import React from 'react';
import {Img, interpolateColors, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FaIcon} from '../../../../shared/FaIcon';
import {Stage} from './Stage';
import {ease, settle, travel} from './motion';

const RADIUS = 40;
const ARC = (Math.PI * RADIUS) / 2;
const LENGTH = 360 * 2 + ARC * 2 + 140;
const ROUTE = 'M250 180 H610 A40 40 0 0 1 650 220 V320 A40 40 0 0 1 610 360 H250';

const routePoint = (dist: number) => {
  if (dist <= 360) return {x: 250 + dist, y: 180};
  if (dist <= 360 + ARC) {
    const angle = -Math.PI / 2 + (dist - 360) / RADIUS;
    return {x: 610 + Math.cos(angle) * RADIUS, y: 220 + Math.sin(angle) * RADIUS};
  }
  if (dist <= 500 + ARC) return {x: 650, y: 220 + dist - 360 - ARC};
  if (dist <= 500 + ARC * 2) {
    const angle = (dist - 500 - ARC) / RADIUS;
    return {x: 610 + Math.cos(angle) * RADIUS, y: 320 + Math.sin(angle) * RADIUS};
  }
  return {x: 610 - (dist - 500 - ARC * 2), y: 360};
};

export const OdooScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Voiceover: 118 CRM, 143 Bán hàng, 167 Báo giá, 181 Hoá đơn, 197 "cùng một hệ thống"
  const nodes = [
    {label: 'CRM', icon: 'users', x: 250, y: 180, hit: 118},
    {label: 'Bán hàng', icon: 'handshake', x: 650, y: 180, hit: 143},
    {label: 'Báo giá', icon: 'file-invoice-dollar', x: 650, y: 360, hit: 167},
    {label: 'Hoá đơn', icon: 'receipt', x: 250, y: 360, hit: 181},
  ];

  const distance =
    travel(frame, 118, 143) * (360 + ARC) +
    travel(frame, 143, 167) * 140 +
    travel(frame, 167, 181) * (360 + ARC);

  const pulse = routePoint(distance);
  const pulseOpacity = ease(frame, 118, 124) * (1 - ease(frame, 183, 194));

  // Act 3: 4 modules collapse into center (450, 270) and morph into Odoo Logo
  const mergeProgress = travel(frame, 194, 208);
  const logoPop = settle(frame, 202, fps, 20);

  return (
    <Stage index={4} title="Odoo">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 480,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{position: 'relative', width: 880, height: 480}}>
          {/* Circuit SVG Track with Travelling Neon Pulse (fades out on merge) */}
          <svg
            width="880"
            height="480"
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'visible',
              opacity: Math.max(0, 1 - mergeProgress * 1.5),
            }}
          >
            {/* Background dashed conduit line */}
            <path d={ROUTE} fill="none" stroke="#E2E8F0" strokeWidth="4" strokeDasharray="6 6" />

            {/* Glowing active neon path */}
            <path
              d={ROUTE}
              pathLength="1"
              fill="none"
              stroke="#10B981"
              strokeWidth="5"
              strokeDasharray="1"
              strokeDashoffset={1 - distance / LENGTH}
              strokeLinecap="round"
            />

            {/* Travelling pulse particle */}
            <circle cx={pulse.x} cy={pulse.y} r="22" fill="#10B981" opacity={pulseOpacity * 0.25} />
            <circle cx={pulse.x} cy={pulse.y} r="8" fill="#10B981" opacity={pulseOpacity} />
          </svg>

          {/* 4 Connected Module Cards - Collapse inward on merge */}
          {nodes.map((node, idx) => {
            const blend = ease(frame, node.hit, node.hit + 14);
            const pop = settle(frame, node.hit + 2, fps, 22);
            const entry = settle(frame, 62 + idx * 6, fps, 26);

            // Interpolate toward center point (450, 270)
            const curX = node.x + (450 - node.x) * mergeProgress;
            const curY = node.y + (270 - node.y) * mergeProgress;
            const nodeOpacity = ease(frame, 62 + idx * 6, 74 + idx * 6) * Math.max(0, 1 - mergeProgress * 1.2);
            const nodeScale = (1 + Math.sin(Math.min(1, pop) * Math.PI) * 0.08) * (1 - mergeProgress * 0.3);

            return (
              <div
                key={node.label}
                style={{
                  position: 'absolute',
                  left: curX - 85,
                  top: curY - 60,
                  width: 170,
                  opacity: nodeOpacity,
                  transform: `translateY(${(1 - entry) * 25}px) scale(${nodeScale})`,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: 170,
                    height: 120,
                    borderRadius: 24,
                    background: interpolateColors(blend, [0, 1], ['#FFFFFF', '#ECFDF5']),
                    border: `2.5px solid ${interpolateColors(blend, [0, 1], ['#E2E8F0', '#10B981'])}`,
                    boxShadow: blend
                      ? '0 12px 30px rgba(16, 185, 129, 0.16)'
                      : '0 8px 24px rgba(15, 23, 42, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: interpolateColors(blend, [0, 1], ['#F1F5F9', '#D1FAE5']),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <FaIcon
                      icon={node.icon}
                      size={24}
                      color={interpolateColors(blend, [0, 1], ['#64748B', '#059669'])}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: interpolateColors(blend, [0, 1], ['#334155', '#065F46']),
                    }}
                  >
                    {node.label}
                  </span>

                  {/* Tick check badge */}
                  {blend > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: '#10B981',
                        border: '3px solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `scale(${pop})`,
                        boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      <FaIcon icon="check" size={13} color="white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Act 3 Payoff: Morph into Odoo Logo Card */}
          {logoPop > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 200,
                left: 300,
                width: 280,
                height: 140,
                background: '#FFFFFF',
                borderRadius: 28,
                border: '3px solid #714B67',
                boxShadow: '0 20px 50px rgba(113, 75, 103, 0.25), 0 0 35px rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 24px',
                boxSizing: 'border-box',
                opacity: logoPop,
                transform: `scale(${0.5 + logoPop * 0.5})`,
                zIndex: 30,
              }}
            >
              {/* Expanding glowing halo behind Odoo card */}
              <div
                style={{
                  position: 'absolute',
                  inset: -12,
                  borderRadius: 36,
                  border: '2px solid #10B981',
                  opacity: (1 - Math.min(1, (frame - 202) / 22)) * 0.8,
                  transform: `scale(${1 + Math.min(1, (frame - 202) / 22) * 0.3})`,
                  pointerEvents: 'none',
                }}
              />
              <Img
                src={staticFile('icon/odoo.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
};
