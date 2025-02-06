import { useMemo } from "react";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";

export function useProfit() {
  const betAmount = useAppSelector((x) => x.dice.betAmount || 0);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const targetValue = useAppSelector((x) => x.dice.targetValue);

  const state = useMemo(() => {
    const profit = Dice.getProfit({
      betAmount,
      targetKind,
      targetValue,
    });

    return {
      profit,
      maxProfit: Dice.maxProfit,
      overMax: profit > Dice.maxProfit,
    };
  }, [betAmount, targetKind, targetValue]);

  return state;
}
