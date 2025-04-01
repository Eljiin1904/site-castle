import { UserDocument } from "@core/types/users/UserDocument";
import { UserPermissions } from "@core/types/users/UserPermissions";
import { HandledError } from "@server/services/errors";
import { Users } from "#app/services/users";

export async function validatePermission(
  user: UserDocument,
  key: keyof UserPermissions,
) {
  if (!Users.getPermissions(user.role)[key]) {
    throw new HandledError("validations:errors.wallet.permissionDenied");
  }
}
