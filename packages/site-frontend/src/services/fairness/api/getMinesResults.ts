import { MinesResult } from "@core/types/mines/MinesResult";
import { Http } from "@client/services/http";

export function getMinesResults(data: { limit: number; page: number }): Promise<{
  results: MinesResult[];
  total: number;
}> {
  return Http.post("/fairness/get-mines-results", data);
}
