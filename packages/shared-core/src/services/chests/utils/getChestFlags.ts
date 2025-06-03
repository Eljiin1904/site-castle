import { Intimal } from "#core/services/intimal";
import { ChestItem } from "#core/types/chests/ChestItem";

export function getChestFlags({
  settings,
  openCost,
  chestItem,
}: {
  settings: { minAnnounceAmount: number; minAnnounceMultiplier: number };
  openCost: number;
  chestItem: ChestItem;
}) {
  const { minAnnounceAmount, minAnnounceMultiplier } = settings;

  const { lootValue } = chestItem;
  const multiplier = lootValue / openCost;

  const minAmount = Intimal.fromDecimal(minAnnounceAmount);

  const announce =
    lootValue >= minAmount && multiplier >= minAnnounceMultiplier;
  const jackpot = multiplier >= minAnnounceMultiplier;
  const special = multiplier >= minAnnounceMultiplier;

  return {
    announce,
    jackpot,
    special,
  };
}
