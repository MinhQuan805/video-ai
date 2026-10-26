import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FaIcon} from '../../../../shared/FaIcon';
import data from '../scenes.json';
import {FONT, INK, ease} from './Stage';
import {layer, settle} from './motion';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleEntry = layer(frame, 3, fps, 24);
  const inputEntry = settle(frame, 10, fps, 24);

  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: 250,
        width: 880,
        height: 600,
        fontFamily: FONT,
        color: INK,
      }}
    >
      {/* Title Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 36,
          ...titleEntry,
        }}
      >
        <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: INK,
              letterSpacing: '-1px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Đâu Là
          </span>
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              fontStyle: 'italic',
              color: '#DE7356',
              letterSpacing: '-1px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Hạng S Của Bạn?
          </span>
        </div>
      </div>

      {/* Interactive Search / Comment Input Box */}
      <div
        style={{
          width: '100%',
          height: 92,
          border: '2px solid #E2E8F0',
          borderRadius: 24,
          background: '#FFFFFF',
          boxShadow: '0 14px 35px rgba(15, 23, 42, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '0 28px',
          boxSizing: 'border-box',
          opacity: inputEntry,
          transform: `scale(${0.95 + inputEntry * 0.05})`,
          marginBottom: 44,
        }}
      >
        <FaIcon icon="comment-dots" size={26} color="#DE7356" />
        <span style={{fontSize: 22, fontWeight: 700, color: '#64748B'}}>
          Bình luận công cụ của bạn…
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 2.5,
            height: 28,
            background: '#DE7356',
            opacity: Math.sin(frame * 0.35) > 0 ? 1 : 0,
          }}
        />
        <div
          style={{
            marginLeft: 'auto',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#DE7356',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaIcon icon="arrow-up" size={18} color="white" />
        </div>
      </div>

      {/* 5 Brand Logo Badges Floating & Waving */}
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 8px'}}>
        {data.scenes
          .filter((scene) => scene.tier)
          .map((scene, i) => {
            const reveal = settle(frame, 8 + i * 3, fps, 22);
            const wave = Math.sin(frame * 0.08 + i * 0.8) * 5;

            return (
              <div
                key={scene.id}
                style={{
                  position: 'relative',
                  width: 104,
                  height: 104,
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  borderRadius: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: ease(frame, 8 + i * 3, 18 + i * 3),
                  transform: `translateY(${(1 - reveal) * 30 + wave}px) scale(${0.88 + reveal * 0.12})`,
                  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
                }}
              >
                <Img
                  src={staticFile(scene.icon)}
                  style={{width: 64, height: 64, objectFit: 'contain'}}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
