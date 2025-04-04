import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Http } from "@client/services/http";
import { UserDocument } from "@core/types/users/UserDocument";

export function authSocial({
  provider,
  search,
}: {
  provider: UserLinkProvider;
  search: string;
}): Promise<
  {
    action: "register" | "login" | "link" | "link-to-other-provider" | "2fa";
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
        action: "link-to-other-provider";
        userId: string;
        providerId: string;
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
