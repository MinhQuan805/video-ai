import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';
import { AppCard, COLORS, FONTS, MaskReveal, RadialLaunch, RobotHero, StampDropIn } from './common';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Kinetic Typography Mask Reveals
  const title1Progress = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const title2Progress = interpolate(frame, [26, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subProgress = interpolate(frame, [62, 74], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 2. 4 App Icons Radial Launch from Center
  const launchSpring = (startFrame: number) =>
    spring({
      frame: Math.max(0, frame - startFrame),
      fps,
      config: { mass: 0.5, damping: 11, stiffness: 190 },
    });

  const gmailLaunch = launchSpring(12);
  const calendarLaunch = launchSpring(16);
  const driveLaunch = launchSpring(20);
  const sheetsLaunch = launchSpring(24);

  // 3. Robot Hero mechanical stamp drop at frame 34
  const robotSpring = spring({
    frame: Math.max(0, frame - 34),
    fps,
    config: { mass: 0.7, damping: 11, stiffness: 180 },
  });

  // 5. "Agent" text fades in at frame 42
  const agentLabelOpacity = interpolate(frame, [42, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Exit transition (frame 90 -> 102)
  const exitProgress = interpolate(frame, [90, 102], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.93]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // Subtle floating hover
  const float1 = Math.sin(frame / 16) * 5;
  const float2 = Math.cos(frame / 18) * 5;
  const float3 = Math.sin((frame + 12) / 16) * 4;
  const float4 = Math.cos((frame + 10) / 17) * 4;

  // Physical shockwave when Robot lands with stamp at frame 34: surrounding cards flinch outward
  const robotLandShock =
    frame >= 34 && frame <= 52
      ? Math.sin((frame - 34) * 0.7) * Math.exp(-(frame - 34) * 0.22) * 12
      : 0;

  // Eye blink at frame 54-58
  const isBlinking = frame >= 54 && frame <= 58;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 160,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Top Headline with Editorial Mask Reveals */}
      <div
        style={{
          textAlign: 'center',
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MaskReveal progress={title1Progress} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.15,
              color: COLORS.ink,
            }}
          >
            Tự tạo
          </div>
        </MaskReveal>

        <MaskReveal progress={title2Progress} direction="up">
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 78,
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.15,
              color: COLORS.accent,
            }}
          >
            AI Agent
          </div>
        </MaskReveal>

        {/* Subtitle "chỉ với bốn bước" */}
        <div style={{ marginTop: 18 }}>
          <MaskReveal progress={subProgress} direction="up">
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 34,
                fontWeight: 600,
                color: COLORS.ink,
              }}
            >
              chỉ với bốn bước
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Hero Visual Area */}
      <div
        style={{
          position: 'relative',
          width: 580,
          height: 480,
          marginTop: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Central Robot with Physical Stamp Drop */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <StampDropIn progress={robotSpring} dropDistance={-110}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <RobotHero size={200} blink={isBlinking} />
              <span
                style={{
                  marginTop: 22,
                  fontFamily: FONTS.body,
                  fontSize: 32,
                  fontWeight: 700,
                  color: COLORS.accent,
                  opacity: agentLabelOpacity,
                }}
              >
                Agent
              </span>
            </div>
          </StampDropIn>
        </div>

        {/* 4 Satellite Apps with CameraMotionBlur for cinematic shutter blur during radial burst */}
        <CameraMotionBlur samples={5} shutterAngle={90}>
          {/* Top-Left: Gmail Radial Launch from Center */}
          <RadialLaunch
            progress={gmailLaunch}
            startX={242}
            startY={192}
            targetX={30 - robotLandShock}
            targetY={25 + float1 - robotLandShock}
            rotation={-6}
          >
            <AppCard name="gmail" size={96} />
          </RadialLaunch>

          {/* Top-Right: Google Calendar Radial Launch */}
          <RadialLaunch
            progress={calendarLaunch}
            startX={242}
            startY={192}
            targetX={454 + robotLandShock}
            targetY={25 + float2 - robotLandShock}
            rotation={6}
          >
            <AppCard name="calendar" size={96} />
          </RadialLaunch>

          {/* Bottom-Left: Google Drive Radial Launch */}
          <RadialLaunch
            progress={driveLaunch}
            startX={242}
            startY={192}
            targetX={30 - robotLandShock}
            targetY={340 + float3 + robotLandShock}
            rotation={-4}
          >
            <AppCard name="drive" size={96} />
          </RadialLaunch>

          {/* Bottom-Right: Google Sheets Radial Launch */}
          <RadialLaunch
            progress={sheetsLaunch}
            startX={242}
            startY={192}
            targetX={454 + robotLandShock}
            targetY={340 + float4 + robotLandShock}
            rotation={4}
          >
            <AppCard name="sheets" size={96} />
          </RadialLaunch>
        </CameraMotionBlur>
      </div>
    </AbsoluteFill>
  );
};
