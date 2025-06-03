import type { ChestWithCount } from "../chests/ChestDocument";
import type { CaseBattleMode } from "./CaseBattleMode";
import type { CaseBattleModifier } from "./CaseBattleModifier";
import type { CaseBattleRound } from "./CaseBattleRound";
import type { CaseBattleStatusData } from "./CaseBattleStatus";

export type CaseBattleDocument = {
  _id: string;
  createDate: Date;
  mode: CaseBattleMode;
  chests: ChestWithCount[];
  modifiers: CaseBattleModifier[];
  entryCost: number;
  serverSeed: string;
  serverSeedHash: string;
  rounds: CaseBattleRound[];
  roundCount: number;
  roundIndex: number;
  statusDate: Date;
  ready?: boolean;
  joinKey?: string;
  eosBlockNum?: number;
  eosBlockId?: string;
  totalWon?: number;
  autoSort?: boolean;
  viewers: (string | null)[];
} & CaseBattleStatusData;
