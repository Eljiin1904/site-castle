import { SiteReport } from "@core/types/site/SiteReport";

export function getGamesData(data: SiteReport) {
  const txs = data.transactions;

  const countTotal =
    txs.duelBetCount +
    txs.crashBetCount +
    txs.caseBattleBetCount +   
    txs.diceBetCount +
    txs.limboBetCount +   
    txs.blackjackBetCount +
    txs.minesBetCount +
    txs.doubleBetCount +    
    txs.caseBetCount;

  const wagerTotal =
    txs.duelWagerTokens +
    txs.crashWagerTokens +
    txs.caseBattleWagerTokens +
    txs.diceWagerTokens +
    txs.limboWagerTokens +
    txs.minesWagerTokens +
    txs.blackjackWagerTokens +
    txs.doubleWagerTokens +
    txs.caseWagerTokens;
 
  const wonTotal =
    txs.duelWinTokens +
    txs.crashWinTokens +
    txs.caseBattleWinTokens +
    txs.diceWinTokens +
    txs.limboWinTokens +
    txs.blackjackWinTokens +
    txs.minesWinTokens +
    txs.doubleWinTokens +
    txs.caseWinTokens;

  const evTotal = txs.casesEv + txs.caseBattlesEv + txs.doubleEv + txs.diceEv + txs.limboEv;

  return [
    {
      label: "duel",
      count: txs.duelBetCount,
      wager: txs.duelWagerTokens,
      won: txs.duelWinTokens,
      ev: txs.duelEv,
    },
     {
      label: "crash",
      count: txs.crashBetCount,
      wager: txs.crashWagerTokens,
      won: txs.crashWinTokens,
      ev: txs.crashEv,
    },   
    {
      label: "case_battles",
      count: txs.caseBattleBetCount,
      wager: txs.caseBattleWagerTokens,
      won: txs.caseBattleWinTokens,
      ev: txs.caseBattlesEv,
    },   
    {
      label: "dice",
      count: txs.diceBetCount,
      wager: txs.diceWagerTokens,
      won: txs.diceWinTokens,
      ev: txs.diceEv,
    },
    {
      label: "limbo",
      count: txs.limboBetCount,
      wager: txs.limboWagerTokens,
      won: txs.limboWinTokens,
      ev: txs.limboEv,
    },
    {
      label: "blackjack",
      count: txs.blackjackBetCount,
      wager: txs.blackjackWagerTokens,
      won: txs.blackjackWinTokens,
      ev: txs.blackjackEv,
    },
    {
      label: "mines",
      count: txs.minesBetCount,
      wager: txs.minesWagerTokens,
      won: txs.minesWinTokens,
      ev: txs.minesEv,
    },
    {
      label: "double",
      count: txs.doubleBetCount,
      wager: txs.doubleWagerTokens,
      won: txs.doubleWinTokens,
      ev: txs.doubleEv,
    },
    {
      label: "cases",
      count: txs.caseBetCount,
      wager: txs.caseWagerTokens,
      won: txs.caseWinTokens,
      ev: txs.casesEv,
    },   
    {
      label: "total",
      className: "total",
      count: countTotal,
      wager: wagerTotal,
      won: wonTotal,
      ev: evTotal,
    },
  ];
}
