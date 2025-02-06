import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Http } from "@client/services/http";

export function getLevelCase(data: { slug: string }): Promise<{
  chest: ChestDocument;
}> {
  return Http.post("/rewards/get-level-case", data);
}
