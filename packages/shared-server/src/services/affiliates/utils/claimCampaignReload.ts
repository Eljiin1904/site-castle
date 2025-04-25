import { addDays, isPast } from "date-fns";
import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";

export async function claimReload({
  user,
  reload,
  location,
}: {
  user: UserDocument;
  reload: AffiliateReloadDocument;
  location: UserLocation;
}) {
  let resetDate = new Date(reload.resetDate);

  while (isPast(resetDate)) {
    resetDate = addDays(resetDate, 1);
  }

  await Database.collection("affiliate-reloads").updateOne(
    {
      _id: reload._id,
    },
    {
      $inc: { claimsAvailable: -1 },
      $set: {
        resetDate,
        lastClaimDate: new Date(),
      },
    },
  );

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "affiliate-reload-claim",
    amount: reload.tokenAmount,
    location,
  });
}
