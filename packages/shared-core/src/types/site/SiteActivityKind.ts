import type { BasicChest } from "../chests/BasicChest";
import type { ChestItem } from "../chests/ChestItem";
import type { LootItem } from "../items/BasicItem";
import type { DoubleBetKind } from "../double/DoubleBetKind";
import type { RewardBoostTimeframe } from "../rewards/RewardBoostTimeframe";

export type SiteActivityKind = SiteActivityKindData["kind"];

export type SiteActivityKindData =
  | AdventItemData
  | CaseBattleDropData
  | CaseDropData
  | DiceWonData
  | DoubleJackpotWonData
  | DoubleWonData
  | LimboWonData
  | MinesWonData
  | RewardBoostData;

interface AdventItemData {
  kind: "advent-item";
  item: LootItem;
}

interface CaseBattleDropData {
  kind: "case-battle-drop";
  battleId: string;
  chest: BasicChest;
  loot: ChestItem;
}

interface CaseDropData {
  kind:
    | "case-drop"
    | "reward-gem-case-drop"
    | "reward-holiday-case-drop"
    | "reward-level-case-drop";
  chest: BasicChest;
  loot: ChestItem;
}

interface DiceWonData {
  kind: "dice-win";
}

interface DoubleJackpotWonData {
  kind: "double-jackpot-win";
  betKind: DoubleBetKind;
  roundId: string;
}

interface DoubleWonData {
  kind: "double-win";
  betKind: DoubleBetKind;
}

interface LimboWonData {
  kind: "limbo-win";
}

interface MinesWonData {
  kind: "mines-win";
}

interface RewardBoostData {
  kind: "reward-boost";
  timeframe: RewardBoostTimeframe;
  amount: number;
}
