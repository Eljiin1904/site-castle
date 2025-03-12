import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Double } from "@server/services/double";
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
    roundId: Validation.string().required("Round is required."),
    betKind: Validation.string()
      .oneOf(Double.betKinds, "Invalid bet kind.")
      .required("Bet kind is required."),
    betAmount: Validation.currency("Bet amount"),
  }),
  callback: async (req, res) => {
    const { roundId, betKind, betAmount } = req.body;
    const user = req.user;

    if (betAmount > Double.getMaxBetAmount(betKind)) {
      throw new HandledError("The bet amount is greater than the max.");
    }

    await Site.validateToggle("doubleEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);
    await Site.validateTokenBalance(user, betAmount);

    const round = await Database.collection("double-rounds").findOne({
      _id: roundId,
    });

    if (!round) {
      throw new HandledError("Invalid round id.");
    }
    if (round.status !== "waiting") {
      throw new HandledError("Invalid round status.");
    }

    const matches = [betKind];

    if (betKind === "red") {
      matches.push("black");
    } else if (betKind === "black") {
      matches.push("red");
    }

    const existing = await Database.exists("double-tickets", {
      roundId: round._id,
      "user.id": user._id,
      betKind: { $in: matches },
    });

    if (existing) {
      throw new HandledError("Invalid bet combination.");
    }

    const location = await Http.getLocation(req.trueIP);

    const ticket = await Double.createTicket({
      user,
      location,
      round,
      betAmount,
      betKind,
    });

    res.json(ticket);
  },
});
