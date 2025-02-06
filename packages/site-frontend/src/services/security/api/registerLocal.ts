import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function registerLocal(data: {
  username: string;
  email: string;
  password: string;
  captchaToken: string;
  referralCode: string | undefined;
}): Promise<{
  user: AuthenticatedUser;
}> {
  return Http.post("/register/local", data);
}
