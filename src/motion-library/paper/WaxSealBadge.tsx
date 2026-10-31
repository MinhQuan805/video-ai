import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS } from '../core/tokens';

export interface WaxSealBadgeProps {
  icon?: string;
  size?: number;
  color?: string;
  iconColor?: string;
  style?: React.CSSProperties;
}

/**
 * Editorial Wax Seal / Official Stamp Badge
 */
export const WaxSealBadge: React.FC<WaxSealBadgeProps> = ({
  icon = 'certificate',
  size = 64,
  color = COLORS.accent,
  iconColor = '#FFFFFF',
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        border: `3px solid rgba(255,255,255,0.4)`,
        boxShadow: `0 8px 20px rgba(198, 83, 42, 0.35)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 4,
          borderRadius: '50%',
          border: '1.5px dashed rgba(255,255,255,0.6)',
        }}
      />
      <FaIcon icon={icon} size={Math.round(size * 0.44)} color={iconColor} />
    </div>
  );
};
