import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { CustomerIO } from "@server/services/customer-io";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "recover-link",
  points: 5,
  durationSeconds: 5 * 60,
  errorMessage: "Too many recover link requests.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/send-recover-link",
  restricted: true,
  secure: false,
  captcha: true,
  body: Validation.object({
    email: Validation.email(),
  }),
  callback: async (req, res) => {
    const { email } = req.body;

    const user = await Database.collection("users").findOne(
      { email },
      { collation: { locale: "en", strength: 2 } },
    );

    if (!user) {
      throw new HandledError("Email is not registered.");
    }

    await rateLimiter.consume(req.trueIP, 1);

    const location = await Http.getLocation(req.trueIP);

    await CustomerIO.sendRecover(user, Users.getLocationString(location));

    res.json({});
  },
});
