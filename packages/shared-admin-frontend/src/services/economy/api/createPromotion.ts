import { Http } from "@client/services/http";

export function createPromotion(data: {
  promotionId: string;
  tokenAmount: number;
  startDate: Date;
  endDate: Date;
  maxUses: number;
  requiredXP: number;
  requiredWagerAmount: number;
  requiredWagerDays: number;
}) {
  return Http.post("/economy/create-promotion", data);
}
