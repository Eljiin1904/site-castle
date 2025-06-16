/**
 * Constants for the crash chart.
 * Defines the height, offset, multiplier break point, and pixels per multiplier.
 */
export const chart = {
  height: 256,
  offset: 25,
  multiplierBreakPoint: 5,
  pixelsPerMultiplier: 41,
};


//How to get pixels per multiplier.
// Height of the chart is 256px
// Multiplier break point is 5
// The intersection point is 256 - 256/5 = 205
// The height of the chart is divided by the multiplier break point 200 / 5 = 41
// from 1 to 2 multiplier, the height is (multiplier-1 ) X 41 X 2 = 82px (MAX)
// from 2 to 5 multiplier, the height is multiplier X 41px  = 205px (MAX)