import { Http } from "@client/services/http";

export function claim(data: { claimId: string }): Promise<void> {
  return Http.post("/rewards/claim", data);
}
