import type { DiceRoll, DiceFeedRoll } from "./DiceRoll";

export interface DiceInitialState {
  history: DiceRoll[];
  feed: DiceFeedRoll[];
}
