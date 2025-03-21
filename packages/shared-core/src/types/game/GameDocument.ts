import type { kinds } from "#core/services/game/constants/kinds";

export interface GameDocument {
  _id: string;
  name: string;
  description: string;
  featured: boolean;
  category: typeof kinds[number];
  timestamp: Date;
};