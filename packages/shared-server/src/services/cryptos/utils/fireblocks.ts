import { FireblocksSDK } from "fireblocks-sdk";
import config from "#server/config";

let instance: FireblocksSDK | undefined;

export function fireblocks() {
  if (!instance) {
    instance = new FireblocksSDK(
      config.fireblocksSecret.replace(/\\n/g, "\n"),
      config.fireblocksApiKey,
    );
  }
  return instance;
}
