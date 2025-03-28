import { TypedEventEmitter, Utility } from "@core/services/utility";
import { Intimal } from "@core/services/intimal";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Site } from "#app/services/site";
import { games } from "@core/services/site/Site";

let instance: FeedManager;

export function feedManager() {
  if (!instance) {
    instance = new FeedManager();
  }
  return instance;
}

type ScopeMap = {
  all: Record<string, SiteBetDocument[]>;
  highroller: Record<string, SiteBetDocument[]>;
  lucky: Record<string, SiteBetDocument[]>;
};

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (scope: SiteBetScope, document: SiteBetDocument) => void;
}> {
  options = [...games, "all"];

  private _log: ScopeMap = {
    all: {},
    highroller: {},
    lucky: {},
  };
  private readonly _queues = {
    all: [],
    highroller: [],
    lucky: [],
  };
  private _stream;
  private _initialized;

  constructor() {
    super();
    for (const name of this.options) {
      let sanitizedName: string = this.sanitizeGameName(name);
      this._log["all"][sanitizedName] = [];
      this._log["highroller"][sanitizedName] = [];
      this._log["lucky"][sanitizedName] = [];
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

    const betsByGame = await this.getSiteBets();

    // Retreive Bets by Game
    // Place bets in logs by game,
    //  _id is the game name, documents is the game data
    if (betsByGame) {
      for (let bet of betsByGame) {
        this._log["all"][bet._id] = bet.documents;
      }
    }

    const threshold = await this.highrollerThreshold();
    this._log["highroller"]["all"] = await Database.collection("site-bets")
      .find(
        {
          betAmount: { $gte: threshold },
        },
        {
          limit: Site.betLogSize,
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    const highRollerByGameResults = await this.getSiteBets(undefined, true, false);
    if (highRollerByGameResults) {
      for (let bet of highRollerByGameResults) {
        this._log["highroller"][bet._id] = bet.documents;
      }
    }

    const luckyThreshold = await this.luckyThreshold();
    this._log["lucky"]["all"] = await Database.collection("site-bets")
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

    const luckyByGameResults = await this.getSiteBets(undefined, false, true);
    if (luckyByGameResults) {
      for (let bet of luckyByGameResults) {
        this._log["lucky"][bet._id] = bet.documents;
      }
    }

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: SiteBetDocument) {
    const queues = this._queues;
    const highrollerThreshold = await this.highrollerThreshold();
    const luckyThreshold = await this.luckyThreshold();

    queues["all"].unshift(document);
    if (queues["all"].length > Site.betLogSize) {
      queues["all"].length = Site.betLogSize;
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
      if (scope == "all" || scope == "highroller" || scope == "lucky") {
        let document = queue.pop();
        if (document) {
          const allLength = this._log[scope]["all"].unshift(document);
          if (allLength > Site.betLogSize) {
            this._log[scope]["all"].length = Site.betLogSize;
          }

          const sanitizedName = this.sanitizeGameName(document.game);
          const specificGameLogLength = this._log[scope][sanitizedName].unshift(document);
          if (specificGameLogLength > Site.betLogSize) {
            this._log[scope][sanitizedName].length = Site.betLogSize;
          }
          this.emit("insert", scope, document);
        }
      }
    }
  }
  async getSiteBets(
    user_id?: string = undefined,
    highroller: boolean = false,
    lucky: boolean = false,
  ) {
    const highrollerThreshold = await this.highrollerThreshold();
    const luckyThreshold = await this.luckyThreshold();
    let query = [];
    let match = {};

    if (user_id) {
      match["user.id"] = user_id;
    }

    if (highroller) {
      match.betAmount = { $gte: highrollerThreshold };
    }

    if (lucky) {
      match.wonAmount = { $gte: luckyThreshold };
    }

    if (Object.keys(match).length > 0) {
      query.push({ $match: match });
    }

    query.push(
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
    );
    const results = await Database.collection("site-bets").aggregate(query).toArray();

    return results;
  }

  sanitizeGameName = (name: string): string => {
    return name == "case-battles" ? "case_battles" : name;
  };
}
