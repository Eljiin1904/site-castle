const bets: {
  targetKind: "over" | "under";
  betAmount: number;
  targetValue: number;
}[] = [
  {
    targetValue: 53.88,
    targetKind: "over",
    betAmount: 100,
  },
  {
    targetValue: 10,
    targetKind: "over",
    betAmount: 1000,
  },
];

export { bets };
