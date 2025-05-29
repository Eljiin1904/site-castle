import { getHandPayout } from "#core/services/blackjack/Blackjack";
import { BlackjackAction } from "./BlackjackAction";
import { BlackjackBetAmounts, BlackjackBetTypeInsurance } from "./BlackjackBetAmounts";
import { CardValue, Suit } from "./CardData";
import { InsuranceStatus } from "./InsuranceStatus";

// === manually typing computed types ===

export type SidebetPayout = {
  type: BlackjackBetTypeInsurance;
  title: string;
  multiplier: number;
  amount: number;
};

export type SidebetPayoutData = SidebetPayout & { fromData: boolean };
type HandPayout = ReturnType<typeof getHandPayout>;

// Game.getNextAction
export type BlackjackNextAction = {
  userId: string;
  allowedActions: BlackjackAction[];
};

// Card.getClientObj()
export type BlackjackClientCardData =
  | {
      orderIndex: number | undefined;
      hiddenFlipIndex: number | undefined;
      shouldHide: boolean;
      hidden: boolean;
      suit: null;
      value: null;
    }
  | {
      orderIndex: number | undefined;
      hiddenFlipIndex: number | undefined;
      shouldHide: boolean;
      hidden: boolean;
      suit: Suit;
      value: CardValue;
    };

export type BlackjackHandInfo = {
  info: {
    handValues: number[];
  };
};

// Hand.getClientObj()
export type BlackjackClientHandData = {
  stand: boolean;
  cards: BlackjackClientCardData[];
  info: BlackjackHandInfo;
};

// Dealer.getClientObj()
export type BlackjackClientCardHolderData = {
  hands: BlackjackClientHandData[];
};

// PlayerHand.getClientObj()
export type BlackjackClientPlayerHandData = BlackjackClientHandData & {
  betAmounts: BlackjackBetAmounts;
  split: boolean;
  double: boolean;
  mainPayout: HandPayout | null;
  isCurrentHand: boolean | undefined;
};

// Player.getClientObj()
export type BlackjackClientPlayerData = {
  userId: string;
  betAmounts: BlackjackBetAmounts;
  insurance: InsuranceStatus;
  sidebetPayouts: SidebetPayoutData[];
  mainPayout: number | null;
  totalPayout: number;
  statusTitle: string | null | undefined;
  displayBetAmounts: BlackjackBetAmounts;
  hands: BlackjackClientPlayerHandData[];
};

// Game.getClientObj()
export type BlackjackClientGameData = {
  dealer: BlackjackClientCardHolderData;
  players: BlackjackClientPlayerData[];
  _id: string;
  completed: boolean;
  syncIndex: number;
};

// Game.getApiResponse()
export type BlackjackApiResponse = {
  game: BlackjackClientGameData;
  nextAction: BlackjackNextAction[] | null;
};
