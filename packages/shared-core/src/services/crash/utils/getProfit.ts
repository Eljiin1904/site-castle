/**
 * Calculates the profit based on the bet amount and multiplier.
 *
 * @param {Object} params - The parameters for calculating profit.
 * @param {number} params.betAmount - The amount of the bet placed.
 * @param {number} params.multiplier - The multiplier applied to the bet.
 * @returns {number} The calculated profit, rounded to the nearest integer.
 */
export function getProfit({
  betAmount,
  multiplier
}: {
  betAmount: number;
  multiplier: number;
}): number {

  return Math.round(betAmount * multiplier) - betAmount;
}
