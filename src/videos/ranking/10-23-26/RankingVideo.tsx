import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import {
  TierBoard,
  FloatingRankCard,
  TalkingHead,
  TitleHeader,
  CaptionText,
  RankingScene,
  CaptionPhrase,
} from '../../../visual-systems/ranking';
import {
  MetaAdsScene,
  ColdOutreachScene,
  SpamDmScene,
  ReferralScene,
  ContentMarketingScene,
} from './scenes';
import scenesJson from './scenes.json';
import captionsJson from './captions.json';

const scenes = scenesJson.scenes as RankingScene[];
const phrases = captionsJson.phrases as CaptionPhrase[];

export const RankingVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const activeScene = scenes.find(
    (s) => frame >= s.start_frame && frame <= s.end_frame
  );

  return (
    <AbsoluteFill
      style={{
        background: '#F9F8F6',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* 1. Title Header (Displays throughout video) */}
      <TitleHeader prefix="Xếp hạng" highlight="kênh kiếm khách" />

      {/* 2. Tier Board (Hides during explanation when motion graphic appears) */}
      <TierBoard
        currentFrame={frame}
        scenes={scenes}
        activeScene={activeScene}
      />

      {/* 3. Single Hero Motion Graphic Scenes (In upper stage) */}
      <MetaAdsScene
        currentFrame={frame}
        startFrame={scenes[0].card_start_frame}
        endFrame={scenes[0].card_end_frame}
      />
      <ColdOutreachScene
        currentFrame={frame}
        startFrame={scenes[1].card_start_frame}
        endFrame={scenes[1].card_end_frame}
      />
      <SpamDmScene
        currentFrame={frame}
        startFrame={scenes[2].card_start_frame}
        endFrame={scenes[2].card_end_frame}
      />
      <ReferralScene
        currentFrame={frame}
        startFrame={scenes[3].card_start_frame}
        endFrame={scenes[3].card_end_frame}
      />
      <ContentMarketingScene
        currentFrame={frame}
        startFrame={scenes[4].card_start_frame}
        endFrame={scenes[4].card_end_frame}
      />

      {/* 4. Floating Rank Card (Spawns in center of upper board area, glides to tier slot) */}
      {scenes.map((scene) => (
        <FloatingRankCard
          key={scene.id}
          currentFrame={frame}
          scene={scene}
        />
      ))}

      {/* 5. Dynamic 3-4 Word Caption (Right above speaker face, green active highlight) */}
      <CaptionText phrases={phrases} />

      {/* 6. Talking Head (Positioned at bottom in a clean rounded card) */}
      <TalkingHead videoSrc="videos/ranking/10-23-26/assets/10-23-26_speed.mp4" />
    </AbsoluteFill>
  );
};
