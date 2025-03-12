import { UserDocument } from "@core/types/users/UserDocument";
import { track } from "./track";

export async function newUser(user: UserDocument) {
  return await track().identify(user._id, {
    email: user.email,
    created_at: Math.round(user.registerDate.getTime() / 1000),
    email_verified: user.emailConfirmed,
    username: user.username,
  });
}
