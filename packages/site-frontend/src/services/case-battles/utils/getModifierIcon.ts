import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { SvgCrosshair } from "@client/svgs/common/SvgCrosshair";
import { SvgLock } from "#app/svgs/common/SvgLock";
import { SvgEyeOut } from "@client/svgs/common/SvgEyeOut";

export function getModifierIcon(modifier: CaseBattleModifier) {
  switch (modifier) {
    case "crazy":
      return SvgChicken;
    case "first-draw":
      return SvgCrosshair;
    case "final-draw":
      return SvgCrosshair;
    case "friends-only":
      return SvgLock;
    case "private":
      return SvgEyeOut;
    default:
      throw new Error(`Unknown modifier, ${modifier}`);
  }
}
