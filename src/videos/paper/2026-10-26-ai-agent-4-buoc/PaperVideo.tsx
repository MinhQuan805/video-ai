import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { flip } from '@remotion/transitions/flip';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { PaperBackground } from './scenes/common';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Step1Badge } from './scenes/Scene2Step1Badge';
import { Scene3SearchDesktop } from './scenes/Scene3SearchDesktop';
import { Scene4LocalAgent } from './scenes/Scene4LocalAgent';
import { Scene5Step2Connect } from './scenes/Scene5Step2Connect';
import { PaperCaptions } from './PaperCaptions';

export const PaperVideo1026: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#FAF8F5' }}>
      {/* Voiceover Audio from the sample video */}
      <Audio src={staticFile('videos/paper/2026-10-26-ai-agent-4-buoc/voice.wav')} />

      {/* Paper texture & editorial layout */}
      <PaperBackground />

      {/* Cinema-grade Scene Transitions using @remotion/transitions */}
      <TransitionSeries>
        {/* Cảnh 1: Hook & Intro (0:00 - 0:03.4) */}
        <TransitionSeries.Sequence durationInFrames={110}>
          <Scene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 8 })}
        />

        {/* Cảnh 2: Bước 01 Badge (0:03.4 - 0:05.5) */}
        <TransitionSeries.Sequence durationInFrames={71}>
          <Scene2Step1Badge />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: 8 })}
        />

        {/* Cảnh 3: Tìm Claude Desktop & App (0:05.5 - 0:09.6) */}
        <TransitionSeries.Sequence durationInFrames={131}>
          <Scene3SearchDesktop />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-left' })}
          timing={linearTiming({ durationInFrames: 8 })}
        />

        {/* Cảnh 4: Không chỉ chat, làm trên máy (0:09.6 - 0:12.6) */}
        <TransitionSeries.Sequence durationInFrames={98}>
          <Scene4LocalAgent />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={flip({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: 8 })}
        />

        {/* Cảnh 5: Bước 02 & Nối với công cụ (0:12.6 - 0:15.7) */}
        <TransitionSeries.Sequence durationInFrames={94}>
          <Scene5Step2Connect />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Floating Karaoke Captions */}
      <PaperCaptions />
    </AbsoluteFill>
  );
};
