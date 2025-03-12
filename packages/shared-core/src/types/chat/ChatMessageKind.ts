import type { BasicCaseBattle } from "../case-battles/BasicCaseBattle";
import type { BasicChest } from "../chests/BasicChest";
import type { ChestItem } from "../chests/ChestItem";
import type { PlayerUser } from "../users/PlayerUser";
import type { BasicUser } from "../users/BasicUser";
import type { DoubleBetKind } from "../double/DoubleBetKind";
import type { LootItem } from "../items/BasicItem";
import type { ChatMessageReply } from "./ChatMessageReply";

export type ChatMessageKind = ChatMessageKindData["kind"];

export type ChatMessageKindData =
  | TextData
  | AventData
  | CaseBattleLinkData
  | CaseBattleWinData
  | CaseWinData
  | DoubleStreakData
  | DoubleWinData
  | DiceWinData
  | LimboWonData
  | RainTipData
  | RainPayoutData;

interface TextData {
  kind: "text";
  text: string;
  reply?: ChatMessageReply;
}

interface AventData {
  kind: "advent-bonus";
  user: BasicUser;
  item: LootItem;
}

interface CaseBattleLinkData {
  kind: "case-battle-link";
  battle: BasicCaseBattle;
}

interface CaseBattleWinData {
  kind: "case-battle-win";
  user: PlayerUser;
  battle: BasicCaseBattle;
  chest: BasicChest;
  item: ChestItem;
}

interface CaseWinData {
  kind:
    | "case-game-win"
    | "level-case-win"
    | "gem-case-win"
    | "holiday-case-win";
  user: BasicUser;
  chest: BasicChest;
  item: ChestItem;
}

interface DoubleStreakData {
  kind: "double-streak";
  streakKind: "green" | "bait";
  streakCount: number;
}

interface DiceWinData {
  kind: "dice-win";
  user: BasicUser;
  multiplier: number;
  wonAmount: number;
}

interface DoubleWinData {
  kind: "double-win";
  user: BasicUser;
  betKind: DoubleBetKind;
  wonAmount: number;
}

interface LimboWonData {
  kind: "limbo-win";
  user: BasicUser;
  multiplier: number;
  wonAmount: number;
}

interface RainTipData {
  kind: "rain-tip";
  user: BasicUser;
  tipAmount: number;
}

interface RainPayoutData {
  kind: "rain-payout";
  rainId: string;
  topPlayers: string[];
  playerCount: number;
  totalAmount: number;
}
