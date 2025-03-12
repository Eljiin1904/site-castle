import { ChestWithReport } from "@core/types/chests/ChestDocument";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Http } from "@client/services/http";

export function getReports(data: {
  searchText: string | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  kind: ChestKind;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  chests: ChestWithReport[];
}> {
  return Http.post("/chests/get-reports", data);
}
