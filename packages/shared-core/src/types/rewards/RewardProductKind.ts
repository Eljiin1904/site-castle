import type { BasicChest } from "../chests/BasicChest";

export type RewardProductKind = RewardProductKindData["kind"];

export type RewardProductKindData = TokensData | CaseData;

interface TokensData {
  kind: "tokens";
  tokenAmount: number;
}

interface CaseData {
  kind: "case";
  chest: BasicChest;
}
