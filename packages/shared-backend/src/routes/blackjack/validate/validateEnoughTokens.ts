import { BlackjackAction } from "@core/types/blackjack/BlackjackAction";
import { getInsuranceBetAmount } from "@server/services/blackjack/Blackjack";

export function validateEnoughTokens({
  betAmount,
  user,
  action,
  buyInsurance,
}: {
  betAmount: number;
  user: any;
  action: BlackjackAction;
  buyInsurance?: boolean;
}) {
  if (!betAmount) return;

  if (["split", "double"].includes(action)) {
    //
    // transaction already covers this validation?
    if (betAmount > user.tokenBalance)
      throw new Error("You don't have enough tokens to perform this action");
    //
  } else if (action === "insurance") {
    const insBetAmount = getInsuranceBetAmount(betAmount);
    //
    // transaction already covers this validation?
    if (buyInsurance && insBetAmount > user.tokenBalance)
      throw new Error("You don't have enough tokens to perform this action");
  }
}
