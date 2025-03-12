import { TypedEventEmitter, Utility } from "@core/services/utility";
import { Intimal } from "@core/services/intimal";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Site } from "#app/services/site";

let instance: FeedManager;

export function feedManager() {
  if (!instance) {
    instance = new FeedManager();
  }
  return instance;
}

type ScopeMap = {
  all: SiteBetDocument[];
  highroller: SiteBetDocument[];
};

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (scope: SiteBetScope, document: SiteBetDocument) => void;
}> {
  private _log: ScopeMap = {
    all: [],
    highroller: [],
  };
  private readonly _queues: ScopeMap = {
    all: [],
    highroller: [],
  };
  private _stream;
  private _initialized;

  constructor() {
    super();

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

  private async init() {
    await Database.manager.waitForInit();

    this._log["all"] = await Database.collection("site-bets")
      .find(
        {},
        {
          limit: Site.betLogSize,
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    const threshold = await this.highrollerThreshold();

    this._log["highroller"] = await Database.collection("site-bets")
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

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: SiteBetDocument) {
    const queues = this._queues;
    const threshold = await this.highrollerThreshold();

    queues["all"].unshift(document);

    if (queues["all"].length > Site.betLogSize) {
      queues["all"].length = Site.betLogSize;
    }

    if (document.betAmount >= threshold) {
      queues["highroller"].unshift(document);

      if (queues["highroller"].length > Site.betLogSize) {
        queues["highroller"].length = Site.betLogSize;
      }
    }

    this.emit("insert", "user", document);
  }

  private async onInterval() {
    for (const [scope, queue] of Utility.entries(this._queues)) {
      const document = queue.pop();

      if (document) {
        const length = this._log[scope].unshift(document);

        if (length > Site.betLogSize) {
          this._log[scope].length = Site.betLogSize;
        }

        this.emit("insert", scope, document);
      }
    }
  }
}
