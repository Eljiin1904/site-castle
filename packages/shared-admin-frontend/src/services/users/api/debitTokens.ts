import { AdminDebitAdjustment } from "@core/types/admin/AdminDebitAdjustment";
import { Http } from "@client/services/http";

export function debitTokens(data: {
  userId: string;
  adjustment: AdminDebitAdjustment;
  tokenAmount: number;
}) {
  return Http.post("/users/debit-tokens", data);
}
