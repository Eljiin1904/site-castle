import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createAuthRoute({
  type: "post",
  path: "/local",
  strategy: "local",
  captcha: true,
  finalizes: true,
  onFail: async (err, req, res, next) => {
    if (err instanceof HandledError) {
      next(err);
    } else {
      next(new HandledError("Invalid credentials."));
    }
  },
  onSuccess: async (req, res) => {
    const user = await Users.authenticateUser(req, "local");
    res.json({ action: "login", user });
  },
});
