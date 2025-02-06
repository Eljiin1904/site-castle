import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function authLocal(data: {
  username: string;
  password: string;
  captchaToken: string;
}): Promise<
  {
    action: "register" | "login" | "link" | "2fa";
  } & (
    | {
        action: "login";
        user: AuthenticatedUser;
      }
    | {
        action: "2fa";
        userId: string;
        loginToken: string;
      }
  )
> {
  return Http.post("/auth/local", data);
}
