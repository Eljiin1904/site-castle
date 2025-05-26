import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Site } from "#server/services/site";

export async function getXpRate(category: TransactionCategory) {
  const settings = await Site.settings.cache();

  switch (category) {
    case "cases":
      return settings.casesXpRate;
    case "case-battles":
      return settings.caseBattlesXpRate;
    case "double":
      return settings.doubleXpRate;
    case "crash":
      return settings.crashXpRate;  
    case "dice":
      return settings.diceXpRate;
    case "limbo":
      return settings.limboXpRate;
    case "mines":
      return settings.minesXpRate;
    default:
      throw new Error(`Invalid category, getXpRate: ${category}`);
  }
}
