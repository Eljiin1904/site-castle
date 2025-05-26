import { Crash } from "..";

/**
 * Get the position of the multiplier on the chart. Chart height is 256.
 * From 1 to 2 multiplier, the height is (multiplier -1 ) X 41 X 2 = 82px (MAX)
 * From 2 to 5 multiplier, the height is multiplier X 41px  = 202 (MAX)
 * From 5 to 100 multiplier, the height is 256 - (256/multiplier) = 256 - (51/multiplier)
 * @param multiplier 
 * @returns 
 */
export function getMultiplierPosition(
  multiplier: number
): number {
  
  let multiplierPosition = 0;
  const crashHeight = Crash.chart.height;// 256
  const pixelsPerMultiplier = Crash.chart.pixelsPerMultiplier; // 41
  const multiplierBreakPoint = Crash.chart.multiplierBreakPoint; //5 

  if(multiplier < 2)
    multiplierPosition = (multiplier - 1)* pixelsPerMultiplier * 2;
  else if(multiplier < multiplierBreakPoint)
    multiplierPosition = (multiplier)* pixelsPerMultiplier;
  else 
    multiplierPosition = crashHeight - (crashHeight/(multiplier));

  return Math.max(multiplierPosition, 0);
}