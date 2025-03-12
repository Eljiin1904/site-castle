import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/verify-tier-1-part-3",
  restricted: true,
  secure: true,
  body: Validation.object({
    occupation: Validation.string().max(32).required("Occupation is required."),
  }),
  callback: async (req, res, next) => {
    const { occupation } = req.body;
    const user = req.user;

    if (user.kyc.tier > 0.2) {
      throw new HandledError("You already passed this verification tier.");
    }
    if (user.kyc.tier < 0.2) {
      throw new HandledError("You need to restart this verification tier.");
    }

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "kyc.tier": 1,
          "kyc.occupation": occupation,
        },
      },
    );

    res.json({});
  },
});
