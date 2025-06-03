import type { BasicUser } from "../users/BasicUser";
import { BlackjackBetTypeInsurance } from "./BlackjackBetAmounts";
import { MaskedUser } from "./MaskedUser";

export type BlackjackFeedItem = {
  userId: string | null;
  type: BlackjackBetTypeInsurance;
  betAmount: number;
  payoutAmount: number;
  multiplier: number;
  playerHandValues: number[];
  dealerHandValues: number[];
};

export type BlackjackEventDocument = BlackjackFeedItem & {
  user: BasicUser;
  timestamp: Date;
  _id: string;
};

export type BlackjackFeedMasked = Omit<BlackjackEventDocument, "user"> & {
  user: MaskedUser;
};
