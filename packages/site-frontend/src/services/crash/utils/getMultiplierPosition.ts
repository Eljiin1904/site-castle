import { Crash } from "..";

/**
 * Calculates the position of the multiplier on the chart based on predefined rules.
 * Chart height is 256 pixels.
 * - For multipliers between 1 and 2: The position is calculated as (multiplier - 1) * 41 * 2, with a maximum of 82px.
 * - For multipliers between 2 and 5: The position is calculated as multiplier * 41px, with a maximum of 202px.
 * - For multipliers between 5 and 100: The position is calculated as 256 - (256 / multiplier).
 * 
 * @param multiplier The multiplier value to calculate the position for.
 * @returns The calculated position on the chart, ensuring it is not less than 0.
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