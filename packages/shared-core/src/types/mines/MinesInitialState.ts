import type { MinesEventDocument } from "./MinesEventDocument";
import type { MinesGameState } from "./MinesGameState";

export interface MinesInitialState {
  game: MinesGameState | undefined;
  feed: MinesEventDocument[];
}
