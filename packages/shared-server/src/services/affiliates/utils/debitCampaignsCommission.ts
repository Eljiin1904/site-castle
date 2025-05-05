import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";

export async function debitCampaignsCommission({
  user,
  claim,
  location,
}: {
  user: UserDocument;
  claim: {
    campaignId: string;
    amount: number;
  }[];
  location: UserLocation;
}) {
  const campaigns = await Database.collection("user-campaigns")
    .find({ userId: user._id })
    .toArray();

  if (!campaigns.length) {
    throw new Error("validations:errors.campaign.notFound");
  }

  campaigns.forEach(async (campaign) => {
    const claimCampaign = claim.find((c) => c.campaignId === campaign.campaignId);

    if (claimCampaign) {
      // Update User Affiliate Data
      await Database.collection("users").updateOne(
        { _id: user._id },
        { $inc: { "affiliate.commissionBalance": -claimCampaign.amount } },
      );

      //Update campaigns
      await Database.collection("user-campaigns").updateMany(
        { userId: user._id, campaignId: claimCampaign.campaignId },
        { $inc: { commissionBalance: -claimCampaign.amount } },
      );

      //Update affiliate reports
      let amount = claimCampaign.amount;
      const affiliateReports = await Database.collection("affiliate-reports")
        .find({ affiliateId: campaign._id })
        .sort({ timestamp: -1 })
        .toArray();
      while (amount > 0 && affiliateReports.length > 0) {
        const report = affiliateReports.shift();
        if (!report) break;

        const amountToDeduct = Math.min(amount, report.commissionBalance ?? 0);
        await Database.collection("affiliate-reports").updateMany(
          { _id: report._id },
          { $inc: { commissionBalance: -amountToDeduct } },
        );
        amount -= amountToDeduct;
      }

      await Transactions.createTransaction({
        user,
        autoComplete: true,
        kind: "affiliate-campaign-commission-claim",
        campaignId: claimCampaign.campaignId,
        amount: claimCampaign.amount - amount,
        location,
      });
    }
  });
}
