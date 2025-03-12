import type {
  CaseBattlePlayer,
  CaseBattlePlayerWithResult,
} from "./CaseBattlePlayer";

export type CaseBattleStatus = CaseBattleStatusData["status"];

export type CaseBattleStatusData =
  | WaitingData
  | PendingData
  | SimulatingData
  | CompletedData;

export interface WaitingData {
  status: "waiting";
  players: (CaseBattlePlayer | null)[];
}

export interface PendingData {
  status: "pending";
  players: CaseBattlePlayer[];
  eosBlockNum: number;
  eosCommitDate: Date;
}

export interface SimulatingData {
  status: "simulating";
  players: CaseBattlePlayer[];
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
}

export interface CompletedData {
  status: "completed";
  players: CaseBattlePlayerWithResult[];
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
  totalWon: number;
}
