/**
 * Calculates the time required for a given multiplier based on a logarithmic formula.
 * 
 * The function computes the time by taking the logarithm of the ratio between the multiplier 
 * and a base value (1.0024), divided by the logarithm of another base value (1.0718), 
 * and then scales the result by multiplying it by 1000. If the computed value is negative, 
 * it returns 0 instead.
 * 
 * @param multiplier - The multiplier value for which the time is calculated. 
 *                     Must be a positive number greater than 1.0024.
 * @returns The calculated time in milliseconds. Returns 0 if the computed value is negative.
 */
export function getTimeForMultiplier(multiplier: number): number {

  return Math.max(0,Math.log(multiplier/1.0024)/Math.log(1.0718)*1000);
}
