import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { reportTransaction } from "./reportTransaction";
import { finalizeReferral } from "./finalizeReferral";
import { creditCommission } from "./creditCommission";

export async function afterTransaction(tx: TransactionDocument) {
  await finalizeReferral(tx);
  await creditCommission(tx);
  await reportTransaction(tx);
}
