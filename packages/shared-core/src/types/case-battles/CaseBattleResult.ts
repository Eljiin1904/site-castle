import type { CaseBattleMode } from "./CaseBattleMode";
import type { CaseBattleModifier } from "./CaseBattleModifier";

export interface CaseBattleResult {
  gameId: string;
  timestamp: Date;
  mode: CaseBattleMode;
  modifiers: CaseBattleModifier[];
  entryCost: number;
  serverSeed: string;
  eosBlockNum: number;
  eosBlockId: string;
  playerCount: number;
  rounds: CaseBattleResultRound[];
  winners: number[];
  totalWon: number;
}

export interface CaseBattleResultRound {
  rolls: number[];
}
