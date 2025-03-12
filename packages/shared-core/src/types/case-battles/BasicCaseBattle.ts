import type { CaseBattleMode } from "./CaseBattleMode";
import type { CaseBattleModifier } from "./CaseBattleModifier";

export interface BasicCaseBattle {
  id: string;
  mode: CaseBattleMode;
  modifiers: CaseBattleModifier[];
  entryCost: number;
}
