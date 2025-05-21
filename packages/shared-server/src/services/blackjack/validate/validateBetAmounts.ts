import { getInitBetAmounts, hasVal } from "@core/services/blackjack/Blackjack";
import { keys } from "@core/services/utility/Utility";
import { BlackjackBetAmounts } from "@core/types/blackjack/BlackjackBetAmounts";

export function validateBetAmounts(betAmounts: BlackjackBetAmounts) {
  let sum = 0;
  keys(getInitBetAmounts()).forEach((key) => {
    const val = betAmounts[key];
    if (!hasVal(val)) throw new Error(`Missing bet amount for ${key}`);
    if (typeof val !== "number") throw new Error(`Invalid bet amount for ${key}`);
    if (val < 0) throw new Error(`negative bet amount for ${key}`);
    sum += Math.round(val);
  });
  return { sum };
}
