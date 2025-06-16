import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

/**
 * This route is used to cancel a Crash ticket for the user.
 * It checks if the user has a ticket for the next round and removes it from the database.
 * If the user does not have a ticket for the next round, it does nothing.
 * 
 * @param {Object} req - The request object containing the user information.
 * @param {Object} req.user - The user object containing the user's ID and other information.
 * @param {string} req.user._id - The ID of the user.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves when the ticket is canceled and sent in the response.
 */
export default Http.createApiRoute({
  type: "post",
  path: "/cancel-ticket",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  callback: async (req, res) => {
    const logger = getServerLogger({});
    logger.debug("Cancel Crash ticket");
    
    const user = req.user;

    await Site.validateToggle("crashEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    const ticket = await Database.exists("crash-next-tickets", {
      "user.id": user._id
    });
    
    if(!ticket)
      return;

    // Remove the ticket from the database
    await Database.collection("crash-next-tickets").deleteOne({
      "user.id": user._id
    });

    res.json(ticket);
  },
});
