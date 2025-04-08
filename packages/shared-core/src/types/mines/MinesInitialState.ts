import type { MinesEventDocument } from "./MinesEventDocument";
import type { MinesGameState } from "./MinesGameState";
import { MinesResult } from "./MinesResult";

export interface MinesInitialState {
  game: MinesGameState | undefined;
  history: MinesResult[];
  feed: MinesEventDocument[];
}
