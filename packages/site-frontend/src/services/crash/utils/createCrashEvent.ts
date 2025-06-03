import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Crash } from "..";

/**
 * A random crash event, with a random height,color and position.
 * color is either bright-green or double-red. (red is a crash event, green is a profit event)
 * Events display at the beginning of the round, as animations.
 * If star line is true, the event position is 0, otherwise it's random (0 to 25) and depends of previous event.
 * If the prev event was crash, next event will be profit and will start at the bottom of the crash event.
 * If the prev event was profit, next event will start at the top of the previous event if its also profit, or will end at the top of the previous event if its crash.
 *
 */
export function createCrashEvent(props: Partial<CrashEventProps>, prevEvent?: CrashEventProps): CrashEventProps {
  
  let height = props?.height ?? getRandomInt(Crash.chart.offset); // height of the crash event (0 to 25)
  let position = props?.startAtLine ? 0 : getRandomInt(Crash.chart.offset); // if it's a started line, the position is 0, otherwise it's random (0 to 25) 
  let color = props?.color ?? ["bright-green" , "double-red"][getRandomInt(2)] as "bright-green" | "double-red"; // random color for the crash event
  let startAtLine = props?.startAtLine ?? position === 0; // if the position is 0, it's a started line, otherwise it's not
  
  if(prevEvent) {

    const prevEventFullHeight = prevEvent.position + prevEvent.height - (prevEvent.startAtLine ? 4 : 0); // if the previous event is a started line, we subtract 4 from the height to keep the height positive
    if(color === "bright-green") 
    {
      position = prevEvent.color === "double-red" ? prevEvent.position : prevEventFullHeight;
      
    }
    else {
      
      if(startAtLine) {

        position = 0;
        height = Math.min(height, prevEventFullHeight - 4);
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
  return {color, height, initialHeight: height, position, startAtLine};
}

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}