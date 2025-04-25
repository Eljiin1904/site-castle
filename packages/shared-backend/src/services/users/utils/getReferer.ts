import { UserReferer } from "@core/types/users/UserReferer";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";

export async function getReferer({
  referralCode,
}: {
  referralCode: string | undefined;
}): Promise<UserReferer> {
  if (!referralCode) {
    return { kind: "none" };
  } else if (referralCode.startsWith("p_")) {
    const referer = referralCode.substring(2);
    return {
      kind: "promotion",
      id: referer,
    };
  } else {
    const affiliate = await Database.collection("user-campaigns").findOne({
      campaignId: referralCode,
    });

    if (!affiliate) {
      throw new HandledError("validations:errors.invalidReferralCode");
    }

    const user = await Database.collection("users").findOne({ _id: affiliate.userId });
    if (!user) {
      throw new HandledError("validations:errors.users.notFound");
    }

    return {
      kind: "campaign",
      id: affiliate._id,
    };
  }
  //  else {
  //   const affiliate = await Database.collection("users").findOne(
  //     { username: referralCode },
  //     {
  //       collation: { locale: "en", strength: 2 },
  //     },
  //   );
  //   if (!affiliate) {
  //     throw new HandledError("validations:errors.invalidReferralCode");
  //   }
  //   return {
  //     kind: affiliate.tags.includes("sponsored") ? "sponsored" : "user",
  //     user: Users.getBasicUser(affiliate),
  //   };
  // }
}
