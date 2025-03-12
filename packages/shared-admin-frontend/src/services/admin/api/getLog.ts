import { AdminLogDocument } from "@core/types/admin/AdminLogDocument";
import { AdminLogKind } from "@core/types/admin/AdminLogKind";
import { Http } from "@client/services/http";

export function getLog(data: {
  kind: AdminLogKind | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  limit: number;
  page: number;
}): Promise<{
  log: AdminLogDocument[];
}> {
  return Http.post("/log/get-admin-log", data);
}
