import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgCases } from "@client/svgs/common/SvgCases";
import { SvgCrash } from "@client/svgs/common/SvgCrash";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgDuel } from "@client/svgs/common/SvgDuel";
import { SvgLimbo } from "@client/svgs/common/SvgLimbo";
import { SvgMines } from "@client/svgs/common/SvgMines";
import { SvgDouble } from "#app/svgs/double/SvgDouble";

export const useMostPopularGame = () => {

   const stats = useAppSelector((x) => x.user.stats);

   const popularGame = [
      { game: "duel", count: stats.duelBetCount ?? 0, icon: SvgDuel},
      { game: "case_battle", count: stats.caseBattleBetCount ?? 0, icon: SvgBattle},
      { game: "crash", count: stats.crashBetCount?? 0 , icon: SvgCrash},
      { game: "dice", count: stats.diceBetCount ?? 0, icon: SvgDice},
      { game: "limbo", count: stats.limboBetCount ?? 0, icon: SvgLimbo},
      { game: "blackjack", count: stats.blackjackBetCount ?? 0, icon: SvgBlackjack},
      { game: "double", count: stats.doubleBetCount ?? 0, icon: SvgDouble},
      { game: "mines", count: stats.minesBetCount?? 0 , icon: SvgMines},
      { game: "cases", count: stats.caseBetCount ?? 0, icon: SvgCases}
    ].reduce((a, b) => (a.count > b.count ? a : b));
   
    return popularGame as {game: string, count: number, icon: Svg};
};