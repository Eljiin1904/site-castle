import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";
import { Database } from "#server/services/database";

export async function countCampaignReports({
  userId,
  affiliateId,
  minDate,
  maxDate,
}: {
  userId: string;
  affiliateId: string;
  minDate: Date;
  maxDate: Date;
}): Promise<number> {
  const pipeline = createPipeline({
    userId,
    affiliateId,
    minDate,
    maxDate,
  });
  const collection = Database.collection("affiliate-referrals");
  const cursor = collection.aggregate<AffiliateReportWithMeta>(pipeline);
  return (await cursor.toArray()).length;
}

function createPipeline({
  affiliateId,
  minDate,
  maxDate
}: {
  userId: string;
  affiliateId: string;
  minDate: Date;
  maxDate: Date;
}) {
  const pipeline = [
    {
      $match: {
        affiliateId,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$userId"] },
            },
          },
        ],
        as: "user",
      },
    },
    {
      $lookup: {
        from: "affiliate-reports",
        let: {
          userId: "$userId",
        },
        pipeline: [
          {
            $match: {
              $and: [
                {
                  $expr: {
                    $eq: ["$affiliateId", affiliateId],
                  },
                }
              ],
              timeframe: { $gte: minDate, $lt: maxDate },
            },
          }
        ],
        as: "reports",
      },
    }
  ];

  return pipeline;
}
