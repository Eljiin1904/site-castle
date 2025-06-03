import { CaseBattleDocument } from "#core/types/case-battles/CaseBattleDocument";
import { maxLogSize } from "../constants/maxLogSize";

export function sortBattles({
  battles,
}: {
  battles: CaseBattleDocument[];
}): CaseBattleDocument[] {
  let inProgress: CaseBattleDocument[] = [];
  let joinablePublic: CaseBattleDocument[] = [];
  let joinableFriendsOnly: CaseBattleDocument[] = [];
  let completed: CaseBattleDocument[] = [];

  const categorizeBattle = (battle: CaseBattleDocument) => {
    const isFriendsOnly = battle.modifiers.includes("friends-only");
    const isPublic = !isFriendsOnly;

    if (battle.status === "pending" || battle.status === "simulating") {
      inProgress.push(battle);
    } else if (battle.status === "waiting") {
      if (isPublic) {
        joinablePublic.push(battle);
      } else {
        joinableFriendsOnly.push(battle);
      }
    } else if (battle.status === "completed") {
      completed.push(battle);
    }
  };

  for (const battle of battles) {
    categorizeBattle(battle);
  }

  const sortByEntryCostDesc = (a: CaseBattleDocument, b: CaseBattleDocument) =>
    b.entryCost - a.entryCost;

  inProgress.sort(sortByEntryCostDesc);
  joinablePublic.sort(sortByEntryCostDesc);
  joinableFriendsOnly.sort(sortByEntryCostDesc);
  completed.sort(sortByEntryCostDesc);

  // enforce hard-sort/stacking of sorted categories
  let sortedBattles = [
    ...joinablePublic,
    ...inProgress,
    ...joinableFriendsOnly,
  ];

  // Fill with completed battles if necessary
  if (sortedBattles.length < maxLogSize) {
    const remainingSlots = maxLogSize - sortedBattles.length;
    sortedBattles = [...sortedBattles, ...completed.slice(0, remainingSlots)];
  }

  // Enforce max log size
  return sortedBattles.slice(0, maxLogSize);
}
