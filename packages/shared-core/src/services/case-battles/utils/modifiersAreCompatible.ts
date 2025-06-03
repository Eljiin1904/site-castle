import { CaseBattleModifier } from "#core/types/case-battles/CaseBattleModifier";

export const modifiersAreCompatible = (modifiers: CaseBattleModifier[]) => {
  const incompatiblePrivacy =
    modifiers.includes("friends-only") && modifiers.includes("private");
  const incompatibleGameModes =
    modifiers.includes("first-draw") && modifiers.includes("final-draw");
  return !incompatiblePrivacy && !incompatibleGameModes;
};
