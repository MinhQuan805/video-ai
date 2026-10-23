import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  staticFile,
} from "remotion";
import scenesData from "../videos/darwin/scenes.json";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { PlaceholderScene } from "./scenes/PlaceholderScene";
import { Caption } from "./visual-systems/cutout-collage/Caption";
import { TearTransition } from "./visual-systems/cutout-collage/TearTransition";
import { PaperVideo } from "./visual-systems/paper/PaperVideo";

export const VideoComponent: React.FC = () => {
  // Nếu scenes.json ghi visual_system: "paper" thì dùng hệ hình paper
  if ((scenesData as { visual_system?: string }).visual_system === "paper") {
    return <PaperVideo />;
  }

  const { scenes } = scenesData;
  const s1 = scenes[0];
  const s2 = scenes[1];
  const s3 = scenes[2];
  const s4 = scenes[3];
  const s5 = scenes[4];

  return (
    <AbsoluteFill style={{ backgroundColor: "#FBFAF7", overflow: "hidden" }}>
      {/* Phát file giọng đọc voice.wav làm tiếng xuyên suốt video */}
      <Audio src={staticFile("videos/darwin/voice.wav")} />

      {/* Cảnh 1: Dựng chi tiết theo scenes.json */}
      <Sequence from={s1.from} durationInFrames={s1.to - s1.from}>
        <Scene1 />
      </Sequence>

      {/* Chuyển cảnh xé (Tear Transition) giữa Cảnh 1 và Cảnh 2 */}
      <TearTransition startFrame={s2.from - 8} duration={16} />

      {/* Cảnh 2: Dựng kiểu mẩu báo rơi xuống (Câu lệnh 24) */}
      <Sequence from={s2.from} durationInFrames={s2.to - s2.from}>
        <Scene2 />
      </Sequence>

      {/* Cảnh 3: Dựng kiểu nhân vật bung pop-up (Câu lệnh 25) */}
      <Sequence from={s3.from} durationInFrames={s3.to - s3.from}>
        <Scene3 />
      </Sequence>

      {/* Cảnh 4: Dựng kiểu lật trang và xé giấy lộ ra (Câu lệnh 26) */}
      <Sequence from={s4.from} durationInFrames={s4.to - s4.from}>
        <Scene4 />
      </Sequence>

      {/* Cảnh 5: Câu hỏi gợi mở & Nguồn gốc các loài (Câu lệnh 14 & 27) */}
      <Sequence from={s5.from} durationInFrames={s5.to - s5.from}>
        <Scene5 />
      </Sequence>

      {/* Caption ở khoảng 1/3 phía dưới khung hình, luôn nằm trên mọi lớp hình */}
      <Caption />
    </AbsoluteFill>
  );
};

export const VideoComposition: React.FC = () => {
  return (
    <Composition
      id="Video"
      component={VideoComponent}
      durationInFrames={855}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
