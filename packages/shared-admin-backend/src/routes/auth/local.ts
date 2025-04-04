import { Http } from "#app/services/http";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";

export default Http.createAuthRoute({
  type: "post",
  path: "/local",
  strategy: "local",
  onFail: async (err, req, res, next) => {
    if (err instanceof HandledError) {
      next(err);
    } else {
      next(new HandledError("errors.invalidCredentials"));
    }
  },
  onSuccess: async (req, res) => {
    res.json({ user: Users.getAuthenticatedUser(req.user) });
  },
});
