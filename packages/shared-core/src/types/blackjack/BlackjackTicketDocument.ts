import { SidebetPayoutData } from "./BlackjackApiResponse";
import { BlackjackBetAmounts } from "./BlackjackBetAmounts";
import { BlackjackFeedItem } from "./BlackjackEventDocument";

// === manually typing computed type ===

// Player.getPayoutTicket()
type PlayerPayoutTicket = {
  userId: string;
  betAmounts: BlackjackBetAmounts;
  mainPayout: number | null;
  newSidebetPayouts: SidebetPayoutData[];
  feedAr: BlackjackFeedItem[] | null;
};

// Game.getPayoutTicket()
export type BlackjackTicketDocument = {
  _id: string | null;
  gameId: string; // number ?
  players: PlayerPayoutTicket[];

  completed: boolean;
  processDelay: number;
  timestamp: Date;
  processed: boolean;
  processDate: Date | null;
};
