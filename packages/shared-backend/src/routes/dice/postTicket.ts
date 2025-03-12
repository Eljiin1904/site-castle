import { Validation } from "@core/services/validation";
import { Dice } from "@server/services/dice";
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
    targetKind: Validation.string()
      .oneOf(Dice.targetKinds, "Invalid target kind.")
      .required("Target kind is required"),
  }),
  callback: async (req, res) => {
    const { targetKind, targetValue, betAmount } = req.body;
    const user = req.user;

    const range = Dice.getTargetMinMax(targetKind);

    if (targetValue < range.min || targetValue > range.max) {
      throw new HandledError("Target value out of range.");
    }

    await Site.validateToggle("diceEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);
    await Site.validateTokenBalance(user, betAmount);

    const profit = Dice.getProfit({ betAmount, targetKind, targetValue });

    if (profit > Dice.maxProfit) {
      throw new HandledError("Exceeds max profit.");
    }

    const location = await Http.getLocation(req.trueIP);

    const ticket = await Dice.createTicket({
      user,
      location,
      targetKind,
      targetValue,
      betAmount,
    });

    ticket.serverSeed = "";

    res.json({ ticket });
  },
});
