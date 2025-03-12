import { Intimal } from "@core/services/intimal";
import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";

export async function validateXP(user: UserDocument, requiredXP: number) {
  if (user.xp < requiredXP) {
    throw new HandledError(
      `You must have at least ${Intimal.toDecimal(requiredXP, 0)} XP.`,
    );
  }
}
