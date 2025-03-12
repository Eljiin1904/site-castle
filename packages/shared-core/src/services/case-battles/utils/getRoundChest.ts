import { CaseBattleDocument } from "#core/types/case-battles/CaseBattleDocument";

export function getRoundChest(battle: CaseBattleDocument, roundIndex: number) {
  let cursor = -1;

  for (const chest of battle.chests) {
    for (let i = 0; i < chest.count; i++) {
      cursor++;
      if (roundIndex === cursor) {
        return chest;
      }
    }
  }

  throw new Error("Round index is outside the bounds of the battle.");
}
