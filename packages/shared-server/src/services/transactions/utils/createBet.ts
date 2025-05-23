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
import { edgeRate } from "../../../../../shared-core/src/services/blackjack/Blackjack";

type BetKind = Extract<TransactionKindData, { bet: TransactionBetData }>["kind"];
type BetData = UnionSafeOmit<TransactionKindData, "bet">;

export async function createBet({
  user,
  location,
  betAmount,
  edgeRate = undefined,
  ...data
}: {
  user: UserDocument;
  location: UserLocation;
  kind: BetKind;
  betAmount: number;
  edgeRate?: number;
} & BetData) {
  const { rainTaxRate, gemRate } = await Site.settings.cache();
  const category = Transactions.getCategory(data.kind);

  // If edge Rate provided, use it else check for it
  const edge = edgeRate ? edgeRate : getEdgeRate(category);
  const ev = Math.round(betAmount * edge);

  const rainAmount = Math.round(ev * rainTaxRate);

  const commission = await getCommission({
    bettor: user,
    value: Math.round(ev * 0.5),
  });

  // const xpRate = await getXpRate(category);
  const xpRate = await getXpRate({
    category: category,
    data: data as TransactionKindData,
    edgeRate: edge,
  });

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
