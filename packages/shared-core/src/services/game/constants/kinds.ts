export const kinds = [
  "featured",
  "original",
  "slots",
  "live_casino",
  "game_shows",
] as const;

export type GameKindType = typeof kinds[number] | 'all';
