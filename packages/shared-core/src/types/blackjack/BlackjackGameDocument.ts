import { BlackjackAction } from "./BlackjackAction";
import { SidebetPayoutData } from "./BlackjackApiResponse";
import { BlackjackBetAmounts } from "./BlackjackBetAmounts";
import { CardData } from "./CardData";
import { InsuranceStatus } from "./InsuranceStatus";

// === manually typing compted types ===

export type BlackjackSeedData = {
  clientSeed: string;
  serverSeed: string;
  serverSeedHashed: string;
  nonce: number;
  step: number;
};

// Hand.getDbObj()
export type DbHandData = {
  stand: boolean;
  cards: CardData[];
};

// Player.getDbData()
export type DbPlayerData = DbCardHolderData & {
  userId: string;
  betAmounts: BlackjackBetAmounts;
  insurance: InsuranceStatus;
  sidebetPayouts: SidebetPayoutData[];
  mainPayout: number | null;
  totalPayout: number;
  statusTitle: string | null | undefined;
};

// Dealer.getDbObj()
// CardHolder.getDbObj()
export type DbCardHolderData = {
  hands: DbHandData[];
};

export type BlackjackActionHistory = {
  // userId: UserId;
  action: BlackjackAction;
  buyInsurance?: boolean;
  createdAt: Date;
};

export type BlackjackGameDocument = {
  _id: string;
  completed: boolean;
  syncIndex: number;
  dealer: DbCardHolderData;
  players: DbPlayerData[];
  seeds: BlackjackSeedData;
  timestamp: Date;
  history: BlackjackActionHistory[];
};
