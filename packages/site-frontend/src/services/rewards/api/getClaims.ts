import { RewardClaimDocument } from "@core/types/rewards/RewardClaimDocument";
import { Http } from "@client/services/http";

export function getClaims(data: { limit: number; page: number }): Promise<{
  claims: RewardClaimDocument[];
}> {
  return Http.post("/rewards/get-claims", data);
}
