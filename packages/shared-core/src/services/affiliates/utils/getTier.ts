import { tiers } from "../constants/tiers";

export function getTier(xp: number) {
  for (let i = 0; i < tiers.length; i++) {
    if (xp < tiers[i].xp) {
      return i - 1;
    }
  }
  return tiers.length - 1;
}
