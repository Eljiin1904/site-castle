import { Http } from "@client/services/http";

export function redeemGiftCard(data: {
  cardId: string;
  captchaToken: string;
}): Promise<{
  transactionId: string;
  tokenAmount: number;
  ftd: boolean;
}> {
  return Http.post("/economy/redeem-gift-card", data);
}
