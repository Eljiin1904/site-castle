import { APIClient } from "customerio-node";
import config from "#server/config";

let instance: APIClient | undefined;

export function api() {
  if (!instance) {
    instance = new APIClient(config.cioApiKey);
  }
  return instance;
}
