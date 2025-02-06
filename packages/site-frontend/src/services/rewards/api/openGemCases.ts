import { ChestRoll } from "@core/types/chests/ChestRoll";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Http } from "@client/services/http";

export function openGemCases(data: {
  chestId: string;
  openCount: number;
  speed: ChestSpeed;
  specialEnabled: boolean;
}): Promise<{ rolls: ChestRoll[] }> {
  return Http.post("/rewards/open-gem-cases", data);
}
