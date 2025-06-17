import { Http } from "@client/services/http";
import { ChestGameResult } from "@core/types/chests/ChestGameResult";
import { ChestKind } from "@core/types/chests/ChestKind";

export function getCaseGameResults(data: {
  kind: ChestKind;
  limit: number;
  page: number;
}): Promise<{
  results: ChestGameResult[];
  total: number;
}> {
  return Http.post("/fairness/get-case-game-results", data);
}
