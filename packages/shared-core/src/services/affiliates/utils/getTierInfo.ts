import { tiers } from "../constants/tiers";

export function getTierInfo(tier: number) {
  if (tier >= tiers.length) {
    throw new Error("validations:errors.tiers.outOfRange");
  }
  return tiers[tier];
}
