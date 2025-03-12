import { TypedEventEmitter } from "@core/services/utility";
import {
  SiteSettingId,
  SiteSettingObject,
  SiteSettingValue,
} from "@core/types/site/SiteSettingDocument";
import { Database } from "#server/services/database";

export class SettingsManager extends TypedEventEmitter<{
  initialized: () => void;
  change: (id: SiteSettingId, value: SiteSettingValue) => void;
}> {
  private readonly _cache = {} as SiteSettingObject;
  private _initialized = false;

  constructor() {
    super();
    this.init().catch(console.error);
  }

  async cache() {
    if (!this._initialized) {
      await new Promise((resolve) => this.once("initialized", resolve));
    }
    return this._cache as Readonly<SiteSettingObject>;
  }

  private async init() {
    await Database.manager.waitForInit();

    const stream = Database.createStream({
      collection: "site-settings",
      maxLogSize: 0,
    });

    const settings = this._cache as Record<string, any>;

    const documents = await Database.collection("site-settings")
      .find({})
      .toArray();

    for (const document of documents) {
      settings[document._id] = document.value;
    }

    stream.on("insert", (document) => {
      settings[document._id] = document.value;

      this.emit("change", document._id, document.value);
    });

    stream.on("update", (update) => {
      const fields = update.updatedFields;

      if (fields.value === undefined) {
        return;
      }

      settings[update.documentId] = fields.value;

      this.emit(
        "change",
        update.documentId as SiteSettingId,
        fields.value as SiteSettingValue,
      );
    });

    this._initialized = true;

    this.emit("initialized");
  }
}
