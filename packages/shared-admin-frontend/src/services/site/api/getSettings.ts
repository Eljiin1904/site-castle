import { SiteSettingDocument } from "@core/types/site/SiteSettingDocument";
import { Http } from "@client/services/http";

export function getSettings(): Promise<{
  settings: SiteSettingDocument[];
}> {
  return Http.post("/site/get-settings");
}
