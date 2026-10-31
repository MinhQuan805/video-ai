import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS } from '../core/tokens';

export interface PromptVaultChestProps {
  lidAngle?: number;
  scale?: number;
  isUnlocked?: boolean;
  lockScale?: number;
  width?: number;
  height?: number;
  showShockwaves?: boolean;
  rings?: { scale: number; opacity: number }[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Mechanical Prompt Vault / Treasure Chest with opening lid hinge,
 * gold trim straps, popping padlock keyhole, glowing interior chamber,
 * and slot ingestion for incoming physical tokens.
 */
export const PromptVaultChest: React.FC<PromptVaultChestProps> = ({
  lidAngle = 0,
  scale = 1,
  isUnlocked = false,
  lockScale = 1,
  width = 580,
  height = 360,
  showShockwaves = false,
  rings = [],
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        transform: `scale(${scale})`,
        transformOrigin: 'center bottom',
        zIndex: 10,
        ...style,
      }}
    >
      {/* Shockwave Rings on Swarm Ingestion */}
      {showShockwaves &&
        rings.map((ring, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 90,
              left: '50%',
              width: 220,
              height: 60,
              transform: `translateX(-50%) scale(${ring.scale})`,
              borderRadius: '50%',
              border: `3px solid ${COLORS.accent}`,
              opacity: ring.opacity,
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />
        ))}

      {/* Chest Interior Glow / Chamber (The dark opening under the lid) */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 44,
          right: 44,
          height: 48,
          backgroundColor: '#261C12',
          borderRadius: '50%',
          boxShadow: 'inset 0 6px 20px #000000, 0 10px 24px rgba(0,0,0,0.35)',
          zIndex: 6,
          opacity: Math.max(0, Math.min(1, Math.abs(lidAngle) / 40)),
        }}
      />

      {/* Ingestion Slot for incoming items (zIndex: 7 -> behind front wall zIndex: 8) */}
      {children && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 7,
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      )}

      {/* Chest Front Body (zIndex: 8 -> Hides lower part of letters as they slip into the chamber) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 236,
          backgroundColor: '#E5D6C0',
          borderRadius: '18px 18px 30px 30px',
          border: `3px solid #B8A386`,
          boxShadow: '0 28px 56px rgba(26, 24, 22, 0.16)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8,
        }}
      >
        {/* Metallic Gold Trim Straps */}
        <div
          style={{
            position: 'absolute',
            left: 70,
            top: 0,
            bottom: 0,
            width: 22,
            backgroundColor: COLORS.accent,
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 70,
            top: 0,
            bottom: 0,
            width: 22,
            backgroundColor: COLORS.accent,
            opacity: 0.35,
          }}
        />

        {/* Central Keyhole Badge with popping padlock */}
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: `3.5px solid ${COLORS.accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(0,0,0,0.1)',
            zIndex: 10,
            transform: `scale(${lockScale})`,
          }}
        >
          <FaIcon
            icon={isUnlocked ? 'lock-open' : 'lock'}
            size={32}
            color={COLORS.accent}
          />
        </div>

        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 14,
            fontWeight: 800,
            color: COLORS.accent,
            marginTop: 14,
            letterSpacing: '0.1em',
          }}
        >
          PROMPT VAULT
        </div>
      </div>

      {/* Chest Lid (Hinged at top-back, tilts open with 3D spring) */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: -12,
          right: -12,
          height: 86,
          backgroundColor: '#D1BEA3',
          borderRadius: '26px 26px 10px 10px',
          border: `3px solid #A48E6E`,
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          transformOrigin: 'center top',
          transform: `rotateX(${lidAngle}deg)`,
          zIndex: 15,
        }}
      />
    </div>
  );
};
