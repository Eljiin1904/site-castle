import { Http } from "@client/services/http";
import { DoubleResult } from "@core/types/double/DoubleResults";

export function getDoubleResults(data: {
  limit: number;
  page: number;
}): Promise<{
  results: DoubleResult[];
  total: number;
}> {
  return Http.post("/fairness/get-double-results", data);
}
