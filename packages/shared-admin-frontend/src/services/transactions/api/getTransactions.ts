import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { TransactionKind } from "@core/types/transactions/TransactionKind";
import { TransactionStatus } from "@core/types/transactions/TransactionStatus";
import { Http } from "@client/services/http";

export function getTransactions(data: {
  searchText: string | undefined;
  category: TransactionCategory | undefined;
  kind: TransactionKind | undefined;
  status: TransactionStatus | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  minValue: number | undefined;
  maxValue: number | undefined;
  limit: number;
  page: number;
}): Promise<{
  transactions: TransactionDocument[];
}> {
  return Http.post("/transactions/get-transactions", data);
}
