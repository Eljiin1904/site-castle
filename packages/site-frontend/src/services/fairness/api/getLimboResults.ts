import { Http } from "@client/services/http";
import { LimboResult } from "@core/types/limbo/LimboResult";

export function getLimboResults(data: {
  limit: number;
  page: number;
}): Promise<{
  results: LimboResult[];
}> {
  return Http.post("/fairness/get-limbo-results", data);
}
