import type { RewardProductKind } from "#core/types/rewards/RewardProductKind";

const kindMap: Record<RewardProductKind, boolean> = {
  case: true,
  tokens: true,
};

export const productKinds = Object.keys(kindMap) as RewardProductKind[];
