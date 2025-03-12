import { SiteReport } from "@core/types/site/SiteReport";

export function getGamesData(data: SiteReport) {
  const txs = data.transactions;

  const countTotal =
    txs.caseBetCount +
    txs.caseBattleBetCount +
    txs.doubleBetCount +
    txs.diceBetCount +
    txs.limboBetCount;

  const wagerTotal =
    txs.caseWagerTokens +
    txs.caseBattleWagerTokens +
    txs.doubleWagerTokens +
    txs.diceWagerTokens +
    txs.limboWagerTokens;

  const wonTotal =
    txs.caseWinTokens +
    txs.caseBattleWinTokens +
    txs.doubleWinTokens +
    txs.diceWinTokens +
    txs.limboWinTokens;

  const evTotal = txs.casesEv + txs.caseBattlesEv + txs.doubleEv + txs.diceEv + txs.limboEv;

  return [
    {
      label: "Cases",
      count: txs.caseBetCount,
      wager: txs.caseWagerTokens,
      won: txs.caseWinTokens,
      ev: txs.casesEv,
    },
    {
      label: "Battles",
      count: txs.caseBattleBetCount,
      wager: txs.caseBattleWagerTokens,
      won: txs.caseBattleWinTokens,
      ev: txs.caseBattlesEv,
    },
    {
      label: "Double",
      count: txs.doubleBetCount,
      wager: txs.doubleWagerTokens,
      won: txs.doubleWinTokens,
      ev: txs.doubleEv,
    },
    {
      label: "Dice",
      count: txs.diceBetCount,
      wager: txs.diceWagerTokens,
      won: txs.diceWinTokens,
      ev: txs.diceEv,
    },
    {
      label: "Limbo",
      count: txs.limboBetCount,
      wager: txs.limboWagerTokens,
      won: txs.limboWinTokens,
      ev: txs.limboEv,
    },
    {
      label: "Total",
      className: "total",
      count: countTotal,
      wager: wagerTotal,
      won: wonTotal,
      ev: evTotal,
    },
  ];
}
