import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Http } from "@client/services/http";

export function unlinkAccount(data: {
  provider: UserLinkProvider;
  password: string;
}): Promise<void> {
  return Http.post("/users/unlink-account", data);
}
