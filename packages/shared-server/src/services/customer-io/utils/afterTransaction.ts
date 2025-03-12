import { Intimal } from "@core/services/intimal";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "#server/services/database";
import { track } from "./track";

export async function afterTransaction(tx: TransactionDocument) {
  const user = await Database.collection("users").findOne({ _id: tx.user.id });

  if (!user) {
    return;
  }

  await track().identify(user._id, {
    token_balance: Intimal.toDecimal(user.tokenBalance),
    gem_balance: Intimal.toDecimal(user.gemBalance),
    xp: Intimal.toDecimal(user.xp),
    pnl: Intimal.toDecimal(user.stats.profitLoss || 0),
    deposit_amount: Intimal.toDecimal(user.stats.depositAmount || 0),
    withdraw_amount: Intimal.toDecimal(user.stats.withdrawAmount || 0),
    wager_amount: Intimal.toDecimal(user.stats.wagerAmount || 0),
    last_transaction_at: Math.round(Date.now() / 1000),
  });
}
