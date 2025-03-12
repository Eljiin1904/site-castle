import { getTier } from "./getTier";

export function getEffectiveTier({
  xp,
  baseTier,
}: {
  xp: number;
  baseTier: number | undefined;
}) {
  const xpTier = getTier(xp);
  const tier = baseTier ? Math.max(xpTier, baseTier) : xpTier;

  return tier;
}
