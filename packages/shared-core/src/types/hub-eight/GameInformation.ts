type GamePlatformTypes = ["GPL_DESKTOP", "GPL_MOBILE"];
type GameCategoryType = [
  "Video Keno",
  "Video Bingo",
  "Live Poker",
  "Live Wheel of Fortune",
  "Live Sicbo",
  "Live Crash",
  "Baccarat",
  "Bet On Poker",
  "Blackjack",
  "Casual Games",
  "Jackpot Slots",
  "Live Baccarat",
  "Live Blackjack",
  "Live Dealer",
  "Live Dice",
  "Live Games",
  "Live Keno",
  "Live Lottery",
  "Live Roulette",
  "Lottery",
  "Minigame",
  "Multiplayer",
  "Player Props",
  "Poker",
  "Roulette",
  "Scratch Cards",
  "Sportsbook",
  "Table Games",
  "Video Poker",
  "Virtual Sports",
  "Wheel of Fortune",
  "Instant Win Games",
  "Keno",
  "Bingo",
  "Sic Bo",
  "Video Slots",
  "Unknown",
  "Crash",
  "Scratch",
  "Dragon Tiger",
  "Live Game Shows",
  "Live Dragon Tiger",
  "Crash Games",
  "Arcade Games",
  "Other Table Games",
  "Other Live Games",
  "Dice",
  "Plinko",
  "Hi Lo",
];

type CertificationType = "CURACAO" | "MGA" | "IOM";

interface GameInformation {
  url_thumb: string;
  url_background: string;
  product: string;
  platforms: GamePlatformTypes;
  name: string;
  game_code: string;
  freebet_support: boolean;
  enabled: boolean;
  category: GameCategoryType;
  blocked_countries: string; // Make array for country codes
  release_date: string;
  volatility: 1 | 2 | 3 | 4 | 5 | 6;
  rtp: string;
  paylines: number;
  hit_ratio: string;
  certifications: CertificationType[];
  languages: string[];
  technology: string[];
  features: string[];
}
