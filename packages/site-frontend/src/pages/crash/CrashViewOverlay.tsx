import React from "react";
import { Div } from "@client/comps/div/Div";
import { CrashChartContainer } from "#app/comps/crash/CrashChartContainer";


export const CrashViewOverlay = () => {
  
  return (
    <Div
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      center
    >
      <CrashChartContainer />
    </Div>
  );
};

