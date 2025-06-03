import { values } from "#core/services/utility/utils/values";
import { BlackjackBetAmounts } from "#core/types/blackjack/BlackjackBetAmounts";

export function getTotalBetAmount(betAmounts: BlackjackBetAmounts) {
  return values(betAmounts).reduce((acc, betAmount) => acc + betAmount, 0);
}
