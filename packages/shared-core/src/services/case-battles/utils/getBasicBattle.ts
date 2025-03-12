import { BasicCaseBattle } from "#core/types/case-battles/BasicCaseBattle";
import { CaseBattleDocument } from "#core/types/case-battles/CaseBattleDocument";

export function getBasicBattle(battle: CaseBattleDocument): BasicCaseBattle {
  return {
    id: battle._id,
    mode: battle.mode,
    modifiers: battle.modifiers,
    entryCost: battle.entryCost,
  };
}
