import { Http } from "@client/services/http";

export function rotateSeeds(data: { newClientSeed: string }): Promise<void> {
  return Http.post("/fairness/rotate-seeds", data);
}
