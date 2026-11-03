import React from "react";
import { Sequence } from "remotion";

export * from "./MotionWrapper";
export * from "./Scene01_AuctionGavelDeal";
export * from "./Scene02_ServerRamSnap";
export * from "./Scene03_IndustrialToggleSwitch";
export * from "./Scene04_PrecisionVernierCaliper";
export * from "./Scene05_ThermalReceiptPos";
export * from "./Scene06_PressureGaugeBoil";
export * from "./Scene07_VaultDoorUnlocking";
export * from "./Scene08_BrassPadlockAuth";
export * from "./Scene09_LeadMagnetHorseshoe";
export * from "./Scene10_SlingshotRocketLaunch";

import { Scene01_AuctionGavelDeal } from "./Scene01_AuctionGavelDeal";
import { Scene02_ServerRamSnap } from "./Scene02_ServerRamSnap";
import { Scene03_IndustrialToggleSwitch } from "./Scene03_IndustrialToggleSwitch";
import { Scene04_PrecisionVernierCaliper } from "./Scene04_PrecisionVernierCaliper";
import { Scene05_ThermalReceiptPos } from "./Scene05_ThermalReceiptPos";
import { Scene06_PressureGaugeBoil } from "./Scene06_PressureGaugeBoil";
import { Scene07_VaultDoorUnlocking } from "./Scene07_VaultDoorUnlocking";
import { Scene08_BrassPadlockAuth } from "./Scene08_BrassPadlockAuth";
import { Scene09_LeadMagnetHorseshoe } from "./Scene09_LeadMagnetHorseshoe";
import { Scene10_SlingshotRocketLaunch } from "./Scene10_SlingshotRocketLaunch";

export const FLAGSHIP_10_MOTION_DEV_SCENES = [
  Scene01_AuctionGavelDeal,
  Scene02_ServerRamSnap,
  Scene03_IndustrialToggleSwitch,
  Scene04_PrecisionVernierCaliper,
  Scene05_ThermalReceiptPos,
  Scene06_PressureGaugeBoil,
  Scene07_VaultDoorUnlocking,
  Scene08_BrassPadlockAuth,
  Scene09_LeadMagnetHorseshoe,
  Scene10_SlingshotRocketLaunch,
];

export const MotionDev10Showcase: React.FC = () => {
  const SLIDE_DURATION = 90;

  return (
    <>
      {FLAGSHIP_10_MOTION_DEV_SCENES.map((SceneComp, idx) => (
        <Sequence key={idx} from={idx * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <SceneComp />
        </Sequence>
      ))}
    </>
  );
};
