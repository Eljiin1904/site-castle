import { externalGameCategories } from "#core/types/hub-eight/GameInformation";

export const kinds = [
  "featured",
  "original",
  ...externalGameCategories
] as const;

export type GameKindType = typeof kinds[number] | 'all';
