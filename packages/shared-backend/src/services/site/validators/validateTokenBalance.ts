import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";

export async function validateTokenBalance(user: UserDocument, amount: number) {
  if (user.tokenBalance < amount) {
    throw new HandledError("You do not have enough tokens.");
  }
}
