import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import config from "#server/config";
import LaunchDarkly from "launchdarkly-node-server-sdk";

const logger = getServerLogger({});
const { ldClientKey } = config;

export class LaunchDarklyService {
  private static _client = LaunchDarkly.init(ldClientKey);
  private static isConnected = false;

  // Ability to retrive Raw Client
  static get client() {
    if (!this.isConnected || !this.client) {
      throw new Error("Launch Darkly not initialized.");
    }
    return this._client;
  }

  static async initialize() {
    if (this.isConnected) {
      logger.info("Launch Darkly already initialized.");
    }

    this._client = await this._client.waitForInitialization();
    logger.info("LaunchDarkly SDK initialized");
  }

  static async isFeatureEnabled(userId: string, flagKey: string): Promise<boolean> {
    const user = { kind: "user", key: userId }; // minimum required

    return await this._client.variation(flagKey, user, false);
  }
}
