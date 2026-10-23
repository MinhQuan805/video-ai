import { Composition } from "remotion";
import { VideoComposition } from "./Composition";
import { CutoutTest } from "./visual-systems/cutout-collage/CutoutTest";
import { TimelineTest } from "./visual-systems/cutout-collage/TimelineTest";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CutoutTest"
        component={CutoutTest}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TimelineTest"
        component={TimelineTest}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <VideoComposition />
    </>
  );
};

