import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Crash } from "..";
/**
 * A rolled reel has a length of 52, so for a default we do...
 * A random crash event, with a random height, and a random position.
 * color is either bright-green or double-red.
 * Events display at the beginning of the round, as animations.
 *
 */
export function createCrashEvent(startedLine: boolean): CrashEventProps {
  
 
  const crashLength = getRandomInt(Crash.chart.offset*2); // height of the crash event (0 to 50)
  const crashPosition = startedLine ? 0 : getRandomInt(Crash.chart.offset); // if it's a started line, the position is 0, otherwise it's random (0 to 25) 
  const crashColor = ["bright-green" , "double-red"][getRandomInt(2)] as "bright-green" | "double-red"; // random color for the crash event
  
  return {crashColor, crashLength, startedCrashLength: crashLength, crashPosition, startedLine};
}

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}