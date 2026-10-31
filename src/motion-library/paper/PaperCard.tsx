import React from 'react';

export interface PaperCardProps {
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  shadow?: string;
  scale?: number;
  rotation?: number;
  opacity?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Editorial Tactile Paper Card with crisp borders and deep soft shadow
 */
export const PaperCard: React.FC<PaperCardProps> = ({
  width = '100%',
  height = 'auto',
  padding = '24px 32px',
  borderRadius = 22,
  backgroundColor = '#FFFFFF',
  borderColor = 'rgba(26, 24, 22, 0.12)',
  shadow = '0 20px 48px rgba(26, 24, 22, 0.12)',
  scale = 1,
  rotation = 0,
  opacity = 1,
  children,
  style,
}) => {
  if (opacity <= 0.005) return null;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        padding,
        borderRadius,
        backgroundColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: shadow,
        boxSizing: 'border-box',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
