import { tiers } from "../constants/tiers";

export function getReferralXP(tier: number) {
  if (tier >= tiers.length) {
    throw new Error("Tiers out of range.");
  }
  return tiers[tier].xp;
}
