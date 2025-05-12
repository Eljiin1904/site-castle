import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
// import { Double } from "@server/services/double";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Crash } from "@server/services/crash";

export default Http.createApiRoute({
  type: "post",
  path: "/post-ticket",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    roundId: Validation.string().required("validations:errors.games.double.requiredRound"),
    betAmount: Validation.currency("Bet amount"),
  }),
  callback: async (req, res) => {
    const logger = getServerLogger({});
    logger.debug("creating Crash ticket");
    const { roundId, betAmount } = req.body;
    const user = req.user;

    await Site.validateToggle("crashEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);
    await Site.validateTokenBalance(user, betAmount);

    const round = await Database.collection("crash-rounds").findOne({
      _id: roundId,
    });

    if (!round) {
      throw new HandledError("validations:errors.games.crash.invalidRoundId");
    }
    if (round.status !== "waiting") {
      throw new HandledError("validations:errors.games.crash.invalidRoundStatus");
    }

    const existing = await Database.exists("crash-tickets", {
      roundId: round._id,
      "user.id": user._id,
    });

    if (existing) {
      throw new HandledError("validations:errors.games.crash.invalidCombination");
    }

    const location = await Http.getLocation(req.trueIP);

    const ticket = await Crash.createTicket({
      user,
      location,
      round,
      betAmount
    });

    res.json(ticket);
  },
});
