import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Site } from "#server/services/site";
import { TransactionKindData } from "@core/types/transactions/TransactionKind";
import { Blackjack } from "@core/services/blackjack";

export async function getXpRate({
  category,
  data,
  edgeRate,
}: {
  category: TransactionCategory;
  data: TransactionKindData;
  edgeRate: number;
}) {
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
    case "blackjack": {
      const betKind = data.kind;
      const subKind = data.kind === "blackjack-sidebet-bet" ? data.subKind : undefined;

      const baseXpMultiplier = Blackjack.getBaseXpMultiplier({
        betKind,
        subKind,
        edgeRate,
      });

      return edgeRate * baseXpMultiplier * settings.blackjackXpRate;
    }
    default:
      throw new Error(`Invalid category, getXpRate: ${category}`);
  }
}
