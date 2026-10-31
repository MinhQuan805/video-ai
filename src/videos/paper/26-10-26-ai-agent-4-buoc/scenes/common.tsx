import React from 'react';
import { Img, staticFile } from 'remotion';
import { theme } from '../../../../visual-systems/paper/theme';

export const COLORS = {
  bg: '#F4EFE6',
  card: '#FFFFFF',
  cardMuted: '#ECE5D8',
  ink: '#1A1816',
  accent: '#C6532A',
  subtle: 'rgba(26, 24, 22, 0.45)',
  line: 'rgba(26, 24, 22, 0.12)',
  glow: 'rgba(198, 83, 42, 0.22)',
};

export const FONTS = {
  title: theme.fonts.title,
  body: theme.fonts.body,
};

/**
 * Paper background with subtle grain & corner drafting brackets
 */
export const PaperBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: COLORS.bg,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Ultra-fine SVG noise filter */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.035,
        }}
      >
        <filter id="paper-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise)" />
      </svg>

      {/* Drafting brackets at corners */}
      <div style={{ position: 'absolute', top: 56, left: 56, width: 24, height: 24, borderTop: `1.5px solid ${COLORS.line}`, borderLeft: `1.5px solid ${COLORS.line}` }} />
      <div style={{ position: 'absolute', top: 56, right: 56, width: 24, height: 24, borderTop: `1.5px solid ${COLORS.line}`, borderRight: `1.5px solid ${COLORS.line}` }} />
      <div style={{ position: 'absolute', bottom: 56, left: 56, width: 24, height: 24, borderBottom: `1.5px solid ${COLORS.line}`, borderLeft: `1.5px solid ${COLORS.line}` }} />
      <div style={{ position: 'absolute', bottom: 56, right: 56, width: 24, height: 24, borderBottom: `1.5px solid ${COLORS.line}`, borderRight: `1.5px solid ${COLORS.line}` }} />
    </div>
  );
};

/**
 * Robot Hero Face (Squircle black box, antenna, glowing orange eyes)
 */
export const RobotHero: React.FC<{
  size?: number;
  blink?: boolean;
  eyeOffsetX?: number;
  eyeOffsetY?: number;
  style?: React.CSSProperties;
}> = ({ size = 180, blink = false, eyeOffsetX = 0, eyeOffsetY = 0, style }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Top Antenna */}
      <div
        style={{
          position: 'absolute',
          top: -size * 0.18,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: size * 0.1,
            height: size * 0.1,
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
          }}
        />
        <div
          style={{
            width: size * 0.035,
            height: size * 0.1,
            backgroundColor: COLORS.accent,
          }}
        />
      </div>

      {/* Robot Head Body */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1E1D1B',
          borderRadius: size * 0.28,
          boxShadow: '0 20px 45px rgba(26, 24, 22, 0.16)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: size * 0.22,
        }}
      >
        {/* Left Eye */}
        <div
          style={{
            width: size * 0.14,
            height: blink ? size * 0.02 : size * 0.09,
            borderRadius: blink ? 2 : size * 0.045,
            backgroundColor: COLORS.accent,
            boxShadow: `0 0 14px ${COLORS.accent}`,
            transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
            transition: 'height 0.08s ease, transform 0.08s ease',
          }}
        />
        {/* Right Eye */}
        <div
          style={{
            width: size * 0.14,
            height: blink ? size * 0.02 : size * 0.09,
            borderRadius: blink ? 2 : size * 0.045,
            backgroundColor: COLORS.accent,
            boxShadow: `0 0 14px ${COLORS.accent}`,
            transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
            transition: 'height 0.08s ease, transform 0.08s ease',
          }}
        />
      </div>
    </div>
  );
};

/**
 * Official Brand Icon using real logo files from public/icon/
 */
export const BrandLogo: React.FC<{
  name: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ name, size = 64, style }) => {
  const iconMap: Record<string, string> = {
    gmail: 'icon/Gmail.png',
    calendar: 'icon/calendar.svg',
    drive: 'icon/drive.png',
    sheets: 'icon/Google-Sheets.png',
    docs: 'icon/Google-Docs.png',
    notion: 'icon/notion.png',
    google: 'icon/google.png',
    claude: 'icon/claude.png',
    'claude-code': 'icon/claude-code.png',
    codex: 'icon/codex.png',
    chatgpt: 'icon/chatgpt.png',
    github: 'icon/GitHub.png',
    vscode: 'icon/VS Code.png',
    n8n: 'icon/n8n.png',
    hubspot: 'icon/hubspot.png',
  };

  const src = staticFile(iconMap[name.toLowerCase()] || 'icon/google.png');

  return (
    <Img
      src={src}
      alt={name}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        ...style,
      }}
    />
  );
};

/**
 * App Card Pill with subtle white squircle background and soft elevation
 */
export const AppCard: React.FC<{
  name: 'gmail' | 'calendar' | 'drive' | 'sheets' | 'notion';
  size?: number;
  highlight?: boolean;
  style?: React.CSSProperties;
}> = ({ name, size = 96, highlight = false, style }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: highlight
          ? `0 12px 32px ${COLORS.glow}, 0 2px 6px rgba(26,24,22,0.06)`
          : '0 10px 25px rgba(26, 24, 22, 0.07), 0 2px 5px rgba(26, 24, 22, 0.03)',
        border: highlight ? `3px solid ${COLORS.accent}` : `1px solid ${COLORS.line}`,
        transition: 'all 0.15s ease',
        ...style,
      }}
    >
      <BrandLogo name={name} size={size * 0.58} />
    </div>
  );
};

/**
 * Standard Eyebrow Header with Hairline Divider
 */
export const EyebrowHeader: React.FC<{
  icon?: React.ReactNode;
  tag: string;
  stepNum?: string;
}> = ({ icon, tag, stepNum }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 780,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {icon}
        {stepNum && (
          <span
            style={{
              fontFamily: FONTS.title,
              fontWeight: 700,
              fontSize: 26,
              color: COLORS.accent,
            }}
          >
            {stepNum}
          </span>
        )}
        <span
          style={{
            fontFamily: FONTS.title,
            fontWeight: 700,
            fontSize: 28,
            color: COLORS.ink,
            letterSpacing: '0.5px',
          }}
        >
          {tag}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: 1,
          backgroundColor: COLORS.line,
        }}
      />
    </div>
  );
};

/**
 * ANIMATION IN PRIMITIVES
 * Distinct entrance types: Mask, 3D Flip, Radial Launch, Split Slide, Stamp Drop
 */

/**
 * 1. MaskReveal: High-end editorial kinetic typography mask reveal (overflow hidden slide-up/down)
 */
export const MaskReveal: React.FC<{
  children: React.ReactNode;
  progress: number; // 0 to 1
  direction?: 'up' | 'down' | 'left' | 'right';
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}> = ({ children, progress, direction = 'up', style, wrapperStyle }) => {
  const clampP = Math.max(0, Math.min(1, progress));
  let transform = 'none';
  if (direction === 'up') transform = `translateY(${(1 - clampP) * 110}%)`;
  else if (direction === 'down') transform = `translateY(${(1 - clampP) * -110}%)`;
  else if (direction === 'left') transform = `translateX(${(1 - clampP) * 110}%)`;
  else if (direction === 'right') transform = `translateX(${(1 - clampP) * -110}%)`;

  return (
    <div style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'top', ...wrapperStyle }}>
      <div
        style={{
          transform,
          opacity: clampP > 0.01 ? 1 : 0,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * 2. Flip3DIn: Card unfolds on 3D perspective axis (Y or X)
 */
export const Flip3DIn: React.FC<{
  children: React.ReactNode;
  progress: number; // 0 to 1
  axis?: 'Y' | 'X';
  initialAngle?: number;
  style?: React.CSSProperties;
}> = ({ children, progress, axis = 'Y', initialAngle = -70, style }) => {
  const clampP = Math.max(0, Math.min(1, progress));
  const angle = (1 - clampP) * initialAngle;
  const scale = 0.75 + clampP * 0.25;
  const opacity = clampP > 0.05 ? Math.min(1, clampP * 2.5) : 0;
  const transform =
    axis === 'Y'
      ? `perspective(1000px) rotateY(${angle}deg) scale(${scale})`
      : `perspective(1000px) rotateX(${angle}deg) scale(${scale})`;

  return (
    <div
      style={{
        display: 'inline-block',
        transform,
        opacity,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * 3. RadialLaunch: Elements burst outward from an origin point (e.g. Robot center) with trajectory & spin
 */
export const RadialLaunch: React.FC<{
  children: React.ReactNode;
  progress: number; // 0 to 1
  startX?: number;
  startY?: number;
  targetX: number;
  targetY: number;
  rotation?: number;
  style?: React.CSSProperties;
}> = ({ children, progress, startX = 0, startY = 0, targetX, targetY, rotation = 0, style }) => {
  const clampP = Math.max(0, Math.min(1, progress));
  const curX = startX + (targetX - startX) * clampP;
  const curY = startY + (targetY - startY) * clampP;
  const scale = Math.max(0, clampP);
  const rot = (1 - clampP) * (rotation * 1.5) + clampP * rotation;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate(${curX}px, ${curY}px) scale(${scale}) rotate(${rot}deg)`,
        opacity: clampP > 0.02 ? 1 : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * 4. SplitSlideIn: Opposing horizontal or vertical slide with subtle directional tilt
 */
export const SplitSlideIn: React.FC<{
  children: React.ReactNode;
  progress: number;
  from: 'left' | 'right' | 'top' | 'bottom';
  distance?: number;
  tiltAngle?: number;
  style?: React.CSSProperties;
}> = ({ children, progress, from, distance = 140, tiltAngle = 0, style }) => {
  const clampP = Math.max(0, Math.min(1, progress));
  let x = 0;
  let y = 0;
  if (from === 'left') x = (1 - clampP) * -distance;
  else if (from === 'right') x = (1 - clampP) * distance;
  else if (from === 'top') y = (1 - clampP) * -distance;
  else if (from === 'bottom') y = (1 - clampP) * distance;

  const tilt = (1 - clampP) * tiltAngle;
  const scale = 0.85 + clampP * 0.15;
  const opacity = clampP > 0.02 ? Math.min(1, clampP * 2) : 0;

  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${tilt}deg) scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * 5. StampDropIn: Heavy mechanical drop with physics landing
 */
export const StampDropIn: React.FC<{
  children: React.ReactNode;
  progress: number; // 0 to 1 (overshooting spring)
  dropDistance?: number;
  style?: React.CSSProperties;
}> = ({ children, progress, dropDistance = -80, style }) => {
  const clampP = Math.max(0, progress);
  const y = clampP < 1 ? (1 - clampP) * dropDistance : 0;
  const isLanding = progress >= 0.95 && progress <= 1.15;
  const scaleX = isLanding ? 1 + (progress - 1) * 0.15 : 1;
  const scaleY = isLanding ? 1 - (progress - 1) * 0.15 : 1;
  const opacity = clampP > 0.05 ? 1 : 0;

  return (
    <div
      style={{
        transform: `translateY(${y}px) scale(${progress * scaleX}, ${progress * scaleY})`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * 6. SimulatedCursor: macOS-style vector cursor with click state and shadow
 */
export const SimulatedCursor: React.FC<{
  x: number;
  y: number;
  isClicking?: boolean;
  visible?: boolean;
}> = ({ x, y, isClicking = false, visible = true }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 100,
        transform: `scale(${isClicking ? 0.88 : 1.0})`,
        transformOrigin: 'top left',
        transition: 'transform 0.08s ease',
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.32))',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 3.5L11.5 20.5L14.2 13.8L20.8 11.2L4.5 3.5Z"
          fill="#1A1816"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

/**
 * 7. ClickRipple: expanding circular wave at click location
 */
export const ClickRipple: React.FC<{
  x: number;
  y: number;
  progress: number; // 0 to 1
  color?: string;
}> = ({ x, y, progress, color = COLORS.accent }) => {
  if (progress <= 0 || progress >= 1) return null;
  const scale = 0.2 + progress * 2.2;
  const opacity = (1 - progress) * 0.8;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 36,
        height: 36,
        marginLeft: -18,
        marginTop: -18,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: 'none',
        zIndex: 99,
      }}
    />
  );
};

/**
 * 8. ShockwaveRing: radial shockwave on impact
 */
export const ShockwaveRing: React.FC<{
  x: number;
  y: number;
  progress: number; // 0 to 1
  color?: string;
  size?: number;
}> = ({ x, y, progress, color = COLORS.accent, size = 120 }) => {
  if (progress <= 0 || progress >= 1) return null;
  const scale = 0.1 + progress * 2.5;
  const opacity = (1 - progress) * 0.7;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: 'none',
        zIndex: 98,
      }}
    />
  );
};

/**
 * 9. BezierConduit: organic curving SVG wire connecting 2 components
 */
export const BezierConduit: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number; // 0 to 1
  color?: string;
  curvature?: number;
}> = ({ startX, startY, endX, endY, progress, color = COLORS.accent, curvature = 0 }) => {
  const clampP = Math.max(0, Math.min(1, progress));
  const midX = (startX + endX) / 2 + curvature;
  const midY = (startY + endY) / 2;
  const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 4,
      }}
    >
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
        strokeDasharray={800}
        strokeDashoffset={(1 - clampP) * 800}
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Global timeline helper: determines when the user's face is shown
 * When false, the face is hidden for ~5-6s per transition to let fullscreen motion graphics take center stage.
 */
export const isSpeakerVisible = (frame: number): boolean => {
  return (
    (frame >= 0 && frame < 121) ||      // Scene 1: Hook
    (frame >= 295 && frame < 440) ||    // Scene 4: Local Agent (Finder)
    (frame >= 565 && frame < 850) ||    // Scene 7, 8, 9: Gmail triage & CTA
    (frame >= 905 && frame < 1080) ||   // Scene 11, 12: Prompt & Draft approval
    (frame >= 1245 && frame < 1374) ||  // Scene 15: Package Skill
    (frame >= 1500 && frame < 1565)     // Scene 17: Outro
  );
};

