import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Http } from "@client/services/http";

export async function getTransaction(data: { transactionId: string }): Promise<{
  transaction: TransactionDocument;
}> {
  return await Http.post("/users/get-transaction", data);
}
