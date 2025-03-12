import { authenticator } from "otplib";
import { HandledError } from "@server/services/errors";
import { UserDocument } from "@core/types/users/UserDocument";

export async function validateAuthenticatorCode({
  user,
  tfac,
  requireEnabled = true,
}: {
  user: UserDocument;
  tfac: string;
  requireEnabled?: boolean;
}) {
  if (requireEnabled && !user.tfa.enabled) {
    throw new HandledError("Authenticator not enabled.");
  }

  if (!user.tfa.secret) {
    throw new HandledError("Authenticator not setup.");
  }

  const isValid = authenticator.check(tfac, user.tfa.secret);

  if (!isValid) {
    throw new HandledError("Invalid authenticator code.");
  }
}
