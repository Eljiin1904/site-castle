import { Crash } from "..";

/**
 * Get the labels for the crash chart based on the multiplier and previous maximum value.
 * @param multiplier 
 * @param prevMax - The previous maximum value of the chart, used to adjust the scale if necessary.
 * @returns {
  labels: number[] - An array of labels for the chart, representing multiplier values. 
  proportion: number - A proportion value used to adjust the scale of the chart based on the multiplier and previous maximum.
  }
 */
export function getChatLabels(
  multiplier: number,
  prevMax: number
): {
  labels: number[];
  proportion: number;
} {
  

  const crashHeight = Crash.chart.height ?? 256;// 256
  const multiplierBreakPoint = Crash.chart.multiplierBreakPoint ?? 5; //5 
  const multiplierPosition = Crash.getMultiplierPosition(multiplier);
  //Find the max value for the chart based on the multiplier and the height
  let maxValue = crashHeight * multiplier / multiplierPosition; 
  let proportion = 1;
  // If the multiplier is greater than 5 and less than 3/4 of the prev Max, keep prevMax and update the chart scale value
  if (multiplier > multiplierBreakPoint && multiplier < prevMax + 3 *  prevMax / 4 && prevMax !== 1) {
    proportion = prevMax / maxValue;
    maxValue = prevMax;
  }

  let labels: number[] = [];
  if (multiplier <= 5) {
    labels = [6,4, 2, 1];
    proportion = 0.5;
  }
  else {
    labels = [1, maxValue / 4, maxValue / 2, 3 * maxValue / 4, maxValue, maxValue + maxValue / 4, maxValue + maxValue / 2, maxValue + 3 * maxValue / 4, maxValue * 2].reverse();
    labels = labels.map((x) => Math.round(x* 10) / 10);
  }

 return { labels, proportion };
};