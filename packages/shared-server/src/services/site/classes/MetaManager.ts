import { TypedEventEmitter } from "@core/services/utility";
import {
  SiteMetaId,
  SiteMetaObject,
  SiteMetaValue,
} from "@core/types/site/SiteMetaDocument";
import { Database } from "#server/services/database";

export class MetaManager extends TypedEventEmitter<{
  initialized: () => void;
  change: (key: SiteMetaId, value: SiteMetaValue) => void;
}> {
  private readonly _cache = {} as SiteMetaObject;
  private _initialized = false;

  constructor() {
    super();
    this.init().catch(console.error);
  }

  async cache() {
    if (!this._initialized) {
      await new Promise((resolve) => this.once("initialized", resolve));
    }
    return this._cache as Readonly<SiteMetaObject>;
  }

  private async init() {
    await Database.manager.waitForInit();

    const stream = Database.createStream({
      collection: "site-meta",
      maxLogSize: 0,
    });

    const cache = this._cache as Record<string, any>;

    const documents = await Database.collection("site-meta").find({}).toArray();

    for (const document of documents) {
      cache[document._id] = document.value;
    }

    stream.on("insert", (document) => {
      cache[document._id] = document.value;

      this.emit("change", document._id, document.value);
    });

    stream.on("update", (update) => {
      const fields = update.updatedFields;

      if (fields.value === undefined) {
        return;
      }

      cache[update.documentId] = fields.value;

      this.emit(
        "change",
        update.documentId as SiteMetaId,
        fields.value as SiteMetaValue,
      );
    });

    this._initialized = true;

    this.emit("initialized");
  }
}
