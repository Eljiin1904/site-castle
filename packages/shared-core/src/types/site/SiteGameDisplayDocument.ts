type SiteGameName =
  | "crash"
  | "duel"
  | "dice"
  | "limbo"
  | "blackjack"
  | "mines"
  | "cases"
  | "case_battles"
  | "double"
  | "slots"
  | "live_casino"
  | "game_shows";

export type SiteGameCategory = "original" | "live_casino" | "game_shows" | "slots";
export const SiteGameCatergoryOptions = ["all", "original", "live_casino", "game_shows", "slots"];

export interface SiteGameDisplayDocument {
  _id: string;
  category: SiteGameCategory;
  description: string;
  featured: boolean;
  name: SiteGameName;
  timestamp: Date;
}
