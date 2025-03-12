import { cache } from "../constants/cache";
import { load } from "./load";

export function play(id: string, volume: number) {
  if (!volume) {
    return;
  }

  if (
    "userActivation" in navigator &&
    !navigator.userActivation.hasBeenActive
  ) {
    return;
  }

  if (!cache[id]) {
    load(id);
  }

  cache[id].play();
}
