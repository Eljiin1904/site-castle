import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { SvgCrosshair } from "@client/svgs/common/SvgCrosshair";

export function getModifierIcon(modifier: CaseBattleModifier) {
  switch (modifier) {
    case "crazy":
      return SvgChicken;
    case "first-draw":
      return SvgCrosshair;
    case "final-draw":
      return SvgCrosshair;
    default:
      throw new Error(`Unknown modifier, ${modifier}`);
  }
}
