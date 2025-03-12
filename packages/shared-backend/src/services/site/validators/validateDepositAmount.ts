import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";

export async function validateDepositAmount(
  user: UserDocument,
  amount: number,
) {
  if ((user.stats.depositAmount || 0) < amount) {
    throw new HandledError(`You must deposit at least ${amount} tokens.`);
  }
}
