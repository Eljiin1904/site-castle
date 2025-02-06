import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function authenticatorLogin(data: {
  tfac: string;
  loginToken: string;
}): Promise<{
  user: AuthenticatedUser;
}> {
  return Http.post("/authenticator/login", data);
}
