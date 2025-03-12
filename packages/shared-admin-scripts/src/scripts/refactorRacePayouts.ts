import { BasicRace } from "@core/types/rewards/BasicRace";
import { RewardClaimDocument } from "@core/types/rewards/RewardClaimDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";

interface RacePayoutDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  race: BasicRace;
  rank: number;
  tokenAmount: number;
  claimed?: boolean;
  claimDate?: Date;
}

interface RaceWinData {
  kind: "race-payout-claim";
  payoutId: string;
  raceId: string;
  rank: number;
}

export async function refactorRacePayouts() {
  const payouts = Database.db()
    .collection<RacePayoutDocument>("race-payouts")
    .find(
      {},
      {
        sort: { timestamp: 1 },
      },
    );

  for await (const payout of payouts) {
    const claimId = await Ids.incremental({
      key: "rewardClaimId",
      baseValue: 1e6,
      batchSize: 100,
    });

    const claim: RewardClaimDocument = {
      _id: claimId,
      timestamp: payout.timestamp,
      kind: "race-payout",
      userId: payout.userId,
      tokenAmount: payout.tokenAmount,
      race: payout.race,
      rank: payout.rank,
    };

    if (payout.claimed) {
      claim.claimed = payout.claimed;
      claim.claimDate = payout.claimDate;
    }

    await Database.collection("reward-claims").insertOne(claim);

    if (payout.claimed) {
      const tx = await Database.collection("transactions").findOne({
        kind: "race-payout-claim" as any,
        payoutId: payout._id,
      });

      if (!tx) {
        throw new Error("Tx not found");
      }

      await Database.collection("transactions").updateOne(
        {
          _id: tx._id,
        },
        {
          $set: {
            category: "rewards",
            kind: "reward-claim",
            claimId,
            claimKind: "race-payout",
          },
          $unset: {
            payoutId: 1,
            raceId: 1,
            rank: 1,
          },
        },
      );
    }
  }
}
