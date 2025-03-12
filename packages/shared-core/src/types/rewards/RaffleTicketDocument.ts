export interface RaffleTicketDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  raffleId: string;
  ticketIndex: number;
}
