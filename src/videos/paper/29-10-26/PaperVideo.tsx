import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { PaperBackground } from './scenes/common';
import { Scene1HookPromptHunting } from './scenes/Scene1HookPromptHunting';
import { Scene2HookLongPromptScroll } from './scenes/Scene2HookLongPromptScroll';
import { Scene3PainPointCopyPaste } from './scenes/Scene3PainPointCopyPaste';
import { Scene4SolutionSkillIntro } from './scenes/Scene4SolutionSkillIntro';
import { Scene5ExampleContentCreator } from './scenes/Scene5ExampleContentCreator';
import { Scene6SkillOneInput } from './scenes/Scene6SkillOneInput';
import { Scene7PromptVsSkill } from './scenes/Scene7PromptVsSkill';
import { Scene8OutroCTA } from './scenes/Scene8OutroCTA';
import { UserTalkingHead } from './scenes/UserTalkingHead';
import { PaperCaptions } from './PaperCaptions';

export const PaperVideo1029: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#F4EFE6' }}>
      {/* Noise-reduced User Voice Audio */}
      <Audio src={staticFile('videos/paper/29-10-26/user_voice.wav')} />

      {/* Tactile Paper Texture & Drafting Brackets */}
      <PaperBackground />

      {/* 8 Seamless Synchronized Scenes */}
      <Sequence from={0} durationInFrames={180} premountFor={fps} name="Scene 1: Hook Săn Prompt">
        <div style={{ position: 'absolute', inset: 0, transform: 'translateY(60px)' }}>
          <Scene1HookPromptHunting />
        </div>
      </Sequence>

      <Sequence from={180} durationInFrames={204} premountFor={fps} name="Scene 2: Hook Cuộn Lệnh Dài">
        <div style={{ position: 'absolute', inset: 0, transform: 'translateY(60px)' }}>
          <Scene2HookLongPromptScroll />
        </div>
      </Sequence>

      <Sequence
        from={385}
        durationInFrames={121}
        premountFor={fps}
        name="Scene 3: Nỗi đau Copy Paste"
      >
        <Scene3PainPointCopyPaste />
      </Sequence>

      <Sequence from={505} durationInFrames={186} premountFor={fps} name="Scene 4: Giải pháp Skill System">
        <div style={{ position: 'absolute', inset: 0, transform: 'translateY(60px)' }}>
          <Scene4SolutionSkillIntro />
        </div>
      </Sequence>

      <Sequence from={691} durationInFrames={154} premountFor={fps} name="Scene 5: Ví dụ Viết Content">
        <div style={{ position: 'absolute', inset: 0, transform: 'translateY(60px)' }}>
          <Scene5ExampleContentCreator />
        </div>
      </Sequence>

      <Sequence from={845} durationInFrames={151} premountFor={fps} name="Scene 6: 1 Chạm Ra Ấn Phẩm">
        <div style={{ position: 'absolute', inset: 0, transform: 'translateY(60px)' }}>
          <Scene6SkillOneInput />
        </div>
      </Sequence>

      <Sequence from={996} durationInFrames={192} premountFor={fps} name="Scene 7: Prompt vs Skill">
        <Scene7PromptVsSkill />
      </Sequence>

      <Sequence from={1188} durationInFrames={131} premountFor={fps} name="Scene 8: Outro CTA">
        <div style={{ position: 'absolute', inset: 0, transform: 'translateY(60px)' }}>
          <Scene8OutroCTA />
        </div>
      </Sequence>

      {/* Speaker Video Frame */}
      <UserTalkingHead />

      {/* Floating Karaoke Captions */}
      <PaperCaptions />
    </AbsoluteFill>
  );
};
