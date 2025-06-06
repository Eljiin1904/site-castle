/**
 * Calculates a multiplier based on the provided timer value.
 * 
 * The multiplier is computed using a formula that involves exponential growth
 * and is rounded down to two decimal places.
 * 
 * @param timer - The timer value in milliseconds. This value is used to calculate
 *                the multiplier based on a predefined formula.
 * @returns The calculated multiplier as a number rounded to two decimal places.
 */
export function getMultiplierForTime(timer: number): number {

  return Math.floor(1.0024 * Math.pow(1.0718, timer / 1000)* 100) / 100;
};
