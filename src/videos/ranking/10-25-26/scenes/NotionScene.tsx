import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {FaIcon} from '../../../../shared/FaIcon';
import {Stage} from './Stage';
import {settle, travel} from './motion';

export const NotionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Story Act 1: Blank canvas with command prompt & floating loose blocks (local frames 57 - 90)
  const canvasEntry = settle(frame, 57, fps, 24);

  // Story Act 2: Drag handle appears and pulls blocks into grid alignment (local frames 95 - 124)
  const dragProgress = travel(frame, 98, 118);
  const block3Snap = settle(frame, 118, fps, 18);

  const blocks = [
    {icon: 'columns', color: '#EDE9FE', border: '#C4B5FD', iconColor: '#7C3AED', floatX: -70, floatY: -35, rot: -8},
    {icon: 'list-check', color: '#E0F2FE', border: '#BAE6FD', iconColor: '#0284C7', floatX: 10, floatY: 55, rot: 6},
    {icon: 'filter', color: '#FEF3C7', border: '#FDE68A', iconColor: '#D97706', floatX: 75, floatY: -20, rot: -12},
  ];

  return (
    <Stage index={3} title="Notion">
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
        {/* Notion Workspace Sheet Card */}
        <div
          style={{
            position: 'relative',
            width: 740,
            height: 380,
            background: '#FFFFFF',
            borderRadius: 24,
            border: '2px solid #E2E8F0',
            boxShadow: '0 18px 45px rgba(15, 23, 42, 0.06)',
            padding: '24px 30px',
            boxSizing: 'border-box',
            opacity: canvasEntry,
            transform: `scale(${0.95 + canvasEntry * 0.05})`,
          }}
        >
          {/* Top Command Line Prompt: /crm template */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              paddingBottom: 16,
              borderBottom: '1.5px solid #F1F5F9',
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: '#1E293B',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 900,
              }}
            >
              N
            </div>
            <span style={{fontSize: 18, fontWeight: 700, color: '#64748B'}}>
              /crm template
            </span>
            <span
              style={{
                width: 2,
                height: 20,
                background: '#3B82F6',
                opacity: Math.sin(frame * 0.35) > 0 ? 1 : 0,
              }}
            />
            {dragProgress > 0 && (
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.6,
                }}
              >
                <FaIcon icon="grip-vertical" size={16} color="#94A3B8" />
              </div>
            )}
          </div>

          {/* Assembly Stage: 3 Pastel Blocks drifting then snapping into place */}
          <div style={{position: 'relative', width: '100%', height: 230}}>
            {blocks.map((blk, idx) => {
              const targetX = idx * 235;
              const targetY = 10;

              // Before snap: floating with sinusoidal drift
              const floatDriftX = blk.floatX * (1 - dragProgress) + Math.sin(frame * 0.06 + idx) * 4;
              const floatDriftY = blk.floatY * (1 - dragProgress) + Math.cos(frame * 0.06 + idx) * 5;

              // Block 3 micro-wobble during alignment
              const rot =
                idx === 2
                  ? (1 - block3Snap) * 14 * Math.sin(frame * 0.5)
                  : blk.rot * (1 - dragProgress);

              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: targetY + floatDriftY,
                    left: targetX + floatDriftX,
                    width: 210,
                    height: 200,
                    borderRadius: 20,
                    background: blk.color,
                    border: `2px solid ${blk.border}`,
                    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    boxSizing: 'border-box',
                    transform: `rotate(${rot}deg)`,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 14,
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
                    }}
                  >
                    <FaIcon icon={blk.icon} size={24} color={blk.iconColor} />
                  </div>

                  {/* Skeleton bars simulating content inside block */}
                  <div style={{width: 90, height: 11, borderRadius: 6, background: blk.border, marginBottom: 8}} />
                  <div style={{width: 60, height: 8, borderRadius: 4, background: blk.border, opacity: 0.7}} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Stage>
  );
};
