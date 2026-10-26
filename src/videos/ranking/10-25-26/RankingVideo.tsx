import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CaptionPhrase} from '../../../visual-systems/ranking/types';
import captions from './captions.json';
import {ZaloScene} from './scenes/ZaloScene';
import {SheetScene} from './scenes/SheetScene';
import {HubSpotScene} from './scenes/HubSpotScene';
import {NotionScene} from './scenes/NotionScene';
import {OdooScene} from './scenes/OdooScene';
import {OutroScene} from './scenes/OutroScene';
import {FONT, INK, PAPER} from './scenes/Stage';
import {layer} from './scenes/motion';
import {RankingIntro} from './RankingIntro';
import {TitleHeader} from '../../../visual-systems/ranking/components/TitleHeader';

const EpisodeCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phrase = (captions.phrases as CaptionPhrase[]).find((p) => frame >= p.start_frame && frame < p.end_frame);
  if (!phrase) return null;
  return <div style={{position: 'absolute', top: 948, left: 100, width: 880, height: 126, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 21, zIndex: 100}}>
    {phrase.words.map((word, i) => <span key={`${phrase.start_frame}-${i}`} style={{fontSize: 45, fontWeight: 700, color: frame >= word.start_frame && frame < word.end_frame ? '#C77659' : INK, whiteSpace: 'nowrap', ...layer(frame, phrase.start_frame + i, fps, 8)}}>{word.text}</span>)}
  </div>;
};

export const CrmRankingVideo: React.FC = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: PAPER, fontFamily: FONT, color: INK}}>
    <TitleHeader prefix="Xếp hạng" highlight="công cụ quản lý" />
    <RankingIntro />
    <Sequence name="Zalo · Tin nhắn trôi" from={0} durationInFrames={146} premountFor={fps}><ZaloScene /></Sequence>
    <Sequence name="Google Sheet · Gõ thủ công" from={134} durationInFrames={182} premountFor={fps}><SheetScene /></Sequence>
    <Sequence name="HubSpot · Bậc nâng cấp" from={304} durationInFrames={171} premountFor={fps}><HubSpotScene /></Sequence>
    <Sequence name="Notion · Tự lắp quy trình" from={463} durationInFrames={155} premountFor={fps}><NotionScene /></Sequence>
    <Sequence name="Odoo · Dòng chảy kết nối" from={606} durationInFrames={234} premountFor={fps}><OdooScene /></Sequence>
    <Sequence name="Bình luận · Hạng S của bạn" from={828} durationInFrames={79} premountFor={fps}><OutroScene /></Sequence>
    <EpisodeCaptions />
    <div style={{position: 'absolute', top: 1100, left: 160, width: 760, height: 580, borderRadius: 32, overflow: 'hidden', border: '3px solid white', boxShadow: '0 18px 48px rgba(23,35,51,0.10)', background: '#EBEDE7'}}>
      <OffthreadVideo src={staticFile('videos/ranking/10-25-26/assets/24-10-26_intra.mp4')} style={{position: 'absolute', width: 1080, height: 1920, left: -160, top: -710, transform: 'scale(0.71)', transformOrigin: '540px 1000px'}} />
    </div>
  </AbsoluteFill>;
};
