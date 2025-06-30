import { RaceState } from "@core/types/rewards/RaceState";
import { Http } from "@client/services/http";

export function getActiveRaces(): Promise<{
  state: RaceState[];
}> {
  return Http.post("/rewards/get-active-races");
}
