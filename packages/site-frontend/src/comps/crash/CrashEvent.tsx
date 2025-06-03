import { Crash } from "#app/services/crash";
import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Div } from "@client/comps/div/Div";
import { useEffect, useState } from "react";

export const CrashEvent = ({
  height,
  color,
  width = 10,
  position = 0,
  startAtLine ,
animated}: CrashEventProps & {animated?: boolean}) => {

  const lineHeight = Math.max(height, 4);
  const totalToAdd = startAtLine ? 0 : 4;
  const [eventPosition, setEventPosition] = useState(position);
  const [initialHeight, setInitialHeight] = useState(lineHeight);
  
  useEffect(() => {
    if(!animated) {
      setEventPosition(position);
      setInitialHeight(lineHeight);
    }
    else {

      setEventPosition(lineHeight - Crash.chart.offset);
      setInitialHeight(0)
      const intervalId = setInterval(() => {

        if(position <= -Crash.chart.offset) {
          clearInterval(intervalId);
          return;
        }
        setEventPosition(currentPosition => currentPosition - 2);
        setInitialHeight(currentHeight => currentHeight + 2);
      }, 2);
    }
  }, [position, lineHeight, animated]);
  
  return (<Div color={color} zIndex={10} style={{marginBottom: `${eventPosition}px`}}>
    <svg width={width} height={initialHeight + 4 + totalToAdd} color={color}>
      {!startAtLine && <rect width={width/3} height="4" x={width/3} y={initialHeight + totalToAdd} fill="currentColor" />}
      <rect width={width} height={initialHeight} x="0" y={4} fill="currentColor" />
      <rect width={width/3} height="4" x={width/3} y="0" fill="currentColor" />
  </svg>
  </Div>);
};
