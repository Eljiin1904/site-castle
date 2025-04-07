import { SiteGame } from "@core/types/site/SiteGame";
import { SvgBattle } from "#client/svgs/common/SvgBattle";
import { SvgChest } from "#client/svgs/common/SvgChest";
import { SvgDice } from "#client/svgs/common/SvgDice";
import { SvgBomb } from "#client/svgs/common/SvgBomb";
import { SvgMultiplier } from "#client/svgs/common/SvgMultiplier";
import { SvgSlide } from "#client/svgs/common/SvgSlide";

export function getGameIcon(game: SiteGame): Svg {
  switch (game) {
    case "cases":
      return SvgChest;
    case "case-battles":
      return SvgBattle;
    case "double":
      return SvgSlide;
    case "dice":
      return SvgDice;
    case "limbo":
      return SvgMultiplier;
    case "mines":
      return SvgBomb;
  }
}
