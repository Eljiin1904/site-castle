import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Blackjack } from "#app/services/blackjack";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { memo, useEffect } from "react";
import { chipSounds, dealSounds, getRandomDealSound } from "./utils/blackjackSounds";

export const BlackjackSoundManager = memo(() => {
  const playSound = useSoundPlayer("blackjack");
  const game = Blackjack.useGame();
  const world = Blackjack.useWorld();
  const authenticated = useAppSelector((x) => x.user.authenticated);

  useSoundPreloader("blackjackv2-win", "blackjack-tie", ...chipSounds, ...dealSounds);

  useEffect(() => {
    if (!authenticated || !game) return;

    const cardDealtFn = () => {
      playSound(getRandomDealSound());
    };
    const cardsDealtFn = () => {
      if (!game) return;

      // skipping extra hook
      const player = game.players[0];
      const { sidebetPayouts } = player;
      const hasNewSidebets = sidebetPayouts.some((payout) => payout.amount > 0 && !payout.fromData);
      if (hasNewSidebets) {
        playSound("blackjackv2-win");
        // no point in playing other sounds
        return;
      }

      if (!game.completed) return;

      const someHandsWon = player.hands.some((hand) => hand.mainPayout?.result === "win");
      const someHandsTie = player.hands.some((hand) => hand.mainPayout?.result === "tie");

      if (someHandsWon) {
        playSound("blackjackv2-win");
      } else if (someHandsTie) {
        playSound("blackjack-tie");
      } else {
        // sounds like we're getting rid of this
        // playSound("blackjack-lose");
      }
    };
    world.on("card-dealt", cardDealtFn);
    world.on("cards-dealt", cardsDealtFn);

    return () => {
      world.off("card-dealt", cardDealtFn);
      world.off("cards-dealt", cardsDealtFn);
    };
  }, [game, playSound, authenticated, world]); // world is static atm

  return null;
});
