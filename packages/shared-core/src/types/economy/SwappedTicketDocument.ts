export interface SwappedTicketDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  url: string;
  completed?: boolean;
}
