import { tiers } from "../constants/tiers";

export function getTierInfo(tier: number) {
  if (tier >= tiers.length) {
    throw new Error("Tier out of range.");
  }
  return tiers[tier];
}
