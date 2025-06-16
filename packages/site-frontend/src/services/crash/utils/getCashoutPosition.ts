import { Crash } from "..";

/**
 * Calculates the position of a cashout on the chart based on the given multiplier and cashout value.
 *
 * @param multiplier - The multiplier value in time to calculate the position for.
 * @param cashout - The cashout value to calculate the position for.
 * @returns The calculated position of the cashout on the chart.
 *
 * The function uses different formulas depending on the value of the cashout:
 * - If `cashout` is equal to 1, the position is 0.
 * - If `cashout` is greater than 5, the position is calculated using the default formula:
 *   `cashout * multiplierPosition / multiplier`.
 * - For `cashout` values less than or equal to 5:
 *   - If `cashout` is greater than 2, the position is calculated using `cashout * pixelsPerMultiplier`.
 *   - If `cashout` is less than or equal to 2, the position is calculated using `(cashout - 1) * pixelsPerMultiplier * 2`.
 * - If `multiplier` is greater than 5, the position is adjusted using the multiplier breakpoint.
 */
export function getCashoutPosition(
  multiplier: number,
  cashout: number,
): number {
  const multiplierPosition = Crash.getMultiplierPosition(multiplier);
  const pixelsPerMultiplier = Crash.chart.pixelsPerMultiplier; 
  const defaultCashoutPosition = cashout * multiplierPosition / multiplier;  
 
  if(cashout ==1) return 0;
  if(cashout > 5)
    return defaultCashoutPosition;

  // For cashouts less than 5, we calculate the position based on the multiplier
  // and the pixels per multiplier.
  // If the cashout is less than 2, we use a different formula.

  const cashoutPosition = Math.max(0, cashout > 2 ? cashout*pixelsPerMultiplier : (cashout - 1) * pixelsPerMultiplier*2);
  return multiplier > 5 ? Math.max(defaultCashoutPosition, (cashoutPosition * (Crash.chart.multiplierBreakPoint / multiplierPosition))): cashoutPosition;
};