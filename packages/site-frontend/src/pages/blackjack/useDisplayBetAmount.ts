import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Blackjack } from "#app/services/blackjack";
import { useBetAmount, useTryDisplayBetAmount } from "#app/services/blackjack/redux/selectors";
import { BlackjackBetType } from "#core/types/blackjack/BlackjackBetAmounts";
import { useEffect, useState } from "react";

export function useDisplayBetAmount(type: BlackjackBetType) {
  const originalTotal = useBetAmount(type);
  const curTotal = useTryDisplayBetAmount(type);
  const cardsDealt = useAppSelector((state) => state.blackjack.cardsDealt);
  const total = Blackjack.hasVal(curTotal) ? curTotal : originalTotal;
  const [amount, setAmount] = useState(total);

  useEffect(() => {
    if (cardsDealt) {
      const total = Blackjack.hasVal(curTotal) ? curTotal : originalTotal;
      setAmount(total);
    } else if (!Blackjack.hasVal(curTotal)) {
      // game cleared
      setAmount(originalTotal);
    }
  }, [cardsDealt, originalTotal, curTotal]);

  return amount;
}
