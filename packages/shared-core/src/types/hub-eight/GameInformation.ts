export interface SupplierIdentifier {
  // Add appropriate fields based on the shape of supplier_identifier

  game_id?: string;
  game_code?: string;
  game_code_mobile?: string;
}

export type Platform = "GPL_DESKTOP" | "GPL_MOBILE";

export const hubEightGameCategories = [
  "video keno",
  "video bingo",
  "live poker",
  "live wheel of fortune",
  "live sicbo",
  "live crash",
  "baccarat",
  "bet on poker",
  "blackjack",
  "casual games",
  "jackpot slots",
  "live baccarat",
  "live blackjack",
  "live dealer",
  "live dice",
  "live games",
  "live keno",
  "live lottery",
  "live roulette",
  "lottery",
  "minigame",
  "multiplayer",
  "player props",
  "poker",
  "roulette",
  "scratch cards",
  "sportsbook",
  "table games",
  "video poker",
  "virtual sports",
  "wheel of fortune",
  "instant win games",
  "keno",
  "bingo",
  "sic bo",
  "video slots",
  "unknown",
  "crash",
  "scratch",
  "dragon tiger",
  "live game shows",
  "live dragon tiger",
  "crash games",
  "arcade games",
  "other table games",
  "other live games",
  "dice",
  "plinko",
  "hi lo",
] as const;

export type HubEightGameCategory = (typeof hubEightGameCategories)[number];

export type Volatility = 1 | 2 | 3 | 4 | 5 | 6;
type Certifications = "CURACAO" | "MGA" | "IOM";

export interface HubEightGameInformation {
  url_thumb: string;
  url_background: string;
  product: string;
  platforms: Platform[];
  name: string;
  game_code: string;
  supplier_identifier: SupplierIdentifier;
  freebet_support: boolean;
  demo_game_support: boolean;
  enabled: boolean;
  category: HubEightGameCategory;
  blocked_countries: string[]; // country codes
  release_date: string; // ISO 8601 format
  volatility: Volatility;
  rtp: string; // As percentage in string format ( "94.79")
  paylines: number;
  hit_ratio: string; // As percentage in string format ( "24.47")
  certifications: Certifications[];
  languages: string[];
  theme: string[];
  technology: string[];
  features: string[];
}

export const externalGameCategories = [
  "slot",
  "live",
  "game_shows",
  "casino",
  // ...hubEightGameCategories,
] as const;

export type ExternalGameCategory = (typeof externalGameCategories)[number];
