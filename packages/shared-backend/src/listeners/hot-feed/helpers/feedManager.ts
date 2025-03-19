import { TypedEventEmitter } from "@core/services/utility";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { HotSiteGameDetails } from "@core/types/site/HotSiteGame";

let instance: FeedManager;

export function feedManager() {
  if (!instance) {
    instance = new FeedManager();
  }
  return instance;
}

type ScopeMap = {
  hot: HotSiteGameDetails[];
};

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  update: (document: HotSiteGameDetails[]) => void;
}> {
  private _log: ScopeMap = {
    hot: [],
  };
  private readonly _queues: ScopeMap = {
    hot: [],
  };

  private _initialized;

  constructor() {
    super();

    this._initialized = false;

    System.tryCatch(this.init.bind(this))();

    // Add Config to dynamically set interval to 2s in dev and a hour otherwise
    const interval = process.env.NODE_ENV == "development" ? 2500 : 3600000;
    setInterval(System.tryCatch(this.onInterval.bind(this)), interval);
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

  private async init() {
    await Database.manager.waitForInit();
    this._log["hot"] = [];

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInterval() {
    const hotGamesResult = await this.getHotGames();
    let result: HotSiteGameDetails[] = [];
    const gameNames = [];
    for (const hotGame of hotGamesResult) {
      result.push({
        rank: hotGame.rank,
        game: hotGame._id,
      });
      gameNames.push(hotGame._id);
    }
    // If length of hot games less than 6, add "placeholder" games
    // Add featured games first if not apart of "hot" games already
    // Else add by newest games
    if (hotGamesResult.length <= 6) {
      const rankAmountNeeded = 6;
      let hotGameAmountNeeded = rankAmountNeeded - hotGamesResult.length;
      const gameOptions = await Database.collection("site-games")
        .find()
        .sort({ timestamp: -1, featured: -1 })
        .toArray();

      for (const gameOption of gameOptions) {
        if (hotGameAmountNeeded == 0) break;
        if (!gameNames.includes(gameOption.name)) {
          result.push({ rank: gameNames.length + 1, game: gameOption.name });
          hotGameAmountNeeded -= 1;
          gameNames.push(gameOption.name);
        }
      }
    }

    this._log["hot"] = result;
    this.emit("update", result);
  }

  private getHotGames = async () => {
    // Get the current time
    const now = new Date();

    // Get the time one hour ago (subtract 1 hour in milliseconds)
    const lastHourStart = new Date(now.getTime() - 60 * 60 * 1000); // 60 * 60 * 1000 = 1 hour in milliseconds
    const aggregationPipe = [
      {
        // Only match documents in the last hour
        $match: {
          timestamp: { $gte: lastHourStart },
        },
      },
      {
        // Extract needed fields
        $project: {
          _id: 1,
          wonAmount: 1,
          timestamp: 1,
          game: 1,
          hour: { $dateToString: { format: "%Y-%m-%dT%H", date: "$timestamp" } },
        },
      },
      {
        // Group by game type
        $group: {
          _id: "$game",
          totalWonAmount: { $sum: "$wonAmount" },
        },
      },
      {
        $sort: { totalWonAmount: -1 },
      },
      {
        // Add a rank based on totalWonAmount in descending order
        $setWindowFields: {
          sortBy: { totalWonAmount: -1 },
          output: {
            rank: { $rank: {} },
          },
        },
      },
      {
        $limit: 6,
      },
    ];

    const hotGamesResult: { rank: number; _id: string; totalWonAmount: number }[] =
      await Database.collection("site-bets").aggregate(aggregationPipe).toArray();

    return hotGamesResult;
  };
}
