import { differenceInDays } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Affiliates } from "@server/services/affiliates";

export default Http.createApiRoute({
  type: "post",
  path: "/set-pending-referral",
  secure: true,
  body: Validation.object({
    referralCode: Validation.string(),
  }),
  callback: async (req, res, next) => {
    const { referralCode } = req.body;

    if (referralCode) {
      await handleAdd(req.user, referralCode);
    } else {
      await handleRemove(req.user);
    }

    res.json({});
  },
});

async function handleRemove(user: UserDocument) {
  await Database.collection("users").updateOne(
    { _id: user._id },
    {
      $unset: { "meta.pendingReferralCode": true },
    },
  );
}

async function handleAdd(user: UserDocument, referralCode: string) {
  if (user.tags.includes("sponsored")) {
    throw new HandledError("You are not allowed to set a referral code.");
  }

  if (
    user.referral &&
    differenceInDays(Date.now(), user.referral.timestamp) <
      Affiliates.referralLockDays
  ) {
    throw new HandledError(
      `You can change your referral code once every ${Affiliates.referralLockDays} days.`,
    );
  }

  const affiliate = await Database.collection("users").findOne(
    { username: referralCode },
    {
      collation: { locale: "en", strength: 2 },
      projection: { _id: 1, username: 1 },
    },
  );

  if (!affiliate) {
    throw new HandledError("validations:errors.invalidReferralCode");
  }

  if (user._id === affiliate._id) {
    throw new HandledError("You can't refer yourself.");
  }

  await Database.collection("users").updateOne(
    { _id: user._id },
    {
      $set: { "meta.pendingReferralCode": affiliate.username },
    },
  );
}
