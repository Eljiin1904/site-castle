import { SystemLogKind } from "@core/types/system/SystemLogKind";
import { SystemLogDocument } from "@core/types/system/SystemLogDocument";
import { Http } from "@client/services/http";

export function getLog(data: {
  kind: SystemLogKind | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  limit: number;
  page: number;
}): Promise<{
  log: SystemLogDocument[];
}> {
  return Http.post("/log/get-system-log", data);
}
