import React from 'react';

export interface BinderClipProps {
  width?: number;
  height?: number;
  color?: string;
  wireColor?: string;
  style?: React.CSSProperties;
}

/**
 * Photorealistic / Vector Metal Binder Clip (Kẹp bướm giấy)
 */
export const BinderClip: React.FC<BinderClipProps> = ({
  width = 90,
  height = 24,
  color = '#1A1816',
  wireColor = '#8A7D6B',
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: color,
        borderRadius: 8,
        boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Chrome Wire Handle */}
      <div
        style={{
          position: 'absolute',
          top: -8,
          width: width * 0.6,
          height: 12,
          border: `2.5px solid ${wireColor}`,
          borderBottom: 'none',
          borderRadius: '6px 6px 0 0',
        }}
      />
    </div>
  );
};
