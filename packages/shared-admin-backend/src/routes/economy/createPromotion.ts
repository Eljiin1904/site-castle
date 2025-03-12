import { Validation } from "@core/services/validation";
import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-promotion",
  body: Validation.object({
    promotionId: Validation.string().required("Promotion ID is required."),
    startDate: Validation.date().required("Start Date is required"),
    endDate: Validation.date()
      .min(Validation.ref("startDate"), "End date must be after start date.")
      .required("End Date is required"),
    maxUses: Validation.integer("Max uses").min(1),
    requiredXP: Validation.integer("XP is required.").min(0),
    requiredWagerAmount: Validation.integer("Wager amount").min(0),
    requiredWagerDays: Validation.integer("Wager days").min(0),
    tokenAmount: Validation.currency("Token amount"),
  }),
  callback: async (req, res) => {
    const {
      promotionId,
      startDate,
      endDate,
      maxUses,
      requiredWagerAmount,
      requiredWagerDays,
      requiredXP,
      tokenAmount,
    } = req.body;
    const admin = req.user;

    const exists = await Database.exists("promotion-codes", {
      _id: promotionId,
    });

    if (exists) {
      throw new HandledError("Promotion ID already exists.");
    }

    const promotion: PromotionCodeDocument = {
      _id: promotionId,
      timestamp: new Date(),
      uses: 0,
      maxUses,
      requiredXP,
      requiredWagerAmount,
      requiredWagerDays,
      tokenAmount,
      startDate,
      endDate,
    };

    await Database.collection("promotion-codes").insertOne(promotion);

    await Admin.log({
      kind: "promotion-code-create",
      admin: Users.getBasicUser(admin),
      promotion,
    });

    res.json({ promotion });
  },
});
