import { Http } from "@client/services/http";

export function requestMinKycTier(data: { userId: string; minTier: number }) {
  return Http.post("/users/request-min-kyc-tier", data);
}
