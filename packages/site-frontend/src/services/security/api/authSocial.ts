import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Http } from "@client/services/http";

export function authSocial({
  provider,
  search,
}: {
  provider: UserLinkProvider;
  search: string;
}): Promise<
  {
    action: "register" | "login" | "link" | "2fa";
  } & (
    | {
        action: "register";
        emailRequired: boolean;
        linkToken: string;
      }
    | {
        action: "login";
        user: AuthenticatedUser;
      }
    | {
        action: "link";
      }
    | {
        action: "2fa";
        userId: string;
        loginToken: string;
      }
  )
> {
  return Http.post(`/auth/${provider}-callback${search}`);
}
