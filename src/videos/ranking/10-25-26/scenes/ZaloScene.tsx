import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FaIcon} from '../../../../shared/FaIcon';
import {Stage} from './Stage';
import {ease, settle, travel} from './motion';

export const ZaloScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Story Act 1: VIP message glides in (frames 52 - 75)
  const vipEntry = settle(frame, 53, fps, 24);

  // Story Act 2: Wave of incoming new chats (frames 73, 83, 93)
  const arrivals = [73, 83, 93];
  const pushDown = arrivals.reduce((sum, from) => sum + travel(frame, from, from + 16), 0);
  const badgeStep = travel(frame, 76, 88) + travel(frame, 91, 102);

  // Story Act 3: VIP message gets submerged into the abyss (frames 103 - 128)
  const sinkProgress = travel(frame, 103, 126);
  const vipOpacity = Math.max(0, 1 - sinkProgress * 1.05);
  const vipDisplacement = pushDown * 88 + sinkProgress * 140;

  return (
    <Stage index={0} title="Zalo">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 480,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 15,
        }}
      >
        {/* Chat Feed Container */}
        <div
          style={{
            position: 'relative',
            width: 760,
            height: 430,
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
          }}
        >
          {/* Act 1 & 3: Hero VIP Customer Message Pill */}
          <div
            style={{
              position: 'absolute',
              top: vipDisplacement,
              left: 20,
              width: 720,
              height: 94,
              borderRadius: 24,
              background: '#FFFFFF',
              border: '2px solid #F59E0B',
              boxShadow: '0 12px 30px rgba(245, 158, 11, 0.12)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              gap: 20,
              zIndex: 10,
              opacity: (0.2 + vipEntry * 0.8) * vipOpacity,
              transform: `translateY(${(1 - vipEntry) * 40}px) scale(${0.96 + vipEntry * 0.04}) rotate(${sinkProgress * 3}deg)`,
            }}
          >
            {/* VIP Avatar */}
            <div
              style={{
                position: 'relative',
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FaIcon icon="user" size={24} color="#D97706" />
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                }}
              >
                <FaIcon icon="star" size={11} color="white" />
              </div>
            </div>

            {/* Skeleton text bars */}
            <div style={{flex: 1}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}>
                <div style={{width: 140, height: 14, borderRadius: 7, background: '#1E293B'}} />
                <div style={{width: 60, height: 12, borderRadius: 6, background: '#FDE68A'}} />
              </div>
              <div style={{width: 280, height: 11, borderRadius: 6, background: '#E2E8F0'}} />
            </div>

            {/* Online indicator */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
              }}
            />
          </div>

          {/* Act 2: Incoming Wave of Regular Chats with Official Zalo App Logo */}
          {[0, 1, 2].map((i) => {
            const entry = settle(frame, arrivals[i], fps, 22);
            const laterPush = arrivals
              .slice(i + 1)
              .reduce((sum, from) => sum + travel(frame, from, from + 16), 0);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: laterPush * 88 - (1 - entry) * 40,
                  left: 20,
                  width: 720,
                  height: 94,
                  borderRadius: 24,
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 24px',
                  gap: 20,
                  opacity: ease(frame, arrivals[i], arrivals[i] + 8),
                  transform: `scale(${0.96 + entry * 0.04})`,
                }}
              >
                {/* Official Zalo Logo on incoming chats */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0, 104, 255, 0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Img
                    src={staticFile('icon/zalo.png')}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
                <div style={{flex: 1}}>
                  <div
                    style={{
                      width: 220 - i * 35,
                      height: 13,
                      borderRadius: 6,
                      background: '#CBD5E1',
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      width: 150 + i * 20,
                      height: 10,
                      borderRadius: 5,
                      background: '#E2E8F0',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Notification Badge: 1 -> 12 -> 99+ Surging */}
        <div
          style={{
            position: 'absolute',
            top: 2,
            right: 48,
            padding: '6px 16px',
            background: '#EF4444',
            color: 'white',
            borderRadius: 20,
            fontSize: 26,
            fontWeight: 900,
            border: '4px solid #F9F8F6',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.35)',
            transform: `scale(${0.7 + settle(frame, 72, fps, 20) * 0.3 + (badgeStep > 1 ? Math.sin(frame * 0.8) * 0.05 : 0)})`,
            opacity: ease(frame, 72, 80),
            zIndex: 30,
          }}
        >
          <div style={{height: 36, overflow: 'hidden'}}>
            <div style={{transform: `translateY(${-badgeStep * 36}px)`}}>
              {['1', '12', '99+'].map((num) => (
                <div key={num} style={{height: 36, lineHeight: '36px', textAlign: 'center'}}>
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
};
