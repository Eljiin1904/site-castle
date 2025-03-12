import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Dates } from "@core/services/dates";
import { Economy } from "@server/services/economy";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/redeem-gift-card",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    cardId: Validation.string().required("Gift card code is required."),
  }),
  callback: async (req, res) => {
    const { cardId } = req.body;
    const user = req.user;

    await Site.validatePermission(user, "deposit");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    const card = await Database.collection("gift-cards").findOne({
      _id: cardId,
    });

    if (!card) {
      throw new HandledError("Invalid gift card code.");
    }
    if (card.used) {
      throw new HandledError(`Gift card already redeemed ${Dates.toFullDateString(card.useDate)}.`);
    }

    const location = await Http.getLocation(req.trueIP);
    const transaction = await Economy.redeemGiftCard({ card, user, location });

    res.json({
      transactionId: transaction._id,
      tokenAmount: card.tokenAmount,
      ftd: !user.meta.lastDepositDate,
    });
  },
});
