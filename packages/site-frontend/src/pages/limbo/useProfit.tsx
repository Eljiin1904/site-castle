import { useMemo } from "react";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Limbo } from "#app/services/limbo";

export function useProfit() {
  const betAmount = useAppSelector((x) => x.limbo.betAmount || 0);
  const targetValue = useAppSelector((x) => x.limbo.targetValue);

  const state = useMemo(() => {
    const profit = Limbo.getProfit({
      betAmount,
      targetValue,
    });

    return {
      profit,
      maxProfit: Limbo.maxProfit,
      overMax: profit > Limbo.maxProfit,
    };
  }, [betAmount, targetValue]);

  return state;
}
