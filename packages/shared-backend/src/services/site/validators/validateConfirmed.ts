import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";

export async function validateConfirmed(user: UserDocument) {
  if (!user.emailConfirmed) {
    throw new HandledError("validations:errors.wallet.emailNotConfirmed");
  }
}
