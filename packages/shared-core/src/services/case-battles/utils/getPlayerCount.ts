import { CaseBattleMode } from "#core/types/case-battles/CaseBattleMode";

export function getPlayerCount(mode: CaseBattleMode): number {
  switch (mode) {
    case "1v1":
      return 2;
    case "3-way":
      return 3;
    case "4-way":
      return 4;
    case "2v2":
      return 4;
    case "2p":
      return 2;
    case "3p":
      return 3;
    case "4p":
      return 4;
  }
}
