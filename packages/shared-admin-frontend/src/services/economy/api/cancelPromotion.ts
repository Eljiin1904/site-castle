import { Http } from "@client/services/http";

export function cancelPromotion(data: { promotionId: string }) {
  return Http.post("/economy/cancel-promotion", data);
}
