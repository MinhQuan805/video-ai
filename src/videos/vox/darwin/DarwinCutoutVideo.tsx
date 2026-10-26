import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import scenesData from "../../../../videos/vox/darwin/scenes.json";
import captionsData from "./captions.json";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Caption } from "../../../visual-systems/cutout-collage/Caption";
import { TearTransition } from "../../../visual-systems/cutout-collage/TearTransition";
import { VideoProvider } from "../../../context/VideoContext";

export const DarwinCutoutVideo: React.FC = () => {
  const { scenes } = scenesData;
  const s1 = scenes[0];
  const s2 = scenes[1];
  const s3 = scenes[2];
  const s4 = scenes[3];
  const s5 = scenes[4];

  return (
    <VideoProvider value={{ videoId: "darwin", captions: captionsData, scenesData }}>
      <AbsoluteFill style={{ backgroundColor: "#FBFAF7", overflow: "hidden" }}>
        {/* Voiceover audio */}
        <Audio src={staticFile("videos/vox/darwin/voice.wav")} />

        {/* Scene 1 */}
        <Sequence from={s1.from} durationInFrames={s1.to - s1.from}>
          <Scene1 />
        </Sequence>

        {/* Tear transition between Scene 1 and Scene 2 */}
        <TearTransition startFrame={s2.from - 8} duration={16} />

        {/* Scene 2 */}
        <Sequence from={s2.from} durationInFrames={s2.to - s2.from}>
          <Scene2 />
        </Sequence>

        {/* Scene 3 */}
        <Sequence from={s3.from} durationInFrames={s3.to - s3.from}>
          <Scene3 />
        </Sequence>

        {/* Scene 4 */}
        <Sequence from={s4.from} durationInFrames={s4.to - s4.from}>
          <Scene4 />
        </Sequence>

        {/* Scene 5 */}
        <Sequence from={s5.from} durationInFrames={s5.to - s5.from}>
          <Scene5 />
        </Sequence>

        {/* Dynamic lower-third captions */}
        <Caption captions={captionsData} />
      </AbsoluteFill>
    </VideoProvider>
  );
};
