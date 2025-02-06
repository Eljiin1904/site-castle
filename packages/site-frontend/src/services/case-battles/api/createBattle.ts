import { CaseBattleMode } from "@core/types/case-battles/CaseBattleMode";
import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";
import { Http } from "@client/services/http";

export function createBattle(data: {
  mode: CaseBattleMode;
  chests: { id: string; count: number }[];
  modifiers: CaseBattleModifier[];
  betToken: string | undefined;
}): Promise<{
  battleId: string;
}> {
  return Http.post("/case-battles/create-battle", data);
}
