import { ChangeStreamDocument, Sort } from "mongodb";
import { Database } from "@core/services/database";
import {
  StreamKey,
  StreamSchema,
  StreamUpdate,
} from "@core/types/database/DatabaseStreamEvent";
import { TypedEventEmitter } from "@core/services/utility";
import { manager } from "../constants/manager";
import { collection } from "../utils/collection";

export interface StreamOptions<K extends StreamKey> {
  collection: K;
  maxLogSize: number;
  sort?: Sort;
}

export class DatabaseStream<K extends StreamKey> extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: StreamSchema<K>) => void;
  update: (update: StreamUpdate, document?: StreamSchema<K>) => void;
  delete: (documentId: string) => void;
}> {
  private _initialized = false;
  private readonly _options: StreamOptions<K>;
  private _log: StreamSchema<K>[] = [];

  constructor(options: StreamOptions<K>) {
    super();
    this._options = options;
    this.init().catch(console.error);
  }

  waitForInit() {
    if (this._initialized) {
      return;
    }
    return new Promise((resolve) => this.once("initialized", resolve));
  }

  get log() {
    return this._log;
  }

  private async init() {
    await manager.waitForInit();

    if (this._options.maxLogSize > 0) {
      this._log = await collection(this._options.collection)
        .find<StreamSchema<K>>(
          {
            hidden: { $exists: false },
          },
          {
            sort: this._options.sort,
            limit: this._options.maxLogSize,
          },
        )
        .toArray();
    }

    this._initialized = true;
    this.emit("initialized");
    this.watch();
  }

  private watch() {
    const changeStream = collection(this._options.collection).watch<
      StreamSchema<K>
    >();

    changeStream.on("change", (e) => {
      if (e.operationType === "insert") {
        this.onInsert(e);
      } else if (e.operationType === "update") {
        this.onUpdate(e);
      } else if (e.operationType === "delete") {
        this.onDelete(e);
      }
    });

    changeStream.on("error", (err) => {
      console.error(err.message);
      changeStream.removeAllListeners();
      this.watch();
    });
  }

  private onInsert(
    e: ChangeStreamDocument<StreamSchema<K>> & { operationType: "insert" },
  ) {
    try {
      this._log.unshift(e.fullDocument);

      if (this._log.length > this._options.maxLogSize) {
        this._log.length = this._options.maxLogSize;
      }

      this.emit("insert", e.fullDocument);
    } catch (e) {
      console.error(e);
    }
  }

  private onUpdate(
    e: ChangeStreamDocument<StreamSchema<K>> & { operationType: "update" },
  ) {
    try {
      const documentId = e.documentKey._id;
      const updatedFields = e.updateDescription.updatedFields ?? {};
      const removedFields = e.updateDescription.removedFields ?? [];
      const documentIndex = this._log.findIndex((x) => x._id === documentId);

      if (documentIndex !== -1) {
        if ("hidden" in updatedFields) {
          this._log.splice(documentIndex, 1);
        } else {
          Database.updateDocument({
            document: this._log[documentIndex],
            updatedFields,
            removedFields,
          });
        }
      }

      const update: StreamUpdate = {
        documentId,
        updatedFields,
        removedFields,
      };

      this.emit("update", update, this._log[documentIndex]);
    } catch (e) {
      console.error(e);
    }
  }

  private onDelete(
    e: ChangeStreamDocument<StreamSchema<K>> & { operationType: "delete" },
  ) {
    try {
      const id = e.documentKey._id;
      const index = this._log.findIndex((x) => x._id === id);

      if (index !== -1) {
        this._log.splice(index, 1);
      }

      this.emit("delete", id);
    } catch (e) {
      console.error(e);
    }
  }
}
