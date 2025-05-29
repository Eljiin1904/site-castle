import { BlackjackClientGameData } from "#core/types/blackjack/BlackjackApiResponse";
import { BjState } from "../blackjackSlice";
import { WritableDraft } from "immer";

export function setBetAmountForExistingGame(
  state: WritableDraft<BjState>,
  { game }: { game: BlackjackClientGameData },
) {
  const { betting } = state;

  // todo: use logged-in player
  const curPlayer = game.players[0];

  const { betAmounts } = curPlayer;

  betting.betAmounts = betAmounts;
}
