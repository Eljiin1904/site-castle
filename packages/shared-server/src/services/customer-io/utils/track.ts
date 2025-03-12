import { TrackClient } from "customerio-node";
import config from "#server/config";

let instance: TrackClient | undefined;

export function track() {
  if (!instance) {
    instance = new TrackClient(config.cioSiteId, config.cioTrackKey);
  }
  return instance;
}
