import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame } from 'remotion';
import { motion } from 'motion/react';
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from '../../../../paper-engine/tokens';
import { FaIcon } from '../../../../shared/FaIcon';

export { COLORS, FONTS, SHADOWS, SPRING_PRESETS, FaIcon, motion, interpolate, spring, staticFile, Img };

/**
 * Global timeline helper: determines when the user's face is shown
 * Scene 1, 3, 5, 7, 9 have talking head in the bottom half.
 * Scene 2, 4, 6, 8, 10 are full-stage motion graphics in the center!
 */
export const isSpeakerVisible = (frame: number): boolean => {
  return (
    (frame >= 0 && frame < 95) ||      // Scene 1: Báo động tin nhắn
    (frame >= 195 && frame < 325) ||  // Scene 3: Đủ phần mềm nhưng hỏi bạn
    (frame >= 468 && frame < 590) ||  // Scene 5: Bẫy nhớ một mình
    (frame >= 710 && frame < 810) ||  // Scene 7: 3 trường cốt lõi
    (frame >= 960 && frame < 1060) || // Scene 9: Tự mở tra cứu
    (frame >= 1060 && frame < 1200)   // Scene 10: Chèn mặt người nói vào outro
  );
};

/**
 * Nền giấy mỹ thuật ấm cao cấp với thớ dệt hữu cơ và đường guide rule biên tập
 */
export const PaperCanvasBackground: React.FC<{
  children: React.ReactNode;
  isSplit?: boolean;
}> = ({ children, isSplit = false }) => {
  const childrenArray = React.Children.toArray(children);
  const header = childrenArray[0];
  const content = childrenArray.slice(1);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: '#F4EFE6',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Real Paper Texture Background (Pre-scaled, ấm áp, chống chói) */}
      <Img
        src={staticFile('background/paper_bg_1080.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Hairline Editorial Guide Brackets */}
      <div
        style={{
          position: 'absolute',
          top: 210,
          left: 60,
          width: 28,
          height: 28,
          borderTop: `1.5px solid ${COLORS.inkFaint}`,
          borderLeft: `1.5px solid ${COLORS.inkFaint}`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 210,
          right: 60,
          width: 28,
          height: 28,
          borderTop: `1.5px solid ${COLORS.inkFaint}`,
          borderRight: `1.5px solid ${COLORS.inkFaint}`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 60,
          width: 28,
          height: 28,
          borderBottom: `1.5px solid ${COLORS.inkFaint}`,
          borderLeft: `1.5px solid ${COLORS.inkFaint}`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          right: 60,
          width: 28,
          height: 28,
          borderBottom: `1.5px solid ${COLORS.inkFaint}`,
          borderRight: `1.5px solid ${COLORS.inkFaint}`,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Area: Title hạ thấp an toàn dưới search bar (top: 230px), Motion Graphic nằm chính giữa title và caption */}
      <div
        style={{
          width: '1080px',
          height: isSplit ? 920 : 1480,
          display: 'flex',
          flexDirection: 'column',
          padding: isSplit ? '230px 60px 20px 60px' : '240px 60px 40px 60px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {header}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

/**
 * Editorial Header: Short Punchy Fraunces Headline (Bỏ hoàn toàn các chữ nhỏ, pill thừa)
 */
export const SceneHeader: React.FC<{
  step?: string;
  category?: string;
  mainText: string;
  accentText?: string;
  delay?: number;
}> = ({ mainText, accentText, delay = 0 }) => {
  const frame = useCurrentFrame();
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  const translateY = interpolate(progress, [0, 1], [24, 0]);
  const opacity = interpolate(progress, [0, 0.7, 1], [0, 1, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        willChange: 'transform, opacity',
      }}
    >
      {/* Short & Punchy Headline: Nằm giữa chiều ngang video */}
      <h2
        style={{
          margin: 0,
          fontFamily: FONTS.frauncesNormal,
          fontSize: 56,
          lineHeight: 1.15,
          color: COLORS.inkPrimary,
          letterSpacing: -0.5,
          textAlign: 'center',
        }}
      >
        {mainText}{' '}
        {accentText && (
          <span
            style={{
              fontFamily: FONTS.frauncesItalic,
              color: COLORS.terracotta,
              fontWeight: 700,
            }}
          >
            {accentText}
          </span>
        )}
      </h2>
    </div>
  );
};
