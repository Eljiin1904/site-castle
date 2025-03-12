import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Http } from "@client/services/http";

export function getTransaction(data: { transactionId: string }): Promise<{
  transaction: TransactionDocument;
}> {
  return Http.post("/transactions/get-transaction", data);
}
