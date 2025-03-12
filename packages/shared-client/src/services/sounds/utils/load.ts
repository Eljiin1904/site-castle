import { Howl } from "howler";
import config from "#client/config";
import { cache } from "../constants/cache";

export function load(...ids: string[]) {
  for (const id of ids) {
    if (id in cache) {
      continue;
    }

    const sound = new Howl({
      src: `${config.staticURL}/audio/${id}.mp3`,
    });

    cache[id] = sound;
  }
}
