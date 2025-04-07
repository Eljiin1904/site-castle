export const categories = [
  "cases",
  "case-battles",
  "deposits",
  "dice",
  "double",
  "limbo",
  "mines",
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
  "cases",
  "case-battles",
  "dice",
  "double",
  "limbo",
  "mines",
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
