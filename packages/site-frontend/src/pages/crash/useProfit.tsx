import { useMemo } from "react";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Crash } from "@core/services/crash";

export function useProfit() {
  const betAmount = useAppSelector((x) => x.crash.betAmount || 0);
  const multiplier = useAppSelector((x) => x.crash.targetMultiplier) ?? 1;

  const state = useMemo(() => {
    const profit = Crash.getProfit({betAmount, multiplier});

    return {
      profit,
      maxProfit: Crash.maxProfit,
      overMax: profit > Crash.maxProfit,
    };
  }, [betAmount, multiplier]);

  return state;
}
