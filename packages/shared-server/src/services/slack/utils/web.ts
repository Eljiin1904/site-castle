import { WebClient } from "@slack/web-api";
import config from "#server/config";

let instance: WebClient | undefined;

export function web() {
  if (!instance) {
    instance = new WebClient(config.slackToken);
  }
  return instance;
}
