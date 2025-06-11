import { Crash } from "#app/services/crash";
import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Div } from "@client/comps/div/Div";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

/**
 * CrashEvent component renders a visual representation of a crash event on a chart.
 * It dynamically adjusts its position and height based on the provided props and animation state.
 *
 * @param {number} height - The height of the crash event. Defaults to a minimum of 4.
 * @param {string} [color="bright-green"] - The color of the crash event. Defaults to "bright-green".
 * @param {number} [width=10] - The width of the crash event. Defaults to 10.
 * @param {number} [position=0] - The initial position of the crash event on the chart.
 * @param {boolean} [startAtLine] - Determines whether the crash event starts at the multiplier line.
 * @param {number} multiplier - Used to scale down the height and position of the crash event based on the multiplier value.
 * @param {boolean} [animated] - Used to animate the crash event when the multiplier is reached. If true, the event will animate downwards until it reaches a certain position.
 *
 * @returns {JSX.Element} A styled `Div` containing an SVG representation of the crash event.
 *
 * @remarks
 * - The `useInterval` hook is used to animate the crash event when `animated` is true.
 * - The `finalHeight` and `finalPosition` are calculated based on the `multiplier` to scale the event appropriately.
 */
export const CrashEvent = ({
  height,
  color = "bright-green",
  width = 10,
  position = 0,
  startAtLine ,
  multiplier,
animated}: CrashEventProps & {animated?: boolean, multiplier: number}) => {

  const lineHeight = Math.max(height, 4);
  const totalToAdd = startAtLine ? 0 : 4; // if not starting at line, add 4px for the bottom rectangle
  const [eventPosition, setEventPosition] = useState(lineHeight - Crash.chart.offset);// used to animate the event downwards
  const [initialHeight, setInitialHeight] = useState(0); // used to animate the height of the event

  useInterval(() => {
    if(eventPosition >= -1*Crash.chart.offset) {
      const newHeight = Math.min(initialHeight + 2, lineHeight);
      const newPosition = Math.max(-Crash.chart.offset, lineHeight - Crash.chart.offset - newHeight);
      setEventPosition(newPosition);
      setInitialHeight(newHeight);
    }
  }, animated ? 5 : null);
  

  const chartHeight = animated ? initialHeight : lineHeight;
  const inChartPosition = animated ? eventPosition : position;
  
  // Calculate the final height and position based on the multiplier
  // If the multiplier is less than 5, use the initial height and position
  // If the multiplier is greater than or equal to 5, scale the height and position accordingly
  const finalHeight = multiplier < 5 ? chartHeight : chartHeight * (5/multiplier);
  const finalPosition = multiplier < 5 ? inChartPosition : inChartPosition * (5/multiplier);

  return (<Div color={color} zIndex={10} style={{marginBottom: `${finalPosition}px`}}>
    <svg width={width} height={finalHeight + 4  + totalToAdd} color={color}>
      {!startAtLine && <rect width={width/3} height="4" x={width/3} y={finalHeight + totalToAdd} fill="currentColor" />}
      <rect width={width} height={finalHeight} x="0" y={4} fill="currentColor" />
      <rect width={width/3} height="4" x={width/3} y="0" fill="currentColor" />
  </svg>
  </Div>);
};
