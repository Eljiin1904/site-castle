import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";

export function getModifierColor(modifier: CaseBattleModifier): Color {
  switch (modifier) {
    case "crazy":
      return "orange";
    case "first-draw":
      return "blue";
    case "final-draw":
      return "purple";
    default:
      throw new Error(`Unknown modifier, ${modifier}`);
  }
}
