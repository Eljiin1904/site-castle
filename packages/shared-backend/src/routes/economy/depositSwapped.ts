import { Security } from "@server/services/security";
import { Economy } from "@server/services/economy";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "create-deposit-swapped",
  points: 1,
  durationSeconds: 2,
  errorMessage: "You are creating Swapped deposits too often.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/deposit-swapped",
  restricted: true,
  secure: true,
  transaction: true,
  callback: async (req, res) => {
    const user = req.user;

    await Site.validatePermission(user, "deposit");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    await rateLimiter.consume(req.user._id, 1);

    const ticket = await Economy.getSwappedTicket({ userId: user._id });

    res.json({ url: ticket.url });
  },
});
