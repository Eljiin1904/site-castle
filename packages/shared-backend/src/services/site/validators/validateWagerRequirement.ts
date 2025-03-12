import { Intimal } from "@core/services/intimal";
import type { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";

export async function validateWagerRequirement(user: UserDocument) {
  const amount = user.meta.wagerRequirement || 0;

  if (amount <= 0) {
    return;
  }
  if (amount < Intimal.fromDecimal(0.01)) {
    return;
  }

  throw new HandledError(
    `You must wager at least ${Intimal.toLocaleString(amount)} tokens.`,
  );
}
