import { Http } from "@client/services/http";
import { DiceResult } from "@core/types/dice/DiceResult";

export function getDiceResults(data: { limit: number; page: number }): Promise<{
  results: DiceResult[];
}> {
  return Http.post("/fairness/get-dice-results", data);
}
