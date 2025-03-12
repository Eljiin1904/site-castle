export interface ChatRainDocument {
  _id: string;
  startDate: Date;
  openDate: Date;
  endDate: Date;
  interval: number;
  duration: number;
  baseAmount: number;
  taxAmount: number;
  tipAmount: number;
  totalAmount: number;
  ticketCount: number;
  processed?: boolean;
  processDate?: Date;
}
