import { SvgDouble } from "#app/svgs/double/SvgDouble";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgCrash } from "@client/svgs/common/SvgCrash";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgDuel } from "@client/svgs/common/SvgDuel";
import { SvgLimbo } from "@client/svgs/common/SvgLimbo";
import { SvgMines } from "@client/svgs/common/SvgMines";
import { GameDocument } from "@core/types/game/GameDocument";

export function getGameIcon(game: GameDocument) {
  switch (game.name) {
    case "dice":
      return SvgDice;
    case "limbo":
      return SvgLimbo;
    case "blackjack":
      return SvgBlackjack;
    case "mines":
      return SvgMines;
    case "double":
      return SvgDouble;
    case "crash":
      return SvgCrash;
    case "duel":
      return SvgDuel;
    case "cases":
      return SvgBattle;
    case "case_battles":
      return SvgBattle;
    default:
    {
      const e = new Error(`validations:errors.games.invalidGameName`);
      console.error('Error in game '+game.name);
      e.cause = game.name;
      throw e;
    }
  }
}
