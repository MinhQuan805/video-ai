import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../visual-systems/paper/theme';
import {frameTime} from '../motion/core.ts';

export type EditSpan = {sourceStartMs: number; sourceEndMs: number; editStartMs: number; editEndMs: number; playbackRate: number};
export type CaptionWord = {id: string; text: string; startMs: number; endMs: number};
export type CaptionAnchor = CaptionWord & {words?: CaptionWord[]};

/** Source/edit clocks stay together. src must be a mounted staticFile() URL, never a raw filesystem path. */
export const RawFootage: React.FC<{src: string; spans: EditSpan[]; audioOnly?: boolean; style?: React.CSSProperties}> = ({src, spans, audioOnly = false, style}) => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={style}>{spans.map((span, i) => {
    if (span.playbackRate !== 1) throw new Error('RawFootage supports only reviewed, unchanged-speed edit spans');
    const from = Math.floor(span.editStartMs * fps / 1000);
    const end = i === spans.length - 1 ? Math.ceil(span.editEndMs * fps / 1000) : Math.floor(span.editEndMs * fps / 1000);
    if (end <= from) return null;
    const startFrom = Math.floor(span.sourceStartMs * fps / 1000);
    return <Sequence key={`${i}-${from}`} from={from} durationInFrames={end - from}>
      {audioOnly ? <Audio src={src} startFrom={startFrom} /> : <OffthreadVideo src={src} startFrom={startFrom} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
    </Sequence>;
  })}</AbsoluteFill>;
};

export const captionPages = (anchors: CaptionAnchor[], maxWords = 4): CaptionAnchor[] => {
  if (!Number.isInteger(maxWords) || maxWords < 1) throw new Error('maxWords must be a positive integer');
  return anchors.flatMap(anchor => {
    if (!anchor.words?.length) return [anchor];
    const pages: CaptionAnchor[] = [];
    for (let i = 0; i < anchor.words.length; i += maxWords) {
      const words = anchor.words.slice(i, i + maxWords);
      pages.push({id: `${anchor.id}-${i}`, text: words.map(w => w.text).join(' '), words,
        startMs: words[0].startMs, endMs: i + maxWords < anchor.words.length ? anchor.words[i + maxWords].startMs : anchor.endMs});
    }
    return pages;
  });
};

export const PaperCaptions: React.FC<{anchors: CaptionAnchor[]; maxWords?: number; style?: React.CSSProperties}> = ({anchors, maxWords = 4, style}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const timeMs = frameTime(frame, fps);
  const page = captionPages(anchors, maxWords).find(a => timeMs >= a.startMs && timeMs < a.endMs);
  if (!page) return null;
  return <div style={{position: 'absolute', left: '8%', right: '16%', bottom: '17%', zIndex: 9999,
    display: 'flex', justifyContent: 'center', pointerEvents: 'none', ...style}}>
    <div style={{fontFamily: theme.fonts.body, fontSize: 48, fontWeight: 700, lineHeight: 1.35,
      color: theme.colors.ink, borderRadius: 18, background: theme.colors.background, padding: '10px 22px', textAlign: 'center'}}>
      {page.words?.length ? page.words.map((w, i) => <React.Fragment key={w.id}>
        {i > 0 ? ' ' : ''}<span style={{color: timeMs >= w.startMs && timeMs < (page.words?.[i + 1]?.startMs ?? page.endMs) ? theme.colors.accent : theme.colors.ink}}>{w.text}</span>
      </React.Fragment>) : page.text}
    </div>
  </div>;
};
