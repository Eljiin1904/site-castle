import { Http } from "@client/services/http";

export function extendExclusion(data: { timeIndex: number }): Promise<void> {
  return Http.post("/users/extend-exclusion", data);
}
