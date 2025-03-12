import { CaseBattleDocument } from "#core/types/case-battles/CaseBattleDocument";

export function includesUser(battle: CaseBattleDocument, userId: string) {
  return battle.players.some((x) => !x?.bot && x?.id === userId);
}
