import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function startSession(): Promise<{
  authenticated: boolean;
  user: AuthenticatedUser;
  regionCode: string;
  regionBlocked: boolean;
}> {
  return Http.post("/system/start-session");
}
