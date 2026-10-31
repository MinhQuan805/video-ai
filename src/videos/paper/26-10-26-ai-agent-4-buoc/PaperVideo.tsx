import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { PaperBackground } from './scenes/common';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Step1Badge } from './scenes/Scene2Step1Badge';
import { Scene3SearchDesktop } from './scenes/Scene3SearchDesktop';
import { Scene4LocalAgent } from './scenes/Scene4LocalAgent';
import { Scene5Step2Connect } from './scenes/Scene5Step2Connect';
import { Scene6ConnectorCatalog } from './scenes/Scene6ConnectorCatalog';
import { Scene7GmailAutoRead } from './scenes/Scene7GmailAutoRead';
import { Scene8ProblemTriage } from './scenes/Scene8ProblemTriage';
import { Scene9CalloutCTA } from './scenes/Scene9CalloutCTA';
import { Scene10Step3Badge } from './scenes/Scene10Step3Badge';
import { Scene11PromptInstruction } from './scenes/Scene11PromptInstruction';
import { Scene12DraftApproval } from './scenes/Scene12DraftApproval';
import { Scene13IterationLoop } from './scenes/Scene13IterationLoop';
import { Scene14Step4Badge } from './scenes/Scene14Step4Badge';
import { Scene15PackageSkill } from './scenes/Scene15PackageSkill';
import { Scene16SlashAndCron } from './scenes/Scene16SlashAndCron';
import { Scene17OutroComplete } from './scenes/Scene17OutroComplete';
import { UserTalkingHead } from './scenes/UserTalkingHead';
import { PaperCaptions } from './PaperCaptions';

export const PaperVideo1026: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#F4EFE6' }}>
      {/* User Voice Audio */}
      <Audio src={staticFile('videos/paper/26-10-26-ai-agent-4-buoc/user_voice.wav')} />

      {/* Paper texture & background drafting brackets */}
      <PaperBackground />

      {/* Synchronized 17 Scenes Sequencer */}
      <Sequence from={0} durationInFrames={121} premountFor={fps} name="Cảnh 1: Hook Intro">
        <Scene1Hook />
      </Sequence>

      <Sequence from={121} durationInFrames={49} premountFor={fps} name="Cảnh 2: Bước 01 Badge">
        <Scene2Step1Badge />
      </Sequence>

      <Sequence from={170} durationInFrames={125} premountFor={fps} name="Cảnh 3: Chatbot vs Claude Code / Codex">
        <Scene3SearchDesktop />
      </Sequence>

      <Sequence from={295} durationInFrames={145} premountFor={fps} name="Cảnh 4: Mở file & Làm việc trên máy">
        <Scene4LocalAgent />
      </Sequence>

      <Sequence from={440} durationInFrames={48} premountFor={fps} name="Cảnh 5: Bước 02 Badge">
        <Scene5Step2Connect />
      </Sequence>

      <Sequence from={488} durationInFrames={77} premountFor={fps} name="Cảnh 6: Mục Connectors">
        <Scene6ConnectorCatalog />
      </Sequence>

      <Sequence from={565} durationInFrames={123} premountFor={fps} name="Cảnh 7: Gmail Tự động đọc thư">
        <Scene7GmailAutoRead />
      </Sequence>

      <Sequence from={688} durationInFrames={54} premountFor={fps} name="Cảnh 8: Phân loại vấn đề">
        <Scene8ProblemTriage />
      </Sequence>

      <Sequence from={742} durationInFrames={108} premountFor={fps} name="Cảnh 9: Bình luận AI Agent CTA">
        <Scene9CalloutCTA />
      </Sequence>

      <Sequence from={850} durationInFrames={55} premountFor={fps} name="Cảnh 10: Bước 03 Badge">
        <Scene10Step3Badge />
      </Sequence>

      <Sequence from={905} durationInFrames={50} premountFor={fps} name="Cảnh 11: Yêu cầu chính xác">
        <Scene11PromptInstruction />
      </Sequence>

      <Sequence from={955} durationInFrames={125} premountFor={fps} name="Cảnh 12: Soạn nháp & Duyệt gửi">
        <Scene12DraftApproval />
      </Sequence>

      <Sequence from={1080} durationInFrames={115} premountFor={fps} name="Cảnh 13: Tối ưu quy trình">
        <Scene13IterationLoop />
      </Sequence>

      <Sequence from={1195} durationInFrames={50} premountFor={fps} name="Cảnh 14: Bước 04 Badge">
        <Scene14Step4Badge />
      </Sequence>

      <Sequence from={1245} durationInFrames={129} premountFor={fps} name="Cảnh 15: Đóng gói thành Skill">
        <Scene15PackageSkill />
      </Sequence>

      <Sequence from={1374} durationInFrames={126} premountFor={fps} name="Cảnh 16: Lệnh slash & Hẹn giờ">
        <Scene16SlashAndCron />
      </Sequence>

      <Sequence from={1500} durationInFrames={65} premountFor={fps} name="Cảnh 17: Xong xuôi trước khi mở máy">
        <Scene17OutroComplete />
      </Sequence>

      {/* User Talking Head in Bottom Half (Hidden during fullscreen transitions/badges) */}
      <UserTalkingHead />

      {/* Floating Karaoke Captions */}
      <PaperCaptions />
    </AbsoluteFill>
  );
};
