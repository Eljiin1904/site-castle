import { TypedEventEmitter } from "@core/services/utility";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Dice } from "@server/services/dice";
import { ticketStream } from "./ticketStream";

export class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: DiceTicketDocument) => void;
}> {
  private _log: DiceTicketDocument[] = [];
  private readonly _queue: DiceTicketDocument[] = [];
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

    this._log = await Database.collection("dice-tickets")
      .find(
        {
          betAmount: { $gt: 0 },
        },
        {
          sort: { timestamp: -1 },
          limit: Dice.feedLogSize,
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: DiceTicketDocument) {
    if (document.betAmount === 0) {
      return;
    }

    this._queue.unshift(document);

    if (this._queue.length > Dice.feedLogSize) {
      this._queue.length = Dice.feedLogSize;
    }
  }

  private async onInterval() {
    const document = this._queue.pop();

    if (document) {
      const length = this._log.unshift(document);

      if (length > Dice.feedLogSize) {
        this._log.length = Dice.feedLogSize;
      }

      this.emit("insert", document);
    }
  }
}

export const feedManager = new FeedManager();
