import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface DraftingPaperSheetProps {
  fileName?: string;
  fileSize?: string;
  lineWidths?: number[];
  width?: number | string;
  height?: number | string;
  scale?: number;
  rotation?: number;
  opacity?: number;
  clipColor?: string;
  children?: React.ReactNode;
}

/**
 * Editorial Drafting Paper Sheet with tactile binder clip,
 * file badge header, horizontal guide rules, and content lines.
 */
export const DraftingPaperSheet: React.FC<DraftingPaperSheetProps> = ({
  fileName = 'prompt.txt',
  fileSize = '4KB',
  lineWidths = [340, 300, 350, 240],
  width = 460,
  height = 360,
  scale = 1,
  rotation = 0,
  opacity = 1,
  clipColor = '#1A1816',
  children,
}) => {
  if (opacity <= 0.005) return null;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        border: '1.5px solid rgba(26,24,22,0.1)',
        boxShadow: '0 24px 60px rgba(26, 24, 22, 0.16)',
        padding: '24px 28px',
        boxSizing: 'border-box',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      {/* Top Black Binder Clip */}
      <div
        style={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 90,
          height: 24,
          backgroundColor: clipColor,
          borderRadius: 8,
          boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
          zIndex: 15,
        }}
      />

      {/* Top File Pill Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px dashed rgba(26,24,22,0.14)',
          paddingBottom: 12,
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaIcon icon="file" size={18} color={COLORS.accent} />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              fontWeight: 800,
              color: COLORS.ink,
            }}
          >
            {fileName}
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 12,
            color: COLORS.subtle,
            fontWeight: 600,
          }}
        >
          {fileSize}
        </span>
      </div>

      {children ? (
        children
      ) : (
        /* Default Progressive Ruled Lines */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {lineWidths.map((widthVal, idx) => (
            <div key={idx} style={{ position: 'relative', height: 14 }}>
              <div
                style={{
                  position: 'absolute',
                  top: 6,
                  left: 0,
                  right: 0,
                  height: 1.5,
                  backgroundColor: '#EFEAE2',
                  borderRadius: 1,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 1,
                  left: 0,
                  width: widthVal,
                  height: 12,
                  backgroundColor: idx % 2 === 0 ? '#26221F' : '#3D3630',
                  borderRadius: 6,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
