import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Http } from "@client/services/http";

export function getGemCase(data: { slug: string }): Promise<{
  chest: ChestDocument;
  gemCost: number;
}> {
  return Http.post("/rewards/get-gem-case", data);
}
