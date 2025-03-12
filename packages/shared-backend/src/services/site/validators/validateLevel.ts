import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";
import { Users } from "#app/services/users";

export async function validateLevel(user: UserDocument, requiredLevel: number) {
  if (Users.getLevel(user.xp) < requiredLevel) {
    throw new HandledError(`You must be at least level ${requiredLevel}.`);
  }
}
