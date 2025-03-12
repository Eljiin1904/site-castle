export interface PromotionTicketDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  promotionId: string;
  ip: string | undefined;
}
