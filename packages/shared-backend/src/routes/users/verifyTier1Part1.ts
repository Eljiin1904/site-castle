import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/verify-tier-1-part-1",
  restricted: true,
  secure: true,
  body: Validation.object({
    firstName: Validation.string().max(32).required("First name is required."),
    lastName: Validation.string().max(32).required("Last name is required."),
    dob: Validation.dob(),
  }),
  callback: async (req, res) => {
    const { firstName, lastName, dob } = req.body;
    const user = req.user;

    if (user.kyc.tier > 0) {
      throw new HandledError("You already passed this verification tier.");
    }

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "kyc.tier": 0.1,
          "kyc.firstName": firstName,
          "kyc.lastName": lastName,
          "kyc.dob": dob,
        },
      },
    );

    res.json({});
  },
});
