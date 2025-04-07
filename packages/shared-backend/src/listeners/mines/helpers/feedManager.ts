import { TypedEventEmitter } from "@core/services/utility";
import { MinesEventDocument } from "@core/types/mines/MinesEventDocument";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Mines } from "@server/services/mines";
import { eventStream } from "./eventStream";

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: MinesEventDocument) => void;
}> {
  private _log: MinesEventDocument[] = [];
  private readonly _queue: MinesEventDocument[] = [];
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

    this._log = await Database.collection("mines-events")
      .find(
        {},
        {
          sort: { timestamp: -1 },
          limit: Mines.feedLogSize,
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: MinesEventDocument) {
    this._queue.unshift(document);

    if (this._queue.length > Mines.feedLogSize) {
      this._queue.length = Mines.feedLogSize;
    }
  }

  private async onInterval() {
    const document = this._queue.pop();

    if (document) {
      const length = this._log.unshift(document);

      if (length > Mines.feedLogSize) {
        this._log.length = Mines.feedLogSize;
      }

      this.emit("insert", document);
    }
  }
}

export const feedManager = new FeedManager();
