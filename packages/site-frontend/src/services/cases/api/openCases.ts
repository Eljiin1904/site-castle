import { ChestRoll } from "@core/types/chests/ChestRoll";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Http } from "@client/services/http";

export function openCases(data: {
  chestId: string;
  openCount: number;
  speed: ChestSpeed;
  specialEnabled: boolean;
  betToken: string | undefined;
}): Promise<{ rolls: ChestRoll[] }> {
  return Http.post("/cases/open-cases", data);
}
