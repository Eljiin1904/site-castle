import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Http } from "@client/services/http";

export function getLevelCases(): Promise<{
  chests: ChestDocument[];
}> {
  return Http.post("/rewards/get-level-cases");
}
