import { Http } from "@client/services/http";
import { DiceResult } from "@core/types/dice/DiceResult";

export function getCrashResults(data: { limit: number; page: number }): Promise<{
  results: DiceResult[];
  total: number;
}> {
  return Http.post("/fairness/get-crash-results", data);
}
