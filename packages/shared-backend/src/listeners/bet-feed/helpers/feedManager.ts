import { TypedEventEmitter, Utility } from "@core/services/utility";
import { Intimal } from "@core/services/intimal";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Site } from "#app/services/site";
import { games } from "@core/services/site/Site";

let instance: FeedManager;

// Get name of each game and add a key that will hold 'all' bets
const options = [...games, "all"];

export function feedManager() {
  if (!instance) {
    instance = new FeedManager();
  }
  return instance;
}

type ScopeMap = {
  all: Record<string, SiteBetDocument[]>;
  highroller: SiteBetDocument[];
  lucky: SiteBetDocument[];
};

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (scope: SiteBetScope, document: SiteBetDocument) => void;
}> {
  private _log: ScopeMap = {
    all: {},
    highroller: [],
    lucky: [],
  };
  private readonly _queues: ScopeMap = {
    all: {},
    highroller: [],
    lucky: [],
  };
  private _stream;
  private _initialized;

  constructor() {
    super();
    for (const name of options) {
      this._log["all"][this.sanitizeGameName(name)] = [];
      this._queues["all"][this.sanitizeGameName(name)] = [];
    }
    this._stream = Database.createStream({
      collection: "site-bets",
      maxLogSize: 0,
    });

    this._initialized = false;

    System.tryCatch(this.init.bind(this))();

    this._stream.on("insert", System.tryCatch(this.onInsert.bind(this)));

    setInterval(System.tryCatch(this.onInterval.bind(this)), 500);
  }

  get log() {
    return this._log;
  }

  waitForInit() {
    if (this._initialized) {
      return;
    }
    return new Promise((resolve) => this.once("initialized", resolve));
  }

  async highrollerThreshold() {
    const { betHighrollerThreshold } = await Site.settings.cache();
    return Intimal.fromDecimal(betHighrollerThreshold);
  }

  async luckyThreshold() {
    const { betLuckyThreshold } = await Site.settings.cache();
    return Intimal.fromDecimal(betLuckyThreshold);
  }

  private async init() {
    await Database.manager.waitForInit();

    const betsByGame = await this.getSiteBets();

    // Retreive Bets by Game
    // Place bets in logs by game,
    //  _id is the game name, documents is the game data
    if (betsByGame) {
      for (let bet of betsByGame) {
        this._log["all"][bet._id] = bet.documents;
      }
    }

    // Retreive Latest Bets no matter the game type
    this._log["all"]["all"] = await Database.collection("site-bets")
      .find(
        {},
        {
          limit: Site.betLogSize,
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    const highrollerThreshold = await this.highrollerThreshold();

    this._log["highroller"] = await Database.collection("site-bets")
      .find(
        {
          betAmount: { $gte: highrollerThreshold },
        },
        {
          limit: Site.betLogSize,
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    const luckyThreshold = await this.luckyThreshold();

    this._log["lucky"] = await Database.collection("site-bets")
      .find(
        {
          wonAmount: { $gte: luckyThreshold },
        },
        {
          limit: Site.betLogSize,
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: SiteBetDocument) {
    const queues = this._queues;
    const highrollerThreshold = await this.highrollerThreshold();
    const luckyThreshold = await this.luckyThreshold();

    queues["all"][this.sanitizeGameName(document.game)].unshift(document);

    if (queues["all"][this.sanitizeGameName(document.game)].length > Site.betLogSize) {
      queues["all"][this.sanitizeGameName(document.game)].length = Site.betLogSize;
    }

    if (document.betAmount >= highrollerThreshold) {
      queues["highroller"].unshift(document);

      if (queues["highroller"].length > Site.betLogSize) {
        queues["highroller"].length = Site.betLogSize;
      }
    }

    if (document.wonAmount >= luckyThreshold) {
      queues["lucky"].unshift(document);

      if (queues["lucky"].length > Site.betLogSize) {
        queues["lucky"].length = Site.betLogSize;
      }
    }

    this.emit("insert", "user", document);
  }

  private async onInterval() {
    for (const [scope, queue] of Utility.entries(this._queues)) {
      let document;
      if (scope == "all") {
        for (const name of games) {
          document = queue[this.sanitizeGameName(name)]
            ? queue[this.sanitizeGameName(name)].pop()
            : undefined;
          if (document) {
            if (queue[name].length > Site.betLogSize) {
              queue[name].length = Site.betLogSize;
            }
            this.emit("insert", scope, document);
          }
        }
      } else {
        document = queue.pop();
        if (document) {
          const length = this._log[scope].unshift(document);
          if (length > Site.betLogSize) {
            this._log[scope].length = Site.betLogSize;
          }
        }
        if (document) this.emit("insert", scope, document);
      }
    }
  }

  private async getSiteBets() {
    const results = await Database.collection("site-bets")
      .aggregate([
        // Step 1: Sort the documents by game and created timestamp (descending for most recent)
        {
          $sort: {
            game: 1,
            timestamp: -1,
          },
        },

        // Step 2: Group by game name and collect results in an array
        {
          $group: {
            _id: "$game",
            documents: { $push: "$$ROOT" },
          },
        },

        // Step 3: Limit the results to Game Size
        {
          $project: {
            documents: { $slice: ["$documents", Site.betLogSize] },
          },
        },
      ])
      .toArray();

    return results;
  }

  sanitizeGameName = (name: string): string => {
    return name == "case-battles" ? "case_battles" : name;
  };
}
