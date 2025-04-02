import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Chests } from "@core/services/chests";
import { Double } from "@core/services/double";
import { Limbo } from "@core/services/limbo";
import { Dice } from "@core/services/dice";
import { Mines } from "@core/services/mines";

export function getEdgeRate(category: TransactionCategory) {
  switch (category) {
    case "cases":
      return Chests.edgeRate;
    case "case-battles":
      return Chests.edgeRate;
    case "double":
      return Double.edgeRate;
    case "dice":
      return Dice.edgeRate;
    case "limbo":
      return Limbo.edgeRate;
    case "mines":
      return Mines.edgeRate;
    default:
      throw new Error(`Invalid category, getEdgeRate: ${category}`);
  }
}
