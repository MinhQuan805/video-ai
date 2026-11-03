import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from 'remotion';
import { Scene01PhoneOverload } from './scenes/Scene01PhoneOverload';
import { Scene02ThreeQuestions } from './scenes/Scene02ThreeQuestions';
import { Scene03SoftwareParadox } from './scenes/Scene03SoftwareParadox';
import { Scene04FragmentedData } from './scenes/Scene04FragmentedData';
import { Scene05SingleBrainTrap } from './scenes/Scene05SingleBrainTrap';
import { Scene06OneCustomerDossier } from './scenes/Scene06OneCustomerDossier';
import { Scene07ThreeCoreFields } from './scenes/Scene07ThreeCoreFields';
import { Scene08TeamSyncUpdates } from './scenes/Scene08TeamSyncUpdates';
import { Scene09SelfServiceClarity } from './scenes/Scene09SelfServiceClarity';
import { Scene10VacationFreedomOutro } from './scenes/Scene10VacationFreedomOutro';
import { UserTalkingHead } from './UserTalkingHead';
import { PaperCaptions } from './PaperCaptions';

export const PaperVideo0311: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#F4EFE6' }}>
      {/* Real Paper Texture Background (Pre-scaled 1080x1920, ấm, chống chói) */}
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
      {/* Voice Audio from user */}
      <Audio src={staticFile('videos/paper/03-11-26/user_voice.wav')} />

      {/* 10 Scenes Sequenced Strictly per scenes.json */}
      <Sequence from={0} durationInFrames={95} name="Scene 1: Báo động điện thoại">
        <Scene01PhoneOverload />
      </Sequence>

      <Sequence from={95} durationInFrames={100} name="Scene 2: 3 Câu hỏi dồn dập">
        <Scene02ThreeQuestions />
      </Sequence>

      <Sequence from={195} durationInFrames={130} name="Scene 3: Nghịch lý phần mềm">
        <Scene03SoftwareParadox />
      </Sequence>

      <Sequence from={325} durationInFrames={143} name="Scene 4: Dữ liệu phân mảnh">
        <Scene04FragmentedData />
      </Sequence>

      <Sequence from={468} durationInFrames={122} name="Scene 5: Bẫy nhớ một mình">
        <Scene05SingleBrainTrap />
      </Sequence>

      <Sequence from={590} durationInFrames={120} name="Scene 6: 1 Hồ sơ khách hàng">
        <Scene06OneCustomerDossier />
      </Sequence>

      <Sequence from={710} durationInFrames={100} name="Scene 7: 3 Trường dữ liệu">
        <Scene07ThreeCoreFields />
      </Sequence>

      <Sequence from={810} durationInFrames={150} name="Scene 8: Đồng bộ đội ngũ">
        <Scene08TeamSyncUpdates />
      </Sequence>

      <Sequence from={960} durationInFrames={100} name="Scene 9: Tự chủ tra cứu">
        <Scene09SelfServiceClarity />
      </Sequence>

      <Sequence from={1060} durationInFrames={140} name="Scene 10: Thảnh thơi nghỉ ngơi">
        <Scene10VacationFreedomOutro />
      </Sequence>

      {/* Talking-Head Cutout over Slate-Gray Card for Split Scenes (1, 3, 5, 7, 9) */}
      <UserTalkingHead />

      {/* Synchronized Kinetic Captions */}
      <PaperCaptions />
    </AbsoluteFill>
  );
};
