import { Http } from "@client/services/http";
import { CaseBattleResult } from "@core/types/case-battles/CaseBattleResult";

export function getCaseBattleResults(data: {
  limit: number;
  page: number;
}): Promise<{
  results: CaseBattleResult[];
}> {
  return Http.post("/fairness/get-case-battle-results", data);
}
