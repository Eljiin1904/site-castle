import { TypedEventEmitter } from "@core/services/utility";
import { ChestDropDocument } from "@core/types/chests/ChestDropDocument";
import { Chests } from "@server/services/chests";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { SiteServer } from "#app/types/sockets/SiteServer";

const stream = Database.createStream({
  collection: "chest-drops",
  maxLogSize: 0,
});

stream.setMaxListeners(1000);

class FeedManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: ChestDropDocument) => void;
}> {
  private readonly _chestId;
  private _log: ChestDropDocument[] = [];
  private readonly _queue: ChestDropDocument[] = [];
  private _initialized = false;

  constructor(chestId: string) {
    super();
    this._chestId = chestId;

    System.tryCatch(this.init.bind(this))();

    stream.on("insert", System.tryCatch(this.onInsert.bind(this)));

    setInterval(System.tryCatch(this.onInterval.bind(this)), 600);
  }

  get log() {
    return this._log;
  }

  get chestId() {
    return this._chestId;
  }

  waitForInit() {
    if (this._initialized) {
      return;
    }
    return new Promise((resolve) => this.once("initialized", resolve));
  }

  private async init() {
    await Database.manager.waitForInit();

    this._log = await Database.collection("chest-drops")
      .find(
        {
          "chest.id": this.chestId,
        },
        {
          sort: { timestamp: -1 },
          limit: Chests.dropLogSize,
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: ChestDropDocument) {
    if (document.chest.id !== this.chestId) {
      return;
    }

    this._queue.unshift(document);

    if (this._queue.length > Chests.dropLogSize) {
      this._queue.length = Chests.dropLogSize;
    }
  }

  private async onInterval() {
    const document = this._queue.pop();

    if (document) {
      const length = this._log.unshift(document);

      if (length > Chests.dropLogSize) {
        this._log.length = Chests.dropLogSize;
      }

      this.emit("insert", document);
    }
  }
}

const managers: Record<string, FeedManager> = {};

export function getManager(io: SiteServer, chestId: string) {
  let manager = managers[chestId];

  if (!manager) {
    manager = new FeedManager(chestId);

    managers[chestId] = manager;

    manager.on(
      "insert",
      System.tryCatch(async (document) => {
        io.sockets
          .in(`chest-drop_${document.chest.id}`)
          .emit("chest-drops-stream", {
            type: "insert",
            document,
          });
      }),
    );
  }

  return manager;
}
