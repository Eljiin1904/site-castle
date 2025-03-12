import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";

export async function validateKycTier(
  user: UserDocument,
  requiredTier: number,
) {
  if (user.kyc.tier < requiredTier) {
    throw new HandledError(
      `You must complete verification tier ${requiredTier}.`,
    );
  }
}
