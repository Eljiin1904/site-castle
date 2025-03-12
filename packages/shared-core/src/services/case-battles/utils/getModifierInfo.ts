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
  }
}
