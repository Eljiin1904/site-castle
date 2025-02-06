import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function updateSettings(data: {
  login2fa: boolean;
  bet2fa: boolean;
  withdraw2fa: boolean;
  tfac: string;
}): Promise<{
  user: AuthenticatedUser;
}> {
  return Http.post("/authenticator/update-settings", data);
}
