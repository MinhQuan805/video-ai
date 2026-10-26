import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface TitleHeaderProps {
  prefix?: string;
  highlight?: string;
}

export const TitleHeader: React.FC<TitleHeaderProps> = ({
  prefix = 'Xếp hạng',
  highlight = 'kênh kiếm khách',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title displays throughout the entire video
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 },
  });
  const translateY = interpolate(entrance, [0, 1], [-40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 140,
        left: 0,
        width: 1080,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 25,
        pointerEvents: 'none',
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Main Editorial Title - White with dark drop shadow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <span
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: '#0F172A',
            letterSpacing: '-1.2px',
          }}
        >
          {prefix}
        </span>
        <span
          style={{
            fontSize: 60,
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#FFFFFF',
            background: '#DE7356',
            padding: '5px 22px',
            borderRadius: 18,
            border: '2px solid rgba(255, 255, 255, 0.45)',
            boxShadow: '0 4px 14px rgba(222, 115, 86, 0.25)',
            letterSpacing: '-0.8px',
          }}
        >
          {highlight}
        </span>
      </div>
    </div>
  );
};
