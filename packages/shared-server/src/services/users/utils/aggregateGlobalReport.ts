import { subDays } from "date-fns";
import { UserGlobalReport } from "@core/types/users/UserGlobalReport";
import { Database } from "#server/services/database";

export async function aggregateGlobalReport({
  minDate,
  maxDate,
}: {
  minDate: Date;
  maxDate: Date;
}): Promise<UserGlobalReport> {
  const pipeline = createPipeline({ minDate, maxDate });
  const collection = Database.collection("users");
  const cursor = collection.aggregate<UserGlobalReport>(pipeline);
  const results = await cursor.toArray();

  if (results.length === 0) {
    return getDefaultReport();
  } else {
    return results[0];
  }
}

function createPipeline({
  minDate,
  maxDate,
}: {
  minDate: Date;
  maxDate: Date;
}) {
  const pipeline = [
    {
      $match: {
        tags: { $ne: "cheeky" },
      },
    },
    {
      $group: {
        _id: null,
        tokenBalances: {
          $sum: "$tokenBalance",
        },
        vaultBalances: {
          $sum: "$vaultBalance",
        },
        gemBalances: {
          $sum: "$gemBalance",
        },
        holidayBalances: {
          $sum: "$holidayBalance",
        },
        levelCaseBalances: {
          $sum: "$meta.levelCaseBalance",
        },
        commissionBalances: {
          $sum: "$affiliate.commissionBalance",
        },
        totalUsers: {
          $sum: 1,
        },
        newUsers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$registerDate", minDate] },
                  { $lt: ["$registerDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        organicReferrals: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$registerDate", minDate] },
                  { $lt: ["$registerDate", maxDate] },
                  { $eq: ["$referer.kind", "user"] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        sponsoredReferrals: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$registerDate", minDate] },
                  { $lt: ["$registerDate", maxDate] },
                  { $eq: ["$referer.kind", "sponsor"] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        promotionReferrals: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$registerDate", minDate] },
                  { $lt: ["$registerDate", maxDate] },
                  { $eq: ["$referer.kind", "promotion"] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        organicUsers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$registerDate", minDate] },
                  { $lt: ["$registerDate", maxDate] },
                  { $eq: ["$referer.kind", "none"] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        totalChurnedUsers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.lastDepositDate", new Date(0)] },
                  { $lt: ["$meta.lastDepositDate", subDays(maxDate, 30)] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        churnedUsers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.lastDepositDate", subDays(minDate, 30)] },
                  { $lt: ["$meta.lastDepositDate", subDays(maxDate, 30)] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        reactivatedUsers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.reactivateDate", minDate] },
                  { $lt: ["$meta.reactivateDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        activeUsers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.activeDate", minDate] },
                  { $lt: ["$meta.activeDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        activePlayers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.lastBetDate", minDate] },
                  { $lt: ["$meta.lastBetDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        activeDepositPlayers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.lastBetDate", minDate] },
                  { $lt: ["$meta.lastBetDate", maxDate] },
                  { $gt: ["$meta.lastDepositDate", new Date(0)] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        totalDepositors: {
          $sum: {
            $cond: {
              if: { $gt: ["$meta.lastDepositDate", new Date(0)] },
              then: 1,
              else: 0,
            },
          },
        },
        recentDepositors: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.lastDepositDate", minDate] },
                  { $lt: ["$meta.lastDepositDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        newDepositors: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.firstDepositDate", minDate] },
                  { $lt: ["$meta.firstDepositDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        totalWithdrawers: {
          $sum: {
            $cond: {
              if: { $gt: ["$meta.lastWithdrawDate", new Date(0)] },
              then: 1,
              else: 0,
            },
          },
        },
        recentWithdrawers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.lastWithdrawDate", minDate] },
                  { $lt: ["$meta.lastWithdrawDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        newWithdrawers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.firstWithdrawDate", minDate] },
                  { $lt: ["$meta.firstWithdrawDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        f2pWithdrawers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $lt: ["$meta.lastDepositDate", new Date(0)] },
                  { $gt: ["$meta.lastWithdrawDate", minDate] },
                  { $lt: ["$meta.lastWithdrawDate", maxDate] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        churnedWithdrawers: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $gt: ["$meta.lastDepositDate", new Date(0)] },
                  { $lt: ["$meta.lastDepositDate", subDays(maxDate, 30)] },
                  { $gt: ["$meta.lastWithdrawDate", minDate] },
                  { $lt: ["$meta.lastWithdrawDate", maxDate] },
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
      $project: { _id: 0 },
    },
  ];

  return pipeline;
}

function getDefaultReport(): UserGlobalReport {
  return {
    tokenBalances: 0,
    vaultBalances: 0,
    gemBalances: 0,
    holidayBalances: 0,
    commissionBalances: 0,
    levelCaseBalances: 0,
    totalUsers: 0,
    newUsers: 0,
    organicReferrals: 0,
    sponsoredReferrals: 0,
    promotionReferrals: 0,
    organicUsers: 0,
    totalChurnedUsers: 0,
    churnedUsers: 0,
    reactivatedUsers: 0,
    activeUsers: 0,
    activePlayers: 0,
    activeDepositPlayers: 0,
    totalDepositors: 0,
    recentDepositors: 0,
    newDepositors: 0,
    totalWithdrawers: 0,
    recentWithdrawers: 0,
    newWithdrawers: 0,
    f2pWithdrawers: 0,
    churnedWithdrawers: 0,
  };
}
