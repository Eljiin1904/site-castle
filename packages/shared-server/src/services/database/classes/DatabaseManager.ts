/* eslint-disable quote-props */
import { MongoClient } from "mongodb";
import { TypedEventEmitter } from "@core/services/utility";
import config from "#server/config";

export class DatabaseManager extends TypedEventEmitter<{
  initialized: () => void;
}> {
  private _initialized = false;
  private _client?: MongoClient;

  private readonly _clients: Record<string, MongoClient> = {};

  get client() {
    if (!this._client) {
      throw new Error("Database not initialized.");
    }
    return this._client;
  }

  waitForInit() {
    if (this._initialized) {
      return;
    }
    return new Promise((resolve) => this.once("initialized", resolve));
  }

  async init() {
    let { dbUri } = config;

    // reset to look at test containers if running in dev
    if (config.env.startsWith("dev")) {
      dbUri = process.env.MONGO_URI + "/?directConnection=true";
    }

    const client = new MongoClient(dbUri, {
      maxPoolSize: 500,
    });

    this._client = client;

    try {
      await client.connect();
    } catch (e) {
      console.error("Database init failed.");
      throw e;
    }

    this._initialized = true;

    this.emit("initialized");
  }
}
