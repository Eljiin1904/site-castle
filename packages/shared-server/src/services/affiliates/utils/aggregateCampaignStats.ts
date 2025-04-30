import { subDays } from "date-fns";
import { AffiliateStats } from "@core/types/affiliates/AffiliateStats";
import { Database } from "#server/services/database";

export async function aggregateCampaignStats({
  affiliateId, // campaignId
  minDate,
  maxDate,
}: {
  affiliateId: string;
  minDate: Date;
  maxDate: Date;
}): Promise<AffiliateStats> {
  const pipeline = createPipeline({ affiliateId, minDate, maxDate });
  const collection = Database.collection("affiliate-referrals");
  const cursor = collection.aggregate<AffiliateStats>(pipeline);
  const result = await cursor.toArray();

  if (result.length === 0) {
    return getDefaultReport();
  } else {
    return result[0];
  }
}

function getDefaultReport(): AffiliateStats {
  return {
    referralCount: 0,
    depositorCount: 0,
    activeCount: 0,
    churnedCount: 0,
    ftdCount: 0,
    referralXp: 0,
    commissionAmount: 0,
    commissionBalance: 0,
    wagerAmount: 0,
    depositAmount: 0,
    rewardAmount: 0,
  };
}

function createPipeline({
  affiliateId,
  minDate,
  maxDate,
}: {
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
          {
            $project: {
              _id: 1,
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
      $group: {
        _id: null,
        userIds: {
          $addToSet: "$user._id",
        },
        referralCount: {
          $sum: 1,
        },
        depositorCount: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$user.meta.lastDepositDate", minDate] },
                  { $lt: ["$user.meta.lastDepositDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        activeCount: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$user.meta.lastBetDate", minDate] },
                  { $lt: ["$user.meta.lastBetDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        churnedCount: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  {
                    $gt: ["$user.meta.lastDepositDate", subDays(minDate, 30)],
                  },
                  {
                    $lt: ["$user.meta.lastDepositDate", subDays(maxDate, 30)],
                  },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        ftdCount: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$user.meta.firstDepositDate", minDate] },
                  { $lt: ["$user.meta.firstDepositDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "affiliate-reports",
        let: {
          userIds: "$userIds",
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
                    $in: ["$userId", "$$userIds"],
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
              commissionBalance: {
                $sum: "$commissionBalance",
              },
              wagerAmount: {
                $sum: "$wagerAmount",
              },
              depositAmount: {
                $sum: "$depositAmount",
              },
              uniqueDepositors: {
                $sum: {
                  $cond: {
                    if: {
                      $gt: ["$depositAmount", 0],
                    },
                    then: 1,
                    else: 0,
                  },
                },
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
        _id: 0,
        referralCount: 1,
        depositorCount: 1,
        activeCount: 1,
        churnedCount: 1,
        ftdCount: 1,
        referralXp: "$reports.xp",
        commissionAmount: "$reports.commissionAmount",
        commissionBalance: "$reports.commissionBalance",
        wagerAmount: "$reports.wagerAmount",
        depositAmount: "$reports.depositAmount",
        uniqueDepositors: "$reports.uniqueDepositors",
        rewardAmount: "$reports.rewardAmount",
      },
    },
  ];

  return pipeline;
}
