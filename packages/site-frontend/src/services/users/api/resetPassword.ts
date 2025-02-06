import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function resetPassword(data: {
  newPassword: string;
  recoverToken: string;
}): Promise<{
  user: AuthenticatedUser;
}> {
  return Http.post("/users/reset-password", data);
}
