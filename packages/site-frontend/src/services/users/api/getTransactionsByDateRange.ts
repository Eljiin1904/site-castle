import { Http } from "@client/services/http";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";

export async function getTransactionsByDateRange(data: {
  minDate: Date;
  maxDate: Date;
  category: TransactionCategory | string | undefined;
  type: "wagered" | "pnl" | undefined;
}): Promise<{
  values: { label: string; value: number }[];
  total: number;
}> {
  return await Http.post("/users/get-transactions-by-date-range", data);
}
