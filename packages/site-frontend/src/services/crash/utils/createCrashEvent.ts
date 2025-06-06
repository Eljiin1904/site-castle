import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Crash } from "..";

/**
 * Generates a random crash event with a random height, color, and position.
 * - `color` is either "bright-green" (profit event) or "double-red" (crash event).
 * - Events are displayed at the beginning of the round as animations.
 * - If `startAtLine` is true, the event's position is set to 0; otherwise, it is random (0 to 25) and depends on the previous event.
 * - If the previous event was a crash ("double-red"), the next event will be a profit ("bright-green") and will start at the bottom of the crash event.
 * - If the previous event was a profit ("bright-green"), the next event will:
 *   - Start at the top of the previous event if it is also a profit.
 *   - End at the top of the previous event if it is a crash.
 */
export function createCrashEvent(props: Partial<CrashEventProps>, prevEvent?: CrashEventProps): CrashEventProps {
  
  let height = props?.height ?? getRandomInt(Crash.chart.offset); // height of the crash event (0 to 25)
  let position = props?.startAtLine ? 0 : getRandomInt(Crash.chart.offset); // if it's a started line, the position is 0, otherwise it's random (0 to 25) 
  let color = props?.color ?? ["bright-green" , "double-red"][getRandomInt(2)] as "bright-green" | "double-red"; // random color for the crash event
  let startAtLine = props?.startAtLine ?? position === 0; // if the position is 0, it's a started line, otherwise it's not

  if(prevEvent) {

    const prevEventFullHeight = prevEvent.position + prevEvent.height - (prevEvent.startAtLine ? 4 : 0); // if the previous event is a started line, we subtract 4 from the height to keep the height positive
    if(prevEventFullHeight >= Crash.chart.offset*2)
      color = "double-red"; // if the previous event is too high, we set the color to double-red
    else if(prevEventFullHeight <= Crash.chart.offset/2 && startAtLine === false)
      color = "bright-green"; // if the previous event is too low, we set the color to bright-green
    if(color === "bright-green") 
      position = prevEvent.color === "double-red" ? prevEvent.position : prevEventFullHeight; 
    else {
      
      if(startAtLine) {

        position = 0;
        height = prevEvent.position + 4;
      }
      else {
        
        const maxHeight =  prevEvent.color === "bright-green" ? prevEventFullHeight : prevEvent.position;
        position = maxHeight - height;
        if(position < 0) {
          position = 0; // if the position is less than 0, we set it to 0
          height = maxHeight; // we add the position to the height to keep the height positive
        }
      }
    }
  }
  startAtLine = startAtLine || position === 0; // if the position is 0, it's a started line, otherwise it's not
  return {color, height, initialHeight: height, position, startAtLine};
}

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}