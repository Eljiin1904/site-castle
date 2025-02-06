import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function authSession(): Promise<{
  authenticated: boolean;
  user: AuthenticatedUser;
}> {
  return Http.post("/auth/session");
}
