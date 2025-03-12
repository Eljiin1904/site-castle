import {
  SiteSettingDocument,
  SiteSettingId,
} from "@core/types/site/SiteSettingDocument";
import { Database } from "#server/services/database";

export async function setSetting<TKey extends SiteSettingId>({
  key,
  value,
}: {
  key: TKey;
  value: (SiteSettingDocument & { _id: TKey })["value"];
}) {
  await Database.collection("site-settings").updateOne(
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
