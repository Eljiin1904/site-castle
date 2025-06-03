export type BlackjackHandStatus =
  | {
      blackjack: true;
      busted?: never;
      score?: never;
    }
  | {
      blackjack?: never;
      busted: true;
      score?: never;
    }
  | {
      blackjack?: never;
      busted?: never;
      score: number;
    };
