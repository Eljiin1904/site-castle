import { RewardClaimKindData } from "@core/types/rewards/RewardClaimKind";
import { RewardClaimDocument } from "@core/types/rewards/RewardClaimDocument";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";

type CreateOptions = RewardClaimKindData & {
  userId: string;
  tokenAmount: number;
};

export async function createClaim(options: CreateOptions) {
  const claimId = await Ids.incremental({
    key: "rewardClaimId",
    baseValue: 1e6,
    batchSize: 100,
  });

  const claim: RewardClaimDocument = {
    _id: claimId,
    timestamp: new Date(),
    ...options,
  };

  await Database.collection("reward-claims").insertOne(claim);

  return claim;
}
