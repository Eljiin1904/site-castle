import { cache } from "../constants/cache";

export function updateVolume(id: string, volume: number) {
  if (!id || !volume) {
    return;
  }
  if (!cache[id]) {
    return;
  }
  cache[id].volume(volume);
}
