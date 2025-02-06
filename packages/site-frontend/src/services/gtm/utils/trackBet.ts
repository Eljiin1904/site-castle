import { Intimal } from "@core/services/intimal";
import { store } from "#app/store";
import { push } from "./push";

export function trackBet({
  game,
  tokenAmount,
}: {
  game: string;
  tokenAmount: number;
}) {
  const { user } = store.getState();

  push({
    event: "wager",
    gameName: game,
    userId: user._id,
    value: Intimal.toDecimal(tokenAmount / 2),
  });
}
