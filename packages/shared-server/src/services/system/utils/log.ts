import { SystemLogDocument } from "@core/types/system/SystemLogDocument";
import { SystemLogKindData } from "@core/types/system/SystemLogKind";
import { SystemKind } from "@core/types/system/SystemKind";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

export async function log(
  data: {
    system: SystemKind;
    message: string;
  } & SystemLogKindData,
) {
  const document: SystemLogDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    ...data,
  };

  await Database.collection("system-log").insertOne(document);

  return document;
}
