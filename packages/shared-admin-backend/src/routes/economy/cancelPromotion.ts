import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/cancel-promotion",
  body: Validation.object({
    promotionId: Validation.string().required("Promotion ID is required."),
  }),
  callback: async (req, res) => {
    const { promotionId } = req.body;
    const admin = req.user;

    const promotion = await Database.collection("promotion-codes").findOneAndUpdate(
      { _id: promotionId },
      { $set: { cancelled: true } },
    );

    if (!promotion) {
      throw new HandledError("Promotion not found.");
    }

    await Admin.log({
      kind: "promotion-code-cancel",
      admin: Users.getBasicUser(admin),
      promotionId: promotion._id,
    });

    res.json({});
  },
});
