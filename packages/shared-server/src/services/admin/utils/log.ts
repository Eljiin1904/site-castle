import { AdminLogDocument } from "@core/types/admin/AdminLogDocument";
import { AdminLogKindData } from "@core/types/admin/AdminLogKind";
import { BasicUser } from "@core/types/users/BasicUser";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

export async function log(
  data: {
    admin: BasicUser;
  } & AdminLogKindData,
) {
  const document: AdminLogDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    ...data,
  };

  await Database.collection("admin-log").insertOne(document);

  return document;
}
