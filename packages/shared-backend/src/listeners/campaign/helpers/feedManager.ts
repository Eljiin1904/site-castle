import { TypedEventEmitter } from "@core/services/utility";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { ticketStream } from "./ticketStream";
import { UserCampaigns } from "@core/types/users/UserCampaigns";

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: UserCampaigns) => void;
}> {
  private _log: UserCampaigns[] = [];
  private readonly _queue: UserCampaigns[] = [];
  private _initialized = false;

  constructor() {
    super();

    System.tryCatch(this.init.bind(this))();

    ticketStream.on("insert", System.tryCatch(this.onInsert.bind(this)));

    setInterval(System.tryCatch(this.onInterval.bind(this)), 600);
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

    this._log = await Database.collection("user-campaigns")
      .find(
        {},
        {
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: UserCampaigns) {
    
    this._queue.unshift(document);
  }

  private async onInterval() {
    const document = this._queue.pop();

    if (document) {
      this.emit("insert", document);
    }
  }
}

export const feedManager = new FeedManager();
