import { Http } from "@client/services/http";

export function requestExclusion(): Promise<void> {
  return Http.post("/users/request-exclusion");
}
