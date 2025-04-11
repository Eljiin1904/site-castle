import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { TransactionKind } from "@core/types/transactions/TransactionKind";
import { Http } from "@client/services/http";

export function getTransactions(data: {
  userId: string;
  kind: TransactionKind | undefined;
  limit: number;
  page: number;
}): Promise<{
  transactions: TransactionDocument[];
  total: number;
}> {
  return Http.post("/users/get-transactions", data);
}
