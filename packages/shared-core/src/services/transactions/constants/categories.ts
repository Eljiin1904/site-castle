export const categories = [
  "duel",
  "case-battles",
  "crash",
  "dice",
  "limbo",
  "blackjack",
  "mines",
  "double",
  "cases",  
  "deposits",  
  "withdrawals",
  "tips",
  "races",
  "rain",
  "referrals",
  "rewards",
  "promotion",
  "vault",
  "other",
] as const;

export const gameCategories: ReadonlyArray<(typeof categories)[number]> = [
  "duel",
  "case-battles",
  "crash",
  "dice",
  "limbo",
  "blackjack",
  "mines",
  "double",
  "cases"  
];

export const notGameCategories: ReadonlyArray<(typeof categories)[number]> = [
  "deposits",
  "withdrawals",
  "tips",
  "races",
  "rain",
  "referrals",
  "rewards",
  "promotion",
  "vault",
  "other",
];
