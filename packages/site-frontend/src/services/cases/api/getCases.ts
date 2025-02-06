import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Http } from "@client/services/http";

export function getCases(data: {
  searchText: string | undefined;
  priceIndex: number;
  sortIndex: number;
  limit: number;
  page: number;
  withItems?: boolean;
}): Promise<{
  chests: ChestDocument[];
}> {
  return Http.post("/cases/get-cases", data);
}
