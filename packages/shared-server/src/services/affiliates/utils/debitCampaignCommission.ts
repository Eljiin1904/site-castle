import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";

export async function debitCampaignCommission({
  user,
  campaignId,
  amount,
  location,
}: {
  user: UserDocument;
  campaignId: string;
  amount: number;
  location: UserLocation;
}) {
  await Database.collection("user-campaigns").updateOne(
    { _id: user._id, campaignId: campaignId },
    { $inc: { commissionBalance: -amount } },
  );

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    campaignId,
    kind: "affiliate-campaign-commission-claim",
    amount,
    location,
  });
}
