import type { LimboRoll, LimboFeedRoll } from "./LimboRoll";

export interface LimboInitialState {
  history: LimboRoll[];
  feed: LimboFeedRoll[];
}
