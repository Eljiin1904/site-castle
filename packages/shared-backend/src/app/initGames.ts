// import { Database } from "@core/services/database"
import { SiteGameDisplayDocument } from "@core/types/site/SiteGameDisplayDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";

export const initSiteGames = async () => {
  // if (await Database.hasCollection("site-games")) {
  //   await Database.collection("site-games").drop();
  //   await Database.createCollection("site-games", {});
  // }
  if (!(await Database.hasCollection("site-games"))) {
    await Database.createCollection("site-games", {});
  }
  var indexExist = await Database.collection("site-games").indexExists("name");

  if (!indexExist) {
    await Database.collection("site-games").createIndex({ name: 1 }, { unique: true });
  }

  await Database.collection("site-games")
    .insertMany(gameOptions, { ordered: true })
    .then((result) => {})
    .catch((err) => {
      if (err.code === 11000) {
        console.log("Duplicate name found, skipping duplicates.");
      } else {
        console.log("Error:", err);
      }
    });
};

const gameOptions: SiteGameDisplayDocument[] = [
  {
    category: "original",
    description: "",
    featured: true,
    name: "crash",
    timestamp: new Date(),
  },
  {
    category: "original",
    description: "",
    featured: true,
    name: "duel",
    timestamp: new Date(),
  },
  {
    category: "original",
    description: "",
    featured: false,
    name: "dice",
    timestamp: new Date(),
  },
  {
    category: "original",
    description: "",
    featured: false,
    name: "limbo",
    timestamp: new Date(),
  },
  {
    category: "original",
    description: "",
    featured: false,
    name: "blackjack",
    timestamp: new Date(),
  },
  {
    category: "original",
    description: "",
    featured: false,
    name: "mines",
    timestamp: new Date(),
  },
  {
    category: "original",
    description: "",
    featured: false,
    name: "cases",
    timestamp: new Date(),
  },
  {
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
    category: "slots",
    description: "",
    featured: false,
    name: "slots",
    timestamp: new Date(),
  },
  {
    category: "live_casino",
    description: "",
    featured: false,
    name: "live_casino",
    timestamp: new Date(),
  },
  {
    category: "game_shows",
    description: "",
    featured: false,
    name: "game_shows",
    timestamp: new Date(),
  },
];
