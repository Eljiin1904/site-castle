import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTryPlayer } from "#app/services/blackjack/Blackjack";
import { useEffect, useState } from "react";

// TODO merge with hook useDisplayBetAmount
export function useDisplayBetAmounts() {
  const originalBetAmounts = useAppSelector((state) => state.blackjack.betting.betAmounts);
  const player = useTryPlayer();
  const playerBetAmounts = player?.displayBetAmounts;
  const cardsDealt = useAppSelector((state) => state.blackjack.cardsDealt);
  const [betAmounts, setBetAmounts] = useState(playerBetAmounts || originalBetAmounts);
  const game = useAppSelector((state) => state.blackjack.game);
  useEffect(() => {
    if(game && game.completed) {
      setBetAmounts(originalBetAmounts)
      return;
    }
    if (cardsDealt) {
      setBetAmounts(playerBetAmounts || originalBetAmounts);
    } else if (!playerBetAmounts) {
      // game cleared
      setBetAmounts(originalBetAmounts);
    }
  }, [cardsDealt, originalBetAmounts, playerBetAmounts]);

  return betAmounts;
}
