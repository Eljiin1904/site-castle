import { Crash } from "#app/services/crash";
import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Div } from "@client/comps/div/Div";
import { useEffect, useState } from "react";

export const CrashEvent = ({
  crashLength,
  crashColor,
  width = 10,
  crashPosition = 0,
  startedLine ,
animated}: CrashEventProps & {animated?: boolean}) => {

  const lineHeight = Math.max(crashLength, 4);
  const totalToAdd = startedLine ? 0 : 4;
  const [position, setPosition] = useState(crashPosition);
  const [initialCrashLength, setInitialCrashLength] = useState(lineHeight);
  
  useEffect(() => {
    if(!animated) {
      setPosition(crashPosition);
      setInitialCrashLength(lineHeight);
    }
    else {

      setPosition(lineHeight - Crash.chart.offset);
      setInitialCrashLength(0)
      const intervalId = setInterval(() => {

        if(position <= -Crash.chart.offset) {
          clearInterval(intervalId);
          return;
        }
        setPosition(currentPosition => currentPosition - 2);
        setInitialCrashLength(currentLength => currentLength + 2);
      }, 5);
    }
  }, [crashPosition, lineHeight, animated]);
  
  return (<Div color={crashColor} zIndex={10} style={{marginBottom: `${position}px`}}>
    <svg width={width} height={initialCrashLength + 4 + totalToAdd} color={crashColor}>
      {!startedLine && <rect width={width/3} height="4" x={width/3} y={initialCrashLength + totalToAdd} fill="currentColor" />}
      <rect width={width} height={initialCrashLength} x="0" y={4} fill="currentColor" />
      <rect width={width/3} height="4" x={width/3} y="0" fill="currentColor" />
  </svg>
  </Div>);
};
