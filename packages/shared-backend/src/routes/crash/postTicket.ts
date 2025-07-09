import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Crash } from "@server/services/crash";

/**
 * This route is used to post a ticket for the Crash game.
 * It validates the request body, checks the user's balance, and creates a ticket for the specified round.
 * If the round is not in a valid state, it throws an error.
 * If the user has already posted a ticket for the round, it does not create a new ticket.
 * If the nextRound flag is set, it checks if the user has already posted a ticket for the next round and creates a ticket for the next round if not.
 * 
 * @param {Object} req - The request object containing the body with roundId, betAmount, targetMultiplier, and nextRound.
 * @param {Object} req.body - The body of the request containing the necessary parameters.
 * @param {string} req.body.roundId - The ID of the current round. 
 * @param {number} req.body.betAmount - The amount of the bet.
 * @param {string} [req.body.betToken] - The token used for the bet, if applicable.
 * @param {number} [req.body.targetMultiplier] - The target multiplier for the bet, if applicable.
 * @param {boolean} [req.body.nextRound=false] - A flag indicating if the ticket is for the next round.
 * If the nextRound flag is set, it will check the current round state. If the current state is "waiting" or "pending",
 * it will create a ticket for the current round instead of the next.
 * 
 * @param {Object} res - The response object to send the created ticket or an error.
 * @returns {Promise<void>} - A promise that resolves when the ticket is created and sent in the response.
 */
export default Http.createApiRoute({
  type: "post",
  path: "/post-ticket",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    roundId: Validation.string().required("validations:errors.games.crash.requiredRound"),
    betAmount: Validation.number().integer().min(0).required("validations:errors.games.double.invalidAmount"),
    betToken: Validation.string().optional(),
    targetMultiplier: Validation.number().optional(),
    nextRound: Validation.boolean().optional().default(false),
  }),
  callback: async (req, res) => {
    const logger = getServerLogger({});
    logger.debug("creating Crash ticket");
    const { roundId, betAmount, targetMultiplier, nextRound } = req.body;
    const user = req.user;

    await Site.validateToggle("crashEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);
    await Site.validateTokenBalance(user, betAmount);

    const location = await Http.getLocation(req.trueIP);

    const round = await Database.collection("crash-rounds").findOne({
      _id: roundId,
    });
    
    //Check if there is a round running for the given roundId
    if (!round) {
      throw new HandledError("validations:errors.games.crash.invalidRoundId");
    }

    // If nextRound is true, check if the round is in a valid state for next round ticket creation.
    if(nextRound) {

      const existing = await Database.exists("crash-next-tickets", {
        "user.id": user._id,
      });
      
      // If there is already a ticket for the next round, do not create a new one.
      if(existing)
        return;

      //Create a ticket for the next round if the current round doesnt allow new tickets.
      // If the round is not in a valid state for next round ticket creation, create a ticket for the current round instead.
      if(round.status !== "waiting"  && round.status !== "pending") {

        const ticket = await Crash.createNextRoundTicket({
          user,
          location,
          betAmount,
          targetMultiplier
        });
    
        res.json(ticket);
        return;
      }
    }

    // If nextRound is false check if the round is in a valid state for ticket creation.
    if (round.status !== "waiting" && round.status !== "pending") {
      throw new HandledError("validations:errors.games.crash.invalidRoundStatus");
    }

    const existing = await Database.exists("crash-tickets", {
      roundId: round._id,
      "user.id": user._id,
    });

    // If there is already a ticket for the current round, do not create a new one.
    if (existing) {
      return;
    }

    const ticket = await Crash.createTicket({
      user,
      location,
      round,
      betAmount,
      targetMultiplier
    });

    res.json(ticket);
  },
});
