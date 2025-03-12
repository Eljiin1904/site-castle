export const categories = [
  "cases",
  "case-battles",
  "deposits",
  "dice",
  "double",
  "limbo",
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
