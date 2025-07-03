export const kinds = [
  "featured",
  "original",
  "slot",
  "live_casino",
  "game_shows",
] as const;

export type GameKindType = typeof kinds[number] | 'all';
