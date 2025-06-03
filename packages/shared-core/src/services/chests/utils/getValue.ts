import { Intimal } from "#core/services/intimal";
import { ChestItem } from "#core/types/chests/ChestItem";

export function getValue({ edgeRate, items }: { edgeRate: number; items: ChestItem[] }) {
  const estimatedValue = items.reduce(
    (acc, x) => (acc += x.lootValue * Intimal.toDecimal(x.dropRate, 6)),
    0,
  );
  const openCost = estimatedValue / (1 - edgeRate);

  return { estimatedValue, openCost };
}
