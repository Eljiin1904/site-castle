import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";
import { Users } from "#app/services/users";

export async function validateSuspension(user: UserDocument) {
  if (Users.isSuspended(user.suspension)) {
    throw new HandledError("validations:errors.wallet.suspended");
  }
}
