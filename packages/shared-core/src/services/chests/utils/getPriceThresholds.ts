import { Intimal } from "#core/services/intimal";
import { ChestPriceRange } from "#core/types/chests/ChestPriceRange";

export function getPriceThresholds(range: ChestPriceRange) {
  switch (range) {
    case "Any Price":
      return {};
    case "0.00 - 10.00":
      return { min: 0, max: Intimal.fromDecimal(10) };
    case "10.00 - 25.00":
      return { min: Intimal.fromDecimal(10), max: Intimal.fromDecimal(25) };
    case "25.00 - 50.00":
      return { min: Intimal.fromDecimal(25), max: Intimal.fromDecimal(50) };
    case "50.00 - 100.00":
      return { min: Intimal.fromDecimal(50), max: Intimal.fromDecimal(100) };
    case "100.00 - 250.00":
      return { min: Intimal.fromDecimal(100), max: Intimal.fromDecimal(250) };
    case "250.00+":
      return { min: Intimal.fromDecimal(250), max: Number.MAX_VALUE };
  }
}
