import { useEffect, useRef } from "react";
import { RaffleState } from "@core/types/rewards/RaffleState";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { Effects } from "#app/services/effects";

export const RaffleEffects = ({ raffle }: { raffle: RaffleState }) => {
  const playSound = useSoundPlayer("holiday");
  const lastRound = useRef(raffle.round);
  const lastWinner = useRef(raffle.winners.length - 1);

  useSoundPreloader("success", "confetti-jackpot");

  useEffect(() => {
    if (raffle.status !== "drawing" || raffle.round === 0) {
      return;
    }

    const round = raffle.round;
    const winner = raffle.winners.length - 1;

    if (lastRound.current !== round) {
      lastRound.current = round;

      playSound("success");
    }

    if (lastWinner.current !== winner) {
      lastWinner.current = winner;

      Effects.manager.play("RaffleItemCard", `index-${winner}-`);

      playSound("confetti-jackpot");
    }
  }, [raffle]);

  return null;
};
