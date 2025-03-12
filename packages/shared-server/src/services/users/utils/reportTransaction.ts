import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { incrementReport, ReportIncrements } from "./incrementReport";

export async function reportTransaction(tx: TransactionDocument) {
  const inc: ReportIncrements = { ...tx.stats };

  if ("bet" in tx) {
    inc.xpGained = tx.bet.xp;
  }

  await incrementReport({
    user: tx.user,
    inc,
  });
}
