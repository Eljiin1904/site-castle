import config from "#server/config";
import { dbNames } from "../constants/dbNames";
import { manager } from "../constants/manager";

export function db(databaseName?: dbNames) {
  return manager.client.db(databaseName || config.env);
}
