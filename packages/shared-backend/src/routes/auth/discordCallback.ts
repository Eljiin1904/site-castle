import { addMinutes } from "date-fns";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Security } from "@server/services/security";
import { Http, UnknownUserError, ExistingUserError } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createAuthRoute({
  type: "post",
  path: "/discord-callback",
  strategy: "discord",
  finalizes: true,
  onFail: async (err, req, res) => {
    if (err instanceof UnknownUserError) {
      const { id: discordId, email } = err;
      const linkToken = await Security.createToken({
        kind: "link-discord",
        token: Ids.long(),
        expires: addMinutes(Date.now(), 5),
        discordId,
        email,
      });
      res.json({ action: "register", linkToken });
    } else if (err instanceof ExistingUserError) {
      res.json({ action: "link" });
    } else if (err instanceof HandledError) {
      throw err;
    } else {
      console.error(err);
      throw new HandledError("errors.invalidCredentials");
    }
  },
  onSuccess: async (req, res) => {
    const user = await Users.authenticateUser(req, "discord");
    res.json({ action: "login", user });
  },
});
