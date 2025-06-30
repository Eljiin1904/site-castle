import { RaceState } from "@core/types/rewards/RaceState";
import { Http } from "@client/services/http";

export function getActiveRace(data: { slug: string }): Promise<{
  state: RaceState;
}> {
  return Http.post("/rewards/get-active-race",data);
}
