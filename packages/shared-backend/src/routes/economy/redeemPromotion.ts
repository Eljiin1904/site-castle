import { isFuture, isPast } from "date-fns";
import { Validation } from "@core/services/validation";
import { Intimal } from "@core/services/intimal";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Economy } from "@server/services/economy";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/redeem-promotion",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    promotionId: Validation.string().required("Promotion code is required."),
  }),
  callback: async (req, res) => {
    const { promotionId } = req.body;
    const user = req.user;

    await Site.validatePermission(user, "usePromotions");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    if (
      Intimal.toDecimal(user.stats.depositAmount || 0) < 10 &&
      user.kyc.tier < 2 &&
      Users.getLevel(user.xp) < 15
    ) {
      await Site.validateVpn(req.trueIP, "You are unable to redeem promotions while on a VPN.");
    }

    const promotion = await Database.collection("promotion-codes").findOne({
      _id: promotionId,
    });

    if (!promotion) {
      throw new HandledError("Invalid promotion code.");
    }

    await Site.validateLevel(user, Users.getLevel(promotion.requiredXP));
    await Site.validateWagerAmount(
      user,
      promotion.requiredWagerAmount,
      promotion.requiredWagerDays,
    );

    if (promotion.cancelled) {
      throw new HandledError("Promotion is no longer available.");
    }
    if (user.xp < promotion.requiredXP) {
      throw new HandledError("Promotion requires a higher level to claim.");
    }
    if (isFuture(promotion.startDate)) {
      throw new HandledError("Promotion has not started.");
    }
    if (isPast(promotion.endDate)) {
      throw new HandledError("Promotion has already ended.");
    }
    if (promotion.uses === promotion.maxUses) {
      throw new HandledError("Promotion has already completed.");
    }

    const existsWithUserId = await Database.exists("promotion-tickets", {
      promotionId,
      userId: user._id,
    });

    if (existsWithUserId) {
      throw new HandledError("You already claimed that promotion.");
    }

    const existsWithIP = await Database.exists("promotion-tickets", {
      promotionId,
      ip: req.trueIP,
    });

    if (existsWithIP) {
      throw new HandledError("Promotion already claimed by this IP.");
    }

    const location = await Http.getLocation(req.trueIP);
    const { tokenAmount } = await Economy.redeemPromotion({
      promotion,
      user,
      location,
    });

    res.json({ tokenAmount });
  },
});
