import { AdminCreditAdjustment } from "@core/types/admin/AdminCreditAdjustment";
import { Http } from "@client/services/http";

export function creditTokens(data: {
  userId: string;
  adjustment: AdminCreditAdjustment;
  tokenAmount: number;
}) {
  return Http.post("/users/credit-tokens", data);
}
