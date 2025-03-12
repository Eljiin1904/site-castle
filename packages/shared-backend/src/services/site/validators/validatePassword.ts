import { UserDocument } from "@core/types/users/UserDocument";
import { HandledError } from "@server/services/errors";
import bcrypt from "bcrypt";

export async function validatePassword(user: UserDocument, password: string) {
  const isValid = await bcrypt.compare(password, user.passwordHash || "");
  if (!isValid) {
    throw new HandledError("Invalid password.");
  }
}
