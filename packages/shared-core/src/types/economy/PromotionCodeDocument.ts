export interface PromotionCodeDocument {
  _id: string;
  timestamp: Date;
  tokenAmount: number;
  uses: number;
  maxUses: number;
  requiredXP: number;
  requiredWagerAmount: number;
  requiredWagerDays: number;
  cancelled?: boolean;
  startDate: Date;
  endDate: Date;
}
