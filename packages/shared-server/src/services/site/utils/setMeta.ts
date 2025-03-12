import {
  SiteMetaDocument,
  SiteMetaId,
} from "@core/types/site/SiteMetaDocument";
import { Database } from "#server/services/database";

export async function setMeta<TKey extends SiteMetaId>({
  key,
  value,
}: {
  key: TKey;
  value: (SiteMetaDocument & { _id: TKey })["value"];
}) {
  await Database.collection("site-meta").updateOne(
    {
      _id: key,
    },
    {
      $set: {
        value,
        lastUpdateDate: new Date(),
      },
    },
    {
      upsert: true,
    },
  );
}
