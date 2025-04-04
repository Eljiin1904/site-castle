import { addMinutes } from "date-fns";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Security } from "@server/services/security";
import {
  Http,
  UnknownUserError,
  ExistingUserError,
  UserLinkedElsewhereError,
} from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createAuthRoute({
  type: "post",
  path: "/google-callback",
  strategy: "google",
  finalizes: true,
  onFail: async (err, req, res, next) => {
    if (err instanceof UnknownUserError) {
      const { id: googleId, email } = err;
      const linkToken = await Security.createToken({
        kind: "link-google",
        token: Ids.long(),
        expires: addMinutes(Date.now(), 5),
        googleId,
        email,
      });
      res.json({ action: "register", linkToken });
    } else if (err instanceof ExistingUserError) {
      res.json({ action: "link" });
    } else if (err instanceof UserLinkedElsewhereError) {
      res.json({ action: "link-to-other-provider", user: err.userId, linkToken: err.providerId });
    } else if (err instanceof HandledError) {
      next(err);
    } else {
      console.error(err);
      next(new HandledError("errors.invalidCredentials"));
    }
  },
  onSuccess: async (req, res) => {
    const user = await Users.authenticateUser(req, "google");
    res.json({ action: "login", user });
  },
});
