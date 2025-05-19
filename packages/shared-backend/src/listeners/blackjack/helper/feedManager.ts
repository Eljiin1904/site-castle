import { TypedEventEmitter } from "#core/services/utility";
import { Database } from "#server/services/database";
import { System } from "#server/services/system";
import { eventStream } from "./eventStream";
import { Blackjack } from "#server/services/blackjack";
import { BlackjackEventDocument } from "#core/types/blackjack/BlackjackEventDocument";

type FeedItem = BlackjackEventDocument;

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: FeedItem) => void;
}> {
  private _log: FeedItem[] = [];
  private readonly _queue: FeedItem[] = [];
  private _initialized = false;

  constructor() {
    super();

    System.tryCatch(this.init.bind(this))();

    eventStream.on("insert", System.tryCatch(this.onInsert.bind(this)));

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

    this._log = await Database.collection("blackjack-events")
      .find(
        {},
        {
          sort: { timestamp: -1 },
          limit: Blackjack.feedLogSize,
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: FeedItem) {
    this._queue.unshift(document);

    if (this._queue.length > Blackjack.feedLogSize) {
      this._queue.length = Blackjack.feedLogSize;
    }
  }

  private async onInterval() {
    const document = this._queue.pop();

    if (document) {
      const length = this._log.unshift(document);

      if (length > Blackjack.feedLogSize) {
        this._log.length = Blackjack.feedLogSize;
      }

      this.emit("insert", document);
    }
  }
}

export const feedManager = new FeedManager();
