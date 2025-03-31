import { SiteGame } from "./SiteGame";

export type SiteJackPotDocument = {
  _id: string;
  timestamp: Date;
  game: SiteGame;
  potAmount: number;
  gameIds: string[];
  status: "pending" | "complete";
};
