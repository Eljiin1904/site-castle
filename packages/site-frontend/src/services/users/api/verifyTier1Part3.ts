import { Http } from "@client/services/http";

export function verifyTier1Part3(data: { occupation: string }): Promise<void> {
  return Http.post("/users/verify-tier-1-part-3", data);
}
