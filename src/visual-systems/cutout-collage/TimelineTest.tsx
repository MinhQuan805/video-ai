import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { TimelineRuler } from "./TimelineRuler";
import { InkBlock } from "./InkBlock";
import { theme } from "./theme";

export const TimelineTest: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 60,
          zIndex: 40,
        }}
      >
        <InkBlock borderPadding={8} style={{ padding: "14px 28px" }}>
          <span
            style={{
              fontFamily: theme.fonts.anton,
              fontSize: 48,
              color: theme.colors.yellow,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            HẢI TRÌNH 5 NĂM (1831 – 1836)
          </span>
        </InkBlock>
      </div>

      {/* Timeline Ruler */}
      <TimelineRuler
        startFrame={0}
        top={960}
        items={[
          { year: "1831", title: "Beagle khởi hành", frameHit: 24, position: "top" },
          { year: "1836", title: "Beagle về tới Anh", frameHit: 48, position: "bottom" },
        ]}
      />
    </AbsoluteFill>
  );
};
