import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";
import { Database } from "#server/services/database";

export async function aggregateReports({
  affiliateId,
  minDate,
  maxDate,
  sort,
  limit,
  page,
}: {
  affiliateId: string;
  minDate: Date;
  maxDate: Date;
  sort: any;
  limit: number;
  page: number;
}): Promise<AffiliateReportWithMeta[]> {
  const pipeline = createPipeline({
    affiliateId,
    minDate,
    maxDate,
    sort,
    limit,
    page,
  });
  const collection = Database.collection("affiliate-referrals");
  const cursor = collection.aggregate<AffiliateReportWithMeta>(pipeline);
  const reports = await cursor.toArray();

  return reports;
}

function createPipeline({
  affiliateId,
  minDate,
  maxDate,
  sort,
  limit,
  page,
}: {
  affiliateId: string;
  minDate: Date;
  maxDate: Date;
  sort: any;
  limit: number;
  page: number;
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
          {
            $project: {
              _id: 1,
              username: 1,
              role: 1,
              xp: 1,
              avatarId: 1,
              avatarIndex: 1,
              meta: 1,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $addFields: {
        user: {
          $arrayElemAt: ["$user", 0],
        },
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
                },
                {
                  $expr: {
                    $eq: ["$userId", "$$userId"],
                  },
                },
              ],
              timeframe: { $gte: minDate, $lt: maxDate },
            },
          },
          {
            $group: {
              _id: null,
              xp: {
                $sum: "$xp",
              },
              commissionAmount: {
                $sum: "$commissionAmount",
              },
              wagerAmount: {
                $sum: "$wagerAmount",
              },
              depositAmount: {
                $sum: "$depositAmount",
              },
              rewardAmount: {
                $sum: "$rewardAmount",
              },
            },
          },
        ],
        as: "reports",
      },
    },
    {
      $addFields: {
        reports: {
          $arrayElemAt: ["$reports", 0],
        },
      },
    },
    {
      $project: {
        user: {
          id: "$user._id",
          name: "$user.username",
          role: "$user.role",
          xp: "$user.xp",
          avatarId: "$user.avatarId",
          avatarIndex: "$user.avatarIndex",
        },
        referDate: "$timestamp",
        activeDate: "$user.meta.activeDate",
        firstDepositDate: "$user.meta.firstDepositDate",
        lastDepositDate: "$user.meta.lastDepositDate",
        lastBetDate: "$user.meta.lastBetDate",
        referralXp: "$reports.xp",
        commissionAmount: "$reports.commissionAmount",
        wagerAmount: "$reports.wagerAmount",
        depositAmount: "$reports.depositAmount",
        rewardsAmount: "$reports.rewardsAmount",
        removed: "$removed",
        removeDate: "$removeDate",
      },
    },
    {
      $sort: sort,
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ];

  return pipeline;
}
