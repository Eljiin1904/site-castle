import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Div } from "@client/comps/div/Div";

export const CrashEvent = ({
  crashLength,
  crashColor,
  width = 10,
  crashPosition = 0,
  startedLine }: CrashEventProps) => {

  const lineHeight = Math.max(crashLength, 4);
  const totalToAdd = startedLine ? 0 : 4;
  
  return (<Div color={crashColor} zIndex={10} style={{marginBottom: `${crashPosition}px`}}>
    <svg width={width} height={lineHeight + 4 + totalToAdd} color={crashColor}>
      {!startedLine && <rect width={width/3} height="4" x={width/3} y={lineHeight + totalToAdd} fill="currentColor" />}
      <rect width={width} height={lineHeight} x="0" y={4} fill="currentColor" />
      <rect width={width/3} height="4" x={width/3} y="0" fill="currentColor" />
  </svg>
  </Div>);
};
