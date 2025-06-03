import { CaseBattleMode } from "#core/types/case-battles/CaseBattleMode";
import { CaseBattleModifier } from "#core/types/case-battles/CaseBattleModifier";

interface ModifierInfo {
  label: string;
  description: string;
  modes: CaseBattleMode[];
}

export function getModifierInfo(modifier: CaseBattleModifier): ModifierInfo {
  switch (modifier) {
    case "crazy":
      return {
        label: "Crazy Mode",
        description: "The team with the lowest total tokens wins.",
        modes: ["1v1", "3-way", "4-way", "2v2"],
      };
    case "first-draw":
      return {
        label: "First Draw",
        description: "The first case's item decides the winner.",
        modes: ["1v1", "3-way", "4-way", "2v2"],
      };
    case "final-draw":
      return {
        label: "Final Draw",
        description: "The last case's item decides the winner.",
        modes: ["1v1", "3-way", "4-way", "2v2"],
      };
    case "friends-only":
      return {
        label: "Friends Only",
        description: "Anyone can spectate, but only players with an invitation can join.",
        modes: ["1v1", "3-way", "4-way", "2v2", "2p", "3p", "4p"],
      };
    case "private":
      return {
        label: "Private",
        description: "Only players with an invitation can spectate and join.",
        modes: ["1v1", "3-way", "4-way", "2v2", "2p", "3p", "4p"],
      };
  }
}
