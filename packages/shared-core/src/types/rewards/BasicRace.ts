import type { RaceKind } from "./RaceKind";

export interface BasicRace {
  id: string;
  kind: RaceKind;
  displayName: string;
  slug: string;
}
