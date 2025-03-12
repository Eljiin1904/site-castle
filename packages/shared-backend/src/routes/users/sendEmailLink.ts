import { CustomerIO } from "@server/services/customer-io";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "email-confirm-link",
  points: 5,
  durationSeconds: 5 * 60,
  errorMessage: "Too many confirm link requests.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/send-email-link",
  restricted: true,
  secure: true,
  callback: async (req, res) => {
    const user = req.user;

    await rateLimiter.consume(req.user._id, 1);

    await CustomerIO.sendEmailConfirm(user);

    res.json({});
  },
});
