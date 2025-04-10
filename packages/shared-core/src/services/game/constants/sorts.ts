export const GameSorts = [
  "featured",
  "popular",
  "az",
  "za"
] as const;

export type GameSortType = typeof GameSorts[number];
