import { Intimal } from "#core/services/intimal";
import { ItemRarity } from "#core/types/items/ItemRarity";

export function getRarity(value: number): ItemRarity {
  if (value < Intimal.fromDecimal(1)) return "Common";
  else if (value < Intimal.fromDecimal(10)) return "Uncommon";
  else if (value < Intimal.fromDecimal(50)) return "Rare";
  else if (value < Intimal.fromDecimal(100)) return "Mythical";
  else if (value < Intimal.fromDecimal(500)) return "Legendary";
  else if (value < Intimal.fromDecimal(2500)) return "Ancient";
  else if (value < Intimal.fromDecimal(10000)) return "Exceedingly Rare";
  else return "Immortal";
}
