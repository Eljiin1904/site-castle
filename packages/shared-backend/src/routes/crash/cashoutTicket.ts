import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { Crash } from "@core/services/crash";

/**
 * Cashes out a Crash ticket. Check if the ticket is valid and if the multiplier key is correct for the
 * time of the round. If the ticket is valid, it updates the ticket with the multiplier information.
 * If the ticket is invalid, it marks the ticket as processed and cashoutTriggered for prevention of
 * double attempts.
 * Validation steps:
 * 1. Basic validations (toggle, confirmed, suspension, token balance)
 * 2. Round validations (exists, status, started)
 * 3. Ticket validations (exists, in round,  processed, cashoutTriggered)
 * 4. Multiplier event validations (exists, timestamp)
 * 5. Latency validations (between server and client, between multiplier event and round start)
 * 6. Location validation (missing)
 * @param {string} roundId - The ID of the round.
 * @param {number} betAmount - The amount to bet.
 * @param {string} multiplierKey - The key of the multiplier.
 * @param {object} req - The request object.
 */
export default Http.createApiRoute({
  type: "post",
  path: "/cashout-ticket",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    roundId: Validation.string().required("validations:errors.games.crash.requiredRound"),
    betAmount: Validation.currency("Bet amount")
  }),
  callback: async (req, res) => {
    
    //Log the request for debugging
    const logger = getServerLogger({});
    logger.debug("cashing Crash ticket");

    const { roundId, betAmount } = req.body;
    const user = req.user;

    //Default crash game validations
    await Site.validateToggle("crashEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);
    await Site.validateTokenBalance(user, betAmount);

    //Round and Ticket Validations.
    const round = await Database.collection("crash-rounds").findOne({
      _id: roundId,
    });
    const roundMultiplier = await Database.collection("crash-multipliers").findOne({
      roundId: round?._id,
    });
    //Check if the round exists
    if (!round || !roundMultiplier) 
      throw new HandledError("validations:errors.games.crash.invalidRoundId");

    const ticket = await Database.collection("crash-tickets").findOne({
      roundId: round._id,
      "user.id": user._id
    });
    //Check if the ticket exists
    if (!ticket) {
      throw new HandledError("validations:errors.games.crash.invalidCombination");
    }

    //Check if round is in a valid state. If the round is in simulation mode is valid. If round 
    //is completed, check that is inside the 1s delay window.
  
    if (round.status !== "simulating" && round.status !== "completed")
      throw new HandledError("validations:errors.games.crash.invalidRoundStatus");

    //Check the round was started
    if(!round.startDate)
      throw new HandledError("validations:errors.games.crash.invalidRoundStartDate");

    //Calculate the time since the round started from the server perspective and get the multiplier for cashout
    //Substract 1 second to the current time to account for the 1 second delay in the client.
    const currentTimerForRound = Date.now() - roundMultiplier.timestamp.getTime() - (Crash.roundTimes.delay + 300);
    const ticketMultiplierCashout = Crash.getMultiplierForTime(currentTimerForRound);
    const truncatedMultiplier = Math.trunc(ticketMultiplierCashout * 100) / 100;

    //If the round is completed, mutiplierCashout should be less than the round multiplier and
    // the time since the round ended should be less than 1 second
    if(round.status === "completed") {

      if(ticketMultiplierCashout > round.multiplier) {
        invalidateTicket(ticket);
        throw new HandledError("validations:errors.games.crash.invalidMultiplier");
      }

      const endedTime = (round.completedDate ?? round.statusDate).getTime();
      if(Date.now() - endedTime > Crash.roundTimes.delay) {
        invalidateTicket(ticket);
        throw new HandledError("validations:errors.games.crash.invalidEndTime");
      }
    }

    //Ticket Validations, Check if the ticket exists and is in a valid state. 
    //Ticket and multiplier key should be in the same round and not processed or previously cashed out
    //Check the latency between the server and client is an aceptable value for the ticket and the multiplier event    
    if(ticket.processed || ticket.cashoutTriggered) {
      throw new HandledError("validations:errors.games.crash.ticketAlreadyProcessed");
    }
   
    // Verify Location (Missing)
    const location = await Http.getLocation(req.trueIP);    
  
    //If everything looks ok. Update the ticket with the multiplier information and mark it as cashed out
    await Database.collection("crash-tickets").updateOne(
      { _id: ticket._id },
      {
        $set: {
          cashoutTriggered: true,
          cashoutTriggeredDate: new Date(),
          multiplierCrashed: truncatedMultiplier,
          location,
        },
      }
    );

    res.json(ticket);
  },
});


//** Invalidate a Round ticket, mark it as processed and cashoutTriggerred */
async function invalidateTicket(ticket: CrashTicketDocument) {
  
  const invalidateDate = new Date();
  await Database.collection("crash-tickets").updateOne(
    { _id: ticket._id },
    {
      $set: {
        processed: true,
        processedDate: invalidateDate,
        cashoutTriggered: true,
        cashoutTriggeredDate: invalidateDate,
        multiplierCrashed: 1
      }
    }
  );

  //Create a transaction for the system
};
