import { SiteActivityKind } from "#core/types/site/SiteActivityKind";

const kindMap: Record<SiteActivityKind, boolean> = {
  "advent-item": true,
  "case-battle-drop": true,
  "case-drop": true,
  "double-jackpot-win": true,
  "double-win": true,
  "dice-win": true,
  "limbo-win": true,
  "reward-boost": true,
  "reward-gem-case-drop": true,
  "reward-holiday-case-drop": true,
  "reward-level-case-drop": true,
};

export const activityKinds = Object.keys(kindMap) as SiteActivityKind[];
