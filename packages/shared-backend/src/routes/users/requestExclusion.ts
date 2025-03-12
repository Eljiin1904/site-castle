import { CustomerIO } from "@server/services/customer-io";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "request-exclusion",
  points: 5,
  durationSeconds: 5 * 60,
  errorMessage: "Too many exclusion requests.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/request-exclusion",
  restricted: true,
  secure: true,
  callback: async (req, res) => {
    const user = req.user;

    if (Users.isSuspended(user.suspension)) {
      throw new HandledError("You are already excluded.");
    }

    await rateLimiter.consume(req.user._id, 1);

    await CustomerIO.sendExclusionConfirm(user);

    res.json({});
  },
});
