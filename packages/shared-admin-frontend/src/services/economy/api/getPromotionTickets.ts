import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Http } from "@client/services/http";

export function getPromotionTickets(data: {
  promotionId: string;
  limit: number;
  page: number;
}): Promise<{ tickets: TransactionDocument[] }> {
  return Http.post("/economy/get-promotion-tickets", data);
}
