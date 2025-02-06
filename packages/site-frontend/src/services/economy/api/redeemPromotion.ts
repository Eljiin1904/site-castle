import { Http } from "@client/services/http";

export function redeemPromotion(data: {
  promotionId: string;
  captchaToken: string;
}): Promise<{
  tokenAmount: number;
}> {
  return Http.post("/economy/redeem-promotion", data);
}
