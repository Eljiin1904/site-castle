import { HandledError } from "@server/services/errors";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Users } from "@server/services/users";
import { AuthenticatedRequest } from "#app/types/http/AuthenticatedRequest";
import { logoutUser } from "./logoutUser";
import { trackAction } from "./trackAction";

export async function authenticateUser(
  req: AuthenticatedRequest,
  strategy: "local" | UserLinkProvider,
) {
  const user = req.user;

  if (Users.isBanned(user.ban)) {
    await logoutUser(req);
    const e = new HandledError(`errors.banned`);
    e.cause = user.ban.reason;
    throw e;
  }

  await trackAction({
    user,
    kind: "login",
    ip: req.trueIP,
    strategy,
  });

  return Users.getAuthenticatedUser(user);
}
