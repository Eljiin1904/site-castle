import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";

export async function debitCampaignsCommission({
  user,
  amount,
  location,
}: {
  user: UserDocument;
  amount: number;
  location: UserLocation;
}) {
  
  //Update campaigns
  await Database.collection("user-campaigns").updateMany(
    { userId: user._id },
    { $set: { commissionBalance: 0 } },
  );
 
  //Update affiliate reports
  const campaigns = await Database.collection("user-campaigns")
    .find({ userId: user._id })
    .toArray();
  
    if (campaigns.length) {
    const campaignIds = campaigns.map((campaign) => campaign._id);
    await Database.collection("affiliate-reports").updateMany(
      { affiliateId: { $in: campaignIds } },
      { $set: { commissionBalance: 0 } },
    );
  }

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "affiliate-commission-claim",
    amount,
    location,
  });
}
