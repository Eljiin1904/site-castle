import { RewardClaimKindData } from "./RewardClaimKind";

export type RewardClaimDocument = {
  _id: string;
  timestamp: Date;
  userId: string;
  tokenAmount: number;
  claimed?: boolean;
  claimDate?: Date;
} & RewardClaimKindData;
