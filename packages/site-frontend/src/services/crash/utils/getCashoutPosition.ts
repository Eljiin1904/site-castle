import { Crash } from "..";

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