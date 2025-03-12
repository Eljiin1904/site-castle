import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";

export function trimDocument(battle: CaseBattleDocument) {
  const trimmed = {
    _id: battle._id,
    mode: battle.mode,
    chests: battle.chests.map((x) => ({
      _id: x._id,
      slug: x.slug,
      imageId: x.imageId,
      displayName: x.displayName,
      openCost: x.openCost,
      count: x.count,
    })),
    entryCost: battle.entryCost,
    modifiers: battle.modifiers,
    rounds: battle.rounds.map((x) => ({})),
    roundCount: battle.roundCount,
    roundIndex: battle.roundIndex,
    players: battle.players,
    status: battle.status,
    statusDate: battle.statusDate,
    totalWon: "totalWon" in battle ? battle.totalWon : 0,
  };

  return trimmed as CaseBattleDocument;
}
