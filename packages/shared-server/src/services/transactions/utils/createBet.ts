import { TransactionBetData } from "@core/types/transactions/TransactionBetData";
import { TransactionKindData } from "@core/types/transactions/TransactionKind";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { UnionSafeOmit } from "@core/types/utility/UnionSafeOmit";
import { Transactions } from "@core/services/transactions";
import { Site } from "#server/services/site";
import { getEdgeRate } from "../helpers/getEdgeRate";
import { getXpRate } from "../helpers/getXpRate";
import { getCommission } from "../helpers/getCommission";
import { createTransaction } from "./createTransaction";

type BetKind = Extract<TransactionKindData, { bet: TransactionBetData }>["kind"];
type BetData = UnionSafeOmit<TransactionKindData, "bet">;

export async function createBet({
  user,
  location,
  betAmount,
  ...data
}: {
  user: UserDocument;
  location: UserLocation;
  kind: BetKind;
  betAmount: number;
} & BetData) {
  const { rainTaxRate, gemRate } = await Site.settings.cache();
  const category = Transactions.getCategory(data.kind);
  const edge = getEdgeRate(category);
  const ev = Math.round(betAmount * edge);

  const rainAmount = Math.round(ev * rainTaxRate);

  const commission = await getCommission({
    bettor: user,
    value: Math.round(ev * 0.5),
  });

  const xpRate = await getXpRate(category);
  const xp = Math.round(betAmount * xpRate);

  const gems = Math.round(xp / gemRate);

  const bet: TransactionBetData = {
    location,
    edge,
    ev,
    rainRate: rainTaxRate,
    rainAmount,
    ...commission,
    gemRate,
    gems,
    xpRate,
    xp,
  };

  const transaction = await createTransaction({
    user,
    autoComplete: true,
    amount: -betAmount,
    bet,
    ...data,
  });

  return transaction;
}
