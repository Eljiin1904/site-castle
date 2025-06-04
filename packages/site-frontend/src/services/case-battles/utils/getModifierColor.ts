import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";

export function getModifierColor(modifier: CaseBattleModifier): Color {
  switch (modifier) {
    case "crazy":
      return "orange";
    case "first-draw":
      return "blue";
    case "final-draw":
      return "purple";
    case "friends-only":
      return "light-yellow";
    case "private":
      return "light-gray";
    default:
      throw new Error(`Unknown modifier, ${modifier}`);
  }
}
