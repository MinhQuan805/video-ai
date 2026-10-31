import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface CartridgeModule {
  title: string;
  icon: string;
  xOffset?: number;
  opacity?: number;
}

export interface ModularDockingChassisProps {
  isLocked?: boolean;
  lockBarProgress?: number;
  lockBarY?: number;
  statusText?: string;
  badgeText?: string;
  modules?: CartridgeModule[];
  width?: number;
  height?: number;
  scale?: number;
  opacity?: number;
  yOffset?: number;
  style?: React.CSSProperties;
}

/**
 * Modular Docking Chassis with overhead hydraulic clamping rail,
 * LED status beacon, and 3 high-impact snap-in skill cartridges.
 */
export const ModularDockingChassis: React.FC<ModularDockingChassisProps> = ({
  isLocked = false,
  lockBarProgress = 1,
  lockBarY = 0,
  statusText,
  badgeText = '3-IN-1 MODULAR CORE',
  modules = [
    { title: 'QUY TRÌNH', icon: 'sliders' },
    { title: 'BÀI MẪU', icon: 'scroll' },
    { title: 'DỮ LIỆU', icon: 'book' },
  ],
  width = 840,
  height = 380,
  scale = 1,
  opacity = 1,
  yOffset = 0,
  style,
}) => {
  if (opacity <= 0.005) return null;

  const currentStatus =
    statusText || (isLocked ? 'SKILL LOCKED & READY' : 'INSERTING MODULES...');

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: '#FAF7F0',
        borderRadius: 26,
        border: '2.5px solid #C8BCAB',
        boxShadow: '0 24px 50px rgba(60, 48, 36, 0.14)',
        padding: '26px 32px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: `translateY(${yOffset}px) scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {/* Top Chassis Status Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1.5px solid rgba(26,24,22,0.1)',
          paddingBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: '50%',
              backgroundColor: isLocked ? '#16A34A' : '#D97706',
              boxShadow: `0 0 12px ${isLocked ? '#16A34A' : '#D97706'}`,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              color: COLORS.ink,
              fontWeight: 800,
            }}
          >
            {currentStatus}
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            color: COLORS.accent,
            fontWeight: 700,
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* Overhead Locking Rail (Clamps down when locked) */}
      <div
        style={{
          position: 'absolute',
          top: 62,
          left: 32,
          right: 32,
          height: 10,
          backgroundColor: isLocked ? COLORS.accent : '#D1C4B2',
          borderRadius: 5,
          boxShadow: isLocked ? '0 0 14px rgba(198, 83, 42, 0.45)' : 'none',
          transform: `translateY(${lockBarY}px)`,
          opacity: lockBarProgress,
          zIndex: 20,
        }}
      />

      {/* Modular Cartridge Slots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          marginTop: 14,
        }}
      >
        {modules.map((mod, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              height: 220,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              border: '2px solid #E2D9CC',
              boxShadow: '0 8px 22px rgba(60, 48, 36, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              transform: `translateX(${mod.xOffset ?? 0}px)`,
              opacity: mod.opacity ?? 1,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: 'rgba(198, 83, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaIcon icon={mod.icon} size={30} color={COLORS.accent} />
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 16,
                fontWeight: 900,
                color: COLORS.ink,
                letterSpacing: '0.05em',
              }}
            >
              {mod.title}
            </div>
            <div
              style={{
                width: 44,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: isLocked ? COLORS.accent : '#C8BCAB',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
