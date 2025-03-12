import { Validation } from "@core/services/validation";
import { Limbo } from "@server/services/limbo";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/post-ticket",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    betAmount: Validation.number().integer().min(0).required("Bet amount is required."),
    targetValue: Validation.number().integer().min(0).required("Target value is required."),
  }),
  callback: async (req, res) => {
    const { betAmount, targetValue } = req.body;
    const user = req.user;

    const range = Limbo.getTargetMinMax();

    if (targetValue < range.min || targetValue > range.max) {
      throw new HandledError("Target value out of range.");
    }

    await Site.validateToggle("limboEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);
    await Site.validateTokenBalance(user, betAmount);

    const profit = Limbo.getProfit({ betAmount, targetValue });

    if (profit > Limbo.maxProfit) {
      throw new HandledError("Exceeds max profit.");
    }

    const location = await Http.getLocation(req.ip);

    const ticket = await Limbo.createTicket({
      user,
      location,
      targetValue,
      betAmount,
    });

    ticket.serverSeed = "";

    res.json({ ticket });
  },
});
