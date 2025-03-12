import { TypedEventEmitter } from "@core/services/utility";
import { SiteActivityDocument } from "@core/types/site/SiteActivityDocument";
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

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: SiteActivityDocument) => void;
}> {
  private _log: SiteActivityDocument[] = [];
  private readonly _queue: SiteActivityDocument[] = [];
  private _stream;
  private _initialized;

  constructor() {
    super();

    this._stream = Database.createStream({
      collection: "site-activity",
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

  private async init() {
    await Database.manager.waitForInit();

    this._log = await Database.collection("site-activity")
      .find(
        {},
        {
          limit: Site.activityLogSize,
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: SiteActivityDocument) {
    this._queue.unshift(document);

    if (this._queue.length > Site.activityLogSize) {
      this._queue.length = Site.activityLogSize;
    }
  }

  private async onInterval() {
    const document = this._queue.pop();

    if (document) {
      const length = this._log.unshift(document);

      if (length > Site.activityLogSize) {
        this._log.length = Site.activityLogSize;
      }

      this.emit("insert", document);
    }
  }
}
