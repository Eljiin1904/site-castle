import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Affiliates } from "@server/services/affiliates";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-referral",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    referralCode: Validation.string(),
  }),
  callback: async (req, res) => {
    const { userId, referralCode } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOne({ _id: userId });

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    const oldReferral = user.referral;

    let affiliate;
    let newReferral;

    if (referralCode) {
      affiliate = await Database.collection("users").findOne(
        { username: referralCode },
        { collation: { locale: "en", strength: 2 } },
      );

      if (!affiliate) {
        throw new HandledError("Referral user not found.");
      }
    }

    if (affiliate?._id === oldReferral?.id) {
      throw new HandledError("User already has that referral.");
    }

    if (oldReferral) {
      await Affiliates.untrackReferral({
        userId: user._id,
        affiliateId: oldReferral.id,
      });
    }

    if (affiliate) {
      await Affiliates.trackReferral({
        user,
        affiliate: Users.getBasicUser(affiliate),
      });
    }

    await Admin.log({
      kind: "user-referral",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      oldReferral,
      newReferral,
    });

    res.json({});
  },
});
