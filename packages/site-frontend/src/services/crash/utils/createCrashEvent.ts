import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Crash } from "..";
/**
 * A random crash event, with a random height,color and position.
 * color is either bright-green or double-red. (red is a crash event, green is a profit event)
 * Events display at the beginning of the round, as animations.
 * If started line is true, the event position is 0, otherwise it's random (0 to 25) and depends of previous event.
 * If the prev event was crash, next event will be profit and will start at the bottom of the crash event.
 * If the prev event was profit, next event will start at the top of the previous event if its also profit, or will end at the top of the previous event if its crash.
 *
 */
export function createCrashEvent(startedLine: boolean, prevEvent?: CrashEventProps): CrashEventProps {
  let crashLength = getRandomInt(Crash.chart.offset); // height of the crash event (0 to 50)
  let crashPosition = startedLine ? 0 : getRandomInt(Crash.chart.offset); // if it's a started line, the position is 0, otherwise it's random (0 to 25) 
  let crashColor = ["bright-green" , "double-red"][getRandomInt(2)] as "bright-green" | "double-red"; // random color for the crash event

  if(prevEvent) {
    
    // if the previous event is crash, we need to change the color to bright-green, we should not have two crash events in a row
    // if(crashColor === prevEvent.crashColor && crashColor === "double-red")
    // crashColor = "bright-green";
    
    const previousFullLength = (prevEvent.crashPosition ?? 0 ) + prevEvent.crashLength - (prevEvent.startedLine ? 4 : 0); // 4 is the size of the event crown on top
    
    if(crashColor == "double-red")
    {
      // if the event iscrash, we need to start at the bottom of the previous event
      crashPosition = previousFullLength - crashLength;
      if(prevEvent.crashColor === "double-red") {
        crashPosition = crashPosition -getRandomInt(5);
      }
      if(crashPosition < 0) {
        crashLength = Math.max(4, crashLength - crashPosition); // we need to ensure that the crash length is at least 4, so we can have a crown on top
        crashPosition = 0; // we cannot have a negative position
      }
    }
    else {

      // if the previous event is bright-green, we need to start at the top of the previous event
      crashPosition = prevEvent.crashColor === "double-red" ? (prevEvent.crashPosition ?? 0) : previousFullLength;
    }    
  }
  return {crashColor, crashLength, startedCrashLength: crashLength, crashPosition, startedLine: crashPosition === 0};
}

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}