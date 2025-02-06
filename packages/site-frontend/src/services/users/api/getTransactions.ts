import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Http } from "@client/services/http";

export async function getTransactions(data: {
  category: TransactionCategory | undefined;
  game: boolean;
  limit: number;
  page: number;
}): Promise<{
  transactions: TransactionDocument[];
}> {
  return await Http.post("/users/get-transactions", data);
}
