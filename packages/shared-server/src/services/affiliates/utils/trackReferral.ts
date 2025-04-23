import { UserReferral } from "@core/types/users/UserReferral";
import { BasicUser } from "@core/types/users/BasicUser";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

export async function trackReferral({
  user,
  affiliate,
}: {
  user: UserDocument;
  affiliate: BasicUser;
}) {
  const userId = user._id;
  const affiliateId = affiliate.id;

  // const referral: UserReferral = {
  //   ...affiliate,
  //   timestamp: new Date(),
  // };

  // user.referral = referral;

  // await Database.collection("users").updateOne(
  //   { _id: userId },
  //   { $set: { referral } },
  // );

  // const exists = await Database.exists("affiliate-referrals", {
  //   userId,
  //   affiliateId,
  // });

  // if (exists) {
  //   await Database.collection("affiliate-referrals").updateOne(
  //     {
  //       userId,
  //       affiliateId,
  //     },
  //     {
  //       $unset: { removed: 1, removeDate: 1 },
  //     },
  //   );
  // } else {
  //   await Database.collection("affiliate-referrals").insertOne({
  //     _id: Ids.object(),
  //     timestamp: new Date(),
  //     userId,
  //     affiliateId,
  //   });

  //   await Database.collection("users").updateOne(
  //     { _id: affiliateId },
  //     { $inc: { "affiliate.referralCount": 1 } },
  //   );
  // }
}
