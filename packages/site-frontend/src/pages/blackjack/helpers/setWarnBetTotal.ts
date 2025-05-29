import { friendlyBetType, maxBet } from "#app/services/blackjack/Blackjack";
import { store } from "#app/store";
import { Toasts } from "@client/services/toasts";
import { getTotalBetAmount } from "@core/services/blackjack/utils/getTotalBetAmount";
import { Intimal } from "@core/services/intimal";
import { BlackjackBetType } from "@core/types/blackjack/BlackjackBetAmounts";

export function setWarnBetTotal({
  betType,
  amount,
}: {
  betType: BlackjackBetType;
  amount: number;
}) {
  amount = Intimal.fromDecimal(amount);

  const state = store.getState();
  const betAmounts = state.blackjack.betting.betAmounts;
  const tokenBalance = state.user.tokenBalance;

  if (amount > maxBet) {
    // Toasts.warning("Max bet amount reached for " + friendlyBetType(betType));
    amount = maxBet;
  }

  const curVal = betAmounts[betType];
  const totalBets = getTotalBetAmount(betAmounts);
  const otherTotal = totalBets - curVal;

  if (otherTotal + amount > tokenBalance) {
    Toasts.warning("You don't have enough tokens");
    amount = tokenBalance - otherTotal;
  }
  return amount;
}
