import { Http } from "@client/services/http";
import { CrashResult } from "@core/types/crash/CrashResult";

export function getCrashResults(data: { limit: number; page: number }): Promise<{
  results: CrashResult[];
  total: number;
}> {
  return Http.post("/fairness/get-crash-results", data);
}
