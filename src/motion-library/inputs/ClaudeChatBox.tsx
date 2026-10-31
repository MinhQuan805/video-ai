import React from 'react';
import { FaIcon } from '../../shared/FaIcon';
import { COLORS, FONTS } from '../core/tokens';

export interface ClaudeChatBoxProps {
  attachedFileName?: string | null;
  placeholderText?: string;
  isDropped?: boolean;
  dropProgress?: number;
  dropRecoil?: number;
  scale?: number;
  opacity?: number;
  width?: number | string;
  isCaretVisible?: boolean;
  selectedModel?: string;
  mode?: 'Chat' | 'Cowork';
}

/**
 * Authentic Claude AI Chat Input Panel with top-left file thumbnail slot,
 * prompt placeholder with blinking cursor, [Chat | Cowork] toggle,
 * model dropdown pill, microphone icon, and terracotta send button.
 */
export const ClaudeChatBox: React.FC<ClaudeChatBoxProps> = ({
  attachedFileName = null,
  placeholderText = 'How can I help you today?',
  isDropped = false,
  dropProgress = 1,
  dropRecoil = 0,
  scale = 1,
  opacity = 1,
  width = 840,
  isCaretVisible = true,
  selectedModel = 'Sonnet 5.5 High',
  mode = 'Chat',
}) => {
  if (opacity <= 0.005) return null;

  return (
    <div
      style={{
        position: 'relative',
        width,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        border: isDropped ? `2px solid ${COLORS.accent}` : '1.5px solid #E5E7EB',
        boxShadow: isDropped
          ? '0 24px 56px rgba(198, 83, 42, 0.16), 0 4px 16px rgba(0, 0, 0, 0.06)'
          : '0 20px 48px rgba(0, 0, 0, 0.08)',
        padding: '20px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transform: `scale(${scale}) translateY(${dropRecoil}px)`,
        opacity,
        zIndex: 10,
      }}
    >
      {/* Top Row: Attached File Card Slot (Top Left) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', minHeight: 88 }}>
        {isDropped && attachedFileName ? (
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: 16,
              background: 'linear-gradient(180deg, #F9FAFB 0%, #E5E7EB 100%)',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transform: `scale(${Math.min(1.15, Math.max(0.6, dropProgress))})`,
            }}
          >
            <FaIcon icon="file" size={26} color={COLORS.accent} />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                fontWeight: 800,
                color: COLORS.ink,
                maxWidth: 72,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {attachedFileName}
            </span>
          </div>
        ) : (
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: 16,
              border: '2px dashed #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FAFAFA',
            }}
          >
            <FaIcon icon="arrow-down" size={16} color="#9CA3AF" />
          </div>
        )}
      </div>

      {/* Middle: Claude Placeholder Prompt Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4 }}>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 22,
            fontWeight: 500,
            color: isDropped ? COLORS.ink : '#6B7280',
            letterSpacing: '-0.01em',
          }}
        >
          {placeholderText}
        </span>
        {isDropped && isCaretVisible && (
          <span style={{ width: 2, height: 22, backgroundColor: COLORS.accent }} />
        )}
      </div>

      {/* Bottom Bar: [+] [Chat | Cowork] -------- [Sonnet 5.5 High ⌄] [🎤] [↑] */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
        }}
      >
        {/* Left Side: + and Chat/Cowork Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4B5563',
              fontSize: 20,
              fontWeight: 400,
              cursor: 'pointer',
            }}
          >
            +
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F3F4F6',
              borderRadius: 10,
              padding: '3px 4px',
              gap: 4,
            }}
          >
            <div
              style={{
                backgroundColor: mode === 'Chat' ? '#FFFFFF' : 'transparent',
                borderRadius: 7,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 600,
                color: mode === 'Chat' ? '#111827' : '#6B7280',
                boxShadow: mode === 'Chat' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Chat
            </div>
            <div
              style={{
                backgroundColor: mode === 'Cowork' ? '#FFFFFF' : 'transparent',
                borderRadius: 7,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 600,
                color: mode === 'Cowork' ? '#111827' : '#6B7280',
                boxShadow: mode === 'Cowork' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Cowork
            </div>
          </div>
        </div>

        {/* Right Side: Model Badge, Mic, and Send Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#374151',
              fontSize: 14,
              fontWeight: 500,
              padding: '4px 8px',
            }}
          >
            <span>{selectedModel}</span>
            <span style={{ fontSize: 10, color: '#9CA3AF' }}>⌄</span>
          </div>

          <div
            style={{
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7280',
            }}
          >
            <FaIcon icon="microphone" size={16} color="#6B7280" />
          </div>

          {/* Authentic Terracotta Up Arrow Send Button */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              backgroundColor: COLORS.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(198, 83, 42, 0.35)',
            }}
          >
            ↑
          </div>
        </div>
      </div>
    </div>
  );
};
