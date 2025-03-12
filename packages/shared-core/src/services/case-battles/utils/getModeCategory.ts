import { CaseBattleMode } from "#core/types/case-battles/CaseBattleMode";
import { CaseBattleModeCategory } from "#core/types/case-battles/CaseBattleModeCategory";

export function getModeCategory(mode: CaseBattleMode): CaseBattleModeCategory {
  switch (mode) {
    case "1v1":
      return "FFA Battle";
    case "3-way":
      return "FFA Battle";
    case "4-way":
      return "FFA Battle";
    case "2v2":
      return "Team Battle";
    case "2p":
      return "Group Unbox";
    case "3p":
      return "Group Unbox";
    case "4p":
      return "Group Unbox";
  }
}
