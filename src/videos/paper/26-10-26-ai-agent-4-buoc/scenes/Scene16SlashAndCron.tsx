import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EyebrowHeader, FONTS, MaskReveal } from './common';

export const Scene16SlashAndCron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance of Eyebrow & Title
  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // 1. Claude Chat appears FIRST before voice speaks (frame 4)
  const chatSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // Typing command inside Claude Chat
  const commandText = '/support-agent';
  const typeStart = 12;
  const charsTyped = Math.max(0, Math.min(commandText.length, Math.floor((frame - typeStart) / 2.2)));
  const currentCmd = commandText.slice(0, charsTyped);

  // Blinking caret
  const isCaretVisible = Math.floor(frame / 6) % 2 === 0;

  // 2. Clock appears when voiceover reaches "hoặc hẹn giờ" (frame 58)
  const clockSpring = spring({
    frame: Math.max(0, frame - 58),
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });

  // Clock hands animated sweep to 8:00 AM
  const hourAngle = interpolate(clockSpring, [0, 1], [180, 240]);
  const minuteAngle = interpolate(clockSpring, [0, 1], [-90, 0]);

  // Exit transition
  const exitProgress = interpolate(frame, [112, 124], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.94]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 180,
        paddingLeft: 140,
        paddingRight: 140,
        boxSizing: 'border-box',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <EyebrowHeader
        icon={
          <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFF', fontSize: 16, fontWeight: 900 }}>/</span>
          </div>
        }
        stepNum="04"
        tag="Thực thi tự động"
      />

      <div style={{ width: '100%', maxWidth: 780, marginTop: 8 }}>
        <MaskReveal progress={enterSpring} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 66,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.2,
            }}
          >
            Lệnh slash hoặc{' '}
            <span style={{ fontStyle: 'italic', color: COLORS.accent }}>
              hẹn giờ mỗi sáng
            </span>
          </div>
        </MaskReveal>
      </div>

      {/* Dynamic Content Area: Claude Chat First -> Clock Second */}
      <div
        style={{
          marginTop: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 720,
        }}
      >
        {/* 1. Claude Chat Input Box (Exact replica of Claude Chat.png) */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            border: '1.5px solid rgba(26,24,22,0.12)',
            boxShadow: '0 20px 48px rgba(26,24,22,0.08), 0 2px 8px rgba(26,24,22,0.03)',
            padding: '20px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            opacity: chatSpring,
            transform: `translateY(${interpolate(chatSpring, [0, 1], [30, 0])}px) scale(${interpolate(chatSpring, [0, 1], [0.95, 1])})`,
          }}
        >
          {/* Upper: Text Input Area */}
          <div style={{ minHeight: 44, display: 'flex', alignItems: 'center' }}>
            {charsTyped === 0 ? (
              <span style={{ fontFamily: FONTS.body, fontSize: 22, color: 'rgba(26,24,22,0.38)', fontWeight: 400 }}>
                How can I help you today?
              </span>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, color: COLORS.ink }}>
                  {currentCmd}
                </span>
                {isCaretVisible && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2.5,
                      height: 24,
                      backgroundColor: COLORS.accent,
                      marginLeft: 2,
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Lower: Claude Signature Bottom Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left: Plus button & Chat / Cowork Pill Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Plus icon button */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(26,24,22,0.6)',
                  fontSize: 20,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                +
              </div>

              {/* Chat / Cowork switcher */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#F3F0E8',
                  padding: '3px 4px',
                  borderRadius: 10,
                  gap: 2,
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: 7,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    fontWeight: 700,
                    color: COLORS.ink,
                  }}
                >
                  Chat
                </div>
                <div
                  style={{
                    padding: '4px 10px',
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'rgba(26,24,22,0.45)',
                  }}
                >
                  Cowork
                </div>
              </div>
            </div>

            {/* Right: Sonnet 5.5 High & Mic & Send Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: 'rgba(26,24,22,0.6)' }}>
                Sonnet 5.5 <span style={{ fontWeight: 400, color: 'rgba(26,24,22,0.4)' }}>High</span>
              </span>

              {/* Mic Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(26,24,22,0.6)" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>

              {/* Send / Audio waveform */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: charsTyped >= 10 ? COLORS.accent : 'rgba(26,24,22,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 900,
                  transition: 'background-color 0.15s ease',
                }}
              >
                ↑
              </div>
            </div>
          </div>
        </div>

        {/* 2. Clock Interface (Appears at frame 58 when voice speaks "hoặc hẹn giờ") */}
        {frame >= 54 && (
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              opacity: clockSpring,
              transform: `translateY(${interpolate(clockSpring, [0, 1], [25, 0])}px) scale(${interpolate(clockSpring, [0, 1], [0.92, 1])})`,
            }}
          >
            {/* Analog Clock Dial */}
            <div style={{ position: 'relative', width: 84, height: 84, flexShrink: 0 }}>
              <svg width="84" height="84" viewBox="0 0 80 80">
                {/* Clock Outer Face */}
                <circle cx="40" cy="40" r="37" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="3" />

                {/* 12 Hour Ticks */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const isMajor = i % 3 === 0;
                  const r1 = isMajor ? 28 : 31;
                  const r2 = 34;
                  const x1 = 40 + r1 * Math.sin(angle);
                  const y1 = 40 - r1 * Math.cos(angle);
                  const x2 = 40 + r2 * Math.sin(angle);
                  const y2 = 40 - r2 * Math.cos(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isMajor ? COLORS.ink : 'rgba(26,24,22,0.3)'}
                      strokeWidth={isMajor ? 2.5 : 1.2}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Hour Hand (Points to 8 o'clock / 240deg) */}
                <line
                  x1="40"
                  y1="40"
                  x2="40"
                  y2="23"
                  stroke={COLORS.ink}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  transform={`rotate(${hourAngle} 40 40)`}
                />

                {/* Minute Hand (Points to 12 o'clock / 0deg) */}
                <line
                  x1="40"
                  y1="40"
                  x2="40"
                  y2="14"
                  stroke={COLORS.accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  transform={`rotate(${minuteAngle} 40 40)`}
                />

                {/* Center Pin */}
                <circle cx="40" cy="40" r="4.5" fill={COLORS.accent} />
                <circle cx="40" cy="40" r="1.5" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Time: 08:00 AM */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: FONTS.title, fontSize: 50, fontWeight: 800, color: COLORS.ink, lineHeight: 1 }}>
                08:00
              </span>
              <span style={{ fontFamily: FONTS.body, fontSize: 22, fontWeight: 700, color: COLORS.subtle }}>
                AM
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
