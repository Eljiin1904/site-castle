import { AdventInfo } from "@core/types/rewards/AdventInfo";
import { Http } from "@client/services/http";

export function getAdventInfo(): Promise<{ info: AdventInfo }> {
  return Http.post("/rewards/get-advent-info");
}
