import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Http } from "@client/services/http";

export function getCase(data: { slug: string }): Promise<{
  chest: ChestDocument;
}> {
  return Http.post("/cases/get-case", data);
}
