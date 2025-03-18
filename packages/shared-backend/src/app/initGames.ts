// import { Database } from "@core/services/database"
import { SiteGameDisplayDocument } from "@core/types/site/SiteGameDisplayDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";

export const initSiteGames = async () => {
  await Database.collection("site-games").insertMany(gameOptions);
};

const gameOptions: SiteGameDisplayDocument[] = [
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: true,
    name: "crash",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: true,
    name: "duel",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: false,
    name: "dice",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: false,
    name: "limbo",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: false,
    name: "blackjack",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: false,
    name: "mines",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: false,
    name: "cases",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: false,
    name: "case_battles",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "original",
    description: "",
    featured: false,
    name: "double",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "slots",
    description: "",
    featured: false,
    name: "slots",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "live_casino",
    description: "",
    featured: false,
    name: "live_casino",
    timestamp: new Date(),
  },
  {
    _id: Ids.long(),
    category: "game_shows",
    description: "",
    featured: false,
    name: "game_shows",
    timestamp: new Date(),
  },
];
